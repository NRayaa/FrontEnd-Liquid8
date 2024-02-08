import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import { useGetListSaleDocumentQuery } from '../../../store/services/saleApi';
import { GetListSaleDocumentItem } from '../../../store/services/types';
import { DataTable } from 'mantine-datatable';
import { formatRupiah } from '../../../helper/functions';

const ListKasir = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { data: listSaleDocumentData, refetch } = useGetListSaleDocumentQuery({ page, q: search });

    const listSaleDocument = useMemo(() => {
        return listSaleDocumentData?.data.resource.data;
    }, [listSaleDocumentData]);

    return (
        <>
            <BreadCrumbs base="Outbound" basePath="outbound/sales" sub="Sales" subPath="/" current="List Cashier" />
            <div className="panel mt-6 min-h-[450px] pr-12">
                <div className="mb-8">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-2">Sale Cashier</h5>
                    {/* <div className="mb-4 flex justify-between">
                        <button type="button" className="btn-lg btn-primary uppercase px-6 rounded-md">
                            MIGRATE
                        </button>
                    </div> */}
                </div>
                <div className="relative w-[220px]">
                    {/* <input
                        type="text"
                        className="mb-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                    /> */}
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
                        className="whitespace-nowrap table-hover"
                        records={listSaleDocument}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: GetListSaleDocumentItem, index: number) => <span>{index + 1}</span>,
                            },
                            {
                                accessor: 'Barcode',
                                title: 'Barcode',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{item.code_document_sale}</span>,
                            },
                            {
                                accessor: 'name',
                                title: 'Name',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{item.buyer_name_document_sale}</span>,
                            },
                            {
                                accessor: 'qty',
                                title: 'Qty',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{item.total_product_document_sale}</span>,
                            },
                            {
                                accessor: 'price',
                                title: 'Price',
                                render: (item: GetListSaleDocumentItem) => <span className="font-semibold">{formatRupiah(item.total_price_document_sale)}</span>,
                            },
                            {
                                accessor: 'Opsi',
                                title: 'Opsi',
                                render: (item: GetListSaleDocumentItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/outbound/sale/list_kasir/detail_kasir/${item.id}`}
                                            // state={{
                                            //     code_document_migrate: item.code_document_migrate,
                                            //     updated_at: item.updated_at,
                                            //     total_product_document_migrate: item.total_product_document_migrate,
                                            //     total_price_document_migrate: item.total_price_document_migrate,
                                            // }}
                                        >
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                    </div>
                                ),
                                textAlignment: 'center',
                            },
                        ]}
                        totalRecords={listSaleDocumentData?.data.resource.total ?? 0}
                        recordsPerPage={listSaleDocumentData?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>

                {/* <div className="grid grid-cols-1 space-x-6 items-end">
                    <div className="datatables col-span-2">
                        <table className="panel text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        NO
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        BARCODE
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        NAME
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        QTY
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        PRICE
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        OPSI
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">1</td>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        PLTFSH0001
                                    </th>
                                    <td className="px-6 py-4">Baju Fashion</td>
                                    <td className='px-6 py-4'>1</td>
                                    <td className="px-6 py-4">Rp 5.000.000,-</td>
                                    <td className="px-6 py-4 flex items-center space-x-2">
                                        <button type="button" className="btn btn-outline-primary">
                                            DETAIL
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default ListKasir;
