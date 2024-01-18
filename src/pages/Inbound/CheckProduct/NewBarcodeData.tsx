import React, { useMemo } from 'react';
import { formatRupiah } from '../../../helper/functions';

interface NewBarcodeData {
    barcode: string;
    nama: string;
    newPrice: string;
    qty: string;
    header: string;
}

const NewBarcodeData: React.FC<NewBarcodeData> = ({ barcode, nama, newPrice, qty, header }) => {
    const price = useMemo(() => {
        return formatRupiah(newPrice);
    }, [newPrice]);

    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex justify-center text-lg font-bold">{header}</h1>
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
                <input id="gridNama3" disabled type="text" placeholder="Enter Nama" className="form-input" value={price} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input" value={qty} />
            </div>
        </div>
    );
};

export default NewBarcodeData;
