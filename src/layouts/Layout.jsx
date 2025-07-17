import { NavLink, Outlet } from "react-router"
import './LayoutAdmin.css'
import useSchoolStore from "../store/school-Store"



const LayoutAdmin = () => {
  const user = useSchoolStore((state)=>state.user)
  // console.log("user ",user)


  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          id="sidebar"
          className="sidebar bg-pink-600 text-white w-64 flex flex-col"
        >
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="ml-2 font-bold text-xl menu-text">ระบบนักเรียน</span>
            </div>
            <button id="toggle-sidebar" className="text-white focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="mt-5 px-2">
            <NavLink
              to="/"
              className="menu-item flex items-center px-4 py-3 text-white rounded-lg hover:bg-pink-800 mb-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 menu-icon mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="menu-text">หน้าหลัก</span>
            </NavLink>

            <NavLink
              to="/tablestudent"
              className={({ isActive }) =>
                `menu-item flex items-center px-4 py-3 text-white rounded-lg hover:bg-pink-800 mb-1 ${isActive ? 'bg-pink-700' : ''}`
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 menu-icon mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="menu-text">รายชื่อนักเรียน</span>
            </NavLink>

              {/* <NavLink
              to="/admin/formadd"
              className={({ isActive }) =>
                `menu-item flex items-center px-4 py-3 text-white rounded-lg hover:bg-purple-800 mb-1 ${isActive ? 'bg-purple-700' : ''}`
              }
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 menu-icon mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span className="menu-text">เพิ่มนักเรียน</span>
              </NavLink> */}
              <NavLink
                to="/calendaract"
                className={({ isActive }) =>
                  `menu-item flex items-center px-4 py-3 text-white rounded-lg hover:bg-pink-800 mb-1 ${isActive ? 'bg-pink-700' : ''}`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 menu-icon mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="menu-text">ปฏิทินกิจกรรม</span>
              </NavLink>

              <NavLink
                to="/test"
                className={({ isActive }) =>
                  `menu-item flex items-center px-4 py-3 text-white rounded-lg hover:bg-pink-800 mb-1 ${isActive ? 'bg-pink-700' : ''}`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 menu-icon mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="menu-text">ฟอร์มทดสอบ</span>
              </NavLink>

              <NavLink
                to="/dynamicinput"
                className={({ isActive }) =>
                  `menu-item flex items-center px-4 py-3 text-white rounded-lg hover:bg-pink-800 mb-1 ${isActive ? 'bg-pink-700' : ''}`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 menu-icon mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="menu-text">Dynamic input fields</span>
              </NavLink>
              <a
                href="#reports"
                className="menu-item flex items-center px-4 py-3 text-white rounded-lg hover:bg-pink-800 mb-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 menu-icon mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="menu-text">รายงานสถิติ</span>
              </a>
            </nav>
          </div>
          <div className="p-4 border-t border-pink-800">
            <div className="flex items-center">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci11c2VyIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCI+PC9jaXJjbGU+PC9zdmc+"
                alt="User"
                className="h-8 w-8 rounded-full bg-pink-700 p-1"
              />
              <div className="ml-3 menu-text">
                {
                user ? <p className="text-sm font-medium">{user.email}</p>
                : <p className="text-sm font-medium"> Guest </p>
                }
                <p className="text-xs text-purple-300">ผู้ดูแลระบบ</p>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-white shadow-sm z-10">
            <div className="px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <button id="mobile-menu-button" className="md:hidden mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <h1 className="text-xl font-semibold text-gray-800">
                  โรงเรียนชุมชนวัดไทยงาม
                </h1>
              </div>
              <div className="flex items-center">

                
                {/* <div className="relative mr-4">
                  <input
                    id="customSearch"
                    type="text"
                    placeholder="ค้นหานักเรียน..."
                    className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div> */}
                <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </header>
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet/>
          


          </main>
        </div>
      </div>

    </div>
  )
}
export default LayoutAdmin