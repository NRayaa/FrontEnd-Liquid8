import React from 'react';
import { BreadCrumbs } from '../../../components';

const DetailProduct = () => {
    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Produk" subPath="/storage/product" current="Detail Produk" />
        </>
    );
};

export default DetailProduct;
