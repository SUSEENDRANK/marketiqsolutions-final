import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const I18nContext = createContext({ lang: 'en', setLang: ()=>{}, translate: async (t)=>t })

const STORAGE_LANG_KEY = 'lang'
const STORAGE_CACHE_KEY = 'translation-cache-v1'

function loadCache(){
  try { return JSON.parse(localStorage.getItem(STORAGE_CACHE_KEY)||'{}') } catch { return {} }
}

function saveCache(cache){
  try { localStorage.setItem(STORAGE_CACHE_KEY, JSON.stringify(cache)) } catch {}
}
async function googleTranslate(text, target){
  if(!text) return ''
  if(target==='en') return text
  const apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_KEY
  if(!apiKey) {
    console.warn('Google Translate API key not configured, returning original text')
    return text
  }
  try {
    const url = `https://translation.googleapis.com/language/translate/v2?q=${encodeURIComponent(text)}&target=${encodeURIComponent(target)}&source=en&format=text&key=${encodeURIComponent(apiKey)}`
    const res = await fetch(url)
    if(!res.ok) {
      console.error('Translate HTTP error', res.status, await res.text())
      return text // Return original text instead of throwing
    }
    const json = await res.json()
    const out = json?.data?.translations?.[0]?.translatedText
    if(!out) return text
    // API may return HTML entities; trust as-is for now
    return out
  } catch (error) {
    console.warn('Translation failed:', error)
    return text // Return original text on any error
  }
}

export function I18nProvider({ children }){
  // Default to stored choice or English; no browser auto-detection
  const [lang, setLangState] = useState(localStorage.getItem(STORAGE_LANG_KEY) || 'en')
  const [cache, setCache] = useState(loadCache())

  const setLang = (v)=>{ setLangState(v); localStorage.setItem(STORAGE_LANG_KEY, v) }

  const translate = async (text)=>{
    const key = `${lang}::${text}`
    if(cache[key]) return cache[key]
    let translated
    try {
      translated = await googleTranslate(text, lang)
    } catch (error) {
      console.warn('Translation error for text:', text, error)
      translated = text
    }
    const next = { ...cache, [key]: translated }
    setCache(next)
    saveCache(next)
    return translated
  }

  useEffect(()=>{ window._testTranslate = translate }, [translate])
  const value = useMemo(()=>({ lang, setLang, translate }), [lang, cache])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(){
  return useContext(I18nContext)
}

export function T({ en }){
  const { lang, translate } = useI18n()
  const [text, setText] = useState(en)
  useEffect(()=>{
    let mounted = true
    ;(async ()=>{
      try {
        const t = await translate(en)
        if(mounted) setText(t)
      } catch (error) { 
        console.warn('Translation component error:', error)
        if(mounted) setText(en) 
      }
    })()
    return ()=>{ mounted = false }
  }, [en, lang, translate])
  return text
}


