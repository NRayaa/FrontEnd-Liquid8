import React from 'react';
import TableHistoryCheckItem from './TableHistoryCheckItem';
import PieChartItem from './PieChartItem';
import TablePercentageItem from './TablePercentageItem';

const DetailCheckHistory = () => {
    return (
        <div className="panel px-2 lg:px-12 pt-5 pb-12">
            <div className="flex flex-col lg:flex-row items-end mb-8 justify-center lg:justify-start md:justify-start">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                    <h5 className="text-[16px] lg:text-[18px] font-semibold mb-6">Riwayat Check : DOCUMENT 001/2023</h5>
                    <TableHistoryCheckItem />
                </div>
                <PieChartItem />
            </div>
            <div className="lg:panel w-full">
                <button type="button" className="btn btn-lg lg:btn btn-primary uppercase mb-4 ms-auto w-full md:w-auto lg:w-auto">
                    Export data
                </button>
                <TablePercentageItem />
            </div>
        </div>
    );
};

export default DetailCheckHistory;
