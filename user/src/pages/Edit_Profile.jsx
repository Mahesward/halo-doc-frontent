import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar/Navbar';
import { userApi } from '../configs/axios.config';

function editProfile() {
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.data.value);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      dob: '',
    },
    onSubmit: async () => {
      const res = await userApi.post(`/edit-profile${user._id}`, formik.values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        formik.values.bookingId = res.data.id;
      }
    },
  });
  return (
    <div>
      <Navbar />

      <div className="sm:w-full md:w-7/12 mx-auto text-center bg-white sm:p-8">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Fill the form details to continue
        </h5>
        <p className="mb-10 text-base text-gray-500 sm:text-lg dark:text-gray-400" />

        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-6">
              <div className="flex justify-between">
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</p>
              </div>
              <input
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between">
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</p>
              </div>
              <input
                type="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between">
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</p>
            </div>
            <input
              type="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="email"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="mb-6">
              <div className="flex justify-between">
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</p>
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
              </div>
              <input
                type="date"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 mt-2 gap-4">
            <div className="mb-6 px-4">
              <div className="flex justify-between">
                <p className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Gender</p>
              </div>
              <div className="flex">
                <div className="mx-4 flex">
                  <input type="radio" name="gender" value="male" />
                  <p className="block ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Male</p>
                </div>
                <div className="mx-4 flex">
                  <input type="radio" name="gender" value="female" />
                  <p className="block ml-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Female</p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="container flex flex-col p-10 mx-auto m-10 ng-untouched ng-pristine ng-valid"
      >
        <p className="text-2xl font-medium md:ml-6">Update Profile</p>
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="flex col-span-full sm:col-span-3">
              <div className="flex mt-3 mr-5 justify-between">
                <p className="text-sm">Name </p>
              </div>
              <input
                id="name"
                type="text"
                value=""
                className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                name="firstName"
              />
            </div>
            <div className="flex col-span-full sm:col-span-3">
              <div className="flex mt-3 mr-5 justify-between">
                <p className="text-sm">Mobile</p>
              </div>
              <input
                id="phone"
                type="text"
                className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                name="lastName"
              />
            </div>
            <div className="flex col-span-full sm:col-span-3">
              <div className="flex mt-3 mr-5 justify-between">
                <p className="text-sm">Email</p>
              </div>
              <input
                id="email"
                type="email"
                className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                name="phone"
              />
            </div>
            <div className="flex col-span-full sm:col-span-3">
              <div className="flex mt-3 mr-5 justify-between">
                <p className="text-sm">DOB</p>
              </div>
              <input
                id="Age"
                type="date"
                className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                name="phone"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="button"
          className="py-2 px-4 mx-auto  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-1/4 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default editProfile;
