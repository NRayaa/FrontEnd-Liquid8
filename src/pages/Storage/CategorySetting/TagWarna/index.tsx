import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../../../components';
import { DataTable } from 'mantine-datatable';
import { useDeleteColorTag2Mutation, useDeleteColorTagMutation, useGetAllColorTag2Query, useGetAllColorTagQuery, useUpdateColorTagMutation } from '../../../../store/services/colorTagApi';
import { ColorTagItem } from '../../../../store/services/types';
import IconPlus from '../../../../components/Icon/IconPlus';
import { formatRupiah, useDebounce } from '../../../../helper/functions';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Alert } from '../../../../commons';
import { Tab } from '@headlessui/react';

const TagWarna = () => {
    const [page, setPage] = useState<number>(1);
    const [page2, setPage2] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search);
    const [search2, setSearch2] = useState<string>('');
    const searchDebounce2 = useDebounce(search2);
    const { data, refetch, isError } = useGetAllColorTagQuery({ page, q: searchDebounce });
    const [deleteColorTag, deleteResults] = useDeleteColorTagMutation();
    const { data: data2, refetch: refetch2, isError: isError2 } = useGetAllColorTag2Query({ page, q: searchDebounce });
    const [deleteColorTag2, deleteResults2] = useDeleteColorTag2Mutation();

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
                        await deleteColorTag(id);
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
        if (type === 12) {
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
                        await deleteColorTag2(id);
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

    const dataColorTag: any = useMemo(() => {
        return data?.data.resource;
    }, [data]);
    const dataColorTag2: any = useMemo(() => {
        return data2?.data.resource;
    }, [data2]);

    useEffect(() => {
        refetch();
    }, [data, refetch]);
    useEffect(() => {
        refetch2();
    }, [data2, refetch2]);

    useEffect(() => {
        if (deleteResults.isSuccess) {
            toast.success(deleteResults.data.data.message);
            refetch();
        } else if (deleteResults.isError) {
            const statusRes = 'status' in deleteResults.error ? deleteResults.error.status : 0;
            if (statusRes === 403) {
                toast.error('Your role is forbidden to access');
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [deleteResults]);
    useEffect(() => {
        if (deleteResults2.isSuccess) {
            toast.success(deleteResults2.data.data.message);
            refetch();
        } else if (deleteResults2.isError) {
            const statusRes = 'status' in deleteResults2.error ? deleteResults2.error.status : 0;
            if (statusRes === 403) {
                toast.error('Your role is forbidden to access');
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [deleteResults2]);

    if (isError && !data?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }
    if (isError2 && !data2?.data.status) {
        return <Alert message={data?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/" current="Tag Warna" />
            <Tab.Group>
                <Tab.List className="w-full flex items-center justify-end pt-5 gap-3">
                    <Tab as={Fragment}>{({ selected }) => <button className={`${selected ? 'bg-sky-300' : 'bg-gray-200'} px-5 py-2 rounded-full font-bold`}>WMS</button>}</Tab>
                    <Tab as={Fragment}>{({ selected }) => <button className={`${selected ? 'bg-sky-300' : 'bg-gray-200'} px-5 py-2 rounded-full font-bold`}>APK</button>}</Tab>
                </Tab.List>
                <Tab.Panel>
                    <div className="panel mt-6 min-h-[450px]">
                        <h5 className="font-semibold text-lg dark:text-white-light mb-5">Tag Warna WMS</h5>
                        <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                            <div>
                                <Link to="/storage/categorysetting/tag_warna/add" state={{ type: 1 }}>
                                    <button className="btn btn-outline-info">
                                        <IconPlus />
                                        Create
                                    </button>
                                </Link>
                            </div>
                            <div className="ltr:ml-auto rtl:mr-auto mx-6">
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="datatables panel xl:col-span-2">
                            <DataTable
                                records={dataColorTag}
                                columns={[
                                    {
                                        accessor: 'id',
                                        title: 'No',
                                        render: (item: ColorTagItem, index: number) => <span>{(page - 1) * dataColorTag?.length + (index + 1)}</span>,
                                    },
                                    {
                                        accessor: 'Tag Warna',
                                        title: 'Tag Warna',
                                        render: (item: ColorTagItem) => <div className="w-[19px] h-[21px]" style={{ backgroundColor: item.hexa_code_color }}></div>,
                                    },
                                    {
                                        accessor: 'Min Price',
                                        title: 'Min Price',
                                        render: (item: ColorTagItem) => <span>{formatRupiah(item.min_price_color)}</span>,
                                    },
                                    {
                                        accessor: 'Fixed Price',
                                        title: 'Fixed Price',
                                        render: (item: ColorTagItem) => <span>{formatRupiah(item.fixed_price_color)}</span>,
                                    },
                                    {
                                        accessor: 'Max Price',
                                        title: 'Max Price',
                                        render: (item: ColorTagItem) => <span>{formatRupiah(item.max_price_color)}</span>,
                                    },
                                    {
                                        accessor: 'Aksi',
                                        title: 'Aksi',
                                        render: (item: ColorTagItem) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                <Link
                                                    to={`/storage/categorysetting/tag_warna/${item.id}`}
                                                    state={{
                                                        type: 1,
                                                        hexa_code_color: item.hexa_code_color,
                                                        name_color: item.name_color,
                                                        min_price_color: item.min_price_color,
                                                        max_price_color: item.max_price_color,
                                                        fixed_price_color: item.fixed_price_color,
                                                    }}
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
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
                                page={page}
                                onPageChange={(prevPage) => setPage(prevPage)}
                            />
                        </div>
                    </div>
                </Tab.Panel>
                <Tab.Panel>
                    <div className="panel mt-6 min-h-[450px]">
                        <h5 className="font-semibold text-lg dark:text-white-light mb-5">Tag Warna APK</h5>
                        <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                            <div>
                                <Link to="/storage/categorysetting/tag_warna/add" state={{ type: 2 }}>
                                    <button className="btn btn-outline-info">
                                        <IconPlus />
                                        Create
                                    </button>
                                </Link>
                            </div>
                            <div className="ltr:ml-auto rtl:mr-auto mx-6">
                                <input type="text" className="form-input w-auto" placeholder="Search..." value={search2} onChange={(e) => setSearch2(e.target.value)} />
                            </div>
                        </div>
                        <div className="datatables panel xl:col-span-2">
                            <DataTable
                                records={dataColorTag2}
                                columns={[
                                    {
                                        accessor: 'id',
                                        title: 'No',
                                        render: (item: ColorTagItem, index: number) => <span>{(page - 1) * dataColorTag?.length + (index + 1)}</span>,
                                    },
                                    {
                                        accessor: 'Tag Warna',
                                        title: 'Tag Warna',
                                        render: (item: ColorTagItem) => <div className="w-[19px] h-[21px]" style={{ backgroundColor: item.hexa_code_color }}></div>,
                                    },
                                    {
                                        accessor: 'Min Price',
                                        title: 'Min Price',
                                        render: (item: ColorTagItem) => <span>{formatRupiah(item.min_price_color)}</span>,
                                    },
                                    {
                                        accessor: 'Fixed Price',
                                        title: 'Fixed Price',
                                        render: (item: ColorTagItem) => <span>{formatRupiah(item.fixed_price_color)}</span>,
                                    },
                                    {
                                        accessor: 'Max Price',
                                        title: 'Max Price',
                                        render: (item: ColorTagItem) => <span>{formatRupiah(item.max_price_color)}</span>,
                                    },
                                    {
                                        accessor: 'Aksi',
                                        title: 'Aksi',
                                        render: (item: ColorTagItem) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                <Link
                                                    to={`/storage/categorysetting/tag_warna/${item.id}`}
                                                    state={{
                                                        type: 2,
                                                        hexa_code_color: item.hexa_code_color,
                                                        name_color: item.name_color,
                                                        min_price_color: item.min_price_color,
                                                        max_price_color: item.max_price_color,
                                                        fixed_price_color: item.fixed_price_color,
                                                    }}
                                                >
                                                    <button type="button" className="btn btn-outline-info">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 12, id: item.id })}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                        textAlignment: 'center',
                                    },
                                ]}
                                totalRecords={data2?.data.resource.total ?? 0}
                                recordsPerPage={data2?.data.resource.per_page ?? 10}
                                page={page2}
                                onPageChange={(prevPage) => setPage2(prevPage)}
                            />
                        </div>
                    </div>
                </Tab.Panel>
            </Tab.Group>
        </>
    );
};

export default TagWarna;
