import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Headers/Navbar'
import Footer from '../components/Headers/Footer'

const MainLayout = () => {
  return (
    <main className='dark:bg-black overflow:hidden'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </main>
  )
}

export default MainLayout
