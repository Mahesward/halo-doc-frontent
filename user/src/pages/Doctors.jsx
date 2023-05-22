import React, { useState, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NAVBAR } from '../components';
import { commonApi, userApi } from '../configs/axios.config';

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState('');
  const [department, setDepartment] = useState([]);
  const [departmentFilter, setFilterDepartment] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const user = useSelector((state) => state.data.value);

  useEffect(() => {
    const getDoctors = async () => {
      const res = await commonApi.get('/get-doctors');
      setDoctors(res.data.data);
      setFilteredDoctors(res.data.data);
    };
    const getDepartment = async () => {
      const res = await commonApi.get('/get-department');
      setDepartment(res.data.data);
    };
    getDoctors();
    getDepartment();
  }, []);

  useEffect(() => {
    if (departmentFilter === 'all') return setFilteredDoctors(doctors);
    const data = doctors.filter((val) => departmentFilter === val.department);
    return setFilteredDoctors(data);
  }, [departmentFilter]);

  const handleReportDoctor = async () => {
    if (!reason) return toast.error('Please Enter Reason');
    const data = {
      doctorId,
      userId: user._id,
      reason,
    };
    const result = await userApi.post('/report-doctor', data);
    if (result.data.success) return toast.success('Reported Doctor');
    return setModal(!modal);
  };

  const searchHandler = async () => {
    const result = await commonApi.get(`/search-doctors?keyword=${searchKeyword}`);
    setFilteredDoctors(result.data.result);
  };

  return (
    <>
      <NAVBAR />

      <div className="flex max-w-full justify-between px-4">
        <div className="mx-auto w-full max-w-full w-/2">
          <div className="px-2 py-6">
            <select
              className="border-none border-0"
              name="department"
              id=""
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">All</option>
              {department.map((data) => (
                <option key={data.name} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative w-1/2 h-12 mt-4 flex items-center text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50">
          <input
            type="text"
            id="default-search"
            className="block w-full border-none outline-none hover:outline-none"
            placeholder="Search For Users"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <SearchIcon className="absolute right-3" onClick={(e) => searchHandler(e)} />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {filteredDoctors.map((data) => (
          <div key={data._id} className="rounded-md border">
            <img
              src={data.photoURL}
              alt={data.firstName}
              className="aspect-[16/9] w-full  rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <div className="p-4">
              <h1 className="inline-flex items-center text-lg font-semibold">
                {`${data.firstName} ${data.lastName}`}
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
              </p>
              <p className="mt-3 text-sm text-gray-600">Department :{data.department}</p>
              <p className="mt-3 text-sm text-gray-600">Department :{data.worktime}</p>
              <p className="mt-3 mb-5 text-sm text-gray-600">Fees :{data.fees}</p>
              <div className="flex justify-between">
                <Link
                  to="/book-appointment"
                  className="mt-6 w-1/2 rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  GOTO BOOKING
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setDoctorId(data._id);
                    setModal(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mt-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Report A Doctor</h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <input
                  type="text"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Type in the reason for reporting"
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => handleReportDoctor()}
                >
                  Report
                </button>
                <button
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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

export default Doctors;
