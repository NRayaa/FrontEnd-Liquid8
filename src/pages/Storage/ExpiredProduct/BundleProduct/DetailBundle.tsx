import React from 'react';
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
const DetailBundle = () => {
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

    // const handleCostChange = (e: { target: { value: any } }) => {
    //     const inputValue = e.target.value;
    //     let formatValue = '';

    //     // Remove non-numeric characters
    //     const numValue = inputValue.replace(/\D/g, '');

    //     // Format the number with 'Rp.' prefix
    //     if (numValue !== '') {
    //         formatValue = `Rp. ${parseInt(numValue, 10).toLocaleString('id-ID')}`;
    //     }

    //     setCost(formatValue);
    // };
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
                    <Link to="/storage/expired_product/bundle_product">
                        <span>Expired Product</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create Bundle</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Create Bundle</h1>
            </div>
            <div>
                <form className="w-[400px] mb-4 ">
                    {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                    <div className="flex items-center justify-between ">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode Bundle :
                        </label>
                        <input id="categoryName" disabled type="text" value="LQDF5H012" className=" form-input w-[250px]" required />
                    </div>
                    <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <div className="flex items-center justify-between mb-2 mt-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Bundle :
                        </label>
                        <input id="categoryName" disabled type="text" value="Bandle Otomotif" className=" form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Total Awal :
                        </label>
                        <input id="categoryName" disabled type="text" value="Rp. 100.000" placeholder="Rp" className=" form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Custom Display :
                        </label>
                        <input id="categoryName" disabled type="text" value="Rp. 50.000" placeholder="Rp" className=" form-input w-[250px]" required />
                    </div>
                </form>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div className="datatables panel xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={recordsData}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true },
                                { accessor: 'barcode', title: 'Barcode LQD', sortable: true },
                                { accessor: 'firstName', title: 'Nama Produk', sortable: true },
                                { accessor: 'QTY', title: 'QTY', sortable: true },
                                { accessor: 'totalMasuk', title: 'Harga', sortable: true },
                                // {
                                //     accessor: 'action',
                                //     title: 'Opsi',
                                //     titleClassName: '!text-center',
                                //     render: () => (
                                //         <div className="flex items-center w-max mx-auto gap-6">
                                //             {/* <Link to="/inbound/check_product/multi_check" >
                                //     <button type="button" className="btn btn-outline-success">
                                //         Check
                                //     </button>
                                //     </Link> */}
                                //             {/* <Link to="/storage/expired_product/detail_product/1"> */}
                                //             <button type="button" className="btn btn-outline-info">
                                //                 Add
                                //             </button>
                                //             {/* </Link> */}
                                //             {/* <button type="button" className="btn btn-outline-danger" onClick={() => showAlert(11)}>
                                //             UNBUNDLE
                                //         </button> */}
                                //         </div>
                                //     ),
                                // },
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
        </div>
    );
};

export default DetailBundle;
