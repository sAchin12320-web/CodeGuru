import React from 'react';
import useUser from "../../hooks/useUser";
import {HashLoader} from 'react-spinners';
import DashboardNavigate from '../../routes/DashboardNavigate';

const Dashboard = () => {
  const {currentUser, isLoading} = useUser();
  const role = currentUser?.role;

  if(isLoading){
    return <div className='flex justify-center items-center h-screen'> 
      <HashLoader color="#ff1949" size={50} />
    </div>
  }
  return (
    <DashboardNavigate />
  )
}

export default Dashboard
