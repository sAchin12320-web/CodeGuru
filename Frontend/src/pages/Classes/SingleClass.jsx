import React from 'react'
import { useLoaderData } from 'react-router-dom'
import useUser from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState ,useEffect,useContext} from 'react';

import { DialogActions } from '@mui/material';
import {BiTime} from 'react-icons/bi';
import { FaLanguage, FaLevelUpAlt, FaUser, FaUsers,FaPlay ,FaChalkboardTeacher} from 'react-icons/fa';
import {GiClassicalKnowledge} from "react-icons/gi";
import { MdBookOnline } from 'react-icons/md';
import bannerImg1 from "../../assets/home/cg_2.avif";
import { AuthContext } from '../../utilities/providers/AuthProvider';

const SingleClass = () => {
    const course = useLoaderData();
    // console.log(course);
    const {currentUser} = useUser();
    // console.log(currentUser?.role);
    const role = currentUser?.role;

    const handleEnroll = async () => {
        if (role === 'admin') {
            alert('Admins cannot enroll in classes.');
            return;
        }
        if (enrolledClasses.includes(course.id)) {
            alert('You are already enrolled in this course.');
            return;
        }
        try {
            const response = await axiosSecure.post('/enroll', { courseId: course.id, userId: currentUser.id });
            setEnrolledClasses([...enrolledClasses, course.id]);
            alert('Enrolled successfully!');
        } catch (error) {
            console.error('Error enrolling:', error);
            alert('Failed to enroll. Please try again later.');
        }
    };

    const [enrolledClasses,setEnrolledClasses] = useState([]);
    const [data,setData]=useState([]);
    const [isEnrolled,setIsEnrolled] =useState(false);
    const [showVideo,setShowVideo]=useState(false);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (currentUser?.email) {
          axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
            .then(res => {
              const jsonData = JSON.parse(JSON.stringify(res.data)); 
              const classIds = jsonData.map(item => item.classes._id); 
              setData(classIds); 

              if (classIds.includes(course._id)) {
                setIsEnrolled(true);
              } else {
                setIsEnrolled(false);
              }
            })
            .catch(err => console.log(err));
        }
      }, [axiosSecure, currentUser]);

    //   const handlePlayClick = () => {
    //     if (isEnrolled) {
    //       setShowVideo(true);
    //     } else {
    //       alert('Please enroll in the course to access the video.');
    //     }
    //   };

      const handlePlayClick = () => {
        if (isEnrolled) {
          window.open(course.videoLink, '_blank');
        } else {
          alert('Please enroll in the course to access the video.');
        }
      };
      
  return (
    <>
    <div className='font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto'
    data-new-gr-c-s-check-loaded="14.1157.0" data-gr-ext-installed="">
        {/* header */}
        <div className='breadcrumbs bg-primary py-20 mt-20 section-padding bg-cover bg-center bg-no-repeat'>
            <div className='container text-center'>
                <h2>Course Details</h2>
            </div>
        </div>

        <div className='nav-tab-wrapper tabs section-padding mt-8'>
            <div className='container'>
                <div className='grid grid-cols-12 md:gap-[30px]'>
                    {/* left side */}
                    <div className='lg:col-span-8 col-span-12'>
                        <div className='single-course-details'>
                        <div className='relative xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
      {showVideo ? (
        <iframe
          src={course.videoLink}
          title={course.title}
          className='rounded-md object-cover w-full h-full block'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      ) : (
        <>
          <img src={course?.image} alt="" className='rounded-md object-cover w-full h-full block' />
          <button onClick={handlePlayClick} className='absolute inset-0 flex items-center justify-center'>
            <FaPlay className='text-white text-4xl' />
          </button>
        </>
      )}
    </div>

                            <h2 className='text-2xl mb-2'>{course?.name}</h2>

                            <div className='author-meta mt-6 sm:flex lg:space-x-16 sm:space-x-5 space-y-5 sm:space-y-0 items-center'>
                                <div className='flex space-x-4 items-center group'>
                                    <div className='flex-none'>
                                        <div className='h-12 w-12 rounded'>
                                            <img src="data:image/png;base64,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" alt="" className='object-cover w-full h-full rounded' />
                                        </div>
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-secondary'>
                                            Trainer
                                            <a href="#" className='text-black'  >
                                                :{course.instructorName}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            
                        <div>
                            <span className='text-secondary'>
                                Last Update:
                                <a href="#" className='text-black ml-1'>
                                    {new Date(course.submitted).toLocaleDateString()}
                                </a>
                            </span>
                        </div>
                    </div>

                    <div className='nav-tab-wrapper mt-12'>
                        <div id='tabs-content'>
                            <div id='tab1' className='tab-content'>
                                <div>
                                    <h3 className='text-2xl mt-8'>Course Description</h3>
                                    <p className='mt-4'>
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    



    {/* right side */}
    <div className='lg:col-span-4 col-span-12'>
                                <div className='course-sidebar'>
                                    <div className='p-8 border rounded-lg'>
                                        {/* Course Image */}
                                        <div className='relative'>
                                            <img src={course.image} alt={course.title} className='w-full rounded-lg' />
                                        </div>
                                        {/* Course Price */}
                                        <div className='mt-4 text-xl font-semibold'>
                                            {course.price}
                                        </div>
                                        <DialogActions>
                                            <button
                                                onClick={handleEnroll}
                                                className='btn btn-primary w-full mt-6 bg-blue-500 text-white rounded-full py-2'
                                            >
                                                Enroll Now
                                            </button>
                                        </DialogActions>
                                    </div>

                                    {/* Additional Details */}
                                    <div className='mt-8'>
                                    <div className='flex justify-between items-center py-2'>
                                            <div className='flex items-center'>
                                                <FaChalkboardTeacher className='mr-2' />
                                                <span>Name</span>
                                            </div>
                                            <span>{course.name}</span>
                                        </div>
                                        {/* Instructor */}
                                        <div className='flex justify-between items-center py-2'>
                                            <div className='flex items-center'>
                                                <FaChalkboardTeacher className='mr-2' />
                                                <span>Instructor</span>
                                            </div>
                                            <span>{course.instructorName}</span>
                                        </div>
                                        {/* Lectures */}
                                        <div className='flex justify-between items-center py-2'>
                                            <div className='flex items-center'>
                                                <MdBookOnline className='mr-2' />
                                                <span>Lectures</span>
                                            </div>
                                            <span>20+</span>
                                        </div>
                                        {/* Duration */}
                                        <div className='flex justify-between items-center py-2'>
                                            <div className='flex items-center'>
                                                <BiTime className='mr-2' />
                                                <span>Available Seats</span>
                                            </div>
                                            <span>{course.availableSeats}</span>
                                        </div>
                                        {/* Enrolled Students */}
                                        <div className='flex justify-between items-center py-2'>
                                            <div className='flex items-center'>
                                                <FaUsers className='mr-2' />
                                                <span>Enrolled Students</span>
                                            </div>
                                            <span>{course.totalEnrolled}</span>
                                        </div>
                                        {/* Course Level */}
                                        <div className='flex justify-between items-center py-2'>
                                            <div className='flex items-center'>
                                                <FaLevelUpAlt className='mr-2' />
                                                <span>Course Level</span>
                                            </div>
                                            <span>Beginner</span>
                                        </div>
                                        {/* Language */}
                                        <div className='flex justify-between items-center py-2'>
                                            <div className='flex items-center'>
                                                <FaLanguage className='mr-2' />
                                                <span>Language</span>
                                            </div>
                                            <span>English</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
    </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default SingleClass
