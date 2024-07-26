import React from 'react';
import bgImg1 from '../../../assets/home/cg_2.avif'
import { Link } from 'react-router-dom';

const Hero1 = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg1})`}}>
      <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
        <div>
            <div className='space-y-4'>
                <p className='md:text-4xl text-2xl'>We Provide</p>
                <h1 className='md:text-7xl text-4xl font-bold'>Best Tech Courses Online</h1>
                <div className='md:w-1/2'>
                    <p>Unlock your potential with our top-tier online courses, designed to boost your career prospects and ensure your success with expert guidance and real-world skills.</p>
                </div>
                <div className='flex flex-wrap items-center gap-5'>
                    <Link to='/register'><button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Today</button></Link>
                    <Link to='/classes'><button className='px-7 py-3 rounded-lg border hover:bg-secondary font-bold uppercase'>View Courses</button></Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero1
