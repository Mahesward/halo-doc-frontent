import React, { useEffect, useState } from 'react';
import Graphs from '../components/Graph/Graph';
import Card from '../components/Cards/Card';
import DoughnutGraph from '../components/Donought_Graph/Donought_Graph';
import { backendApi } from '../config/axios.config';

function Home() {
  const [male, setMale] = useState();
  const [female, setFemale] = useState();
  const [total, setTotal] = useState();
  const [revenue, setRevenue] = useState();
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await backendApi.get('/get-revenue');
      setRevenue(result.data.revenue);

      const response = await backendApi.get('/get-total-appointments');
      setMale(response.data.data.maleCount);
      setFemale(response.data.data.femaleCount);
      setTotal(response.data.data.total);

      const getMonthlyData = async () => {
        const data = await backendApi.get('/get-monthly-revenue');
        setMonthlyRevenue(data?.data?.data);
      };

      getMonthlyData();
    };

    getData();
  }, []);
  return (
    <>
      <Card total={total} revenue={revenue} />
      <div className="grid md:grid-cols-3 sm:grid-cols-1 p-12">
        <div className="col-span-1">
          <DoughnutGraph male={male} female={female} />
        </div>
        <div className="col-span-2">
          <Graphs revenue={monthlyRevenue} />
        </div>
      </div>
    </>
  );
}

export default Home;
