import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LOGIN, HOME, DOCTORS, ADD_DOCTORS } from './pages'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <BrowserRouter>
        <div><Toaster position="top-center" reverseOrder={false} /></div>
        <Routes>
          <Route path='/admin' element={<HOME />} />
          <Route path='/admin/login' element={<LOGIN />} />
          <Route path='/admin/doctors' element={<DOCTORS />} />
          <Route path='/admin/doctors/add-doctors' element={<ADD_DOCTORS />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
