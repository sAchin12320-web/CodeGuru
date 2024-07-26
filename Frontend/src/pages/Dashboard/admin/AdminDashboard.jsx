import React, { useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import WelcomeImg from '../../../assets/dashboard/urban-welcome.svg';
import { Link } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import { useState } from 'react';
import AdminStats from './AdminStats';

const AdminDashboard = () => {
    const {currentUser} = useUser();
    const axiosFetch = useAxiosFetch();
    const [users,setUsers] = useState([]);

    useEffect(()=>{
      axiosFetch.get('/users')
      .then(res=>{
        setUsers(res.data);
        console.log(res.data);
      })
      .catch(err=>console.log(err))
    },[]);

  return (
    <div>
      <div>
        <h1 className='text-4xl font-bold my-2'>Welcome Back, <span className='text-secondary'>{currentUser?.name}</span></h1>
        <AdminStats users={users}/>
      </div>
    </div>
  )
}

export default AdminDashboard
