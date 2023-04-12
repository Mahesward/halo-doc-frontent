import React from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ADD_BLOG, APPOINTMENTS, BLOGS, HOME, LOGIN } from './pages'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div><Toaster position="top-center" reverseOrder={false} /></div>
      <Routes>
      /**
        * * Doctor Routes
        */
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
