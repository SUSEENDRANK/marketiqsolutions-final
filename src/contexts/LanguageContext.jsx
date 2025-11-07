import React, { createContext, useContext, useState, useEffect } from 'react'
import { translateService } from '../services/translateService'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })
  const [translations, setTranslations] = useState({})
  const [loading, setLoading] = useState(false)

  // Base English translations for MarketIQ
  const baseTranslations = {
    // Navigation
    home: "Home",
    services: "Services", 
    about: "About",
    blog: "Blog",
    team: "Team",
    feedback: "Feedback",
    support: "Support",
    careers: "Careers",
    
    // Hero Section
    heroTitle: "Grow smarter with MarketIQ_Solutions",
    heroSubtitle: "SEO, Google Ads, Meta Ads, social media, and high‑converting websites—everything you need to be found and chosen online.",
    getStartedFree: "Get started free",
    seeServices: "See services",
    
    // Services Section
    ourServices: "Our Services",
    servicesSubtitle: "What we do to help you innovate and thrive.",
    seoTitle: "Search Engine Optimization (SEO)",
    seoDescription: "Rank higher with technical fixes, content strategy, and clean IA.",
    googleAdsTitle: "Google Ads Management", 
    googleAdsDescription: "Capture demand with efficient, data‑driven PPC campaigns.",
    metaAdsTitle: "Meta & Social Ads",
    metaAdsDescription: "Create demand with scroll‑stopping creative and precise targeting.",
    webDesignTitle: "Web Design & Development",
    webDesignDescription: "Fast, responsive, and conversion‑first websites that scale.",
    contentMarketingTitle: "Content Marketing",
    contentMarketingDescription: "Authority‑building blogs and pages that answer real questions.",
    brandingTitle: "Branding & Strategy",
    brandingDescription: "Positioning and storytelling that make your brand memorable.",
    socialMediaTitle: "Social Media Maintenance",
    socialMediaDescription: "Monthly content, scheduling, comments, and page health—kept on brand.",
    photographyTitle: "Photography & Videography",
    photographyDescription: "Product shoots, brand films, and reels that elevate your visual story.",
    appDesignTitle: "App Design & Development",
    appDesignDescription: "User‑friendly mobile apps from UX to launch and growth.",
    
    // About Section
    aboutTitle: "About MarketIQ_Solutions",
    aboutSubtitle: "We turn attention into revenue using data, design, and technology.",
    aboutDescription: "We build SEO‑friendly websites, run high‑performing ad campaigns, and create content that ranks. Every strategy is customized to your goals—traffic, leads, or sales—so you can grow consistently and confidently.",
    whatWeValue: "What we value",
    dataDriven: "Data‑driven decisions with clear KPIs",
    fastExecution: "Fast execution with continuous optimization", 
    transparentCommunication: "Transparent communication and reporting",
    provenImpact: "Proven impact",
    provenImpactDescription: "Lower CPAs, higher conversion rates, and faster load times across dozens of campaigns.",
    howWeWork: "How we work",
    howWeWorkDescription: "Audit → Strategy → Launch → Optimize. Weekly insights, monthly growth plans.",
    requestFreeAudit: "Request a free audit",
    exploreServices: "Explore services",
    
    // Contact Section
    letsTalk: "Let's talk",
    contactSubtitle: "Tell us your goal—traffic, leads, or sales—and we'll design a plan.",
    yourName: "Your name",
    email: "Email",
    phoneOptional: "Phone (optional)",
    whatDoYouWantToAchieve: "What do you want to achieve?",
    sendToOurTeam: "Send to our team",
    preferGoogleForms: "Prefer Google Forms? Book an appointment",
    
    // Feedback Section
    whatOurClientsSay: "What Our Clients Say",
    feedbackSubtitle: "Real stories from businesses we've helped empower and grow.",
    shareYourFeedback: "Share your feedback",
    
    // Team Section
    ourTeam: "Our Team",
    teamSubtitle: "Focused on results, powered by curiosity.",
    loadingTeamMembers: "Loading team members...",
    
    // Blog Section
    loadingBlogPosts: "Loading blog posts...",
    backToBlog: "← Back to Blog",
    
    // Footer
    quickLinks: "Quick Links",
    getInTouch: "Get in Touch",
    yourEmail: "Your Email", 
    yourPhone: "Your Phone",
    yourMessage: "Your Message",
    send: "Send",
    language: "Language",
    
    // Common
    loading: "Loading...",
    error: "Error",
    success: "Success",
    failed: "Failed",
    sent: "Sent",
    english: "English",
    tamil: "Tamil",
    hindi: "Hindi"
  }

  // Load translations when language changes
  useEffect(() => {
    localStorage.setItem('language', language)
    loadTranslations()
  }, [language])

  const loadTranslations = async () => {
    if (language === 'en') {
      setTranslations(baseTranslations)
      return
    }

    setLoading(true)
    try {
      const translationKeys = Object.keys(baseTranslations)
      const translationValues = Object.values(baseTranslations)
      
      const translatedValues = await translateService.translateBatch(translationValues, language)
      
      const newTranslations = {}
      translationKeys.forEach((key, index) => {
        newTranslations[key] = translatedValues[index] || baseTranslations[key]
      })
      
      setTranslations(newTranslations)
    } catch (error) {
      console.error('Failed to load translations:', error)
      setTranslations(baseTranslations)
    } finally {
      setLoading(false)
    }
  }

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  const setApiKey = (apiKey) => {
    translateService.setApiKey(apiKey)
  }

  const translateText = async (text) => {
    return await translateService.translateText(text, language)
  }

  const value = {
    language,
    changeLanguage,
    translations,
    loading,
    setApiKey,
    translateText
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
