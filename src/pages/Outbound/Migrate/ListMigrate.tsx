import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetListMigrateQuery } from '../../../store/services/migrateApi';
import { GetListMigrateItem } from '../../../store/services/types';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        category: 'Fashion',
        barcode: 'LQDF5H012',
        totalMasuk: '105.000',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        status: 'Broken',
        qty: '2',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Otomotif',
        barcode: 'LQDF5H013',
        totalMasuk: '203.000',
        email: 'celestegrant@polarax.com',
        dob: '2023-07-21',
        qty: '1',
        status: 'Maintenance',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Celeste',
        lastName: 'Grant',
        category: 'Accessories',
        barcode: 'LQDF6L020',
        totalMasuk: '203.000',
        email: 'celestegrant@polarax.com',
        dob: '2006-12-12',
        status: 'Fixed',
        qty: '2',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
];

const ListMigrate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState('');
    const { data: ListMigrateData, refetch } = useGetListMigrateQuery({ page, q: search });

    const listMigrate = useMemo(() => {
        return ListMigrateData?.data.resource.data;
    }, [ListMigrateData]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Outbound</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Migrate</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">List Migrate </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:mr-auto rtl:ml-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={listMigrate}
                        columns={[
                            {
                                accessor: 'No',
                                title: 'No',
                                render: (item: GetListMigrateItem, index: number) => <span>{index + 1}</span>,
                            },
                            {
                                accessor: 'code_document_migrate',
                                title: 'Document Migrate',
                                render: (item: GetListMigrateItem) => <span className="font-semibold">{item.code_document_migrate}</span>,
                            },
                            {
                                accessor: 'created_at',
                                title: 'Date',
                                render: (item: GetListMigrateItem) => {
                                    const date = new Date(item.created_at);
                                    const formattedDate = date.toISOString().slice(0, 10); // Ambil bagian tanggalnya saja (yyyy-mm-dd)
                                    return <span className="font-semibold">{formattedDate}</span>;
                                },
                            },
                            {
                                accessor: 'total_product_document_migrate',
                                title: 'Qty',
                                render: (item: GetListMigrateItem) => <span className="font-semibold">{item.total_product_document_migrate}</span>,
                            },
                            {
                                accessor: 'total_price_document_migrate',
                                title: 'Price Total',
                                render: (item: GetListMigrateItem) => <span className="font-semibold">{item.total_price_document_migrate}</span>,
                            },
                            // { accessor: 'id', title: 'NO', sortable: true },
                            // { accessor: 'barcode', title: 'DOCUMENT MIGRATE', sortable: true },
                            // { accessor: 'dob', title: 'DATE', sortable: true },
                            // { accessor: 'qty', title: 'QTY', sortable: true },
                            // { accessor: 'totalMasuk', title: 'PRICE TOTAL', sortable: true },
                            // {
                            //     accessor: 'status',
                            //     title: 'STATUS',
                            //     sortable: true,
                            //     render: (data: any) => (
                            //         <span
                            //             className={`badge whitespace-nowrap ${
                            //                 data.status === 'Fixed'
                            //                     ? 'bg-success'
                            //                     : data.status === 'Broken'
                            //                     ? 'bg-danger'
                            //                     : data.status === 'Maintenance'
                            //                     ? 'bg-warning'
                            //                     : 'bg-success'
                            //             }`}
                            //         >
                            //             {data.status}
                            //         </span>
                            //     ),
                            // },
                            {
                                accessor: 'Detail',
                                title: 'Detail',
                                titleClassName: '!text-center',
                                render: (item: GetListMigrateItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link
                                            to={`/outbound/migrate/list_migrate/detail_migrate/${item.id}`}
                                            state={{
                                                code_document_migrate: item.code_document_migrate,
                                                updated_at: item.updated_at,
                                                total_product_document_migrate: item.total_product_document_migrate,
                                                total_price_document_migrate: item.total_price_document_migrate,
                                            }}
                                        >
                                            <button type="button" className="btn btn-outline-info">
                                                Detail
                                            </button>
                                        </Link>
                                        {/* <button type="button" className="btn btn-outline-danger" onClick={() => showAlert(11)}>
                                            DELETE
                                        </button> */}
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={ListMigrateData?.data.resource.total ?? 0}
                        recordsPerPage={ListMigrateData?.data.resource.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListMigrate;
