import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useUser from '../../../hooks/useUser';
import { useState } from 'react';

const key = import.meta.env.VITE_IMG_TOKEN;
const AddClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${key}&name=`
    const axiosSecure = useAxiosSecure();
    const {currentUser,isLoading} = useUser();
    const [image,setImage] = useState(null);

    const handleSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData);
        const newData = Object.fromEntries(formData);
        formData.append('file',image);
        // console.log(newData);

        fetch(API_URL, {
            method: "POST",
            body: formData
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.success===true){
                newData.image = data.data.display_url;
                newData.instructorName = currentUser?.name;
                newData.instructorEmail = currentUser?.email;
                newData.status = "pending";
                newData.submitted = new Date();
                newData.totalEnrolled = 0;
                axiosSecure.post('/new-class',newData)
                .then(res=>{
                    alert("Successfully added class!");
                    console.log(res.data);
                })
            }
        })
        .catch(err=>console.log(err));
    };

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setImage(file);
    };

    if(isLoading){
        return <div>Loading...</div>
    }
    
  return (
    <div>
      <div className='my-10'>
        <h1 className='text-center text-3xl font-bold'>Add <span className='text-secondary'>your </span>Course</h1>
      </div>

      <form className='mx-auto p-6 bg-white rounded shadow' onSubmit={handleSubmit}>
        {/* 1st row */}
        <div className='grid grid-cols-2 w-full gap-3 items-center'>
            <div className='mb-6'>
                <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>Course Name</label>
                <input type="text" required placeholder='Your Course name' name='name' id='name' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
            <div className='mb-6'>
                <label htmlFor="image" className='block text-gray-700 font-bold mb-2'>Course Thumbnail</label>
                <input type="file" onChange={handleImageChange} required name='image' className='block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4' />
            </div>
        </div>

        {/* 2nd row */}
        <div>
        <h1 className='text-[12px] my-2 ml-2 text-secondary'>You can not change your name or email</h1>
        <div className='grid grid-cols-2 w-full gap-3 items-center'>
            <div className='mb-6'>
                <label htmlFor="instructorName" className='block text-gray-700 font-bold mb-2'>Instructor Name</label>
                <input type="text" readOnly disabled value={currentUser?.name} placeholder='Instructor Name' name='InstructorName' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
            <div className='mb-6'>
                <label htmlFor="instructorEmail" className='block text-gray-700 font-bold mb-2'>Instructor Email</label>
                <input type="email" readOnly value={currentUser?.email} disabled placeholder='Instructor Email' name='InstructorEmail' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
        </div>
        </div>

        {/* 3rd row */}
        <div className='grid grid-cols-2 w-full gap-3 items-center'>
            <div className='mb-6'>
                <label htmlFor="availableSeats" className='block text-gray-700 font-bold mb-2'>Available Seats</label>
                <input type="number" required placeholder='Number of seats available' name='availableSeats' id='availableSeats' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
            <div className='mb-6'>
                <label htmlFor="price" className='block text-gray-700 font-bold mb-2'>Price</label>
                <input type="number" required placeholder='price in rupees' name='price' id='price' className='w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500' />
            </div>
        </div>

        {/* 4th row */}
        <div className='mb-6'>
            <label htmlFor="youtubeLink" className='block text-gray-700 font-bold mb-2'>Youtube Link</label>
            <p className='text-[12px] my-2 mt-2 text-secondary'>Only youtube videos are supported</p>
            <input type="text" required placeholder='Course video link' name='videoLink' className='w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500' />
        </div>

        {/* 5th row */}
        <div className='mb-6'>
            <label htmlFor="description" className='block text-gray-700 font-bold mb-2'>Description</label>
            <textarea name="description" placeholder='Description about your course' rows="4" className='resize-none border w-full p-2 rounded-lg border-secondary outline-none'></textarea>
        </div>

        {/* 6th row */}
        <div className='text-center w-full'>
            <button className='bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded' type='submit'>Add</button>
        </div>

      </form>
    </div>
  )
}

export default AddClass
