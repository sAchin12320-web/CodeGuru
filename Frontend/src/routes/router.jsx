import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/Classes/SingleClass";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentCp from "../pages/Dashboard/Student/StudentCp";
import EnrolledClasses from "../pages/Dashboard/Student/Enroll/EnrolledClasses";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import PaymentHistory from "../pages/Dashboard/Student/Payment/History/PaymentHistory";
import Instructor from "../pages/Dashboard/Student/Apply-instructor/Instructor";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import CourseDetails from "../pages/Dashboard/Student/Enroll/CourseDetails";
import InstructorCp from "../pages/Dashboard/instructor/InstructorCp";
import AddClass from "../pages/Dashboard/instructor/AddClass";
import MyClasses from "../pages/Dashboard/instructor/MyClasses";
import PendingCourses from "../pages/Dashboard/instructor/PendingCourses";
import ApprovedCourses from "../pages/Dashboard/instructor/ApprovedCourses";
import AdminDashboard from "../pages/Dashboard/admin/AdminDashboard";
import ManageUsers from "../pages/Dashboard/admin/ManageUsers";
import Applications from "../pages/Dashboard/admin/Applications";
import ManageClass from "../pages/Dashboard/admin/ManageClass";
import UpdateUser from "../pages/Dashboard/admin/UpdateUser";
import UpdateClass from "../pages/Dashboard/instructor/UpdateClass";
import About from "../components/Headers/FooterComponents/About";
import Contact from "../components/Headers/FooterComponents/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children:[
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "instructors",
                element: <Instructors/>,
            },
            {
                path: "classes",
                element: <Classes/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "contact",
                element: <Contact/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "class/:id",
                element: <SingleClass />,
                loader: ({ params }) =>
                  fetch(`http://localhost:3000/class/${params.id}`),
            },
        ]
    },

    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        children: [
            {
                index:true,
                element: <Dashboard />
            },

            // students routes
            {
                path: "student-cp",
                element: <StudentCp/>
            },
            {
                path: "enrolled-class",
                element: <EnrolledClasses/>
            },
            {
                path: "my-selected",
                element: <SelectedClass/>
            },
            {
                path: "my-payments",
                element: <PaymentHistory/>
            },
            {
                path: "apply-instructor",
                element: <Instructor/>
            },
            {
                path: "user/payment",
                element: <Payment/>
            },
            {
                path: "course-details",
                element: <CourseDetails />
            },

            // instructor routes
            {
                path: "instructor-cp",
                element: <InstructorCp/>
            },
            {
                path: "add-class",
                element: <AddClass/>
            },
            {
                path: "my-classes",
                element: <MyClasses/>
            },
            {
                path: "my-pending",
                element: <PendingCourses/>
            },
            {
                path: "my-approved",
                element: <ApprovedCourses/>
            },
            {
                path: "update/:id",
                element: <UpdateClass/>,
                loader: ({params})=>fetch(`http://localhost:3000/class/${params.id}`)
            },

            // admin routes
            {
                path: "admin-home",
                element: <AdminDashboard/>
            },
            {
                path: "manage-users",
                element: <ManageUsers/>
            },
            {
                path: "manage-class",
                element: <ManageClass/>
            },
            {
                path: "manage-applications",
                element: <Applications/>
            },
            {
                path: "update-user/:id",
                element: <UpdateUser/>,
                loader: ({params})=>fetch(`http://localhost:3000/users/${params.id}`)
            },
        ]
    }
    
])