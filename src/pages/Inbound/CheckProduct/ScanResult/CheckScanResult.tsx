import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

import IconSearch from '../../../../components/Icon/IconSearch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLazyGetBarcodeQuery, useLazyGetNameQuery } from '../../../../store/services/checkProduct';
import { useCheckAllDocumentMutation } from '../../../../store/services/riwayatApi';
import { formatRupiah } from '../../../../helper/functions';
import { Alert } from '../../../../commons';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import ProductCheckScanResult from './ProductCheckScanResult';
import ScanResultBarcodePrinted from './ScanResultBarcodePrinted';
import ScanResultTagColorData from './ScanResultTagColorData';
import ScanResultNewBarcodeDataMulti from './ScanResultNewBarcodeDataMulti';
import ScanResultBarcodeData from './ScanResultBarcodeData';

const CheckScanResult = () => {
    const { state } = useLocation();
    const [inputBarcode, setInputBarcode] = useState<string>(state?.id || ''); // Ambil dari state jika ada
    const [isProductCheckScanResult, setIsProductCheck] = useState<boolean>(false);
    const [isResetValue, setIsResetValue] = useState<boolean>(true);
    const [newPricePercentage, setNewPricePercentage] = useState<string>('0');
    const [customQuantity, setCustomQuantity] = useState<string>('0');
    const [percentageState, setPercentageState] = useState<string>('0');
    const [isBarcode, setIsBarcode] = useState<boolean>(false);
    const [newPriceBarcode, setNewPriceBarcode] = useState('');
    const [oldPriceBarcode, setOldPriceBarcode] = useState('');
    const [codeBarcode, setCodeBarcode] = useState<string>('');
    const [isQuantity, setIsQuantity] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    console.log(state.id, inputBarcode, inputBarcode.length === 0 || inputBarcode === '', inputBarcode.length > 0);
    const [getName, results] = useLazyGetNameQuery();

    const [keterangan, setKeterangan] = useState<string>('');

    const getSelectedCategory = (selected: string) => {
        setSelectedCategory(selected);
    };
    const showBarcode = () => {
        setIsBarcode(true);
    };
    const hideBarcode = () => {
        setIsBarcode(false);
    };
    const handleIsQuantity = () => {
        setIsQuantity(true);
    };

    const handleInputBarcode = async () => {
        if (inputBarcode.length === 0 || inputBarcode === '') {
            return;
        }
        try {
            await getName({ id: inputBarcode });
            setIsResetValue(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSetNewPercentagePriceInput = (price: string) => {
        setNewPricePercentage(price);
    };
    const handleSetCustomQuantityInput = (qty: string) => {
        setCustomQuantity(qty);
    };

    const resetValueMultiCheck = () => {
        setNewPricePercentage('0');
        setPercentageState('0');
        setIsResetValue(true);
    };
    const resetProductCheckScanResultShow = () => {
        setIsProductCheck(false);
    };

    const tagColor = useMemo(() => {
        if (results?.data?.data?.resource?.color_tags !== undefined) {
            return results.data?.data.resource.color_tags;
        }
    }, [results]);

    const oldData = useMemo(() => {
        if (results.isSuccess && results?.data?.data?.status) {
            return results.data?.data?.resource?.product;
        }
    }, [results]);

    const newPrice = useMemo(() => {
        if (results.isSuccess && results.data.data.status) {
            return results.data?.data?.resource?.product?.product_price;
        }
    }, [results]);

    const countPercentage = (percentage: string) => {
        setPercentageState(percentage);
    };

    const handleSetNewPriceProduct = (newPrice: string) => {
        setNewPriceBarcode(newPrice);
    };

    useEffect(() => {
        const percentageInt = 100 - parseInt(percentageState);
        const newPriceInt = Math.floor(parseInt(newPrice ?? '0'));

        const result = (newPriceInt * percentageInt) / 100;

        setNewPricePercentage(JSON.stringify(result));
    }, [percentageState]);

    useEffect(() => {
        // Ketika komponen pertama kali render, langsung search menggunakan product_name dari state
        handleInputBarcode();
    }, [inputBarcode]);

    useEffect(() => {
        if (results.isSuccess) {
            if (results.data.data.status) {
                toast.success(results?.data?.data?.message ?? 'success');
                setIsProductCheck(true);
                if (Math.ceil(Number(results?.data?.data?.resource?.product?.product_price)) >= 100000) {
                    setKeterangan('>100K');
                } else {
                    setKeterangan('<=100K');
                }
                setInputBarcode('');
            } else {
                toast.error(results?.data?.data?.message ?? 'something went wrong');
            }
        } else if (results.isError) {
            if (results.error && 'data' in results.error && results.error.data) {
                const messageRes = (results.error.data as any)?.data?.message;
                toast.error(messageRes ?? '');
            } else {
                const messageRes = 'message' in results?.error ? (results?.error as any)?.message : 'something went wrong';
                toast.error(messageRes);
            }
        }
    }, [results]);

    useEffect(() => {
        setOldPriceBarcode(formatRupiah(oldData?.product_price ?? ''));
    }, [oldData?.product_price, oldData?.product_name]);

    // if (results.isError && !results.data?.data.status) {
    //     return <Alert message={results.data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    // }

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
                    <span> Check Scan Result </span>
                </li>
            </ul>
            <div className="flex gap-4">
                <div className=" xl:w-1/2 ss:w-full gap-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-bold my-4">CHECK </h1>
                        <Link to="/inbound/check_product/scan_result" state={{ codeDocument: state?.codeDocument }}>
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <form className="w-full panel mb-5 col-span-2 gap-4 flex items-center">
                        <div className="relative w-full" hidden>
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
                            <input id="gridKeterangan" type="text" disabled className="form-input w-full" value={keterangan ?? ''} />
                        </div>
                    </form>
                    <div className="space-y-5 col-span-2">
                        <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                            <ScanResultBarcodeData
                                header="OLD DATA"
                                nama={!isResetValue ? oldData?.product_name : ''}
                                harga={!isResetValue ? oldData?.product_price : ''}
                                qty={customQuantity}
                                handleSetHarga={(harga: string) => setNewPriceBarcode(harga)}
                                handleSetQty={(qty: string) => setCustomQuantity(qty)}
                                disabled={true}
                            />
                            {!tagColor || tagColor === undefined ? (
                                <ScanResultNewBarcodeDataMulti
                                    header="NEW DATA"
                                    barcode={''}
                                    nama={!isResetValue ? oldData?.product_name : ''}
                                    newPrice={!isResetValue ? newPricePercentage : ''}
                                    qty={!isResetValue ? oldData?.old_quantity_product : ''}
                                    handleSetNewPercentagePriceInput={handleSetNewPercentagePriceInput}
                                    handleSetCustomQuantityInput={handleSetCustomQuantityInput}
                                    handleIsQuantity={handleIsQuantity}
                                    handleSetHarga={(harga: string) => setNewPriceBarcode(harga)}
                                    handleSetQty={(qty: string) => setCustomQuantity(qty)}
                                />
                            ) : (
                                <ScanResultTagColorData
                                    tag={!isResetValue ? tagColor.hexa_code_color : ''}
                                    nama={!isResetValue ? tagColor.name_color : ''}
                                    harga={!isResetValue ? tagColor.fixed_price_color : ''}
                                    qty={!isResetValue ? oldData.old_quantity_product : ''}
                                    handleSetCustomQuantityInput={handleSetCustomQuantityInput}
                                    handleIsQuantity={handleIsQuantity}
                                    handleSetQty={(qty: string) => setCustomQuantity(qty)}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {isProductCheckScanResult && (
                    <ProductCheckScanResult
                        oldData={oldData}
                        tagColor={tagColor}
                        resetValueMultiCheck={resetValueMultiCheck}
                        resetProductCheckScanResultShow={resetProductCheckScanResultShow}
                        countPercentage={countPercentage}
                        newPricePercentage={newPricePercentage}
                        showBarcode={showBarcode}
                        hideBarcode={hideBarcode}
                        handleSetNewPriceProduct={handleSetNewPriceProduct}
                        customQuantity={customQuantity}
                        codeBarcode={codeBarcode}
                        setCodeBarcode={setCodeBarcode}
                        isQuantity={isQuantity}
                        getSelectedCategory={getSelectedCategory}
                    />
                )}
                {isBarcode && <ScanResultBarcodePrinted barcode={codeBarcode} newPrice={newPriceBarcode} oldPrice={oldPriceBarcode} category={selectedCategory} />}
            </div>
        </div>
    );
};

export default CheckScanResult;
