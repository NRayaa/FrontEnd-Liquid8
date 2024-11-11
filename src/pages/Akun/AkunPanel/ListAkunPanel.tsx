import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteAccountPanelMutation, useGetListAccountPanelQuery } from '../../../store/services/listAkunApi';
import { GetListRoleItem } from '../../../store/services/types';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';
import Swal from 'sweetalert2';

const ListAkunPanel = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const { data: listAkunPanelData, refetch, isError } = useGetListAccountPanelQuery({ page, q: search });
    const [deleteAccount, results] = useDeleteAccountPanelMutation();

    const listAkunPanel: any = useMemo(() => {
        return listAkunPanelData?.data.resource.data;
    }, [listAkunPanelData]);

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
                        await deleteAccount(id);
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

    if (isError && !listAkunPanelData?.data?.status) {
        return <Alert message={listAkunPanelData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">List Barcode Akun</h5>
                <div className="mb-4 flex justify-end">
                    <div className="flex items-center justify-between">
                        <button type="button" className="btn btn-primary uppercase px-6 mr-4" onClick={() => navigate('/akun/akun/list_akun_panel/add_akun')}>
                            Add Barcode Akun
                        </button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={listAkunPanel}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: any, index: number) => <span>{(page - 1) * listAkunPanel?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'name',
                                title: 'Nama',
                                render: (item: any) => <span className="font-semibold">{item.username}</span>,
                            },
                            {
                                accessor: 'barcode',
                                title: 'Barcode',
                                render: (item: any) => <span className="font-semibold">{item.format_barcode}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: any) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/akun/akun/list_akun_panel/edit_akun/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                Edit
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                        totalRecords={listAkunPanelData?.data.resource.total ?? 0}
                        recordsPerPage={listAkunPanelData?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListAkunPanel;
