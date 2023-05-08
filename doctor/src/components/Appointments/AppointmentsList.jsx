import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { backend } from '../../configs/axios.config';

function AppointmentList() {
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      const res = await backend.get('/appointment/get-appointments?id=642e9dcd2a3c22246a499af4');
      if (res.data.success) setAppointment(res.data.data);
    };
    getAppointments();
  }, []);

  const handleCancellation = async (id) => {
    const result = await backend.patch(`/appointment/cancel-appointment?id=${id}`);
    if (result.data.success) toast.success('canceled booking');
  };

  return (
    <>
      <div />
      <section className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 ">Appointments</h2>
            <p className="mt-1 text-sm text-gray-500 ">
              This is a list of all Appointment bookings. You can view cancel the Appointments.
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        <span>Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Contact
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Date & Time
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        View
                      </th>
                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointment.map((data) => (
                      <tr key={data._id}>
                        <td className="pr-12 pl-5 whitespace-nowrap text-start">
                          <div className="text-sm text-gray-900">{data.name}</div>
                          <div className="text-sm text-gray-500">{`${data.age} ${data.gender}`}</div>
                        </td>
                        <td className="pr-12 pl-5 whitespace-nowrap text-start">
                          <div className="text-sm text-gray-900">{data.email}</div>
                          <div className="text-sm text-gray-500">{`${data.mobile}`}</div>
                        </td>
                        <td className="pr-12 pl-5 whitespace-nowrap text-start">
                          <div className="text-sm text-gray-900">{data.date}</div>
                          <div className="text-sm text-gray-500">{`${data.time}`}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-start ${
                              data.cancelled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {data.cancelled ? 'Cancelled' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            onClick={(e) => {
                              handleCancellation(data._id);
                            }}
                            className="text-gray-500 hover:text-indigo-600"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <Link
            to="/ds"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>previous</span>
          </Link>

          <div className="items-center hidden md:flex gap-x-3">
            <Link to="/ds" className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60">
              1
            </Link>
            <Link to="/ds" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">
              2
            </Link>
            <Link to="/ds" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">
              3
            </Link>
            <Link to="/ds" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">
              ...
            </Link>
            <Link to="/ds" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">
              12
            </Link>
            <Link to="/ds" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">
              13
            </Link>
            <Link to="/ds" className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100">
              14
            </Link>
          </div>
          <Link
            to="/ds"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
          >
            <span>Next</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default AppointmentList;
