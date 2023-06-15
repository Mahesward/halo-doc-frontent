import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { backend, commonApi } from '../../configs/axios.config';

function AppointmentList({ home = false }) {
  const token = localStorage.getItem('token');
  const [appointment, setAppointment] = useState([]);
  const user = useSelector((state) => state.data.value)[0];

  useEffect(() => {
    const getAppointments = async () => {
      const res = await backend.get(`/appointment/get-appointments/${user?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) setAppointment(res.data.data);
    };
    getAppointments();
  }, []);

  const handleCancellation = async (id) => {
    const result = await backend.patch(`/appointment/cancel-appointment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.data.success) toast.success('canceled booking');
  };

  const handleChat = async (recieverId) => {
    let chatExists;
    let chat = await commonApi.get(`/conversation/${recieverId}`);
    chat = chat.data.conversation;

    chat.forEach((element) => {
      if (element.members.includes(recieverId) && element.members.includes(user._id)) {
        chatExists = true;
      }
    });
    if (!chatExists) {
      const data = {
        recieverId,
        senderId: user._id,
      };

      await commonApi.post('/conversation', data);
    }
    window.location.replace('/doctor/chat');
  };

  return (
    <>
      <div />
      <section className="w-5/6 container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800 ">Appointments</h2>
            <p className="mt-1 text-sm text-gray-500 ">
              This is a list of all Appointment bookings. You can view cancel the Appointments.
            </p>
          </div>
          {home ? (
            ''
          ) : (
            <Link
              to="/doctor/inactive-appointments"
              className="rounded-md border border-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-blue-300"
            >
              Inactive Appointents
            </Link>
          )}
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
                        Chat
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Join meet
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Cancel
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Prescription
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointment
                      .filter((data) => data.active)
                      .map((data) => (
                        <tr key={data._id}>
                          <td className="pr-12 pl-5 whitespace-nowrap text-start">
                            <div className="text-sm text-gray-900">{`${data.firstName} ${data.lastName}`}</div>
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
                              className="text-gray- border p-1 rounded-md hover:text-indigo-600"
                              onClick={() => handleChat(data.userId)}
                            >
                              Chat
                            </button>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to="/doctor/video-call"
                              className="text-gray- border p-1 rounded-md hover:text-indigo-600"
                            >
                              Join Meet
                            </Link>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              type="button"
                              onClick={() => {
                                handleCancellation(data._id);
                              }}
                              className="text-gray- border p-1 rounded-md hover:text-indigo-600"
                            >
                              Cancel
                            </button>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/doctor/add-prescription/${data._id}`}
                              className="text-gray- border p-1 rounded-md hover:text-indigo-600"
                            >
                              Prescription
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AppointmentList;
