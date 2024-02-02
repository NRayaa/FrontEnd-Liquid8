import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../store';
import { useGetListDumpQuery } from '../../../store/services/listDumpApi';
import { GetListDumpItem } from '../../../store/services/types';

const ListDump = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { data } = useGetListDumpQuery(undefined);
    const [search, setSearch] = useState('');

    const dataListDump = useMemo(() => {
        return data?.data?.resource?.data;
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
                    <span>Repair Station</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Dump</span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">List Dump </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:mr-auto rtl:ml-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={dataListDump}
                        columns={[
                            { accessor: 'id', title: 'No', render: (item: GetListDumpItem, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'BARCODE', render: (item: GetListDumpItem) => <span>{item.new_barcode_product}</span> },
                            { accessor: 'firstName', title: 'PRODUCT', render: (item: GetListDumpItem) => <span>{item.new_name_product}</span> },
                            { accessor: 'harga', title: 'HARGA', render: (item: GetListDumpItem) => <span>{item.new_price_product} </span> },
                        ]}
                       />
                </div>
            </div>
        </div>
    );
};

export default ListDump;