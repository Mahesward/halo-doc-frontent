import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BottomNav from './components/Bottom_Navbar/Bottom_Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import {
  LOGIN,
  HOME,
  DOCTORS,
  ADD_DOCTORS,
  USERS,
  BLOG,
  ADD_BLOG,
  EDIT_BLOG,
  PAYMENTS,
  FEEDBACKS,
  ERROR_PAGE,
  REFUNDS,
} from './pages';

function App() {
  let shouldRenderSideNav = true;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const adjustSidebar = () => {
      if (window.innerWidth < 900) {
        setIsMobile(true);
      } else setIsMobile(false);
    };

    const getPath = () => {
      const location = window.location.pathname;
      if (location === ('/404' || '/doctor/login')) shouldRenderSideNav = false;
    };
    getPath();
    const token = localStorage.getItem('token');
    if (token === false) window.location.replace('/doctor/login');

    // adjust sidebar when page loads
    adjustSidebar();
    // adjust on every resize event
    window.addEventListener('resize', () => adjustSidebar());
    return () => window.removeEventListener('resize', () => {});
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {isMobile ? <div>{shouldRenderSideNav && <BottomNav />}</div> : ''}
      <div className="flex w-screen">
        {!isMobile ? (
          <div className={shouldRenderSideNav ? 'float-left' : ''}>{shouldRenderSideNav && <Sidebar />}</div>
        ) : (
          ''
        )}
        <div className="w-full">
          <Routes>
            <Route path="/admin" element={<HOME />} />
            <Route path="/admin/login" element={<LOGIN />} />
            <Route path="/admin/doctors" element={<DOCTORS />} />
            <Route path="/admin/doctors/add-doctors" element={<ADD_DOCTORS />} />
            <Route path="/admin/users" element={<USERS />} />
            <Route path="/admin/blogs" element={<BLOG />} />
            <Route path="/admin/blogs/add-blog" element={<ADD_BLOG />} />
            <Route path="/admin/blogs/edit-blog/:id" element={<EDIT_BLOG />} />
            <Route path="/admin/payments" element={<PAYMENTS />} />
            <Route path="/admin/refunds" element={<REFUNDS />} />
            <Route path="/admin/feedbacks" element={<FEEDBACKS />} />
            <Route path="*" element={<ERROR_PAGE />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
