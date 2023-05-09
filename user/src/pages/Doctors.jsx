import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NAVBAR } from '../components';
import { commonApi } from '../configs/axios.config';

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      const res = await commonApi.get('/get-doctors');
      setDoctors(res.data.data);
    };
    getDoctors();
    console.log(doctors);
  }, []);
  return (
    <>
      <NAVBAR />
      <div className=" mx-auto grid md:grid-cols-3 sm:grid-cols-1">
        {doctors.map((data) => (
          <div className="w-[300px] rounded-md border">
            <img src={data.photoURL} alt="Laptop" className="h-[200px] w-full rounded-t-md object-cover" />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                {`${data.firstName} ${data.lastName}`}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </h1>
              <p className="mt-3 text-sm text-gray-600">Department : {data.department}</p>
              <p className="mt-3 text-sm text-gray-600">
                {/* Department : {data.worktime === 'normal' ? 'Day Time' : data.worktime} */}
                Department : {data.worktime}
              </p>
              <p className="mt-3 mb-5 text-sm text-gray-600">Fees : {data.fees}</p>
              <Link
                to="/book-appointment"
                className="mt-6 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                GOTO BOOKING
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Doctors;
