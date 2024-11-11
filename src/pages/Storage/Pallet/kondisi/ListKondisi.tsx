import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useDebounce } from '../../../../helper/functions';
import { useDeleteBuyerMutation, useExportToExcelBuyerMutation, useGetListBuyerQuery } from '../../../../store/services/buyerApi';
import { Alert } from '../../../../commons';
import { BreadCrumbs } from '../../../../components';
import { useDeleteKondisiMutation, useGetListKondisiQuery } from '../../../../store/services/palletApi';
import { GetListKondisiItem } from '../../../../store/services/types';

const ListKondisi = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search);
    const { data, refetch, isError } = useGetListKondisiQuery({ page, q: searchDebounce });
    const [deleteKondisi, results] = useDeleteKondisiMutation();
    const [exportToExcel] = useExportToExcelBuyerMutation();

    const listBuyer: any = useMemo(() => {
        return data?.data.resource.data;
    }, [data]);

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
                        await deleteKondisi(id);
                        refetch();
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
            toast.success('Data buyer berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data buyer.');
            console.error('Error exporting buyer to Excel:', err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            refetch();
            toast.success(results.data.data.message);
        } else if (results.isError) {
            const statusRes = 'status' in results.error ? results.error.status : 0;
            if (statusRes === 403) {
                toast.error('Your role is forbidden to access');
            } else {
                toast.error('Something went wrong');
            }
        }
        refetch();
    }, [results]);

    if (isError && !data?.data?.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <BreadCrumbs base="Home" basePath="/" current="Kondisi" />
            <div className="panel mt-6">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">List Kondisi</h5>
                <div className="flex items-center justify-between mb-4">
                    <div className="relative w-1/2">
                        <input
                            type="text"
                            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="button" className="btn btn-primary uppercase px-6 mr-4" onClick={() => navigate('/storage/kondisi/create_kondisi')}>
                            Add Kondisi
                        </button>
                        {/* <button type="button" className="btn btn-primary uppercase px-6" onClick={handleExportData}>
                            Export Data
                        </button> */}
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={listBuyer}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: GetListKondisiItem, index: number) => <span>{(page - 1) * listBuyer.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'condition_name',
                                title: 'Nama',
                                render: (item: GetListKondisiItem) => <span className="font-semibold">{item.condition_name}</span>,
                            },
                            {
                                accessor: 'condition_slug',
                                title: 'Slug',
                                render: (item: GetListKondisiItem) => <span className="font-semibold">{item.condition_slug}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Detail',
                                titleClassName: '!text-center',
                                render: (item: GetListKondisiItem) => (
                                    <div className="flex items-center w-max mx-auto gap-2">
                                        <Link
                                            to={`/storage/kondisi/detail_kondisi/${item.id}`}
                                            state={{
                                                condition_name: item.condition_name,
                                                condition_slug: item.condition_slug,
                                            }}
                                        >
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            Delete
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

export default ListKondisi;
