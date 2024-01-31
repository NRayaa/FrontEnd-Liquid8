import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { useGetExpiredProductsQuery } from '../../../../store/services/productNewApi';
import { ProductExpiredItem } from '../../../../store/services/types';
import { formatRupiah, generateRandomString } from '../../../../helper/functions';
import {
    useCreateBundleMutation,
    useDeleteFilterProductBundlesMutation,
    useFilterProductBundleMutation,
    useGetBundleProductsQuery,
    useGetFilterProductBundlesQuery,
} from '../../../../store/services/bundleProductApi';

const CreateBundle = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const { data, isSuccess, refetch } = useGetExpiredProductsQuery(leftTablePage);
    const filterBundles = useGetFilterProductBundlesQuery(rightTablePage);
    const [filterProductBundle, results] = useFilterProductBundleMutation();
    const [deleteFilterProductBundles, resultsDeleteBundle] = useDeleteFilterProductBundlesMutation();
    const [createBundle, resultsCreateBundle] = useCreateBundleMutation();
    const navigate = useNavigate();
    const bundleLists = useGetBundleProductsQuery(1);

    const [nameBundle, setNameBundle] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<string>('');
    const [totalProductBundle, setTotalProductBundle] = useState<string>('');

    const expiredProducts = useMemo(() => {
        if (isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    const filterBundlesProducts = useMemo(() => {
        if (filterBundles.isSuccess) {
            return filterBundles.data.data.resource.data.data;
        }
    }, [filterBundles.data]);

    const handleAddFilterBundle = async (id: number) => {
        try {
            await filterProductBundle(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteProductBundle = async (id: number) => {
        try {
            await deleteFilterProductBundles(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handlePickedProductBundle = (item: ProductExpiredItem) => {
        setTotalPrice(item.new_price_product ?? '');
        setCustomPrice(item.new_price_product ?? '');
        setTotalProductBundle(item.new_quantity_product ?? '');
    };

    const handleAddLeftTable = (item: ProductExpiredItem) => {
        handleAddFilterBundle(item.id);

        setTotalPrice(item.new_price_product ?? '');
        setCustomPrice(item.new_price_product ?? '');
        setTotalProductBundle(item.new_quantity_product ?? '');
    };

    const setDefaultInputValue = (item: ProductExpiredItem) => {};

    const handleCreateBundle = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                name_bundle: nameBundle,
                total_price_bundle: Number(totalPrice),
                total_price_custom_bundle: Number(customPrice),
                total_product_bundle: Number(totalProductBundle),
                barcode_bundle: generateRandomString(8),
            };

            await createBundle(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            refetch();
            filterBundles.refetch();
        }
    }, [results]);

    useEffect(() => {
        if (resultsDeleteBundle.isSuccess) {
            refetch();
            filterBundles.refetch();
        }
    }, [resultsDeleteBundle]);

    useEffect(() => {
        if (resultsCreateBundle.isSuccess) {
            bundleLists?.refetch();
            navigate('/storage/expired_product/bundle_product');
        }
    }, [resultsCreateBundle]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/expired_product/bundle_product">
                        <span>Expired Product</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create Bundle</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Create Bundle</h1>
            </div>
            <div>
                <form className="w-[400px] mb-4 " onSubmit={handleCreateBundle}>
                    <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button>
                    <div className="flex items-center justify-between mb-2 mt-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Bundle :
                        </label>
                        <input id="categoryName" type="text" className=" form-input w-[250px]" required value={nameBundle} onChange={(e) => setNameBundle(e.target.value)} />
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
                            value={formatRupiah(totalPrice)}
                            onChange={(e) => setTotalPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Custom Harga :
                        </label>
                        <input id="categoryName" type="text" placeholder="Rp" className=" form-input w-[250px]" required value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} />
                    </div>
                </form>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div>
                    <span className="flex justify-end mr-64 text-sm font-semibold">Total Barang : {filterBundles.data?.data.resource.data.data.length} </span>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={expiredProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                                    { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_barcode_product}</span> },
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_name_product}</span> },
                                    { accessor: 'category', title: 'Kategori', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_category_product}</span> },
                                    {
                                        accessor: 'totalMasuk',
                                        title: 'Total Masuk',
                                        sortable: true,
                                        render: (item: ProductExpiredItem, index: number) => <span>{formatRupiah(item.new_price_product)}</span>,
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
                                records={filterBundlesProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span> },
                                    { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_barcode_product}</span> },
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: ProductExpiredItem) => <span>{item.new_name_product}</span> },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProductExpiredItem) => (
                                            <div className="flex items-center space-x-2">
                                                <button type="button" className="btn btn-outline-primary" onClick={() => handlePickedProductBundle(item)}>
                                                    Pilih
                                                </button>
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

export default CreateBundle;
