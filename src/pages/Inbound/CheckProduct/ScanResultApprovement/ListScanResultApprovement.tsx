import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { formatRupiah, useDebounce } from '../../../../helper/functions';
import {
    useDeleteFilterProductInputsMutation,
    useDoneCheckAllProductInputMutation,
    useFilterProductInputMutation,
    useGetFilterProductInputQuery,
    useGetListProductInputQuery,
    useDeleteProductInputMutation,
} from '../../../../store/services/producInputApi';

const ListProductInput = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const debounceValue = useDebounce(searchLeftTable);
    const { data, isSuccess, refetch } = useGetListProductInputQuery({ page: leftTablePage, q: debounceValue });
    const filterDataProductInput = useGetFilterProductInputQuery({ page: rightTablePage });
    const [addFilterProductInput, results] = useFilterProductInputMutation();
    const [deletefilterProductInputs, resultsDeleteBundle] = useDeleteFilterProductInputsMutation();
    const [doneCheckAllProductInput, resultsDone] = useDoneCheckAllProductInputMutation();
    const [deleteProductInput, resultsDelete] = useDeleteProductInputMutation();
    const [loadingAdd, setLoadingAdd] = useState<number | null>(null);
    const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
    const [processedItems, setProcessedItems] = useState<number[]>([]);

    const ProductInputs = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.products.data;
        }
    }, [data]);

    const totalProductInputs = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.products;
        }
    }, [data]);

    const filterProductsInput: any = useMemo(() => {
        if (filterDataProductInput.isSuccess) {
            return filterDataProductInput?.data.data.resource.data;
        }
    }, [filterDataProductInput.data, data]);

    const handleAddFilterProduct = async (id: number) => {
        if (loadingAdd === id || processedItems.includes(id)) return;

        setLoadingAdd(id);
        try {
            await addFilterProductInput(id).unwrap();
            setProcessedItems((prevItems) => [...prevItems, id]);
            refetch();
            filterDataProductInput.refetch();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAdd(null);
        }
    };

    const handleDeleteProductInput = debounce(async (id: number) => {
        if (loadingDelete !== null) return;

        setLoadingDelete(id);
        try {
            await deletefilterProductInputs(id).unwrap();
            refetch();
            filterDataProductInput.refetch();
            toast.success('Item berhasil dihapus!');
        } catch (err) {
            console.error(err);
            toast.error('Gagal menghapus item.');
        } finally {
            setLoadingDelete(null);
        }
    }, 300);

    const handleAddLeftTable = (item: any) => {
        handleAddFilterProduct(item.id);
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
            filterDataProductInput.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results, filterDataProductInput.isSuccess]);

    useEffect(() => {
        if (resultsDeleteBundle.isSuccess) {
            toast.success(resultsDeleteBundle?.data.data.message);
            refetch();
            filterDataProductInput.refetch();
        } else if (resultsDeleteBundle.isError) {
            toast.error(resultsDeleteBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsDeleteBundle]);

    useEffect(() => {
        if (!debounceValue) {
            refetch();
            filterDataProductInput.refetch();
        }
    }, [debounceValue]);
    useEffect(() => {
        if (debounceValue) {
            refetch();
            filterDataProductInput.refetch();
        }
    }, [debounceValue]);

    useEffect(() => {
        if (!searchLeftTable) {
            refetch();
            filterDataProductInput.refetch();
        }
    }, [searchLeftTable]);

    const showAlert = async ({ type, id }: { type: any; id?: any }) => {
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
                    title: 'Yakin ingin menyelesaikan semua pengecekan?',
                    text: 'Proses ini tidak bisa dibatalkan',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Selesaikan',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (resultsDone) => {
                    if (resultsDone.isConfirmed) {
                        try {
                            await doneCheckAllProductInput({}).unwrap();
                            refetch();
                            filterDataProductInput.refetch();
                            swalWithBootstrapButtons.fire('Selesai!', 'Semua pengecekan sudah diselesaikan.', 'success');
                        } catch (error) {
                            swalWithBootstrapButtons.fire('Gagal', 'Ada masalah saat menyelesaikan pengecekan.', 'error');
                        }
                    } else if (resultsDone.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Dibatalkan', 'Proses dibatalkan.', 'error');
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
                    title: 'Yakin ingin menhapus item ini?',
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
                        await deleteProductInput(id);
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
    };

    useEffect(() => {
        if (resultsDelete.isSuccess) {
            toast.success(resultsDelete.data.data.message);
            refetch();
        } else if (resultsDelete.isError) {
            const statusRes = 'status' in resultsDelete.error ? resultsDelete.error.status : 0;
            if (statusRes === 403) {
                toast.error('Your role is forbidden to access');
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [resultsDelete]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Product Input</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">List Product Stagging</h1>
            </div>
            <div>
                <div>
                    <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                        <div className="flex md:items-center md:flex-row flex-col gap-2">
                            <button className="btn btn-warning" onClick={() => showAlert({ type: 11 })}>
                                DONE CHECK ALL
                            </button>
                            <button className="btn btn-success">Total : {totalProductInputs?.total}</button>
                        </div>
                        <div className="ltr:ml-auto rtl:mr-auto mx-6">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={searchLeftTable} onChange={(e) => setSearchLeftTable(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={ProductInputs}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: any, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: any) => {
                                            return <span>{item.new_barcode_product ?? item.old_barcode_product}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'firstName',
                                        title: 'Nama Produk',
                                        sortable: true,
                                        width: 220,
                                        render: (item: any) => <p className="truncate">{item.new_name_product}</p>,
                                    },
                                    {
                                        accessor: 'category',
                                        title: 'Kategori',
                                        sortable: true,
                                        render: (item: any) => <span>{item.new_category_product ? item.new_category_product : item.new_tag_product}</span>,
                                    },
                                    {
                                        accessor: 'harga',
                                        title: 'Harga',
                                        sortable: true,
                                        render: (item: any, index: number) => {
                                            let price: string | undefined;
                                            if (item.new_category_product !== null && item.new_category_product !== undefined) {
                                                price = item.new_price_product ?? item.old_price_product;
                                            } else if (item.new_tag_product !== null && item.new_tag_product !== undefined) {
                                                price = item.fixed_price ?? item.new_price_product ?? item.old_price_product;
                                            } else {
                                                price = item.old_price_product;
                                            }

                                            return <span>{price !== undefined ? formatRupiah(price) : '0'}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: any) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                {!processedItems.includes(item.id) && loadingAdd !== item.id && (
                                                    <button type="button" className="btn btn-outline-info" onClick={() => handleAddFilterProduct(item.id)}>
                                                        Add
                                                    </button>
                                                )}
                                                <Link to={`/inbound/check_product/product_input/detail/${item.id}`}>
                                                    <button type="button" className="btn btn-outline-warning">
                                                        Detail
                                                    </button>
                                                </Link>
                                                <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 12, id: item.id })}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.products.total ?? 0}
                                recordsPerPage={data?.data.resource.products.per_page ?? 10}
                                page={leftTablePage}
                                onPageChange={(prevPage) => setLeftTablePage(prevPage)}
                            />
                        </div>
                        <div className="datatables xl:col-span-2">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={filterProductsInput}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: any, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: any) => {
                                            return <span>{item.new_barcode_product ?? item.old_barcode_product}</span>;
                                        },
                                    },
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: any) => <span>{item.new_name_product}</span> },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: any) => (
                                            <div className="flex items-center space-x-2">
                                                {
                                                    <button
                                                        type="button"
                                                        className={`btn btn-outline-danger ${loadingDelete === item.id ? 'cursor-not-allowed' : ''}`}
                                                        onClick={() => handleDeleteProductInput(item.id)}
                                                        disabled={loadingDelete === item.id}
                                                    >
                                                        {loadingDelete === item.id ? 'Processing...' : 'Delete'}
                                                    </button>
                                                }
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={filterDataProductInput.data?.data?.resource?.total ?? 0} // jumlah total data
                                recordsPerPage={filterDataProductInput.data?.data?.resource?.per_page ?? 10} // jumlah data per page
                                page={rightTablePage} // halaman saat ini
                                onPageChange={(prevPage) => setRightTablePage(prevPage)} // handler untuk perubahan halaman

                                // totalRecords={data?.data.resource.total ?? 0}
                                // recordsPerPage={data?.data.resource.per_page ?? 10}
                                // page={rightTablePage}
                                // onPageChange={(prevPage) => setRightTablePage(prevPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListProductInput;
