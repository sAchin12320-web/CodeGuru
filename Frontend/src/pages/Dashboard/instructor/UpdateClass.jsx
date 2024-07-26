import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateClass= () => {
    const { user } = useAuth();
    const userCredentials = useLoaderData();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    console.log(userCredentials);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());
        
        axiosSecure.put(`/update-class/${userCredentials?._id}`, updatedData)
            .then(res => {
                if(res.data.modifiedCount>0){
                    alert("Class updated successfully.");
                }
                console.log(res.data);
            })
            .catch(err => console.log(err));
        
        console.log(updatedData);
    };

    return (
        <div>
            <h1 className='text-center text-4xl font-bold mt-5'>
                Update : <span className='text-secondary'>Class</span>
            </h1>
            <p className='text-center'>
                <span className='text-red-400 font-bold'>{userCredentials?.name}</span>
            </p>

            <section>
                <div className='mx-auto px-4 py-5 sm:px-6 lg:px-8'>
                    <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="name" className='ml-2 pb-4'>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Name'
                                        required
                                        defaultValue={userCredentials?.name || ""}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="instructorName" className='ml-2 pb-4'>Instructor Name</label>
                                    <input
                                        type="text"
                                        id="instructorName"
                                        name="instructorName"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Instructor Name'
                                        required
                                        defaultValue={userCredentials?.instructorName || ""}
                                    />
                                </div>
                            </div>

                            {/* 2nd row */}
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="instructorEmail" className='ml-2 pb-4'>Instructor Email</label>
                                    <h1 className='text-[12px] my-2 ml-2 text-red-500'>
                                        Update email is not recommended. Please leave it default.
                                    </h1>
                                    <input
                                        type="email"
                                        id="instructorEmail"
                                        name="instructorEmail"
                                        className='w-full rounded-lg border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Email'
                                        required
                                        defaultValue={userCredentials?.instructorEmail}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="image" className='ml-2 pb-4'>photoUrl</label>
                                    <h1 className='text-[12px] my-2 ml-2 text-red-500'>
                                        If you want to change thumbnail and give it a better look.
                                    </h1>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        className='w-full rounded-lg border outline-none border-secondary p-3 text-sm'
                                        placeholder='image link'
                                        required
                                        defaultValue={userCredentials?.image || ""}
                                    />
                                </div>
                            </div>

                            {/* 3rd row */}
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="availableSeats" className='ml-2 pb-4'>Available Seats</label>
                                    <input
                                        type="number"
                                        id="availableSeats"
                                        name="availableSeats"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Available Seats'
                                        required
                                        defaultValue={userCredentials?.availableSeats || ""}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className='ml-2 pb-4'>Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Enter Price'
                                        required
                                        defaultValue={userCredentials?.price || ""}
                                    />
                                </div>
                            </div>

                            {/* 4th row */}
                            <div>
                                    <label htmlFor="videoLink" className='ml-2 pb-4'>Video Link</label>
                                    <input
                                        type="text"
                                        id="videoLink"
                                        name="videoLink"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='video Link here'
                                        required
                                        defaultValue={userCredentials?.videoLink || ""}
                                    />
                                </div>

                            {/* About user */}
                            <div>
                                <label htmlFor="description" className='ml-2 pb-4'>Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                    placeholder='Description here'
                                    rows="4"
                                    required
                                    defaultValue={userCredentials?.description || ""}
                                ></textarea>
                            </div>

                            {/* Update button */}
                            <div>
                                <button
                                    type="submit"
                                    className='block w-full rounded-lg border border-secondary p-3 bg-secondary text-white'
                                >
                                    Update Class
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateClass;
