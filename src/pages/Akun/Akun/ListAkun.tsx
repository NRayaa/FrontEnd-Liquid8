import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteAccountMutation, useExportToExcelListAccountMutation, useGetListAkunQuery } from '../../../store/services/listAkunApi';
import { GetListAkunItem, GetListRoleItem } from '../../../store/services/types';
import { useGetListRoleQuery } from '../../../store/services/listRoleApi';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';

const ListAkun = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const { data: listAkunData, refetch, isError } = useGetListAkunQuery({ page, q: search });
    const { data: listRoleData, refetch: listRefetch } = useGetListRoleQuery(undefined);
    const [deleteAccount, results] = useDeleteAccountMutation();
    const [exportToExcel] = useExportToExcelListAccountMutation();

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

    const handleDeleteAccount = async (id: number) => {
        try {
            await deleteAccount(id);
        } catch (err) {
            console.log(err);
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
                        <button type="button" className="btn btn-primary uppercase px-6" onClick={handleExportData}>
                            Export Data
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
                                accessor: 'role_id',
                                title: 'Role',
                                render: (item: GetListAkunItem) => <span className="font-semibold">{mapRoleIdToName(item.role_id)}</span>,

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
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteAccount(item.id)}>
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
