import React from 'react';
import { Link } from 'react-router-dom';

const CheckHistory = () => {
    return (
        <div className="panel mt-6 min-h-[450px]">
            <h5 className="font-semibold text-lg dark:text-white-light mb-5">Riwayat Check</h5>
            <div className="datatables">
                <table className="panel w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Data
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Data
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total Masuk
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4">1</td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                DOCUMENT 001/2023
                            </th>
                            <td className="px-6 py-4">Senin, 11-12-2023</td>
                            <td className="px-6 py-4">700</td>
                            <td className="px-6 py-4">695</td>
                            <td className="px-6 py-4">
                                <button type="button" className="rounded-xl btn-sm px-4 bg-[#2EFF43] uppercase text-white">
                                    Done
                                </button>
                            </td>
                            <td className="px-6 py-4 flex items-center space-x-2">
                                <Link to="/inbound/check_history/1">
                                    <button type="button" className="btn btn-outline-primary">
                                        Detail
                                    </button>
                                </Link>
                                <button type="button" className="btn btn-outline-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CheckHistory;
