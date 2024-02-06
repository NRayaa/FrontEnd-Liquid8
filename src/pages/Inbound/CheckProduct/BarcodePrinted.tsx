import React from 'react';

interface BarcodePrint {
    oldPrice: string;
    newPrice: string;
}

const BarcodePrinted: React.FC<BarcodePrint> = ({ oldPrice, newPrice }) => {
    const handlePrint = () => {
        const containerElement: HTMLElement | null = document.querySelector('.print-container');

        if (containerElement) {
            const printWindow: Window | null = window.open('', '_blank');

            if (printWindow) {
                const printDocument = printWindow.document;
                printDocument.write('<html><head><title>Print</title></head><body>');
                printDocument.write(containerElement.innerHTML);
                printDocument.write('</body></html>');
                printDocument.close();
                printWindow.print();
            } else {
                console.error('Failed to open print window');
            }
        } else {
            console.error('Container not found');
        }
    };
    return (
        <div>
            <div style={{ width: '7cm', height: '4cm', display: 'flex', justifyContent: 'start', alignItems: 'start', fontFamily: 'sans-serif' }} className="print-container">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/assets/images/contoh-barcoded.png" alt="barcode" width={150} />
                        <img src="/assets/images/Liquid.png" alt="barcode" style={{ marginTop: '-10px' }} width={70} />
                    </div>
                    <div>
                        <table style={{ borderSpacing: 0 }}>
                            <tr>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Old price</td>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textDecoration: 'underline' }}>: {oldPrice}</td>
                            </tr>
                            <tr>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>New Price</td>
                                <td style={{ fontSize: 16, fontWeight: 'bold', color: 'black', textDecoration: 'underline' }}>: {newPrice}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <button onClick={handlePrint} className="py-2 px-8 bg-primary text-white rounded-full mt-6">
                Print
            </button>
        </div>
    );
};

export default BarcodePrinted;
