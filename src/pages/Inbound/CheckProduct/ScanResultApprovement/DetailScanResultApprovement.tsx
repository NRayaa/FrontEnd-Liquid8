import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useGetDetailProductInputQuery, useUpdateProductInputMutation } from '../../../../store/services/producInputApi';
import { Alert } from '../../../../commons';
import { BreadCrumbs } from '../../../../components';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import NewBarcodeData from '../NewBarcodeData';
import BarcodeData from '../BarcodeData';

const DetailProductInput = () => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const { data, isSuccess, isError, refetch } = useGetDetailProductInputQuery(id);
    // refetch
    const [updateProductInput, results] = useUpdateProductInputMutation();
    const [input, setInput] = useState({
        new_name_product: '',
        new_price_product: '',
        new_quantity_product: '',
    });

    const dataDetailProduct = useMemo(() => {
        return data?.data.resource;
    }, [data]);

    const condition = useMemo(() => {
        const quality: any = data?.data.resource?.new_quality;

        if (quality !== undefined) {
            if (JSON.parse(quality).lolos !== null) {
                return JSON.parse(quality).lolos;
            } else if (JSON.parse(quality).damaged !== null) {
                return JSON.parse(quality).damaged;
            } else if (JSON.parse(quality).abnormal !== null) {
                return JSON.parse(quality).abnormal;
            }
        }
    }, [data?.data.resource?.new_quality]);

    useEffect(() => {
        if (isSuccess) {
            setInput((prevState) => ({
                ...prevState,
                new_name_product: data.data.resource.new_name_product,
                new_price_product: data.data.resource.new_price_product,
                new_quantity_product: data.data.resource.new_quantity_product,
            }));
        }
    }, [data]);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const findNotNull = (v: any) => {
        if (v) {
            const qualityObject = JSON.parse(v);

            const filteredEntries = Object.entries(qualityObject).find(([key, value]) => value !== null);

            return filteredEntries?.[0] ?? '';
        }
    };

    const handleEditProduct = async () => {
        try {
            const body = {
                code_document: dataDetailProduct?.code_document,
                old_barcode_product: dataDetailProduct?.old_barcode_product,
                new_barcode_product: dataDetailProduct?.new_barcode_product,
                new_name_product: input.new_name_product,
                old_name_product: dataDetailProduct?.new_name_product,
                new_quantity_product: input.new_quantity_product,
                new_price_product: input.new_price_product,
                old_price_product: dataDetailProduct?.old_price_product,
                new_date_in_product: dataDetailProduct?.new_date_in_product,
                new_status_product: dataDetailProduct?.new_status_product,
                condition: findNotNull(dataDetailProduct?.new_quality),
                new_category_product: dataDetailProduct?.new_category_product,
                new_tag_product: dataDetailProduct?.new_tag_product,
                deskripsi: dataDetailProduct?.deskripsi,
                display_price: dataDetailProduct?.display_price,
                _method: 'PUT',
            };
            await updateProductInput({ id, body });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message ?? 'Product updated');
            refetch();
        } else if (results.isError) {
            toast.error('Product updated failed');
        }
    }, [results]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Home" basePath="/" sub="Product Input" subPath="/inbound/check_product/product_input" current="Detail" />
            <div className="mt-10 p-6 panel">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Detail Product</h1>
                    <Link to="/inbound/check_product/product_input">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    <NewBarcodeData
                        header="New Data"
                        barcode={dataDetailProduct?.new_barcode_product ?? ''}
                        harga={input.new_price_product}
                        qty={input.new_quantity_product}
                        nama={input.new_name_product}
                        handleChangeInput={handleChangeInput}
                    />
                    <BarcodeData
                        header="Old Data"
                        barcode={dataDetailProduct?.old_barcode_product}
                        harga={dataDetailProduct?.old_price_product}
                        qty={dataDetailProduct?.new_quantity_product}
                        nama={dataDetailProduct?.new_name_product}
                    />
                </div>

                <button type="submit" className="btn btn-primary px-16 uppercase mt-6" onClick={handleEditProduct}>
                    Edit Product
                </button>
            </div>
        </>
    );
};

export default DetailProductInput;
