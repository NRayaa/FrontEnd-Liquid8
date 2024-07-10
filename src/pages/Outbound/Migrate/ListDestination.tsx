import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { Link, useNavigate } from 'react-router-dom';
import { GetListDestinationItem } from '../../../store/services/types';
import toast from 'react-hot-toast';
import { Alert } from '../../../commons';
import { useDeleteDestinationMutation, useGetListDestinationQuery } from '../../../store/services/migrateApi';
import Swal from 'sweetalert2';

const ListDestination = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const { data: listDestinationData, refetch, isError } = useGetListDestinationQuery({ page, q: search });
    const [deleteAccount, results] = useDeleteDestinationMutation();

    const listAkun: any = useMemo(() => {
        return listDestinationData?.data?.resource?.data;
    }, [listDestinationData]);

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

    if (isError && !listDestinationData?.data?.status) {
        return <Alert message={listDestinationData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">List Destination</h5>
                <div className="mb-4 flex justify-end">
                    <button type="button" className="btn btn-primary uppercase px-6" onClick={() => navigate('/outbound/migrate/list_destination/add_destination')}>
                        Add Destination
                    </button>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={listAkun}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: GetListDestinationItem, index: number) =><span>{(page - 1) * listAkun?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'name',
                                title: 'Nama Toko',
                                render: (item: GetListDestinationItem) => <span className="font-semibold">{item.shop_name}</span>,
                            },
                            {
                                accessor: 'role_id',
                                title: 'Phone Toko',
                                render: (item: GetListDestinationItem) => <span className="font-semibold">{item.phone_number}</span>,
                            },
                            {
                                accessor: 'name',
                                title: 'Alamat Toko',
                                render: (item: GetListDestinationItem) => <span className="font-semibold">{item.alamat}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: GetListDestinationItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/outbound/migrate/list_destination/edit_destination/${item.id}`}
                                            state={{ shop_name: item.shop_name, phone_number: item.phone_number, alamat: item.alamat }}
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
                        totalRecords={listDestinationData?.data.resource.total ?? 0}
                        recordsPerPage={listDestinationData?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListDestination;
