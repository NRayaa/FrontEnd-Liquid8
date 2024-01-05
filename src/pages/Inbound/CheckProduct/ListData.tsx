import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
// import IconBell from '../../../components/Icon/IconBell';
// import IconXCircle from '../../../components/Icon/IconXCircle';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import { Link } from 'react-router-dom';
// import { Dialog, Transition } from '@headlessui/react';
// import IconPlus from '../../../components/Icon/IconPlus';
// import IconNotes from '../../../components/Icon/IconNotes';
import Swal from 'sweetalert2';
import IconSend from '../../../components/Icon/IconSend';
import IconPlus from '../../../components/Icon/IconPlus';
// import IconCircleCheck from '../../../components/Icon/IconCircleCheck';
import IconTrendingUp from '../../../components/Icon/IconTrendingUp';
import Dropdown from '../../../components/Dropdown';
import IconHorizontalDots from '../../../components/Icon/IconHorizontalDots';
import { IRootState } from '../../../store';
import IconEye from '../../../components/Icon/IconEye';
import IconCashBanknotes from '../../../components/Icon/IconCashBanknotes';
import { useDocumentsCheckProductsQuery } from '../../../store/services/checkProduct';
import { CheckProductDocumentItem } from '../../../store/services/types';
import { formatDate } from '../../../helper/functions';
// import * as Yup from 'yup';
// import { Field, Form, Formik } from 'formik';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        status: 'Completed',
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
const ListData = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });

    const [page, setPage] = useState<number>(1);
    const { data, isSuccess } = useDocumentsCheckProductsQuery(page);

    const [search, setSearch] = useState<string>('');
    const [listsData, setListsData] = useState<CheckProductDocumentItem[] | []>([]);

    useEffect(() => {
        if (isSuccess && data.data.message) {
            setListsData(data.data.resource.data);
        }
    }, [data]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Data</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">LIST DATA DOCUMENT </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={listsData}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item, index) => <span>{index + 1}</span>,
                            },
                            {
                                accessor: 'date_document',
                                title: 'Nama Data',
                                render: (item) => <span className="font-semibold">{item.code_document}</span>,
                            },
                            {
                                accessor: 'date_document',
                                title: 'Tanggal',
                                render: (item) => <span className="font-semibold">{formatDate(item.date_document)}</span>,
                            },
                            {
                                accessor: 'total_column_document',
                                title: 'Total Barang',
                                render: (item) => <span className="font-semibold">{formatDate(item.total_column_document)}</span>,
                            },
                            {
                                accessor: 'status_document',
                                title: 'Status',
                                render: (item) => (
                                    <span
                                        className={`badge whitespace-nowrap ${
                                            item.status_document === 'completed'
                                                ? 'bg-primary'
                                                : item.status_document === 'Pending'
                                                ? 'bg-secondary'
                                                : item.status_document === 'In Progress'
                                                ? 'bg-success'
                                                : item.status_document === 'Canceled'
                                                ? 'bg-danger'
                                                : 'bg-primary'
                                        }`}
                                    >
                                        {item.status_document}
                                    </span>
                                ),
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to="/inbound/check_product/multi_check" state={{ codeDocument: item.code_document }}>
                                            <button type="button" className="btn btn-outline-success">
                                                Check
                                            </button>
                                        </Link>
                                        <Link to="/inbound/check_product/detail_data">
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert(11)}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                        totalRecords={listsData.length}
                        recordsPerPage={data?.data.resource.per_page}
                        page={data?.data.resource.current_page}
                        onPageChange={() => setPage((prevPage) => prevPage + 1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListData;
