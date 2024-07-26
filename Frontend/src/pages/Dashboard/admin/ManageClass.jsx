import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'

const ManageClass = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axiosFetch.get('/classes-manage')
      .then(res => setClasses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedData = classes.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPage = Math.ceil(classes.length / itemsPerPage);

  const handleApprove = async (id) => {
    axiosSecure.patch(`/change-status/${id}`,{status: "approved"})
    .then(res=>{
      alert("Course Approved successfully");
      const updateClass = classes.map(cls=>cls._id === id? {...cls,status:"approved"}: cls);
      setClasses(updateClass)
    })
    .catch(err=>console.log(err))
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!"
    }).then((result)=>{
      if(result.isConfirmed){
        const response = axiosSecure.patch(`/change-status/${id}`, {status: "rejected"});
        if(response.modifiedCount>0){
          const updateClass = classes.map(cls=>cls._id===id? {...cls,status:"rejected"}:cls);
          setClasses(updateClass);
          Swal.fire({
            title: "Rejected!",
            text: "Class is rejected",
            icon: "success"
          });
        }
      }
    });
  };

  return (
    <div className='h-full overflow-hidden'>
      <h1 className='text-4xl text-secondary font-bold text-center my-2'>
        Manage <span className='text-black'>Classes</span>
      </h1>
      <div className='flex flex-col h-full'>
        <div className='overflow-x-auto sm:mx-6 lg:mx-8 h-full'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className=''>
              <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                  <tr>
                    <th scope='col' className='px-6 py-4'>Profile</th>
                    <th scope='col' className='px-6 py-4'>Course Name</th>
                    <th scope='col' className='px-6 py-4'>Instructor Name</th>
                    <th scope='col' className='px-6 py-4'>Status</th>
                    <th scope='col' className='px-6 py-4'>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className='text-center text-2xl font-bold'>No Classes Found</td>
                    </tr>
                  ) : (
                    paginatedData.map((cls, idx) => {
                      return (
                        <tr key={cls._id} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                          <td className='whitespace-nowrap px-6 py-4'>
                            <img src={cls.image} className='h-[35px] w-[35px]' alt="" />
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            {cls.name}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            {cls.instructorName}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            <span className={`font-bold ${cls.status === "pending" ? "bg-orange-400" : cls.status === "checking" ? "bg-yellow-500" : cls.status === "approved" ? "bg-green-600" : "bg-red-600"} px-2 py-1 uppercase text-white rounded-xl`}>
                              {cls.status}
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            <div className='flex gap-2'>
                              <button onClick={() => handleApprove(cls._id)} className='text-[12px] cursor-pointer disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white'>Approve</button>
                              <button disabled={cls.status === "rejected" || cls.status === "checking"} onClick={() => handleReject(cls._id)} className='cursor-pointer disabled:bg-red-800 bg-red-600 py-1 rounded-md px-2 text-white'>Deny</button>
                              <button disabled={cls.status === "rejected" || cls.status === "checking"} onClick={() => handleReject(cls._id)} className='cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white'>Feedback</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
              <div className='flex justify-center mt-4'>
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handlePageChange}
                  color='primary'
                  showFirstButton
                  showLastButton
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageClass;
