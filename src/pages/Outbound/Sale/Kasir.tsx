import { ChangeEvent, Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { useNavigate, useParams } from 'react-router-dom';
import { BreadCrumbs } from '../../../components';
import { useAddSaleMutation, useDeleteSaleMutation, useGetListSaleQuery, useSaleFinishMutation, usePutGaborMutation, useUpdatePriceMutation } from '../../../store/services/saleApi';
import { GetListBuyerItem, GetListSaleItem, SubSalesProductsProps } from '../../../store/services/types';
import { useGetSaleProductsQuery } from '../../../store/services/productNewApi';
import { Dialog, Transition } from '@headlessui/react';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';
import IconSearch from '../../../components/Icon/IconSearch';
import { formatRupiah, useDebounce } from '../../../helper/functions';
import toast from 'react-hot-toast';
import { useAddBuyerMutation, useGetListBuyerQuery } from '../../../store/services/buyerApi';
import { Alert } from '../../../commons';
import Swal from 'sweetalert2';
import { clsx } from '@mantine/core';

const Kasir = () => {
    const navigate = useNavigate();
    const [pageSales, setPageSales] = useState<number>(1);
    const [pageProduct, setPageProduct] = useState<number>(1);
    const [pageBuyer, setPageBuyer] = useState<number>(1);
    const [addSale] = useAddSaleMutation();
    const [addBuyer] = useAddBuyerMutation();
    const [saleFinish] = useSaleFinishMutation();
    const [searchBuyer, setSearchBuyer] = useState('');
    const [searchSales, setSearchSales] = useState('');
    const debounceValueSales = useDebounce(searchSales);
    const debounceValueBuyer = useDebounce(searchBuyer);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listBuyerOpen, setListBuyerOpen] = useState(false);
    const [addBuyerOpen, setAddBuyerOpen] = useState(false);
    const { data: listSaleData, isError, isLoading, isSuccess, refetch: refetchListSale } = useGetListSaleQuery(pageSales);
    const { data: listProduct, refetch: refetchSaleProduct } = useGetSaleProductsQuery({ page: pageProduct, q: debounceValueSales });
    const { data: listBuyer, refetch: refetchListBuyer } = useGetListBuyerQuery({ page: pageBuyer, q: debounceValueBuyer });
    const [deleteSale, resultsDeleteSale] = useDeleteSaleMutation();
    const { id } = useParams();
    const [putGabor, results] = usePutGaborMutation();
    const [updatePrice, resultsUpdate] = useUpdatePriceMutation();
    const [scanProduct, setScanProduct] = useState('');
    const validScan = useDebounce(scanProduct, 1000);
    const [voucher, setVoucher] = useState<string>('');
    const [totalAfterDiscount, setTotalAfterDiscount] = useState<number | null>(null);
    const [discount, setDiscount] = useState<string>('');

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
        product_price_sale: '',
        voucher: '',
    });

    const [carton, setCarton] = useState({
        qty: '0',
        unitPrice: '0',
        totalPrice: '0',
    });

    const [grandTotal, setGrandTotal] = useState(0);

    const [currentId, setCurrentId] = useState<number | null>(null);
    const [inputs, setInputs] = useState<{ [key: number]: { [key: string]: string } }>({});

    useEffect(() => {
        if (listSale && Array.isArray(listSale)) {
            const initialInputs = listSale.reduce((acc, item) => {
                acc[item.id] = {
                    product_price_sale: '',
                    update_price_sale: '',
                };
                return acc;
            }, {} as { [key: number]: { [key: string]: string } });
            setInputs(initialInputs);
        }
    }, [listSale]);

    const handleInputChanges = (id: number, name: string, value: string) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [id]: {
                ...prevInputs[id],
                [name]: value,
            },
        }));
    };

    const clearInput = (id: number) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [id]: {
                product_price_sale: '',
                update_price_sale: '',
            },
        }));
    };

    useEffect(() => {
        if (isSuccess && listSale && Array.isArray(listSale)) {
            const saleItem = listSale.find((item) => item.status_sale === 'proses');
            if (saleItem) {
                setInput((prevState) => ({
                    ...prevState,
                    product_price_sale: saleItem.product_price_sale,
                    // Update other fields as necessary
                }));
                setCurrentId(saleItem.id); // Memperbarui id terpisah
            } else {
                // console.log('No item with status "proses" found in listSale');
            }
        } else {
            if (!listSale) {
                // console.log('listSale is undefined');
            } else if (!Array.isArray(listSale)) {
                // console.log('listSale is not an array');
            }
        }
    }, [listSale, isSuccess]);

    const handleGabor = async (id: number) => {
        try {
            const product_price_sale = inputs[id]?.product_price_sale;
            if (!product_price_sale) {
                console.log('Product price sale is undefined or empty');
                return; // Tidak melanjutkan jika product_price_sale tidak ada
            }
            const body = {
                product_price_sale,
                _method: 'PUT',
            };
            console.log('Sending data to putGabor:', { id, body });
            await putGabor({ id, body });
            refetchListSale();
            clearInput(id);
        } catch (err) {
            console.log('Error in handleGabor:', err);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const update_price_sale = inputs[id]?.update_price_sale;
            if (!update_price_sale) {
                console.log('Update price sale is undefined or empty');
                return; // Tidak melanjutkan jika update_price_sale tidak ada
            }
            const body = {
                update_price_sale,
                _method: 'PUT',
            };
            console.log('Sending data to updatePrice:', { id, body });
            await updatePrice({ id, body });
            refetchListSale();
            clearInput(id);
        } catch (err) {
            console.log('Error in handleUpdate:', err);
        }
    };

    useEffect(() => {
        const voucherAmount = Number(voucher);
        const total = listSaleData?.data.resource.total_sale ?? 0;

        if (voucherAmount > 0 && total > 0) {
            const discountedTotal = total - voucherAmount;
            const finalTotal = discountedTotal > 0 ? discountedTotal : 0;
            setTotalAfterDiscount(finalTotal);
        } else {
            setTotalAfterDiscount(total);
        }
    }, [voucher, listSaleData?.data.resource.total_sale]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);
        } else if (results.isError) {
            toast.error(results.data.data.message);
        }
    }, [results]);

    useEffect(() => {
        if (resultsUpdate.isSuccess) {
            toast.success(resultsUpdate.data.data.message);
        } else if (resultsUpdate.isError) {
            toast.error(resultsUpdate.data.data.message);
        }
    }, [resultsUpdate]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleAddSale = async (barcode_value: string) => {
        try {
            const body = {
                sale_barcode: barcode_value,
                buyer_id: inputBuyer.id,
                voucher: input.voucher,
                new_discount_sale: listSaleData?.data?.resource?.data[0]?.new_discount_sale || discount || '0', // Ambil diskon dari data atau dari state
            };

            await addSale(body)
                .unwrap()
                .then((res) => {
                    toast.success(res.data.message);
                    setScanProduct('');
                    setInput((prev) => ({ ...prev, sale_barcode: '' }));
                    setDiscount(''); // Reset discount after successful sale
                    navigate('/outbound/sale/kasir');
                    refetchListSale();
                })
                .catch((err) => toast.error(err.data.data.message));
        } catch (err) {
            console.error(err);
        }
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
                    refetchListSale();
                })
                .catch((err) => toast.error(err.data.data.message));
        } catch (err) {}
    };

    const handleFinishSale = async () => {
        try {
            const body = {
                voucher: voucher,
                total_price_document_sale: totalAfterDiscount !== null ? totalAfterDiscount.toString() : listSaleData?.data.resource.total_sale.toString() ?? '',
                cardbox_qty: carton.qty,
                cardbox_unit_price: carton.unitPrice,
            };
            console.log('body', body);
            await saleFinish(body)
                .unwrap()
                .then((res) => {
                    console.log('res', res);
                    toast.success(res.data.message);
                    navigate('/outbound/sale/list_kasir');
                    setInput((prev) => ({ ...prev, sale_barcode: '' }));
                    refetchListSale();
                })
                .catch((err) => toast.error(err.data.data.message));
        } catch (err) {
            console.error('Failed to finish sale:', err);
        }
    };

    const handleProductSelection = (e: MouseEvent<HTMLButtonElement>, selectedProductBarcode: string) => {
        e.preventDefault();
        handleAddSale(selectedProductBarcode);
        setIsModalOpen(false);
        setSearchSales('');
    };

    const handleSearchButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearchSales('');
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
        setSearchBuyer('');
    };

    const handleSearchBuyerButtonClick = () => {
        setListBuyerOpen(true);
        refetchListSale();
    };

    const handleCloseModalBuyer = () => {
        setListBuyerOpen(false);
        setSearchBuyer('');
    };

    const handleAddBuyerButtonClick = () => {
        setListBuyerOpen(false);
        setAddBuyerOpen(true);
    };

    const showAlert = async ({ type, id }: any) => {
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
                    title: 'Yakin ingin menghapus item ini?',
                    text: 'Data tidak bisa di kembalikan setelah di hapus',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yakin',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (resultsDeleteSale) => {
                    if (resultsDeleteSale.value) {
                        await deleteSale(id);
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                        refetchListSale();
                    } else if (resultsDeleteSale.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
                    }
                });
        }
        if (type === 15) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Berhasil Dikirim',
                padding: '10px 20px',
            });
        }
        if (type == 20) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Data Berhasil Ditambah',
                padding: '10px 20px',
            });
        }
    };

    useEffect(() => {
        if (validScan) {
            handleAddSale(validScan);
        }
    }, [validScan]);

    useEffect(() => {
        if (listSaleData && listSaleData.data && listSaleData.data.resource && listSaleData.data.resource.sale_buyer_id) {
            setInputBuyer((prevState) => ({
                ...prevState,
                id: listSaleData.data.resource.sale_buyer_id,
            }));
        }
    }, [listSaleData]);

    useEffect(() => {
        const total_price_carton = parseFloat(carton.qty) * parseFloat(carton.unitPrice);

        setCarton((prev) => ({ ...prev, totalPrice: total_price_carton.toString() }));
    }, [carton.qty, carton.unitPrice]);

    useEffect(() => {
        const totalProductPrice = totalAfterDiscount !== null ? totalAfterDiscount : listSaleData?.data.resource.total_sale ?? 0;
        const grand_total_price = totalProductPrice + parseFloat(carton.totalPrice);

        setGrandTotal(grand_total_price);
    }, [carton.totalPrice, totalAfterDiscount]);

    useEffect(() => {
        if (isNaN(parseFloat(carton.qty))) {
            setCarton((prev) => ({ ...prev, qty: '0' }));
        }
        if (isNaN(parseFloat(carton.unitPrice))) {
            setCarton((prev) => ({ ...prev, unitPrice: '0' }));
        }
    }, [carton]);

    useEffect(() => {
        refetchListSale();
        setPageSales(1);
        setPageProduct(1);
        setPageBuyer(1);
        setSearchBuyer('');
        setSearchSales('');
        refetchSaleProduct();
        refetchListBuyer();
    }, []);

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
                    <Dialog
                        as="div"
                        open={listBuyerOpen}
                        onClose={() => {
                            setListBuyerOpen(false);
                            setSearchBuyer('');
                        }}
                    >
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
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchBuyer(e.target.value)}
                                                    value={searchBuyer}
                                                    autoFocus
                                                />
                                            </div>
                                            <button type="button" className="btn btn-primary uppercase px-6" onClick={handleAddBuyerButtonClick}>
                                                Add Buyer
                                            </button>
                                        </div>
                                        <div className="max-h-[290px] overflow-y-scroll rounded-md mt-5">
                                            <DataTable
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
                                                page={pageBuyer}
                                                onPageChange={(prevPage) => setPageBuyer(prevPage)}
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
                    <Dialog
                        as="div"
                        open={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSearchSales('');
                        }}
                    >
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
                                                        render: (item: SubSalesProductsProps) => <span className="font-semibold max-w-[250px] block">{item.name}</span>,
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
                                                                        handleProductSelection(e, item.barcode);
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
                    <form className="w-2/3 flex flex-col mb-4 ">
                        <div className="flex w-full gap-6">
                            <div className="flex flex-col gap-0.5 w-full">
                                <div className="flex items-center justify-between mb-4">
                                    <label htmlFor="new_discount_sale" className="text-[15px] font-semibold whitespace-nowrap">
                                        Discount:
                                    </label>
                                    <input
                                        id="new_discount_sale"
                                        type="text"
                                        name="new_discount_sale"
                                        value={listSaleData?.data?.resource?.data[0]?.new_discount_sale || discount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d*$/.test(value)) {
                                                setDiscount(value);
                                            }
                                        }}
                                        className="form-input w-[250px]"
                                        placeholder="Enter discount amount"
                                        disabled={!!listSaleData?.data?.resource?.data[0]?.new_discount_sale} // Disabled jika ada diskon yang sudah ada
                                    />
                                </div>
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
                                    <label htmlFor="voucherAmount" className="text-[15px] font-semibold whitespace-nowrap">
                                        Voucher Amount:
                                    </label>
                                    <input
                                        id="voucher"
                                        type="number"
                                        name="voucher"
                                        value={voucher}
                                        onChange={(e) => setVoucher(e.target.value)}
                                        className="form-input w-[250px]"
                                        placeholder="Enter voucher amount"
                                    />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                        TOTAL :
                                    </label>
                                    <input
                                        id="categoryName"
                                        type="text"
                                        value={formatRupiah(totalAfterDiscount !== null ? totalAfterDiscount.toString() : listSaleData?.data.resource.total_sale.toString() ?? '')}
                                        placeholder="Rp"
                                        className="form-input w-[250px] disabled:cursor-default"
                                        required
                                        disabled
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <label htmlFor="categoryName" className={clsx('text-[15px] font-semibold whitespace-nowrap', !inputBuyer.id && '-mt-6')}>
                                            Scan Product :
                                        </label>
                                        <div className="relative flex w-[250px] flex-col mb-4">
                                            <input
                                                type="text"
                                                className="form-input disabled:cursor-not-allowed flex-1 ltr:pl-4 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                                placeholder="Search..."
                                                onChange={(e) => setScanProduct(e.target.value)}
                                                value={scanProduct}
                                                name="sale_barcode"
                                                disabled={!inputBuyer.id}
                                            />
                                            {!inputBuyer.id && <p className="text-gray-700 text-xs mt-1">*Silahkan pilih buyer & isi diskon dahulu</p>}
                                            <button
                                                type="button"
                                                className={clsx(
                                                    'h-7 w-7 absolute right-1.5 disabled:cursor-not-allowed transform -translate-y-1/2 justify-center items-center border-green-500',
                                                    !inputBuyer.id ? 'top-4.5' : 'top-1/2'
                                                )}
                                                onClick={handleSearchButtonClick}
                                                disabled={!inputBuyer.id}
                                            >
                                                <IconSearch className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex flex-col gap-2 w-full border rounded-md p-4">
                                    <h3 className="text-lg font-bold">Carton Box</h3>
                                    <div className="flex flex-col">
                                        <label htmlFor="qty-box">Qty</label>
                                        <div className="flex gap-2">
                                            <input
                                                className="form-input"
                                                id="qty-box"
                                                type="number"
                                                onChange={(e) =>
                                                    setCarton((prev) => ({
                                                        ...prev,
                                                        qty: e.target.value.length > 1 && e.target.value.startsWith('0') ? e.target.value.replace(/^0+/, '') : e.target.value,
                                                    }))
                                                }
                                                value={carton.qty}
                                                placeholder={'Carton Qty..'}
                                            />
                                            <button
                                                disabled={parseFloat(carton.qty) === 0}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCarton((prev) => ({ ...prev, qty: (parseFloat(prev.qty) - 1).toString() }));
                                                }}
                                                className="w-10 h-10 border disabled:cursor-default disabled:opacity-50 disabled:hover:bg-transparent hover:bg-sky-100 rounded-md flex-none flex justify-center items-center border-black text-black"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M5 12h14" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCarton((prev) => ({ ...prev, qty: (parseFloat(prev.qty) + 1).toString() }));
                                                }}
                                                className="w-10 h-10 border rounded-md flex-none flex hover:bg-sky-100 justify-center items-center border-black text-black"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M5 12h14" />
                                                    <path d="M12 5v14" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="unit-price">Unit Price</label>
                                        <input
                                            className="form-input"
                                            value={carton.unitPrice}
                                            onChange={(e) =>
                                                setCarton((prev) => ({
                                                    ...prev,
                                                    unitPrice: e.target.value.length > 1 && e.target.value.startsWith('0') ? e.target.value.replace(/^0+/, '') : e.target.value,
                                                }))
                                            }
                                            id="unit-price"
                                            type="number"
                                            placeholder={'Rp 0'}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="total-price">Total Price</label>
                                        <input id="total-price" disabled value={formatRupiah(carton.totalPrice.toString())} className="disabled:cursor-default form-input" placeholder={'Rp 0'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="grand-price" className="text-lg font-semibold">
                                Grand Total
                            </label>
                            <input id="grand-price" placeholder={'Rp 0'} value={formatRupiah(grandTotal.toString())} className="disabled:cursor-default form-input" disabled />
                        </div>
                    </form>

                    <div className="datatables">
                        <DataTable
                            records={listSale}
                            columns={[
                                {
                                    accessor: 'No',
                                    title: 'No',
                                    render: (item: GetListSaleItem, index: number) => <span>{index + 1}</span>,
                                },
                                {
                                    accessor: 'product_barcode_sale',
                                    title: 'Barcode',
                                    render: (item: GetListSaleItem) => <span className="font-semibold">{item.product_barcode_sale}</span>,
                                },
                                {
                                    accessor: 'product_name_sale',
                                    title: 'Name',
                                    render: (item: GetListSaleItem) => <span className="font-semibold max-w-[250px] block">{item.product_name_sale}</span>,
                                },
                                {
                                    accessor: 'product_price_sale',
                                    title: 'Gabor',
                                    render: (item: GetListSaleItem) => (
                                        <div>
                                            <input
                                                type="text"
                                                name="product_price_sale"
                                                onChange={(e) => handleInputChanges(item.id, e.target.name, e.target.value)}
                                                value={inputs[item.id]?.product_price_sale ?? item.product_price_sale}
                                                className="form-input flex-1 ltr:pl-4 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                            />
                                            <button className="btn w-full btn-outline-primary mt-4 px-3" onClick={() => handleGabor(item.id)}>
                                                Send
                                            </button>
                                        </div>
                                    ),
                                },
                                {
                                    accessor: 'update_price_sale',
                                    title: 'Update Price',
                                    render: (item: GetListSaleItem) => (
                                        <div>
                                            <input
                                                type="text"
                                                name="update_price_sale"
                                                onChange={(e) => handleInputChanges(item.id, e.target.name, e.target.value)}
                                                value={inputs[item.id]?.update_price_sale ?? item.product_price_sale}
                                                className="form-input flex-1 ltr:pl-4 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                            />
                                            <button className="btn w-full btn-outline-primary mt-4 px-3" onClick={() => handleUpdate(item.id)}>
                                                Update
                                            </button>
                                        </div>
                                    ),
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
                                            <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                    textAlignment: 'center',
                                },
                            ]}
                            totalRecords={listSaleData?.data.resource.total ?? 0}
                            recordsPerPage={listSaleData?.data.resource.per_page ?? 10}
                            page={pageSales}
                            onPageChange={(prevPage) => setPageSales(prevPage)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Kasir;
