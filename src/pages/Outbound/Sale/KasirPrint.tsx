import React from 'react';
import { useGetSaleReportQuery } from '../../../store/services/saleApi';
import { useLocation, useParams } from 'react-router-dom';

const ReportTable = () => {
    const { code_document_sale } = useParams();
    const { data } = useGetSaleReportQuery(code_document_sale);

    const handlePrint = async () => {
        const containerElement: HTMLElement | null = document.querySelector('.print-container');
        if (containerElement) {
            const printWindow: Window | null = window.open('', '_blank');

            if (printWindow) {
                const printDocument = printWindow.document;
                printDocument.write('<html><head><title>Print</title></head><body>');
                printDocument.write(containerElement.innerHTML);
                printDocument.write('</body></html>');
                printDocument.close();
                window.location.reload();
                printWindow.print();
            } else {
                console.error('Failed to open print window');
            }
        } else {
            console.error('Container not found');
        }
    };

    return (
        <>
            <div className="print-container">
                <h2 style={{ marginBottom: 16 }}>{data?.message}</h2>
                <h3>Category Report</h3>
                <table style={{ marginBottom: 24 }} border={1}>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Total Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.category_report.map((item, index) => (
                            <tr key={index}>
                                <td>{item.category}</td>
                                <td>{item.total_quantity}</td>
                                <td>{item.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>NameBarcode Report</h3>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Barang</th>
                            <th>Nama Produk</th>
                            <th>Barcode</th>
                            <th>Total Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.NameBarcode_report.map((item, index) => (
                            <tr key={index}>
                                {item.map((subItem, subIndex) => (
                                    <td key={subIndex}>{subItem}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={handlePrint} className="py-2 px-8 bg-primary text-white rounded-full mt-6">
                Print
            </button>
        </>
    );
};

export default ReportTable;
