import { DataTable } from 'mantine-datatable';
import { Link, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { formatRupiah } from '../../../../helper/functions';
import { useGetShowRepairMovingProductsQuery } from '../../../../store/services/repairMovingApi';

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
                    <span>Detail Rapair</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Bundle</h1>
            </div>
            <div>
                <form className="w-[400px] mb-4 ">
                    {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                    <div className="flex items-center justify-between ">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Barcode Bundle :
                        </label>
                        <input id="categoryName" disabled type="text" value={detailDataBundle?.barcode} className=" form-input w-[250px]" required />
                    </div>
                    <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                    <div className="flex items-center justify-between mb-2 mt-2">
                        <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                            Nama Bundle :
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
                        <input id="categoryName" disabled type="text" value={formatRupiah(detailDataBundle?.total_price_custom ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                    </div>
                </form>
                {/* <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div> */}
                <div>
                    <div className="datatables panel xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={[1]}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: () => <span>1</span> },
                                { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: () => <span>{detailDataBundle?.barcode}</span> },
                                { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: () => <span>{detailDataBundle?.repair_name}</span> },
                                { accessor: 'QTY', title: 'QTY', sortable: true, render: () => <span>{detailDataBundle?.total_products}</span> },
                                { accessor: 'totalMasuk', title: 'Harga', sortable: true, render: () => <span>{formatRupiah(detailDataBundle?.total_price ?? '0')}</span> },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailRepair;
