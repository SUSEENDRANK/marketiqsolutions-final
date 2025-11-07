import './App.css'
import React from 'react'
import { Routes, Route, Link, NavLink, Navigate, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { posts } from './data/posts.js'
import seoGif from './animation/seo.gif'
import adsGif from './animation/ads.gif'
import metaGif from './animation/meta.gif'
import webGif from './animation/web.gif'
import videoGif from './animation/video.gif'
import brandGif from './animation/brand.gif'
import mainGif from './animation/main.gif'
import photoGif from './animation/photo.gif'
import appGif from './animation/app.gif'
import seoImg from './assets/services/seo.svg'
import webImg from './assets/services/web.svg'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import Navbar from './pages/Navbar.jsx'
import logo from './assets/logo-placeholder.svg'

class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, error:null } }
  static getDerivedStateFromError(error){ return { hasError:true, error } }
  componentDidCatch(error, info){ console.error('App render error:', error, info) }
  render(){
    if(this.state.hasError){
      return (
        <section className="section"><div className="container" style={{color:'#fff'}}>
          <h1>Something went wrong.</h1>
          <pre style={{whiteSpace:'pre-wrap'}}>{String(this.state.error)}</pre>
        </div></section>
      )
    }
    return this.props.children
  }
}

function TiltCard({ children }){
  return (
    <div style={{
      transformStyle:'preserve-3d',
      perspective:'1000px'
    }}
      onMouseMove={(e)=>{
        const t=e.currentTarget
        const rect=t.getBoundingClientRect()
        const x=(e.clientX-rect.left)/rect.width
        const y=(e.clientY-rect.top)/rect.height
        const rotX=(0.5-y)*12
        const rotY=(x-0.5)*12
        t.style.transform=`rotateX(${rotX}deg) rotateY(${rotY}deg)`
      }}
      onMouseLeave={(e)=>{e.currentTarget.style.transform='rotateX(0deg) rotateY(0deg)'}}
    >{children}</div>
  )
}

function FeedbackPage(){
  const fallback = [
    { name:'Arun Prakash', role:'Founder, Timesone24', quote:"Their SEO roadmap and quick technical fixes lifted our organic traffic within weeks. Reporting is clean and on time.", rating: 5, service: 'SEO' },
    { name:'Veera Kumar', role:'Founder, Mechatron Motors', quote:'Reliable digital partner. Creative, performance-focused ads with on-time delivery and clear communication.', rating: 5, service: 'Google Ads' },
    { name:'Priya S.', role:'CMO, Urban Threads', quote:'From strategy to execution, the team delivered steady growth with transparent KPIs and weekly insights.', rating: 5, service: 'Digital Marketing' },
    { name:'Harini', role:'Owner, Bloom Beauty Studio', quote:'Our website revamp is faster and converts better. Bookings improved and customers love the new flow.', rating: 5, service: 'Web Development' },
    { name:'Rahul Mehta', role:'Director, Northbay Foods', quote:'Google Ads and Meta campaigns cut our CPA while scaling leads. Strong testing cadence and documentation.', rating: 5, service: 'Meta Ads' },
    { name:'Sanjay', role:'Founder, DriveNow Rentals', quote:'Content and local SEO boosted discovery. Calls from maps and search increased noticeably.', rating: 5, service: 'Content Marketing' },
    { name:'Nivetha', role:'Marketing Lead, EduSpark', quote:'Landing pages, tracking, and creative iteration improved demo signups month over month.', rating: 5, service: 'Conversion Optimization' },
    { name:'Akash', role:'Co‑founder, FreshCart', quote:'Clear process—Audit → Strategy → Launch → Optimize. The team is responsive and proactive.', rating: 5, service: 'Strategy' },
  ]
  const [items, setItems] = useState(fallback)
  const [showForm, setShowForm] = useState(false)
  const [feedbackForm, setFeedbackForm] = useState({ name:'', role:'', quote:'', rating: 5, service: '' })
  const [formStatus, setFormStatus] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  // Optional: Fetch from API in background without blocking UI
  useEffect(()=>{
    let mounted = true
    
    // Non-blocking API fetch - only updates if successful
    fetch('http://localhost:5000/api/feedback')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(mounted && data?.success && Array.isArray(data.data) && data.data.length){
          setItems(data.data.map(d=>({ name:d.name, role:d.role, quote:d.quote, rating: d.rating || 5, service: d.service || 'General' })))
        }
      })
      .catch(() => {
        // Silently fail - fallback data already loaded
      })
    
    return ()=>{ mounted=false }
  }, [])

  const onSubmitFeedback = async (e) => {
    e.preventDefault()
    setFormStatus('')
    try{
      const res = await fetch('http://localhost:5000/api/feedback', { 
        method:'POST', 
        headers:{ 'Content-Type':'application/json' }, 
        body: JSON.stringify({ 
          name: feedbackForm.name, 
          role: feedbackForm.role, 
          quote: feedbackForm.quote,
          rating: feedbackForm.rating,
          service: feedbackForm.service
        }) 
      })
      if(res.ok){ 
        const data = await res.json()
        if(data.success) {
          setFormStatus('Thank you for your feedback!')
          setFeedbackForm({ name:'', role:'', quote:'', rating: 5, service: '' })
          setShowForm(false)
          // Refresh the feedback list
          const refreshRes = await fetch('http://localhost:5000/api/feedback')
          if(refreshRes.ok){
            const refreshData = await refreshRes.json()
            if(refreshData.success && Array.isArray(refreshData.data) && refreshData.data.length){
              setItems(refreshData.data.map(d=>({ name:d.name, role:d.role, quote:d.quote, rating: d.rating || 5, service: d.service || 'General' })))
            }
          }
        } else {
          setFormStatus('Failed to submit feedback. Please try again.')
        }
      } else { 
        setFormStatus('Failed to submit feedback. Please check your connection and try again.') 
      }
    } catch (error) { 
      console.error('Feedback form error:', error)
      setFormStatus('Failed to submit feedback. Please try again later.') 
    }
  }

  const initials = (n)=> n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase()
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        style={{ 
          color: i < rating ? '#FFD700' : '#FFD70066', 
          fontSize: '18px',
          textShadow: '0 0 6px rgba(255,215,0,0.35)'
        }}
      >
        ★
      </span>
    ))
  }

  const filteredItems = selectedFilter === 'all' ? items : items.filter(item => 
    item.service.toLowerCase().includes(selectedFilter.toLowerCase())
  )

  const services = ['all', 'SEO', 'Google Ads', 'Meta Ads', 'Web Development', 'Content Marketing', 'Digital Marketing']

  return (
    <section className="section feedback-section">
      <div className="container fade-up" style={{display:'grid',gap:32}}>
        {/* Header Section */}
        <div style={{textAlign:'center',maxWidth:800,margin:'0 auto'}}>
        <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle" style={{fontSize:'18px',lineHeight:'1.6'}}>
            Real stories from businesses we've helped grow. Discover how our digital marketing solutions have transformed their online presence and driven measurable results.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:24,marginBottom:24}}>
          <div className="card service-anim" style={{animationDelay:'0ms',padding:'24px',textAlign:'center'}}>
            <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>50+</div>
            <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Happy Clients</div>
          </div>
          <div className="card service-anim" style={{animationDelay:'80ms',padding:'24px',textAlign:'center'}}>
            <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>4.9★</div>
            <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Average Rating</div>
          </div>
          <div className="card service-anim" style={{animationDelay:'160ms',padding:'24px',textAlign:'center'}}>
            <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>100%</div>
            <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Client Retention</div>
          </div>
          <div className="card service-anim" style={{animationDelay:'240ms',padding:'24px',textAlign:'center'}}>
            <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>24/7</div>
            <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Support Available</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:24}}>
          {services.map(service => (
            <button 
              key={service}
              onClick={() => setSelectedFilter(service)}
              className={`btn ${selectedFilter === service ? 'btn-primary' : 'btn-secondary'}`}
              style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
            >
              {service === 'all' ? 'All Services' : service}
            </button>
          ))}
        </div>

        
        
        {!showForm ? (
          <>
            <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))'}}>
              {filteredItems.map((t,idx)=> (
                <div key={t.name+idx} className="card testimonial-card service-anim" style={{
                  animationDelay:`${idx*80}ms`,
                  padding:'24px',
                  background:'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                  border:'1px solid #1f2937',
                  transition:'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'var(--color-accent)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,211,238,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = '#1f2937'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{marginBottom:'16px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:'8px'}}>
                      <span style={{
                        background:'var(--color-accent)',
                        color:'#000',
                        padding:'4px 8px',
                        borderRadius:'12px',
                        fontSize:'12px',
                        fontWeight:'600'
                      }}>
                        {t.service}
                      </span>
                      <div style={{display:'flex',alignItems:'center',gap:4}}>
                        {renderStars(t.rating)}
                      </div>
                    </div>
                    <p className="testimonial-quote" style={{margin:'0 0 16px 0',fontSize:16,lineHeight:1.7,fontStyle:'italic'}}>
                    <span style={{fontSize:28,opacity:0.4,marginRight:8}}>"</span>{t.quote}<span style={{fontSize:28,opacity:0.4,marginLeft:8}}>"</span>
                  </p>
                  </div>
                  <div style={{display:'flex',alignItems:'center',gap:12,paddingTop:'16px',borderTop:'1px solid #1f2937'}}>
                    <div style={{width:48,height:48,borderRadius:'50%',background:'var(--nav-bg)',display:'grid',placeItems:'center',fontWeight:700,color:'#fff',fontSize:'18px'}}>{initials(t.name)}</div>
                    <div>
                      <div style={{fontWeight:700,fontSize:'16px'}}>{t.name}</div>
                      <div style={{opacity:0.8,fontSize:'14px'}}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="card" style={{maxWidth:700,margin:'0 auto',padding:'32px',background:'var(--nav-bg)',border:'1px solid #1f2937'}}>
            <div style={{textAlign:'center',marginBottom:'24px'}}>
              <h3 style={{margin:'0 0 8px 0',fontSize:'24px'}}>Share Your Experience</h3>
              <p style={{margin:0,color:'var(--color-muted)'}}>Help others discover the value of our services</p>
            </div>
            <form onSubmit={onSubmitFeedback} style={{display:'grid',gap:16}}>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:16}}>
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                  style={{padding:12,borderRadius:'8px',border:'1px solid #1f2937',background:'var(--bg)',color:'#fff'}} 
                value={feedbackForm.name} 
                onChange={e=>setFeedbackForm(f=>({ ...f, name:e.target.value }))} 
              />
              <input 
                type="text" 
                placeholder="Your Role/Company" 
                required 
                  style={{padding:12,borderRadius:'8px',border:'1px solid #1f2937',background:'var(--bg)',color:'#fff'}} 
                value={feedbackForm.role} 
                onChange={e=>setFeedbackForm(f=>({ ...f, role:e.target.value }))} 
              />
              </div>
              <select 
                value={feedbackForm.service}
                onChange={e=>setFeedbackForm(f=>({ ...f, service:e.target.value }))}
                style={{padding:12,borderRadius:'8px',border:'1px solid #1f2937',background:'var(--bg)',color:'#fff'}}
              >
                <option value="">Select Service</option>
                <option value="SEO">SEO</option>
                <option value="Google Ads">Google Ads</option>
                <option value="Meta Ads">Meta Ads</option>
                <option value="Web Development">Web Development</option>
                <option value="Content Marketing">Content Marketing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Other">Other</option>
              </select>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <label style={{color:'var(--color-muted)',fontSize:'14px'}}>Rating:</label>
                <div style={{display:'flex',gap:4}}>
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackForm(f=>({ ...f, rating:star }))}
                      style={{
                        background:'transparent',
                        border:'none',
                        color: star <= feedbackForm.rating ? '#FFD700' : '#FFD70066',
                        fontSize:'20px',
                        textShadow:'0 0 6px rgba(255,215,0,0.35)',
                        cursor:'pointer',
                        padding:'4px'
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <textarea 
                rows={4} 
                placeholder="Tell us about your experience with our services..." 
                required 
                style={{padding:12,borderRadius:'8px',border:'1px solid #1f2937',background:'var(--bg)',color:'#fff'}} 
                value={feedbackForm.quote} 
                onChange={e=>setFeedbackForm(f=>({ ...f, quote:e.target.value }))} 
              />
              <div style={{display:'flex',gap:12,justifyContent:'center'}}>
                <button className="btn" type="submit" style={{padding:'12px 24px'}}>Submit Feedback</button>
                <button type="button" className="btn secondary" onClick={() => setShowForm(false)} style={{padding:'12px 24px'}}>Cancel</button>
              </div>
              {formStatus && (
                <div style={{
                  textAlign:'center',
                  color: formStatus.includes('Thank you') ? 'limegreen' : 'tomato',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: formStatus.includes('Thank you') ? 'rgba(50, 205, 50, 0.1)' : 'rgba(255, 99, 71, 0.1)',
                  border: `1px solid ${formStatus.includes('Thank you') ? 'limegreen' : 'tomato'}`,
                  fontWeight: '500',
                  fontSize: '14px'
                }}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

function ScrollToTop(){
  const location = useLocation()
  useEffect(()=>{ window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  return null
}

function Page({ title, description, children }){
  useEffect(()=>{
    if (title) document.title = title
    if (description){
      let meta = document.querySelector('meta[name="description"]')
      if(!meta){
        meta = document.createElement('meta')
        meta.setAttribute('name','description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
    const ensureTag = (selector, create) => {
      let el = document.head.querySelector(selector)
      if(!el){ el = create(); document.head.appendChild(el) }
      return el
    }
    if (title){
      ensureTag('meta[property="og:title"]', ()=>{
        const m=document.createElement('meta'); m.setAttribute('property','og:title'); return m
      }).setAttribute('content', title)
      ensureTag('meta[name="twitter:title"]', ()=>{
        const m=document.createElement('meta'); m.setAttribute('name','twitter:title'); return m
      }).setAttribute('content', title)
    }
    if (description){
      ensureTag('meta[property="og:description"]', ()=>{
        const m=document.createElement('meta'); m.setAttribute('property','og:description'); return m
      }).setAttribute('content', description)
      ensureTag('meta[name="twitter:description"]', ()=>{
        const m=document.createElement('meta'); m.setAttribute('name','twitter:description'); return m
      }).setAttribute('content', description)
    }
    ensureTag('meta[property="og:type"]', ()=>{
      const m=document.createElement('meta'); m.setAttribute('property','og:type'); return m
    }).setAttribute('content', 'website')
    ensureTag('meta[name="twitter:card"]', ()=>{
      const m=document.createElement('meta'); m.setAttribute('name','twitter:card'); return m
    }).setAttribute('content', 'summary_large_image')
  }, [title, description])
  return children
}

// Language switcher removed per request


function Hero() {
  return (
    <header className="section">
      <div className="container fade-up" style={{display:'grid',gridTemplateColumns:'1fr',gap:24,justifyItems:'center',textAlign:'center'}}>
        <TiltCard>
          <img className="logo-hover hero-logo" src={logo} alt="MarketIQ Solutions" style={{width:180,height:'auto',borderRadius:12,filter:'drop-shadow(0 12px 24px rgba(255,209,0,0.25))'}} />
        </TiltCard>
        <h1 className="section-title" style={{marginTop:12}}><span style={{fontSize:'0.8em'}}>Grow Smarter with</span> <span style={{fontSize:'1.2em',color:'var(--color-accent)'}}>MarketIQ Solutions</span></h1>
        <p className="section-subtitle" style={{fontSize:'1.2em'}}>SEO, Ads, social media, and conversion‑focused websites to help you get found and chosen online.</p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
          <a className="btn" href="https://forms.gle/RoKmscnEVAPBU8LT7" target="_blank" rel="noreferrer">Get Started Free</a>
          <Link className="btn secondary" to="/services">See Our Services</Link>
        </div>
      </div>
    </header>
  )
}

function Services() {
  const items = [
    { title: 'SEO Optimization', description: 'Boost your search rankings and organic traffic with our proven SEO strategies.', img: seoGif },
    { title: 'Google Ads', description: 'Drive targeted traffic and conversions with expertly managed Google Ads campaigns.', img: adsGif },
    { title: 'Meta Ads', description: 'Reach your audience on Facebook and Instagram with compelling ad campaigns.', img: metaGif },
    { title: 'Web Design & Development', description: 'Create stunning, fast-loading websites that convert visitors into customers.', img: webGif },
    { title: 'Content Marketing', description: 'Engage your audience with high-quality content that builds trust and authority.', img: videoGif },
    { title: 'Branding & Identity', description: 'Develop a strong brand identity that resonates with your target audience.', img: brandGif },
    { title: 'Social Media Management', description: 'Build and engage your community across all social media platforms.', img: mainGif },
    { title: 'Photography & Videography', description: 'Professional visual content that showcases your products and services.', img: photoGif },
    { title: 'App Design & Development', description: 'Create mobile apps that provide exceptional user experiences.', img: appGif },
  ]
  return (
    <section id="services" className="section services-section">
      <div className="container fade-up">
        <h2 className="services-title">Our Services</h2>
        <div className="title-underline" style={{margin:'8px 0 24px 0'}} />
        <p className="section-subtitle">Comprehensive digital marketing solutions to grow your business</p>
        {/* Desktop grid */}
        <div className="grid services-grid" style={{display:'none'}}>
          {items.map((s,idx) => (
            <div key={s.title} className="card service-anim" style={{animationDelay:`${idx*80}ms`}}>
              {s.img && <img loading="lazy" src={s.img} alt={s.title} style={{width:'100%',height:140,objectFit:'cover',borderRadius:12,marginBottom:10}} />}
              <h3 style={{margin:'0 0 6px 0'}}>{s.title}</h3>
              <p style={{margin:0,color:'var(--color-muted)'}}>{s.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile/scrollable carousel */}
        <div className="services-row services-carousel">
          {items.map((s,idx) => (
            <div key={s.title} className="card service-anim" style={{minWidth:260,animationDelay:`${idx*80}ms`}}>
              {s.img && <img src={s.img} alt={s.title} style={{width:'100%',height:140,objectFit:'cover',borderRadius:12,marginBottom:10}} />}
              <h3 style={{margin:'0 0 6px 0'}}>{s.title}</h3>
              <p style={{margin:0,color:'var(--color-muted)'}}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BlogList(){
  const [blogPosts, setBlogPosts] = useState(posts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Optional: Fetch from API in background without blocking UI
  useEffect(()=>{
    let mounted = true
    
    // Non-blocking API fetch - only updates if successful
    fetch('http://localhost:5000/api/blog')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(mounted && data?.success && Array.isArray(data.data) && data.data.length){
          setBlogPosts(data.data)
        }
      })
      .catch(() => {
        // Silently fail - fallback data already loaded
      })
    
    return ()=>{ mounted=false }
  }, [])

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedCategory === 'all') return matchesSearch
    
    const categoryKeywords = {
      'seo': ['seo', 'search', 'ranking', 'organic', 'keywords'],
      'ads': ['ads', 'google ads', 'meta ads', 'advertising', 'campaign'],
      'branding': ['brand', 'story', 'identity', 'marketing']
    }
    
    const keywords = categoryKeywords[selectedCategory] || []
    const matchesCategory = keywords.some(keyword => 
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)
    )
    
    return matchesSearch && matchesCategory
  })

  return (
    <section className="section blog-section">
      <div className="container fade-up" style={{display:'grid',gap:24}}>
        <div style={{textAlign:'center'}}>
          <h2 className="section-title">Blog & Insights</h2>
          <p className="section-subtitle">Stay updated with the latest digital marketing trends and strategies</p>
        </div>

        {/* Search and Filter Controls */}
        <div style={{display:'grid',gap:16,maxWidth:800,margin:'0 auto'}}>
          <div style={{position:'relative'}}>
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width:'100%',
                padding:'12px 16px 12px 44px',
                borderRadius:'12px',
                border:'1px solid #1f2937',
                background:'var(--nav-bg)',
                color:'#fff',
                fontSize:'16px'
              }}
            />
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              style={{
                position:'absolute',
                left:'12px',
                top:'50%',
                transform:'translateY(-50%)',
                color:'var(--color-muted)'
              }}
            >
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
            >
              All Posts
            </button>
            <button 
              onClick={() => setSelectedCategory('seo')}
              className={`btn ${selectedCategory === 'seo' ? 'btn-primary' : 'btn-secondary'}`}
              style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
            >
              SEO
            </button>
            <button 
              onClick={() => setSelectedCategory('ads')}
              className={`btn ${selectedCategory === 'ads' ? 'btn-primary' : 'btn-secondary'}`}
              style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
            >
              Advertising
            </button>
            <button 
              onClick={() => setSelectedCategory('branding')}
              className={`btn ${selectedCategory === 'branding' ? 'btn-primary' : 'btn-secondary'}`}
              style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
            >
              Branding
            </button>
          </div>
        </div>

        <div style={{display:'grid',gap:20}}>
          {filteredPosts.length > 0 ? (
              filteredPosts.map((p,idx)=> (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="service-anim" style={{
                  border:'1px solid #1f2937',
                  padding:'24px',
                  borderRadius:'16px',
                  background:'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                  transition:'all 0.3s ease',
                  animationDelay:`${idx*100}ms`,
                  textDecoration:'none',
                  color:'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'var(--color-accent)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,211,238,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = '#1f2937'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:'8px'}}>
                        <span style={{
                          background:'var(--color-accent)',
                          color:'#000',
                          padding:'4px 8px',
                          borderRadius:'12px',
                          fontSize:'12px',
                          fontWeight:'600'
                        }}>
                          {new Date(p.publishedAt || p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span style={{color:'var(--color-muted)',fontSize:'14px'}}>•</span>
                        <span style={{color:'var(--color-muted)',fontSize:'14px'}}>5 min read</span>
                      </div>
                      <h3 style={{margin:'0 0 8px 0',fontSize:'20px',lineHeight:'1.3'}}>{p.title}</h3>
                      <p style={{margin:0,color:'var(--color-muted)',lineHeight:'1.6'}}>{p.excerpt}</p>
                    </div>
                    <div style={{
                      width:'80px',
                      height:'80px',
                      borderRadius:'12px',
                      background:'linear-gradient(135deg, var(--color-accent) 0%, #0ea5e9 100%)',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'center',
                      flexShrink:0
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{textAlign:'center',padding:'40px'}}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" style={{color:'var(--color-muted)',marginBottom:'16px'}}>
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <h3 style={{margin:'0 0 8px 0',color:'var(--color-muted)'}}>No posts found</h3>
                <p style={{margin:0,color:'var(--color-muted)'}}>Try adjusting your search or filter criteria</p>
              </div>
            )}
        </div>
      </div>
    </section>
  )
}

function BlogPost(){
  const { slug } = useParams()
  const [post, setPost] = useState(() => posts.find(p => p.slug === slug) || null)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    
    // If we already have the post from local data, no need to fetch
    if(post) return
    
    // Try API fetch in background
    fetch(`http://localhost:5000/api/blog/${slug}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(mounted && data?.success && data.data){
          setPost(data.data)
        } else if(mounted) {
          setError('Post not found')
        }
      })
      .catch(() => {
        if(mounted) setError('Failed to load post')
      })
    
    return ()=>{ mounted=false }
  }, [slug, post])

  if(error || !post) return <section className="section"><div className="container">Not found</div></section>
  
  return (
    <Page title={`${post.title} — MarketIQ Solutions`} description={post.excerpt || post.content?.slice(0,140)}>
      <section className="section">
        <div className="container fade-up" style={{display:'grid',gap:24,maxWidth:800}}>
          <Link to="/blog" style={{color:'var(--color-accent)',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:8}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Blog
          </Link>
          
          <article style={{display:'grid',gap:20}}>
            <header style={{textAlign:'center',padding:'32px 0',borderBottom:'1px solid #1f2937'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:'16px'}}>
                <span style={{
                  background:'var(--color-accent)',
                  color:'#000',
                  padding:'6px 12px',
                  borderRadius:'16px',
                  fontSize:'14px',
                  fontWeight:'600'
                }}>
                  {new Date(post.publishedAt || post.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span style={{color:'var(--color-muted)',fontSize:'14px'}}>•</span>
                <span style={{color:'var(--color-muted)',fontSize:'14px'}}>5 min read</span>
              </div>
              <h1 style={{margin:'0 0 16px 0',fontSize:'32px',lineHeight:'1.2',fontWeight:'700'}}>{post.title}</h1>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'18px',lineHeight:'1.6'}}>{post.excerpt}</p>
            </header>
            
            <div style={{
              padding:'32px',
              background:'linear-gradient(135deg, rgba(34,211,238,0.03) 0%, rgba(0,0,0,0.05) 100%)',
              borderRadius:'16px',
              border:'1px solid #1f2937'
            }}>
              <div style={{
                fontSize:'18px',
                lineHeight:'1.8',
                color:'#ffffff',
                whiteSpace:'pre-wrap'
              }}>
                {post.content}
              </div>
            </div>
            
            <div style={{
              display:'flex',
              gap:16,
              padding:'24px',
              background:'var(--nav-bg)',
              borderRadius:'12px',
              border:'1px solid #1f2937'
            }}>
              <div style={{
                width:'48px',
                height:'48px',
                borderRadius:'50%',
                background:'linear-gradient(135deg, var(--color-accent) 0%, #0ea5e9 100%)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h4 style={{margin:'0 0 4px 0',color:'#fff'}}>MarketIQ Solutions</h4>
                <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px'}}>
                  Digital marketing experts helping businesses grow smarter with data-driven strategies.
                </p>
              </div>
            </div>
          </article>
          
          <div style={{textAlign:'center',padding:'32px 0'}}>
            <h3 style={{margin:'0 0 16px 0'}}>Ready to grow your business?</h3>
            <p style={{margin:'0 0 24px 0',color:'var(--color-muted)'}}>
              Let's discuss how we can help you implement these strategies.
            </p>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
              <Link className="btn" to="/support">Get Free Consultation</Link>
              <Link className="btn secondary" to="/services">View Our Services</Link>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

function Evolution() {
  const milestones = [
    {
      year: 'Jan 2025',
      title: 'Incorporation & Setup',
      description: 'Company incorporated, brand identity formalized, initial operating procedures defined, and core offerings positioned around SEO, Ads, and modern websites.',
      achievements: [
        'Company Incorporated',
        'Brand & Identity Ready',
        'Core Services Defined'
      ],
      color: '#10b981'
    },
    {
      year: 'Mar 2025',
      title: 'First Clients Onboarded',
      description: 'Onboarded early‑stage and SMB clients. Established discovery → strategy → launch → optimize delivery flow with weekly reporting and clear KPIs.',
      achievements: [
        'Delivery Playbooks',
        'Weekly Reporting',
        'KPI Framework'
      ],
      color: '#3b82f6'
    },
    {
      year: 'Jun 2025',
      title: 'Capability Expansion',
      description: 'Launched content and multimedia support; set up analytics stack with event tracking, funnels, and attribution for Ads and SEO.',
      achievements: [
        'Content & Multimedia',
        'GA4 + Pixels Setup',
        'Attribution Ready'
      ],
      color: '#8b5cf6'
    },
    {
      year: 'Aug 2025',
      title: 'Proven Results',
      description: 'Delivered measurable lifts across multiple accounts — improved rankings, lower CPA, higher CVR; shipped conversion‑focused landing pages.',
      achievements: [
        'Top‑10 Keywords',
        'CPA ↓, CVR ↑',
        'High‑CV Landing Pages'
      ],
      color: '#f59e0b'
    },
    {
      year: 'Oct 2025',
      title: 'Team & Processes',
      description: 'Scaled hiring across SEO, Ads, and Web; introduced internal SLAs, SOPs, and code/design review to maintain quality and delivery speed.',
      achievements: [
        'SOPs & SLAs',
        'Code/Design Reviews',
        'Faster Turnarounds'
      ],
      color: '#ef4444'
    },
    
  ]

  return (
    <section className="section evolution-section" style={{padding:'80px 0',background:'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(34,211,238,0.05) 100%)'}}>
      <div className="container fade-up">
        {/** Scroll reveal for Evolution only */}
        {(() => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                const el = entry.target
                if (entry.isIntersecting) {
                  el.style.opacity = '1'
                  el.style.transform = 'translateX(0) translateY(0)'
                }
              })
            }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' })

            const animated = document.querySelectorAll('.evo-anim')
            animated.forEach((el) => {
              const dir = el.getAttribute('data-dir') || 'up'
              const baseTranslate = dir === 'left' ? 'translateX(-24px)' : dir === 'right' ? 'translateX(24px)' : 'translateY(24px)'
              el.style.opacity = '0'
              el.style.transform = baseTranslate
              if (!el.style.transition) {
                el.style.transition = 'opacity 600ms ease, transform 600ms ease'
              }
              observer.observe(el)
            })

            return () => observer.disconnect()
          }, [])
          return null
        })()}
        <div style={{textAlign:'center',marginBottom:'60px'}}>
          <h2 className="section-title" style={{
            fontSize:'clamp(2rem, 4vw, 3rem)',
            fontWeight:'800',
            marginBottom:'16px',
            background:'linear-gradient(135deg, #ffffff 0%, var(--color-accent) 100%)',
            WebkitBackgroundClip:'text',
            WebkitTextFillColor:'transparent',
            backgroundClip:'text'
          }}>
            Our Evolution
          </h2>
          <div style={{
            width:'80px',
            height:'4px',
            background:'linear-gradient(90deg, var(--color-accent) 0%, #0ea5e9 100%)',
            margin:'0 auto 24px',
            borderRadius:'2px'
          }} />
          <p className="section-subtitle" style={{fontSize:'18px',maxWidth:'600px',margin:'0 auto'}}>
            From startup to industry leader - our journey of growth, innovation, and transformation
          </p>
        </div>

        {/* Timeline */}
        <div style={{position:'relative',maxWidth:'1000px',margin:'0 auto'}}>
          {/* Timeline Line */}
          <div style={{
            position:'absolute',
            left:'50%',
            top:'0',
            bottom:'0',
            width:'4px',
            background:'linear-gradient(180deg, var(--color-accent) 0%, #0ea5e9 100%)',
            transform:'translateX(-50%)',
            borderRadius:'2px'
          }} />

          {milestones.map((milestone, index) => (
            <div key={milestone.year} className="evo-anim" data-dir={index % 2 === 0 ? 'left' : 'right'} style={{
              transitionDelay:`${index*120}ms`,
              display:'grid',
              gridTemplateColumns:'1fr 1fr',
              alignItems:'center',
              gap:24,
              marginBottom:'80px',
              position:'relative'
            }}>
              {/* Timeline Dot */}
              <div className="evo-anim" data-dir="up" style={{
                transitionDelay:`${index*120 + 60}ms`,
                position:'absolute',
                left:'50%',
                top:'50%',
                transform:'translate(-50%, -50%)',
                width:'20px',
                height:'20px',
                borderRadius:'50%',
                background:milestone.color,
                border:'4px solid var(--bg)',
                zIndex:3,
                boxShadow:`0 0 20px ${milestone.color}40`
              }} />

              {/* Left column (even indexes) */}
              {index % 2 === 0 ? (
                <div className="evo-anim" data-dir="left" style={{display:'flex',justifyContent:'flex-end',zIndex:2,transitionDelay:`${index*120 + 120}ms`}}>
                  <div className="card" style={{
                    padding:'32px',
                    background:'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                    border:'1px solid #1f2937',
                    borderRadius:'16px',
                    position:'relative',
                    transition:'all 0.3s ease',
                    maxWidth:'520px',
                    width:'100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.borderColor = milestone.color
                    e.currentTarget.style.boxShadow = `0 20px 60px ${milestone.color}20`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#1f2937'
                    e.currentTarget.style.boxShadow = 'none'
                  }}>
                    <div style={{
                      position:'absolute',
                      top:'0',
                      left:'0',
                      right:'0',
                      height:'4px',
                      background:`linear-gradient(90deg, ${milestone.color} 0%, ${milestone.color}80 100%)`,
                      borderRadius:'16px 16px 0 0'
                    }} />
                    
                    <div style={{
                      display:'flex',
                      alignItems:'center',
                      gap:16,
                      marginBottom:'16px'
                    }}>
                      <div style={{
                        width:48,
                        height:48,
                        borderRadius:'12px',
                        background:`linear-gradient(135deg, ${milestone.color} 0%, ${milestone.color}80 100%)`,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        color:'#000',
                        fontWeight:'700',
                        fontSize:'18px'
                      }}>
                        {milestone.year}
                      </div>
                      <h3 style={{
                        margin:0,
                        fontSize:'24px',
                        fontWeight:'700',
                        color:'#fff'
                      }}>
                        {milestone.title}
                      </h3>
                    </div>

                    <p style={{
                      margin:'0 0 20px 0',
                      color:'var(--color-muted)',
                      lineHeight:'1.6',
                      fontSize:'16px'
                    }}>
                      {milestone.description}
                    </p>

                    <div style={{
                      display:'flex',
                      flexWrap:'wrap',
                      gap:'8px'
                    }}>
                      {milestone.achievements.map((achievement, idx) => (
                        <span key={idx} style={{
                          background:`${milestone.color}20`,
                          color:milestone.color,
                          padding:'6px 12px',
                          borderRadius:'20px',
                          fontSize:'12px',
                          fontWeight:'600',
                          border:`1px solid ${milestone.color}40`
                        }}>
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : <div />}

              {/* Right column (odd indexes) */}
              {index % 2 === 1 ? (
                <div className="evo-anim" data-dir="right" style={{display:'flex',justifyContent:'flex-start',zIndex:2,transitionDelay:`${index*120 + 120}ms`}}>
                  <div className="card" style={{
                    padding:'32px',
                    background:'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0.1) 100%)',
                    border:'1px solid #1f2937',
                    borderRadius:'16px',
                    position:'relative',
                    transition:'all 0.3s ease',
                    maxWidth:'520px',
                    width:'100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)'
                    e.currentTarget.style.borderColor = milestone.color
                    e.currentTarget.style.boxShadow = `0 20px 60px ${milestone.color}20`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = '#1f2937'
                    e.currentTarget.style.boxShadow = 'none'
                  }}>
                    <div style={{
                      position:'absolute',
                      top:'0',
                      left:'0',
                      right:'0',
                      height:'4px',
                      background:`linear-gradient(90deg, ${milestone.color} 0%, ${milestone.color}80 100%)`,
                      borderRadius:'16px 16px 0 0'
                    }} />
                    
                    <div style={{
                      display:'flex',
                      alignItems:'center',
                      gap:16,
                      marginBottom:'16px'
                    }}>
                      <div style={{
                        width:48,
                        height:48,
                        borderRadius:'12px',
                        background:`linear-gradient(135deg, ${milestone.color} 0%, ${milestone.color}80 100%)`,
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center',
                        color:'#000',
                        fontWeight:'700',
                        fontSize:'18px'
                      }}>
                        {milestone.year}
                      </div>
                      <h3 style={{
                        margin:0,
                        fontSize:'24px',
                        fontWeight:'700',
                        color:'#fff'
                      }}>
                        {milestone.title}
                      </h3>
                    </div>

                    <p style={{
                      margin:'0 0 20px 0',
                      color:'var(--color-muted)',
                      lineHeight:'1.6',
                      fontSize:'16px'
                    }}>
                      {milestone.description}
                    </p>

                    <div style={{
                      display:'flex',
                      flexWrap:'wrap',
                      gap:'8px'
                    }}>
                      {milestone.achievements.map((achievement, idx) => (
                        <span key={idx} style={{
                          background:`${milestone.color}20`,
                          color:milestone.color,
                          padding:'6px 12px',
                          borderRadius:'20px',
                          fontSize:'12px',
                          fontWeight:'600',
                          border:`1px solid ${milestone.color}40`
                        }}>
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : <div />}
            </div>
          ))}
        </div>

        {/* Future Vision */}
        <div style={{
          textAlign:'center',
          marginTop:'60px',
          padding:'40px',
          background:'linear-gradient(135deg, rgba(34,211,238,0.1) 0%, rgba(0,0,0,0.2) 100%)',
          borderRadius:'20px',
          border:'1px solid #1f2937'
        }}>
          <h3 style={{
            margin:'0 0 16px 0',
            fontSize:'28px',
            fontWeight:'700',
            color:'#fff'
          }}>
            Looking Ahead
          </h3>
          <p style={{
            color:'var(--color-muted)',
            fontSize:'18px',
            lineHeight:'1.6',
            maxWidth:'600px',
            margin:'0 auto 24px'
          }}>
            As we continue to evolve, our commitment remains the same: delivering exceptional digital marketing solutions that drive real business growth and create lasting value for our clients.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link className="btn" to="/about" style={{padding:'12px 24px'}}>Learn More About Us</Link>
            <Link className="btn secondary" to="/services" style={{padding:'12px 24px'}}>Explore Our Services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section">
      <div className="container fade-up" style={{display:'grid',gap:24}}>
        <div style={{textAlign:'center',maxWidth:800,margin:'0 auto'}}>
        <h2 className="section-title">About MarketIQ Solutions</h2>
        <p className="section-subtitle">We turn attention into revenue using data, design, and technology.</p>
          <p style={{margin:0,color:'var(--color-muted)',fontSize:'18px',lineHeight:'1.6'}}>
            Founded by passionate digital marketing experts, MarketIQ Solutions is a full-service digital marketing agency dedicated to helping businesses of all sizes achieve sustainable growth through strategic, data-driven marketing solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'}}>
          <div className="card service-anim" style={{animationDelay:`0ms`,padding:'32px'}}>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:'20px'}}>
              <div style={{width:48,height:48,borderRadius:'12px',background:'linear-gradient(135deg, var(--color-accent) 0%, #0ea5e9 100%)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
          </div>
              <h3 style={{margin:0,fontSize:'20px'}}>Our Mission</h3>
          </div>
            <p style={{margin:0,color:'var(--color-muted)',lineHeight:'1.6'}}>
              To empower businesses with cutting-edge digital marketing strategies that drive measurable growth, enhance brand visibility, and create lasting customer relationships in the digital landscape.
            </p>
          </div>
          
          <div className="card service-anim" style={{animationDelay:`80ms`,padding:'32px'}}>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:'20px'}}>
              <div style={{width:48,height:48,borderRadius:'12px',background:'linear-gradient(135deg, var(--color-accent) 0%, #0ea5e9 100%)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 style={{margin:0,fontSize:'20px'}}>Our Vision</h3>
            </div>
            <p style={{margin:0,color:'var(--color-muted)',lineHeight:'1.6'}}>
              To become the leading digital marketing partner for businesses worldwide, recognized for our innovative strategies, exceptional results, and unwavering commitment to client success.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div style={{textAlign:'center',margin:'32px 0'}}>
          <h3 style={{margin:'0 0 24px 0',fontSize:'24px'}}>What We Value</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))'}}>
            <div className="card service-anim" style={{animationDelay:`0ms`,padding:'24px'}}>
              <h4 style={{margin:'0 0 12px 0',color:'var(--color-accent)'}}>Data-Driven Decisions</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                Every strategy is backed by comprehensive analytics and market research to ensure optimal results.
              </p>
            </div>
            <div className="card service-anim" style={{animationDelay:`80ms`,padding:'24px'}}>
              <h4 style={{margin:'0 0 12px 0',color:'var(--color-accent)'}}>Fast Execution</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                We move quickly to implement campaigns and adapt strategies based on real-time performance data.
              </p>
            </div>
            <div className="card service-anim" style={{animationDelay:`160ms`,padding:'24px'}}>
              <h4 style={{margin:'0 0 12px 0',color:'var(--color-accent)'}}>Transparent Communication</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                Clear, honest reporting and regular updates keep you informed about your campaign performance.
              </p>
            </div>
            <div className="card service-anim" style={{animationDelay:`240ms`,padding:'24px'}}>
              <h4 style={{margin:'0 0 12px 0',color:'var(--color-accent)'}}>Innovation</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                We stay ahead of digital trends and leverage the latest tools and technologies for maximum impact.
              </p>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div style={{background:'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0.1) 100%)',padding:'40px',borderRadius:'16px',border:'1px solid #1f2937'}}>
          <h3 style={{margin:'0 0 24px 0',textAlign:'center',fontSize:'24px'}}>How We Work</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'24px'}}>
            <div style={{textAlign:'center'}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'var(--color-accent)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'#000',fontWeight:'700',fontSize:'20px'}}>1</div>
              <h4 style={{margin:'0 0 8px 0'}}>Discovery & Analysis</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                We start by understanding your business goals, target audience, and current digital presence through comprehensive analysis.
              </p>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'var(--color-accent)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'#000',fontWeight:'700',fontSize:'20px'}}>2</div>
              <h4 style={{margin:'0 0 8px 0'}}>Strategy Development</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                Based on insights, we create customized digital marketing strategies tailored to your specific needs and objectives.
              </p>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'var(--color-accent)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'#000',fontWeight:'700',fontSize:'20px'}}>3</div>
              <h4 style={{margin:'0 0 8px 0'}}>Implementation</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                Our expert team executes campaigns across multiple channels with precision and attention to detail.
              </p>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'var(--color-accent)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'#000',fontWeight:'700',fontSize:'20px'}}>4</div>
              <h4 style={{margin:'0 0 8px 0'}}>Optimization & Growth</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px',lineHeight:'1.5'}}>
                Continuous monitoring, testing, and optimization ensure your campaigns deliver maximum ROI and sustainable growth.
              </p>
            </div>
          </div>
        </div>

        {/* Proven Impact */}
        <div style={{textAlign:'center'}}>
          <h3 style={{margin:'0 0 24px 0',fontSize:'24px'}}>Proven Impact</h3>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))'}}>
            <div className="card service-anim" style={{animationDelay:`0ms`,padding:'24px'}}>
              <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>100+</div>
              <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Projects Completed</div>
            </div>
            <div className="card service-anim" style={{animationDelay:`80ms`,padding:'24px'}}>
              <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>50+</div>
              <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Happy Clients</div>
            </div>
            <div className="card service-anim" style={{animationDelay:`160ms`,padding:'24px'}}>
              <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>300%</div>
              <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Average ROI Increase</div>
            </div>
            <div className="card service-anim" style={{animationDelay:`240ms`,padding:'24px'}}>
              <div style={{fontSize:'32px',fontWeight:'700',color:'var(--color-accent)',marginBottom:'8px'}}>24/7</div>
              <div style={{color:'var(--color-muted)',fontSize:'14px'}}>Support Available</div>
            </div>
          </div>
        </div>

        {/* Team Expertise */}
        <div style={{background:'var(--nav-bg)',padding:'32px',borderRadius:'16px',border:'1px solid #1f2937'}}>
          <h3 style={{margin:'0 0 20px 0',textAlign:'center',fontSize:'24px'}}>Our Expertise</h3>
          <p style={{margin:'0 0 24px 0',color:'var(--color-muted)',textAlign:'center',lineHeight:'1.6'}}>
            Our diverse team of specialists brings together expertise in SEO, paid advertising, content creation, web development, and multimedia production to deliver comprehensive digital solutions.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>SEO Optimization</span>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>Google Ads</span>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>Meta Advertising</span>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>Web Development</span>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>Content Marketing</span>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>Brand Design</span>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>Photography</span>
            <span style={{background:'var(--color-accent)',color:'#000',padding:'8px 16px',borderRadius:'20px',fontSize:'14px',fontWeight:'600'}}>Video Production</span>
          </div>
        </div>

        <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
          <Link className="btn" to="/support">Request Free Audit</Link>
          <Link className="btn secondary" to="/services">Explore Services</Link>
          <Link className="btn secondary" to="/team">Meet Our Team</Link>
        </div>
      </div>
    </section>
  )
}


function HomeBottom(){
  return (
    <section className="section home-bottom">
      <div className="container panel fade-up">
        <div>
          <h3>Quick Links</h3>
          <div style={{display:'grid',gap:8}}>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/team">Team</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/support">Contact</Link>
          </div>
        </div>
        <div>
          <h3>Contact</h3>
          <div style={{display:'grid',gap:6,color:'var(--color-muted)'}}>
            <a href="mailto:marketiq1010@gmail.com">marketiq1010@gmail.com</a>
            <span>+91 8883113757</span>
            <span>+91 7708753986</span>
            <div style={{display:'flex',gap:10,marginTop:8}}>
              <a href="https://instagram.com/marketiq_solutions" target="_blank" rel="noreferrer" aria-label="Instagram" title="@marketiq_solutions" style={{display:'inline-flex',alignItems:'center',gap:6}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm11 1.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                </svg>
              </a>
              <a href="https://x.com/marketiq1010?s=21" target="_blank" rel="noreferrer" aria-label="X / Twitter" title="@marketiq1010">X</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Team(){
  const fallbackMembers = [
    { name:'SUGANTHAN A', role:'Founder / Operational Director / Multimedia Head', phone:'8883113757', email:'suganthansuganthan72@gmail.com', social: { instagram:'https://www.instagram.com/__hopzz_.7?igsh=Yzl0MmI4Znprdmd5&utm_source=qr' }, department: 'leadership', image: '/images/suganthan.jpeg' },
    { name:'GOBIKRISHNA S', role:'Founder / Managing Director / Strategy Lead', phone:'7708753986', email:'gobikrishna53986@gmail.com', social: { instagram:'_krishna_8808_' }, department: 'leadership', image: '/images/gobikrishna.jpeg' },
    { name:'KALAIVANI R', role:'Head', phone:'', email:'', social: {}, department: 'marketing', image: '/images/kalaivani.jpeg' },
    { name:'GOWTHAM B', role:'Member', phone:'', email:'', social: {}, department: 'marketing', image: '/images/gowtham.jpeg' },
    { name:'KABEENSANDIP SV', role:'Member', phone:'', email:'', social: {}, department: 'marketing', image: '/images/kabeen.jpeg' },
    { name:'BALAMURUGAN M', role:'Team Head', phone:'', email:'', social: {}, department: 'development', image: '/images/balamurugan.jpeg' },
    { name:'PRANITHA S G', role:'Member', phone:'', email:'', social: {}, department: 'development', image: '/images/pranitha.jpeg' },
    { name:'POWSIYA J', role:'Member', phone:'', email:'', social: {}, department: 'development', image: '/images/powsiya.jpeg'  },
    { name:'PRANISH T', role:'Member', phone:'', email:'', social: {}, department: 'development', image: '/images/pranish.jpeg'  },
    { name:'ASISHKHAN A', role:'Member', phone:'', email:'', social: {}, department: 'development', image: '/images/asish.jpeg'  },
    { name:'TANISHA H M', role:'Member', phone:'', email:'', social: {}, department: 'development', image: '/images/tanisha.jpeg'  },
    { name:'SENTHIL KUMAR K', role:'Cinematographer and Editor', phone:'', email:'', social: {}, department: 'design', image: '/images/senthilkumar.jpeg' },
    { name:'ARUN KAMESH D', role:'Photographer', phone:'', email:'', social: {}, department: 'design', image: '/images/arunkamesh.jpeg' },
    { name:'SAKTHI BABU', role:'Editor and Graphic Designer', phone:'', email:'', social: {}, department: 'design', image: '/images/sakthi.jpeg' },
  
    { name:'MANIKANDAN S ', role:'Editor and Graphic Designer', phone:'', email:'', social: {}, department: 'design', image: '/images/manikandan.jpeg' },
    { name:'SETHUPATHI M', role:'SEO Specialist', phone:'', email:'', social: {}, department: 'seo', image: '/images/sethu.jpeg' },
    { name:'NATHEESH S M', role:'Meta and google ads specialist', phone:'', email:'', social: {}, department: 'seo', image: '/images/nandheesh.jpeg' },
    { name:'DHARINEESH R', role:'Member', phone:'', email:'', social: {}, department: 'content', image: '/images/dharaneesh.jpeg' },
    { name:'PAVITHRA V', role:'Member', phone:'', email:'', social: {}, department: 'content', image: '/images/pavi.jpeg' },
  ]
  const [members, setMembers] = useState(fallbackMembers)
  const [selectedCategory, setSelectedCategory] = useState('founders')
  
  // Optional: Fetch from API in background without blocking UI
  useEffect(()=>{
    let mounted = true
    
    // Non-blocking API fetch - only updates if successful
    fetch('http://localhost:5000/api/team')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(mounted && data?.success && Array.isArray(data.data) && data.data.length){
          setMembers(data.data)
        }
      })
      .catch(() => {
        // Silently fail - fallback data already loaded
      })
    
    return ()=>{ mounted=false }
  }, [])

  // Filter members based on selected category
  const filteredMembers = members.filter(member => {
    if (selectedCategory === 'founders') {
      return member.department === 'leadership' || 
             member.role.toLowerCase().includes('founder') ||
             member.role.toLowerCase().includes('ceo') ||
             member.role.toLowerCase().includes('co-founder')
    }
    if (selectedCategory === 'marketing') {
      return member.department === 'marketing' || 
             member.role.toLowerCase().includes('marketing') ||
             member.role.toLowerCase().includes('strategy') ||
             member.role.toLowerCase().includes('management')
    }
    if (selectedCategory === 'web-app') {
      return member.department === 'development' || 
             member.role.toLowerCase().includes('developer') ||
             member.role.toLowerCase().includes('programmer') ||
             member.role.toLowerCase().includes('engineer')
    }
    if (selectedCategory === 'multimedia') {
      return member.department === 'design' || 
             member.role.toLowerCase().includes('designer') ||
             member.role.toLowerCase().includes('multimedia') ||
             member.role.toLowerCase().includes('graphic') ||
             member.role.toLowerCase().includes('video') ||
             member.role.toLowerCase().includes('content')
    }
    if (selectedCategory === 'seo') {
      return member.department === 'seo' ||
             member.role.toLowerCase().includes('seo')
    }
    if (selectedCategory === 'content') {
      return member.department === 'content' ||
             member.role.toLowerCase().includes('content') ||
             member.role.toLowerCase().includes('writer') ||
             member.role.toLowerCase().includes('copy')
    }
    return false
  })

  return (
    <section className="section team-section">
      <div className="container fade-up" style={{display:'grid',gap:16}}>
        <h2 className="section-title">Our Team</h2>
        <p className="section-subtitle">Meet the talented people behind MarketIQ Solutions</p>
        
        {/* Team Filter Buttons */}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:24}}>
          <button 
            onClick={() => setSelectedCategory('founders')}
            className={`btn ${selectedCategory === 'founders' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Founders
          </button>
          <button 
            onClick={() => setSelectedCategory('marketing')}
            className={`btn ${selectedCategory === 'marketing' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Marketing Strategy & Management
          </button>
          <button 
            onClick={() => setSelectedCategory('web-app')}
            className={`btn ${selectedCategory === 'web-app' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Web & App Development
          </button>
          <button 
            onClick={() => setSelectedCategory('multimedia')}
            className={`btn ${selectedCategory === 'multimedia' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Multimedia Team
          </button>
          <button 
            onClick={() => setSelectedCategory('seo')}
            className={`btn ${selectedCategory === 'seo' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            The Digital Growth Architect
          </button>
          <button 
            onClick={() => setSelectedCategory('content')}
            className={`btn ${selectedCategory === 'content' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Content Creation Team
          </button>
        </div>

        <div className="grid">
          {filteredMembers.map((m,idx) => (
              <div key={m.name} className="card service-anim" style={{display:'grid',gap:16,textAlign:'center',padding:'24px',animationDelay:`${idx*80}ms`}}>
                <div style={{display:'flex',justifyContent:'center'}}>
                  {m.image ? (
                    <>
                      <img 
                        src={m.image} 
                        alt={m.name}
                        style={{width:160,height:160,borderRadius:'50%',objectFit:'cover',border:'5px solid var(--nav-bg)'}}
                        onError={(e) => {
                          console.error('Image failed to load:', m.image, e);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'grid';
                        }}
                        onLoad={() => console.log('Image loaded successfully:', m.image)}
                      />
                      <div style={{width:160,height:160,borderRadius:'50%',background:'var(--nav-bg)',display:'none',placeItems:'center',color:'#fff',fontWeight:700,fontSize:'48px',border:'5px solid var(--nav-bg)'}}>
                        {m.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                      </div>
                    </>
                  ) : (
                    <div style={{width:160,height:160,borderRadius:'50%',background:'var(--nav-bg)',display:'grid',placeItems:'center',color:'#fff',fontWeight:700,fontSize:'48px',border:'5px solid var(--nav-bg)'}}>
                      {m.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{fontWeight:700,fontSize:'18px',marginBottom:'6px',color:'#000'}}>{m.name}</div>
                  <div style={{fontSize:'14px',marginBottom:'6px',color:'#000'}}>{m.role}</div>
                  <div style={{fontSize:'12px',color:'var(--color-muted)'}}>
                    {m.department === 'leadership' && 'Leadership Team'}
                    {m.department === 'marketing' && 'Marketing Strategy & Management'}
                    {m.department === 'development' && 'Web & App Development'}
                    {m.department === 'design' && 'Multimedia Team'}
                    {m.department === 'seo' && 'The Digital Growth Architect'}
                    {m.department === 'content' && 'Content Creation Team'}
                  </div>
                </div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',color:'var(--color-muted)',fontSize:'12px'}}>
                  {m.phone && <a href={`tel:+91${m.phone}`} style={{textDecoration:'none',color:'var(--color-muted)'}}>+91 {m.phone}</a>}
                  {m.phone && m.email && <span>•</span>}
                  {m.email && <a href={`mailto:${m.email}`} style={{textDecoration:'none',color:'var(--color-muted)'}}>{m.email}</a>}
                  {m.social?.instagram && (
                    (()=>{
                      const raw = String(m.social.instagram || '')
                      const isUrl = raw.startsWith('http')
                      const username = isUrl
                        ? raw.replace(/https?:\/\/[^/]*instagram\.com\//, '').split(/[/?#]/)[0]
                        : raw
                      const href = isUrl ? raw : `https://www.instagram.com/${username}`
                      return (
                    <>
                      <span>•</span>
                          <a href={href} target="_blank" rel="noreferrer" style={{textDecoration:'none',color:'var(--color-muted)'}}>IG: {username}</a>
                    </>
                      )
                    })()
                  )}
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="section home-bottom" style={{borderTop:'1px solid #222'}}>
      <div className="container" style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',alignItems:'center'}}>
        <span style={{color:'var(--color-muted)'}}>© {new Date().getFullYear()} Marketiq</span>
        <span style={{color:'var(--color-muted)'}}>MarketIQ_Solutions</span>
      </div>
      <div className="footer-stripes" />
    </footer>
  )
}

export default function App(){
  return (
    <>
      <a href="#main" style={{position:'absolute',left:-9999,top:0,background:'#000',color:'#fff',padding:'8px 12px'}}>
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main" role="main">
      <Routes>
        <Route path="/" element={<Page title="MarketIQ Solutions — Grow smarter" description="SEO, Ads, social media, and conversion‑focused websites to help you get found and chosen online."><>
          <Hero />
          <Services />
          <About />
          <HomeBottom />
        </></Page>} />
        <Route path="/services" element={<Page title="Services — MarketIQ Solutions" description="SEO, Google Ads, Meta Ads, web design & development, content, and branding."><Services /></Page>} />
        <Route path="/about" element={<Page title="About — MarketIQ Solutions" description="We turn attention into revenue using data, design, and technology."><About /></Page>} />
        <Route path="/evolution" element={<Page title="Our Evolution — MarketIQ Solutions" description="From startup to industry leader - our journey of growth, innovation, and transformation."><Evolution /></Page>} />
        <Route path="/blog" element={<Page title="Blog — MarketIQ Solutions" description="Insights on SEO, ads, content, and growth."><BlogList /></Page>} />
        <Route path="/blog/:slug" element={<Page title="Blog Post — MarketIQ Solutions" description="Detailed insights and guides from MarketIQ."><BlogPost /></Page>} />
        <Route path="/team" element={<Page title="Team — MarketIQ Solutions" description="Meet the people behind the results."><Team /></Page>} />
        <Route path="/feedback" element={<Page title="Feedback — MarketIQ Solutions" description="What our clients say about working with us."><FeedbackPage /></Page>} />
        <Route path="/support" element={<Page title="Contact — MarketIQ Solutions" description="Tell us your goal and we'll design a plan."><Contact /></Page>} />
        <Route path="/careers" element={<Page title="Careers — MarketIQ Solutions" description="Smart people. Practical impact. Flexible work."><Careers /></Page>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
      <Footer />
    </>
  )
} 