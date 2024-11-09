import { FormEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatRupiah, generateRandomStringFormatBundle, useDebounce } from '../../../helper/functions';
import {
    useDeleteFilterProductStaggingsMutation,
    useDoneCheckAllProductStaggingMutation,
    useExportToExcelListProductStagingMutation,
    useFilterProductStaggingMutation,
    useGetFilterProductStaggingQuery,
    useGetListProductStaggingQuery,
    useToLPRProductStaggingMutation,
} from '../../../store/services/staggingApi';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { Dialog, Tab, Transition } from '@headlessui/react';

const ListProductStagging = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const debounceValue = useDebounce(searchLeftTable);
    const { data, isSuccess, refetch } = useGetListProductStaggingQuery({ page: leftTablePage, q: debounceValue });
    const filterStagging = useGetFilterProductStaggingQuery({ page: rightTablePage });
    const [filterProductStagging, results] = useFilterProductStaggingMutation();
    const [deletefilterProductStaggings, resultsDeleteBundle] = useDeleteFilterProductStaggingsMutation();
    const [doneCheckAllProductStagging, resultsDone] = useDoneCheckAllProductStaggingMutation();
    const [moveToLPR, resultsToLPR] = useToLPRProductStaggingMutation();
    const [loadingAdd, setLoadingAdd] = useState<number | null>(null);
    const [loadingLPR, setLoadingLPR] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
    const [processedItems, setProcessedItems] = useState<number[]>([]);
    const [exportToExcel, { isLoading: isExporting }] = useExportToExcelListProductStagingMutation();
    const [toLPROpen, setToLPROpen] = useState(false);
    const [input, setInput] = useState({
        damaged: '',
        abnormal: '',
        id: '',
    });

    const handleExportData = async () => {
        try {
            const response = await exportToExcel({}).unwrap();
            if (response.data && response.data.status) {
                const fileUrl = response.data.resource;
                const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
                const link = document.createElement('a');
                link.href = fileUrl;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success(response.data.message || 'Export berhasil!');
            } else {
                toast.error(response.data.message || 'Terjadi kesalahan saat mengekspor data.');
            }
        } catch (error) {
            console.error('Error exporting data:', error);
            toast.error('Terjadi kesalahan saat mengekspor data.');
        }
    };

    const productStaggings = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    const totalProductStaggings = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource;
        }
    }, [data]);

    const totalFilterStaggingProducts: any = useMemo(() => {
        if (filterStagging.isSuccess) {
            return filterStagging.data.data.resource;
        }
    }, [filterStagging.data, data]);

    const filterStaggingProducts: any = useMemo(() => {
        if (filterStagging.isSuccess) {
            return filterStagging.data.data.resource.data.data;
        }
    }, [filterStagging.data, data]);

    const handleAddFilterStagging = async (id: number) => {
        if (loadingAdd === id || processedItems.includes(id)) return;

        setLoadingAdd(id);
        try {
            await filterProductStagging(id).unwrap();
            setProcessedItems((prevItems) => [...prevItems, id]);
            refetch();
            filterStagging.refetch();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAdd(null);
        }
    };

    const handleMoveToLPR = async (e: FormEvent, t: 'damaged' | 'abnormal') => {
        e.preventDefault();
        setLoadingLPR(true);
        const body = {
            status: t === 'abnormal' ? 'abnormal' : 'damaged',
            description: t === 'abnormal' ? input.abnormal : input.damaged,
        };
        try {
            await moveToLPR({ id: input.id, body });
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingLPR(false);
        }
    };

    const handleDeleteProductStagging = debounce(async (id: number) => {
        if (loadingDelete !== null) return;

        setLoadingDelete(id);
        try {
            await deletefilterProductStaggings(id).unwrap();
            refetch();
            filterStagging.refetch();
            toast.success('Item berhasil dihapus!');
        } catch (err) {
            console.error(err);
            toast.error('Gagal menghapus item.');
        } finally {
            setLoadingDelete(null);
        }
    }, 300);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
            filterStagging.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results, filterStagging.isSuccess]);

    useEffect(() => {
        if (resultsDeleteBundle.isSuccess) {
            toast.success(resultsDeleteBundle?.data.data.message);
            refetch();
            filterStagging.refetch();
        } else if (resultsDeleteBundle.isError) {
            toast.error(resultsDeleteBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsDeleteBundle]);

    useEffect(() => {
        if (resultsToLPR.isSuccess) {
            toast.success(resultsToLPR?.data.data.message);
            refetch();
            filterStagging.refetch();
            setToLPROpen(false);
        } else if (resultsToLPR.isError) {
            toast.error(resultsToLPR?.data?.data?.message ?? 'Error');
        }
    }, [resultsToLPR]);

    useEffect(() => {
        if (!toLPROpen) {
            setInput({
                abnormal: '',
                damaged: '',
                id: '',
            });
        }
    }, [toLPROpen]);

    useEffect(() => {
        if (!debounceValue) {
            refetch();
            filterStagging.refetch();
        }
    }, [debounceValue]);
    useEffect(() => {
        if (debounceValue) {
            refetch();
            filterStagging.refetch();
        }
    }, [debounceValue]);

    useEffect(() => {
        if (!searchLeftTable) {
            refetch();
            filterStagging.refetch();
        }
    }, [searchLeftTable]);

    const showAlert = async ({ type }: any) => {
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
                            await doneCheckAllProductStagging({}).unwrap();
                            refetch();
                            filterStagging.refetch();
                            swalWithBootstrapButtons.fire('Selesai!', 'Semua pengecekan sudah diselesaikan.', 'success');
                        } catch (error) {
                            swalWithBootstrapButtons.fire('Gagal', 'Ada masalah saat menyelesaikan pengecekan.', 'error');
                        }
                    } else if (resultsDone.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Dibatalkan', 'Proses dibatalkan.', 'error');
                    }
                });
        }
    };

    return (
        <div>
            <Transition appear show={toLPROpen} as={Fragment}>
                <Dialog
                    as="div"
                    open={toLPROpen}
                    onClose={() => {
                        setToLPROpen(false);
                    }}
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-5xl text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between">
                                        <div className="text-lg font-bold">Move Product to List Product Repair</div>
                                    </div>
                                    <Tab.Group>
                                        <div className="mx-10 mb-5 sm:mb-0 mt-10">
                                            <Tab.List className="mt-3 mb-6 flex gap-4 justify-center">
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${
                                                                selected ? 'bg-sky-400 !outline-none' : 'bg-sky-100'
                                                            } -mb-[1px] block rounded text-black p-3.5 py-2 before:inline-block hover:bg-sky-400 hover:text-black`}
                                                        >
                                                            Damaged
                                                        </button>
                                                    )}
                                                </Tab>
                                                <Tab as={Fragment}>
                                                    {({ selected }) => (
                                                        <button
                                                            className={`${
                                                                selected ? 'bg-sky-400 !outline-none' : 'bg-sky-100'
                                                            } -mb-[1px] block rounded text-black p-3.5 py-2 before:inline-block hover:bg-sky-400 hover:text-black`}
                                                        >
                                                            Abnormal
                                                        </button>
                                                    )}
                                                </Tab>
                                            </Tab.List>
                                        </div>
                                        <Tab.Panel>
                                            <div>
                                                <div className="flex items-start pt-5">
                                                    <form onSubmit={(e) => handleMoveToLPR(e, 'damaged')} className="flex-auto">
                                                        <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                                        <textarea
                                                            value={input.damaged}
                                                            onChange={(e) => setInput((prev) => ({ ...prev, damaged: e.target.value }))}
                                                            rows={4}
                                                            className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                                            required
                                                        ></textarea>
                                                        <div className="flex justify-end">
                                                            <button disabled={input.damaged.length === 0 || loadingLPR} type="submit" className="w-full btn btn-info mt-4">
                                                                SEND
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div>
                                                <div className="flex items-start pt-5">
                                                    <form onSubmit={(e) => handleMoveToLPR(e, 'abnormal')} className="flex-auto">
                                                        <h5 className="mb-4 text-xl font-medium">Deskripsi :</h5>
                                                        <textarea
                                                            rows={4}
                                                            value={input.abnormal}
                                                            onChange={(e) => setInput((prev) => ({ ...prev, abnormal: e.target.value }))}
                                                            className="form-textarea ltr:rounded-l-none rtl:rounded-r-none"
                                                            required
                                                        ></textarea>
                                                        <div className="flex justify-end">
                                                            <button disabled={input.abnormal.length === 0 || loadingLPR} type="submit" className="w-full btn btn-info mt-4">
                                                                SEND
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Group>
                                    <div className="flex justify-end items-center mt-8">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setToLPROpen(false)}>
                                            Kembali
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/stagging/list_product_stagging">
                        <span>Stagging</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Product Stagging</span>
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
                            <button className="btn btn-success">Total : {totalProductStaggings?.total}</button>
                            <button className="btn btn-primary" onClick={handleExportData} disabled={isExporting}>
                                {isExporting ? 'Exporting...' : 'Export Data'}
                            </button>
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
                                records={productStaggings}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: any, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: any) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
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
                                                price = item.new_price_product;
                                            } else if (item.new_tag_product !== null && item.new_tag_product !== undefined) {
                                                price = item.fixed_price;
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
                                                    <button type="button" className="btn btn-outline-info" onClick={() => handleAddFilterStagging(item.id)}>
                                                        Add
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        setToLPROpen(true);
                                                        setInput((prev) => ({ ...prev, id: item.id }));
                                                    }}
                                                >
                                                    to LPR
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
                                page={leftTablePage}
                                onPageChange={(prevPage) => setLeftTablePage(prevPage)}
                            />
                        </div>
                        <div className="datatables xl:col-span-2">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={filterStaggingProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: any, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: any) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
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
                                                        onClick={() => handleDeleteProductStagging(item.id)}
                                                        disabled={loadingDelete === item.id}
                                                    >
                                                        {loadingDelete === item.id ? 'Processing...' : 'Delete'}
                                                    </button>
                                                }
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={filterStagging.data?.data?.resource?.data?.total ?? 0} // jumlah total data
                                recordsPerPage={filterStagging.data?.data?.resource?.data?.per_page ?? 10} // jumlah data per page
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

export default ListProductStagging;
