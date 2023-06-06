import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { commonApi, userApi } from '../../configs/axios.config';
import { APPOINTMENT_SCHEMA } from '../../validations';

function BookingTab() {
  const token = localStorage.getItem('token');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [tabActive, setTabActive] = useState('info');
  const [doctorTime, setDoctorTime] = useState('');
  const [selectedTime, setSelectedTime] = useState();
  const [timings, setTimings] = useState('');
  const [dates, setDates] = useState({
    day1: '',
    day2: '',
    day3: '',
    day4: '',
  });

  const userData = useSelector((state) => state?.data?.value);
  useEffect(() => {
    //* Getting departments for select options  *//
    const getDepartment = async () => {
      const res = await commonApi.get('/get-department');
      setDepartmentOptions(res.data.data);
    };

    getDepartment();

    const today = new Date();
    const day1 = new Date(today.getTime() + 86400000);
    const day2 = new Date(today.getTime() + 172800000);
    const day3 = new Date(today.getTime() + 259200000);
    const day4 = new Date(today.getTime() + 345600000);

    const datesData = {
      day1: day1.toDateString(),
      day2: day2.toDateString(),
      day3: day3.toDateString(),
      day4: day4.toDateString(),
    };

    setDates(datesData);
  }, []);

  //* Setting Formik For validations

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      mobile: '',
      symptoms,
      department: '',
      doctorId: '',
      doctorName: '',
      date: '',
      time: '',
      userId: userData?._id,
      price: '',
    },
    validationSchema: APPOINTMENT_SCHEMA,
    onSubmit: async () => {
      const res = await userApi.post('/book-appointment', formik.values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        formik.values.bookingId = res.data.id;
        setTabActive('payment');
      }
    },
  });

  const handleTabClick = (tab) => {
    setTabActive(tab);
  };

  const handleAddSymptoms = () => {
    if (!symptomsInput) return;
    const val = [...symptoms, symptomsInput];
    setSymptoms(val);
    setSymptomsInput('');
  };

  const deleteSymptomsHandler = (id) => {
    const val = symptoms.filter((data) => data !== id);
    setSymptoms(val);
  };

  const handleGetDoctors = async (dept) => {
    const res = await userApi.get(`/doctors-by-department?department=${dept}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDoctors(res.data.data);
  };

  const times = ['9am-10am', '10am-11am', '11am-12am', '12pm-1pm', '3pm-4pm', '4pm-5pm', '5pm-6pm'];

  const handleGetTimings = async (date) => {
    const data = {
      date,
      doctorId: formik.values.doctorId,
    };
    const response = await userApi.post('/check-available-timing', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTimings(response.data.data.map((val) => val.time));
  };

  let appointmentTimes = null;

  appointmentTimes = times
    .filter((time) => !timings.includes(time))
    .map((time) => (
      <tr key={time}>
        <td>
          <button
            className={`rounded-md border px-3.5 py-1.5 text-base font-semibold leading-7 ${
              selectedTime === time
                ? 'border-green-600 text-green-600 hover:bg-green-300'
                : 'border-blue-600 text-blue-600 hover:bg-blue-300'
            }  `}
            type="button"
            onClick={() => {
              setSelectedTime(time);
              formik.values.time = time;
            }}
          >
            {time}
          </button>
        </td>
      </tr>
    ));

  const handlePayment = async () => {
    try {
      if (formik.values.date === '' || formik.values.time === '') {
        toast.error('please fill all fields');
        return;
      }
      const res = await userApi.post('/payment', formik.values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      toast.error('something went wrong');
    }
  };

  return (
    <div className="px-4 py-4 md:px-8">
      <ul
        role="tablist"
        className="max-w-screen-xl md:w-full mx-auto border-b border-b-slate-400 flex items-center gap-x-3 overflow-x-auto text-sm"
      >
        <li
          className={`py-2 border-b-2 ${
            tabActive === 'info' ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'
          }`}
        >
          <button
            type="button"
            role="tab"
            className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
            onClick={() => handleTabClick('info')}
          >
            Info
          </button>
        </li>
        <li
          className={`py-2 border-b-2 ${
            tabActive === 'doctor' ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'
          }`}
        >
          <button
            type="button"
            role="tab"
            className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
            onClick={() => handleTabClick('doctor')}
          >
            Doctor
          </button>
        </li>
        <li
          className={`py-2 border-b-2 ${
            tabActive === 'date' ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'
          }`}
        >
          <button
            type="button"
            role="tab"
            className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
            onClick={() => handleTabClick('date')}
          >
            Date & Time
          </button>
        </li>
        <li
          className={`py-2 border-b-2 ${
            tabActive === 'details' ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'
          }`}
        >
          <button
            type="button"
            role="tab"
            className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
            onClick={() => handleTabClick('details')}
          >
            Details
          </button>
        </li>
      </ul>

      {/* TAB Content */}

      {(() => {
        //* info *//

        if (tabActive === 'info') {
          return (
            <div className="sm:w-full md:w-7/12 mx-auto text-center bg-white sm:p-8">
              <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                Fill the form details to continue
              </h5>
              <p className="mb-10 text-base text-gray-500 sm:text-lg dark:text-gray-400" />

              <form>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="mb-6">
                    <div className="flex justify-between">
                      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</p>
                      <span className="text-red-500 text-xs font-light text-end">{formik.errors.firstName}</span>
                    </div>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      name="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between">
                      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</p>
                      <span className="text-red-500 text-xs font-light text-end">{formik.errors.lastName}</span>
                    </div>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between">
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <span className="text-red-500 text-xs font-light text-end">{formik.errors.email}</span>
                  </div>
                  <input
                    type="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="mb-6">
                    <div className="flex justify-between">
                      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</p>
                      <span className="text-red-500 text-xs font-light text-end">{formik.errors.mobile}</span>
                    </div>
                    <input
                      type="text"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      name="mobile"
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between">
                      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</p>
                      <span className="text-red-500 text-xs font-light text-end">{formik.errors.age}</span>
                    </div>
                    <input
                      type="number"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      name="age"
                      onChange={formik.handleChange}
                      value={formik.values.age}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 mt-2 gap-4">
                  <div className="mb-6 px-4">
                    <div className="flex justify-between">
                      <p className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Gender</p>
                      <span className="text-red-500 text-xs font-light text-end">{formik.errors.gender}</span>
                    </div>
                    <div className="flex">
                      <div className="mx-4 flex">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          onChange={() => {
                            formik.values.gender = 'male';
                          }}
                        />
                        <p className="block ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Male</p>
                      </div>
                      <div className="mx-4 flex">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          onChange={() => {
                            formik.values.gender = 'female';
                          }}
                        />
                        <p className="block ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Female</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between">
                      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</p>
                      <span className="text-red-500 text-xs font-light text-end">{formik.errors.department}</span>
                    </div>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="department"
                      onChange={(e) => {
                        handleGetDoctors(e.target.value);
                        formik.handleChange(e);
                      }}
                      value={formik.values.department}
                    >
                      <option value="">Select a Department</option>
                      {departmentOptions.map((option) => (
                        <option value={option.name} key={option._id} className=" rounded-lg border-slate-300">
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <div className="relative">
                    <span className="text-red-500 text-xs font-light text-end">{formik.errors.symptoms}</span>
                    <input
                      id="search"
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="symptoms"
                      onChange={(e) => setSymptomsInput(e.target.value)}
                      value={symptomsInput}
                    />
                    <button
                      type="button"
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => handleAddSymptoms()}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  {symptoms.map((data, index) => (
                    <div
                      key={(data, index)}
                      className="h-10 mt-2 rounded-md border border-gray-300 bg-transparent flex items-center justify-between py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <p>{`${index + 1}. ${data}`}</p>
                      <span
                        className="ml-auto cursor-pointer text-red-600"
                        onClick={() => deleteSymptomsHandler(data)}
                      >
                        X
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    if (
                      formik.errors.date === 'Select a date' &&
                      !formik.errors.gender &&
                      !formik.errors.department
                    ) {
                      handleTabClick('doctor');
                    } else {
                      toast.error('please fill all fileds');
                    }
                  }}
                >
                  Next
                </button>
              </form>
            </div>
          );
        }

        //* doctor *//

        if (tabActive === 'doctor') {
          return (
            <>
              <div className="sm:w-full md:w-7/12 mx-auto text-center bg-white sm:p-8">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                  Please select A doctor to continue
                </h5>
                <p className="mb-10 text-base text-gray-500 sm:text-lg dark:text-gray-400" />

                <div className="grid grid-cols-2 gap-6">
                  {doctors.map((data) => (
                    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600" />

                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                            {`${data.firstName} ${data.lastName}`}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                        </div>

                        <div className="hidden sm:block sm:shrink-0">
                          <img
                            alt={data.firstName}
                            src={data.photoURL}
                            className="h-16 w-16 rounded-lg object-cover shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col text-start">
                        <p className="max-w-[40ch] text-sm text-gray-500">
                          Doctor's Name : {`${data.firstName} ${data.lastName}`}
                        </p>
                        <p className="max-w-[40ch] text-sm text-gray-500">Fees : {data.fees}</p>
                        <p className="max-w-[40ch] text-sm text-gray-500">Department : {data.department}</p>
                        <p className="max-w-[40ch] text-sm text-gray-500">
                          Available time slot : {data.workTime === 'normal' ? 'Day Time' : data.workTime}
                        </p>
                      </div>
                      <button
                        className="mt-4  text-body-color hover:border-primary hover:bg-primary inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium transition hover:text-white"
                        type="button"
                        onClick={() => {
                          formik.values.doctorName = data.firstName;
                          formik.values.doctorId = data._id;
                          formik.values.price = data.fees;
                          setSelectedDoctor(data);
                          setDoctorTime(data.workTime);
                        }}
                      >
                        <p
                          className={`text-dark hover:text-primary block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] ${
                            selectedDoctor._id === data._id ? 'text-green-500' : ''
                          }`}
                        >
                          {selectedDoctor._id === data._id ? 'Selected' : 'Select'}
                        </p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 float-right"
                onClick={() => handleTabClick('date')}
              >
                next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </>
          );
        }

        if (tabActive === 'date') {
          //* date *//

          return (
            <>
              <h3 className="mb-4  mt-4 font-semibold text-gray-900 dark:text-white">Choose Date </h3>
              <ul className="items-center  md:w-1/2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3" onClick={() => handleGetTimings(dates.day1)}>
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        formik.values.date = dates.day1;
                      }}
                    />
                    <p className="w-auto py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {dates.day1}
                    </p>
                  </div>
                </li>
                <li className="w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3" onClick={() => handleGetTimings(dates.day2)}>
                    <input
                      id="horizontal-list-radio-id"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        formik.values.date = dates.day2;
                      }}
                    />
                    <p className="w-auto py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {dates.day2}
                    </p>
                  </div>
                </li>
                <li className="w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3" onClick={() => handleGetTimings(dates.day3)}>
                    <input
                      id="horizontal-list-radio-millitary"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        formik.values.date = dates.day3;
                      }}
                    />
                    <p className="w-auto py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {dates.day3}
                    </p>
                  </div>
                </li>
                <li className="w-auto dark:border-gray-600">
                  <div className="flex items-center pl-3" onClick={() => handleGetTimings(dates.day4)}>
                    <input
                      id="horizontal-list-radio-passport"
                      type="radio"
                      value=""
                      name="list-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={() => {
                        formik.values.date = dates.day4;
                      }}
                    />
                    <p className="w-auto py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {dates.day4}
                    </p>
                  </div>
                </li>
              </ul>

              <section className="container py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      Pick up a timeslot for your consultation
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">{appointmentTimes}</div>
                </div>
              </section>
              <form>
                <button
                  type="button"
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => handlePayment()}
                >
                  Go to Payment
                </button>
              </form>
            </>
          );
        }
        return '';
      })()}
    </div>
  );
}

export default BookingTab;
