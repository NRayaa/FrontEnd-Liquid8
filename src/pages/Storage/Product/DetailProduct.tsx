import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import BarcodeData from './BarcodeData';
import { useDetailProductNewQuery, useEditDetailProductMutation, useGetAllProductNewQuery } from '../../../store/services/productNewApi';
import { useNavigate, useParams } from 'react-router-dom';
import NewBarcodeData from './NewBarcodeData';
import toast from 'react-hot-toast';

const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isSuccess, refetch } = useDetailProductNewQuery(id);
    const productNew = useGetAllProductNewQuery({ page: 1, q: '' });
    const [editDetailProduct, results] = useEditDetailProductMutation();
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

    const hanldeEditProduct = async () => {
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
                condition: condition,
                new_category_product: dataDetailProduct?.new_category_product,
                new_tag_product: dataDetailProduct?.new_tag_product,
                deskripsi: dataDetailProduct?.deskripsi,
                _method: 'PUT',
            };
            await editDetailProduct({ id, body });
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message ?? 'Product updated');
            navigate('/storage/product');
            productNew.refetch();
        } else if (results.isError) {
            toast.error('Product updated failed');
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Produk" subPath="/storage/product" current="Detail Produk" />
            <div className="mt-10 p-6 panel">
                <h1 className="text-xl font-bold mb-6">Detail Product</h1>
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

                <button type="submit" className="btn btn-primary mt-6 px-16 uppercase" onClick={hanldeEditProduct}>
                    Edit Product
                </button>
            </div>
        </>
    );
};

export default DetailProduct;
