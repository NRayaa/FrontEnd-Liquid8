import React, { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import IconNotesEdit from '../../../components/Icon/IconNotesEdit';
import IconSend from '../../../components/Icon/IconSend';
import { useAddSaleMutation, useDeleteSaleMutation, useGetListSaleQuery, useSaleFinishMutation } from '../../../store/services/saleApi';
import { GetListSaleItem, NewProductItem } from '../../../store/services/types';
import { useGetAllProductNewQuery } from '../../../store/services/productNewApi';
import { Dialog, Transition } from '@headlessui/react';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';
import IconSearch from '../../../components/Icon/IconSearch';

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
    const [saleFinish] = useSaleFinishMutation();
    // const [search] = useState<string>('');
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: listSaleData, refetch } = useGetListSaleQuery({ page, q: search });
    const { data: listProduct } = useGetAllProductNewQuery({ page, q: search });
    const [deleteSale, results] = useDeleteSaleMutation();

    const listSale = useMemo(() => {
        const data = listSaleData?.data.resource.data;
        if (data && Array.isArray(data)) {
            const filteredData = data.slice(0, -2);
            return filteredData as GetListSaleItem[];
        }
        return [];
    }, [listSaleData]);

    const twolastItem = listSaleData?.data.resource.data[listSaleData?.data.resource.data.length - 2] as GetCodeDocumentItem;

    const lastItem = listSaleData?.data.resource.data[listSaleData?.data.resource.data.length - 1] as GetTotalSaleItem;

    const productNewData = useMemo(() => {
        return listProduct?.data.resource.data;
    }, [listProduct]);
    console.log('PRODUCT', productNewData);

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

    const handleFinishSale = async () => {
        try {
            const response = await saleFinish(null);
            refetch();
            console.log('Sale finished:', response);
        } catch (err) {
            console.error('Failed to finish sale:', err);
        }
    };

    const handleDeleteSale = async (id: number) => {
        try {
            await deleteSale(id);
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    const handleProductSelection = (selectedProductBarcode: string) => {
        setInput((prevState) => ({
            ...prevState,
            sale_barcode: selectedProductBarcode,
        }));
        setIsModalOpen(false);
    };

    const handleSearchButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
            <div>
                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialog as="div" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                            <div className="flex items-start justify-center min-h-screen px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel as="div" className="panel border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-5xl text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between">
                                            <div className="text-lg font-bold">Pilih Product</div>
                                        </div>
                                        <div className="w-1/2 mt-5">
                                            <input className="form-input" placeholder="Search..." onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} value={search} autoFocus />
                                        </div>
                                        <div className="max-h-[290px] overflow-y-scroll rounded-md mt-5">
                                            <DataTable
                                                highlightOnHover
                                                className="whitespace-nowrap table-hover"
                                                records={productNewData}
                                                columns={[
                                                    {
                                                        accessor: 'No',
                                                        title: 'No',
                                                        render: (item: NewProductItem, index: number) => <span>{index + 1}</span>,
                                                    },
                                                    {
                                                        accessor: 'product_barcode',
                                                        title: 'Barcode',
                                                        render: (item: NewProductItem) => <span className="font-semibold">{item.new_barcode_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'product_name',
                                                        title: 'Nama',
                                                        render: (item: NewProductItem) => <span className="font-semibold">{item.new_name_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Opsi',
                                                        titleClassName: '!text-center',
                                                        render: (item: NewProductItem) => (
                                                            <div className="flex items-center w-max mx-auto gap-6">
                                                                <button type="button" className="btn btn-outline-info" onClick={() => handleProductSelection(item.new_barcode_product)}>
                                                                    <IconSquareCheck className="ltr:mr-2 rtl:ml-2 " />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                minHeight={200}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={handleCloseModal}>
                                                Kembali
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
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
                        <button type="button" className="btn btn-primary uppercase px-6" onClick={handleFinishSale}>
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
                                    <div className="relative flex w-[250px] mb-4">
                                        <input
                                            type="text"
                                            className="form-input flex-1 ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                            placeholder="Search..."
                                            onChange={handleInputChange}
                                            value={input.sale_barcode}
                                            name="sale_barcode"
                                        />
                                        <button
                                            type="button"
                                            className="h-7 w-7 border rounded-md absolute right-1.5 top-1/2 transform -translate-y-1/2 justify-center items-center border-green-500"
                                            onClick={handleSearchButtonClick}
                                        >
                                            <IconSearch className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* <select id="productDropdown" name="sale_barcode" value={input.sale_barcode} onChange={handleInputChange} className="form-select w-[250px]">
                                        <option value="">Select Product</option>
                                        {productNewData &&
                                            productNewData.map((product) => (
                                                <option key={product.new_barcode_product} value={product.new_barcode_product}>
                                                    {product.new_name_product}
                                                </option>
                                            ))}
                                    </select>
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button type="button" className="btn btn-outline-danger" onClick={handleSearchButtonClick}>
                                            search
                                        </button>
                                    </div> */}
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
