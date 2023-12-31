import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useGetCategoriesQuery, useNewProductMutation } from '../../../store/services/categoriesApi';
import { generateRandomString } from '../../../helper/functions';

interface ProductCheck {
    oldData: {
        code_document: string;
        created_at: string;
        id: number;
        old_barcode_product: string;
        old_name_product: string;
        old_price_product: string;
        old_quantity_product: string;
        updated_at: string;
    };
    tagColor: {
        created_at: string;
        fixed_price_color: string;
        hexa_code_color: string;
        id: 2;
        max_price_color: string;
        min_price_color: string;
        name_color: string;
        updated_at: string;
    };
}

const ProductCheck: React.FC<ProductCheck> = ({ oldData, tagColor }) => {
    const { data, isSuccess, refetch } = useGetCategoriesQuery(undefined);
    const [newProduct, results] = useNewProductMutation();

    const [selectedOption, setSelectedOption] = useState<string>('');
    const [descriptionDamaged, setDescriptionDamaged] = useState<string>('');
    const [descriptionAbnormal, setDescriptionAbnormal] = useState<string>('');

    const productCheckData = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource;
        }
    }, [data]);

    const handleSendLolos = async () => {
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: generateRandomString(10),
                new_barcode_product: generateRandomString(10),
                new_name_product: generateRandomString(10),
                old_name_product: generateRandomString(10),
                new_quantity_product: 3,
                new_price_product: 100000,
                new_date_in_product: '2023-12-20',
                new_status_product: 'display',
                condition: 'lolos',
                new_category_product: selectedOption,
                new_tag_product: '',
                deskripsi: '',
            };
            await newProduct(body);
        } catch (err) {
            console.log(err);
        }
    };
    const handleDamaged = async () => {
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: generateRandomString(10),
                new_barcode_product: generateRandomString(10),
                new_name_product: generateRandomString(10),
                old_name_product: generateRandomString(10),
                new_quantity_product: 3,
                new_price_product: 100000,
                new_date_in_product: '2023-12-20',
                new_status_product: 'display',
                condition: 'damaged',
                new_category_product: '',
                new_tag_product: '',
                deskripsi: descriptionDamaged,
            };
            await newProduct(body);
        } catch (err) {
            console.log(err);
        }
    };
    const handleAbnormal = async () => {
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: oldData.old_barcode_product,
                new_barcode_product: generateRandomString(10),
                new_name_product: generateRandomString(10),
                old_name_product: generateRandomString(10),
                new_quantity_product: 3,
                new_price_product: 100000,
                new_date_in_product: '2023-12-20',
                new_status_product: 'display',
                condition: 'abnormal',
                new_category_product: '',
                new_tag_product: tagColor.name_color,
                deskripsi: descriptionAbnormal,
            };
            await newProduct(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <div className="xl:w-1/2 ss:w-full gap-4">
            <h1 className="text-lg font-bold my-4">PRODUK CHECK</h1>
            <div className="mb-5 panel">
                <Tab.Group>
                    <div className="mx-10 mb-5 sm:mb-0">
                        <Tab.List className="mt-3 mb-6 flex border-b border-white-light gap-4 dark:border-[#191e3a]">
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-info text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                    >
                                        Lolos
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-info text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
                                    >
                                        Damaged
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={`${selected ? 'bg-info text-white !outline-none' : ''} -mb-[1px] block rounded p-3.5 py-2 before:inline-block hover:bg-info hover:text-white w-full`}
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
                                {productCheckData?.length !== 0 &&
                                    productCheckData?.map((option) => (
                                        <label key={option.id} className="flex items-center mt-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                className="form-radio text-success peer w-6 h-6"
                                                name="radioOption"
                                                value={option.name_category}
                                                onChange={(e) => setSelectedOption(e.target.value)}
                                            />
                                            <span className="text-white-dark">{option.name_category}</span>
                                        </label>
                                    ))}

                                <button disabled={selectedOption.length === 0} className="btn btn-info mt-4 col-span-3" onClick={handleSendLolos}>
                                    SEND
                                </button>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div>
                                <div className="flex items-start pt-5">
                                    <div className="flex-auto">
                                        <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                        <textarea
                                            value={descriptionDamaged}
                                            onChange={(e) => setDescriptionDamaged(e.target.value)}
                                            rows={4}
                                            className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                        ></textarea>
                                        <div className="flex justify-end">
                                            <button disabled={descriptionDamaged.length === 0} type="submit" className="w-full btn btn-info mt-4" onClick={handleDamaged}>
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
                                        <textarea
                                            rows={4}
                                            value={descriptionAbnormal}
                                            onChange={(e) => setDescriptionAbnormal(e.target.value)}
                                            className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                        ></textarea>
                                        <div className="flex justify-end">
                                            <button disabled={descriptionAbnormal.length === 0} type="submit" className="w-full btn btn-info mt-4" onClick={handleAbnormal}>
                                                SEND
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default ProductCheck;
