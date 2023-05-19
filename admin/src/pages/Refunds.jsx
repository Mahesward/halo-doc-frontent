import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { backendApi } from '../config/axios.config';

function Refunds() {
  const [refunds, setRefunds] = useState([]);
  const [nextPage, setNextPage] = useState(true);

  useEffect(() => {
    const getRefunds = async () => {
      const response = await backendApi.get('/get-payment-refunds');
      setRefunds(response.data.refunds.data);
      setNextPage(response.data.refunds.has_more);
    };
    getRefunds();
  }, []);

  const handleNext = async () => {
    if (!nextPage) return;
    const response = await backendApi.get(
      `get-payment-refunds?page=next&lastRefundId=${refunds[refunds.length - 1].id}`,
    );
    setRefunds(response.data.refunds.data);
    setNextPage(response.data.refunds.has_more);
  };
  const handlePrev = async () => {
    const response = await backendApi.get(`get-payment-refunds?page=prev&firstRefundId=${refunds[0].id}`);
    setRefunds(response.data.refunds.data);
    setNextPage(response.data.refunds.has_more);
  };

  return (
    <div>
      <section className="container w-11/12 px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-800">Refunds</h2>
            <p className="mt-1 text-sm text-gray-700">You can view the Refunds Details Here.</p>
          </div>
          <Link
            to="/admin/payments"
            className="rounded-md border border-blue-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-blue-600 hover:bg-teal-200"
          >
            ALL PAYMENTS
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
                        <span>ID</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Amount
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                      >
                        Status
                      </th>

                      <th scope="col" className="relative py-3.5 px-4 text-blue-400">
                        <span className="sr-only ">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {refunds
                      && refunds.map((data) => (
                        <tr key={data.id}>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm  text-gray-900">{data.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-12 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              RS.
                              {data.amount / 100}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {data.status}
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
            onClick={handlePrev}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>previous</span>
          </button>
          <button
            type="button"
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100"
            onClick={handleNext}
          >
            <span>Next</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Refunds;
