import React from 'react';

interface BarcodeData {
    barcode: string;
    nama: string;
    harga: string;
    qty: string;
}

const BarcodeData: React.FC<BarcodeData> = ({ barcode, nama, harga, qty }) => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="flex justify-center text-lg font-bold">OLD DATA</h1>
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
                <input id="gridNama3" disabled type="text" placeholder="Enter Nama" className="form-input" value={harga} />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input" value={qty} />
            </div>
        </div>
    );
};

export default BarcodeData;
