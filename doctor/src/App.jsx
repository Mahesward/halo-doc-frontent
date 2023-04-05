import React from "react";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HOME, LOGIN } from './pages'
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

      </Routes>
    </BrowserRouter>

  );
}

export default App;
