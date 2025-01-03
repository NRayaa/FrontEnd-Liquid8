import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { useDeleteApproveDocumentItemMutation, useDeleteApproveMutation, useDeleteDocumentMutation } from '../../../../store/services/checkProduct';
import { CheckDocumentApprovmentItem } from '../../../../store/services/types';
import { Alert } from '../../../../commons';
import { useDoneCheckAllDetailProductStaggingMutation, useGetDetailProductApprovesByDocQuery, useGetDetailProductStaggingApprovesByDocQuery } from '../../../../store/services/categoriesApi';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { useDebounce } from '../../../../helper/functions';

const DetailStaggingProductDocument = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { code_document } = location.state;

    useEffect(() => {
        dispatch(setPageTitle('List Detail Produk'));
    }, [dispatch]);

    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search);
    const { data, isSuccess, refetch, isError } = useGetDetailProductStaggingApprovesByDocQuery({ code_document, p: page, q: searchDebounce });
    const [doneCheckAllProductStagging, results] = useDoneCheckAllDetailProductStaggingMutation();
    const [listsData, setListsData] = useState<CheckDocumentApprovmentItem[] | []>([]);
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
                    title: 'Yakin ingin menyelesaikan semua pengecekan?',
                    text: 'Proses ini tidak bisa dibatalkan',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Selesaikan',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            await doneCheckAllProductStagging({ code_document: id }).unwrap();
                            swalWithBootstrapButtons.fire('Selesai!', 'Semua pengecekan sudah diselesaikan.', 'success');
                        } catch (error) {
                            swalWithBootstrapButtons.fire('Gagal', 'Ada masalah saat menyelesaikan pengecekan.', 'error');
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Dibatalkan', 'Proses dibatalkan.', 'error');
                    }
                });
        }
    };

    // const showAlert = async ({ type, id }: any) => {
    //     if (type === 11) {
    //         const swalWithBootstrapButtons = Swal.mixin({
    //             customClass: {
    //                 confirmButton: 'btn btn-secondary',
    //                 cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
    //                 popup: 'sweet-alerts',
    //             },
    //             buttonsStyling: false,
    //         });
    //         swalWithBootstrapButtons
    //             .fire({
    //                 title: 'Yakin ingin menghapus item ini?',
    //                 text: 'Data tidak bisa di kembalikan setelah di hapus',
    //                 icon: 'warning',
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Yakin',
    //                 cancelButtonText: 'Batalkan',
    //                 reverseButtons: true,
    //                 padding: '2em',
    //             })
    //             .then(async (result) => {
    //                 if (result.value) {
    //                     await doneCheckAllProductStagging(id);
    //                     swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
    //                 } else if (result.dismiss === Swal.DismissReason.cancel) {
    //                     swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
    //                 }
    //             });
    //     }
    //     if (type === 15) {
    //         const toast = Swal.mixin({
    //             toast: true,
    //             position: 'top-end',
    //             showConfirmButton: false,
    //             timer: 3000,
    //         });
    //         toast.fire({
    //             icon: 'success',
    //             title: 'Berhasil Dikirim',
    //             padding: '10px 20px',
    //         });
    //     }
    //     if (type == 20) {
    //         const toast = Swal.mixin({
    //             toast: true,
    //             position: 'top',
    //             showConfirmButton: false,
    //             timer: 3000,
    //         });
    //         toast.fire({
    //             icon: 'success',
    //             title: 'Data Berhasil Ditambah',
    //             padding: '10px 20px',
    //         });
    //     }
    // };

    useEffect(() => {
        if (isSuccess && data.data.status) {
            setListsData(data.data.resource.data);
        }
        refetch();
    }, [data, isSuccess, refetch]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
    }, [results, refetch]);

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
                <h1 className="text-lg font-bold flex justify-start py-4">LIST DETAIL PRODUCT STAGGING</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* add button back */}
                    <div className="flex md:items-center md:flex-row flex-col gap-2">
                        <Link to="/inbound/check_product/product_stagging">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <button className="btn btn-warning" onClick={() => showAlert({ type: 11, id: code_document })}>
                            DONE CHECK ALL
                        </button>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={listsData}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'No',
                                render: (item: CheckDocumentApprovmentItem, index: number) => <span>{(page - 1) * listsData?.length + (index + 1)}</span>,
                            },
                            {
                                accessor: 'Kode Dokumen',
                                title: 'Kode Dokumen',
                                render: (item: CheckDocumentApprovmentItem) => <span className="font-semibold">{item?.code_document}</span>,
                            },
                            {
                                accessor: 'old_barcode_product',
                                title: 'Old Barcode',
                                render: (item: CheckDocumentApprovmentItem) => <span className="font-semibold">{item?.old_barcode_product}</span>,
                            },
                            {
                                accessor: 'new_barcode_product',
                                title: 'New Barcode',
                                render: (item: CheckDocumentApprovmentItem) => <span className="font-semibold">{item?.new_barcode_product}</span>,
                            },
                            {
                                accessor: 'new_name_product',
                                title: 'Name',
                                render: (item: CheckDocumentApprovmentItem) => <span className="font-semibold">{item?.new_name_product}</span>,
                            },
                            {
                                accessor: 'status_document',
                                title: 'Status',
                                render: (item: CheckDocumentApprovmentItem) => (
                                    <span
                                        className={`badge whitespace-nowrap ${
                                            item?.new_status_product === 'display'
                                                ? 'bg-primary'
                                                : item?.new_status_product === 'pending'
                                                ? 'bg-secondary'
                                                : item?.new_status_product === 'In Progress'
                                                ? 'bg-success'
                                                : item?.new_status_product === 'Canceled'
                                                ? 'bg-danger'
                                                : 'bg-primary'
                                        }`}
                                    >
                                        {item?.new_status_product}
                                    </span>
                                ),
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: CheckDocumentApprovmentItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/inbound/check_product/product_stagging_document_Item/detail/${item.id}`} state={{ code_document: item.code_document }}>
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                        {/* <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                            Delete
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

export default DetailStaggingProductDocument;
