import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/admin/Dashboard";
import Manage from "../pages/admin/Manage";
import LayoutUser from "../layouts/LayoutUser";
import Homeuser from "../pages/user/Homeuser";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import ProtectRouteUser from "./ProtectRouteUser";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import FormEditStudent from "../pages/user/FormEditStudent";
import FormStudent from "../pages/admin/FormStudent";
import FormAddStudent from "../pages/admin/FormAddStudent";
import Calendar from "../pages/admin/Calendar";
import DashboardUser from "../pages/user/DashboardUser";
import TableStudent from "../pages/user/TableStudent";
import CalendarUser from "../pages/user/CalendarUser";
import TestForm from "../pages/user/TestForm";
import DynamicInput from "../pages/user/DynamicInput";
import ExportExcel from "../components/app/ExportExcel";


const router = createBrowserRouter([
    // pubblic Route
    { 
      path: '/', 
      element: <Layout />,
      children: [
        // { index: true, element: <Home /> },
        { index: true, element: <DashboardUser /> },
        { path: 'tablestudent', element: <TableStudent /> },
        { path: 'calendaract', element: <CalendarUser /> },
        { path: 'about', element: <About /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'test', element: <TestForm /> },
        { path: 'dynamicinput', element: <DynamicInput /> },
      ]
    },
    
    // private Route
    // admin
    {
      path: '/admin',
      // element: <LayoutAdmin />,
      element: <ProtectRouteAdmin element={<LayoutAdmin />} /> ,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'manage', element: <Manage /> },
        { path: 'formadd', element: <FormAddStudent /> },
        { path: 'formedit', element: <FormEditStudent /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'export', element: <ExportExcel /> }
      ]
    },

    // user
    // {
    //   path: '/user',
    //   // element: <LayoutUser />,
    //   element: <ProtectRouteUser element={ <LayoutUser /> }/>,
    //   children: [
    //     { index: true, element: <Homeuser /> },
    //     { path: 'editstudent', element: <FormEditStudent /> },
    //   ]
    // },


])

const AppRoutes = () => {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes