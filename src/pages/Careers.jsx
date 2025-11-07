import { useState, useEffect } from 'react'

export default function Careers(){
  const fallbackRoles = [
    { 
      title:'SEO Specialist', 
      type:'Full‑time', 
      location:'Hybrid, Erode', 
      experience:'2+ years',
      description:'Develop and execute SEO strategies, conduct audits, and improve organic search rankings.',
      requirements:['Technical SEO knowledge', 'Content optimization', 'Link building', 'Analytics tools'],
      applicationEmail:'marketiq1010@gmail.com' 
    },
    { 
      title:'Google Ads Specialist', 
      type:'Full‑time', 
      location:'Hybrid, Erode', 
      experience:'2+ years',
      description:'Manage Google Ads campaigns, optimize budgets, and scale profitable growth for our clients.',
      requirements:['Google Ads certified', 'Campaign optimization', 'Analytics expertise', 'Client communication'],
      applicationEmail:'marketiq1010@gmail.com' 
    },
    { 
      title:'Meta Ads Manager', 
      type:'Full‑time', 
      location:'Hybrid, Erode', 
      experience:'2+ years',
      description:'Create and manage Facebook/Instagram ad campaigns to drive conversions and brand awareness.',
      requirements:['Meta Ads experience', 'Creative optimization', 'Audience targeting', 'Performance analysis'],
      applicationEmail:'marketiq1010@gmail.com' 
    },
    { 
      title:'Web Developer', 
      type:'Full‑time', 
      location:'Hybrid, Erode', 
      experience:'2+ years',
      description:'Build fast, accessible websites and landing pages using React, Next.js, and modern tools.',
      requirements:['React/Next.js', 'CSS/SCSS', 'Git', 'Performance optimization'],
      applicationEmail:'marketiq1010@gmail.com' 
    },
    { 
      title:'Content Writer', 
      type:'Contract', 
      location:'Remote', 
      experience:'1+ years',
      description:'Create SEO-optimized content that ranks and converts for our clients.',
      requirements:['Content writing', 'SEO knowledge', 'Research skills', 'Brand voice'],
      applicationEmail:'marketiq1010@gmail.com' 
    },
    { 
      title:'Brand Designer', 
      type:'Full‑time', 
      location:'Hybrid, Erode', 
      experience:'2+ years',
      description:'Design brand identities, logos, and marketing materials that resonate with target audiences.',
      requirements:['Adobe Creative Suite', 'Brand strategy', 'Visual design', 'Client presentation'],
      applicationEmail:'marketiq1010@gmail.com' 
    }
  ]
  const [roles, setRoles] = useState(fallbackRoles)
  const [selectedFilter, setSelectedFilter] = useState('all')
  
  // Optional: Fetch from API in background without blocking UI
  useEffect(()=>{
    let mounted = true
    
    // Non-blocking API fetch - only updates if successful
    fetch('http://localhost:5000/api/careers')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if(mounted && data?.success && Array.isArray(data.data) && data.data.length){
          setRoles(data.data)
        }
      })
      .catch(() => {
        // Silently fail - fallback data already loaded
      })
    
    return ()=>{ mounted=false }
  }, [])

  const filteredRoles = roles.filter(role => {
    if (selectedFilter === 'all') return true
    return role.type.toLowerCase().includes(selectedFilter.toLowerCase())
  })

  return (
    <section className="section careers-section">
      <div className="container fade-up" style={{display:'grid',gap:32}}>
        {/* Header */}
        <div style={{textAlign:'center'}}>
          <h1 className="section-title">Join MarketIQ Solutions</h1>
          <p className="section-subtitle">Smart people. Practical impact. Flexible work.</p>
          <p style={{margin:'16px auto 0 auto',color:'var(--color-muted)',maxWidth:600}}>
            We're building the future of digital marketing. Join a team that values creativity, 
            data-driven decisions, and making a real impact for our clients.
          </p>
        </div>

        {/* Company Culture */}
        <div style={{display:'grid',gap:24}}>
          <h2 style={{textAlign:'center',margin:'0 0 16px 0'}}>Why Work With Us?</h2>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))'}}>
            <div className="card" style={{padding:'24px',textAlign:'center'}}>
              <div style={{
                width:'60px',
                height:'60px',
                borderRadius:'50%',
                background:'linear-gradient(135deg, var(--color-accent) 0%, #0ea5e9 100%)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                margin:'0 auto 16px auto'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 style={{margin:'0 0 8px 0'}}>Growth Opportunities</h3>
              <p style={{margin:0,color:'var(--color-muted)'}}>
                Continuous learning, skill development, and career advancement in the fast-growing digital marketing industry.
              </p>
            </div>
            
            <div className="card" style={{padding:'24px',textAlign:'center'}}>
              <div style={{
                width:'60px',
                height:'60px',
                borderRadius:'50%',
                background:'linear-gradient(135deg, var(--color-accent) 0%, #0ea5e9 100%)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                margin:'0 auto 16px auto'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 style={{margin:'0 0 8px 0'}}>Flexible Work</h3>
              <p style={{margin:0,color:'var(--color-muted)'}}>
                Remote, hybrid, and flexible working arrangements that fit your lifestyle and maximize productivity.
              </p>
            </div>
            
            <div className="card" style={{padding:'24px',textAlign:'center'}}>
              <div style={{
                width:'60px',
                height:'60px',
                borderRadius:'50%',
                background:'linear-gradient(135deg, var(--color-accent) 0%, #0ea5e9 100%)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                margin:'0 auto 16px auto'
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5V22h6zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9.5c0-.83.67-1.5 1.5-1.5S12 8.67 12 9.5V15h2.5v7h-7z"/>
                </svg>
              </div>
              <h3 style={{margin:'0 0 8px 0'}}>Impact & Results</h3>
              <p style={{margin:0,color:'var(--color-muted)'}}>
                Work on meaningful projects that directly impact client success and business growth.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div style={{display:'grid',gap:24}}>
          <h2 style={{textAlign:'center',margin:'0 0 16px 0'}}>Benefits & Perks</h2>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))',
            gap:16,
            padding:'24px',
            background:'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0.1) 100%)',
            borderRadius:'16px',
            border:'1px solid #1f2937'
          }}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Competitive salary</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Health insurance</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Learning budget</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Flexible hours</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Remote work options</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Team events</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Modern equipment</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Career development</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:'24px',
                height:'24px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexShrink:0
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{color:'#000'}}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <span>Performance bonuses</span>
            </div>
          </div>
        </div>

        {/* Job Filter */}
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <button 
            onClick={() => setSelectedFilter('all')}
            className={`btn ${selectedFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            All Positions
          </button>
          <button 
            onClick={() => setSelectedFilter('full')}
            className={`btn ${selectedFilter === 'full' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Full-time
          </button>
          <button 
            onClick={() => setSelectedFilter('contract')}
            className={`btn ${selectedFilter === 'contract' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Contract
          </button>
          <button 
            onClick={() => setSelectedFilter('intern')}
            className={`btn ${selectedFilter === 'intern' ? 'btn-primary' : 'btn-secondary'}`}
            style={{padding:'8px 16px',borderRadius:'20px',fontSize:'14px'}}
          >
            Internship
          </button>
        </div>

        {/* Job Listings */}
        <div style={{display:'grid',gap:24}}>
          <h2 style={{textAlign:'center',margin:'0 0 16px 0'}}>Open Positions</h2>
          <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(350px, 1fr))'}}>
            {filteredRoles.map((r,idx)=> (
                <div key={r.title} className="card service-anim" style={{
                  padding:'24px',
                  animationDelay:`${idx*100}ms`,
                  transition:'all 0.3s ease',
                  display:'flex',
                  flexDirection:'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,211,238,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
                    <h3 style={{margin:'0 0 8px 0',fontSize:'20px'}}>{r.title}</h3>
                    <span style={{
                      background:'var(--color-accent)',
                      color:'#000',
                      padding:'4px 8px',
                      borderRadius:'12px',
                      fontSize:'12px',
                      fontWeight:'600',
                      flexShrink:0
                    }}>
                      {r.type}
                    </span>
                  </div>
                  
                  <p style={{margin:'0 0 16px 0',color:'var(--color-muted)',lineHeight:'1.6'}}>{r.description}</p>
                  
                  <div style={{marginBottom:'16px'}}>
                    <div style={{display:'flex',gap:16,marginBottom:'8px',flexWrap:'wrap'}}>
                      <span style={{color:'var(--color-muted)',fontSize:'14px'}}>📍 {r.location}</span>
                      <span style={{color:'var(--color-muted)',fontSize:'14px'}}>💼 {r.experience}</span>
                    </div>
                  </div>
                  
                  <div style={{marginBottom:'20px'}}>
                    <h4 style={{margin:'0 0 8px 0',fontSize:'14px',color:'var(--color-accent)'}}>Key Requirements:</h4>
                    <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                      {r.requirements.map((req, reqIdx) => (
                        <span key={reqIdx} style={{
                          background:'rgba(34,211,238,0.1)',
                          color:'var(--color-accent)',
                          padding:'4px 8px',
                          borderRadius:'8px',
                          fontSize:'12px',
                          border:'1px solid rgba(34,211,238,0.3)'
                        }}>
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <a
                    className="btn"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeyH2EkjjpKUFG9VZRr-iUa7_bxV7KXhCReU0wWyyN5qIbsdw/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width:'100%',
                      textAlign:'center',
                      padding:'12px 16px',
                      fontSize:'14px',
                      fontWeight:'600',
                      marginTop:'auto'
                    }}
                  >
                    Apply Now
                  </a>
                </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div style={{
          padding:'32px',
          background:'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, rgba(0,0,0,0.1) 100%)',
          borderRadius:'16px',
          border:'1px solid #1f2937',
          textAlign:'center'
        }}>
          <h2 style={{margin:'0 0 16px 0'}}>Application Process</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))',gap:24,marginTop:'24px'}}>
            <div>
              <div style={{
                width:'48px',
                height:'48px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                color:'#000',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                margin:'0 auto 12px auto',
                fontWeight:'700',
                fontSize:'18px'
              }}>1</div>
              <h4 style={{margin:'0 0 8px 0'}}>Apply</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px'}}>Send your resume and cover letter</p>
            </div>
            <div>
              <div style={{
                width:'48px',
                height:'48px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                color:'#000',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                margin:'0 auto 12px auto',
                fontWeight:'700',
                fontSize:'18px'
              }}>2</div>
              <h4 style={{margin:'0 0 8px 0'}}>Interview</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px'}}>Initial screening and technical interview</p>
            </div>
            <div>
              <div style={{
                width:'48px',
                height:'48px',
                borderRadius:'50%',
                background:'var(--color-accent)',
                color:'#000',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                margin:'0 auto 12px auto',
                fontWeight:'700',
                fontSize:'18px'
              }}>3</div>
              <h4 style={{margin:'0 0 8px 0'}}>Decision</h4>
              <p style={{margin:0,color:'var(--color-muted)',fontSize:'14px'}}>We'll get back to you within a week</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div style={{textAlign:'center',padding:'32px 0'}}>
          <h3 style={{margin:'0 0 16px 0'}}>Don't See Your Role?</h3>
          <p style={{margin:'0 0 24px 0',color:'var(--color-muted)'}}>
            We're always looking for talented people. Send us your resume and let's talk!
          </p>
          <a 
            className="btn" 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeyH2EkjjpKUFG9VZRr-iUa7_bxV7KXhCReU0wWyyN5qIbsdw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            style={{padding:'16px 32px',fontSize:'16px'}}
          >
            Send General Application
          </a>
        </div>
      </div>
    </section>
  )
}


