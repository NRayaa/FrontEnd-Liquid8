import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDeleteDocumentMutation, useDeleteScanResultMutation, useDocumentsCheckProductsQuery, useListScanResultQuery } from '../../../../store/services/checkProduct';
import { ScanResultItem } from '../../../../store/services/types';
import { formatCurrency, formatDate, useDebounce } from '../../../../helper/functions';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const ListScanResult = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });

    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search);
    const { data, isSuccess, refetch, isError } = useListScanResultQuery({ page: page, search: searchDebounce });
    const [deleteScans, results] = useDeleteScanResultMutation();
    const [listsData, setListsData] = useState<ScanResultItem[] | []>([]);

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
                    title: 'Yakin ingin menghapus item ini?',
                    text: 'Data tidak bisa di kembalikan setelah di hapus',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.value) {
                        await deleteScans(id);
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

    useEffect(() => {
        if (isSuccess && data.data.status) {
            setListsData(data.data.resource.data);
        }
        refetch();
    }, [data, refetch]);

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
    }, [results]);

    if (isError && !data?.data?.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

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
                    <span>Scan Result</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">LIST PRODUCT SCAN </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5 justify-between w-full">
                    <div className="w-full md:w-auto">
                        <input type="text" className="form-input w-full md:w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="md:ml-auto">
                        <Link to="/inbound/check_product/check_scan_result">
                            <button type="button" className="btn btn-primary">
                                Check
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={listsData}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item: ScanResultItem, index: number) => <span>{(page - 1) * listsData?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'product_name',
                                title: 'Nama',
                                render: (item: ScanResultItem) => <span className="font-semibold">{item.product_name}</span>,
                            },
                            {
                                accessor: 'product_price',
                                title: 'Harga',
                                render: (item: ScanResultItem) => <span className="font-semibold">{formatCurrency(item.product_price)}</span>,
                            },
                            {
                                accessor: 'user_id',
                                title: 'User',
                                render: (item: ScanResultItem) => <span className="font-semibold">{item.user?.name}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: ScanResultItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        {/* <Link to="/inbound/check_product/multi_check" state={{ codeDocument: item.code_document }}>
                                            <button type="button" className="btn btn-outline-success">
                                                Check
                                            </button>
                                        </Link>
                                        <Link to="/inbound/check_product/detail_data" state={{ codeDocument: item.code_document, baseDocument: item.base_document }}>
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link> */}
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
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
                    />
                </div>
            </div>
        </div>
    );
};

export default ListScanResult;
