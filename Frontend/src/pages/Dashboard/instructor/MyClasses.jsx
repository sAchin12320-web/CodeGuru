import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const MyClasses = () => {
    const [classes, setClasses] = useState([]);
    const { currentUser, isLoading } = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (currentUser?.email) {
            axiosSecure.get(`/classes/${currentUser.email}`)
                .then(res => {
                    setClasses(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [isLoading, currentUser, axiosSecure]);

    const handleFeedback = (id) => {
        // handle feedback logic
    };

    return (
        <div>
            <div className='my-9'>
                <h1 className='text-4xl font-bold text-center'>My <span className='text-secondary'>Classes</span></h1>
                <div>
                    <p className='text-sm text-center my-2'>Status and details of the classes added by you are shown here</p>
                </div>
            </div>

            <div>
                {classes.length === 0 ?
                    <div className='text-center text-2xl font-bold mt-10'>No classes available</div> :
                    <div>
                        {classes.map((cls, index) => (
                            <div key={cls._id} className='mb-5 hover:ring ring-secondary duration-200 focus:ring-rounded-lg'>
                                <div className='bg-white flex rounded-lg gap-4 shadow p-4'>
                                    <div>
                                        <img src={cls.image} alt="" className='max-h-[200px] max-w-[300px]' />
                                    </div>
                                    <div className='w-full flex flex-col'>
                                        <h2 className='text-lg font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h2>
                                        <div className='flex flex-grow gap-4'>
                                            <div className='flex-1'>
                                                <h1 className='font-bold mb-2'>Some Info:</h1>
                                                <h1 className='text-secondary my-1'>
                                                    <span className='text-black'>Total Students</span>:{" "}
                                                    {cls.totalEnrolled ? cls.totalEnrolled : 0}
                                                </h1>
                                                <h1 className='text-secondary my-1'>
                                                    <span className='text-black'>Total Seats</span>:{" "}
                                                    {cls.availableSeats}
                                                </h1>
                                                <h1 className='text-secondary my-1'>
                                                    <span className='text-black'>Status</span>:{" "}
                                                    <span className={`font-bold ${cls.status === "pending" ? "text-orange-400" : cls.status === "checking" ? "text-yellow-300" : cls.status === "approved" ? "text-green-500" : "text-red-600"}`}>{cls.status}</span>
                                                </h1>
                                            </div>
                                            <div className='flex-1'>
                                                <h1 className='font-bold mb-2'>Details:</h1>
                                                <h1 className='text-secondary my-1'>
                                                    <span className='text-black'>Price</span>:{" "}
                                                    {cls.price} <span className='text-black'>$</span>
                                                </h1>
                                                <h1 className='text-secondary my-1'>
                                                    <span className='text-black'>Submitted</span>:{" "}
                                                    <span className=''>
                                                        {
                                                            cls.submitted ? moment(cls.submitted).format("MMMM Do YYYY")
                                                                : "Not any information"
                                                        }
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className='flex-1'>
                                                <h1 className='font-bold mb-2'>Action:</h1>
                                                <button onClick={() => handleFeedback(cls._id)} className='bg-orange-400 font-bold py-1 text-white w-full rounded-lg mb-2'>View Feedback</button>
                                                <button className='bg-green-500 font-bold py-1 text-white w-full mb-2 rounded-lg'>View Details</button>
                                                <button onClick={() => navigate(`/dashboard/update/${cls._id}`)} className='bg-green-500 font-bold py-1 text-white w-full rounded-lg'>Update Class</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}

export default MyClasses;
