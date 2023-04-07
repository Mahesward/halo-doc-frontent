import React, { useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { backend_api } from '../config/axios.config'

const Users = () => {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const users = await backend_api.get('/users/get-all-users')
            setUserData(users.data.data)
        }
        getUsers()
    }, [])

    return (
        <>
            <section className="container w-11/12 px-4 mx-auto py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-800">
                          Users
                        </h2>
                        <p className="mt-1 text-sm text-gray-700">
                            This is a list of all Users. You can view users, block or unblock the users.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 ">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                                            >
                                                <span>Employee</span>
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">BLOCK</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {userData && userData.map((user) => (
                                            <tr key={user.name}>
                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={user.profileURL}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <a
                                                        href="#"
                                                        className="text-gray-500 hover:text-indigo-600"
                                                    >
                                                        Edit
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <a
                        href="#"
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>previous</span>
                    </a>

                    <div className="items-center hidden md:flex gap-x-3">
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-blue-500 rounded-md bg-blue-100/60"
                        >
                            1
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
                        >
                            2
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
                        >
                            3
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
                        >
                            ...
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
                        >
                            12
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
                        >
                            13
                        </a>
                        <a
                            href="#"
                            className="px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100"
                        >
                            14
                        </a>
                    </div>
                    <a
                        href="#"
                        className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
                    >
                        <span>Next</span>
                        <ArrowRightIcon className="w-4 h-4" />
                    </a>
                </div>
            </section>
        </>
    );
};

export default Users;
