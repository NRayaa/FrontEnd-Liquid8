import React, { useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import IconNotesEdit from '../../../components/Icon/IconNotesEdit';
import IconSend from '../../../components/Icon/IconSend';
import { useGetListSaleQuery } from '../../../store/services/saleApi';
import { GetListSaleItem } from '../../../store/services/types';

const Kasir = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [search] = useState<string>('');
    const { data: listSaleData, refetch } = useGetListSaleQuery({ page, q: search });

    const listSale = useMemo(() => {
        return listSaleData?.data.resource.data;
    }, [listSaleData]);

    return (
        <>
            <BreadCrumbs base="Outbound" basePath="outbound/sales" sub="Sales" subPath="/" current="Cashier" />
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
                </div>
                <div>
                    <div className="mb-4 flex justify-end">
                        <button type="button" className="btn btn-primary uppercase px-6">
                            Sale
                        </button>
                    </div>
                    <div className="grid grid-cols-2 space-x-6 items-end">
                        <form className="w-[400px] cols-span-1 mb-4 ">
                            {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Code Document:
                                </label>
                                <input id="categoryName" type="text" value="LQDF5H012" className="mb-2 form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Buyer :
                                </label>
                                <input id="categoryName" type="text" value="John" placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    TOTAL :
                                </label>
                                <input id="categoryName" type="text" value="Rp. 200.000,00" placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Scan Product :
                                </label>
                                <input id="categoryName" type="text" value="QR12565236" placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                            <div className="mb-4">
                                <button type="button" className="btn btn-primary uppercase px-6" onClick={() => navigate('/akun/akun/list_akun/add_akun')}>
                                    Add Sale
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="datatables">
                        <DataTable
                            className="whitespace-nowrap table-hover"
                            records={listSale}
                            columns={[
                                {
                                    accessor: 'No',
                                    title: 'No',
                                    render: (item: GetListSaleItem, index: number) => <span>{index + 1}</span>,
                                },
                                {
                                    accessor: 'Barcode',
                                    title: 'Barcode',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.code_document_sale}</span>,
                                },
                                {
                                    accessor: 'name',
                                    title: 'Name',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.product_name_sale}</span>,
                                },
                                {
                                    accessor: 'price',
                                    title: 'Price',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.product_price_sale}</span>,
                                },
                                {
                                    accessor: 'Opsi',
                                    title: 'Opsi',
                                    render: (item: GetListSaleItem) => (
                                        <div className="flex items-center w-max mx-auto gap-6">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                // onClick={() => handleDeleteAccount(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                    textAlignment: 'center',
                                },
                            ]}
                            totalRecords={listSaleData?.data.resource.total ?? 0}
                            recordsPerPage={listSaleData?.data.resource.per_page ?? 10}
                            page={page}
                            onPageChange={(prevPage) => setPage(prevPage)}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default Kasir;
