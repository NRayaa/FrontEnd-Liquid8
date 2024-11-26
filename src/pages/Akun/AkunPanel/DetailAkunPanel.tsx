import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Fragment, useEffect, useMemo, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteAccountBarcodePanelMutation, useDeleteAccountPanelMutation, useShowAccountPanelQuery } from '../../../store/services/listAkunApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const DetailAkunPanel = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const { data: detail, refetch } = useShowAccountPanelQuery(params.id);
    const [deleteUser, results] = useDeleteAccountBarcodePanelMutation();
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [scanDetail, setScanDetail] = useState<any[]>([]);

    const listAkunDetail: any = useMemo(() => {
        return detail?.data.resource;
    }, [detail]);

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
                        await deleteUser(id);
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

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
        refetch();
    }, [results]);

    if (results.isError && !listAkunDetail?.data?.status) {
        return <Alert message={listAkunDetail?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <Transition appear show={isAccountOpen} as={Fragment}>
                <Dialog
                    as="div"
                    open={isAccountOpen}
                    onClose={() => {
                        setIsAccountOpen(false);
                        setScanDetail([]);
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
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between mb-5">
                                        <div className="text-lg font-bold">Detail User Scan</div>
                                    </div>
                                    <div className="datatables">
                                        <DataTable
                                            className="whitespace-nowrap table-hover"
                                            records={scanDetail}
                                            columns={[
                                                {
                                                    accessor: 'No',
                                                    title: 'No',
                                                    render: (item: any, index: number) => <span>{index + 1}</span>,
                                                },
                                                {
                                                    accessor: 'name',
                                                    title: 'Tanggal',
                                                    render: (item: any) => <span className="font-semibold">{item.scan_date}</span>,
                                                },
                                                {
                                                    accessor: 'name',
                                                    title: 'Scan',
                                                    render: (item: any) => <span className="font-semibold">{item.total_scans}</span>,
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div className="flex justify-end items-center mt-8">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => {
                                                setIsAccountOpen(false);
                                                setScanDetail([]);
                                            }}
                                        >
                                            Kembali
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <div className="panel mt-6">
                <div className="w-full flex justify-between items-center  mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Detail Barcode Akun</h5>
                    <Link to="/akun/akun/list_akun_panel">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                </div>
                <div className="w-full flex items-center rounded border border-sky-400 mb-5">
                    <div className="flex flex-col w-full px-5 py-2">
                        <p className="text-sm underline underline-offset-2">Barcode</p>
                        <p className="text-lg font-semibold">{listAkunDetail?.format}</p>
                    </div>
                    <div className="flex flex-col w-full px-5 py-2 border-l border-sky-400/80">
                        <p className="text-sm underline underline-offset-2">Total User</p>
                        <p className="text-lg font-semibold">{listAkunDetail?.total_user}</p>
                    </div>
                    <div className="flex flex-col w-full px-5 py-2 border-l border-sky-400/80">
                        <p className="text-sm underline underline-offset-2">Total Scan</p>
                        <p className="text-lg font-semibold">{listAkunDetail?.total_scan}</p>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={listAkunDetail?.users}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: any, index: number) => <span>{(page - 1) * listAkunDetail?.users?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'name',
                                title: 'UserName',
                                render: (item: any) => <span className="font-semibold">{item.username}</span>,
                            },
                            {
                                accessor: 'barcode',
                                title: 'Scan Today',
                                render: (item: any) => <span className="font-semibold">{item.scan_today}</span>,
                            },
                            {
                                accessor: 'barcode',
                                title: 'Total Scan',
                                render: (item: any) => <span className="font-semibold">{item.total_scan}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: any) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsAccountOpen(true);
                                                setScanDetail(item.user_scans);
                                            }}
                                            className="btn btn-outline-info"
                                        >
                                            Detail
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default DetailAkunPanel;
