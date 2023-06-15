import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userApi } from '../configs/axios.config';
import Navbar from '../components/Navbar/Navbar';

function profile() {
  const token = localStorage?.getItem('token');
  const profileData = useSelector((state) => state?.data?.value);
  const [prescription, setPrescription] = useState();
  const [appoinmtent, setAppointment] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const user = await userApi?.get(`/get-user-info/${profileData?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrescription(user?.data?.data?.prescription);
    };
    getUserData();
    const getAppiontment = async () => {
      const data = await userApi?.get(`/get-appointments/${profileData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointment(data.data.data);
    };
    getAppiontment();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-4">
          <div className="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
            <p className="text-7xl font-bold text-[#0ed3cf] rounded-full">{profileData?.name.split('')[0]}</p>
          </div>
          <div className="flex flex-col sm:border-l col-span-3">
            <div className="flex flex-col space-y-4  p-6 text-gray-600">
              <div className="flex flex-row text-sm">
                <p className="flex items-center  text-gray-500">
                  <span className="font-semibold mr-2 text-xs">Name:</span>
                  <input className="border-0" type="text" value={profileData?.name} />
                </p>
              </div>

              <div className="flex flex-row text-sm">
                <p className="flex items-center  text-gray-500">
                  <span className="font-semibold mr-2 text-xs uppercase">Email: </span>
                  <input className="border-0" type="text" value={profileData?.email} />
                </p>
              </div>
            </div>
            <div className="flex justify-center w-full relative bottom-0  bg-gray-50">
              <div className="grid grid-cols-3 border-t divide-x text-[#0ed3cf]  bg-gray-50 dark:bg-transparent py-3">
                <button className=" cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="md:col-span-1 sm:col-span-1">
          <h3 className="text-lg font-medium m-5">Prescription</h3>
          {prescription?.map((data) => (
            <div
              key={data.date}
              className="flex flex-col border rounded-lg overflow-hidden bg-white mx-5 my-6 max-w-lg"
            >
              <div className="grid grid-cols-1">
                <div className="flex flex-col">
                  <div className="flex flex-col space-y-4  p-6 text-gray-600">
                    <div className="flex flex-col gap-2 text-sm">
                      <p className="flex items-center font-medium text-lg text-gray-500">
                        Date :<span className="text-base font-normal">{data?.date}</span>
                      </p>
                      <p className="flex items-center font-medium text-lg text-gray-500">
                        Doctor Name :<span className="text-base font-normal">{data?.doctor}</span>
                      </p>
                      <p className="flex items-center font-medium text-lg text-gray-500">
                        Medicine :<span className="text-base font-normal">{data?.medicine}</span>
                      </p>
                      <p className="flex items-center font-medium text-lg text-gray-500">
                        Dosage :<span className="text-base font-normal">{data?.dosage}</span>
                      </p>
                      <p className="flex items-center font-medium text-lg text-gray-500">
                        Notes :<span className="text-base font-normal">{data?.notes}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="sm:col-span-1 md:col-span-2">
          <h3 className="text-lg font-medium m-5">Appointments</h3>
          <div className="w-full max-w-md mr-6 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900">Latest Bookings</h5>
              {/* <Link to="/doctor/appointments" className="text-sm font-medium text-blue-600 hover:underline">
                View all
              </Link> */}
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {appoinmtent &&
                  appoinmtent.map((data) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate ">
                            Dr.
                            {data?.doctorName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{data?.email}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate ">{data?.date}</p>
                          <p className="text-sm text-gray-500 truncate">{data?.time}</p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-start ${
                                data.cancelled ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {data.cancelled ? 'Cancelled' : 'Active'}
                            </span>
                          </td>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default profile;
