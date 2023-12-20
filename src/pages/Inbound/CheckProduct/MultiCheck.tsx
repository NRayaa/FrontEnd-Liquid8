// import React from 'react';
import { Tab } from '@headlessui/react';
import { Fragment, SetStateAction } from 'react';
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
    // const checkboxData = Array.from({ length: 18 }, (_, index) => index + 1);
    const [search, setSearch] = useState<string>('');
    const [filteredItems, setFilteredItems] = useState<any>(items);

    const radioData = Array.from({ length: 18 }, (_, index) => `Option ${index + 1}`);
    const checkboxData1 = Array.from({ length: 1 }, (_, index) => `Option ${index + 1}`);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    const checkboxData2 = ['Option 1', 'Option 2', 'Option 3'];

    const handleRadioChange = (option: SetStateAction<string | null>) => {
        if (typeof option === 'string') {
            setSelectedOption(option);
            setFormData({}); // Reset data ketika opsi berubah
        }
    };

    const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
        const { id, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleButtonClick = () => {
        // Lakukan sesuatu ketika tombol diklik
    };

    useEffect(() => {
        setFilteredItems(() => {
            return items.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search]);

    const renderForm = () => {
        if (selectedOption) {
            return (
                <form className="space-y-5 col-span-1">
                    <div>
                        <label htmlFor="gridNama">Discount</label>
                        <input id="gridNama" type="text" disabled placeholder="Enter Nama" className="form-input" />
                    </div>
                </form>
            );
        }
        return null;
    };
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
                <div className=" xl:w-1/2 ss:w-full gap-4">
                    <h1 className="text-lg font-bold my-4">CHECK : DOCUMENT 002/2023</h1>
                    <form className="w-full panel mb-5 col-span-2 gap-4 flex items-center">
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
                        <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4">
                                <h1 className="flex justify-center text-lg font-bold">OLD DATA</h1>
                                <div>
                                    <label htmlFor="gridBarcode1">Barcode</label>
                                    <input id="gridBarcode1" disabled type="text" placeholder="Enter Barcode" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridNama1">Nama</label>
                                    <input id="gridNama1" type="text" disabled placeholder="Enter Nama" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridNama3">Harga</label>
                                    <input id="gridNama3" type="text" placeholder="Enter Nama" className="form-input" value={formData.gridNama || ''} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="gridQTY1">QTY</label>
                                    <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h1 className="flex justify-center text-lg font-bold">NEW DATA</h1>
                                <div>
                                    <label htmlFor="gridBarcode2">Barcode</label>
                                    <input id="gridBarcode2" disabled type="text" placeholder="Enter Barcode" className="form-input" />
                                </div>
                                <div hidden>
                                    <label htmlFor="gridBarcode2">Tag</label>
                                    <input id="gridBarcode2" disabled type="text" placeholder="Enter Barcode" className="form-input" />
                                </div>
                                <div>
                                    <label htmlFor="gridNama2">Nama</label>
                                    <input id="gridNama2" type="text" disabled placeholder="Enter Nama" className="form-input" />
                                </div>
                                {renderForm()}
                                <div>
                                    <label htmlFor="gridNama4">Harga</label>
                                    <input id="gridNama4" type="text" placeholder="Enter Nama" className="form-input" value={formData.gridNama || ''} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label htmlFor="gridQTY2">QTY</label>
                                    <input id="gridQTY2" disabled type="text" placeholder="Enter QTY" className="form-input" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-warning !mt-6">
                            DONE CHECK ALL
                        </button>
                    </form>
                </div>
                <div></div>
                <div className="xl:w-1/2 ss:w-full gap-4">
                    <h1 className="text-lg font-bold my-4">PRODUK CHECK</h1>
                    <div className="mb-5 panel">
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
                                    {/* <div className="grid grid-cols-3 gap-4">
                                        {radioData.map((option, index) => (
                                            <label key={index} className="flex items-center mt-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-info peer w-6 h-6"
                                                    name="radioOption"
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={() => handleRadioChange(option)}
                                                />
                                                <span className="text-white-dark"> {option}</span>
                                            </label>
                                        ))}
                                        <button
                                            onClick={handleButtonClick}
                                            disabled={!selectedOption}
                                            className={`btn btn-info mt-4 col-span-3 ${selectedOption ? '' : 'opacity-50 pointer-events-none'}`}
                                        >
                                            SEND
                                        </button>
                                    </div> */}
                                    {/* <div className="grid grid-cols-3 gap-4">
                                        {checkboxData1.map((option, index) => (
                                            <label key={index} className="flex items-center mt-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-danger peer w-6 h-6"
                                                    name="radioOption"
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={() => handleRadioChange(option)}
                                                />
                                                <span className="text-white-dark"> {option}</span>
                                            </label>
                                        ))}
                                        <button
                                            onClick={handleButtonClick}
                                            disabled={!selectedOption}
                                            className={`btn btn-info mt-4 col-span-3 ${selectedOption ? '' : 'opacity-50 pointer-events-none'}`}
                                        >
                                            SEND
                                        </button>
                                    </div> */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {checkboxData2.map((option, index) => (
                                            <label key={index} className="flex items-center mt-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-success peer w-6 h-6"
                                                    name="radioOption"
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={() => handleRadioChange(option)}
                                                />
                                                <span className="text-white-dark"> {option}</span>
                                            </label>
                                        ))}

                                        <button
                                            onClick={handleButtonClick}
                                            disabled={!selectedOption}
                                            className={`btn btn-info mt-4 col-span-3 ${selectedOption ? '' : 'opacity-50 pointer-events-none'}`}
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
