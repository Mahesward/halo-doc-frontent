import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  TableCellsIcon,
  ArrowLeftOnRectangleIcon,
  NewspaperIcon,
  ChatBubbleBottomCenterTextIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

function Sidebar() {
  const handleSignout = () => {
    window.localStorage.clear();
    window.location.replace('/admin/login');
  };

  return (
    <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l ">
      <Link to="/admin">
        <h3 className="text-3xl font-bold">Halo-Doc</h3>
      </Link>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="flex-1 -mx-3 space-y-3 ">
          <Link
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700"
            to="/admin"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Home</span>
          </Link>

          <Link
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700"
            to="/admin/doctors"
          >
            <TableCellsIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Doctors</span>
          </Link>

          <Link
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700"
            to="/admin/blogs"
          >
            <NewspaperIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Blogs</span>
          </Link>

          <Link
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700"
            to="/admin/users"
          >
            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Users</span>
          </Link>

          <Link
            className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-gray-100  hover:text-gray-700"
            to="/admin/payments"
          >
            <BanknotesIcon className="w-5 h-5" />
            <span className="mx-2 text-sm font-medium">Payments</span>
          </Link>
        </nav>
        <div className="mt-6">
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              className="text-gray-500 transition-colors duration-200 rotate-180 rtl:rotate-0 hover:text-blue-500 "
              onClick={handleSignout}
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
