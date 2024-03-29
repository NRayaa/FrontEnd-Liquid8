import { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import { useAddSaleMutation, useDeleteSaleMutation, useGetListSaleQuery, useSaleFinishMutation } from '../../../store/services/saleApi';
import { GetListBuyerItem, GetListSaleItem, NewProductItem, SubSalesProductsProps } from '../../../store/services/types';
import { useGetSaleProductsQuery } from '../../../store/services/productNewApi';
import { Dialog, Transition } from '@headlessui/react';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';
import IconSearch from '../../../components/Icon/IconSearch';
import { formatRupiah } from '../../../helper/functions';
import toast from 'react-hot-toast';
import { useAddBuyerMutation, useGetListBuyerQuery } from '../../../store/services/buyerApi';
import { Alert } from '../../../commons';

const Kasir = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [addSale] = useAddSaleMutation();
    const [addBuyer] = useAddBuyerMutation();
    const [saleFinish] = useSaleFinishMutation();
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listBuyerOpen, setListBuyerOpen] = useState(false);
    const [addBuyerOpen, setAddBuyerOpen] = useState(false);
    const { data: listSaleData, isError, isLoading, refetch } = useGetListSaleQuery({ page, q: search });
    const { data: listProduct } = useGetSaleProductsQuery({ page, q: search });
    const { data: listBuyer } = useGetListBuyerQuery({ page, q: search });
    const [deleteSale, resultsDeleteSale] = useDeleteSaleMutation();

    const listSale = useMemo(() => {
        return listSaleData?.data.resource.data;
    }, [listSaleData]);
    const productNewData = useMemo(() => {
        return listProduct?.data.resource.data;
    }, [listProduct]);

    const listBuyerData = useMemo(() => {
        return listBuyer?.data.resource.data;
    }, [listBuyer]);

    const [input, setInput] = useState({
        sale_barcode: '',
        buyer_id: 0,
        name_buyer: '',
        phone_buyer: '',
        address_buyer: '',
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
                buyer_id: inputBuyer.id,
            };
            await addSale(body)
                .unwrap()
                .then((res) => {
                    toast.success(res.data.message);
                    setInput((prev) => ({ ...prev, sale_barcode: '' }));
                    navigate('/outbound/sale/kasir');
                    refetch();
                })
                .catch((err) => toast.error(err.data.data.message));
        } catch (err) {}
    };

    const handleAddBuyer = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                name_buyer: input.name_buyer,
                phone_buyer: input.phone_buyer,
                address_buyer: input.address_buyer,
            };
            await addBuyer(body)
                .unwrap()
                .then((res) => {
                    toast.success(res.data.message);
                    setAddBuyerOpen(false);
                    navigate('/outbound/sale/kasir');
                    refetch();
                })
                .catch((err) => toast.error(err.data.data.message));
        } catch (err) {}
    };

    const handleFinishSale = async () => {
        try {
            await saleFinish(null)
                .unwrap()
                .then((res) => {
                    toast.success(res.data.message);
                    navigate('/outbound/sale/list_kasir');
                    setInput((prev) => ({ ...prev, sale_barcode: '' }));
                    refetch();
                })
                .catch((err) => toast.error(err.data.data.message));
        } catch (err) {
            console.error('Failed to finish sale:', err);
        }
    };

    const handleDeleteSale = async (id: number) => {
        try {
            await deleteSale(id)
                .unwrap()
                .then((res) => {
                    toast.success(res.data.message);
                    navigate('/outbound/sale/kasir');
                    refetch();
                })
                .catch((err) => toast.error(err.data.data.message));
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

    const [inputBuyer, setInputBuyer] = useState({
        id: 0,
        name_buyer: '',
    });

    const handleInputChangeBuyer = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputBuyer((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleBuyerSelection = (selectedBuyerItem: GetListBuyerItem) => {
        setInputBuyer({
            id: selectedBuyerItem.id,
            name_buyer: selectedBuyerItem.name_buyer,
        });
        setListBuyerOpen(false);
    };

    const handleSearchBuyerButtonClick = () => {
        setListBuyerOpen(true);
        refetch();
    };

    const handleCloseModalBuyer = () => {
        setListBuyerOpen(false);
    };

    const handleAddBuyerButtonClick = () => {
        setListBuyerOpen(false);
        setAddBuyerOpen(true);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError && !listSaleData?.data.status) {
        return <Alert message={listSaleData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <>
            <BreadCrumbs base="Home" basePath="/" sub="Sales" subPath="/outbound/sale/kasir" current="Cashier" />
            <div>
                <Transition appear show={listBuyerOpen} as={Fragment}>
                    <Dialog as="div" open={listBuyerOpen} onClose={() => setListBuyerOpen(false)}>
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
                                            <div className="text-lg font-bold">Pilih Buyer</div>
                                        </div>
                                        <div className="mb-4 flex justify-between">
                                            <div className="relative w-[220px]">
                                                <input
                                                    className="form-input mr-2"
                                                    placeholder="Search..."
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                                    value={search}
                                                    autoFocus
                                                />
                                            </div>
                                            <button type="button" className="btn btn-primary uppercase px-6" onClick={handleAddBuyerButtonClick}>
                                                Add Buyer
                                            </button>
                                        </div>
                                        <div className="max-h-[290px] overflow-y-scroll rounded-md mt-5">
                                            <DataTable
                                                highlightOnHover
                                                className="whitespace-nowrap table-hover"
                                                records={listBuyerData}
                                                columns={[
                                                    {
                                                        accessor: 'No',
                                                        title: 'No',
                                                        render: (item: GetListBuyerItem, index: number) => <span>{index + 1}</span>,
                                                    },
                                                    {
                                                        accessor: 'name_buyer',
                                                        title: 'Nama',
                                                        render: (item: GetListBuyerItem) => <span className="font-semibold">{item.name_buyer}</span>,
                                                    },
                                                    {
                                                        accessor: 'phone_buyer',
                                                        title: 'No. Hp',
                                                        render: (item: GetListBuyerItem) => <span className="font-semibold">{item.phone_buyer}</span>,
                                                    },
                                                    {
                                                        accessor: 'address_buyer',
                                                        title: 'Alamat',
                                                        render: (item: GetListBuyerItem) => <span className="font-semibold">{item.address_buyer}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Opsi',
                                                        titleClassName: '!text-center',
                                                        render: (item: GetListBuyerItem) => (
                                                            <div className="flex items-center w-max mx-auto gap-6">
                                                                <button type="button" className="btn btn-outline-info" onClick={() => handleBuyerSelection(item)}>
                                                                    <IconSquareCheck className="ltr:mr-2 rtl:ml-2 " />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                totalRecords={listBuyer?.data.resource.total ?? 0}
                                                recordsPerPage={listBuyer?.data.resource.per_page ?? 10}
                                                page={page}
                                                onPageChange={(prevPage) => setPage(prevPage)}
                                            />
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={handleCloseModalBuyer}>
                                                Kembali
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={addBuyerOpen} as={Fragment}>
                    <Dialog as="div" open={addBuyerOpen} onClose={() => setAddBuyerOpen(false)}>
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
                                            <div className="text-lg font-bold">Add Buyer</div>
                                        </div>
                                        <form className="w-[400px]" onSubmit={handleAddBuyer}>
                                            <div className="flex items-center  justify-between mb-2">
                                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                                    Nama :
                                                </label>
                                                <input id="categoryName" type="text" className="form-input w-[250px]" name="name_buyer" onChange={handleInputChange} value={input.name_buyer} />
                                            </div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label htmlFor="username" className="text-[15px] font-semibold whitespace-nowrap">
                                                    No. Hp :
                                                </label>
                                                <input id="username" type="text" className="form-input w-[250px]" name="phone_buyer" onChange={handleInputChange} value={input.phone_buyer} />
                                            </div>
                                            <div className="flex items-center justify-between mb-2">
                                                <label htmlFor="email" className="text-[15px] font-semibold whitespace-nowrap">
                                                    Alamat :
                                                </label>
                                                <input id="email" type="text" className="form-input w-[250px]" name="address_buyer" onChange={handleInputChange} value={input.address_buyer} />
                                            </div>
                                            <div className="flex justify-between items-center mt-8">
                                                <button type="submit" className="btn btn-primary mt-4 px-16">
                                                    Create
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

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
                                                        render: (item: SubSalesProductsProps, index: number) => <span>{index + 1}</span>,
                                                    },
                                                    {
                                                        accessor: 'barcode',
                                                        title: 'Barcode',
                                                        render: (item: SubSalesProductsProps) => <span className="font-semibold">{item.barcode}</span>,
                                                    },
                                                    {
                                                        accessor: 'name',
                                                        title: 'Nama',
                                                        render: (item: SubSalesProductsProps) => <span className="font-semibold">{item.name}</span>,
                                                    },
                                                    {
                                                        accessor: 'category',
                                                        title: 'Kategori',
                                                        render: (item: SubSalesProductsProps) => <span className="font-semibold">{item.category}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Opsi',
                                                        titleClassName: '!text-center',
                                                        render: (item: SubSalesProductsProps) => (
                                                            <div className="flex items-center w-max mx-auto gap-6">
                                                                <button type="button" className="btn btn-outline-info" onClick={() => handleProductSelection(item.barcode)}>
                                                                    <IconSquareCheck className="ltr:mr-2 rtl:ml-2 " />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                minHeight={200}
                                                totalRecords={listProduct?.data.resource.total ?? 0}
                                                recordsPerPage={listProduct?.data.resource.per_page ?? 10}
                                                page={page}
                                                onPageChange={(prevPage) => setPage(prevPage)}
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
                </div>
                <div className="relative w-[220px]"></div>
                <div>
                    <div className="mb-4 flex justify-end space-x-2">
                        <button type="button" className="btn btn-primary uppercase px-6" onClick={handleFinishSale} disabled={listSaleData?.data.resource.total === 0}>
                            Sale
                        </button>
                    </div>
                    <div className="grid grid-cols-2 space-x-6 items-end">
                        <form className="w-[400px] cols-span-1 mb-4 ">
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Code Document:
                                </label>
                                <input id="categoryName" type="text" value={listSaleData?.data.resource.code_document_sale ?? ''} className="mb-2 form-input w-[250px]" required />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                        Buyer :
                                    </label>
                                    <div className="relative flex w-[250px] mb-4">
                                        <input
                                            type="text"
                                            className="form-input flex-1 ltr:pl-4 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                            placeholder="Search..."
                                            name="name_buyer"
                                            value={listSaleData?.data.resource.sale_buyer_name ? listSaleData?.data.resource.sale_buyer_name : inputBuyer.name_buyer}
                                            onChange={handleInputChangeBuyer}
                                            disabled={listSaleData?.data.resource.sale_buyer_name !== ''}
                                        />
                                        <button
                                            type="button"
                                            className="h-7 w-7 absolute right-1.5 top-1/2 transform -translate-y-1/2 justify-center items-center border-green-500"
                                            onClick={handleSearchBuyerButtonClick}
                                            disabled={listSaleData?.data.resource.sale_buyer_name !== ''}
                                        >
                                            <IconSearch className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    TOTAL :
                                </label>
                                <input
                                    id="categoryName"
                                    type="text"
                                    value={formatRupiah(listSaleData?.data.resource.total_sale.toString() ?? '')}
                                    placeholder="Rp"
                                    className=" form-input w-[250px]"
                                    required
                                />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                        Scan Product :
                                    </label>
                                    <div className="relative flex w-[250px] mb-4">
                                        <input
                                            type="text"
                                            className="form-input flex-1 ltr:pl-4 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                            placeholder="Search..."
                                            onChange={handleInputChange}
                                            value={input.sale_barcode}
                                            name="sale_barcode"
                                        />
                                        <button
                                            type="button"
                                            className="h-7 w-7 absolute right-1.5 top-1/2 transform -translate-y-1/2 justify-center items-center border-green-500"
                                            onClick={handleSearchButtonClick}
                                        >
                                            <IconSearch className="w-4 h-4" />
                                        </button>
                                    </div>
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
                                    accessor: 'code_document_sale',
                                    title: 'Barcode',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.code_document_sale}</span>,
                                },
                                {
                                    accessor: 'product_name_sale',
                                    title: 'Name',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.product_name_sale}</span>,
                                },
                                {
                                    accessor: 'product_price_sale',
                                    title: 'Price',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{formatRupiah(item.product_price_sale)}</span>,
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
