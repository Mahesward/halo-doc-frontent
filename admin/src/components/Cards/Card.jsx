import React, { useEffect, useState } from 'react';
import { backendApi } from '../../config/axios.config';

function Card({ total, revenue,revenueToday }) {
  const [doctorsCount, setDoctorsCount] = useState();

  useEffect(() => {
    const getData = async () => {
      const res = await backendApi.get('/get-total-doctors');
      setDoctorsCount(res.data.doctorsCount);
    };
    getData();
  }, []);
  const cardData = [
    {
      title: 'Patients',
      data: total,
    },
    {
      title: 'Revenue',
      data: `Rs ${revenue}`,
    },
    {
      title: 'Doctors',
      data: doctorsCount,
    },
    {
      title: 'Revenue Today',
      data: '',
    },
  ];

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-5 mx-5">
      {cardData.map((data) => (
        <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <h5 className="mb-2 float- text-2xl font-bold tracking-tight text-gray-900">{data.title}</h5>
          <p className="font-normal text-gray-700">{data.data}</p>
        </div>
      ))}
    </div>
  );
}

export default Card;
