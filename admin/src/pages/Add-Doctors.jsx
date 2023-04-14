import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
// import cloudinary from 'cloudinary-core';
import { backendApi, cloudinaryUpload } from '../config/axios.config';

function DoctorForm() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [profile, setProfile] = useState('');
  const [AuthEmail, setAuthEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [AuthPhone, setAuthPhone] = useState('');
  const [image, setImage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      phone,
      department,
      dob,
      address,
      profile,
      AuthEmail,
      password,
      AuthPhone,
    };

    if (
      !(
        firstName
         && lastName
         && email
         && phone
         && department
         && dob
         && address
         && profile
         && AuthEmail
         && password
         && confirmPassword
         && AuthPhone
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
      const res = await backendApi.post('/doctors/add-doctors', data, {
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
    <div>
      <Navbar />

      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold mb-12">Add Doctor</h1>
          <div className="grid grid-cols-1 gap-x-16 gap-y-8">
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <h3 className="text-xl font-medium mb-4">Personal Information</h3>
              <form action="" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="FirstName">
                      First Name
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="First Name"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Last Name
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Last Name"
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Email address"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Phone Number"
                        type="number"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Department
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Department"
                        type="text"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      DOB
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Role"
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="message">
                    Address
                    <textarea
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Address"
                      rows="8"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    >
                      Address
                    </textarea>
                  </label>
                  <label className="sr-only" htmlFor="message">
                    Profile
                    <textarea
                      className="w-full rounded-lg border-gray-200 p-3 text-sm"
                      placeholder="Profile"
                      rows="8"
                      id="Profile"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                    >
                      Profile
                    </textarea>
                  </label>
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                  <div className="mb-12">
                    <label htmlFor="file" className="mb-3 block text-base font-medium text-black">
                      Default file input
                      <input
                        type="file"
                        className="border-form-stroke text-body-color placeholder-body-color focus:border-primary active:border-primary file:border-form-stroke file:text-body-color file:hover:bg-primary w-full cursor-pointer rounded-lg border-[1.5px] font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:bg-[#F5F7FD] file:py-3 file:px-5 file:hover:bg-opacity-10 disabled:cursor-default disabled:bg-[#F5F7FD]"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>

                <h3 className="text-xl font-medium">Authenticaiton Information</h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="authemail">
                      Email
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Email address"
                        type="email"
                        id="authEmail"
                        value={AuthEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Password
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Password"
                        type="Password"
                        id="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Confirm Password
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Confirm Password"
                        type="Password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                      <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Phone Number"
                        type="number"
                        id="authPhone"
                        value={AuthPhone}
                        onChange={(e) => setAuthPhone(e.target.value)}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                    onClick={(e) => submitHandler(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DoctorForm;
