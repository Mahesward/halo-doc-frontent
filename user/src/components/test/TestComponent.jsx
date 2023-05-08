import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import {
  ArrowRightIcon,
  Bars3Icon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  FaceSmileIcon,
  HeartIcon,
  LinkIcon,
  PresentationChartLineIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';

function TestComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="bg-white">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline ">
                <span className="-mt-0.5">DevUI</span>
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-24">
          <p className="text-6xl font-medium leading-tight text-gray-900">
            We design digital experiences that create more happy in the world
          </p>
          <p className="mt-6 text-xl leading-loose text-gray-600 lg:w-2/3">
            — We’re a full-service design and development agency who specialise in simple, useful and beautiful
            solutions.
          </p>
          <div className="my-8 flex space-x-4">
            <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500">
              Get in touch
            </button>
          </div>
          <img
            className="aspect-video w-full"
            src="https://images.unsplash.com/photo-1560131914-2e469a0e8607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="my-12 flex flex-col items-center justify-center space-y-8">
            <p className="text-center text-base font-medium leading-normal text-gray-600">
              We’ve worked with some great company
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              {[
                { brand: 'airbnb', img: 'https://asset.brandfetch.io/idkuvXnjOH/idrPv8mgc4.svg' },
                { brand: 'trivago', img: 'https://asset.brandfetch.io/idJz0pR4Gq/idKmu0FPFx.svg' },
                {
                  brand: 'booking.com',
                  img: 'https://asset.brandfetch.io/id9mEmLNcV/idtpV9y0Bb.svg',
                },
                {
                  brand: 'spotify',
                  img: 'https://asset.brandfetch.io/id20mQyGeY/idCv-OrMiy.svg',
                },
                {
                  brand: 'landrover',
                  img: 'https://asset.brandfetch.io/idUgecPh1C/id5iVQvfy_.png',
                },
              ].map((e) => (
                <img src={e.img} alt={e.brand} key={e.brand} className="h-8" />
              ))}
            </div>
          </div>
          {/* testimonials */}
          <div className="flex flex-col items-center justify-center border-y border-gray-300 py-10">
            <img
              src="https://asset.brandfetch.io/id9mEmLNcV/idtpV9y0Bb.svg"
              alt="booking.com"
              className="my-12 h-8"
            />
            <p className="text-center text-5xl font-medium leading-tight text-gray-900">
              We&apos;ll no doubt be working with DevUI on future projects. Finding the right agency to work with
              is a daunting task, but we absolutely found the right team and haven’t looked back.
            </p>
            <div className="my-8 flex flex-col items-center justify-center space-y-1">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt=""
                className="h-16 w-16 rounded-full"
              />
              <div className="text-center text-lg font-semibold leading-7 text-gray-900">John Smith</div>
              <div className="text-center text-base leading-normal text-gray-600">
                Product Manager, booking.com
              </div>
            </div>
          </div>
          {/*  spec */}
          <div className=" border-b border-b-gray-300 py-10">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-center text-base font-semibold leading-normal text-purple-700">
                Our capabilities
              </p>
              <p className="text-center text-4xl font-semibold leading-10 text-gray-900">
                We’re here every step of the way
              </p>
              <p className="w-3/4 text-center text-xl leading-loose text-gray-600">
                We pride ourselves on our ability to challenge core assumptions, unpick legacy behaviors,
                streamline complex processes, and strike a balance between great design and functional development.
              </p>
            </div>
            {/* features */}
            {features.map((item, index) => (
              <div key={`feature-group-${index}`} className="my-16 grid px-8 md:grid-cols-3 md:space-x-8">
                {item.map((feature) => (
                  <div key={feature.title} className="mb-8 space-y-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-8 border-purple-50 bg-purple-100 p-3">
                      {feature.image}
                    </div>
                    <div className="flex w-full flex-col space-y-2">
                      <p className="w-full text-xl font-semibold text-gray-900">{feature.title}</p>
                      <p className="w-full text-base leading-normal text-gray-600">{feature.description}</p>
                    </div>

                    <a href={feature.href} className="flex items-center space-x-2">
                      <p className="text-base font-semibold leading-normal text-purple-700">Learn more</p>
                      <ArrowRightIcon className="h-4 w-4 rounded-lg stroke-2 text-purple-700" />
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* newsletter */}

          <div className="container mx-auto py-10 px-10 lg:px-0">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full md:w-2/3 lg:w-1/2">
                <h2 className="text-3xl font-bold text-black dark:text-white">
                  Sign up for our weekly newsletter
                </h2>
                <p className="mt-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere
                  et sit amet ligula.
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-400">
                    Trusted by over 100,000+ businesses and individuals
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 inline-block">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                        4.8/5 . 3420 Reviews
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-10 w-full md:w-2/3 lg:mt-0 lg:w-1/2">
                <form className="flex lg:justify-center">
                  <div className="flex w-full max-w-md flex-col space-y-4">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="email"
                      placeholder="Email"
                    />
                    <button className="inline-flex h-10 w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:ring-offset-1 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:hover:text-gray-100 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900">
                      Subscribe
                    </button>
                  </div>
                </form>
                <p className="mt-2 lg:text-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    By signing up, you agree to our terms of service and privacy policy.
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
        {/* footer */}
        <footer className="container mx-auto py-10 px-10 md:px-0">
          <div className="flex flex-col md:flex-row md:items-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4F46E5" className="h-10 w-10">
                <path
                  fillRule="evenodd"
                  d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                  clipRule="evenodd"
                />
                <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
              </svg>
            </div>
            <div className="mt-4 grow md:mt-0 md:ml-12">
              <p className="text-base font-semibold text-gray-500 dark:text-gray-300">
                © 2023 DevUI Component Library
              </p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">Company</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>About us</li>
                <li>Company History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
                <li>Press Release</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">Our Stores</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>Washington</li>
                <li>New Hampshire</li>
                <li>Maine</li>
                <li>Texas</li>
                <li>Indiana</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">Services</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>UI / UX Design</li>
                <li>App Development</li>
                <li>API reference</li>
                <li>API status</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">Legal</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Disclaimer</li>
                <li>Media Policy</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-gray-700 dark:text-gray-100">Social Links</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-gray-500 dark:text-gray-400">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
                <li>Linkedin</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default TestComponent;

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

const features = [
  [
    {
      title: 'Share team inboxes',
      description:
        'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
      image: <ChatBubbleLeftRightIcon className="h-full flex-1 rounded-lg stroke-2 text-indigo-600" />,
      href: '#',
    },
    {
      title: 'Deliver instant answers',
      description:
        'An all-in-one customer service platform that helps you balance everything your customers need to be happy.',
      image: <BoltIcon className="h-full flex-1 rounded-lg stroke-2 text-indigo-600" />,
      href: '#',
    },
    {
      title: 'Manage your team with reports',
      description:
        'Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.',
      image: <PresentationChartLineIcon className="h-full flex-1 rounded-lg stroke-2 text-indigo-600" />,
      href: '#',
    },
    //
  ],
  [
    {
      title: 'Connect with customers',
      description:
        'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.',
      image: <FaceSmileIcon className="h-full flex-1 rounded-lg stroke-2 text-indigo-600" />,
      href: '#',
    },
    {
      title: 'Connect the tools you already use',
      description:
        'Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.',
      image: <LinkIcon className="h-full flex-1 rounded-lg stroke-2 text-indigo-600" />,
      href: '#',
    },
    {
      title: 'Our people make the difference',
      description:
        "We're an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.",
      image: <HeartIcon className="h-full flex-1 rounded-lg stroke-2 text-indigo-600" />,
      href: '#',
    },
  ],
];
