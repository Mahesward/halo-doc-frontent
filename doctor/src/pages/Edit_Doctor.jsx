import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function editDoctor() {
  const navigate = useNavigate();
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [image, setImage] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      dob: '',
      address: '',
      fees: '',
      workTime: '',
      password: '',
      confirmPassword: '',
      photoURL: '',
      profile: '',
    },
    validationSchema: DOCTOR_SCHEMA,
    onSubmit: async () => {
      //* Checking both the passwords

      if (formik.values.password !== formik.values.confirmPassword) {
        toast.error('password does not match');
        return;
      }

      //* Checking the image Size

      if (image.size > 1000000) {
        toast.error('File size is 1mb');
        return;
      }

      //* Uploading image to cloudinary

      const file = new FormData();
      file.append('file', image);

      file.append('upload_preset', 'halo-doc-doctor-profile');
      file.append('cloud_name', 'halo-doc');
      file.append('api_key', import.meta.env.CLOUDINARY_API_KEY);

      const cloudLink = await cloudinaryUpload.post('/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      formik.values.photoURL = cloudLink.data.secure_url;

      try {
        const res = await backendApi.post('/doctors/add-doctors', formik.values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          toast.success(res.data.message);
          navigate('/admin/doctors');
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <section className="p-6">
        <form
          onSubmit={formik.handleSubmit}
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs">You can enter your informations here.</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">First name</p>
                  <p className="text-sm text-red-500">{formik.errors.firstName}</p>
                </div>
                <input
                  id="firstname"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Last name</p>
                  <p className="text-sm text-red-500">{formik.errors.lastName}</p>
                </div>
                <input
                  id="lastname"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Phone</p>
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                </div>
                <input
                  id="firstname"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="phone"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">DOB</p>
                  <p className="text-sm text-red-500">{formik.errors.dob}</p>
                </div>
                <input
                  id="lastname"
                  type="date"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="dob"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Email</p>
                  <p className="text-sm text-red-500">{formik.errors.email}</p>
                </div>
                <input
                  id="email"
                  type="email"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Department</p>
                  <p className="text-sm text-red-500">{formik.errors.department}</p>
                </div>
                <select
                  id="department"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="department"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.department}
                >
                  <option value="">Select a Department</option>
                  {departmentOptions.map((option) => (
                    <option value={option.name} key={option.name} className=" rounded-lg border-slate-300">
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Work Time</p>
                  <p className="text-sm text-red-500">{formik.errors.workTime}</p>
                </div>
                <select
                  id="workTime"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="workTime"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  value={formik.values.workTime}
                >
                  <option value="">Select Preffered Work Time</option>
                  <option value="dayOff">Day Off</option>
                  <option value="normal">Normal 9AM-5PM</option>
                  <option value="afterNoon">After Noon 2PM-6PM</option>
                  <option value="night">Night 6PM-11PM</option>
                </select>
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Fees</p>
                  <p className="text-sm text-red-500">{formik.errors.fees}</p>
                </div>
                <input
                  id="fees"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="fees"
                  onChange={formik.handleChange}
                  value={formik.values.fees}
                />
              </div>
              <div className="col-span-full">
                <div className="flex justify-between">
                  <p className="text-sm">Address</p>
                  <p className="text-sm text-red-500">{formik.errors.address}</p>
                </div>
                <textarea
                  id="address"
                  className="mt-2  border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Profile</p>
              <p className="text-xs">Adipisci fuga autem eum!</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Password</p>
                  <p className="text-sm text-red-500">{formik.errors.firstName}</p>
                </div>
                <input
                  id="username"
                  type="password"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <div className="flex justify-between">
                  <p className="text-sm">Confirm Password</p>
                  <p className="text-sm text-red-500">{formik.errors.firstName}</p>
                </div>
                <input
                  id="password"
                  type="password"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </div>
              <div className="col-span-full">
                <div className="flex justify-between">
                  <p className="text-sm">Bio</p>
                  <p className="text-sm text-red-500">{formik.errors.firstName}</p>
                </div>
                <textarea
                  id="bio"
                  className="mt-2  border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                  name="profile"
                  onChange={formik.handleChange}
                  value={formik.values.profile}
                />
              </div>
              <div className="col-span-full">
                <p className="text-sm">Photo</p>
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      formik.values.photoURL ||
                      (image ? URL.createObjectURL(image) : '/images/default-profilepng.png')
                    }
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="w-full px-4 md:w-1/2 ">
                    <div className="">
                      <input
                        type="file"
                        className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary file:border-form-stroke file:text-body-color file:hover:bg-primary w-full cursor-pointer rounded-lg border-[1.5px] font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-[#F5F7FD] file:py-3 file:px-5 file:hover:bg-opacity-10 disabled:cursor-default disabled:bg-[#F5F7FD]"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
          <div className="mt-4 flex">
            <button
              type="submit"
              className="justify-center w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default editDoctor;
