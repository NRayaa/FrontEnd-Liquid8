import React, { useEffect, useState } from 'react';
import { formatRupiah } from '../../../helper/functions';
import { useLazyUpdatePriceByProductOldQuery } from '../../../store/services/productNewApi';
import toast from 'react-hot-toast';

interface BarcodeData {
    barcode: string | undefined;
    nama: string | undefined;
    harga: string | undefined;
    qty: string | undefined;
    header: string | undefined;
    category: string | undefined;
    getNewPriceByCategory: (newPrice: string) => void;
    oldPrice: string | undefined;
    getOldPrice: (price: string | undefined) => void;
    showBarcode: () => void;
    hanldeEditProduct: () => void;
    hideRedirect: () => void;
}

const BarcodeData: React.FC<BarcodeData> = ({ header, barcode, nama, harga, qty, category, getNewPriceByCategory, oldPrice, getOldPrice, showBarcode, hanldeEditProduct, hideRedirect }) => {
    const [updatePriceByProductOld, results] = useLazyUpdatePriceByProductOldQuery();

    const handleEditOldPrice = async () => {
        await updatePriceByProductOld(oldPrice);
        hideRedirect();
        hanldeEditProduct();
    };

    useEffect(() => {
        getOldPrice(harga);
    }, [harga]);

    useEffect(() => {
        if (results.isSuccess) {
            const filteredCategory = results.data.data.resource.filter((item: any) => {
                return item?.name_category.includes(category);
            });
            const newPriceByCategory = (Number(oldPrice) * filteredCategory[0].discount_category) / 100;
            getNewPriceByCategory(JSON.stringify(Math.floor(newPriceByCategory)));
            toast.success('Berhasil edit data!');
            showBarcode();
        }
    }, [results]);

    return (
        <div className="flex flex-col gap-4 panel">
            <h2 className="text-lg font-medium">{header}</h2>
            <div>
                <label htmlFor="gridBarcode1">Barcode</label>
                <input id="gridBarcode1" disabled type="text" placeholder="Enter Barcode" className="form-input" value={barcode} />
            </div>
            <div>
                <label htmlFor="gridNama1">Nama</label>
                <input id="gridNama1" type="text" disabled placeholder="Enter Nama" className="form-input" value={nama} />
            </div>
            <div>
                <label htmlFor="gridNama3">Harga</label>
                <div className="flex space-x-2">
                    <input id="gridNama3" type="text" placeholder="Enter Nama" className="form-input" value={oldPrice} onChange={(e) => getOldPrice(e.target.value)} />
                    <button className="bg-primary text-white btn" onClick={handleEditOldPrice}>
                        Edit
                    </button>
                </div>
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input" value={qty} />
            </div>
        </div>
    );
};

export default BarcodeData;
