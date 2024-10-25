import React from 'react';
import { TableHistoryCheckItem } from './TableHistoryCheckItem';
import { convertPercentage, formatRupiah } from '../../../helper/functions';

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
                    <td className="px-6 py-4">{detailCheckData?.precentage_total_data ?? '1'}%</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">2</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data In
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_in}</td>
                    <td className="px-6 py-4">{detailCheckData?.percentage_in ?? '1'} %</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">3</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Lolos
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_lolos}</td>
                    <td className="px-6 py-4">{detailCheckData?.percentage_lolos ?? '1'}%</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">4</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Damaged
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_damaged}</td>
                    <td className="px-6 py-4">{detailCheckData?.percentage_damaged ?? '1'}%</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">5</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Abnormal
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_data_abnormal}</td>
                    <td className="px-6 py-4">{detailCheckData?.percentage_abnormal ?? '1'}%</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">6</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Discrepancy
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_discrepancy}</td>
                    <td className="px-6 py-4">{detailCheckData?.percentage_discrepancy ?? '1'}%</td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">7</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Inventory By Category
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_product_category}</td>
                    <td className="px-6 py-4"></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">8</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Inventory By Color
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_product_color}</td>
                    <td className="px-6 py-4"></td>
                </tr>

                {/* <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">6</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Staging By Category
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.stagingProducts}</td>
                    <td className="px-6 py-4"></td>
                </tr> */}
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">9</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Stagging
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_product_stagings}</td>
                    <td className="px-6 py-4"></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">10</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Product Approve
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_product_approve}</td>
                    <td className="px-6 py-4"></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">11</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Sale
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_product_sales}</td>
                    <td className="px-6 py-4"></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">12</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Data Bundle
                    </th>
                    <td className="px-6 py-4">{detailCheckData?.total_product_bundle}</td>
                    <td className="px-6 py-4"></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">13</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Lolos Bundle
                    </th>
                    <td className="px-6 py-4">{formatRupiah(detailCheckData?.lolosBundle?.total_old_price.toString() || '0')}</td>
                    <td className="px-6 py-4">{detailCheckData?.lolosBundle?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">14</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Lolos Sale
                    </th>
                    <td className="px-6 py-4">{formatRupiah(detailCheckData?.lolosSale.total_old_price.toString() || '0')}</td>
                    <td className="px-6 py-4">{detailCheckData?.lolosSale.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">15</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Lolos Staging
                    </th>
                    <td className="px-6 py-4">{formatRupiah(detailCheckData?.lolosStaging.total_old_price.toString() || '0')}</td>
                    <td className="px-6 py-4">{detailCheckData?.lolosStaging.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">16</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Damaged Staging
                    </th>
                    <td className="px-6 py-4">{formatRupiah(detailCheckData?.damagedStaging.total_old_price.toString() || '0')}</td>
                    <td className="px-6 py-4">{detailCheckData?.damagedStaging.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">17</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Abnormal Staging
                    </th>
                    <td className="px-6 py-4">{formatRupiah(detailCheckData?.abnormalStaging.total_old_price.toString() || '0')}</td>
                    <td className="px-6 py-4">{detailCheckData?.abnormalStaging.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">18</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Product Approve Lolos
                    </th>
                    <td className="px-6 py-4">{formatRupiah(JSON.stringify(detailCheckData?.lolosAp?.total_old_price))}</td>
                    <td className="px-6 py-4">{detailCheckData?.lolosAp?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">19</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Product Approve Damaged
                    </th>
                    <td className="px-6 py-4">{formatRupiah(JSON.stringify(detailCheckData?.damagedAp?.total_old_price))}</td>
                    <td className="px-6 py-4">{detailCheckData?.damagedAp?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">20</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Product Approve Abnormal
                    </th>
                    <td className="px-6 py-4">{formatRupiah(JSON.stringify(detailCheckData?.abnormalAp?.total_old_price))}</td>
                    <td className="px-6 py-4">{detailCheckData?.abnormalAp?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">21</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Old Price Lolos
                    </th>
                    <td className="px-6 py-4">{formatRupiah(JSON.stringify(detailCheckData?.lolos?.total_old_price))}</td>
                    <td className="px-6 py-4">{detailCheckData?.lolos?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">22</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Old Price Damaged
                    </th>
                    <td className="px-6 py-4">{formatRupiah(JSON.stringify(detailCheckData?.damaged?.total_old_price))}</td>
                    <td className="px-6 py-4">{detailCheckData?.damaged?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">23</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Old Price Abnormal
                    </th>
                    <td className="px-6 py-4">{formatRupiah(JSON.stringify(detailCheckData?.abnormal?.total_old_price))}</td>
                    <td className="px-6 py-4">{detailCheckData?.abnormal?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">24</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Price Discrepancy
                    </th>
                    <td className="px-6 py-4">{formatRupiah(detailCheckData?.priceDiscrepancy.toString() || '0')}</td>
                    <td className="px-6 py-4">{detailCheckData?.price_percentage ?? '1'}%</td>
                    <td></td>
                </tr>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">25</td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Total Price
                    </th>
                    <td className="px-6 py-4">{formatRupiah(detailCheckData?.total_price.toString() || '0')}</td>
                    <td className="px-6 py-4">100%</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};

export default TablePercentageItem;
