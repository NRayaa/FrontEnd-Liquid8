import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { formatDate, formatRupiah, useDebounce } from '../../../helper/functions';
import { Alert } from '../../../commons';
import { ProductStaggingItem } from '../../../store/services/types';
import { useApprovementStaggingQuery, useDeleteApprovementStaggingMutation, useDoneCheckAllApprovementStaggingMutation } from '../../../store/services/staggingApi';

const ListApprovementStagging = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const debounceValue = useDebounce(search);
    const { data, isError, refetch, isSuccess } = useApprovementStaggingQuery({ page, q: debounceValue });
    const [doneCheckAllApprovementStagging, results] = useDoneCheckAllApprovementStaggingMutation();
    const [deleteApprovementStagging, resultsDelete] = useDeleteApprovementStaggingMutation();

    const showAlert = async ({ type, id }: any) => {
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
                    title: 'Yakin ingin menyelesaikan cek ini?',
                    text: 'Data tidak bisa di kembalikan setelah di selesaikan',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.value) {
                        await doneCheckAllApprovementStagging({});
                        refetch();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
        if (type === 12) {
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
                    title: 'Yakin ingin menghapus item ini?',
                    text: 'Data tidak bisa di kembalikan setelah di hapus',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (resultsDelete) => {
                    if (resultsDelete.value) {
                        await deleteApprovementStagging(id);
                        refetch();
                    } else if (resultsDelete.dismiss === Swal.DismissReason.cancel) {
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

    const productNewData = useMemo(() => {
        return data?.data.resource.data;
    }, [data]);

    const TotalProductNewData = useMemo(() => {
        return data?.data.resource;
    }, [data]);

    useEffect(() => {
        refetch();
    }, [page, debounceValue, refetch]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            const statusRes = 'status' in results.error ? results.error.status : 0;
            if (statusRes === 403) {
                toast.error('Your role is forbidden to access');
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [results, refetch]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/stagging/list_approvement_stagging">
                        <span>Stagging</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Approvement Stagging</span>
                </li>
            </ul>{' '}
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">List Approvement Stagging</h5>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex md:items-center md:flex-row flex-col gap-2">
                        <button className="btn btn-warning" onClick={() => showAlert({ type: 11 })}>
                            DONE CHECK ALL
                        </button>
                        <label htmlFor="total" className="px-4 py-2 mt-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark">
                            Total : {TotalProductNewData?.total}
                        </label>
                    </div>
                    <div className="relative w-[220px] ms-auto mb-4">
                        <input
                            type="text"
                            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                            <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                        <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        records={productNewData}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: ProductStaggingItem, index: number) => <span>{(page - 1) * productNewData?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'new barcode product',
                                title: 'NEW BARCODE',
                                render: (item: ProductStaggingItem) => <span className="font-semibold">{item.new_barcode_product}</span>,
                            },
                            {
                                accessor: 'old barcode product',
                                title: 'PRODUCT NAME',
                                render: (item: ProductStaggingItem) => <span className="font-semibold">{item.new_name_product}</span>,
                            },
                            {
                                accessor: 'New Category Product',
                                title: 'NEW CATEGORY',
                                render: (item: ProductStaggingItem) => <span className="font-semibold">{item.new_category_product}</span>,
                            },
                            {
                                accessor: 'New Price Product',
                                title: 'NEW PRICE',
                                render: (item: ProductStaggingItem) => <span className="font-semibold">{formatRupiah(item.new_price_product ?? '0')}</span>,
                            },
                            {
                                accessor: 'new date in product',
                                title: 'NEW DATE',
                                render: (item: ProductStaggingItem) => <span className="font-semibold">{formatDate(item.new_date_in_product)}</span>,
                            },
                            {
                                accessor: 'status_document',
                                title: 'Status',
                                render: (item) => (
                                    <button type="button" className="rounded-xl btn-sm px-4 bg-green-500 uppercase text-white">
                                        {item.new_status_product}
                                    </button>
                                ),
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: ProductStaggingItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/stagging/approvement_stagging/detail/${item.id}`} state={{ id: item.id }}>
                                            <button type="button" className="btn btn-outline-info" disabled={item.new_status_product.toLowerCase() === 'not sale'}>
                                                Detail
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 12, id: item.id })}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                        totalRecords={data?.data.resource.total ?? 0}
                        recordsPerPage={data?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                        minHeight={200}
                    />
                </div>
            </div>
        </>
    );
};

export default ListApprovementStagging;
