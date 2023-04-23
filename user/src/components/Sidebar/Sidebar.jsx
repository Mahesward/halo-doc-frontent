import React from 'react';
import {
  HomeIcon,
  ChartBarIcon,
  CommandLineIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

function Sidebar() {
  return (
    <aside className="flex flex-col w-52 h-screen px-5 float-left py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l fixed">
      <button className="navbar-burger flex items-center text-gray-600 p-3" type="button">
        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 -mx-3 space-y-3 ">
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700"
            href="/"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Home</span>
          </a>
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <ClipboardDocumentListIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Doctors</span>
          </a>
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <BanknotesIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Payments</span>
          </a>
          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <UserGroupIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Users</span>
          </a>

          <a
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg  hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <WrenchScrewdriverIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Setting</span>
          </a>
        </nav>
        <div className="mt-6">
          <div className="p-3 bg-gray-100 rounded-lg">
            <h2 className="text-sm font-medium text-gray-800 ">New feature availabel!</h2>
            <p className="mt-1 text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum.
            </p>
            <img
              className="object-cover w-full h-32 mt-2 rounded-lg"
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1806&q=80"
              alt="Feature"
            />
          </div>
          <div className="flex items-center justify-between mt-6  hover:bg-gray-100 hover:text-gray-700">
            <a href="#" className="flex items-center gap-x-2">
              <span className="text-sm font-medium text-gray-700 ">Logout</span>
            </a>
            <a
              href="#"
              className="text-gray-500 transition-colors duration-200 rotate-180 rtl:rotate-0 hover:text-blue-500 "
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar;
