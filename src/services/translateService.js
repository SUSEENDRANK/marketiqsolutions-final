class TranslateService {
  constructor() {
    this.apiKey = null
  }

  setApiKey(apiKey) {
    this.apiKey = apiKey
  }

  async translateText(text, targetLanguage) {
    if (!text || targetLanguage === 'en') {
      return text
    }

    if (!this.apiKey) {
      console.warn('Google Translate API key not configured, returning original text')
      return text
    }

    try {
      const url = `https://translation.googleapis.com/language/translate/v2?q=${encodeURIComponent(text)}&target=${encodeURIComponent(targetLanguage)}&source=en&format=text&key=${encodeURIComponent(this.apiKey)}`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        console.error('Translate HTTP error', response.status, await response.text())
        return text
      }

      const data = await response.json()
      const translatedText = data?.data?.translations?.[0]?.translatedText
      
      return translatedText || text
    } catch (error) {
      console.warn('Translation failed:', error)
      return text
    }
  }

  async translateBatch(texts, targetLanguage) {
    if (!texts || !Array.isArray(texts) || targetLanguage === 'en') {
      return texts
    }

    if (!this.apiKey) {
      console.warn('Google Translate API key not configured, returning original texts')
      return texts
    }

    try {
      const promises = texts.map(text => this.translateText(text, targetLanguage))
      return await Promise.all(promises)
    } catch (error) {
      console.warn('Batch translation failed:', error)
      return texts
    }
  }
}

export const translateService = new TranslateService()

