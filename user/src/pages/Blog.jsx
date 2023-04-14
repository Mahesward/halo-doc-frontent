import React, { useEffect, useState } from 'react';
import { commonApi } from '../configs/axios.config';
import { NAVBAR } from '../components';

function Blog() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const blogData = await commonApi.get('/blogs/get-all-blogs');

      setBlog(blogData.data.data);
    };

    getBlogs();
  }, []);

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
    </div>
  );
}

export default Blog;
