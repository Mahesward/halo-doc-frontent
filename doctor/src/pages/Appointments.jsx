import React from 'react';
import Navbar from '../components/Navbar/Navbar';

function Appointments() {
  return (
    <div className="w-full">
      <Navbar />

      <h1 className="text-xl font-semibold w-full text-left mt-5 ">APPOINTMENTS</h1>

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead>
            <tr>
              <th>.</th>

              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">24/05/1995</td>
              <button
                type="button"
                class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2"
              >
                Green
              </button>
              <button
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-2"
              >
                Red
              </button>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Jane Doe</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">04/11/1980</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Designer</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">$100,000</td>
            </tr>

            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gary Barlow</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">Singer</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">$20,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
