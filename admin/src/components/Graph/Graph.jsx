/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Chart from 'react-apexcharts';

function Graphs({ revenue }) {
    const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    },
  };

  const series = [
    {
      name: 'series-1',
      data: revenue,
    },
  ];
  return (
    <>
      {/* <Line options={options} data={data} /> */}
      <Chart options={options} series={series} type="bar" width="500" />
    </>
  );
}

export default Graphs;
