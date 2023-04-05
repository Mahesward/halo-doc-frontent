import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Table from '../components/Table/Table'
import axios from 'axios'

function Doctors() {

  return (
    <div>
      <Navbar />
      <Table  />
    </div>
  )
}

export default Doctors
