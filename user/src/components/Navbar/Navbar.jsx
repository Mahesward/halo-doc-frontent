import React, { useState } from "react";
import { SIDEBAR } from '../'
export const Navbar = () => {

    const [sidebarActive, setSidebarActive] = useState(false)

    return (
        <div className="py-1">
            <nav className="relative px-4 py-2 flex justify-between items-center border-y border-gray-500">
                <div className="lg:hidden " onClick={() => setSidebarActive(true)}>
                    {sidebarActive && <SIDEBAR />}
                    <button className="navbar-burger flex items-center text-gray-600 p-3">
                        <svg
                            className="block h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Mobile menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                        </svg>
                    </button>
                </div>
                <a
                    className="text-3xl font-bold leading-none flex items-center space-x-4"
                    href="#"
                >
                    <span className="text-gray-600 text-xl">
                        HALO-DOC
                    </span>
                </a>
                <ul className="hidden lg:flex lg:items-center grow mx-10 space-x-6">
                    <li>
                        <a
                            className="text-base text-gray-700 hover:text-gray-800"
                            href="#"
                        >
                            Home
                        </a>
                    </li>
                    <li className="text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mt-1 -ml-4 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </li>
                    <li>
                        <a className="text-sm  text-indigo-600 font-bold" href="#">
                            About Us
                        </a>
                    </li>
                    <li>
                        <a
                            className="text-base text-gray-700 hover:text-gray-800"
                            href="#"
                        >
                            Services
                        </a>
                    </li>
                    <li className="text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 mt-1 -ml-4 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                        </svg>
                    </li>
                    <li>
                        <a
                            className="text-base text-gray-700 hover:text-gray-800"
                            href="#"
                        >
                            Pricing
                        </a>
                    </li>

                    <li>
                        <a
                            className="text-base text-gray-700 hover:text-gray-800"
                            href="#"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
                <div className="hidden lg:block">
                    <div className="flex items-center space-x-2">
                        <img
                            className="inline-block w-10 h-10 rounded-full"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                            alt="John Doe"
                        />
                        <span className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">
                                John Doe
                            </span>
                            <span className="text-sm font-medium text-gray-500 cursor-pointer">
                                View Profile
                            </span>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
