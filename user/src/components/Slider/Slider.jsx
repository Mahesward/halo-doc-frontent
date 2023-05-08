import React from 'react';

function Slider() {
  return (
    <>
      <nav className="bg-white shadow-xl text-gray-600 h-16 border border-b border-gray-200 flex items-center px-8 justify-center">
        <ul className="flex space-x-16 ">
          <li>
            <a className="text-md hover:text-gray-700 font-semibold" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="text-md hover:text-gray-700 font-semibold" href="#">
              About
            </a>
          </li>
          <li>
            <a className="text-md hover:text-gray-700 font-semibold" href="#">
              Company
            </a>
          </li>
          <li>
            <a className="text-md hover:text-gray-700 font-semibold" href="#">
              Pricing
            </a>
          </li>
          <li>
            <a className="text-md hover:text-gray-700 font-semibold" href="#">
              Github
            </a>
          </li>
        </ul>
      </nav>

      <div className="relative isolate px-6 pt-14 lg:px-8 bg-white">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Lorem ipsum dolor sit amet consectetur dicta.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
              amet fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white">
                Buy Now
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:underline">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
