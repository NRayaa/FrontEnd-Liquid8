import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatRupiah, useDebounce } from '../../../helper/functions';
import { ProductExpiredItem } from '../../../store/services/types';
import {
    useDeleteFilterProductBklsMutation,
    useFilterProductBklMutation,
    useGetBklListQuery,
    useGetDisplayExpiredQuery,
    useGetFilterProductBklQuery,
    useSendToBklMutation,
} from '../../../store/services/bklApi';

const AddBkl = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const debounceValue = useDebounce(searchLeftTable);
    const { data, isSuccess, refetch } = useGetDisplayExpiredQuery({ page: leftTablePage, q: debounceValue });
    const filterBkls = useGetFilterProductBklQuery(rightTablePage);
    const [filterProductBkl, results] = useFilterProductBklMutation();
    const [deleteFilterProductBkls, resultsDeleteBkl] = useDeleteFilterProductBklsMutation();
    const [sendToBkl, { isLoading: isSending }] = useSendToBklMutation();
    const navigate = useNavigate();

    const handleSendBkl = async () => {
        const bundleData = {};

        try {
            const response = await sendToBkl(bundleData).unwrap();
            toast.success(response.data.message);
            refetch();
            filterBkls.refetch();
        } catch (error) {
            toast.error('Error sending BKL');
        }
    };

    const expiredProducts = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    const filterBklsProducts: any = useMemo(() => {
        if (filterBkls.isSuccess) {
            return filterBkls.data.data.resource.data;
        }
    }, [filterBkls.data, data]);

    const handleAddFilterBkl = async (id: number) => {
        try {
            await filterProductBkl(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteProductBkl = async (id: number) => {
        try {
            await deleteFilterProductBkls(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddLeftTable = (item: ProductExpiredItem) => {
        handleAddFilterBkl(item.id);
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
            filterBkls.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results, filterBkls.isSuccess]);

    useEffect(() => {
        if (resultsDeleteBkl.isSuccess) {
            toast.success(resultsDeleteBkl?.data.data.message);
            refetch();
            filterBkls.refetch();
        } else if (resultsDeleteBkl.isError) {
            toast.error(resultsDeleteBkl?.data?.data?.message ?? 'Error');
        }
    }, [resultsDeleteBkl]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/expired_product/list_bkl">
                        <span>List BKL</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Add BKL</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Add BKL</h1>
            </div>
            <div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={searchLeftTable} onChange={(e) => setSearchLeftTable(e.target.value)} />
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <button className="btn btn-outline-info" onClick={handleSendBkl} disabled={isSending}>
                            Send BKL
                        </button>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={expiredProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: ProductExpiredItem) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'firstName',
                                        title: 'Nama Produk',
                                        sortable: true,
                                        width: 220,
                                        render: (item: ProductExpiredItem) => <p className="truncate">{item.new_name_product}</p>,
                                    },
                                    {
                                        accessor: 'category',
                                        title: 'Kategori',
                                        sortable: true,
                                        render: (item: ProductExpiredItem) => <span>{item.new_category_product ? item.new_category_product : item.new_tag_product}</span>,
                                    },
                                    {
                                        accessor: 'harga',
                                        title: 'Harga',
                                        sortable: true,
                                        render: (item: ProductExpiredItem, index: number) => <span>{formatRupiah(item.old_price_product ?? '0')}</span>,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProductExpiredItem) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                <button type="button" className="btn btn-outline-info" onClick={() => handleAddLeftTable(item)}>
                                                    Add
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
                                page={leftTablePage}
                                onPageChange={(prevPage) => setLeftTablePage(prevPage)}
                            />
                        </div>
                        <div className="datatables xl:col-span-2">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={filterBklsProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: ProductExpiredItem) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
                                        },
                                    },
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_name_product}</span> },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProductExpiredItem) => (
                                            <div className="flex items-center space-x-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteProductBkl(item.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={filterBkls.isSuccess ? filterBkls.data.data.resource.total : 0}
                                recordsPerPage={filterBkls.isSuccess ? filterBkls.data.data.resource.per_page : 10}                                
                                page={rightTablePage}
                                onPageChange={(prevPage) => setRightTablePage(prevPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBkl;
