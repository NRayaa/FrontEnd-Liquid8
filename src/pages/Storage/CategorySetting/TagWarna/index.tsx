import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../../components';

const TagWarna = () => {
    const navigate = useNavigate();
    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/" current="Tag Warna" />
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Tag Warna</h5>
                <div className="mb-4 flex justify-between">
                    <div className="relative w-[220px]">
                        {/* <input
                            type="text"
                            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                        /> */}
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
                    {/* <button type="button" className="btn btn-primary uppercase px-6" onClick={() => navigate('/storage/categorysetting/tag_warna/add')}>
                        add data
                    </button> */}
                </div>
                <div className="datatables">
                    <table className="panel w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tag Warna
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Min Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fixed Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Max Price
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
                                    <div className="w-[19px] h-[21px] bg-[red]"></div>
                                </th>
                                <td className="px-6 py-4">Rp 0,-</td>
                                <td className="px-6 py-4">Rp 25.000,-</td>
                                <td className="px-6 py-4">Rp 50.000,-</td>
                                <td className="px-6 py-4 flex items-center space-x-2">
                                    <Link to="/storage/categorysetting/tag_warna/1">
                                        <button type="button" className="btn btn-outline-primary">
                                            Detail
                                        </button>
                                    </Link>
                                    {/* <button type="button" className="btn btn-outline-danger">
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">1</td>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="w-[19px] h-[21px] bg-[green]"></div>
                                </th>
                                <td className="px-6 py-4">Rp 0,-</td>
                                <td className="px-6 py-4">Rp 25.000,-</td>
                                <td className="px-6 py-4">Rp 50.000,-</td>
                                <td className="px-6 py-4 flex items-center space-x-2">
                                    <Link to="/storage/categorysetting/tag_warna/1">
                                        <button type="button" className="btn btn-outline-primary">
                                            Detail
                                        </button>
                                    </Link>
                                    {/* <button type="button" className="btn btn-outline-danger">
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TagWarna;
