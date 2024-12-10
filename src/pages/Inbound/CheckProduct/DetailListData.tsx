import { DataTable } from 'mantine-datatable';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import IconNotesEdit from '../../../components/Icon/IconNotesEdit';
import IconArrowForward from '../../../components/Icon/IconArrowForward';
import {
    useChangeBarcodeDocumentMutation,
    useDeleteBarcodeDocumentMutation,
    useDeleteProductOldMutation,
    useDetailProductOldQuery,
    useUserScanDocumentQuery,
} from '../../../store/services/productOldsApi';
import { formatRupiah } from '../../../helper/functions';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';

const DetailListData = () => {
    const { state } = useLocation();
    const [page, setPage] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, refetch } = useDetailProductOldQuery({ codeDocument: state.codeDocument, page });
    const { data: dataScan, refetch: refetchScan } = useUserScanDocumentQuery(state.codeDocument);
    const [deleteProductOld, results] = useDeleteProductOldMutation();
    const [changeBarcodeDocument, { isLoading }] = useChangeBarcodeDocumentMutation();
    const [initBarcode, setInitBarcode] = useState<string>('');
    const [deleteBarcodeDocument] = useDeleteBarcodeDocumentMutation();

    const handleChangeBarcode = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await changeBarcodeDocument({
                code_document: state.codeDocument,
                init_barcode: initBarcode,
            }).unwrap();

            if (result.data.status === true) {
                toast.success(result.data.message);
                // refetch data or perform other actions
            } else {
                toast.error(result);
            }
        } catch (error) {
            toast.error('Terjadi kesalahan');
        }
    };

    const handleDeleteBarcode = async () => {
        try {
            const result = await deleteBarcodeDocument({ code_document: state.codeDocument }).unwrap();
            if (result.data.status === true) {
                toast.success(result.data.message);
                setInitBarcode('');
                refetch();
            } else {
                toast.error(result.data.message);
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat menghapus barcode');
        }
    };

    const handleDeleteConfirmation = async () => {
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
                title: 'Yakin ingin menghapus barcode ini?',
                text: 'Data tidak bisa dikembalikan setelah dihapus',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yakin',
                cancelButtonText: 'Batalkan',
                reverseButtons: true,
                padding: '2em',
            })
            .then(async (result) => {
                if (result.value) {
                    try {
                        const response = await deleteBarcodeDocument({ code_document: state.codeDocument }).unwrap();
                        if (response.data.status === true) {
                            swalWithBootstrapButtons.fire('Deleted!', 'Barcode berhasil dihapus.', 'success');
                            setInitBarcode(''); // Kosongkan nilai initBarcode
                            refetch(); // Jika perlu, refetch data
                        } else {
                            swalWithBootstrapButtons.fire('Error', response.data.message, 'error');
                        }
                    } catch (error) {
                        swalWithBootstrapButtons.fire('Error', 'Terjadi kesalahan saat menghapus barcode', 'error');
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire('Cancelled', 'Barcode tidak jadi dihapus', 'error');
                }
            });
    };

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
                        await deleteProductOld(id);
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail List'));
    });

    const detailProductOlds: any = useMemo(() => {
        if (data?.data.resource !== null) {
            if (data?.data?.resource?.data.data.length !== 0) {
                return data?.data.resource.data.data;
            }
        }
    }, [data]);

    const dataDetailScan: any = useMemo(() => {
        return dataScan?.data.resource.summary;
    }, [dataScan]);

    const dataDetailUser: any[] = useMemo(() => {
        return dataScan?.data.resource.data;
    }, [dataScan]);

    useEffect(() => {
        if (data?.data?.resource?.custom_barcode) {
            setInitBarcode(data?.data?.resource?.custom_barcode);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [data]);

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

    return (
        <div>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
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
                                        <div className="text-lg font-bold">Detail Scan</div>
                                    </div>
                                    <div className="w-full flex items-center rounded border border-sky-400 mb-5">
                                        <div className="flex flex-col w-full px-5 py-2">
                                            <p className="text-sm underline underline-offset-2">Total User</p>
                                            <p className="text-lg font-semibold">{dataDetailScan?.count_user}</p>
                                        </div>
                                        <div className="flex flex-col w-full px-5 py-2 border-l border-sky-400/80">
                                            <p className="text-sm underline underline-offset-2">Total Scan Today</p>
                                            <p className="text-lg font-semibold">{dataDetailScan?.total_scans_today}</p>
                                        </div>
                                        <div className="flex flex-col w-full px-5 py-2 border-l border-sky-400/80">
                                            <p className="text-sm underline underline-offset-2">Total Scan All</p>
                                            <p className="text-lg font-semibold">{dataDetailScan?.total_scans_all}</p>
                                        </div>
                                    </div>
                                    <div className="datatables">
                                        <DataTable
                                            className="whitespace-nowrap table-hover"
                                            records={dataDetailUser}
                                            columns={[
                                                {
                                                    accessor: 'No',
                                                    title: 'No',
                                                    render: (item: any, index: number) => <span>{index + 1}</span>,
                                                },
                                                {
                                                    accessor: 'name',
                                                    title: 'UserName',
                                                    render: (item: any) => <span className="font-semibold">{item.username}</span>,
                                                },
                                                {
                                                    accessor: 'barcode',
                                                    title: 'Total Scan',
                                                    render: (item: any) => <span className="font-semibold">{item.total_scans}</span>,
                                                },
                                                {
                                                    accessor: 'barcode',
                                                    title: 'Date',
                                                    render: (item: any) => <span className="font-semibold">{item.scan_date}</span>,
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="flex justify-end items-center mt-8">
                                        <button type="button" className="btn btn-outline-danger" onClick={() => setIsModalOpen(false)}>
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
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Detail List Data </span>
                </li>
            </ul>
            <div className="panel mt-6">
                <div className="flex flex-wrap w-full justify-start mb-5">
                    <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                        <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                            <IconNotesEdit fill className="w-12 h-12" />
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                                <div className="text-white-dark mr-2">Data Merged :</div>
                                <div className="whitespace-nowrap">{state?.codeDocument}</div>
                            </div>
                            <div className=" items-center text-lg w-full justify-between mb-2">
                                <div className="text-white-dark">BASE DATA : </div>
                                <ul className="space-y-3 list-inside list-disc font-semibold">
                                    <li>{state?.baseDocument}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Form Input Baru */}
                    <div className="border border-gray-500/20 panel xl:w-2/5 lg:w-2/5 sm:w-full rounded-md shadow p-6 pt-12 mt-8 ml-5 relative">
                        <form onSubmit={handleChangeBarcode}>
                            <div className="mb-4">
                                <label htmlFor="codeDocument" className="block text-sm font-medium text-gray-700">
                                    Code Document
                                </label>
                                <input type="text" id="codeDocument" value={state?.codeDocument} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="initBarcode" className="block text-sm font-medium text-gray-700">
                                    Format Barcode
                                </label>
                                <div className="flex items-center">
                                    <input type="text" id="initBarcode" value={initBarcode} onChange={(e) => setInitBarcode(e.target.value)} className="form-input flex-1 mr-2" />
                                    <button type="button" onClick={handleDeleteConfirmation} className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600">
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-primary-dark">
                                Edit Barcode
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <Link to="/inbound/check_product/list_data">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                    <div className="flex gap-4 items-center ml-auto">
                        <button type="button" onClick={() => setIsModalOpen(true)} className=" px-2 btn btn-outline-success">
                            Detail Scan
                        </button>
                        <Link to="/inbound/check_product/multi_check" state={{ codeDocument: state.codeDocument }}>
                            <button type="button" className=" px-2 btn btn-outline-info">
                                <IconArrowForward className="flex mx-2" fill={true} /> Continue
                            </button>
                        </Link>
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Data Proses</h5>
                <div className="datatables">
                    {data?.data.resource !== null && (
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={detailProductOlds}
                            columns={[
                                {
                                    accessor: 'id',
                                    title: 'No',
                                    render: (item: any, index: number) => <span>{(page - 1) * detailProductOlds?.length + (index + 1)}</span>,
                                },
                                {
                                    accessor: 'code_document',
                                    title: 'Nama Data',
                                    render: (item: any) => <span>{item.code_document}</span>,
                                },
                                {
                                    accessor: 'old_barcode_product',
                                    title: 'Nomor Resi',
                                    render: (item: any) => <span>{item.old_barcode_product}</span>,
                                },
                                {
                                    accessor: 'old_name_product',
                                    title: 'Nama Produk',
                                    render: (item: any) => <span className="whitespace-pre-wrap">{item.old_name_product}</span>,
                                },
                                {
                                    accessor: 'old_quantity_product',
                                    title: 'QTY',
                                    render: (item: any) => <span>{item.old_quantity_product}</span>,
                                },
                                {
                                    accessor: 'old_price_product',
                                    title: 'Harga',
                                    render: (item: any) => <span>{formatRupiah(item.old_price_product)}</span>,
                                },
                                {
                                    accessor: 'Aksi',
                                    title: 'Aksi',
                                    render: (item: any) => (
                                        <div className="flex items-center w-max mx-auto gap-6">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={data?.data.resource.data.total ?? 0}
                            recordsPerPage={data?.data.resource.data.per_page ?? 10}
                            page={page}
                            onPageChange={(prevPage) => setPage(prevPage)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailListData;
