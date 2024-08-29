import React, { useMemo, useEffect, Fragment, ChangeEvent, useState, MouseEvent, FormEvent } from 'react';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useAddProductSaleMutation, useDeleteProductSaleMutation, useGetShowSaleQuery, usePutGaborMutation, useUpdatePriceMutation } from '../../../store/services/saleApi';
import { GetShowSaleDocumentItem, SubSalesProductsProps } from '../../../store/services/types';
import IconArchive from '../../../components/Icon/IconArchive';
import { formatRupiah, useDebounce } from '../../../helper/functions';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { Alert } from '../../../commons';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Dialog, Transition } from '@headlessui/react';
import { useGetSaleProductsQuery } from '../../../store/services/productNewApi';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';

const DetailCashier = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { id } = useParams();
    const [pageProduct, setPageProduct] = useState<number>(1);
    const [searchSales, setSearchSales] = useState('');
    const debounceValueSales = useDebounce(searchSales);
    const { data: ShowSaleData, isError, isLoading, refetch } = useGetShowSaleQuery(id);
    const { data: listProduct, refetch: refetchSaleProduct } = useGetSaleProductsQuery({ page: pageProduct, q: debounceValueSales });
    const [deleteProduct, resultsDelete] = useDeleteProductSaleMutation();
    const [addProduct, resultsAdd] = useAddProductSaleMutation();
    const [isOpenProduct, setIsOpenProduct] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [updatePrice, setUpdatePrice] = useState('');
    const [gabor, setGabor] = useState('');
    const [editId, setEditId] = useState('');
    const [putGabor, results] = usePutGaborMutation();
    const [updatePriceMutation, resultsUpdate] = useUpdatePriceMutation();

    const ShowSale = useMemo(() => {
        return ShowSaleData?.data.resource;
    }, [ShowSaleData]);

    const productNewData = useMemo(() => {
        return listProduct?.data.resource.data;
    }, [listProduct]);

    const handleAddProduct = async (e: MouseEvent, value: any, id: any) => {
        e.preventDefault();

        const body = {
            sale_barcode: value,
            sale_document_id: id,
        };
        await addProduct(body);
    };

    const handleGabor = async (e: FormEvent, id: any) => {
        e.preventDefault();

        const body = {
            product_price_sale: gabor,
        };
        await putGabor({ id, body });
    };

    const handleUpdatePrice = async (e: FormEvent, id: any) => {
        e.preventDefault();

        const body = {
            update_price_sale: updatePrice,
        };
        await updatePriceMutation({ id, body });
    };

    const handleCloseModal = () => {
        setIsOpenProduct(false);
        setIsOpenEdit(false);
        setSearchSales('');
    };
    const handleCloseEdit = () => {
        setGabor('');
        setUpdatePrice('');
        setEditId('');
    };

    useEffect(() => {
        if (resultsUpdate.isSuccess) {
            toast.success(resultsUpdate.data.data.message);
            refetch();
            setUpdatePrice('');
        } else if (resultsUpdate.isError) {
            const messageRes = 'message' in resultsUpdate.error ? resultsUpdate.error.message : '';
            if (messageRes) {
                toast.error(messageRes);
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [resultsUpdate]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
            refetch();
            setGabor('');
        } else if (results.isError) {
            const messageRes = 'message' in results.error ? results.error.message : '';
            if (messageRes) {
                toast.error(messageRes);
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [results]);

    useEffect(() => {
        if (resultsDelete.isSuccess) {
            toast.success(resultsDelete.data.data.message);
            refetch();
        } else if (resultsDelete.isError) {
            const statusRes = 'status' in resultsDelete.error ? resultsDelete.error.status : 0;
            if (statusRes === 403) {
                toast.error('Your role is forbidden to access');
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [resultsDelete]);

    useEffect(() => {
        if (resultsAdd.isSuccess) {
            toast.success(resultsAdd.data.data.message);
            refetch();
            refetchSaleProduct();
            handleCloseModal();
        } else if (resultsAdd.isError) {
            const messageRes = 'message' in resultsAdd.error ? resultsAdd.error.message : '';
            if (messageRes) {
                toast.error(messageRes);
            } else {
                toast.error('Something went wrong');
            }
        }
    }, [resultsAdd]);

    useEffect(() => {
        if (!isOpenEdit) {
            handleCloseEdit();
        }
    }, [isOpenEdit]);

    const showAlert = async ({ type, saleId, productId }: any) => {
        if (type === 11) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-secondary',
                    cancelButton: 'btn btn-dark ltr:mr-3 rtl:ml-3',
                    popup: 'sweet-alerts',
                },
                buttonsStyling: false,
            });
            swalWithBootstrapButtons
                .fire({
                    title: 'Yakin ingin menhapus item ini?',
                    text: 'Data tidak bisa di kembalikan setelah di hapus',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (result) => {
                    if (result.value) {
                        await deleteProduct({ saleId, productId });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError && !ShowSaleData?.data.status) {
        return <Alert message={ShowSaleData?.data.message ?? 'anda tidak berhak mengakses halaman ini'} />;
    }

    return (
        <div>
            <Transition appear show={isOpenEdit} as={Fragment}>
                <Dialog
                    as="div"
                    open={isOpenEdit}
                    onClose={() => {
                        setIsOpenEdit(false);
                        setSearchSales('');
                    }}
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                        <div className="text-lg font-bold">Edit Product</div>
                                    </div>
                                    <div className="w-full flex gap-4">
                                        <form onSubmit={(e) => handleGabor(e, editId)} className="w-full flex flex-col gap-4">
                                            <div className="w-full flex flex-col">
                                                <label htmlFor="gabor">Gabor</label>
                                                <input className="form-input" id="gabor" onChange={(e) => setGabor(e.target.value)} value={gabor} autoFocus />
                                            </div>
                                            <div>
                                                <button className="btn btn-outline-info" type="submit" disabled={!gabor}>
                                                    Send
                                                </button>
                                            </div>
                                        </form>
                                        <form onSubmit={(e) => handleUpdatePrice(e, editId)} className="w-full flex flex-col gap-4">
                                            <div className="w-full flex flex-col">
                                                <label htmlFor="updatePrice">Update Price</label>
                                                <input className="form-input" id="updatePrice" onChange={(e) => setUpdatePrice(e.target.value)} value={updatePrice} autoFocus />
                                            </div>
                                            <div>
                                                <button className="btn btn-outline-info" type="submit" disabled={!updatePrice}>
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="mt-10 py-3 border-t w-full flex justify-end">
                                        <button className="btn btn-info" type="button" onClick={() => setIsOpenEdit(false)}>
                                            Done
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={isOpenProduct} as={Fragment}>
                <Dialog
                    as="div"
                    open={isOpenProduct}
                    onClose={() => {
                        setIsOpenProduct(false);
                        setSearchSales('');
                    }}
                >
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
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
                                        <input
                                            className="form-input"
                                            placeholder="Search..."
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchSales(e.target.value)}
                                            value={searchSales}
                                            autoFocus
                                        />
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
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-info"
                                                                onClick={(e) => {
                                                                    handleAddProduct(e, item.barcode, ShowSale?.id);
                                                                }}
                                                            >
                                                                <IconSquareCheck className="ltr:mr-2 rtl:ml-2 " />
                                                            </button>
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                            minHeight={200}
                                            totalRecords={listProduct?.data.resource.total ?? 0}
                                            recordsPerPage={listProduct?.data.resource.per_page ?? 10}
                                            page={pageProduct}
                                            onPageChange={(prevPage) => setPageProduct(prevPage)}
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
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/outbound/sale/kasir">
                        <span>Sale</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Sale</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Sale</h1>
            </div>
            <div>
                <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                    <div className="bg-primary absolute mt-2 text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                        <IconArchive fill className="w-12 h-12" />
                    </div>
                    <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">DOC SALE :</div>
                            <div className="whitespace-nowrap">{ShowSale?.code_document_sale}</div>
                        </div>
                        <div className=" items-center text-lg w-full justify-between mb-2">
                            <div className="text-white-dark">QTY :</div>
                            <ul className="space-y-3 list-inside list-disc font-semibold">{ShowSale?.total_product_document_sale}</ul>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">VOUCHER :</div>
                            <div className="whitespace-nowrap"> {ShowSale && typeof ShowSale.voucher === 'string' ? formatRupiah(ShowSale.voucher) : ''}</div>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">PRICE TOTAL :</div>
                            <div className="whitespace-nowrap"> {ShowSale && typeof ShowSale.total_price_document_sale === 'string' ? formatRupiah(ShowSale.total_price_document_sale) : ''}</div>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">BUYER :</div>
                            <div className="whitespace-nowrap">{ShowSale?.buyer_name_document_sale}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className=" flex justify-end my-8 mr-4 ">
                        <button onClick={() => setIsOpenProduct(true)} type="button" className="btn btn-lg lg:btn btn-primary uppercase">
                            Add Product
                        </button>
                    </div>
                    <div className=" flex justify-end my-8 mr-4 ">
                        <Link to={`/outbound/sale/kasir/print_product/${ShowSale?.code_document_sale}`} type="button" className="btn btn-lg lg:btn btn-primary uppercase">
                            Export By Product
                        </Link>
                    </div>
                    <div className=" flex justify-end my-8">
                        <Link to={`/outbound/sale/kasir/print/${ShowSale?.code_document_sale}`} type="button" className="btn btn-lg lg:btn btn-primary uppercase">
                            Export data
                        </Link>
                    </div>
                </div>
                <div className="mt-8 panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/outbound/sale/list_kasir">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            records={ShowSale?.sales}
                            columns={[
                                {
                                    accessor: 'No',
                                    title: 'No',
                                    render: (item: GetShowSaleDocumentItem, index: number) => <span>{index + 1}</span>,
                                },
                                {
                                    accessor: 'product_barcode_sale',
                                    title: 'Barcode',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_barcode_sale}</span>,
                                },
                                {
                                    accessor: 'product_name_sale',
                                    title: 'Nama Produk',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_name_sale}</span>,
                                },
                                {
                                    accessor: 'product_qty_sale',
                                    title: 'Qty',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_qty_sale}</span>,
                                },
                                {
                                    accessor: 'product_price_sale',
                                    title: 'Harga',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{formatRupiah(item.product_price_sale)}</span>,
                                },
                                {
                                    accessor: 'status_sale',
                                    title: 'Status',
                                    render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.status_sale}</span>,
                                },
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    render: (item: GetShowSaleDocumentItem) => (
                                        <div className="flex items-center w-max mx-auto gap-3">
                                            <button
                                                onClick={() => {
                                                    setIsOpenEdit(true);
                                                    setEditId(item.id.toString());
                                                }}
                                                type="button"
                                                className="btn btn-warning"
                                            >
                                                Edit
                                            </button>
                                            <button onClick={() => showAlert({ type: 11, saleId: ShowSale?.id, productId: item.id })} type="button" className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCashier;
