import React from 'react'
import './app.css'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { HOME, LOGIN, SIGNUP } from './pages'
import { useSelector } from 'react-redux'


function App() {

  const { loading } = useSelector(state => state.alerts)

  return (
    <BrowserRouter>

      {loading &&

        <div class="absolute bg-black bg-opacity-60 z-10 h-full w-full flex items-center justify-center mb-20">
          <div class="flex items-center">

            <div class="flex space-x-2 animate-pulse mb-28">
              <div class="w-3 h-3 bg-red-500 opacity-50  rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 opacity-70  rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>

          </div>
        </div>

      }

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
