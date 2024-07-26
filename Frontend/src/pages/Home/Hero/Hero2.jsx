import React from 'react'
import bgImg2 from '../../../assets/home/cg_1.jpeg'
import { Link } from 'react-router-dom'

const Hero2 = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg2})`}}>
      <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
        <div>
            <div className='space-y-4'>
                <p className='md:text-4xl text-2xl'>Best online</p>
                <h1 className='md:text-7xl text-4xl font-bold'>Courses from home.</h1>
                <div className='md:w-1/2'>
                    <p>Experience the convenience and excellence of our top-rated online courses from the comfort of your home, designed to elevate your skills and career opportunities.</p>
                </div>
                <div className='flex flex-wrap items-center gap-5'>
                   <Link to='/register'> <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button></Link>
                   <Link to='/classes'><button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase' >View Courses</button></Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero2
