import React, { Dispatch, FormEvent, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Tab } from '@headlessui/react';
import Barcode from 'react-barcode';

import { useDoubleBarcodeMutation, useGetCategoriesQuery, useNewProductMutation } from '../../../store/services/categoriesApi';
import { formatRupiah, formatYearToDay, generateRandomBarcode, generateRandomString } from '../../../helper/functions';
import BarcodePrinted from './BarcodePrinted';
import toast from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Swal from 'sweetalert2';
import { NewProduct, ProdcutItem } from '../../../store/services/types';

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
    resetValueMultiCheck: () => void;
    resetProductCheckShow: () => void;
    countPercentage: (percentage: string) => void;
    newPricePercentage: string;
    showBarcode: () => void;
    hideBarcode: () => void;
    handleSetNewPriceProduct: (newPrice: string) => void;
    customQuantity: string;
    isQuantity: boolean;
    getSelectedCategory: (selected: string) => void;
    setCodeBarcode: Dispatch<SetStateAction<string>>;
}

const ProductCheck: React.FC<ProductCheck> = ({
    oldData,
    tagColor,
    resetValueMultiCheck,
    resetProductCheckShow,
    countPercentage,
    newPricePercentage,
    showBarcode,
    hideBarcode,
    handleSetNewPriceProduct,
    customQuantity,
    isQuantity,
    getSelectedCategory,
    setCodeBarcode,
}) => {
    const { data, isSuccess, refetch } = useGetCategoriesQuery('');
    const [newProduct, results] = useNewProductMutation();
    const [approveDouble] = useDoubleBarcodeMutation();

    const [selectedOption, setSelectedOption] = useState<string>('');
    const [descriptionDamaged, setDescriptionDamaged] = useState<string>('');
    const [descriptionAbnormal, setDescriptionAbnormal] = useState<string>('');
    const [barcodeStatus, setBarcodeStatus] = useState<'lolos' | 'abnormal' | 'damaged'>('lolos');
    const [dataSecond, setDataSecond] = useState<NewProduct | any>();
    const [isSending, setIsSending] = useState<boolean>(false);
    // hideBarcode();

    const productCheckData = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource;
        }
    }, [data]);

    const newPrice = useMemo(() => {
        if (tagColor) {
            return tagColor.fixed_price_color;
        } else {
            return newPricePercentage;
        }
    }, [tagColor, newPricePercentage]);

    const newDateProduct = useMemo(() => {
        if (!tagColor) {
            return formatYearToDay(oldData.created_at);
        } else {
            return formatYearToDay(tagColor.created_at);
        }
    }, [tagColor]);

    const productQuantity = useMemo(() => {
        if (isQuantity) {
            return customQuantity;
        } else {
            return oldData.old_quantity_product;
        }
    }, [isQuantity]);

    const handleSendLolos = async (e: FormEvent) => {
        e.preventDefault();

        setIsSending(true);
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: oldData.old_barcode_product,
                new_barcode_product: '',
                new_name_product: oldData.old_name_product,
                old_name_product: oldData.old_name_product,
                new_quantity_product: productQuantity,
                new_price_product: newPrice,
                old_price_product: oldData.old_price_product,
                new_date_in_product: newDateProduct,
                new_status_product: 'display',
                condition: 'lolos',
                new_category_product: selectedOption,
                new_tag_product: tagColor?.name_color ?? '',
                deskripsi: '',
            };
            setBarcodeStatus('lolos');
            handleSetNewPriceProduct(formatRupiah(newPrice));
            await newProduct(body);
            setTimeout(() => setIsSending(false), 3000);
        } catch (err) {
            console.log(err);
            setIsSending(false);
        }
    };

    const handleDamaged = async (e: FormEvent) => {
        e.preventDefault();

        setIsSending(true);
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: oldData.old_barcode_product,
                new_barcode_product: '',
                new_name_product: oldData.old_name_product,
                old_name_product: oldData.old_name_product,
                new_quantity_product: productQuantity,
                new_price_product: newPrice,
                old_price_product: oldData.old_price_product,
                new_date_in_product: newDateProduct,
                new_status_product: 'display',
                condition: 'damaged',
                new_category_product: '',
                new_tag_product: tagColor?.name_color ?? '',
                deskripsi: descriptionDamaged,
            };
            setBarcodeStatus('damaged');
            handleSetNewPriceProduct(formatRupiah(newPrice));
            await newProduct(body);
            // resetProductCheckShow();
            // hideBarcode();
            setTimeout(() => setIsSending(false), 3000);
        } catch (err) {
            console.log(err);
            setIsSending(false);
        }
    };

    const handleAbnormal = async (e: FormEvent) => {
        e.preventDefault();

        setIsSending(true);
        try {
            const body = {
                code_document: oldData.code_document,
                old_barcode_product: oldData.old_barcode_product,
                new_barcode_product: '',
                new_name_product: oldData.old_name_product,
                old_name_product: oldData.old_name_product,
                new_quantity_product: productQuantity,
                new_price_product: newPrice,
                old_price_product: oldData.old_price_product,
                new_date_in_product: newDateProduct,
                new_status_product: 'display',
                condition: 'abnormal',
                new_category_product: '',
                new_tag_product: tagColor?.name_color ?? '',
                deskripsi: descriptionAbnormal,
            };
            setBarcodeStatus('abnormal');
            handleSetNewPriceProduct(formatRupiah(newPrice));
            const response = await newProduct(body);
            console.log('API Response:', response);
            // resetProductCheckShow();
            // hideBarcode();
            setTimeout(() => setIsSending(false), 3000);
        } catch (err) {
            console.log(err);
            setIsSending(false);
        }
    };

    const handleSelectedLolosOption = ({ value, percentage }: { value: string; percentage: string }) => {
        setSelectedOption(value);
        countPercentage(percentage);
        getSelectedCategory(value);
    };

    const showAlert = async (type: any) => {
        if (type === 11) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary',
                    cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                    popup: 'sweet-alerts',
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: 'Kode Barcode sudah direkam!',
                    text: 'Konfirmasi jika anda ingin memasukan barcode yang sama!',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Konfirmasi',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        const body = {
                            code_document: oldData.code_document,
                            old_barcode_product: oldData.old_barcode_product,
                            new_barcode_product: '',
                            new_name_product: oldData.old_name_product,
                            old_name_product: oldData.old_name_product,
                            new_quantity_product: productQuantity,
                            new_price_product: newPrice,
                            old_price_product: oldData.old_price_product,
                            new_date_in_product: newDateProduct,
                            new_status_product: 'display',
                            condition: barcodeStatus === 'abnormal' ? 'abnormal' : barcodeStatus === 'damaged' ? 'damaged' : 'lolos',
                            new_category_product: barcodeStatus === 'lolos' ? selectedOption : '',
                            new_tag_product: tagColor?.name_color ?? '',
                            deskripsi: barcodeStatus === 'abnormal' ? descriptionAbnormal : barcodeStatus === 'damaged' ? descriptionDamaged : '',
                        };
                        try {
                            await approveDouble(body)
                                .unwrap()
                                .then((res: any) => {
                                    if (res.data.status) {
                                        swalWithBootstrapButtons.fire('Konfirmasi Berhasil!', 'Barcode telah direkam lagi.', 'success');
                                        toast.success(res.data.message);
                                        setDescriptionAbnormal('');
                                        setDescriptionDamaged('');
                                        setCodeBarcode(res.data.resource.new_barcode_product ? res.data.resource.new_barcode_product : '');
                                        resetValueMultiCheck();
                                        if (Math.ceil(Number(oldData?.old_price_product)) >= 100000) {
                                            showBarcode();
                                            resetProductCheckShow();
                                        } else {
                                            hideBarcode();
                                            resetProductCheckShow();
                                        }
                                    } else {
                                        toast.error(res.data.message);
                                        swalWithBootstrapButtons.fire('Something went wrong', 'Data tidak jadi direkam', 'error');
                                    }
                                })
                                .catch((err: any) => {
                                    console.log('err', err);
                                    swalWithBootstrapButtons.fire('Something went wrong', 'Data tidak jadi direkam', 'error');
                                });
                        } catch (error) {
                            swalWithBootstrapButtons.fire('Something went wrong', 'Data tidak jadi direkam', 'error');
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Data tidak jadi direkam', 'success');
                    }
                });
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            if (results.data.data.status) {
                if (results.data?.data.needConfirmation) {
                    if (results.data?.data.resource.new_barcode_product) {
                        setCodeBarcode(results.data?.data.resource.new_barcode_product ? results.data?.data.resource.new_barcode_product : '');
                    }
                    toast.success(results.data.data.message);
                    resetValueMultiCheck();
                    setDescriptionAbnormal('');
                    setDescriptionDamaged('');
                    if (Math.ceil(Number(oldData?.old_price_product)) >= 100000) {
                        showBarcode();
                        resetProductCheckShow();
                    } else {
                        hideBarcode();
                        resetProductCheckShow();
                    }
                }
            } else {
                if (!results.data?.data.needConfirmation) {
                    toast.error(results.data?.data.message);
                    showAlert(11);
                }
                if (results.data?.data.message === 'The new barcode already exists') {
                    toast.error('Please Re-Scan, Something went wrong');
                }
                toast.error(results.data?.data.message);
            }
        } else if (results.isError) {
            const fetchError = results.error as FetchBaseQueryError;
            toast.error((fetchError.data as any)?.old_barcode_product ?? 'error');
        }
    }, [results.isSuccess]);

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
                    <Tab.Panel>
                        <form onSubmit={handleSendLolos} className="grid grid-cols-3 gap-4">
                            {productCheckData?.length !== 0 &&
                                productCheckData?.map((option: any) => (
                                    <label key={option.id} className="flex items-center mt-1 cursor-pointer">
                                        <input
                                            disabled={tagColor && true}
                                            type="radio"
                                            className="form-radio text-success peer w-6 h-6"
                                            name="radioOption"
                                            value={option.name_category}
                                            onChange={(e) => handleSelectedLolosOption({ value: e.target.value, percentage: option.discount_category })}
                                        />
                                        <span className="text-white-dark">{option.name_category}</span>
                                    </label>
                                ))}

                            {!isSending && (
                                <button disabled={(parseFloat(oldData.old_price_product) > 100000 && !selectedOption) || isSending} className="btn btn-info mt-4 col-span-3">
                                    SEND
                                </button>
                            )}
                        </form>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div>
                            <div className="flex items-start pt-5">
                                <form onSubmit={handleDamaged} className="flex-auto">
                                    <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                    <textarea
                                        value={descriptionDamaged}
                                        onChange={(e) => setDescriptionDamaged(e.target.value)}
                                        rows={4}
                                        className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                        required
                                    ></textarea>
                                    <div className="flex justify-end">
                                        {!isSending && (
                                            <button disabled={descriptionDamaged.length === 0 || isSending} type="submit" className="w-full btn btn-info mt-4">
                                                SEND
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div>
                            <div className="flex items-start pt-5">
                                <form onSubmit={handleAbnormal} className="flex-auto">
                                    <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                    <textarea
                                        rows={4}
                                        value={descriptionAbnormal}
                                        onChange={(e) => setDescriptionAbnormal(e.target.value)}
                                        className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                        required
                                    ></textarea>
                                    <div className="flex justify-end">
                                        {!isSending && (
                                            <button disabled={descriptionAbnormal.length === 0 || isSending} type="submit" className="w-full btn btn-info mt-4">
                                                SEND
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Tab.Panel>
                </Tab.Group>
            </div>
        </div>
    );
};

export default ProductCheck;
