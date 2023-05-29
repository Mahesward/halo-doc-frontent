import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { commonApi } from '../configs/axios.config';
import { NAVBAR } from '../components';

function Blog() {
  const [blog, setBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [prevPage, setPrevPage] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      let data = await commonApi.get('/blogs/get-all-blogs');
      data = data.data.data;
      setBlog(data.docs);

      setNextPage(data.hasNextPage);
      setPrevPage(data.hasPrevPage);
    };
    getBlogs();
  }, []);

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
    <div>
      <NAVBAR />

      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {blog.map((item) => (
          <div key={item._id} className="rounded-xl overflow-hidden border border-slate-300 shadow-xl">
            <img className="w-full h-56  object-cover" src={item.imageURL} alt="Mountain" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 dark:text-gray-300 text-base">{item.content.substring(0, 100)}</p>
            </div>
          </div>
        ))}
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
    </div>
  );
}

export default Blog;
