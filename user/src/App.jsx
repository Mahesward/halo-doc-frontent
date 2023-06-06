import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from '../auth/protectedRoutes';
import {
  APPOINTMENTS,
  BLOG,
  DOCTORS,
  HOME,
  LOGIN,
  PAYMENT_SUCCESS,
  PROFILE,
  SIGNUP,
  CHAT,
  VIDEO_CALL,
  EDIT_PROFILE,
} from './pages';
import './App.css';

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
          <Route path="/login" element={<LOGIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          <Route
            path="/"
            element={(
              <ProtectedRoutes>
                <HOME />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/blogs"
            element={(
              <ProtectedRoutes>
                <BLOG />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/book-appointment"
            element={(
              <ProtectedRoutes>
                <APPOINTMENTS />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/doctors"
            element={(
              <ProtectedRoutes>
                <DOCTORS />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/profile"
            element={(
              <ProtectedRoutes>
                <PROFILE />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/success"
            element={(
              <ProtectedRoutes>
                <PAYMENT_SUCCESS />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/chat"
            element={(
              <ProtectedRoutes>
                <CHAT />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/Video-call"
            element={(
              <ProtectedRoutes>
                <VIDEO_CALL />
              </ProtectedRoutes>
            )}
          />
          <Route
            path="/edit-profile"
            element={(
              <ProtectedRoutes>
                <EDIT_PROFILE />
              </ProtectedRoutes>
            )}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
