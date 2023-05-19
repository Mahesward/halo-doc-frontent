import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DoughnutChat from '../components/Doughnut_Graph/DoughnutChat';
import Card from '../components/Card/Card';
import { backend } from '../configs/axios.config';
import Graphs from '../components/Graphs/Graphs';
import Appointments from '../components/Appointments/AppointmentsList';

function Home() {
  const user = useSelector((state) => state?.data?.value)[0];
  const [male, setMale] = useState();
  const [female, setFemale] = useState();
  const [total, setTotal] = useState();
  const [revenue, setRevenue] = useState();

  useEffect(() => {
    const getPatients = async () => {
      const result = await backend.get(`/patients/${user._id}`);
      const { patients } = result.data;

      setMale(patients[0].male);
      setFemale(patients[0].female);
      setTotal(patients[0].total);
      const response = await backend.get(`/get-total-revenue/${user._id}`);
      setRevenue(response.data.revenue);
    };
    getPatients();
  }, []);
  return (
    <>
      <Card total={total} revenue={revenue} />
      <div className="grid md:grid-cols-3 sm:grid-cols-1 p-12">
        <div className="col-span-1">
          <DoughnutChat male={male} female={female} />
        </div>
        <div className="col-span-2">
          <Graphs male={male} female={female} />
        </div>
      </div>
      <Appointments home={true} />
    </>
  );
}

export default Home;
