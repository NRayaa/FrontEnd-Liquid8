import TableHistoryCheckItem from './TableHistoryCheckItem';
import PieChartItem from './PieChartItem';
import TablePercentageItem from './TablePercentageItem';
import { Link, useParams } from 'react-router-dom';
import {
    useGetDetailRiwayatCheckQuery,
    useExportToExcelMutation,
    useGetProductLolosQuery,
    useGetProductDamagedQuery,
    useGetProductAbnormalQuery,
    useDiscrepancyQuery,
} from '../../../store/services/riwayatApi';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import TableSubProduct from './TableSubProduct';

const DetailCheckHistory = () => {
    const { id } = useParams();
    const { data, isSuccess } = useGetDetailRiwayatCheckQuery(id);
    const [exportToExcel, results] = useExportToExcelMutation();
    const [productSelected, setProductSelected] = useState<'LOLOS' | 'DAMAGED' | 'ABNORMAL' | 'DISCREPANCY' | string>('LOLOS');
    const [page, setPage] = useState<number>(1);
    const [isExporting, setIsExporting] = useState(false);

    const productType = ['LOLOS', 'DAMAGED', 'ABNORMAL', 'DISCREPANCY'];

    const detailCheckData = useMemo(() => {
        if (isSuccess && data.data.status) {
            return data.data.resource;
        }
    }, [data]);

    const handleExportData = async () => {
        try {
            setIsExporting(true);
            const body = {
                code_document: detailCheckData?.code_document,
            };
            await exportToExcel(body);
        } catch (err) {
            console.log(err);
        } finally {
            setIsExporting(false); 
        }
    };

    const { data: lolosData } = useGetProductLolosQuery(
        { code_document: detailCheckData?.code_document ?? '', page, search: '' },
        { skip: productSelected !== 'LOLOS' || !detailCheckData?.code_document }
    );

    const { data: damagedData } = useGetProductDamagedQuery(
        { code_document: detailCheckData?.code_document ?? '', page, search: '' },
        { skip: productSelected !== 'DAMAGED' || !detailCheckData?.code_document }
    );

    const { data: abnormalData } = useGetProductAbnormalQuery(
        { code_document: detailCheckData?.code_document ?? '', page, search: '' },
        { skip: productSelected !== 'ABNORMAL' || !detailCheckData?.code_document }
    );

    const { data: discrepancyData } = useDiscrepancyQuery(
        { code_document: detailCheckData?.code_document ?? '', page, search: '' },
        { skip: productSelected !== 'DISCREPANCY' || !detailCheckData?.code_document }
    );

    const productTypeActive = useMemo(() => {
        if (productSelected === 'LOLOS') {
            return lolosData?.data?.resource?.data;
        } else if (productSelected === 'DAMAGED') {
            return damagedData?.data?.resource?.data;
        } else if (productSelected === 'ABNORMAL') {
            return abnormalData?.data?.resource?.data;
        } else if (productSelected === 'DISCREPANCY') {
            return discrepancyData?.data?.resource?.data;
        }
    }, [productSelected, lolosData, damagedData, abnormalData, discrepancyData]);

    const productTypeActiveArray = Array.isArray(productTypeActive) ? productTypeActive : [];

    const totalRecord = useMemo(() => {
        if (productSelected === 'LOLOS') {
            return lolosData?.data?.resource?.total ?? 0;
        } else if (productSelected === 'DAMAGED') {
            return damagedData?.data?.resource?.total ?? 0;
        } else if (productSelected === 'ABNORMAL') {
            return abnormalData?.data?.resource?.total ?? 0;
        } else if (productSelected === 'DISCREPANCY') {
            return discrepancyData?.data?.resource?.total ?? 0;
        }
    }, [productSelected, lolosData, damagedData, abnormalData, discrepancyData]);

    const perPage = useMemo(() => {
        if (productSelected === 'LOLOS') {
            return lolosData?.data?.resource?.per_page ?? 10;
        } else if (productSelected === 'DAMAGED') {
            return damagedData?.data?.resource?.per_page ?? 10;
        } else if (productSelected === 'ABNORMAL') {
            return abnormalData?.data?.resource?.per_page ?? 10;
        } else if (productSelected === 'DISCREPANCY') {
            return discrepancyData?.data?.resource?.per_page ?? 10;
        }
    }, [productSelected, lolosData, damagedData, abnormalData, discrepancyData]);

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
                    <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData} disabled={isExporting}>
                        {isExporting ? 'Exporting...' : 'Export Data'}
                    </button>
                </div>
                <TablePercentageItem detailCheckData={detailCheckData} />
            </div>
            <div className="panel mt-4">
                <div className="mb-6">
                    <select id="gridState" className="form-select text-white-dark w-auto" value={productSelected} onChange={(e) => setProductSelected(e.target.value)}>
                        {productType?.map((item: string, index: number) => {
                            return <option key={index}>{item}</option>;
                        })}
                    </select>
                </div>
                <TableSubProduct productTypeActive={productTypeActiveArray} totalRecord={totalRecord ?? 0} perPage={perPage ?? 0} page={page} changePage={(prevPage: number) => setPage(prevPage)} />
            </div>
        </div>
    );
};

export default DetailCheckHistory;
