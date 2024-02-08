import React from 'react';
import { TableHistoryCheckItem } from './TableHistoryCheckItem';
import { convertPercentage } from '../../../helper/functions';

const TablePercentageItem: React.FC<TableHistoryCheckItem> = ({ detailCheckData }) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        No
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Keterangan
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Jumlah
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Percentage
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">1</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data}</td>
                    <td className="px-6 py-4">{convertPercentage(detailCheckData?.precentage_total_data ?? '1')}</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">2</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data In
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_in}</td>
                    <td className="px-6 py-4">{convertPercentage(detailCheckData?.percentage_in ?? '1')}</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">3</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Lolos
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_lolos}</td>
                    <td className="px-6 py-4">{convertPercentage(detailCheckData?.percentage_lolos ?? '1')}</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">4</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Damaged
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_damaged}</td>
                    <td className="px-6 py-4">{convertPercentage(detailCheckData?.percentage_damaged ?? '1')}</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">5</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Abnormal
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_abnormal}</td>
                    <td className="px-6 py-4">{convertPercentage(detailCheckData?.percentage_abnormal ?? '1')}</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">6</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Discrepancy
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_discrepancy}</td>
                    <td className="px-6 py-4">{convertPercentage(detailCheckData?.percentage_discrepancy ?? '1')}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default TablePercentageItem;
