import React, { useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import { FiBriefcase, FiSend, FiUser } from 'react-icons/fi';
import useUser from '../../../../hooks/useUser';
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { useState } from 'react';

const Instructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  
  useEffect(() => {
    axiosFetch.get(`/applied-instructor/${currentUser?.email}`)
      .then(res => {
        console.log(res.data); // Ensure you're logging the response data correctly
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [axiosFetch, currentUser]);


  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    // console.log(name,email);
    const experience = e.target.experience.value;
    // console.log(experience);
    const data={
      name,email,experience
    }
    axiosFetch.post('/applied-instructor',data)
    .then(res=>{
      console.log(res.data);
      alert("Successfully applied!");
    })
  }


  // Define your animation variants here if not already defined
  const inputVariants = {};
  const buttonVariants = {};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold text-center mb-4">Instructor Application</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className='flex flex-col'>
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }}>
              <label htmlFor="name" className='text-gray-700'>
                Name
              </label>
              <div className='flex items-center mt-1'>
                <FiUser className='text-gray-500' />
                <input type="text" defaultValue={currentUser?.name} disabled readOnly className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' id='name' name='name' />
              </div>
            </motion.div>
          </div>

          <div className='flex flex-col'>
            <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.1 }}>
              <label htmlFor="email" className='text-gray-700'>
                Email
              </label>
              <div className='flex items-center mt-1'>
                <FiUser className='text-gray-500' />
                <input type="text" defaultValue={currentUser?.email} disabled readOnly className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' id='email' name='email' />
              </div>
            </motion.div>
          </div>

          <motion.div variants={inputVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
            <label htmlFor="experience" className='text-gray-700'>
              Experience
            </label>
            <div className='flex items-center mt-1'>
              <FiBriefcase className='text-gray-500' />
              <textarea name="experience" id="experience" placeholder='Tell us about your experience...' className='ml-2 rounded-lg px-2 placeholder-text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none'></textarea>
            </div>
          </motion.div>

          <div className='text-center'>
            <motion.button variants={buttonVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="flex items-center justify-center px-4 py-2 bg-secondary text-white rounded-md focus:outline-none">
              <FiSend className='mr-2' />
              Submit
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Instructor;
