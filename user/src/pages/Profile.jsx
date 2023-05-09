import React from 'react';

function profile() {
  return (
    <div className="flex h-screen items-center">
      <div className="">
        <div className="lg:w-1/4 md:w-1/3 md:px-3">
          <div className="relative md:-mt-48 -mt-32">
            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
              <div className="profile-pic text-center mb-5">
                <input
                  id="pro-img"
                  name="profile-image"
                  type="file"
                  className="hidden"
                  onChange="loadFile(event)"
                />
                <div>
                  <div className="relative h-28 w-28 mx-auto">
                    <img
                      src="https://shreethemes.in/techwind/layouts/assets/images/client/05.jpg"
                      className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                      id="profile-image"
                      alt=""
                    />
                    <p className="absolute inset-0 cursor-pointer" htmlFor="pro-img" />
                  </div>

                  <div className="mt-4">
                    <h5 className="text-lg font-semibold">Jenny Jimenez</h5>
                    <p className="text-slate-400">jennyhot@hotmail.com</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-700">
                <ul className="list-none sidebar-nav mb-0 mt-3" id="navmenu-nav">
                  <li className="navbar-item account-menu active">
                    <a
                      href="user-profile.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-dashboard" />
                      </span>
                      <h6 className="mb-0 font-semibold">Profile</h6>
                    </a>
                  </li>

                  <li className="navbar-item account-menu">
                    <a
                      href="user-billing.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-diary-alt" />
                      </span>
                      <h6 className="mb-0 font-semibold">Billing Info</h6>
                    </a>
                  </li>

                  <li className="navbar-item account-menu">
                    <a
                      href="user-payment.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-credit-card" />
                      </span>
                      <h6 className="mb-0 font-semibold">Payment</h6>
                    </a>
                  </li>

                  <li className="navbar-item account-menu">
                    <a
                      href="user-invoice.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-receipt" />
                      </span>
                      <h6 className="mb-0 font-semibold">Invoice</h6>
                    </a>
                  </li>

                  <li className="navbar-item account-menu">
                    <a
                      href="user-social.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-process" />
                      </span>
                      <h6 className="mb-0 font-semibold">Social Profile</h6>
                    </a>
                  </li>

                  <li className="navbar-item account-menu">
                    <a
                      href="user-notification.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-bell" />
                      </span>
                      <h6 className="mb-0 font-semibold">Notifications</h6>
                    </a>
                  </li>

                  <li className="navbar-item account-menu">
                    <a
                      href="user-setting.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-setting" />
                      </span>
                      <h6 className="mb-0 font-semibold">Settings</h6>
                    </a>
                  </li>

                  <li className="navbar-item account-menu">
                    <a
                      href="auth-lock-screen.html"
                      className="navbar-link text-slate-400 flex items-center py-2 rounded"
                    >
                      <span className="mr-2 text-[18px] mb-0">
                        <i className="uil uil-power" />
                      </span>
                      <h6 className="mb-0 font-semibold">Sign Out</h6>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default profile;
