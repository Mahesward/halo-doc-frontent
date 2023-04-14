import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import {
  ADD_BLOG,
  APPOINTMENTS,
  BLOGS,
  HOME,
  LOGIN,
} from './pages';
import './app.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Routes>
        <Route path="/doctor" element={<HOME />} />
        <Route path="/doctor/login" element={<LOGIN />} />
        <Route path="/doctor/appointments" element={<APPOINTMENTS />} />
        <Route path="/doctor/blogs" element={<BLOGS />} />
        <Route path="/doctor/blogs/add-blog" element={<ADD_BLOG />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
