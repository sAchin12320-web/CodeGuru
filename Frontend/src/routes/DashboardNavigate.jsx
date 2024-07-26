import React from 'react';
import useUser from '../hooks/useUser';
import { Navigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

const DashboardNavigate = () => {
    const {currentUser, isLoading}=useUser();
    const role = currentUser?.role;
    if(isLoading){
        return <div className='flex justify-center items-center h-screen'> 
                    <HashLoader color="#ff1949" size={50} />
                </div>
    }
    
    if(role==="admin")return <Navigate to="/dashboard/admin-home" replace />
    if(role==="instructor")return <Navigate to="/dashboard/instructor-cp" replace />
    if(role==="user")return <Navigate to="/dashboard/student-cp" replace />
}

export default DashboardNavigate
