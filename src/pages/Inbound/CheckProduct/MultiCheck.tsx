// import React from 'react';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import IconSearch from '../../../components/Icon/IconSearch';
import { Link } from 'react-router-dom';

const items = [
    {
        thumb: 'profile-5.jpeg',
        name: 'Alan Green',
        email: 'alan@mail.com',
        status: 'Active',
        statusClass: 'badge badge-outline-primary',
    },
    {
        thumb: 'profile-11.jpeg',
        name: 'Linda Nelson',
        email: 'Linda@mail.com',
        status: 'Busy',
        statusClass: 'badge badge-outline-danger',
    },
    {
        thumb: 'profile-12.jpeg',
        name: 'Lila Perry',
        email: 'Lila@mail.com',
        status: 'Closed',
        statusClass: 'badge badge-outline-warning',
    },
    {
        thumb: 'profile-3.jpeg',
        name: 'Andy King',
        email: 'Andy@mail.com',
        status: 'Active',
        statusClass: 'badge badge-outline-primary',
    },
    {
        thumb: 'profile-15.jpeg',
        name: 'Jesse Cory',
        email: 'Jesse@mail.com',
        status: 'Busy',
        statusClass: 'badge badge-outline-danger',
    },
];

const MultiCheck = () => {
    const checkboxData = Array.from({ length: 18 }, (_, index) => index + 1);
    const [search, setSearch] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<any>(items);

    const [checkedItems, setCheckedItems] = useState(Array(checkboxData.length).fill(false));

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
    };

    const handleButtonClick = () => {
        // Tambahkan logika untuk aksi yang ingin dilakukan ketika tombol ditekan
        console.log('Button clicked!');
    };

    useEffect(() => {
        setFilteredItems(() => {
            return items.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search]);
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse mb-8">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Check Product</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Multi Check </span>
                </li>
            </ul>
            <div className="flex gap-4">
                <div className="panel xl:w-1/2 ss:w-full gap-4">
                    <form className="w-full mb-5 col-span-2 gap-4 flex items-center">
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={search}
                                placeholder="Search Attendees..."
                                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button type="button" className="btn btn-info absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center">
                                <IconSearch />
                            </button>
                        </div>
                        <div className="flex gap-4 items-center w-full">
                            <label htmlFor="gridKeterangan">Keterangan</label>
                            <input id="gridKeterangan" type="text" placeholder="Masukan Kenterangan" className="form-input w-full" />
                        </div>
                    </form>
                    <form className="space-y-5 col-span-2">
                        <div className="grid grid-cols-1 ss:grid-cols-1 sm:grid-cols-2 gap-4">
                            <h1 className="flex justify-center text-lg font-bold">OLD DATA</h1>
                            <h1 className="flex justify-center text-lg font-bold">NEW DATA</h1>
                            <div>
                                <label htmlFor="gridBarcode">Barcode</label>
                                <input id="gridBarcode" type="text" placeholder="Enter Barcode" className="form-input " />
                            </div>
                            <div>
                                <label htmlFor="gridBarcode">Barcode</label>
                                <input id="gridBarcode" type="text" placeholder="Enter Barcode" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridNama">Nama</label>
                                <input id="gridNama" type="text" placeholder="Enter Nama" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridNama">Nama</label>
                                <input id="gridNama" type="text" placeholder="Enter Nama" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridHarga">Harga</label>
                                <input id="gridHarga" type="number" placeholder="Enter Harga" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridHarga">Harga</label>
                                <input id="gridHarga" type="number" placeholder="Enter Harga" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridQTY">QTY</label>
                                <input id="gridQTY" type="text" placeholder="Enter QTY" className="form-input" />
                            </div>
                            <div>
                                <label htmlFor="gridQTY">QTY</label>
                                <input id="gridQTY" type="text" placeholder="Enter QTY" className="form-input" />
                            </div>
                            {/* <div>
                            <label className="flex items-center mt-1 cursor-pointer">
                                <input type="checkbox" className="form-checkbox" />
                                <span className="text-white-dark">Check me out</span>
                            </label>
                        </div> */}
                        </div>
                        <button type="submit" className="btn btn-warning !mt-6">
                            DONE CHECK ALL
                        </button>
                    </form>
                </div>
                <div className="panel xl:w-1/2 ss:w-full gap-4">
                    <div className="mb-5">
                        <Tab.Group>
                            <div className="mx-10 mb-5 sm:mb-0">
                                <Tab.List className="mt-3 mb-6 flex border-b border-white-light gap-4 dark:border-[#191e3a]">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            // <div className="flex-auto text-center !outline-none">
                                            <button
                                                className={`${
                                                    selected ? 'bg-info text-white !outline-none' : ''
                                                } -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                            >
                                                Lolos
                                            </button>
                                            // </div>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? 'bg-info text-white !outline-none' : ''
                                                } -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                            >
                                                Damaged
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? 'bg-info text-white !outline-none' : ''
                                                } -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                            >
                                                Abnormal
                                            </button>
                                        )}
                                    </Tab>
                                </Tab.List>
                            </div>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className="grid grid-cols-3 gap-4">
                                        {checkboxData.map((index) => (
                                            <label key={index} className="flex items-center mt-1 cursor-pointer">
                                                <input type="checkbox" className="form-checkbox outline-info w-6 h-6" checked={checkedItems[index]} onChange={() => handleCheckboxChange(index)} />
                                                <span className="text-white-dark"> Fashion, Electronik {index}</span>
                                            </label>
                                        ))}
                                        <button
                                            onClick={handleButtonClick}
                                            disabled={!checkedItems.some((item) => item)}
                                            className={`btn btn-info mt-4 col-span-3 ${checkedItems.some((item) => item) ? '' : 'opacity-50 pointer-events-none'}`}
                                        >
                                            SEND
                                        </button>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div>
                                        <div className="flex items-start pt-5">
                                            <div className="flex-auto">
                                                <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                                <textarea rows={4} className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"></textarea>
                                                <div className="flex justify-end">
                                                    <button type="submit" className="w-full btn btn-info mt-4">
                                                        SEND
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div>
                                        <div className="flex items-start pt-5">
                                            <div className="flex-auto">
                                                <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                                <textarea rows={4} className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"></textarea>
                                                <div className="flex justify-end">
                                                    <button type="submit" className="w-full btn btn-info mt-4">
                                                        SEND
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>Disabled</Tab.Panel>
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiCheck;
