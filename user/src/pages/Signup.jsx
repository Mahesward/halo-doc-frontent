import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, } from "firebase/auth";
import { authConfig } from '../configs/firebase.config'
import { user_api } from "../configs/axios.config";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";


const Signup = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signInUser = async (type) => {
    try {

      dispatch(showLoading())

      const response = type === 'email'
        ? await createUserWithEmailAndPassword(authConfig, email, password)
        : await signInWithPopup(authConfig, new GoogleAuthProvider());

      userName && await updateProfile(authConfig.currentUser, {
        displayName: userName,
      });

      const idToken = await response.user.getIdToken();

      const data = {
        idToken
      }

      if (idToken) {

        try {
          const response = await user_api.post('/signup', data)
          console.log(response)
          if (response.data.success) {
            dispatch(hideLoading())
            toast.success(response.data.message)
            localStorage.setItem("token", response.data.token)
            navigate('/')
          }

        } catch (error) {
          dispatch(hideLoading())
          console.log(error)
        }
      }

    } catch (error) {
      console.log(error)
      dispatch(hideLoading())
      toast.error(error.code?.split('/')?.[1]?.split("-")?.join(" "));
    }
  }

  return (

    <div className="relative">
      <div className="flex items-center justify-center my-4">
        <div>
          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign Up</h2>
              <p className="mt-2 text-base text-gray-600">
                Already have an account?{" "}
                <Link to="/login"
                  title=""
                  className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                >
                  Login
                </Link>
              </p>

              <form action="#" method="POST" className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                      {" "}
                      Full Name{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="text"
                        placeholder="Enter You Full Name"
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="email"
                        placeholder="Enter Your Email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-2.5">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                        type="password"
                        placeholder="Enter Your Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                  </div>

                  <div>
                    <button
                      className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                      type="button"
                      onClick={() => signInUser('email')}
                    >
                      Sign Up
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
                </div>
              </form>

              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-400 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                  onClick={(e) => signInUser()}
                >
                  <div className="absolute inset-y-0 left-0 p-4">
                    <svg
                      className="w-6 h-6 text-rose-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                    </svg>
                  </div>
                  Sign up with Google
                </button>

                <p>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Read our <span className="capitalize text-indigo-600">privacy policy</span> and{" "}
                    <span className="capitalize text-indigo-600">terms of service</span> to learn more
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Signup;
