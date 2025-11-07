import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo-placeholder.svg'

function Navbar(){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="section navbar" style={{padding:'12px 0'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'flex-start',gap:16,width:'100%',maxWidth:'none',marginLeft:0,marginRight:0,paddingLeft:0,paddingRight:24}}>
        <Link to="/" style={{display:'flex',alignItems:'center',gap:8}}>
          <img className="logo-hover" src={logo} alt="Marketiq" style={{width:56,borderRadius:12}} />
          <strong>MarketIQ_Solutions</strong>
        </Link>
        
        {/* Desktop Navigation */}
        <div style={{display:'flex',gap:16,flexWrap:'wrap',alignItems:'center',marginLeft:'auto',justifyContent:'flex-end'}} className="desktop-nav">
          <NavLink to="/" className={({isActive})=> isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/services" className={({isActive})=> isActive ? 'active' : undefined}>Services</NavLink>
          <NavLink to="/about" className={({isActive})=> isActive ? 'active' : undefined}>About</NavLink>
          <NavLink to="/evolution" className={({isActive})=> isActive ? 'active' : undefined}>Evolution</NavLink>
          <NavLink to="/blog" className={({isActive})=> isActive ? 'active' : undefined}>Blog</NavLink>
          <NavLink to="/team" className={({isActive})=> isActive ? 'active' : undefined}>Team</NavLink>
          <NavLink to="/feedback" className={({isActive})=> isActive ? 'active' : undefined}>Feedback</NavLink>
          <NavLink to="/support" className={({isActive})=> isActive ? 'active' : undefined}>Contact</NavLink>
          <NavLink to="/careers" className={({isActive})=> isActive ? 'active' : undefined}>Careers</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="mobile-menu-btn"
          style={{
            display:'none',
            background:'transparent',
            border:'none',
            color:'#fff',
            cursor:'pointer',
            padding:'8px',
            borderRadius:'8px'
          }}
          aria-label="Toggle mobile menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            {isMobileMenuOpen ? (
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className="mobile-menu"
        style={{
          display: isMobileMenuOpen ? 'block' : 'none',
          background:'var(--nav-bg)',
          borderTop:'1px solid #1f2a2a',
          padding:'16px 0'
        }}
      >
        <div className="container" style={{display:'grid',gap:12}}>
          <NavLink 
            to="/" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            Home
          </NavLink>
          <NavLink 
            to="/services" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            Services
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            About
          </NavLink>
          <NavLink 
            to="/evolution" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            Evolution
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/team" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            Team
          </NavLink>
          <NavLink 
            to="/feedback" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            Feedback
          </NavLink>
          <NavLink 
            to="/support" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0',borderBottom:'1px solid #1f2a2a'}}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/careers" 
            className={({isActive})=> isActive ? 'active' : undefined}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{padding:'12px 0'}}
          >
            Careers
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar   
