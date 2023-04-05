import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Nabar() {

    const navigate = useNavigate()
    const [token, setToken] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        setToken(true)
    }, [])


    return (
        <div>
            <header aria-label="Site Header" className="bg-white">
                <div className="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <a className="block text-teal-600 lg:text-3xl sm:text-2xl font font-medium mr-5" href="/">
                                HALO-DOC
                            </a>
                        </div>

                        <div className="hidden md:block">
                            <nav aria-label="Site Nav">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="/"
                                        >
                                            Dashboard
                                        </a>
                                    </li>

                                    <li>
                                        <Link to="/admin/doctors" className="text-gray-500 transition hover:text-gray-500/75">
                                            Doctors
                                        </Link>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="/"
                                        >
                                            History
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="/"
                                        >
                                            Services
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="/"
                                        >
                                            Projects
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className="text-gray-500 transition hover:text-gray-500/75"
                                            href="/"
                                        >
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className=" flex items-center gap-4">
                            {token ? '' :
                                <div className="sm:flex sm:gap-4">
                                    <a
                                        className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                        href="/admin/login"
                                    >
                                        Login
                                    </a>
                                </div>

                            }
                            <div className="block md:hidden">
                                <button
                                    className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Nabar

/*****
 * 
 * 
 * 
 * 
 * 
 <!-- ====== Navbar Section Start -->
<header
  x-data="
        {
          navbarOpen: false
        }
      "
  class="flex w-full items-center bg-white"
>
  <div class="container mx-auto">
    <div class="relative -mx-4 flex items-center justify-between">
      <div class="w-60 max-w-full px-4">
        <a href="javascript:void(0)" class="block w-full py-5">
          <img
            src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo.svg"
            alt="logo"
            class="w-full"
          />
        </a>
      </div>
      <div class="flex w-full items-center justify-between px-4">
        <div>
          <button
            @click="navbarOpen = !navbarOpen"
            :class="navbarOpen && 'navbarTogglerActive' "
            id="navbarToggler"
            class="ring-primary absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
          >
            <span
              class="bg-body-color relative my-[6px] block h-[2px] w-[30px]"
            ></span>
            <span
              class="bg-body-color relative my-[6px] block h-[2px] w-[30px]"
            ></span>
            <span
              class="bg-body-color relative my-[6px] block h-[2px] w-[30px]"
            ></span>
          </button>
          <nav
            :class="!navbarOpen && 'hidden' "
            id="navbarCollapse"
            class="absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 px-6 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none"
          >
            <ul class="block lg:flex">
              <li>
                <a
                  href="javascript:void(0)"
                  class="text-dark hover:text-primary flex py-2 text-base font-medium lg:ml-12 lg:inline-flex"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="text-dark hover:text-primary flex py-2 text-base font-medium lg:ml-12 lg:inline-flex"
                >
                  Payment
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  class="text-dark hover:text-primary flex py-2 text-base font-medium lg:ml-12 lg:inline-flex"
                >
                  Features
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="hidden justify-end pr-16 sm:flex lg:pr-0">
          <a
            href="javascript:void(0)"
            class="text-dark hover:text-primary py-3 px-7 text-base font-medium"
          >
            Login
          </a>
          <a
            href="javascript:void(0)"
            class="bg-primary rounded-lg py-3 px-7 text-base font-medium text-white hover:bg-opacity-90"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  </div>
</header>
<!-- ====== Navbar Section End -->
 * */ 