import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Sidebar/Sidebar';
import { ADD_BLOG, APPOINTMENTS, BLOGS, CHAT, EDIT_PROFILE, HOME, LOGIN, PROFILE } from './pages';
import './app.css';

function App() {
  let shouldRenderSideNav = true;

  useEffect(() => {
    const getPath = () => {
      const location = window.location.pathname;
      console.log(location);
      if (location === ('/404' || '/doctor/login')) shouldRenderSideNav = false;
    };
    getPath();
    const token = localStorage.getItem('token');
    if (token === false) window.location.replace('/doctor/login');
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>

        <Suspense fallback={<div className="loader" />}>
          <div className={shouldRenderSideNav ? 'flex' : ''}>
            {shouldRenderSideNav && <Sidebar />}

            {/* if userData then shows pages else redirect to login page */}

            <Routes>
              <Route path="/doctor" element={<HOME />} />
              <Route path="/doctor/login" element={<LOGIN />} />
              <Route path="/doctor/appointments" element={<APPOINTMENTS />} />
              <Route path="/doctor/blogs" element={<BLOGS />} />
              <Route path="/doctor/blogs/add-blog" element={<ADD_BLOG />} />
              <Route path="/doctor/profile" element={<PROFILE />} />
              <Route path="/doctor/edit-profile" element={<EDIT_PROFILE />} />
              <Route path="/doctor/chat" element={<CHAT />} />
            </Routes>
          </div>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
