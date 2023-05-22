import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BottomNav from './components/Bottom_Navbar/Bottom_Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedRoute from './auth/ProtectedRoute';
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
  const [shouldRenderSideNav, setShouldRenderSideNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const adjustSidebar = () => {
      if (window.innerWidth < 900) {
        setIsMobile(true);
      } else setIsMobile(false);
    };

    if (window.location.pathname === '/404' || window.location.pathname === '/admin/login') {
      setShouldRenderSideNav(false);
    } else {
      setShouldRenderSideNav(true);
    }

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
            <Route path="/admin/login" element={<LOGIN />} />
            <Route
              path="/admin"
              element={(
                <ProtectedRoute>
                  <HOME />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/doctors"
              element={(
                <ProtectedRoute>
                  <DOCTORS />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/doctors/add-doctors"
              element={(
                <ProtectedRoute>
                  <ADD_DOCTORS />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/users"
              element={(
                <ProtectedRoute>
                  <USERS />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/blogs"
              element={(
                <ProtectedRoute>
                  <BLOG />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/blogs/add-blog"
              element={(
                <ProtectedRoute>
                  <ADD_BLOG />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/blogs/edit-blog/:id"
              element={(
                <ProtectedRoute>
                  <EDIT_BLOG />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/payments"
              element={(
                <ProtectedRoute>
                  <PAYMENTS />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/refunds"
              element={(
                <ProtectedRoute>
                  <REFUNDS />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/admin/feedbacks"
              element={(
                <ProtectedRoute>
                  <FEEDBACKS />
                </ProtectedRoute>
              )}
            />
            <Route path="*" element={<ERROR_PAGE />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
