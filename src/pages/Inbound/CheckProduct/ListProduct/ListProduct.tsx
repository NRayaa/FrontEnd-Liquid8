import { DataTable } from 'mantine-datatable';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDocumentApproveProgressQuery } from '../../../../store/services/categoriesApi';
import { useDebounce } from '../../../../helper/functions';
import Swal from 'sweetalert2';
import { useDeleteAllByCodeDocumentMutation, usePartialStagingMutation } from '../../../../store/services/checkProduct';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';
import { useLazySpvApprovalQuery } from '../../../../store/services/notificationsApi';
import { DocumentApprovmentProgressItem } from '../../../../store/services/types';

const ListProductApprove = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [deleteApprove, results] = useDeleteAllByCodeDocumentMutation();
    const searchDebounce = useDebounce(search);
    const { data, refetch, isError, isSuccess } = useGetDocumentApproveProgressQuery({ p: page, q: searchDebounce });
    const [spvApproval, resultsApprove] = useLazySpvApprovalQuery();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const [partialStaging] = usePartialStagingMutation();

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
            return data?.data?.resource?.data;
        }
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

    const handleToPartialStaging = async (codeDocument: string) => {
        setLoadingStates((prev) => ({ ...prev, [codeDocument]: true }));
        try {
            const response = await partialStaging(codeDocument).unwrap();
            toast.success(response?.data?.message || 'Successfully moved to partial staging');
            refetch();
        } catch (error) {
            toast.error('Failed to move to partial staging');
        } finally {
            setLoadingStates((prev) => ({ ...prev, [codeDocument]: false }));
        }
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
                        await deleteApprove(id);
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
                    <span>Approvment Product</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">LIST APPROVE PRODUCT</h1>
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
                                render: (item: DocumentApprovmentProgressItem, index: number) => <span>{(page - 1) * listApproveProduct?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'Kode Dokumen',
                                title: 'Kode Dokumen',
                                render: (item: DocumentApprovmentProgressItem) => <span className="font-semibold">{item?.code_document}</span>,
                            },
                            {
                                accessor: 'Base Dokumen',
                                title: 'Base Dokumen',
                                render: (item: DocumentApprovmentProgressItem) => <span className="font-semibold">{item?.base_document}</span>,
                            },
                            {
                                accessor: 'Total Data In Document',
                                title: 'Total Data In Document',
                                render: (item: DocumentApprovmentProgressItem) => <span className="font-semibold">{item?.total_column_in_document}</span>,
                            },
                            {
                                accessor: 'Status',
                                title: 'Status',
                                render: (item: DocumentApprovmentProgressItem) => <span className="badge whitespace-nowrap bg-primary ">{item?.status_document}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: DocumentApprovmentProgressItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button
                                            type="button"
                                            className={`btn btn-outline-success ${loadingStates[item.code_document] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={() => handleToPartialStaging(item.code_document)}
                                            disabled={loadingStates[item.code_document]}
                                        >
                                            {loadingStates[item.code_document] ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                'To Partial Staging'
                                            )}
                                        </button>

                                        <Link to={`/inbound/check_product/product_approve_document/detail/${item.id}`} state={{ code_document: item?.code_document }}>
                                            <button type="button" className="btn btn-outline-info">
                                                Details
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.code_document })}>
                                            Delete
                                        </button>
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

export default ListProductApprove;
