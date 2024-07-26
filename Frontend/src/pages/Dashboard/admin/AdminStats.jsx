import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {FaRegCopy,FaChalkboardTeacher} from 'react-icons/fa';
import {MdPendingActions} from 'react-icons/md'

const AdminStats = ({ users }) => {
    const [data, setData] = useState();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/admin-stats')
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err));
    }, [axiosSecure]);

    // console.log(data);

    return (
        <div>
            <div className='grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8'>

            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-green-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                        <path d="M16 11C18.21 11 20 9.21 20 7C20 4.79 18.21 3 16 3C13.79 3 12 4.79 12 7C12 9.21 13.79 11 16 11ZM16 13C13.33 13 8 14.34 8 17V19H24V17C24 14.34 18.67 13 16 13ZM8 11C10.21 11 12 9.21 12 7C12 4.79 10.21 3 8 3C5.79 3 4 4.79 4 7C4 9.21 5.79 11 8 11ZM8 13C5.33 13 0 14.34 0 17V19H8V17C8 14.34 8 13 8 13Z"/>
                    </svg>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Total Members</h3>
                    <p className='text-3xl'>{users.length}</p>
                </div>
            </div>

            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-blue-400'>
                    <FaRegCopy className='h-12 w-12 text-white'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Approved Classes</h3>
                    <p className='text-3xl'>{data?.approvedClasses}</p>
                </div>
            </div>

            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-indigo-400'>
                    <FaChalkboardTeacher className='h-12 w-12 text-white'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Instructors</h3>
                    <p className='text-3xl'>{data?.instructors}</p>
                </div>
            </div>

            <div className='flex items-center bg-white border rounded-sm overflow-hidden shadow'>
                <div className='p-4 bg-red-400'>
                    <MdPendingActions className='h-12 w-12 text-white'/>
                </div>
                <div className='px-4 text-gray-700'>
                    <h3 className='text-sm tracking-wider'>Pending Classes</h3>
                    <p className='text-3xl'>{data?.pendingClasses}</p>
                </div>
            </div>

            </div>
        </div>
    );
};

export default AdminStats;
