import React, { useState } from 'react'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className='header-container'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            {/* Logo */}
            <div className='logo-container'>
              <a href="/" className='flex items-center space-x-2'>
                <div className='logo-circle'></div>
                <span className='logo-text'>Ecommerce</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden md:flex items-center space-x-8'>
              <a href="/" className='nav-link'>Home</a>
              <a href="/products" className='nav-link'>Products</a>
              <a href="/categories" className='nav-link'>Categories</a>
              <a href="/about" className='nav-link'>About</a>
              <a href="/contact" className='nav-link'>Contact</a>
            </nav>

            {/* Search and Actions */}
            <div className='flex items-center space-x-4'>
              {/* Search Bar */}
              <div className='hidden sm:flex items-center search-container'>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className='search-input'
                />
                <button className='search-button'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Cart Icon */}
              <button className='icon-button cart-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className='badge'>3</span>
              </button>

              {/* User Icon */}
              <button className='icon-button'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* Mobile Menu Button */}
              <button onClick={toggleMobileMenu} className='md:hidden icon-button'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay and Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className='mobile-overlay md:hidden' 
            onClick={toggleMobileMenu}
          >
            
          </div>
          
          {/* Mobile Navigation */}
          <nav className='md:hidden mobile-nav'>
            {/* Close Button */}
            <div className='mobile-nav-header'>
              <h2 className='mobile-nav-title'>Menu</h2>
              <button onClick={toggleMobileMenu} className='mobile-close-button'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <a href="/" className='mobile-nav-link mobile-nav-link-1' onClick={toggleMobileMenu}>Home</a>
            <a href="/products" className='mobile-nav-link mobile-nav-link-2' onClick={toggleMobileMenu}>Products</a>
            <a href="/categories" className='mobile-nav-link mobile-nav-link-3' onClick={toggleMobileMenu}>Categories</a>
            <a href="/about" className='mobile-nav-link mobile-nav-link-4' onClick={toggleMobileMenu}>About</a>
            <a href="/contact" className='mobile-nav-link mobile-nav-link-5' onClick={toggleMobileMenu}>Contact</a>
          </nav>
        </>
      )}
    </>
  )
}
