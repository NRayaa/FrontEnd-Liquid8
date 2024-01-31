import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../store';
import { useGetListProductRepairQuery } from '../../../store/services/listProductAPI';
import { GetListProductRepairItem } from '../../../store/services/types';
import { useGetCategoriesQuery } from '../../../store/services/categoriesApi';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        category: 'Fashion',
        barcode: '8124-000289',
        totalMasuk: '105.000',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        status: 'Broken',
        qty: '1',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        keterangan: 'rusak mohon segera diperbaiki',
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Otomotif',
        barcode: '8124-000822',
        totalMasuk: '203.000',
        email: 'celestegrant@polarax.com',
        dob: '2023-07-21',
        status: 'Maintenance',
        qty: '1',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        keterangan: 'masih dalam tahap perbaikan',
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Accessories',
        barcode: '8124-001023',
        totalMasuk: '203.000',
        email: 'celestegrant@polarax.com',
        dob: '2006-12-12',
        status: 'Fixed',
        qty: '2',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        keterangan: 'barang ini sudah di fix',
        company: 'MANGLO',
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
const ListProductRepair = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: listProductData } = useGetListProductRepairQuery(undefined);
    const { data: categoriesData } = useGetCategoriesQuery(undefined);
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const [selectedItem, setSelectedItem] = useState<GetListProductRepairItem | null>(null);
    const [repair, setRepair] = useState(false);
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

    const dataListProductRepair = useMemo(() => {
        return listProductData?.data.resource.data;
    }, [listProductData]);

    const dataCategories = useMemo(() => {
        return categoriesData?.data.resource;
    }, [categoriesData]);

    const handleButtonRepair = (selectedItem: GetListProductRepairItem | null) => {
        // setSelectedItem(item);
        setRepair(true);
    };

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
                    item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.category.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalMasuk.toLowerCase().includes(search.toLowerCase()) ||
                    item.barcode.toLowerCase().includes(search.toLowerCase()) ||
                    item.qty.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
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
                    <span>Repair Station</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Product Repair</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="mb-5">
                <Transition appear show={repair} as={Fragment}>
                    <Dialog as="div" open={repair} onClose={() => setRepair(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-[2xl] text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Repair</div>
                                        </div>
                                        <div className="space-y-5 col-span-2">
                                            <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <h1 className="flex justify-center text-lg font-bold">Old Data</h1>
                                                        <div>
                                                            <label htmlFor="gridBarcode1">Barcode</label>
                                                            <input
                                                                id="gridBarcode1"
                                                                disabled
                                                                type="text"
                                                                placeholder="Enter Barcode"
                                                                className="form-input"
                                                                value={selectedItem?.old_barcode_product || ''}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridNama1">Nama</label>
                                                            <input id="gridNama1" type="text" disabled placeholder="Enter Nama" className="form-input" value={selectedItem?.new_name_product || ''} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridNama3">Harga</label>
                                                            <input id="gridNama3" disabled type="text" placeholder="Enter Nama" className="form-input" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridQTY1">QTY</label>
                                                            <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <h1 className="flex justify-center text-lg font-bold">New Data</h1>
                                                        <div>
                                                            <label htmlFor="gridBarcode1">Barcode</label>
                                                            <input id="gridBarcode1"  type="text" placeholder="Enter Barcode" className="form-input" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridNama1">Nama</label>
                                                            <input id="gridNama1" type="text"  placeholder="Enter Nama" className="form-input" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridNama3">Harga</label>
                                                            <input id="gridNama3"  type="text" placeholder="Enter Nama" className="form-input" />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridQTY1">QTY</label>
                                                            <input id="gridQTY1"  type="text" placeholder="Enter QTY" className="form-input" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-1">
                                                    <div className="flex flex-col gap-4">
                                                        <h1 className="flex justify-start text-lg font-bold">Category</h1>
                                                        <form className="space-y-5 flex flex-wrap">
                                                            {/* Map through categories and generate checkboxes */}
                                                            {dataCategories?.map((category, index) => (
                                                                <div key={category.id} className="flex items-center w-1/2">
                                                                    {' '}
                                                                    {/* Adjust the width based on your layout preference */}
                                                                    <input type="checkbox" id={`category${category.id}`} name="category" className="mr-2" />
                                                                    <label htmlFor={`category${category.id}`} className="mr-8">
                                                                        {category.name_category}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </form>
                                                    </div>

                                                    <div className="flex justify-end items-center mt-8">
                                                        {/* <button type="button" className="btn btn-outline-danger">
                                                            Discard
                                                        </button> */}
                                                        <Link to="/">
                                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                                Repair
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div>
                                                <form className="space-y-5">
                                                    <div>
                                                        <input
                                                            type="textfield"
                                                            placeholder="Masukan Kategori"
                                                            className="form-input"
                                                            name="product_category_name"
                                                            value= "test"
                                                            // onChange={handleChange}
                                                        />
                                                    </div>
                                                </form>
                                            </div> */}
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">List Product Repair </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:mr-auto rtl:ml-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={dataListProductRepair}
                        columns={[
<<<<<<< HEAD
                            { accessor: 'id', title: 'NO', sortable: true },
                            { accessor: 'barcode', title: 'CODE DOCUMENT', sortable: true },
                            { accessor: 'dob', title: 'DATE IN', sortable: true },
                            { accessor: 'qty', title: 'QTY', sortable: true },
                            // { accessor: 'dob', title: 'Tanggal', sortable: true },
                            // { accessor: 'totalMasuk', title: 'Total Masuk', sortable: true },
=======
                            { accessor: 'id', title: 'No', render: (item: GetListProductRepairItem, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'Barcode', render: (item: GetListProductRepairItem) => <span>{item.old_barcode_product}</span> },
                            { accessor: 'firstName', title: 'Nama', render: (item: GetListProductRepairItem) => <span>{item.new_name_product}</span> },
>>>>>>> 26f6c7187c82b4f69946f221bfaaba3c1fbf2ae0
                            {
                                accessor: 'keterangan',
                                title: 'Keterangan',
                                render: (item: GetListProductRepairItem) => {
                                    // Mengonversi teks JSON ke objek
                                    const newQualityData = JSON.parse(item.new_quality);

                                    // Mendapatkan keterangan dari atribut "abnormal"
                                    const keterangan = newQualityData.abnormal;

                                    return <span>{keterangan}</span>;
                                },
                            },
                            // { accessor: 'dob', title: 'Tanggal' },
                            // { accessor: 'totalMasuk', title: 'Total Masuk' },
                            // {
                            //     accessor: 'status',
                            //     title: 'Status',
                            //     sortable: true,
                            //     render: (data: any) => (
                            //         <span
                            //             className={`badge whitespace-nowrap ${
                            //                 data.status === 'Fixed' ? 'bg-success' : data.status === 'Broken' ? 'bg-danger' : data.status === 'Maintenance' ? 'bg-warning' : 'bg-success'
                            //             }`}
                            //         >
                            //             {data.status}
                            //         </span>
                            //     ),
                            // },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: () => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        {/* <Link to="/repair_station/list_repair_product/repair_product/"> */}
                                        <button type="button" className="btn btn-outline-info" onClick={() => handleButtonRepair(selectedItem)}>
                                            REPAIR
                                        </button>
                                        {/* </Link> */}
                                        <button type="button" className="btn btn-outline-danger">
                                            THROWS
                                        </button>
                                        {/* <button type="button" className="btn btn-outline-danger" onClick={() => showAlert(11)}>
                                            DELETE
                                        </button> */}
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p: number) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }: any) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListProductRepair;
