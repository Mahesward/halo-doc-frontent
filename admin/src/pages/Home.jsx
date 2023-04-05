import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'

function Home() {
  const getData = () => {
    try {

      console.log(localStorage.getItem('token'))

      axios.post(`${import.meta.env.VITE_API_URL}/`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res) => {
        console.log(res)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Home
