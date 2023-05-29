import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { backend, commonApi } from '../configs/axios.config';

function Blog() {
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      let data = await commonApi.get('/blogs/get-all-blogs');
      data = data.data.data;
      console.log(data);
      setBlog(data.docs);

      setNextPage(data.hasNextPage);
      setPrevPage(data.hasPrevPage);
    };
    getBlogs();
  }, []);

  const deleteHandler = async (id) => {
    const res = await backend.delete(`/blogs/delete-blog/${id}`);

    if (res.data.success) {
      toast.success(res.data.message);
      window.location.reload();
    }
  };

  const handlePagination = async (type) => {
    try {
      if (!(type === 'next') && nextPage) return;
      if (!(type !== 'next') && prevPage) return;
      const page = type === 'next' ? currentPage + 1 : currentPage - 1;

      let data = await commonApi.get(`/blogs/get-all-blogs/?page=${page}`);
      data = data.data.data;
      setBlog(data.docs);

      setNextPage(data.hasNextPage);
      setPrevPage(data.hasPrevPage);
      setCurrentPage(data.page);
    } catch (error) {
      toast.error('someting went wrong');
    }
  };

  return (
    <section className="container w-11/12 px-4 mx-auto py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-800">BLOGS</h2>
          <p className="mt-1 text-sm text-gray-700">You can view and edit blogs here.</p>
        </div>
        <Link
          to="/doctor/blogs/add-blog"
          className="rounded-md border border-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-indigo-200"
        >
          Add Blog
        </Link>
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
                  {blog &&
                    blog.map((blogMap) => (
                      <tr key={blogMap.title}>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full object-cover" src={blogMap.imageURL} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{blogMap.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap float-left">
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">{blogMap.content.slice(0, 75)}......</div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <span className="inline-flex divide-x overflow-hidden rounded-md border bg-white shadow-sm">
                            <button
                              type="button"
                              className="inline-block p-3 text-blue-700 hover:bg-gray-50 focus:relative"
                              title="Edit Product"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>

                            <button
                              type="button"
                              className="inline-block p-3 text-red-700 hover:bg-gray-50 focus:relative"
                              title="Delete Product"
                              onClick={() => {
                                deleteHandler(blogMap._id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </span>
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
        <button
          type="button"
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
          onClick={() => handlePagination()}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>previous</span>
        </button>
        <button
          type="button"
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
          onClick={() => handlePagination('next')}
        >
          <span>Next</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

export default Blog;
