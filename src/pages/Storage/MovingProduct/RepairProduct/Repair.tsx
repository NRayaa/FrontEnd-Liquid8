import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import IconPlus from '../../../../components/Icon/IconPlus';
import { useEffect, useMemo, useState } from 'react';
import { formatRupiah } from '../../../../helper/functions';
import toast from 'react-hot-toast';
import { useGetRepairMovingProductsQuery } from '../../../../store/services/repairMovingApi';

const Repair = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, isSuccess } = useGetRepairMovingProductsQuery(undefined);

    const dataRepairMovingProduct = useMemo(() => {
        if (isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Moving Product</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Repair Product</span>
                </li>
            </ul>

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">Repair Product </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div>
                        <Link to="/storage/moving_product/create_repair">
                            <button className="btn btn-outline-info">
                                <IconPlus />
                                Create
                            </button>
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={dataRepairMovingProduct}
                        columns={[
                            { accessor: 'id', title: 'No', sortable: true, render: (item, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'Barcode Repair', sortable: true, render: (item) => <span>{item.barcode}</span> },
                            { accessor: 'firstName', title: 'Nama Repair', sortable: true, render: (item) => <span>{item.repair_name}</span> },
                            { accessor: 'Total Barang', title: 'Total Barang', sortable: true, render: (item) => <span>{item.total_products}</span> },
                            { accessor: 'Total Price', title: 'Total Harga', sortable: true, render: (item) => <span>{formatRupiah(item.total_price)}</span> },
                            {
                                accessor: 'status',
                                title: 'Status',
                                sortable: true,
                                render: (item) => <span className="badge whitespace-nowrap bg-primary">{item.repair_products[0].new_status_product}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <Link to={`/storage/moving_product/detail_repair/${item.id}`}>
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

export default Repair;
