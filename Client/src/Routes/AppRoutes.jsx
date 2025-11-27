import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '../Layout/MainLayout'
import { Home } from '../Pages/Home/Home'
import { Login } from '../Pages/Auth/Login'
import { Register } from '../Pages/Auth/Register'
import { isAuthenticated } from '../Api/utils/tokenManager'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* Add more routes here as you create pages */}
        </Route>

        {/* Auth Routes without Layout. If user is already authenticated, redirect to home */}
        <Route
          path="/login"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated() ? <Navigate to="/" replace /> : <Register />
          }
        />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// 404 Component
const NotFound = () => {
  return (
    <div className='not-found-container'>
      <div className='text-center text-white'>
        <h1 className='text-9xl font-bold mb-4'>404</h1>
        <h2 className='text-3xl font-semibold mb-4'>Page Not Found</h2>
        <p className='text-xl mb-8 opacity-90'>
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className='inline-block px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-colors'
        >
          Go Back Home
        </a>
      </div>
    </div>
  )
}

