import React from 'react'
import HeroContainer from './Hero/HeroContainer'
import Gallery from './Gallery/Gallery'
import PopularClasses from './PopularClasses/PopularClasses'
import PopularTeachers from './PopularTeachers/PopularTeachers'

const Home = () => {
  return (
    <section>
      <HeroContainer/>
      <div className='max-w-screen-xl mx-auto'>
        <Gallery/>
        <PopularClasses/>
        <PopularTeachers/>
      </div>
    </section>
  )
}

export default Home
