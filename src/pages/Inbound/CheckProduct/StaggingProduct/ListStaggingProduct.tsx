import { DataTable } from 'mantine-datatable';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetDocumentStaggingApprovesQuery, useGetDocumentStagginngApproveProgressQuery } from '../../../../store/services/categoriesApi';
import { useDebounce } from '../../../../helper/functions';
import Swal from 'sweetalert2';
import { useDeleteAllByCodeDocumentMutation } from '../../../../store/services/checkProduct';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';
import { useLazySpvApprovalQuery } from '../../../../store/services/notificationsApi';
import { DocumentApprovmentItem } from '../../../../store/services/types';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';

const ListStaggingProduct = () => {
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [deleteApprove, results] = useDeleteAllByCodeDocumentMutation();
    const searchDebounce = useDebounce(search);
    const { data, refetch, isError, isSuccess } = useGetDocumentStaggingApprovesQuery({ p: page, q: searchDebounce });
    const [spvApproval, resultsApprove] = useLazySpvApprovalQuery();

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
            console.log('RESPONSE', data?.data?.resource)
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
                    <span>Product Stagging</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">LIST PRODUCT STAGGING</h1>
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
                                accessor: 'Total Data In Document',
                                title: 'Total Data In Document',
                                render: (item: DocumentApprovmentItem) => <span className="font-semibold">{item?.riwayat_check?.total_data_in}</span>,
                            },
                            {
                                accessor: 'Status',
                                title: 'Status',
                                render: (item: DocumentApprovmentItem) => <span className="badge whitespace-nowrap bg-primary ">{item?.riwayat_check?.status_approve}</span>,
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: DocumentApprovmentItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/inbound/check_product/product_stagging_document/detail/${item.id}`} state={{ code_document: item?.riwayat_check?.code_document }}>
                                            <button type="button" className="btn btn-outline-info">
                                                Details
                                            </button>
                                        </Link>
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

export default ListStaggingProduct;
