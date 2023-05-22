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
import ProtectedRoute from '../auth/ProtectedRoute';

function App() {
  const [shouldRenderSideNav, setShouldRenderSideNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const adjustSidebar = () => {
      if (window.innerWidth < 900) {
        setIsMobile(true);
      } else setIsMobile(false);
    };

    if (window.location.pathname === '/404' || window.location.pathname === '/doctor/login') {
      setShouldRenderSideNav(false);
    } else {
      setShouldRenderSideNav(true);
    }
    console.log(window.location.pathname);

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
          {isMobile ? <div>{shouldRenderSideNav && <BottomNavbar />}</div> : ''}
          <div className="flex w-screen">
            {!isMobile ? (
              <div className={shouldRenderSideNav ? 'float-left' : ''}>{shouldRenderSideNav && <Sidebar />}</div>
            ) : (
              ''
            )}

            <div className="w-full">
              <Routes>
                <Route path="/doctor/login" element={<LOGIN />} />
                <Route
                  path="/doctor"
                  element={
                    <ProtectedRoute>
                      <HOME />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/appointments"
                  element={
                    <ProtectedRoute>
                      <APPOINTMENTS />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/inactive-appointments"
                  element={
                    <ProtectedRoute>
                      <INACTIVE_APPOINTMENTS />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/blogs"
                  element={
                    <ProtectedRoute>
                      <BLOGS />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/blogs/add-blog"
                  element={
                    <ProtectedRoute>
                      <ADD_BLOG />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/profile"
                  element={
                    <ProtectedRoute>
                      <PROFILE />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/edit-profile"
                  element={
                    <ProtectedRoute>
                      <EDIT_PROFILE />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/chat"
                  element={
                    <ProtectedRoute>
                      <CHAT />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/video-call"
                  element={
                    <ProtectedRoute>
                      <VIDEO_CALL />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/doctor/add-prescription"
                  element={
                    <ProtectedRoute>
                      <ADD_PRESCRIPTION />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
