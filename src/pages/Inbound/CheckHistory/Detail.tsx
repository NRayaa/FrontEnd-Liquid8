import TableHistoryCheckItem from './TableHistoryCheckItem';
import PieChartItem from './PieChartItem';
import TablePercentageItem from './TablePercentageItem';
import { useParams } from 'react-router-dom';
import { useGetDetailRiwayatCheckQuery } from '../../../store/services/riwayatApi';
import { useMemo } from 'react';

const DetailCheckHistory = () => {
    const { id } = useParams();
    const { data, isSuccess } = useGetDetailRiwayatCheckQuery(id);

    const detailCheckData = useMemo(() => {
        if (isSuccess && data.data.status) {
            return data.data.resource;
        }
    }, [data]);
    
    return (
        <div className="panel px-2 lg:px-12 pt-5 pb-12">
            <div className="flex flex-col lg:flex-row items-end mb-8 justify-center lg:justify-start md:justify-start">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <h5 className="text-[16px] lg:text-[18px] font-semibold mb-6">Riwayat Check : {detailCheckData?.code_document}</h5>
                    <TableHistoryCheckItem detailCheckData={detailCheckData} />
                </div>
                <PieChartItem detailCheckData={detailCheckData} />
            </div>
            <div className="lg:panel w-full">
                <button type="button" className="btn btn-lg lg:btn btn-primary uppercase mb-4 ms-auto w-full md:w-auto lg:w-auto">
                    Export data
                </button>
                <TablePercentageItem detailCheckData={detailCheckData} />
            </div>
        </div>
    );
};

export default DetailCheckHistory;
