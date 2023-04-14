import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [passwordFailed, setPasswordFailed] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    axios.post(`${import.meta.env.VITE_ADMIN_API_URL}/login`, user).then((response) => {
      if (!(email && password)) toast.error('please enter email and password');
      else {
        if (response.data.error === 'email') setEmailFailed(true);
        if (response.data.error === 'password') setPasswordFailed(true);

        if (response.data.success) {
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
          navigate('/admin');
        } else {
          toast.error(response.data.message);
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs mx-auto mb-12">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginHandler}>
          <h1 className="text-xl text-center font-bold mb-10">ADMIN LOGIN</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
              <input
                className={`shadow appearance-none border ${
                  emailFailed && 'border-red-500'
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="Email"
                type="email"
                placeholder="johndoe@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmailFailed(false);
                  setEmail(e.target.value);
                }}
              />
            </label>
            {emailFailed && <p className="text-red-500 mt-2  text-xs italic">Please enter a valid password.</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
              <input
                className={`shadow appearance-none border ${
                  passwordFailed && 'border-red-500'
                } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordFailed(false);
                }}
              />
            </label>
            {passwordFailed && <p className="text-red-500 text-xs italic">Please enter a valid password.</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;2023 HALO-DOC. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
