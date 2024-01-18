import React, { useMemo } from 'react';
import { BreadCrumbs } from '../../../components';
import BarcodeData from './BarcodeData';
import { useDetailProductNewQuery } from '../../../store/services/productNewApi';
import { useParams } from 'react-router-dom';

const DetailProduct = () => {
    const { id } = useParams();
    const { data, isSuccess } = useDetailProductNewQuery(id);

    const dataDetailProduct = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource;
        }
    }, [data]);
    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Produk" subPath="/storage/product" current="Detail Produk" />
            <div className="mt-10 p-6 panel">
                <h1 className="text-xl font-bold mb-6">Detail Product</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    <BarcodeData
                        header="New Data"
                        barcode={dataDetailProduct?.new_barcode_product}
                        harga={dataDetailProduct?.new_price_product}
                        qty={dataDetailProduct?.new_quantity_product}
                        nama={dataDetailProduct?.new_name_product}
                    />
                    <BarcodeData
                        header="Old Data"
                        barcode={dataDetailProduct?.old_barcode_product}
                        harga={dataDetailProduct?.new_price_product}
                        qty={dataDetailProduct?.new_quantity_product}
                        nama={dataDetailProduct?.new_name_product}
                    />
                </div>
            </div>
        </>
    );
};

export default DetailProduct;
