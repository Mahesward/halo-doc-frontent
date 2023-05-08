import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Navbar from '../components/Navbar/Navbar';
import { backend, cloudinaryUpload } from '../configs/axios.config';

function DoctorForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: '',
      dob: '',
      address: '',
      profile: '',
    },
  });

  const [image, setImage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = formik.values;

    if (
      !(
        firstName &&
        lastName &&
        email &&
        phone &&
        department &&
        dob &&
        address &&
        profile &&
        AuthEmail &&
        password &&
        confirmPassword &&
        AuthPhone
      )
    ) {
      toast.error('please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('password does not match');
      return;
    }
    if (image.size > 1000000) {
      toast.error('File size is 1mb');
      return;
    }

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

    data.photoURL = cloudLink.data.secure_url;

    try {
      const res = await backend.post('/doctors/', data, {
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
  };

  return (
    <>
      <div />
      <section className="p-6">
        <form className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!
              </p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <p className="text-sm">First name</p>
                <input
                  id="firstname"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <p className="text-sm">Last name</p>
                <input
                  id="lastname"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <p className="text-sm">Email</p>
                <input
                  id="email"
                  type="email"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full">
                <p className="text-sm">Address</p>
                <input
                  id="address"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <p className="text-sm">City</p>
                <input
                  id="city"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <p className="text-sm">State / Province</p>
                <input
                  id="state"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full sm:col-span-2">
                <p className="text-sm">ZIP / Postal</p>
                <input
                  id="zip"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
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
                <p className="text-sm">Username</p>
                <input
                  id="username"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <p className="text-sm">Website</p>
                <input
                  id="website"
                  type="text"
                  className="mt-2 h-10 border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full">
                <p className="text-sm">Bio</p>
                <textarea
                  id="bio"
                  className="mt-2  border border-slate-200 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-blue-400"
                />
              </div>
              <div className="col-span-full">
                <p className="text-sm">Photo</p>
                <div className="flex items-center space-x-2">
                  <img src="https://source.unsplash.com/30x30/?random" alt="" className="w-10 h-10 rounded-full" />
                  <button type="button" className="px-4 py-2 border rounded-md">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default DoctorForm;
