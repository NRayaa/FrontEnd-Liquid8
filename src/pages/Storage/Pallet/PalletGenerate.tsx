import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { DataTable } from 'mantine-datatable';
import {
    useCreatePalleteMutation,
    useDeleteFilterProductMutation,
    useDisplayPalletListsQuery,
    useFilterPalletMutation,
    useFilterProductListsQuery,
    usePalletListsQuery,
} from '../../../store/services/palletApi';
import { ProdcutItem } from '../../../store/services/types';
import { formatRupiah, generateRandomString } from '../../../helper/functions';
import { useNavigate } from 'react-router-dom';

const PalletGenerate = () => {
    const [pageLeftTable, setPageLeftTable] = useState<number>(1);
    const [pageRightTable, setPageRightTable] = useState<number>(1);
    const displayLists = useDisplayPalletListsQuery(pageLeftTable);
    const filterLists = useFilterProductListsQuery(pageRightTable);
    const [filterPallet, results] = useFilterPalletMutation();
    const [deleteFilterProduct, deleteResults] = useDeleteFilterProductMutation();
    const [createPallete, createResults] = useCreatePalleteMutation();
    const [input, setInput] = useState({
        name: '',
        category: '',
        totalPrice: '',
        totalProduct: '',
        barcode: '',
    });
    const navigate = useNavigate();
    const palletLists = usePalletListsQuery(1);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const displayData = useMemo(() => {
        if (displayLists.isSuccess) {
            return displayLists.data.data.resource.data;
        }
    }, [displayLists.data]);
    const filterData = useMemo(() => {
        if (displayLists.isSuccess) {
            return filterLists.data?.data.resource;
        }
    }, [filterLists.data?.data.resource.data]);

    const handleAddDisplay = async (item: ProdcutItem) => {
        try {
            await filterPallet(item.id);
            setInput((prevState: any) => ({
                ...prevState,
                category: item.new_category_product,
                barcode: item.new_barcode_product,
            }));
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeleteFilter = async (id: number) => {
        try {
            await deleteFilterProduct(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmitPalet = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                name_palet: input.name,
                category_palet: input.category,
                total_price_palet: input.totalPrice,
                total_product_palet: filterData?.data?.data.length,
                palet_barcode: generateRandomString(10),
            };
            await createPallete(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            displayLists.refetch();
            filterLists.refetch();
        }
    }, [results]);
    useEffect(() => {
        if (deleteResults.isSuccess) {
            displayLists.refetch();
            filterLists.refetch();
        }
    }, [deleteResults]);
    useEffect(() => {
        if (createResults.isSuccess) {
            navigate('/storage/pallet');
            palletLists.refetch();
        }
    }, [createResults]);
    useEffect(() => {
        const totalAmount = filterData?.data?.data.reduce((accumulator: any, currentItem: any) => {
            return accumulator + parseFloat(currentItem.new_price_product);
        }, 0);
        setInput((prevState) => ({
            ...prevState,
            totalPrice: totalAmount,
        }));
    }, [filterData?.data.data]);

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/storage/product" current="Add Category" />

            <div className="panel mt-10 w-full min-h-[400px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Pallet Generate</h5>
                <form className="w-[400px]" onSubmit={handleSubmitPalet}>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Pallet :
                        </label>
                        <input onChange={handleInputChange} name="name" value={input.name} id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Kategori :
                        </label>
                        <input disabled onChange={handleInputChange} name="category" value={input.category} id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Total Harga:
                        </label>
                        <input disabled name="totalPrice" value={formatRupiah(input.totalPrice ?? '0')} id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Total Produk:
                        </label>
                        <input disabled onChange={handleInputChange} name="totalProduct" value={filterData?.data.data.length} id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>
                    <div className="flex items-center  justify-between mb-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode Pallet :
                        </label>
                        <input disabled onChange={handleInputChange} name="barcode" value={input.barcode} id="categoryName" type="text" className="form-input w-[250px]" required />
                    </div>

                    <button type="submit" className="btn btn-primary mt-4 px-16 uppercase">
                        Create Palet
                    </button>
                </form>
            </div>
            <div className="datatables mt-8">
                <div className="grid grid-cols-5 gap-4">
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={displayData}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item: ProdcutItem, index: number) => <span>{index + 1}</span> },
                                { accessor: 'barcode', title: 'New Barcode', sortable: true, render: (item: ProdcutItem) => <span>{item?.new_barcode_product}</span> },
                                { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: ProdcutItem) => <span className="truncate">{item?.new_name_product}</span> },
                                { accessor: 'barcode', title: 'Harga', sortable: true, render: (item: ProdcutItem) => <span>{formatRupiah(item?.new_price_product ?? '0')}</span> },
                                { accessor: 'category', title: 'Kategori', sortable: true, render: (item: ProdcutItem) => <span>{item.new_category_product}</span> },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: (item: ProdcutItem) => <span className="badge whitespace-nowrap bg-primary capitalize">{item.new_status_product}</span>,
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (item: ProdcutItem) => (
                                        <div className="flex items-center w-max mx-auto gap-6" onClick={() => handleAddDisplay(item)}>
                                            <button type="button" className="btn btn-outline-info">
                                                Add
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={displayLists.data?.data.resource.total ?? 0}
                            recordsPerPage={displayLists.data?.data.resource.per_page ?? 10}
                            page={pageLeftTable}
                            onPageChange={(prevPage) => setPageLeftTable(prevPage)}
                        />
                    </div>
                    <div className="datatables xl:col-span-2">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={filterData?.data.data}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item: ProdcutItem, index: number) => <span>{index + 1}</span> },
                                {
                                    accessor: 'barcode',
                                    title: 'Barcode LQD',
                                    sortable: true,
                                    render: (item: ProdcutItem) => <span className="text-ellipsis overflow-hidden">{item.new_barcode_product}</span>,
                                },
                                {
                                    accessor: 'firstName',
                                    title: 'Nama Produk',
                                    sortable: true,
                                    render: (item: ProdcutItem) => <span className="text-ellipsis overflow-hidden">{item.new_name_product}</span>,
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (item: ProdcutItem) => (
                                        <div className="flex items-center space-x-2">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteFilter(item.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            totalRecords={filterLists.data?.data.resource.data.total ?? 0}
                            recordsPerPage={filterLists.data?.data.resource.data.per_page ?? 10}
                            page={pageRightTable}
                            onPageChange={(prevPage) => setPageRightTable(prevPage)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default PalletGenerate;
