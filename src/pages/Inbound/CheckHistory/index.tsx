import { Link } from 'react-router-dom';
import { useGetRiwayatChecksQuery } from '../../../store/services/riwayatApi';
import { useEffect, useMemo } from 'react';
import { DataTable } from 'mantine-datatable';
import { GetRiwayatcheckItem } from '../../../store/services/types';
import { formatDate } from '../../../helper/functions';

const CheckHistory = () => {
    const { data, refetch, isSuccess } = useGetRiwayatChecksQuery(undefined);

    const riwayatCheckData = useMemo(() => {
        if (data?.data.status && isSuccess) {
            return data.data.resource.data;
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [data]);

    return (
        <div className="panel mt-6 min-h-[450px]">
            <h5 className="font-semibold text-lg dark:text-white-light mb-5">Riwayat Check</h5>
            <DataTable
                records={riwayatCheckData}
                columns={[
                    {
                        accessor: 'id',
                        title: 'No',
                        render: (item: GetRiwayatcheckItem, index: number) => <span>{index + 1}</span>,
                    },
                    {
                        accessor: 'date_document',
                        title: 'Nama Data',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{item.code_document}</span>,
                    },
                    {
                        accessor: 'date_document',
                        title: 'Tanggal',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{formatDate(item.created_at)}</span>,
                    },
                    {
                        accessor: 'total_data',
                        title: 'Total Data',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{item.total_data}</span>,
                    },
                    {
                        accessor: 'total_data',
                        title: 'Total Masuk',
                        render: (item: GetRiwayatcheckItem) => <span className="font-semibold">{item.total_data_in}</span>,
                    },
                    {
                        accessor: 'status_document',
                        title: 'Status',
                        render: () => (
                            <button type="button" className="rounded-xl btn-sm px-4 bg-[#2EFF43] uppercase text-white">
                                Done
                            </button>
                        ),
                    },
                    {
                        accessor: 'Aksi',
                        title: 'Aksi',
                        render: (item: GetRiwayatcheckItem) => (
                            <div className="flex items-center w-max mx-auto gap-6">
                                <Link to={`/inbound/check_history/${item.id}`}>
                                    <button type="button" className="btn btn-outline-info">
                                        Detail
                                    </button>
                                </Link>
                                <button type="button" className="btn btn-outline-danger" onClick={() => null}>
                                    Delete
                                </button>
                            </div>
                        ),
                        textAlignment: 'center',
                    },
                ]}
            />
        </div>
    );
};

export default CheckHistory;
