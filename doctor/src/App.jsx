import React, { useEffect, Suspense, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar/Sidebar';
import BottomNavbar from './components/Bottom_Navbar/Bottom_Navbar';
import {
  ADD_BLOG,
  ADD_PRESCRIPTION,
  APPOINTMENTS,
  BLOGS,
  CHAT,
  EDIT_PROFILE,
  HOME,
  INACTIVE_APPOINTMENTS,
  LOGIN,
  PROFILE,
  VIDEO_CALL,
} from './pages';
import './app.css';

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
    <div>
      <BrowserRouter>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>

        <Suspense fallback={<div className="loader" />}>
          {isMobile ? (
            <div>
            {shouldRenderSideNav && <BottomNavbar />}
            </div>
          ) : (
            ''
          )}
          <div className="flex w-screen">
            {!isMobile ? (
              <div className={shouldRenderSideNav ? 'float-left' : ''}>{shouldRenderSideNav && <Sidebar />}</div>
            ) : (
              ''
            )}

            <div className="w-full">
              <Routes>
                <Route path="/doctor" element={<HOME />} />
                <Route path="/doctor/login" element={<LOGIN />} />
                <Route path="/doctor/appointments" element={<APPOINTMENTS />} />
                <Route path="/doctor/inactive-appointments" element={<INACTIVE_APPOINTMENTS />} />
                <Route path="/doctor/blogs" element={<BLOGS />} />
                <Route path="/doctor/blogs/add-blog" element={<ADD_BLOG />} />
                <Route path="/doctor/profile" element={<PROFILE />} />
                <Route path="/doctor/edit-profile" element={<EDIT_PROFILE />} />
                <Route path="/doctor/chat" element={<CHAT />} />
                <Route path="/doctor/video-call" element={<VIDEO_CALL />} />
                <Route path="/doctor/add-prescription" element={<ADD_PRESCRIPTION />} />
              </Routes>
            </div>
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
