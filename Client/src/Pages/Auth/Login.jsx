import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../Api/services/authService'

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setLoading(true);
    
    const form = e.target
    if (!form.checkValidity()) {
      return
    }
    
    try {
      const response = await authService.login({ userNameOrEmail: formData.email, password: formData.password });
      console.log('Login successful:', response);
      // Redirect or update state

      if(response?.status === 200) {
      navigate("/");
      }
    } catch (err) {
      console.error('Login error:', err);
      // setError(err.message);
    } finally {
      setLoading(false);
    }
    console.log('Login:', formData)
    // Add your login logic here
  }

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        {/* Left side - Branding/Info */}
        <div className='auth-info'>
          <div className='auth-brand'>
            <div className='auth-logo'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h1 className='auth-brand-title'>Welcome Back!</h1>
            <p className='auth-brand-subtitle'>
              Sign in to your account to continue shopping and manage your orders.
            </p>
          </div>
          <div className='auth-features'>
            <div className='auth-feature'>
              <div className='auth-feature-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className='auth-feature-title'>Secure & Safe</h3>
                <p className='auth-feature-text'>Your data is protected with enterprise-grade security</p>
              </div>
            </div>
            <div className='auth-feature'>
              <div className='auth-feature-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className='auth-feature-title'>Lightning Fast</h3>
                <p className='auth-feature-text'>Experience blazing fast performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className='auth-form-container'>
          <div className='auth-form-wrapper'>
            <div className='auth-form-header'>
              <h2 className='auth-form-title'>Sign In</h2>
              <p className='auth-form-subtitle'>Enter your credentials to access your account</p>
            </div>

           

            <form noValidate onSubmit={handleSubmit} className={`auth-form ${isSubmitted ? 'auth-form-submitted' : ''}`}>
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
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div className='auth-form-group'>
                <label htmlFor='password' className='auth-form-label'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
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
                    placeholder='Enter your password'
                    required
                    disabled={loading}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='auth-password-toggle'
                    disabled={loading}
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

              {/* Remember Me & Forgot Password */}
              <div className='auth-form-options'>
                <label className='auth-checkbox-label'>
                  <input type='checkbox' className='auth-checkbox' />
                  <span className='auth-checkbox-text'>Remember me</span>
                </label>
                <a href='#forgot' className='auth-link'>Forgot password?</a>
              </div>

              {/* Submit Button */}
              <button type='submit' className={`auth-submit-button `} disabled={loading} >
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H8" />
                    </svg>
                    <span style={{ marginLeft: 8 }}>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Social Login */}
              <div className='auth-social-divider'>
                <span>Or continue with</span>
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

              {/* Sign Up Link */}
              <div className='auth-footer'>
                <p>
                  Don't have an account?{' '}
                  <a href='/register' className='auth-link-primary'>Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
