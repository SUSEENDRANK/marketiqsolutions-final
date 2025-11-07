import React from 'react'

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container fade-up" style={{display:'grid',gap:24}}>
        <div style={{textAlign:'center'}}>
          <h2 className="section-title">Let's Talk</h2>
          <p className="section-subtitle">Ready to grow your business? Get in touch with us today.</p>
        </div>
        
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))',gap:24}}>
          {/* Contact Information */}
          <div className="card" style={{padding:'24px',textAlign:'center'}}>
            <h3 style={{margin:'0 0 16px 0',color:'var(--color-accent)'}}>Get in Touch</h3>
            <div style={{display:'grid',gap:16}}>
              <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:'center'}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--nav-bg)',display:'grid',placeItems:'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <div style={{fontWeight:600}}>Email</div>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=marketiq1010@gmail.com" target="_blank" rel="noreferrer" style={{color:'var(--color-muted)',textDecoration:'none'}}>marketiq1010@gmail.com</a>
                </div>
              </div>
              
              <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:'center'}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--nav-bg)',display:'grid',placeItems:'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <div style={{fontWeight:600}}>Phone</div>
                  <div style={{color:'var(--color-muted)'}}>
                    <a href="tel:+918883113757" style={{color:'var(--color-muted)',textDecoration:'none'}}>+91 8883113757</a><br/>
                    <a href="tel:+917708753986" style={{color:'var(--color-muted)',textDecoration:'none'}}>+91 7708753986</a>
                  </div>
                </div>
              </div>
              
              <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:'center'}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--nav-bg)',display:'grid',placeItems:'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div>
                  <div style={{fontWeight:600}}>Location</div>
                  <a href="https://maps.app.goo.gl/sDgYAGvt6xxiBdJm9" target="_blank" rel="noreferrer" style={{color:'var(--color-muted)',textDecoration:'none'}}>Erode, Tamil Nadu, India</a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Media & Quick Contact */}
          <div className="card" style={{padding:'24px',textAlign:'center'}}>
            <h3 style={{margin:'0 0 16px 0',color:'var(--color-accent)'}}>Follow Us</h3>
            <div style={{display:'grid',gap:16}}>
              <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
                <a href="https://instagram.com/marketiq_solutions" target="_blank" rel="noreferrer" 
                   style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',background:'var(--nav-bg)',borderRadius:8,textDecoration:'none',color:'#fff'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm11 1.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
                  </svg>
                  Instagram
                </a>
                <a href="https://x.com/marketiq1010?s=21" target="_blank" rel="noreferrer" style={{display:'flex',alignItems:'center',gap:8,padding:'8px 16px',background:'var(--nav-bg)',borderRadius:8,textDecoration:'none',color:'#fff'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X (Twitter)
                </a>
                {/* LinkedIn removed */}
              </div>
              
              <div style={{marginTop:16,padding:16,background:'rgba(34,211,238,0.1)',borderRadius:8,border:'1px solid rgba(34,211,238,0.3)'}}>
                <h4 style={{margin:'0 0 8px 0',color:'var(--color-accent)'}}>Quick Response</h4>
                <p style={{margin:0,fontSize:14,color:'var(--color-muted)'}}>We typically respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Google Forms Option */}
        <div style={{textAlign:'center',marginTop:24}}>
          <p style={{margin:'0 0 16px 0',color:'var(--color-muted)'}}>Prefer to use Google Forms? We've got you covered!</p>
          <a href="https://forms.gle/rVdqwZhATyP7kGYd7" target="_blank" rel="noreferrer" className="btn" style={{padding:'16px 32px',fontSize:'18px'}}>
            Use Google Forms
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
