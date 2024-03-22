import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { Link, useNavigate } from 'react-router-dom';
import ManualProductCheck from './ManualProductCheck';
import { useCheckPriceMutation } from '../../../store/services/checkProduct';
import toast from 'react-hot-toast';

const CreateManualInbound = () => {
    const [checkPrice, results] = useCheckPriceMutation();
    const [barcode, setBarcode] = useState('');
    const [isProductCheck, setIsProductCheck] = useState<boolean>(false);

    const handleGenerateBarcode = () => {
        const randomBarcode = generateBarcode();
        setBarcode(randomBarcode);
    };

    const generateBarcode = () => {
        const prefix = 'LQD';
        const numbers = '0123456789';
        const length = 5;
        let randomNumber = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * numbers.length);
            randomNumber += numbers[randomIndex];
        }

        return prefix + randomNumber;
    };

    const [input, setInput] = useState({
        new_price_product: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleCheckPrice = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                new_price_product: input.new_price_product,
            };
            await checkPrice(body);
        } catch (err) {}
    };

    useEffect(() => {
        handleGenerateBarcode();
    }, []);

    useEffect(() => {
        if (results.isSuccess && results.data.data.status) {
            toast.success(results?.data?.data?.message ?? '');
            setIsProductCheck(true);
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
    }, [results]);

    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Manual Inbound</span>
                </li>
            </ul>

            <div className="flex gap-4">
                <div className=" xl:w-1/2 ss:w-full gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-bold my-4">ADD DATA NEW</h1>
                        <Link to="">
                            <button type="button" className=" px-2 btn btn-primary" onClick={handleCheckPrice}>
                                Next
                            </button>
                        </Link>
                    </div>
                    <div className="space-y-5 col-span-2 panel">
                        <form className="w-[400px]" onSubmit={handleCheckPrice}>
                            <div className="flex items-center  justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Barcode:
                                </label>
                                <input id="barcode" type="text" className="form-input w-[250px]" disabled name="barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                            </div>
                            <div className="flex items-center  justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Nama Barang:
                                </label>
                                <input id="categoryName" type="text" className="form-input w-[250px]" name="name" />
                            </div>
                            <div className="flex items-center  justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Harga Barang:
                                </label>
                                <input id="categoryName" type="text" className="form-input w-[250px]" name="new_price_product" onChange={handleInputChange} value={input.new_price_product} />
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                                    Kategori Barang :
                                </label>
                                <input id="username" type="text" className="form-input w-[250px]" name="username" />
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                                    QTY Barang :
                                </label>
                                <input id="email" type="text" className="form-input w-[250px]" name="email" />
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                                    Warna :
                                </label>
                                <input id="email" type="text" disabled className="form-input w-[250px]" name="email" />
                            </div>
                        </form>
                    </div>
                </div>
                {isProductCheck && (
                    <ManualProductCheck
                        oldData={{
                            code_document: '',
                            created_at: '',
                            id: 0,
                            old_barcode_product: '',
                            old_name_product: '',
                            old_price_product: '',
                            old_quantity_product: '',
                            updated_at: '',
                        }}
                        tagColor={{
                            created_at: '',
                            fixed_price_color: '',
                            hexa_code_color: '',
                            id: 2,
                            max_price_color: '',
                            min_price_color: '',
                            name_color: '',
                            updated_at: '',
                        }}
                        resetValueMultiCheck={() => {}}
                        resetProductCheckShow={() => {}}
                        countPercentage={(percentage: string) => {}}
                        newPricePercentage=""
                        showBarcode={() => {}}
                        hideBarcode={() => {}}
                        handleSetNewPriceProduct={(newPrice: string) => {}}
                        customQuantity=""
                        codeBarcode=""
                        isQuantity={false}
                        getSelectedCategory={(selected: string) => {}}
                    />
                )}
            </div>
        </>
    );
};

export default CreateManualInbound;
