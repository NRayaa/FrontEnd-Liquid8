import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../../store';
import IconPlus from '../../../../components/Icon/IconPlus';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        category: 'Fashion',
        barcode: 'LQDF5H012',
        totalMasuk: '105.000',
        email: 'carolinejensen@zidant.com',
        status: 'Expired',
        QTY: '12',
        hargaLama: 'Rp. 12.000',
        hargaBaru: 'Rp. 14.000',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Otomotif',
        barcode: 'LQDF5H013',
        totalMasuk: '203.000',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        status: 'Expired',
        QTY: '34',
        hargaLama: 'Rp. 10.000',
        hargaBaru: 'Rp. 9.000',
    },
];

const showAlert = async (type: number) => {
    if (type === 11) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-secondary',
                cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                popup: 'sweet-alerts',
            },
            buttonsStyling: false,
        });
        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true,
                padding: '2em',
            })
            .then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                }
            });
    }
    if (type === 15) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Berhasil Dikirim',
            padding: '10px 20px',
        });
    }
    if (type == 20) {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
        });
        toast.fire({
            icon: 'success',
            title: 'Data Berhasil Ditambah',
            padding: '10px 20px',
        });
    }
};
const DetailPromo = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.category.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalMasuk.toLowerCase().includes(search.toLowerCase()) ||
                    item.QTY.toLowerCase().includes(search.toLowerCase()) ||
                    item.barcode.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);
    const formatDate = (date: string | number | Date) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const [cost, setCost] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        category: 'Baju', // Isi dengan data default
        barcode: 'LQDFH510', // Isi dengan data default
        harga: 'Rp. 12.000', // Isi dengan data default
        qty: 1, // Isi dengan data default
        dataBaru: '', // Isi dengan data default
        discount: '', // Isi dengan data default
        hargaPromo: '', // Isi dengan data default
        // ... tambahkan property lain yang diperlukan sesuai dengan form
    });

    // Buat fungsi untuk toggle mode edit
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    // Buat fungsi untuk meng-handle submit form saat edit
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        // Lakukan proses untuk mengirim data yang diubah
        // Misalnya, kamu dapat mengirim data melalui API atau menyimpan ke state aplikasi lainnya
        // Contoh:
        console.log('Data yang diubah:', formData);
        // Disini kamu bisa menambahkan logika untuk menyimpan perubahan data ke server atau state aplikasi
        // Setelah selesai menyimpan, kamu bisa keluar dari mode edit
        toggleEditMode();
    };

    // Buat fungsi untuk meng-handle perubahan pada input form
    const handleInputChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        // Perbarui state formData sesuai dengan input yang diubah
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/expired_product/promo_product">
                    <span>Expired Product</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Promo</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Detail Promo</h1>
                {isEditMode ? (
                    <form onSubmit={handleSubmit} className="w-[400px] mb-4 ">
                        <div className="flex items-center  justify-between ">
                            <label htmlFor="barcode" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode :
                            </label>
                            <input onChange={handleInputChange} name="barcode" id="barcode" value={formData.barcode} type="text" className=" form-input w-[250px]" required />
                        </div>
                        {/* <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span> */}
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="category" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori :
                            </label>
                            <input onChange={handleInputChange} name="category" id="category" value={formData.category} type="text" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="qty" className="text-[15px] font-semibold whitespace-nowrap">
                                QTY :
                            </label>
                            <input onChange={handleInputChange} name="qty" id="qty" value={formData.qty} type="text" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="harga" className="text-[15px] font-semibold whitespace-nowrap">
                                Harga :
                            </label>
                            <input onChange={handleInputChange} name="harga" id="harga" value={formData.harga} type="text" placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2 mt-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Input Data Baru :
                                </label>
                                <input onChange={handleInputChange} name="dataBaru" id="dataBaru" type="text" className=" form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Discount Promo :
                                </label>
                                <input onChange={handleInputChange} name="discount" id="discount" type="text" placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Harga Promo :
                                </label>
                                <input onChange={handleInputChange} name="hargaPromo" id="HargaPromo" type="text" placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button type="submit" className="btn btn-primary mt-4 px-16">
                                Simpan
                            </button>
                            <button onClick={toggleEditMode} type="button" className="btn btn-primary mt-4 px-16">
                                Batal
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className='w-[400px] mb-4'>
                      <div className="flex items-center  justify-between ">
                            <label htmlFor="barcode" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode :
                            </label>
                            <input disabled name="barcode" id="barcode" value={formData.barcode} type="text" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="category" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori :
                            </label>
                            <input disabled name="category" id="category" value={formData.category} type="text" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="qty" className="text-[15px] font-semibold whitespace-nowrap">
                                QTY :
                            </label>
                            <input disabled name="qty" id="qty" value={formData.qty} type="text" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="harga" className="text-[15px] font-semibold whitespace-nowrap">
                                Harga :
                            </label>
                            <input disabled name="harga" id="harga" value={formData.harga} type="text" placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2 mt-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Input Data Baru :
                                </label>
                                <input disabled name="dataBaru" id="dataBaru" value={formData.dataBaru} type="text" className=" form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Discount Promo :
                                </label>
                                <input disabled name="discount" id="discount" value={formData.discount} type="text" placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Harga Promo :
                                </label>
                                <input disabled name="hargaPromo" id="HargaPromo" value={formData.hargaPromo} type="text" placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                        </div>
                        {/* <p>Barcode : {formData.barcode}</p>
                        <p>Kategori : {formData.category}</p>
                        <p>Qty : {formData.qty}</p>
                        <p>Harga : {formData.harga}</p>
                        <p>Data Baru: {formData.dataBaru}</p>
                        <p>Discount : {formData.discount}</p>
                        <p>Harga : {formData.hargaPromo}</p> */}
                        <button onClick={toggleEditMode} type="submit" className="btn btn-primary mt-4 px-16">
                            Edit Data
                        </button>
                    </div>
                )}
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div>
                        <Link to="/storage/expired_product/create_promo" >
                        <button className="btn btn-outline-info">
                            <IconPlus />
                            Create
                        </button>
                        </Link>
                    </div> */}
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default DetailPromo;
