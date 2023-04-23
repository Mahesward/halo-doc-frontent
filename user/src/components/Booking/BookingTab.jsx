import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { commonApi, userApi } from '../../configs/axios.config';
import { APPOINTMENT_SCHEMA } from '../../validations';

function BookingTab() {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorSelect, setDoctorSelect] = useState(false);
  const [dates, setDates] = useState({
    day1: '',
    day2: '',
    day3: '',
    day4: '',
  });

  useEffect(() => {
    //* Getting departments for select options  *//
    const getDepartment = async () => {
      const res = await commonApi.get('/get-department');
      setDepartmentOptions(res.data.data);
    };

    getDepartment();

    const today = new Date();
    const day1 = new Date(today.getTime());
    const day2 = new Date(today.getTime() + 86400000);
    const day3 = new Date(today.getTime() + 172800000);
    const day4 = new Date(today.getTime() + 259200000);

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
      age: '',
      gender: '',
      name: '',
      email: '',
      mobile: '',
      symptoms,
      department: '',
      doctorId: '',
      doctorName: '',
      visitedBefore: true,
      date: '',
      time: '10am-12am',
    },
    validationSchema: APPOINTMENT_SCHEMA,
    onSubmit: async () => {
      console.log(symptoms);
      console.log(formik.values);
      const res = await userApi.post('/book-appointment', formik.values);
      if (res.data.success) toast.success('submitted');
    },
  });

  const [tabActive, setTabActive] = useState('info');

  const handleTabClick = (tab) => {
    setTabActive(tab);
  };

  const handleAddSymptoms = () => {
    const val = [...symptoms, symptomsInput];
    setSymptoms(val);
  };

  const handleGetDoctors = async (dept) => {
    const res = await userApi.get(`/doctors-by-department?department=${dept}`);
    setDoctors(res.data.data);
  };

  // const times = [
  //   morning=[
  //     '8am-9am',
  //     '9am--10am',
  //     '10am-11am',
  //     '11am-12am',
  //   ],
  //   noon=[
  //     '12am-1am',
  //     '1pm-2pm',
  //   ],
  //   evening=[
  //     '2pm-3pm',
  //     '3pm-4pm',
  //     '4pm-5pm',
  //     '5pm-6pm',
  //   ]
  // ];

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
            tabActive === 'symptoms' ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'
          }`}
        >
          <button
            type="button"
            role="tab"
            className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
            onClick={() => handleTabClick('symptoms')}
          >
            Symptoms
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
            Date & Doctor
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
        <li
          className={`py-2 border-b-2 ${
            tabActive === 'payment' ? 'border-indigo-500 text-indigo-500' : 'border-white text-gray-500'
          }`}
        >
          <button
            type="button"
            role="tab"
            className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-500 hover:bg-gray-50 active:bg-gray-100 font-medium"
            onClick={() => handleTabClick('payment')}
          >
            Payment
          </button>
        </li>
      </ul>

      {/* TAB Content */}

      {(() => {
        //* info *//

        if (tabActive === 'info') {
          return (
            <div className="flex-row items-center">
              <form>
                <div className="md:ml-24 p-4 mt-5 grid-col">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <p
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Age
                    </p>
                    <input
                      className="flex h-10 w-20 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="number"
                      id="age"
                      placeholder="Age"
                      name="age"
                      onChange={formik.handleChange}
                      value={formik.values.age}
                    />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Gender</h3>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="gender"
                            type="radio"
                            name="gender"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            value="male"
                            onChange={() => {
                              formik.values.gender = 'male';
                            }}
                          />
                          <p className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Male
                          </p>
                        </div>
                      </li>
                      <li className="w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="gender"
                            type="radio"
                            name="gender"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            value="female"
                            onChange={() => {
                              formik.values.gender = 'female';
                            }}
                          />
                          <p className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Female
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 float-right"
                onClick={() => handleTabClick('symptoms')}
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
            </div>
          );
        }

        //* symptoms *//

        if (tabActive === 'symptoms') {
          return (
            <div>
              <h1>select department</h1>
              <div className="md:ml-24 p-4 mt-5 flex-col">
                <select
                  name="department"
                  id=""
                  className=" mb-4 rounded-lg border-slate-300 "
                  onChange={(e) => {
                    handleGetDoctors(e.target.value);
                    formik.handleChange(e);
                  }}
                  value={formik.values.department}
                >
                  {departmentOptions.map((option) => (
                    <option value={option.name} key={option._id} className=" rounded-lg border-slate-300">
                      {option.name}
                    </option>
                  ))}
                </select>

                <div className="flex">
                  <input
                    className="flex h-10 w-1/2 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    name="symptoms"
                    placeholder="Symptoms"
                    onChange={(e) => setSymptomsInput(e.target.value)}
                    value={symptomsInput}
                  />
                  <button
                    type="button"
                    className="md:ml-5 inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 float-right"
                    onClick={() => handleAddSymptoms()}
                  >
                    ADD
                  </button>
                </div>
                <hr className="my-2 " />
                {symptoms.map((data) => (
                  <div
                    key={data}
                    className="h-10 w-1/2 rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <p>{data}</p>
                    <span>X</span>
                  </div>
                ))}
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
            </div>
          );
        }

        //* Details *//

        if (tabActive === 'details') {
          return (
            <div className="px-4">
              <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</p>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                  </div>

                  <div>
                    <p
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </p>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="johndoe@gmail.com"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>

                  <div>
                    <p htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Phone number
                    </p>
                    <input
                      type="number"
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123-45-678"
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      name="mobile"
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                    />
                  </div>

                  <div>
                    <p htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Have You Visited Before ?
                    </p>
                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-1"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => {
                          formik.values.visitedBefore = true;
                        }}
                        value={formik.values.visitedBefore}
                      />
                      <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={() => {
                          formik.values.visitedBefore = false;
                        }}
                        value={formik.values.visitedBefore}
                      />
                      <p className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</p>
                    </div>
                  </div>
                </div>
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => handleTabClick('payment')}
                >
                  next
                </button>
              </form>
            </div>
          );
        }

        //* date *//

        if (tabActive === 'date') {
          return (
            <>
              <h3 className="mb-4  mt-4 font-semibold text-gray-900 dark:text-white">Choose Date </h3>
              <ul className="items-center  md:w-1/2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-auto border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
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
                  <div className="flex items-center pl-3">
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
                  <div className="flex items-center pl-3">
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
                  <div className="flex items-center pl-3">
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
                <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                <span>EVE</span>
                              </th>
                              <th
                                scope="col"
                                className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Time
                              </th>
                              <th scope="col" className="relative py-3.5 px-4">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {/* {people.map((person) => (
                              <tr key={person.name}>
                                <td className="px-12 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900 dark:text-white">{person.title}</div>
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {person.department}
                                  </div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  {person.role}
                                </td>
                              </tr>
                            ))} */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {doctors.map((data) => (
                <section className="bg-[#F3F4F6] pt-20 pb-10 lg:pt-[120px] lg:pb-20">
                  <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                      <div className="w-full px-4 md:w-1/2 xl:w-1/3">
                        <div className="mb-10 overflow-hidden rounded-lg bg-white">
                          <img src={data.photoURL} alt="imae" className="w-full h-56" />
                          <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                            <h3>
                              <p className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                                {`${data.firstName} ${data.lastName}`}
                              </p>
                            </h3>
                            <p className="text-body-color mb-7 text-base leading-relaxed">{data.department}</p>
                            <p className="text-body-color mb-7 text-base leading-relaxed">{data.profile}</p>
                            <button
                              className="text-body-color hover:border-primary hover:bg-primary inline-block rounded-full border border-[#E5E7EB] py-2 px-7 text-base font-medium transition hover:text-white"
                              type="button"
                              onClick={() => {
                                setDoctorSelect(true);
                                formik.values.doctorName = data.firstName;
                                formik.values.doctorId = data._id;
                              }}
                            >
                              View Details
                            </button>
                            <p className="text-dark hover:text-primary mb-4 block text-xl font-semibold sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
                              {doctorSelect ? 'Selected' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </>
          );
        }
        if (tabActive === 'payment') {
          return (
            <div className="px-4">
              <div className="px-4 py-4 md:px-8">payments</div>
              <div className="px-4 py-4 md:px-8">payments</div>
              <form onSubmit={formik.handleSubmit}>
                <button type="submit" className="border border-slate-400">
                  submit
                </button>
              </form>
            </div>
          );
        }
        return '';
      })()}
    </div>
  );
}

export default BookingTab;
