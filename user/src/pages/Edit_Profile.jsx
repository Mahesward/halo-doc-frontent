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
          Update Profile
        </h5>
        <p className="mb-10 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Fill the form details to Update Profile. If there is fields no need to update leave it untouched.
        </p>

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
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default editProfile;
