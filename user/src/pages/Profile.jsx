import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userApi } from '../configs/axios.config';
import Navbar from '../components/Navbar/Navbar';

function profile() {
  const profileData = useSelector((state) => state?.data?.value);
  const [prescription, setPrescription] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage?.getItem('token');
      const user = await userApi?.get(`/get-user-info/${profileData?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrescription(user?.data?.data?.prescription);
    };
    getUserData();
  }, []);

  const handleProfileUpdate = ()=>{
     
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col border rounded-lg overflow-hidden bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-4">
          <div className="flex flex-col border-b sm:border-b-0 items-center p-8 sm:px-4 sm:h-full sm:justify-center">
            <p className="text-7xl font-bold text-[#0ed3cf] rounded-full">{profileData?.name.split('')[0]}</p>
          </div>
          <div className="flex flex-col sm:border-l col-span-3">
            <div className="flex flex-col space-y-4  p-6 text-gray-600">
              <div className="flex flex-row text-sm">
                <p className="flex items-center  text-gray-500">
                  <span className="font-semibold mr-2 text-xs">Name:</span>
                  <input className="border-0" type="text" value={profileData?.name} />
                </p>
              </div>

              <div className="flex flex-row text-sm">
                <p className="flex items-center  text-gray-500">
                  <span className="font-semibold mr-2 text-xs uppercase">Email: </span>
                  <input className="border-0" type="text" value={profileData?.email} />
                </p>
              </div>
            </div>
            <div className="flex justify-center w-full relative bottom-0  bg-gray-50">
              <div className="grid grid-cols-3 border-t divide-x text-[#0ed3cf]  bg-gray-50 dark:bg-transparent py-3">
                <button
                  type="button"
                  className=" cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold"
                  onClick={() => handleProfileUpdate()}
                >
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 0 24 24"
                      width="20px"
                      fill="#0ed3cf"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </div>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-lg font-medium m-5">Prescription</h3>
      <div className="grid grid-cols-4">
        {prescription?.map((data) => (
          <div className="flex flex-col border rounded-lg overflow-hidden bg-white mx-5 my-12 max-w-lg">
            <div className="grid grid-cols-1">
              <div className="flex flex-col">
                <div className="flex flex-col space-y-4  p-6 text-gray-600">
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="flex items-center font-medium text-lg text-gray-500">
                      Date :<span className="text-base font-normal">{data?.date}</span>
                    </p>
                    <p className="flex items-center font-medium text-lg text-gray-500">
                      Doctor Name :<span className="text-base font-normal">{data?.doctor}</span>
                    </p>
                    <p className="flex items-center font-medium text-lg text-gray-500">
                      Medicine :<span className="text-base font-normal">{data?.medicine}</span>
                    </p>
                    <p className="flex items-center font-medium text-lg text-gray-500">
                      Dosage :<span className="text-base font-normal">{data?.dosage}</span>
                    </p>
                    <p className="flex items-center font-medium text-lg text-gray-500">
                      Notes :<span className="text-base font-normal">{data?.notes}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default profile;
