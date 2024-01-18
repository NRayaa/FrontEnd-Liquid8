import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';

import IconSearch from '../../../components/Icon/IconSearch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLazyGetBarcodeQuery } from '../../../store/services/checkProduct';
import BarcodeData from './BarcodeData';
import TagColorData from './TagColorData';
import ProductCheck from './ProductCheck';
import { useCheckAllDocumentMutation } from '../../../store/services/riwayatApi';
import NewBarcodeData from './NewBarcodeData';

const MultiCheck = () => {
    const { state } = useLocation();
    const [inputBarcode, setInputBarcode] = useState<string>('');
    const [isProductCheck, setIsProductCheck] = useState<boolean>(false);
    const [isResetValue, setIsResetValue] = useState<boolean>(true);
    const [checkAllDocument, checkResults] = useCheckAllDocumentMutation();
    const navigate = useNavigate();
    const [newPricePercentage, setNewPricePercentage] = useState<string>('0');
    const [percentageState, setPercentageState] = useState<string>('0');

    const [getBarcode, results] = useLazyGetBarcodeQuery();

    const [keterangan, setKeterangan] = useState<string>('');

    const handleInputBarcode = async () => {
        try {
            await getBarcode({ code_document: state?.codeDocument, old_barcode_product: inputBarcode });
            setIsResetValue(false);
        } catch (err) {
            console.log(err);
        }
    };

    const resetValueMultiCheck = () => {
        setNewPricePercentage('0');
        setPercentageState('0');
        setIsResetValue(true);
    };
    const resetProductCheckShow = () => {
        setIsProductCheck(false);
    };

    useEffect(() => {
        if (results.isSuccess) {
            setIsProductCheck(true);
            if (Array.isArray(results.data?.data.resource)) {
                setKeterangan('<100K');
            } else {
                setKeterangan('>100K');
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

    const newPrice = useMemo(() => {
        if (!Array.isArray(results.data?.data.resource)) {
            return results.data?.data.resource.old_price_product;
        }
    }, [results]);

    const handleCheckDoneAll = async () => {
        const resAlert = await Swal.fire({
            title: 'Yakin akan melakukan pengecekan semuanya?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Yakin',
            denyButtonText: `Tidak`,
        });
        if (resAlert.isConfirmed) {
            const body = {
                code_document: state?.codeDocument,
            };
            await checkAllDocument(body);
        }
    };

    const countPercentage = (percentage: string) => {
        setPercentageState(percentage);
    };

    useEffect(() => {
        const percentageInt = parseInt(percentageState);
        const newPriceInt = Math.floor(parseInt(newPrice ?? '0'));

        const result = (newPriceInt * percentageInt) / 100;

        setNewPricePercentage(JSON.stringify(result));
    }, [percentageState]);

    useEffect(() => {
        if (checkResults.isSuccess) {
            navigate('/inbound/check_history');
        }
    }, [checkResults]);

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
                            <input id="gridKeterangan" type="text" disabled className="form-input w-full" value={!isResetValue ? keterangan : ''} />
                        </div>
                    </form>
                    <div className="space-y-5 col-span-2">
                        <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                            <BarcodeData
                                header="OLD DATA"
                                barcode={!isResetValue ? oldData?.old_barcode_product : ''}
                                nama={!isResetValue ? oldData?.old_name_product : ''}
                                harga={!isResetValue ? oldData?.old_price_product : ''}
                                qty={!isResetValue ? oldData?.old_quantity_product : ''}
                            />
                            {!tagColor || tagColor === undefined ? (
                                <NewBarcodeData
                                    header="NEW DATA"
                                    barcode={!isResetValue ? oldData?.old_barcode_product : ''}
                                    nama={!isResetValue ? oldData?.old_name_product : ''}
                                    newPrice={!isResetValue ? newPricePercentage : ''}
                                    qty={!isResetValue ? oldData?.old_quantity_product : ''}
                                />
                            ) : (
                                <TagColorData
                                    tag={!isResetValue ? tagColor.hexa_code_color : ''}
                                    nama={!isResetValue ? tagColor.name_color : ''}
                                    harga={!isResetValue ? tagColor.fixed_price_color : ''}
                                    qty={!isResetValue ? oldData.old_quantity_product : ''}
                                />
                            )}
                        </div>
                        <button className="btn btn-warning !mt-6" onClick={handleCheckDoneAll}>
                            DONE CHECK ALL
                        </button>
                    </div>
                </div>
                {isProductCheck && (
                    <ProductCheck
                        oldData={oldData}
                        tagColor={tagColor}
                        resetValueMultiCheck={resetValueMultiCheck}
                        resetProductCheckShow={resetProductCheckShow}
                        countPercentage={countPercentage}
                        newPricePercentage={newPricePercentage}
                    />
                )}
            </div>
        </div>
    );
};

export default MultiCheck;
