import { DataTable } from 'mantine-datatable';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDocumentApprovesQuery, useGetDocumentStaggingApprovesQuery } from '../../../../store/services/categoriesApi';
import { DocumentApprovmentItem } from '../../../../store/services/types';
import { useDebounce } from '../../../../helper/functions';
import Swal from 'sweetalert2';
import { useDeleteApproveMutation } from '../../../../store/services/checkProduct';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';
import { useLazySpvApprovalQuery, useLazySpvApprovalStaggingQuery } from '../../../../store/services/notificationsApi';

const ApprovementProductStagging = () => {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [deleteApprove, results] = useDeleteApproveMutation();
    const searchDebounce = useDebounce(search);
    const { data, refetch, isError, isSuccess } = useGetDocumentStaggingApprovesQuery({ p: page, q: searchDebounce });
    const [spvApproval, resultsApprove] = useLazySpvApprovalStaggingQuery();

    const handleApprove = async (id: number) => {
        await spvApproval(id);
    };

    useEffect(() => {
        if (resultsApprove.isSuccess && resultsApprove.data.data.status) {
            refetch();
            toast.success(resultsApprove.data.data.message);
        }
    }, [resultsApprove]);

    const listApproveProduct: any = useMemo(() => {
        if (isSuccess) {
            return data?.data?.resource;
        }
    }, [data]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
    }, [results]);

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
                        await deleteApprove(id);
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

    if (isError && !data?.data?.status) {
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
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Approvment Document Stagging</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">LIST APPROVE DOCUMENT STAGGING</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={listApproveProduct}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item: DocumentApprovmentItem, index: number) => <span>{(page - 1) * listApproveProduct?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'Kode Dokumen',
                                title: 'Kode Dokumen',
                                render: (item: DocumentApprovmentItem) => <span className="font-semibold">{item?.riwayat_check?.code_document}</span>,
                            },
                            {
                                accessor: 'Base Dokumen',
                                title: 'Base Dokumen',
                                render: (item: DocumentApprovmentItem) => <span className="font-semibold">{item?.riwayat_check?.base_document}</span>,
                            },
                            {
                                accessor: 'Total Data In',
                                title: 'Total Data In',
                                render: (item: DocumentApprovmentItem) => <span className="font-semibold">{item?.riwayat_check?.total_data_in}</span>,
                            },
                            {
                                accessor: 'Status',
                                title: 'Status',
                                render: (item: DocumentApprovmentItem) => <span className="badge whitespace-nowrap bg-primary ">{item?.status}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: DocumentApprovmentItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button onClick={() => handleApprove(item.id)} type="button" className="btn btn-outline-success" disabled={item.status === 'done'}>
                                            Approve
                                        </button>
                                        <Link to={`/inbound/check_product/approvment_document_stagging/detail/${item.id}`} state={{ code_document: item?.riwayat_check?.code_document }}>
                                            <button type="button" className="btn btn-outline-info">
                                                Details
                                            </button>
                                        </Link>

                                        {/* <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            Reject
                                        </button> */}
                                    </div>
                                ),
                                textAlignment: 'center',
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

export default ApprovementProductStagging;
