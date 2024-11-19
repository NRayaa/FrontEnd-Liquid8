import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDeleteProductNewMutation, useExportToExcelSlowMovingListProductMutation, useGetExpiredProductsQuery } from '../../../../store/services/productNewApi';
import { ProductExpiredItem } from '../../../../store/services/types';
import { formatRupiah, useDebounce } from '../../../../helper/functions';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';

const ListProduct = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search);
    const { data, isSuccess, refetch, isError } = useGetExpiredProductsQuery({ page, q: searchDebounce });
    const [deleteProductNew, results] = useDeleteProductNewMutation();
    const [exportToExcel, { isLoading: isExporting }] = useExportToExcelSlowMovingListProductMutation();

    const expiredProducts: any = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    const handleExportData = async () => {
        try {
            const response = await exportToExcel({}).unwrap();
            const url = response.data.resource;
            const fileName = url.substring(url.lastIndexOf('/') + 1);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success('Data List Product berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data List Product.');
            console.error('Error exporting List Product to Excel:', err);
        }
    };

    const showAlert = async ({ type, id }: { type: number; id: number }) => {
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
                .then(async (result) => {
                    if (result.value) {
                        await deleteProductNew(id);
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

    if (isError && !data?.data.status) {
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
                    <span>Slow Moving</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Product</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">List Data Product</h1>
                <div className="flex items-center justify-between">
                    <button type="button" className="btn btn-primary uppercase px-6" onClick={handleExportData} disabled={isExporting}>
                        {isExporting ? 'Exporting...' : 'Export Data'}
                    </button>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={expiredProducts}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{(page - 1) * expiredProducts?.length + (index + 1)}</span> },
                            { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_barcode_product}</span> },
                            { accessor: 'firstName', title: 'Nama Data', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_name_product}</span> },
                            { accessor: 'category', title: 'Ketegori', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_category_product}</span> },
                            { accessor: 'totalMasuk', title: 'Total Masuk', sortable: true, render: (item: ProductExpiredItem) => <span>{formatRupiah(item.new_price_product)}</span> },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (item: ProductExpiredItem) => {
                                    if (item.new_status_product === 'expired') {
                                        return <span className="badge whitespace-nowrap bg-danger capitalize">Slow Moving</span>;
                                    } else {
                                        return <span className="badge whitespace-nowrap bg-warning capitalize">{item.new_status_product}</span>;
                                    }
                                },
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item: ProductExpiredItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/expired_product/detail_product/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                DETAIL
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            DELETE
                                        </button>
                                    </div>
                                ),
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

export default ListProduct;
