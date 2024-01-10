const TablePercentageItem = () => {
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
                    <td className="px-6 py-4">700</td>
                    <td className="px-6 py-4">100%</td>
                </tr>
            </tbody>
        </table>
    );
};

export default TablePercentageItem;
