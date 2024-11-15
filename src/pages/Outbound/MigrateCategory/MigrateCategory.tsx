import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import IconPlus from '../../../components/Icon/IconPlus';
import { MigratedBulkyItem } from '../../../store/services/types';
import { useGetListMigrateCategoryQuery } from '../../../store/services/migrateApi';

const MigrateCategory = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, isSuccess, refetch } = useGetListMigrateCategoryQuery({ page, q: search });

    const dataBundleProduct: any = useMemo(() => {
        if (isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [page, search, refetch]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Migrate Category</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Migrate Category</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Migrate Category</h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <Link to="/outbound/category_migrate/create_category_migrate">
                            <button className="btn btn-outline-info">
                                <IconPlus />
                                Create
                            </button>
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input
                            type="text"
                            className="form-input w-auto"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} // Trigger refetch on input change
                        />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        records={dataBundleProduct}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item: MigratedBulkyItem, index: number) => <span>{(page - 1) * dataBundleProduct?.length + (index + 1)}</span> },
                            { accessor: 'Nama User', title: 'Nama User', sortable: true, render: (item: MigratedBulkyItem) => <span>{item?.name_user}</span> },
                            { accessor: 'Code Document', title: 'Code Document', sortable: true, render: (item: MigratedBulkyItem) => <span>{item?.code_document}</span> },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (item: MigratedBulkyItem) => <span className="badge whitespace-nowrap bg-primary">{item.status_bulky}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item: MigratedBulkyItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/outbound/category_migrate/category_migrate/${item.id}`}>
                                            <button type="button" className="btn btn-outline-info">
                                                DETAIL
                                            </button>
                                        </Link>
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
        </div>
    );
};

export default MigrateCategory;
