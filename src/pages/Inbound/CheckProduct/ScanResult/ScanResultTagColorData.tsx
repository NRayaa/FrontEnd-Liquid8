import React, { ChangeEvent, useEffect, useState } from 'react';
import { formatRupiah } from '../../../../helper/functions';

interface ScanResultTagColorData {
    tag: string;
    nama: string;
    harga: string;
    qty: string;
    handleSetCustomQuantityInput: (qty: string) => void;
    handleIsQuantity: () => void;
    handleSetQty: (qty: string) => void;
}

const ScanResultTagColorData: React.FC<ScanResultTagColorData> = ({ tag, nama, harga, qty, handleIsQuantity, handleSetCustomQuantityInput, handleSetQty }) => {
    const [inputQuantity, setInputQuantity] = useState<string>('');
    useEffect(() => {
        setInputQuantity(qty);
    }, [qty]);

    const handleInputQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        handleIsQuantity();
        setInputQuantity(e.target.value);
        handleSetCustomQuantityInput(e.target.value);
        handleSetQty(e.target.value); // Menambahkan pemanggilan handler untuk Qty
    };
    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex justify-center text-lg font-bold">NEW DATA</h1>
            <div>
                <label htmlFor="gridBarcode2">Tag</label>
                <input id="gridBarcode2" disabled type="text" placeholder="Enter Barcode" className="form-input" value={tag} />
            </div>
            <div>
                <label htmlFor="gridNama2">Nama</label>
                <input id="gridNama2" type="text" disabled placeholder="Enter Nama" className="form-input" value={nama} />
            </div>
            <div>
                <label htmlFor="gridNama4">Harga</label>
                <input id="gridNama4" disabled type="text" placeholder="Enter Nama" className="form-input" value={formatRupiah(harga ?? '0')} />
            </div>
            <div>
                <label htmlFor="gridNama4">Qty</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" className="form-input" value={inputQuantity} onChange={handleInputQuantity} />
            </div>
        </div>
    );
};

export default ScanResultTagColorData;
