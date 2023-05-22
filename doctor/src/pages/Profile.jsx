import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { backend } from '../configs/axios.config';

function Profile() {
  const profileData = useSelector((state) => state.data.value)[0];
  const [modal, setModal] = useState(false);
  const [appoinmtent, setAppointment] = useState();
  const [leaveData, setLeaveData] = useState([]);
  const [leave, setLeave] = useState('');

  useEffect(() => {
    const getAppointments = async () => {
      const res = await backend.get(`/appointment/get-appointments/${profileData._id}`);
      if (res.data.success) setAppointment(res.data.data);
    };
    getAppointments();
  }, []);

  const handleSubmit = async () => {
    const data = { leaveDate: leave, doctorId: profileData._id };
    const res = await backend.patch('/apply-leave', data);
    if (res.data.success) {
      setModal(!modal);
      toast.success(res.data.message);
    }
  };

  useEffect(() => {
    const getDoctor = async () => {
      const result = await backend.get(`/get-doctor/${profileData._id}`);
      setLeaveData(result.data.doctor[0].leave);
    };
    getDoctor();
  }, []);

  return (
    <>
      <div>
        <div className="p-6 sm:p-12">
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
            <img
              src={profileData.photoURL}
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start"
            />
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold text-center md:text-left">Leroy Jenkins</h4>
              <p className="">{profileData.profile}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="w-full max-w-sm ml-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6">
            <div className="flex justify-between">
              <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">Apply For Leave</h5>
              <button
                type="button"
                className="text-3xl font-bold text-blue-700 cursor-pointer"
                onClick={() => setModal(true)}
              >
                +
              </button>
            </div>
            <ul className="my-4 space-y-3">
              <li>
                <p
                  to="/"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow"
                >
                  sd
                </p>
              </li>
            </ul>
            <div>
              <Link
                to="/"
                className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
              >
                <svg
                  className="w-3 h-3 mr-2"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="question-circle"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
                  />
                </svg>
                Your notifications will appear Here
              </Link>
            </div>
          </div>

          {/* PERSONAL INFORMATION */}

          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <h5 className="mb-4 text-xl font-medium text-gray-500">Personal Information</h5>
            <ul className="space-y-5 my-7">
              <li className="flex">
                <span className="text-base font-normal leading-tight text-gray-500">
                  Name : {` ${profileData.firstName} ${profileData.lastName}`}
                </span>
              </li>
              <li className="flex">
                <span className="text-base font-normal leading-tight text-gray-500">
                  Department : {profileData.department}
                </span>
              </li>
              <li className="flex">
                <span className="text-base font-normal leading-tight text-gray-500">
                  Mail : {profileData.email}
                </span>
              </li>
              <li className="flex">
                <span className="text-base font-normal leading-tight text-gray-500">
                  Phone : {profileData.phone}
                </span>
              </li>
              <li className="flex">
                <span className="text-base font-normal leading-tight text-gray-500">DOB : {profileData.dob}</span>
              </li>
              <li className="flex">
                <span className="text-base font-normal leading-tight text-gray-500">
                  Address : {profileData.address}
                </span>
              </li>
            </ul>
            <Link
              to="/doctor/edit-profile"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
              Edit
            </Link>
          </div>

          {/* appointment List */}

          <div className="w-full max-w-md mr-6 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900">Latest Bookings</h5>
              <Link to="/doctor/appointments" className="text-sm font-medium text-blue-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {appoinmtent &&
                  appoinmtent.map((data) => (
                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate ">{`${data.firstName} ${data.lastName}`}</p>
                          <p className="text-sm text-gray-500 truncate">{data.email}</p>
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

      {modal && (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900">Apply For Leave</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-cente"
                  onClick={() => setModal(!modal)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <button type="button" className="sr-only" onClick={() => setModal(!modal)}>
                    Close modal
                  </button>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                  onChange={(e) => setLeave(e.target.value)}
                />
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  onClick={() => setModal(false)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
