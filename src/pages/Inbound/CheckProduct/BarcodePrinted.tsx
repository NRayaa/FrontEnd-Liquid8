import React from 'react';

const BarcodePrinted = () => {
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
            <div className="print-container w-[104mm] h-auto p-2 ">
                <div>
                    <div className="flex items-center">
                        <img src="/assets/images/contoh-barcoded.png" alt="barcode" width={200} />
                        <img src="/assets/images/Liquid.png" alt="barcode" className="-mt-4" width={80} />
                    </div>
                    <div className="mt-4">
                        <table>
                            <tr>
                                <td className="font-bold text-black">New barcode</td>
                                <td className="font-bold text-black">0923-01106</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-black">Old price</td>
                                <td className="font-bold text-black underline">Rp 105.000,00</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-black">New Price</td>
                                <td className="font-bold text-black underline">Rp 52.500,00</td>
                            </tr>
                            <tr>
                                <td className="font-bold text-black">New_Quality</td>
                                <td className="font-bold text-black">Lolos</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <button onClick={handlePrint} className="px-6 py-2 bg-primary rounded-full">
                Print
            </button>
        </div>
    );
};

export default BarcodePrinted;
