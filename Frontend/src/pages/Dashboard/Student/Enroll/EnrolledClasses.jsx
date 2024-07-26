import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUser from '../../../../hooks/useUser';
import { Link } from 'react-router-dom';

const EnrolledClasses = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useUser();

  useEffect(() => {
    if (currentUser?.email) {
      axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
        .then(res => {
          const jsonData = JSON.parse(JSON.stringify(res.data)); // Convert response data to JSON
          setData(jsonData);
        })
        .catch(err => console.log(err));
    }
  }, [axiosSecure, currentUser]);

  return (
    <div className="container mx-auto">
      <h1 className='text-3xl my-6 text-center font-bold'>Enrolled Classes</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data.map((item, index) => (
          <div key={index} className='bg-white shadow-md rounded-lg overflow-hidden'>
            <img src={item.classes.image} alt={item.classes.name} className='h-40 w-full object-cover' />
            <div className='p-3'>
              <h2 className='text-lg font-bold mb-1'>{item.classes.name}</h2>
              <p className='text-gray-600 mb-1'>{item.instructorName}</p>
              <p className='text-gray-700 line-clamp-3'>{item.classes.description}</p>
              <div className='mt-3 flex justify-between items-center'>
                <p className='text-gray-800 font-semibold'>${item.classes.price}</p>
                <Link to={'/dashboard/course-details'}>
                <button className='bg-secondary text-white px-3 py-1 rounded-lg shadow-md'>
                  View
                </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnrolledClasses;
