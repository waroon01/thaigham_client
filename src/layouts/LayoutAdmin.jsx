import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import useSchoolStore from "../store/school-Store";

const LayoutAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = useSchoolStore((state) => state.user);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-purple-900 text-white flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
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
            {isSidebarOpen && (
              <span className="ml-2 font-bold text-xl">ระบบนักเรียน</span>
            )}
          </div>
          {isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white focus:outline-none md:hidden"
            >
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
          )}
        </div>

        <nav className="mt-5 px-2 flex-1 overflow-y-auto">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg hover:bg-purple-800 mb-1 ${
                isActive ? "bg-purple-700" : ""
              }`
            }
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {isSidebarOpen && <span className="ml-3">หน้าหลัก</span>}
          </NavLink>

          <NavLink
            to="/admin/manage"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg hover:bg-purple-800 mb-1 ${
                isActive ? "bg-purple-700" : ""
              }`
            }
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            {isSidebarOpen && <span className="ml-3">รายชื่อนักเรียน</span>}
          </NavLink>

          <NavLink
            to="/admin/calendar"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg hover:bg-purple-800 mb-1 ${
                isActive ? "bg-purple-700" : ""
              }`
            }
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {isSidebarOpen && <span className="ml-3">ปฏิทินกิจกรรม</span>}
          </NavLink>
        </nav>

        <div className="p-4 border-t border-purple-800">
          <div className="flex items-center">
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="User"
              className="h-8 w-8 rounded-full bg-purple-700 p-1"
            />
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {user ? user.email : "Guest"}
                </p>
                <p className="text-xs text-purple-300">ผู้ดูแลระบบ</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-2 p-2 rounded-md hover:bg-gray-100"
              >
                <svg
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
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <svg
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
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
