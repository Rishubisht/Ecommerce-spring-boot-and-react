import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Components/Layout/Header'
import { Footer } from '../Components/Layout/Footer'

export const MainLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <main className='flex-1 overflow-y-auto'>
        <Outlet />
      </main>
      <Footer /> 
    </div>
  )
}
