import React, { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatRupiah, generateRandomString, useDebounce } from '../../../helper/functions';
import { useGetDisplayExpiredQuery, useGetRepairLeftQuery, useGetRepairRightQuery } from '../../../store/services/productNewApi';
import {
    useCreateRepairMovingProductsMutation,
    useDeleteFilterRepairMovingProductsMutation,
    useFilterRepairMovingProductsMutation,
    useGetFilterRepairMovingProductsQuery,
    useGetRepairMovingProductsQuery,
} from '../../../store/services/repairMovingApi';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { ProductExpiredItem } from '../../../store/services/types';

const CreateLPRepair = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const debounceValue = useDebounce(searchLeftTable);
    const { data, isSuccess, refetch } = useGetRepairLeftQuery({ page: leftTablePage, q: debounceValue });
    const filterLPRepair = useGetFilterRepairMovingProductsQuery(rightTablePage);
    const [filterProductRepair, results] = useFilterRepairMovingProductsMutation();
    const [deleteFilterProductRepair, resultsDeleteRepair] = useDeleteFilterRepairMovingProductsMutation();
    const [createRepair, resultsCreateRepair] = useCreateRepairMovingProductsMutation();
    const navigate = useNavigate();
    const repairLists = useGetRepairMovingProductsQuery('');

    const [nameRepair, setNameRepair] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<string>('');
    const [totalProductBundle, setTotalProductBundle] = useState<string>('');

    const lprLeft = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    const lprRight = useMemo(() => {
        if (filterLPRepair.isSuccess) {
            return filterLPRepair.data.data.resource.data.data;
        }
    }, [filterLPRepair.data, data]);

    const handleAddFilterRepair = async (id: number) => {
        try {
            await filterProductRepair(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteProductBundle = async (id: number) => {
        try {
            await deleteFilterProductRepair(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddLeftTable = (item: ProductExpiredItem) => {
        handleAddFilterRepair(item.id);
        setTotalProductBundle(item.new_quantity_product ?? '');
    };

    const handleCreateRepair = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                repair_name: nameRepair,
                total_price: Number(filterLPRepair.data.data.resource.total_new_price) ?? 0,
                total_custom_price: Number(customPrice),
                total_products: lprRight?.length,
                barcode: generateRandomString(10),
            };

            await createRepair(body);
            refetch();
            filterLPRepair.refetch();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
            filterLPRepair.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results, filterLPRepair.isSuccess]);

    useEffect(() => {
        if (resultsDeleteRepair.isSuccess) {
            toast.success(resultsDeleteRepair?.data.data.message);
            refetch();
            filterLPRepair.refetch();
        } else if (resultsDeleteRepair.isError) {
            toast.error(resultsDeleteRepair?.data?.data?.message ?? 'Error');
        }
    }, [resultsDeleteRepair]);

    useEffect(() => {
        if (resultsCreateRepair.isSuccess) {
            toast.success(resultsCreateRepair?.data.data.message);
            repairLists?.refetch();
            navigate('/storage/moving_product/repair');
        } else if (resultsCreateRepair.isError) {
            toast.error(resultsCreateRepair?.data?.data?.message ?? 'Error');
        }
    }, [resultsCreateRepair]);

    useEffect(() => {
        const new_price = filterLPRepair?.data?.data.resource.total_new_price;

        setCustomPrice(new_price?.toString() ?? '0');
    }, [filterLPRepair]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/repair_station/list_product_repair">
                        <span>List Product Repair</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create List Product Repair</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Create List Product Repair</h1>
            </div>
            <div>
                <form className="w-[400px] mb-4 " onSubmit={handleCreateRepair}>
                    <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create List Product Repair
                    </button>
                    <div className="flex items-center justify-between mb-2 mt-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Repair :
                        </label>
                        <input id="categoryName" type="text" className=" form-input w-[250px]" required value={nameRepair} onChange={(e) => setNameRepair(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Total Harga :
                        </label>
                        <input
                            disabled
                            id="categoryName"
                            type="text"
                            placeholder="Rp"
                            className=" form-input w-[250px]"
                            required
                            value={formatRupiah(filterLPRepair?.data?.data.resource.total_new_price.toString() ?? '0')}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Custom Harga :
                        </label>
                        <input id="categoryName" type="text" placeholder="Rp" className=" form-input w-[250px]" required value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} />
                    </div>
                    <input
                        type="text"
                        className="mt-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                        value={searchLeftTable}
                        onChange={(e) => setSearchLeftTable(e.target.value)}
                    />
                </form>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/storage/moving_product/repair">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <span className="flex justify-end mr-64 text-sm font-semibold">Total Barang : {filterLPRepair.data?.data.resource.data.total ?? 0} </span>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={lprLeft}
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
                                        render: (item: ProductExpiredItem) => <span>{item.new_tag_product ? item.new_tag_product : item.new_category_product}</span>,
                                    },
                                    {
                                        accessor: 'totalMasuk',
                                        title: 'Harga',
                                        sortable: true,
                                        render: (item: ProductExpiredItem, index: number) => {
                                            let price: string | undefined;
                                            if (item.new_category_product !== null && item.new_category_product !== undefined) {
                                                price = item.new_price_product;
                                            } else if (item.new_tag_product !== null && item.new_tag_product !== undefined) {
                                                price = item.fixed_price;
                                            } else {
                                                price = item.old_price_product;
                                            }

                                            return <span>{price !== undefined ? formatRupiah(price) : '0'}</span>;
                                        },
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
                                records={lprRight}
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
                                                <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteProductBundle(item.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
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

export default CreateLPRepair;
