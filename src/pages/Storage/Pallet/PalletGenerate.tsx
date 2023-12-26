import React from 'react';
import { BreadCrumbs } from '../../../components';
import { Link } from 'react-router-dom';

const PalletGenerate = () => {
    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/storage/product" current="Add Category" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Pallet Generate</h5>
                <form className="w-[400px]">
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode Pallet :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Pallet :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Minimum Price :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            SubKategori :
                        </label>
                        <input id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4 px-16 uppercase">
                        generate
                    </button>
                </form>
            </div>
            <div className="datatables mt-8">
                <table className="panel w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
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
                                Kategori
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Harga
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
                                PLTFSH0001
                            </th>
                            <td className="px-6 py-4">Pallet Fashion</td>
                            <td className="px-6 py-4">Fashion</td>
                            <td className="px-6 py-4">Rp 5.000.000,-</td>
                            <td className="px-6 py-4">
                                <button disabled type="button" className="rounded-xl btn-sm px-4 bg-[#2EFF43] uppercase text-white">
                                    Display
                                </button>
                            </td>
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
        </>
    );
};

export default PalletGenerate;
