import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import { useDeletePalletMutation, usePalletListsQuery } from '../../../store/services/palletApi';
import { PaletListItem } from '../../../store/services/types';
import { formatRupiah } from '../../../helper/functions';
import { DataTable } from 'mantine-datatable';

const Pallet = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const { data, isSuccess, refetch } = usePalletListsQuery(page);
    const [deletePallet, results] = useDeletePalletMutation();

    const palletLists = useMemo(() => {
        if (isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    const handleDeletePallet = async (id: number) => {
        try {
            await deletePallet(id);
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
            <BreadCrumbs base="Storage" basePath="storage/product" sub="Setting Kategori" subPath="/" current="SubKategori" />
            <div className="panel mt-6 min-h-[450px]">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">Pallet</h5>
                <div className="mb-4 flex justify-between">
                    <button type="button" className="btn btn-primary-dark uppercase px-6" onClick={() => navigate('/storage/pallet/create_pallet/generate')}>
                        Create Pallet
                    </button>
                    <div className="relative w-[220px]">
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
                </div>
                <div className="datatables">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={palletLists}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item: PaletListItem, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item: PaletListItem) => <span>{item.palet_barcode}</span> },
                            { accessor: 'firstName', title: 'Nama Palet', sortable: true, render: (item: PaletListItem) => <span>{item.name_palet}</span> },
                            { accessor: 'category', title: 'Ketegori', sortable: true, render: (item: PaletListItem) => <span>{item.category_palet}</span> },
                            { accessor: 'totalMasuk', title: 'Total Harga', sortable: true, render: (item: PaletListItem) => <span>{formatRupiah(item.total_price_palet)}</span> },
                            { accessor: 'totalMasuk', title: 'Total Barang', sortable: true, render: (item: PaletListItem) => <span>{item.total_product_palet}</span> },

                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item: PaletListItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/expired_product/detail_product/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                DETAIL
                                            </button>
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDeletePallet(item.id)}>
                                            DELETE
                                        </button>
                                    </div>
                                ),
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

export default Pallet;
