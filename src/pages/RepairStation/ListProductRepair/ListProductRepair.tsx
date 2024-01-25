import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../store';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        category: 'Fashion',
        barcode: 'LQDF5H012',
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
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Otomotif',
        barcode: 'LQDF5H013',
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
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Accessories',
        barcode: 'LQDF6L020',
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
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'NO', sortable: true },
                            { accessor: 'barcode', title: 'CODE DOCUMENT', sortable: true },
                            { accessor: 'dob', title: 'DATE IN', sortable: true },
                            { accessor: 'qty', title: 'QTY', sortable: true },
                            // { accessor: 'dob', title: 'Tanggal', sortable: true },
                            // { accessor: 'totalMasuk', title: 'Total Masuk', sortable: true },
                            {
                                accessor: 'status',
                                title: 'STATUS',
                                sortable: true,
                                render: (data: any) => (
                                    <span
                                        className={`badge whitespace-nowrap ${
                                            data.status === 'Fixed'
                                                ? 'bg-success'
                                                : data.status === 'Broken'
                                                ? 'bg-danger'
                                                : data.status === 'Maintenance'
                                                ? 'bg-warning'
                                                : 'bg-success'
                                        }`}
                                    >
                                        {data.status}
                                    </span>
                                ),
                            },
                            {
                                accessor: 'action',
                                title: 'OPSI',
                                titleClassName: '!text-center',
                                render: () => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to="/repair_station/list_repair_product/repair_product/">
                                            <button type="button" className="btn btn-outline-info">
                                                REPAIR
                                            </button>
                                        </Link>
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
