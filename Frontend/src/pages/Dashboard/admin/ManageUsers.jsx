import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import { GrUpdate } from 'react-icons/gr'
import { FcDeleteDatabase } from 'react-icons/fc';

const ManageUsers = () => {
  const navigate = useNavigate();
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axiosFetch.get('/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (userId) => {
    axiosSecure.delete(`/delete-user/${userId}`)
    .then(res=>{
      alert("User deleted successfully")
    })
    .catch(err=>console.log(err))
  };

  const paginatedData = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPage = Math.ceil(users.length / itemsPerPage);

  return (
    <div className='h-full overflow-hidden'>
      <h1 className='text-center text-4xl font-bold my-2'>Manage <span className='text-secondary'>Users</span></h1>
      <div className='flex flex-col h-full'>
        <div className='overflow-x-auto sm:mx-6 lg:mx-8 h-full'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className=''>
              <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                  <tr>
                    <th scope='col' className='px-6 py-4'>Profile</th>
                    <th scope='col' className='px-6 py-4'>User Name</th>
                    <th scope='col' className='px-6 py-4'>User Email</th>
                    <th scope='col' className='px-6 py-4'>Role</th>
                    <th scope='col' className='px-6 py-4'>Update</th>
                    <th scope='col' className='px-6 py-4'>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className='text-center text-2xl font-bold'>No Users Found</td>
                    </tr>
                  ) : (
                    paginatedData.map((user, idx) => {
                      return (
                        <tr key={user._id} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                          <td className='whitespace-nowrap px-6 py-4'>
                            <img src={user.photoUrl} className='h-[35px] w-[35px]' alt="" />
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            {user.name}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            {user.email}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            {user.role}
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            <span onClick={() => navigate(`/dashboard/update-user/${user._id}`)} className='inline-flex items-center gap-2 cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white'>
                              Update
                              <GrUpdate className='text-white' />
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-6 py-4'>
                            <span onClick={() => handleDelete(user._id)} className='inline-flex items-center gap-2 cursor-pointer bg-red-600 py-1 rounded-md px-2 text-white'>
                              Delete
                              <FcDeleteDatabase />
                            </span>
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

export default ManageUsers;
