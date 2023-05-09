import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  APPOINTMENTS,
  BLOG,
  DOCTORS,
  HOME,
  LOGIN,
  PAYMENT_SUCCESS,
  PROFILE,
  SIGNUP,
  VIEW_APPOINTMENT,
  CHAT,
  VIDEO_CALL,
} from './pages';
import './app.css';

function App() {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading && (
        <div className="absolute bg-black bg-opacity-60 z-10 h-full w-full flex items-center justify-center mb-20">
          <div className="flex items-center">
            <div className="flex space-x-2 animate-pulse mb-28">
              <div className="w-3 h-3 bg-red-500 opacity-50  rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 opacity-70  rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
        </div>
      )}

      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Suspense fallback={<div className="loader" />}>
        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="/login" element={<LOGIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          <Route path="/blogs" element={<BLOG />} />
          <Route path="/book-appointment" element={<APPOINTMENTS />} />
          <Route path="/doctors" element={<DOCTORS />} />
          <Route path="/profile" element={<PROFILE />} />
          <Route path="/view-appointment" element={<VIEW_APPOINTMENT />} />
          <Route path="/success" element={<PAYMENT_SUCCESS />} />
          <Route path="/chat" element={<CHAT />} />
          <Route path="/Video-call" element={<VIDEO_CALL />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
