import React, { useState } from 'react'

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    
    const form = e.target
    if (!form.checkValidity()) {
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Register:', formData)
    // Add your registration logic here
  }

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        {/* Left side - Branding/Info */}
        <div className='auth-info'>
          <div className='auth-brand'>
            <div className='auth-logo'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className='auth-brand-title'>Join Us Today!</h1>
            <p className='auth-brand-subtitle'>
              Create your account and start enjoying exclusive deals and faster checkout.
            </p>
          </div>
          <div className='auth-features'>
            <div className='auth-feature'>
              <div className='auth-feature-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div>
                <h3 className='auth-feature-title'>Best Deals</h3>
                <p className='auth-feature-text'>Get access to exclusive discounts and offers</p>
              </div>
            </div>
            <div className='auth-feature'>
              <div className='auth-feature-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h3 className='auth-feature-title'>Track Orders</h3>
                <p className='auth-feature-text'>Monitor your purchases in real-time</p>
              </div>
            </div>
            <div className='auth-feature'>
              <div className='auth-feature-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className='auth-feature-title'>Premium Support</h3>
                <p className='auth-feature-text'>24/7 customer service at your fingertips</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Register Form */}
        <div className='auth-form-container'>
          <div className='auth-form-wrapper'>
            <div className='auth-form-header'>
              <h2 className='auth-form-title'>Create Account</h2>
              <p className='auth-form-subtitle'>Fill in your details to get started</p>
            </div>

            <form noValidate onSubmit={handleSubmit} className={`auth-form ${isSubmitted ? 'auth-form-submitted' : ''}`}>
              {/* Name Fields */}
              <div className='auth-form-row'>
                <div className='auth-form-group'>
                  <label htmlFor='firstName' className='auth-form-label'>
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='auth-form-input'
                    placeholder='First name'
                    required
                  />
                </div>
                <div className='auth-form-group'>
                  <label htmlFor='lastName' className='auth-form-label'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='auth-form-input'
                    placeholder='Last name'
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className='auth-form-group'>
                <label htmlFor='email' className='auth-form-label'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='auth-form-input'
                  placeholder='Enter your email'
                  required
                />
              </div>

              {/* Password Fields */}
              <div className='auth-form-row'>
                <div className='auth-form-group'>
                  <label htmlFor='password' className='auth-form-label'>
                    Password
                  </label>
                  <div className='auth-form-password'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      name='password'
                      value={formData.password}
                      onChange={handleChange}
                      className='auth-form-input'
                      placeholder='Create password'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='auth-password-toggle'
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className='auth-form-group'>
                  <label htmlFor='confirmPassword' className='auth-form-label'>
                    Confirm Password
                  </label>
                  <div className='auth-form-password'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id='confirmPassword'
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className='auth-form-input'
                      placeholder='Confirm password'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='auth-password-toggle'
                    >
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className='auth-form-group'>
                <label className='auth-checkbox-label'>
                  <input 
                    type='checkbox' 
                    name='acceptTerms'
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className='auth-checkbox' 
                    required
                  />
                  <span className='auth-checkbox-text'>
                    I agree to the{' '}
                    <a href='#terms' className='auth-link-inline'>Terms of Service</a>{' '}
                    and{' '}
                    <a href='#privacy' className='auth-link-inline'>Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button type='submit' className='auth-submit-button'>
                <span>Create Account</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Social Sign Up */}
              <div className='auth-social-divider'>
                <span>Or sign up with</span>
              </div>

              <div className='auth-social-buttons'>
                <button type='button' className='auth-social-button'>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type='button' className='auth-social-button'>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Sign In Link */}
              <div className='auth-footer'>
                <p>
                  Already have an account?{' '}
                  <a href='/login' className='auth-link-primary'>Sign in</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
