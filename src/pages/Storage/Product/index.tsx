import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import { DataTable } from 'mantine-datatable';
import { useDeleteProductNewMutation, useGetAllProductNewQuery } from '../../../store/services/productNewApi';
import { NewProductItem } from '../../../store/services/types';
import { formatDate } from '../../../helper/functions';

const Product = () => {
    const [page, setPage] = useState<number>(1);
    const { data, refetch } = useGetAllProductNewQuery(page);
    const [deleteProductNew, results] = useDeleteProductNewMutation();

    const productNewData = useMemo(() => {
        return data?.data.resource.data;
    }, [data]);

    const handleDeleteProductNew = async (id: number) => {
        try {
            await deleteProductNew(id);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            refetch();
        }
    }, [results]);

    return (
        <>
            <BreadCrumbs base="Storage" basePath="storage/product" current="Produk" />
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Product</h5>
                {/* <input
                        id="ctnFile"
                        type="file"
                        className="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file-ml-5 w-72 file:text-white file:hover:bg-primary"
                        required
                    /> */}
                <div className="relative w-[220px] ms-auto mb-4">
                    <input
                        type="text"
                        className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                    />
                    <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <div className="datatables">
                    <DataTable
                        records={productNewData}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: NewProductItem, index: number) => <span>{index + 1}</span>,
                            },
                            {
                                accessor: 'new barcode product',
                                title: 'NEW BARCODE',
                                render: (item: NewProductItem) => <span className="font-semibold">{item.new_barcode_product}</span>,
                            },
                            {
                                accessor: 'old barcode product',
                                title: 'PRODUCT NAME',
                                render: (item: NewProductItem) => <span className="font-semibold">{item.new_name_product}</span>,
                            },
                            {
                                accessor: 'New Category Product',
                                title: 'NEW CATEGORY',
                                render: (item: NewProductItem) => <span className="font-semibold">{item.new_category_product}</span>,
                            },
                            {
                                accessor: 'New Price Product',
                                title: 'NEW PRICE',
                                render: (item: NewProductItem) => <span className="font-semibold">{item.new_price_product}</span>,
                            },
                            {
                                accessor: 'new date in product',
                                title: 'NEW DATE',
                                render: (item: NewProductItem) => <span className="font-semibold">{formatDate(item.new_date_in_product)}</span>,
                            },
                            {
                                accessor: 'status_document',
                                title: 'Status',
                                render: (item) => (
                                    <button type="button" className="rounded-xl btn-sm px-4 bg-[#2EFF43] uppercase text-white">
                                        {item.new_status_product}
                                    </button>
                                ),
                            },
                            {
                                accessor: 'Aksi',
                                title: 'Aksi',
                                render: (item: NewProductItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/product/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteProductNew(item.id)}>
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
        </>
    );
};

export default Product;
