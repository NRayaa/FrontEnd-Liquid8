import React, { useMemo } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../store';
import IconPlus from '../../../components/Icon/IconPlus';
import IconSend from '../../../components/Icon/IconSend';
import { useGetShowMigrateQuery } from '../../../store/services/migrateApi';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        category: 'Fashion',
        barcode: 'LQDF5H012',
        totalMasuk: '105.000',
        email: 'carolinejensen@zidant.com',
        status: 'Expired',
        QTY: '12',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Otomotif',
        barcode: 'LQDF5H013',
        totalMasuk: '203.000',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        status: 'Expired',
        QTY: '34',
    },
];

const DetailMigrate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { id } = useParams();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const { data: ShowMigrateData } = useGetShowMigrateQuery(id);

    const ShowMigrate = useMemo(() => {
        return ShowMigrateData?.data.resource;
    }, [ShowMigrateData]);
    console.log(ShowMigrate);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.category.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalMasuk.toLowerCase().includes(search.toLowerCase()) ||
                    item.QTY.toLowerCase().includes(search.toLowerCase()) ||
                    item.barcode.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortStatus]);

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
                        <span>Migrate</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Migrate</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Migrate</h1>
            </div>
            <div>
                <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                    <div className="bg-primary absolute mt-2 text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                        <IconSend fill className="w-12 h-12" />
                    </div>
                    <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">DOC MIGRATE :</div>
                            <div className="whitespace-nowrap">LQDF5H012</div>
                        </div>
                        <div className=" items-center text-lg w-full justify-between mb-2">
                            <div className="text-white-dark">QTY :</div>
                            <ul className="space-y-3 list-inside list-disc font-semibold">1</ul>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">PRICE TOTAL :</div>
                            <div className="whitespace-nowrap">Rp.150.000</div>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">DESTINATION :</div>
                            <div className="whitespace-nowrap">Jakarta</div>
                        </div>
                    </div>
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div className="datatables panel xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={ShowMigrate?.migrates}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true },
                                { accessor: 'new_barcode_product', title: 'Barcode LQD', sortable: true },
                                { accessor: 'new_name_product', title: 'Nama Produk', sortable: true },
                                { accessor: 'new_qty_product', title: 'QTY', sortable: true },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true },
                                // {
                                //     accessor: 'action',
                                //     title: 'Opsi',
                                //     titleClassName: '!text-center',
                                //     render: () => (
                                //         <div className="flex items-center w-max mx-auto gap-6">
                                //             {/* <Link to="/inbound/check_product/multi_check" >
                                //     <button type="button" className="btn btn-outline-success">
                                //         Check
                                //     </button>
                                //     </Link> */}
                                //             {/* <Link to="/storage/expired_product/detail_product/1"> */}
                                //             <button type="button" className="btn btn-outline-info">
                                //                 Add
                                //             </button>
                                //             {/* </Link> */}
                                //             {/* <button type="button" className="btn btn-outline-danger" onClick={() => showAlert(11)}>
                                //             UNBUNDLE
                                //         </button> */}
                                //         </div>
                                //     ),
                                // },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p: number) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            sortStatus={sortStatus}
                            onSortStatusChange={setSortStatus}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }: any) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailMigrate;
