import React from 'react';
import { formatCurrency, formatRupiah } from '../../../../helper/functions';

interface ScanResultBarcodeDataProps {
    header: string;
    nama: string;
    harga: string;
    qty: string;
    // handleSetNama: (nama: string) => void;
    handleSetHarga: (harga: string) => void;
    handleSetQty: (qty: string) => void;
    disabled: boolean;
}

const ScanResultBarcodeData: React.FC<ScanResultBarcodeDataProps> = ({
    header,
    nama,
    harga,
    qty,
    // handleSetNama,
    handleSetHarga,
    handleSetQty,
    disabled,
}) => {
    return (
        <div className="flex flex-col gap-4 panel">
            <h2 className="text-lg font-medium">{header}</h2>
            <div>
                <label htmlFor="gridNama1">Nama</label>
                <input
                    id="gridNama1"
                    type="text"
                    placeholder="Enter Nama"
                    className="form-input"
                    value={nama}
                    disabled={disabled}
                    // onChange={(e) => handleSetNama(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="gridHarga1">Harga</label>
                <input
                    id="gridHarga1"
                    type="text"
                    placeholder="Enter Harga"
                    className="form-input"
                    value={formatCurrency(parseFloat(harga))}
                    disabled={disabled}
                    // onChange={(e) => handleSetHarga(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="gridQTY1">QTY</label>
                <input id="gridQTY1" type="text" placeholder="Enter QTY" className="form-input" value={qty} onChange={(e) => handleSetQty(e.target.value)} disabled={disabled} />
            </div>
        </div>
    );
};

export default ScanResultBarcodeData;
