import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';

const PalletManual = () => {
    const navigate = useNavigate();
    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/" current="SubKategori" />
            <div className="panel mt-6 min-h-[450px] pr-12">
                <div className="mb-8">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-2">Pallet</h5>
                    <div className="relative w-[220px]">
                        <input
                            type="text"
                            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                        />
                        <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                            <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-3 space-x-6 items-end">
                    <div className="datatables col-span-2">
                        <table className="panel text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Barcode LQD Pallet
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama Pallet
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Kategori
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Harga
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Barang
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
                                        PLTFSH0001
                                    </th>
                                    <td className="px-6 py-4">Pallet Fashion</td>
                                    <td className="px-6 py-4">Fashion</td>
                                    <td className="px-6 py-4">Rp 5.000.000,-</td>
                                    <td className="px-6 py-4">17</td>
                                    <td className="px-6 py-4 flex items-center space-x-2">
                                        <Link to="/storage/categorysetting/1">
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
                    <div className="datatables">
                        <div className="flex items-center justify-between">
                            <p>Total : Rp 3.200.000,-</p>
                            <p>Total Barang : 17</p>
                            <div className="mb-4 flex justify-between">
                                <button type="button" className="btn-sm btn-primary-dark uppercase px-6 rounded-md" onClick={() => navigate('/storage/pallet/create_pallet')}>
                                    Create Pallet
                                </button>
                            </div>
                        </div>
                        <table className="panel text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Barcode LQD
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nama Produk
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
                                        PLTFSH0001
                                    </th>
                                    <td className="px-6 py-4">17</td>
                                    <td className="px-6 py-4 flex items-center space-x-2">
                                        <button type="button" className="btn btn-outline-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PalletManual;
