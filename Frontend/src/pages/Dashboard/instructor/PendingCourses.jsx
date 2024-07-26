import React, { useEffect, useState } from 'react';
import useUser from '../../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';

const PendingCourses= () => {
    const [classes, setClasses] = useState([]);
    const { currentUser, isLoading } = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
      if (currentUser?.email) {
          axiosSecure.get(`/classes/${currentUser.email}`)
              .then(res => {
                  const pendingClasses = res.data.filter(cls => cls.status === "pending");
                  setClasses(pendingClasses);
              })
              .catch(err => console.log(err));
      }
  }, [isLoading, currentUser, axiosSecure]);

    return (
        <div className='container mx-auto'>
            <div className='my-9'>
                <h1 className='text-4xl font-bold text-center'>
                    Pending<span className='text-secondary'>Courses</span>
                </h1>
                <p className='text-sm text-center my-2'>
                    Status and details of the Pending courses are shown here
                </p>
            </div>

            <div>
                {classes.length === 0 ? (
                    <div className='text-center text-2xl font-bold mt-10'>No classes available</div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {classes.map(cls => (
                            <div key={cls._id} className='bg-white rounded-lg shadow-lg p-6 hover:ring ring-secondary duration-200'>
                                <img src={cls.image} alt="" className='h-48 w-full object-cover rounded-t-lg' />
                                <div className='mt-4'>
                                    <h2 className='text-lg font-bold text-secondary border-b pb-2 mb-2'>{cls.name}</h2>
                                    <p className='text-secondary'>
                                        <span className='text-black font-bold'>Total Students:</span> {cls.totalEnrolled ? cls.totalEnrolled : 0}
                                    </p>
                                    <p className='text-secondary'>
                                        <span className='text-black font-bold'>Total Seats:</span> {cls.availableSeats}
                                    </p>
                                    <p className='text-secondary'>
                                        <span className='text-black font-bold'>Price:</span> {cls.price}$
                                    </p>
                                    <p className='text-secondary'>
                                        <span className='text-black font-bold'>Submitted:</span> {cls.submitted ? moment(cls.submitted).format("MMMM Do YYYY") : "Not any information"}
                                    </p>
                                    <p className='text-secondary'>
                                        <span className='text-black font-bold'>Status:</span> 
                                        <span className={`font-bold ${cls.status === "pending" ? "text-orange-400" : cls.status === "checking" ? "text-yellow-300" : cls.status === "approved" ? "text-green-500" : "text-red-600"}`}>
                                            {cls.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PendingCourses;
