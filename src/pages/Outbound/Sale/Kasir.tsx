import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import IconNotesEdit from '../../../components/Icon/IconNotesEdit';
import IconSend from '../../../components/Icon/IconSend';
import { useAddSaleMutation, useDeleteSaleMutation, useGetListSaleQuery } from '../../../store/services/saleApi';
import { GetListSaleItem } from '../../../store/services/types';
import { useGetAllProductNewQuery } from '../../../store/services/productNewApi';

interface GetTotalSaleItem {
    total_sale: string;
}
interface GetCodeDocumentItem {
    code_document_sale: string;
}

const Kasir = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [addSale] = useAddSaleMutation();
    const [search] = useState<string>('');
    const { data: listSaleData, refetch } = useGetListSaleQuery({ page, q: search });
    const { data: listProduct } = useGetAllProductNewQuery({ page, q: search });
    const [deleteSale, results] = useDeleteSaleMutation();
    
    const listSale = useMemo(() => {
        const data = listSaleData?.data.resource.data;
        if (data && Array.isArray(data)) {
            const filteredData = data.slice(0, -2);
            console.log('DATA RETURN', filteredData);
            return filteredData as GetListSaleItem[];
        }
        return [];
    }, [listSaleData]);

    const twolastItem = listSaleData?.data.resource.data[listSaleData?.data.resource.data.length - 2] as GetCodeDocumentItem;

    const lastItem = listSaleData?.data.resource.data[listSaleData?.data.resource.data.length - 1] as GetTotalSaleItem;

    const productNewData = useMemo(() => {
        return listProduct?.data.resource.data;
    }, [listProduct]);

    const [input, setInput] = useState({
        sale_barcode: '',
        sale_buyer_name: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddSale = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                sale_barcode: input.sale_barcode,
                sale_buyer_name: input.sale_buyer_name,
            };
            await addSale(body);
            console.log('DATA SENT', body);
            refetch();
        } catch (err) {}
    };

    const handleDeleteSale = async (id: number) => {
        try {
            await deleteSale(id);
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (results) {
            navigate('/outbound/sale/kasir');
        }
        refetch();
    }, [results, listSaleData, refetch]);

    return (
        <>
            <BreadCrumbs base="Outbound" basePath="outbound/sales" sub="Sales" subPath="/" current="Cashier" />
            <div className="panel mt-6 min-h-[450px] pr-12">
                <div className="mb-8">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-2">Sale Cashier</h5>
                    {/* <div className="mb-4 flex justify-between">
                        <button type="button" className="btn-lg btn-primary uppercase px-6 rounded-md">
                            MIGRATE
                        </button>
                    </div> */}
                </div>
                <div className="relative w-[220px]">
                    {/* <input
                        type="text"
                        className="mb-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                    /> */}
                </div>
                <div>
                    <div className="mb-4 flex justify-end">
                        <button type="button" className="btn btn-primary uppercase px-6">
                            Sale
                        </button>
                    </div>
                    <div className="grid grid-cols-2 space-x-6 items-end">
                        <form className="w-[400px] cols-span-1 mb-4 ">
                            {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Code Document:
                                </label>
                                <input id="categoryName" type="text" value={twolastItem?.code_document_sale ?? ''} className="mb-2 form-input w-[250px]" required />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Buyer :
                                </label>
                                <input
                                    id="categoryName"
                                    type="text"
                                    name="sale_buyer_name"
                                    onChange={handleInputChange}
                                    value={input.sale_buyer_name}
                                    placeholder="Nama"
                                    className=" form-input w-[250px]"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    TOTAL :
                                </label>
                                <input id="categoryName" type="text" value={lastItem?.total_sale ?? ''} placeholder="Rp" className=" form-input w-[250px]" required />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                        Scan Product :
                                    </label>
                                    {/* <div className="relative w-[250px] ms-auto mb-4">
                                        <input
                                            type="text"
                                            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                            placeholder="Search..."
                                            onChange={handleInputChange} value={input.sale_barcode}
                                            name="sale_barcode"
                                        />
                                    </div> */}
                                    <select id="productDropdown" name="sale_barcode" value={input.sale_barcode} onChange={handleInputChange} className="form-select w-[250px]">
                                        <option value="">Select Product</option>
                                        {productNewData &&
                                            productNewData.map((product) => (
                                                <option key={product.new_barcode_product} value={product.new_barcode_product}>
                                                    {product.new_name_product}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <button type="button" className="btn btn-primary uppercase px-6" onClick={handleAddSale}>
                                    Add Sale
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="datatables">
                        <DataTable
                            className="whitespace-nowrap table-hover"
                            records={listSale}
                            columns={[
                                {
                                    accessor: 'No',
                                    title: 'No',
                                    render: (item: GetListSaleItem, index: number) => <span>{index + 1}</span>,
                                },
                                {
                                    accessor: 'Barcode',
                                    title: 'Barcode',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.code_document_sale}</span>,
                                },
                                {
                                    accessor: 'name',
                                    title: 'Name',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.product_name_sale}</span>,
                                },
                                {
                                    accessor: 'price',
                                    title: 'Price',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.product_price_sale}</span>,
                                },
                                {
                                    accessor: 'Opsi',
                                    title: 'Opsi',
                                    render: (item: GetListSaleItem) => (
                                        <div className="flex items-center w-max mx-auto gap-6">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteSale(item.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                    textAlignment: 'center',
                                },
                            ]}
                            totalRecords={listSaleData?.data.resource.total ?? 0}
                            recordsPerPage={listSaleData?.data.resource.per_page ?? 10}
                            page={page}
                            onPageChange={(prevPage) => setPage(prevPage)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Kasir;
