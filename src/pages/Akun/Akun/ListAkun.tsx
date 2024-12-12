import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteAccountMutation, useExportToExcelListAccountMutation, useGetListAkunQuery } from '../../../store/services/listAkunApi';
import { GetListAkunItem, GetListRoleItem } from '../../../store/services/types';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';
import Swal from 'sweetalert2';

const ListAkun = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const { data: listAkunData, refetch, isError } = useGetListAkunQuery({ page, q: search });
    const { data: listRoleData, refetch: listRefetch } = useGetListRoleQuery(undefined);
    const [deleteAccount, results] = useDeleteAccountMutation();
    const [exportToExcel, { isLoading: isExporting }] = useExportToExcelListAccountMutation();

    const listAkun: any = useMemo(() => {
        return listAkunData?.data.resource.data;
    }, [listAkunData]);

    const dataListRole: GetListRoleItem[] = useMemo(() => {
        return (listRoleData?.data?.resource || []) as GetListRoleItem[];
    }, [listRoleData]);

    const mapRoleIdToName = (roleId: string): string => {
        const roleIdNumber = parseInt(roleId, 10);
        const role = dataListRole.find((r) => r.id === roleIdNumber);
        return role?.role_name || 'Unknown Role';
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
            toast.success('Data list akun berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data list akun.');
            console.error('Error exporting list akun to Excel:', err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            listRefetch();
            refetch();
        } else if (results.isError) {
            toast.error(results.data?.data?.message);
        }
        refetch();
        listRefetch();
    }, [results]);

    if (isError && !listAkunData?.data?.status) {
        return <Alert message={listAkunData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">List Akun</h5>
                <div className="mb-4 flex justify-end">
                    <div className="flex items-center justify-between">
                        <button type="button" className="btn btn-primary uppercase px-6 mr-4" onClick={() => navigate('/akun/akun/list_akun/add_akun')}>
                            Add Akun
                        </button>
                        <button type="button" className="btn btn-primary uppercase px-6" onClick={handleExportData} disabled={isExporting}>
                            {isExporting ? 'Exporting...' : 'Export Data'}
                        </button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={listAkun}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: GetListAkunItem, index: number) => <span>{(page - 1) * listAkun?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'name',
                                title: 'Nama',
                                render: (item: GetListAkunItem) => <span className="font-semibold">{item.name}</span>,
                            },
                            {
                                accessor: 'role.role_name',
                                title: 'Role',
                                render: (item: any) => <span className="font-semibold">{item.role.role_name}</span>,

                                // render: (item: GetListAkunItem) => <span className="font-semibold">{item.role_id}</span>,
                            },
                            {
                                accessor: 'format_barcode_name',
                                title: 'Format',
                                render: (item: any) => <span className="font-semibold">{item.format_barcode_name ?? '-'}</span>,

                                // render: (item: GetListAkunItem) => <span className="font-semibold">{item.role_id}</span>,
                            },
                            {
                                accessor: 'total_scans',
                                title: 'Total Scan',
                                render: (item: any) => <span className="font-semibold">{item.total_scans ?? '-'}</span>,

                                // render: (item: GetListAkunItem) => <span className="font-semibold">{item.role_id}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: GetListAkunItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/akun/akun/list_akun/edit_akun/${item.id}`}
                                            state={{ name: item.name, username: item.username, email: item.email, role_id: item.role_id, password: item.password }}
                                        >
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
                        totalRecords={listAkunData?.data.resource.total ?? 0}
                        recordsPerPage={listAkunData?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListAkun;
