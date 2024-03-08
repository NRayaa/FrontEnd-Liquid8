import { DataTable } from 'mantine-datatable';
import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { formatRupiah } from '../../../../helper/functions';
import { useGetShowRepairMovingProductsQuery } from '../../../../store/services/repairMovingApi';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import BarcodePrinted from '../../../Inbound/CheckProduct/BarcodePrinted';

const DetailRepair = () => {
    const { id }: any = useParams();
    const { data, isSuccess } = useGetShowRepairMovingProductsQuery(id);

    const detailDataBundle = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
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
                    <Link to="/storage/moving_product/repair">
                        <span>Moving Repair Product</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Repair</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Repair</h1>
            </div>
            <div>
                <div className="flex divide-x mb-4 items-center">
                    <form className="w-[400px] pr-4">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode Repair :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataBundle?.barcode} className=" form-input w-[250px]" required />
                        </div>
                        <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Repair :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataBundle?.repair_name} className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Awal :
                            </label>
                            <input id="categoryName" disabled type="text" value={formatRupiah(detailDataBundle?.total_price ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Custom Display :
                            </label>
                            <input
                                id="categoryName"
                                disabled
                                type="text"
                                value={formatRupiah(detailDataBundle?.total_custom_price ?? '0')}
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                    </form>
                    <div className="px-4">
                        <BarcodePrinted
                            barcode={detailDataBundle?.barcode ?? ''}
                            newPrice={detailDataBundle?.total_custom_price ?? '0'}
                            oldPrice={detailDataBundle?.total_price ?? '0'}
                            category={detailDataBundle?.repair_name ?? ''}
                            isBundle
                        />
                    </div>
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/storage/moving_product/repair">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={detailDataBundle?.repair_products}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item, index: number) => <span>{index + 1}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode LQD', sortable: true },
                                { accessor: 'new_name_product', title: 'Nama Produk', sortable: true },
                                { accessor: 'new_quantity_product', title: 'QTY', sortable: true },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailRepair;
