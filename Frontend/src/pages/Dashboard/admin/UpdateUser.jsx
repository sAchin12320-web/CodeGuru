import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateUser = () => {
    const { user } = useAuth();
    const userCredentials = useLoaderData();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    console.log(userCredentials);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = Object.fromEntries(formData.entries());
        
        axiosSecure.put(`/update-user/${userCredentials?._id}`, updatedData)
            .then(res => {
                if(res.data.modifiedCount>0){
                    alert("User updated successfully.");
                }
                console.log(res.data);
            })
            .catch(err => console.log(err));
        
        console.log(updatedData);
    };

    return (
        <div>
            <h1 className='text-center text-4xl font-bold mt-5'>
                Update : <span className='text-secondary'>{userCredentials?.name}</span>
            </h1>
            <p className='text-center'>
                Change details about <span className='text-red-400 font-bold'>{userCredentials?.name}</span>
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
                                    <label htmlFor="phone" className='ml-2 pb-4'>Phone</label>
                                    <input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Phone Number'
                                        required
                                        defaultValue={userCredentials?.phone || ""}
                                    />
                                </div>
                            </div>

                            {/* 2nd row */}
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="email" className='ml-2 pb-4'>Email</label>
                                    <h1 className='text-[12px] my-2 ml-2 text-red-500'>
                                        Update email is not recommended. Please leave it default.
                                    </h1>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className='w-full rounded-lg border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Email'
                                        required
                                        defaultValue={userCredentials?.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="skills" className='ml-2 pb-4'>Skills</label>
                                    <h1 className='text-[12px] my-2 ml-2 text-red-500'>
                                        Mention skills only when user is an instructor
                                    </h1>
                                    <input
                                        type="text"
                                        id="skills"
                                        name="skills"
                                        className='w-full rounded-lg border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your skills'
                                        required
                                        defaultValue={userCredentials?.skills || ""}
                                    />
                                </div>
                            </div>

                            {/* 3rd row */}
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor="address" className='ml-2 pb-4'>Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Address'
                                        required
                                        defaultValue={userCredentials?.address || ""}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="photoUrl" className='ml-2 pb-4'>Photo URL</label>
                                    <input
                                        type="text"
                                        id="photoUrl"
                                        name="photoUrl"
                                        className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                        placeholder='Your Photo link'
                                        required
                                        defaultValue={userCredentials?.photoUrl || ""}
                                    />
                                </div>
                            </div>

                            {/* 4th row */}
                            <h1>Please select a role:</h1>
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                                <div>
                                    <input
                                        type="radio"
                                        className='peer sr-only'
                                        id='option1'
                                        value='user'
                                        defaultChecked={userCredentials?.role === 'user'}
                                        tabIndex="-1"
                                        name='role'
                                    />
                                    <label
                                        htmlFor="option1"
                                        className='block w-full text-center rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                        tabIndex='0'
                                    >
                                        <span className='text-sm font-medium'>User</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        className='peer sr-only'
                                        id='option2'
                                        value='admin'
                                        defaultChecked={userCredentials?.role === 'admin'}
                                        tabIndex="-1"
                                        name='role'
                                    />
                                    <label
                                        htmlFor="option2"
                                        className='block w-full text-center rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                        tabIndex='0'
                                    >
                                        <span className='text-sm font-medium'>Admin</span>
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        className='peer sr-only'
                                        id='option3'
                                        value='instructor'
                                        defaultChecked={userCredentials?.role === 'instructor'}
                                        tabIndex="-1"
                                        name='role'
                                    />
                                    <label
                                        htmlFor="option3"
                                        className='block w-full text-center rounded-lg border border-secondary p-3 peer-checked:border-secondary peer-checked:bg-secondary peer-checked:text-white'
                                        tabIndex='0'
                                    >
                                        <span className='text-sm font-medium'>Instructor</span>
                                    </label>
                                </div>
                            </div>

                            {/* About user */}
                            <div>
                                <label htmlFor="aboutUser" className='ml-2 pb-4'>About User</label>
                                <textarea
                                    id="aboutUser"
                                    name="aboutUser"
                                    className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm'
                                    placeholder='Tell us about the user'
                                    rows="4"
                                    required
                                    defaultValue={userCredentials?.about || ""}
                                ></textarea>
                            </div>

                            {/* Update button */}
                            <div>
                                <button
                                    type="submit"
                                    className='block w-full rounded-lg border border-secondary p-3 bg-secondary text-white'
                                >
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateUser;
