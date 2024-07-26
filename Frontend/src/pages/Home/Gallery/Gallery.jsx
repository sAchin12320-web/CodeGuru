import React from 'react';
import im1 from '../../../assets/gallary/img1.jpeg';
import im2 from '../../../assets/gallary/img2.jpeg';
import im3 from '../../../assets/gallary/img3.jpeg';
import im4 from '../../../assets/gallary/img4.jpeg';
import im5 from '../../../assets/gallary/img5.jpg';


const Gallery = () => {
  return (
    <div className='md:w-[80%] mx-auto my-28'>
      <div className='mb-16'>
        <h1 className='text-5xl font-bold text-center'>Our Gallery</h1>
      </div>
      
      <div className='md:grid grid-cols-2 items-center justify-center  gap-4'>
        <div className='mb-4 md:mb-0'>
    <img src={im1} alt="" className='md:h-[720px] w-full mx-auto rounded-sm'/>
        </div>
        <div className='gap-4 grid grid-cols-2 items-start'>
            <div>
                <img src={im2} alt="" className='md:h-[350px] rounded-sm'/>
            </div>
            <div>
                <img src={im3} alt="" className='md:h-[350px] rounded-sm'/>
            </div>
            <div>
                <img src={im4} alt="" className='md:h-[350px] rounded-sm'/>
            </div>
            <div>
                <img src={im5} alt="" className='md:h-[350px] rounded-sm'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Gallery
