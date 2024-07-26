import React from 'react';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from 'react-icons/bi';
import { FaHome, FaUsers } from 'react-icons/fa';
import { BsFillPostcardFill } from "react-icons/bs";
import { TbBrandAppleArcade } from "react-icons/tb";
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdExplore, MdOfflineBolt, MdPendingActions, MdPayments } from 'react-icons/md';
import { GiFigurehead } from 'react-icons/gi';
import Swal from "sweetalert2";
import { IoMdDoneAll } from 'react-icons/io';
import { IoSchoolSharp } from 'react-icons/io5';
import { SiGoogleclassroom } from 'react-icons/si';
import { SiInstructure } from 'react-icons/si';
import { Link } from 'react-router-dom';
import Scroll from '../hooks/useScroll';
import { HashLoader } from 'react-spinners';

const adminNavItems = [
    { to: "/dashboard/admin-home", icon: <BiHomeAlt className='text-2xl' />, label: "Dashboard Home" },
    { to: "/dashboard/manage-users", icon: <FaUsers className="text-2xl "/>, label: "Manage Users" },
    { to: "/dashboard/manage-class", icon: <BsFillPostcardFill className="text-2xl" />, label: "Manage Class" },
    { to: "/dashboard/manage-applications", icon: <TbBrandAppleArcade className="text-2xl" />, label: "Applications" },
]

const instructorNavItems = [
    { to: "/dashboard/instructor-cp", icon: <FaHome className='text-2xl' />, label: "Home" },
    { to: "/dashboard/add-class", icon: <MdExplore className='text-2xl' />, label: "Add a Class" },
    { to: "/dashboard/my-classes", icon: <IoSchoolSharp className='text-2xl' />, label: "My Classes" },
    { to: "/dashboard/my-pending", icon: <MdPendingActions className='text-2xl' />, label: "Pending Courses" },
    { to: "/dashboard/my-approved", icon: <IoMdDoneAll className='text-2xl' />, label: "Approved Classes" },
]

const students = [
    { to: "/dashboard/student-cp", icon: <BiHomeAlt className='text-2xl' />, label: "Dashboard" },
    { to: "/dashboard/enrolled-class", icon: <SiGoogleclassroom className='text-2xl' />, label: "Enrolled Classes" },
    { to: "/dashboard/my-selected", icon: <BiSelectMultiple className='text-2xl' />, label: "Selected Classes" },
    { to: "/dashboard/my-payments", icon: <MdPayments className='text-2xl' />, label: "Payments" },
    { to: "/dashboard/apply-instructor", icon: <SiInstructure className='text-2xl' />, label: "Apply for Instructor" },
]

const lastMenuItems = [
    { to: "/", icon: <BiHomeAlt className='text-2xl' />, label: "Home" },
    { to: "trending", icon: <MdOfflineBolt className='text-2xl' />, label: "trending" },
    { to: "/browse", icon: <GiFigurehead className='text-2xl' />, label: "following" },
]

const DashboardLayout = () => {
    const [open, setOpen] = useState(true);
    const { loader, logout } = useAuth();
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Log Out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logout().then(
                    Swal.fire({
                        title: "Logged Out!",
                        text: "You have been logged out.",
                        icon: "success"
                    })
                )
                    .catch((err) => {
                        console.log(err);
                    })
            }
            navigate("/");
        });
    };

    if (loader) {
        return <div className='flex justify-center items-center h-screen'>
            <HashLoader color="#ff1949" size={50} />
        </div>
    }
    return (
        <div className='flex'>
            <div className={`${open ? "w-72 overflow-y-auto example" : "w-[90px] overflow-y-auto example"} bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}>
                <div className='flex gap-x-4 items center'>
                    <img src="/yoga-logo.png" onClick={() => setOpen(!open)} alt="" className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`} />
                    <Link to="/"><h1 onClick={() => setOpen(!open)} className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}>Yoga Master</h1></Link>
                </div>

                {/* navlinks */}
                {/* admin */}
                {
                    role === "admin" &&
                    <ul className='pt-6'>
                        <p className={`ml-3 text-gray-500 ${!open && 'hidden'}`}>
                            <small>MENU</small>
                        </p>
                        {
                            adminNavItems.map((menuItem, index) => (
                                <li key={index} className='mb-2'>
                                    <NavLink to={menuItem.to} className={({ isActive }) =>
                                        `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"} 
                                duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>
                                        {menuItem.icon}
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                }

                {/* instructor */}
                {
                    role === "instructor" &&
                    <ul className='pt-6'>
                        <p className={`ml-3 text-gray-500 ${!open && 'hidden'}`}>
                            <small>MENU</small>
                        </p>
                        {
                            instructorNavItems.map((menuItem, index) => (
                                <li key={index} className='mb-2'>
                                    <NavLink to={menuItem.to} className={({ isActive }) =>
                                        `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"} 
                                duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>
                                        {menuItem.icon}
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                }

                {/* student */}
                {
                    role === "user" &&
                    <ul className='pt-6'>
                        <p className={`ml-3 text-gray-500 ${!open && 'hidden'}`}>
                            <small>MENU</small>
                        </p>
                        {
                            students.map((menuItem, index) => (
                                <li key={index} className='mb-2'>
                                    <NavLink to={menuItem.to} className={({ isActive }) =>
                                        `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"} 
                                duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>
                                        {menuItem.icon}
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                }

                {/* last menu */}
                <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 ${!open && 'hidden'}`}>
                        <small>OTHERS</small>
                    </p>
                    {
                        lastMenuItems.map((menuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink to={menuItem.to} className={({ isActive }) =>
                                    `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"} 
                                duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>
                                    {menuItem.icon}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }
                    <li>
                        <NavLink 
                            to="#" // use a dummy link
                            onClick={handleLogout}
                            className={({isActive})=>
                                `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"} 
                                duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>
                                <BiLogInCircle className='text-2xl'/>
                                <span className={`${!open && "hidden"} origin-left duration-200`}>
                                    Logout
                                </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='h-screen overflow-y-auto flex-1 p-7 example'>
                <Scroll/>
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
