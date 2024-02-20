import TableHistoryCheckItem from './TableHistoryCheckItem';
import PieChartItem from './PieChartItem';
import TablePercentageItem from './TablePercentageItem';
import { Link, useParams } from 'react-router-dom';
import { useGetDetailRiwayatCheckQuery, useExportToExcelMutation } from '../../../store/services/riwayatApi';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const DetailCheckHistory = () => {
    const { id } = useParams();
    const { data, isSuccess } = useGetDetailRiwayatCheckQuery(id);
    const [exportToExcel, results] = useExportToExcelMutation();

    const detailCheckData = useMemo(() => {
        if (isSuccess && data.data.status) {
            return data.data.resource;
        }
    }, [data]);

    const handleExportData = async () => {
        try {
            const body = {
                code_document: detailCheckData?.code_document,
            };
            await exportToExcel(body);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            window.open(results.data.data.resource);
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? '');
        }
    }, [results]);

    return (
        <div className="panel px-2 lg:px-12 pt-5 pb-12">
            <div className="flex flex-col lg:flex-row items-end mb-8 justify-center lg:justify-start md:justify-start">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <h5 className="text-[16px] lg:text-[18px] font-semibold mb-6">Riwayat Check : {detailCheckData?.code_document}</h5>
                    <TableHistoryCheckItem detailCheckData={detailCheckData} />
                </div>
                <PieChartItem detailCheckData={detailCheckData} />
            </div>
            <div className="lg:panel w-full bg-[blue]">
                <div className="flex items-center justify-between mb-4">
                    <Link to="/inbound/check_history">
                        <button type="button" className=" px-2 btn btn-outline-danger">
                            <IconArrowBackward className="flex mx-2" fill={true} /> Back
                        </button>
                    </Link>
                    <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData}>
                        Export data
                    </button>
                </div>
                <TablePercentageItem detailCheckData={detailCheckData} />
            </div>
        </div>
    );
};

export default DetailCheckHistory;
