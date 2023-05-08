import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { backendApi, cloudinaryUpload } from '../config/axios.config';

function addBlog() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const addBlogHandler = async (e) => {
    e.preventDefault();

    try {
      if (image.size > 1000000) {
        toast.error('File size is 1mb');
        return;
      }

      const file = new FormData();
      file.append('file', image);

      file.append('upload_preset', 'halo-doc-blog');
      file.append('cloud_name', 'halo-doc');
      file.append('api_key', import.meta.env.CLOUDINARY_API_KEY);

      const imageUpload = await cloudinaryUpload.post('/upload', file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = {
        title,
        content,
        imageURL: imageUpload.data.secure_url,
      };

      if (data.imageURL) {
        const res = await backendApi.post('/blogs/add-blog', data);

        if (res.data.success) {
          toast.success(res.data.message);
          navigate('/admin/blogs');
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error('something went wrong');
    }
  };

  return (
    <div>
      <section className="bg-white ">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">ADD BLOG</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">
            You Can Add New Medical Blogs Here and Health Suggestions Here.
          </p>

          <form action="#" className="space-y-8">
            <div>
              <input
                type="text"
                id="title"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <input
                type="file"
                id="image"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Let us know how we can help you"
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="sm:col-span-2">
              <textarea
                id="content"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Blog Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
                Enter Blog Contents Here
              </textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-slate-100 rounded-lg bg-blue-500 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
              onClick={(e) => addBlogHandler(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default addBlog;
