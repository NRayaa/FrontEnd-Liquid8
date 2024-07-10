import React from 'react';
import { formatRupiah } from '../../../helper/functions';

interface TagColorData {
    tag: string;
    nama: string;
    harga: string;
    qty: string;
}

const TagColorData: React.FC<TagColorData> = ({ tag, nama, harga, qty }) => {
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
                <input id="gridNama4" disabled type="text" placeholder="Enter Nama" className="form-input" value={formatRupiah(harga ?? "0")} />
            </div>
            <div>
                <label htmlFor="gridQTY2">QTY</label>
                <input id="gridQTY2" disabled type="text" placeholder="Enter QTY" className="form-input" value={qty} />
            </div>
        </div>
    );
};

export default TagColorData;
