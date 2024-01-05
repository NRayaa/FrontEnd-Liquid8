import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useMemo } from 'react';
import { useState } from 'react';
import IconSearch from '../../../components/Icon/IconSearch';
import { Link, useLocation } from 'react-router-dom';
import { useLazyGetBarcodeQuery } from '../../../store/services/checkProduct';
import BarcodeData from './BarcodeData';
import TagColorData from './TagColorData';

const MultiCheck = () => {
    const { state } = useLocation();
    const [inputBarcode, setInputBarcode] = useState<string>('');

    const [getBarcode, results] = useLazyGetBarcodeQuery();

    const checkboxData2 = ['Option 1', 'Option 2', 'Option 3'];
    const [keterangan, setKeterangan] = useState<string>('');

    const handleInputBarcode = async () => {
        try {
            await getBarcode({ code_document: state?.codeDocument, old_barcode_product: inputBarcode });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            if (Array.isArray(results.data?.data.resource)) {
                setKeterangan('50K>');
            } else {
                setKeterangan('100K<');
            }
            setInputBarcode('');
        }
    }, [results]);

    const tagColor = useMemo(() => {
        if (results?.data?.data?.resource?.length > 0) {
            return results.data?.data.resource[1][0];
        }
    }, [results]);

    const oldData = useMemo(() => {
        if (Array.isArray(results.data?.data.resource)) {
            return results.data?.data.resource[0];
        } else {
            return results.data?.data.resource;
        }
    }, [results]);

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
                    <h1 className="text-lg font-bold my-4">CHECK : {state?.codeDocument}</h1>
                    <form className="w-full panel mb-5 col-span-2 gap-4 flex items-center">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search Attendees..."
                                onChange={(e) => setInputBarcode(e.target.value)}
                                value={inputBarcode}
                                className="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider ltr:pr-11 rtl:pl-11"
                            />
                            <button
                                onClick={handleInputBarcode}
                                type="button"
                                className="btn btn-info absolute ltr:right-1 rtl:left-1 inset-y-0 m-auto rounded-full w-9 h-9 p-0 flex items-center justify-center"
                            >
                                <IconSearch />
                            </button>
                        </div>
                        <div className="flex gap-4 items-center w-full">
                            <label htmlFor="gridKeterangan">Keterangan</label>
                            <input id="gridKeterangan" type="text" disabled className="form-input w-full" value={keterangan} />
                        </div>
                    </form>
                    <form className="space-y-5 col-span-2">
                        <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                            <BarcodeData barcode={oldData?.old_barcode_product} nama={oldData?.old_name_product} harga={oldData?.old_price_product} qty={oldData?.old_quantity_product} />
                            {!tagColor || tagColor === undefined ? (
                                <BarcodeData barcode={oldData?.old_barcode_product} nama={oldData?.old_name_product} harga={oldData?.old_price_product} qty={oldData?.old_quantity_product} />
                            ) : (
                                <TagColorData tag={tagColor.hexa_code_color} nama={tagColor.name_color} harga={tagColor.fixed_price_color} qty={oldData.old_quantity_product} />
                            )}
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
                                            <button
                                                className={`${
                                                    selected ? 'bg-info text-white !outline-none' : ''
                                                } -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                            >
                                                Lolos
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
                                        {checkboxData2.map((option, index) => (
                                            <label key={index} className="flex items-center mt-1 cursor-pointer">
                                                <input type="radio" className="form-radio text-success peer w-6 h-6" name="radioOption" value={option} />
                                                <span className="text-white-dark"> {option}</span>
                                            </label>
                                        ))}

                                        <button className="btn btn-info mt-4 col-span-3 opacity-50 pointer-events-none">SEND</button>
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
