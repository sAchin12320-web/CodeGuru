import React from 'react';
import { useState, useEffect } from 'react';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import img from '../../assets/home/girl.jpg';

const Instructors = () => {
  const [instructors,setInstructors] = useState([]);
    const axiosFetch = useAxiosFetch();
    useEffect(()=>{
        axiosFetch.get('/instructors').then((data)=>{
          setInstructors(data.data)
        }).catch((err)=>{console.log(err)})
    },[]);

  return (
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center'>Our <span className='text-secondary'>Best</span>Instructors</h1>
        <div className='w-[40%] text-center mx-auto my-4'>
            <p className='text-gray-500'>Explore our best instructors. Here is some of our popular instructors according to students enrolled.</p>
        </div>
      </div>

      {
        instructors? <>
        <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-3 w-[90%] gap-4 mx-auto mt-20'>
          {
            instructors?.map((instructor,i)=>(
                <div className='flex dark:text-white hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-8  rounded-md'>
                  <div className='flex-col flex gap-6 md:gap-8'>
                  <img className='rounded-full border-4 border-gray-300 h-24 w-24' src={instructor.photoUrl || `${img}`} alt="" />

                  <div className='flex flex-col text-center'>
                    <p className='font-medium text-lg dark:text-white text-gray-800'>{instructor?.instructor?.name}</p>
                    <p className='text-gray-500 '>Instructor</p>
                    <p className='text-gray-500 mb-4 '>Address: {instructor?.address}</p>
                    <p className='text-gray-500 mb-4 '>Email: {instructor?.email}</p>
                  </div>
                </div>
              </div>
            ))
          }
          </div>
          </>
          :
          <><p>No teachers available.</p></>
      }


    </div>
  )
}

export default Instructors
