import { useGetSaleReportQuery } from '../../../store/services/saleApi';
import { useParams } from 'react-router-dom';
import LogoBulky from '/assets/images/bulky-black.png';
import { formatCurrency, formatDate, formatTimestamp } from '../../../helper/functions';

const ReportTable = () => {
    const { code_document_sale } = useParams();
    const { data } = useGetSaleReportQuery(code_document_sale);

    const capitalizeFirstLetter = (string: any) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    function convertToRoman(num: number): string {
        const romanNumerals: { value: number; symbol: string }[] = [
            { value: 1000, symbol: 'M' },
            { value: 900, symbol: 'CM' },
            { value: 500, symbol: 'D' },
            { value: 400, symbol: 'CD' },
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' },
        ];

        let result = '';
        for (const { value, symbol } of romanNumerals) {
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }
        return result;
    }

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

    function terbilang(n: number): string {
        var bilangan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

        if (n < 12) {
            return bilangan[n];
        } else if (n < 20) {
            return bilangan[n - 10] + ' belas';
        } else if (n < 100) {
            return bilangan[Math.floor(n / 10)] + ' puluh ' + bilangan[n % 10];
        } else if (n < 200) {
            return 'seratus ' + terbilang(n - 100);
        } else if (n < 1000) {
            return bilangan[Math.floor(n / 100)] + ' ratus ' + terbilang(n % 100);
        } else if (n < 2000) {
            return 'seribu ' + terbilang(n - 1000);
        } else if (n < 1000000) {
            return terbilang(Math.floor(n / 1000)) + ' ribu ' + terbilang(n % 1000);
        } else if (n < 1000000000) {
            return terbilang(Math.floor(n / 1000000)) + ' juta ' + terbilang(n % 1000000);
        } else if (n < 1000000000000) {
            return terbilang(Math.floor(n / 1000000000)) + ' milyar ' + terbilang(n % 1000000000);
        } else {
            return 'Angka terlalu besar';
        }
    }

    function formatRupiah(angka: number): string {
        var formatted = terbilang(angka) + ' rupiah';
        return formatted;
    }

    const totalHarga: number | undefined = Math.ceil(data?.buyer?.grand_total ?? 0);
    // const totalHarga: number | undefined = data?.buyer?.total_price_document_sale ?? 0;
    const totalHargaFormatted: string = Math.ceil(totalHarga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    const totalHargaTerbilang: string = formatRupiah(totalHarga).toUpperCase();
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="print-container" style={{ fontFamily: 'sans-serif' }}>
                {/* header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <table border={1} style={{ marginBottom: 2 }}>
                            <tr>
                                <td>FORM VALIDASI</td>
                            </tr>
                            <tr>
                                <td>
                                    {data?.buyer.code_document_sale}/LMS/{convertToRoman(new Date().getMonth() + 1)}/{currentYear}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table border={1}>
                            <tr>
                                <td>CASHIER ID</td>
                            </tr>
                            <tr>
                                <td style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 46 }}>
                                    <h1 style={{ fontSize: 36 }}>{data?.data?.transactions_today}</h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <img src={LogoBulky} alt="barcode" style={{ marginTop: '-10px' }} width={120} />
                </div>
                <div style={{ marginTop: 16, marginBottom: 16 }}>
                    <h3 style={{ fontSize: 12 }}>A. Identitas Buyer</h3>
                    <div style={{ border: '1px solid #000', width: '100%', display: 'flex' }}>
                        <div style={{ borderRight: '1px solid #000', width: '100%', padding: '8px', display: 'flex', flexDirection: 'column' }}>
                            <h5 style={{ margin: '0px' }}>Nama : {data?.buyer.buyer_name_document_sale}</h5>
                            <h5 style={{ margin: '0px' }}>Alamat : {data?.buyer.buyer_address_document_sale}</h5>
                            <h5 style={{ margin: '0px' }}>HP : {data?.buyer.buyer_phone_document_sale}</h5>
                            <h5 style={{ margin: '0px' }}>NPWP : -</h5>
                            <h5 style={{ margin: '0px' }}>Tanggal : {formatTimestamp(data?.buyer.created_at ?? '')}</h5>
                        </div>
                        <div style={{ width: '100%', padding: '8px' }}>
                            <h5 style={{ textDecoration: 'underline', fontWeight: 'bold', margin: '0px' }}>Catatan Pembelian</h5>
                            <p style={{ fontSize: 12, margin: '0px', marginTop: '4px' }}>
                                Masing-masing pihak tidak bertanggung jawab atas, perbuatan melawan hukum, kelalaian, pelanggaran atau segala kerugian, kerusakan, ongkos atau biaya dalam bentuk apapun
                                yang harus dibayar atau diderita oleh pihak yang lain (a) baik yang bersifat tidak langsung atau konsekuensial atau (b) yang terkait dengan kerugian ekonomi, keuntungan
                                atau reputasi bisnis.
                            </p>
                        </div>
                    </div>
                    {/* <table border={1}>
                        <tr>
                            <td style={{ width: '50%' }}>
                                <h5>Nama : {data?.buyer.buyer_name_document_sale}</h5>
                                <h5>Alamat : {data?.buyer.buyer_address_document_sale}</h5>
                                <h5>HP : {data?.buyer.buyer_phone_document_sale}</h5>
                                <h5>NPWP : -</h5>
                                <h5>Tanggal : {formatTimestamp(data?.buyer.created_at ?? '')}</h5>
                            </td>
                            <td style={{ width: '50%' }}>
                                <h5 style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Catatan Pembelian</h5>
                                <p style={{ fontSize: 12 }}>
                                    Masing-masing pihak tidak bertanggung jawab atas, perbuatan melawan hukum, kelalaian, pelanggaran atau segala kerugian, kerusakan, ongkos atau biaya dalam bentuk
                                    apapun yang harus dibayar atau diderita oleh pihak yang lain (a) baik yang bersifat tidak langsung atau konsekuensial atau (b) yang terkait dengan kerugian ekonomi,
                                    keuntungan atau reputasi bisnis.
                                </p>
                            </td>
                        </tr>
                    </table> */}
                    <p style={{ marginTop: 12, fontSize: 12 }}>
                        Bahwa yang bersangkutan di atas telah melakukan pemilihan dan pemilahan atas barang yang berada di area Liquid8 Wholesale dan sepakat untuk melakukan pembelian sebagaimana
                        detail barang & harga berlaku di bawah:
                    </p>
                </div>
                {/* tables */}
                {/* footer */}
                <div>
                    <h3 style={{ fontSize: 12 }}>B. Informasi Harga Jual & Diskon berlaku</h3>
                    <table style={{ marginBottom: 24 }} border={1}>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Before Discount</th>
                                <th>Discount</th>
                                <th>After Discount</th>
                                {/* <th>Total Price</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data.category_report.category_list &&
                                data?.data.category_report.category_list.map((item, index) => (
                                    <tr key={index}>
                                        <td>{capitalizeFirstLetter(item.category)}</td>
                                        <td>{item.total_quantity}</td>
                                        <td style={{ textAlign: 'right' }}>{formatCurrency(item.before_discount)}</td>
                                        <td>{item.total_discount}%</td>
                                        <td style={{ textAlign: 'right' }}>{formatCurrency(item.total_price)}</td>
                                    </tr>
                                ))}
                            <tr>
                                <td>Carton Box</td>
                                <td>{data?.buyer.cardbox_qty}</td>
                                <td colSpan={2}>{`@${formatCurrency(data?.buyer.cardbox_unit_price)}`}</td>
                                <td style={{ textAlign: 'right' }}>{formatCurrency(data?.buyer.cardbox_total_price || 0)}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>Voucher</td>
                                <td style={{ textAlign: 'right' }}>- {formatCurrency(data?.buyer.voucher || 0)}</td>
                            </tr>
                            <tr style={{ fontWeight: 'bold' }}>
                                <td>Total</td>
                                <td>{data?.data.category_report.category_list.reduce((acc, item) => acc + item.total_quantity, 0)}</td>
                                <td colSpan={2}></td>
                                <td style={{ textAlign: 'right' }}>{formatCurrency(Math.ceil(data?.buyer.grand_total || 0))}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style={{ marginTop: 12, fontSize: 12 }}>
                        Bahwa Buyer telah SETUJU dengan diskon atau harga jual yang telah ditentukan di atas dan SETUJU untuk melakukan transfer sebagaimana total "FINAL PRICE" tertera sebesar
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: 200, borderBottom: '2 solid black' }}>
                            <h3 style={{ fontWeight: 'bold' }}>{totalHargaFormatted}</h3>
                        </div>
                        <p style={{ fontWeight: 'bold', fontSize: 12 }}>({totalHargaTerbilang})</p>
                    </div>
                    <div>
                        <p> ke rekening di bawah ini :</p>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div style={{ border: '1px solid #000', width: '98%', display: 'flex', flexDirection: 'column', padding: '8px' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ margin: '0px' }}>NOMOR REKENING :</p>
                                <p style={{ margin: '0px' }}>178-499-8811</p>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ margin: '0px' }}>NAMA PEMILIK:</p>
                                <p style={{ margin: '0px' }}>PT Likuid Megah Semesta</p>
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ margin: '0px' }}>BANK REKENING:</p>
                                <p style={{ margin: '0px' }}>BCA</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 style={{ fontSize: 12, marginBottom: 0 }}>C. Informasi status pembelian</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <ul style={{ listStyle: 'none' }}>
                                <li>(1) Pembayaran telah dilakukan oleh buyer bersangkutan</li>
                                <li style={{ marginTop: '8px' }}>(2) Pembayaran telah terkonfirmasi masuk ke rekening yang ditunjuk</li>
                                <li style={{ marginTop: '8px' }}>(3) Segala label, dan informasi pihak diluar penjual dan pembeli telah di tiadakan</li>
                                <li style={{ marginTop: '8px' }}>(4) Schedule pickup barang telah di tentukan</li>
                                <li style={{ marginTop: '8px' }}>(5) Buyer sudah di info barang keluar gudang tidak bisa di kembalikan/refund</li>
                            </ul>
                            <div style={{ display: 'flex', alignItems: 'flex-start', marginLeft: 10 }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -40 }}>
                                    <h5>Sudah</h5>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8, marginTop: -4 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15 }}></div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -40, marginLeft: 6 }}>
                                    <h5>Belum</h5>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8, marginTop: -4 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15, marginBottom: 8 }}></div>
                                    <div style={{ border: 1.5, borderStyle: 'solid', borderColor: 'black', width: 30, height: 15 }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 30 }}>
                        <div style={{ height: 120, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h5 style={{ marginBottom: 0, marginTop: '16px' }}>Nama Buyer:</h5>
                            <h5 style={{ margin: 0 }}>{data?.buyer.buyer_name_document_sale}</h5>
                        </div>
                        <div style={{ height: 120, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h5 style={{ margin: 0 }}>Dibuat:</h5>
                                    <h5 style={{ margin: 0 }}>Admin Kasir:</h5>
                                </div>
                                <h5 style={{ margin: 0 }}>{data?.data?.name_user}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handlePrint} className="py-2 px-8 bg-primary text-white rounded-full mt-6">
                Print
            </button>
        </>
    );
};

export default ReportTable;
