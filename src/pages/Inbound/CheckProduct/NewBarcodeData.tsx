import React, { useMemo, useState } from 'react';
import { formatRupiah } from '../../../helper/functions';

interface NewBarcodeData {
    barcode: string;
    nama: string;
    newPrice: string;
    qty: string;
    header: string;
    onChangePrice: (price: string) => void;
    onChangeQty: (qty: string) => void;
}

const NewBarcodeData: React.FC<NewBarcodeData> = ({ barcode, nama, newPrice, qty, header, onChangePrice, onChangeQty }) => {
    const [editablePrice, setEditablePrice] = useState(newPrice);
    const [editableQty, setEditableQty] = useState(qty);
    // const price = useMemo(() => {
    //     return formatRupiah(newPrice);
    // }, [newPrice]);
    const price = useMemo(() => {
        return formatRupiah(editablePrice);
    }, [editablePrice]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEditablePrice(value);
        onChangePrice(value);
    };

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setEditableQty(value);
        onChangeQty(value);
    };

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
            {/* <div>
                <label htmlFor="gridNama3">Harga</label>
                <input id="gridNama3" type="text" placeholder="Enter Nama" className="form-input" value={price} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" className="form-input" value={qty} />
            </div> */}
            <div>
                <label htmlFor="gridNama3">Harga</label>
                <input id="gridNama3" type="text" placeholder="Enter Harga" className="form-input" value={editablePrice} onChange={handlePriceChange} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" className="form-input" value={editableQty} onChange={handleQtyChange} />
            </div>
        </div>
    );
};

export default NewBarcodeData;
