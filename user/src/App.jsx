import React from 'react'
import './app.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HOME,LOGIN,SIGNUP } from './pages'

function App() {
  return (
    <BrowserRouter>
      <div><Toaster position="top-center" reverseOrder={false} /></div>
      <Routes>
        <Route path='/' element={<HOME />} />
        <Route path='/login' element={<LOGIN />} />
        <Route path='/signup' element={<SIGNUP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
