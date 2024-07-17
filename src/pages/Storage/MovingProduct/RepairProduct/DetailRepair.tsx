import { DataTable } from 'mantine-datatable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { formatRupiah } from '../../../../helper/functions';
import {
    useDeleteReprairMutation,
    useGetProductRepairQuery,
    useGetShowRepairMovingProductsQuery,
    useUpdateReprairMutation,
    useUpdateThrowsDetailMutation,
      useExportToExcelDetailRepairMutation
} from '../../../../store/services/repairMovingApi';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import BarcodePrinted from '../../../Inbound/CheckProduct/BarcodePrinted';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

const DetailRepair = () => {
    const { id }: any = useParams();
    const { data, isSuccess, refetch, isError } = useGetShowRepairMovingProductsQuery(id);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const { data: dataProduct, isSuccess: isSucessProduct, refetch: refetchProduct, isError: isErrorProduct } = useGetProductRepairQuery(selectedItem);
    const [throws, setThrows] = useState(false);
    const [edit, setEdit] = useState(false);
    const [display, setDisplay] = useState(false);
    const [updateThrows, results] = useUpdateThrowsDetailMutation();
    const [deleteRepair, resultDeleteRepair] = useDeleteReprairMutation();
    const [updateRepair, resultUpdateRepair] = useUpdateReprairMutation();
    const navigate = useNavigate();
    const [input, setInput] = useState({ barcode: '', name: '', qty: 0, price: 0, category: '' });
    const [exportToExcel] = useExportToExcelDetailRepairMutation();

    const detailDataBundle = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);
    const detailDataProduct = dataProduct?.data.resource;

    const handleExportData = async () => {
        try {
            const response = await exportToExcel({ id }).unwrap();
            const url = response.data.resource;
            const fileName = url.substring(url.lastIndexOf('/') + 1); 
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; 
            document.body.appendChild(a);
            a.click();
            a.remove();
    
            toast.success('Data detail repair berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data detail repair.');
            console.error('Error exporting detail repair to Excel:', err);
        }
    };

    const handleThrowsConfirmation = async (id: number) => {
        try {
            setThrows(false);
            await updateThrows(id);
            refetch();
        } catch (err) {
            console.error('Error updating QCD:', err);
        } finally {
            setThrows(false);
        }
    };
    const handleDisplayConfirmation = async (id: number) => {
        try {
            setDisplay(false);
            await deleteRepair(id);
            refetch();
        } catch (err) {
            console.error('Error updating To Display:', err);
        } finally {
            setThrows(false);
        }
    };
    const handleEditConfirmation = async (id: number) => {
        const body = {
            new_barcode_product: input.barcode,
            new_category_product: input.category,
            new_name_product: input.name,
            new_quantity_product: input.qty,
            old_price_product: input.price,
        };
        try {
            setEdit(false);
            await updateRepair({ id, body });
            refetch();
        } catch (err) {
            console.error('Error updating Repair:', err);
        } finally {
            setThrows(false);
        }
    };

    const handleThrows = (id: number) => {
        setSelectedItem(id);
        setThrows(true);
    };
    const handleEdit = (id: number) => {
        setSelectedItem(id);
        setEdit(true);
    };
    const handleToDisplay = (id: number) => {
        setSelectedItem(id);
        setDisplay(true);
    };

    useEffect(() => {
        if (selectedItem && edit) {
            refetchProduct();
        }
        if (selectedItem && edit && isSucessProduct) {
            setInput((prev) => ({
                ...prev,
                barcode: detailDataProduct.new_barcode_product,
                name: detailDataProduct.new_name_product,
                price: detailDataProduct.old_price_product,
                qty: detailDataProduct.new_quantity_product,
                category: detailDataProduct.new_category_product,
            }));
        }
        if (!edit && isErrorProduct) {
            setInput({
                barcode: '',
                name: '',
                price: 0,
                qty: 0,
                category: '',
            });
            setSelectedItem(null);
        }
    }, [selectedItem, edit, isSucessProduct, detailDataProduct, isErrorProduct]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results?.data?.data?.message);
            refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message);
        }
        if (resultUpdateRepair.isSuccess) {
            toast.success(resultUpdateRepair?.data?.data?.message);
            refetch();
        } else if (resultUpdateRepair.isError) {
            toast.error(resultUpdateRepair?.data?.data?.message);
        }
        if (resultDeleteRepair.isSuccess) {
            toast.success(resultDeleteRepair?.data?.data?.message);
            refetch();
        } else if (resultDeleteRepair.isError) {
            toast.error(resultDeleteRepair?.data?.data?.message);
        }
    }, [results, resultUpdateRepair, resultDeleteRepair]);

    useEffect(() => {
        if (isError) {
            navigate('/storage/moving_product/repair');
        }
    }, [isError]);

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
                        <div className="flex items-center justify-between mb-4">
                            {/* <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto mr-4" onClick={handleSearchButtonClick}>
                                Add
                            </button> */}
                            <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData}>
                                Export data
                            </button>
                        </div>
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
                                {
                                    accessor: 'action',
                                    title: 'Opsi',
                                    titleClassName: '!text-center',
                                    render: (item) => (
                                        <div className="">
                                            <div className="flex items-center gap-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => handleThrows(item.id)}>
                                                    QCD
                                                </button>
                                                <button type="button" className="btn btn-outline-info" onClick={() => handleEdit(item.id)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-outline-warning" onClick={() => handleToDisplay(item.id)}>
                                                    To Display
                                                </button>
                                            </div>
                                        </div>
                                    ),
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <Transition appear show={throws} as={Fragment}>
                <Dialog as="div" open={throws} onClose={() => setThrows(false)}>
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
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">QCD List Product</div>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <form className="space-y-5">
                                                <div>
                                                    <h1>Apakah Anda yakin ingin melakukan QCD?</h1>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setThrows(false)}>
                                                Kembali
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleThrowsConfirmation(selectedItem || 0)}>
                                                QCD
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={edit} as={Fragment}>
                <Dialog as="div" open={edit} onClose={() => setEdit(false)}>
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
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">Update List Product</div>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <form className="space-y-5">
                                                <div className="flex flex-col">
                                                    <label htmlFor="barcode">Barcode</label>
                                                    <input
                                                        className="w-full border border-gray-300 rounded shadow h-10 px-3 text-sm"
                                                        name="barcode"
                                                        value={input.barcode}
                                                        onChange={(e) => setInput((prev) => ({ ...prev, barcode: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        className="w-full border border-gray-300 rounded shadow h-10 px-3 text-sm"
                                                        name="name"
                                                        value={input.name}
                                                        onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="quantity">Quantity</label>
                                                    <input
                                                        className="w-full border border-gray-300 rounded shadow h-10 px-3 text-sm"
                                                        name="quantity"
                                                        value={input.qty}
                                                        onChange={(e) => setInput((prev) => ({ ...prev, qty: parseFloat(e.target.value) }))}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="price">Price</label>
                                                    <input
                                                        className="w-full border border-gray-300 rounded shadow h-10 px-3 text-sm"
                                                        name="price"
                                                        value={input.price}
                                                        onChange={(e) => setInput((prev) => ({ ...prev, price: parseFloat(e.target.value) }))}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="category">Category</label>
                                                    <input
                                                        className="w-full border border-gray-300 rounded shadow h-10 px-3 text-sm"
                                                        name="category"
                                                        value={input.category}
                                                        onChange={(e) => setInput((prev) => ({ ...prev, category: e.target.value }))}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setEdit(false)}>
                                                Kembali
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleEditConfirmation(selectedItem || 0)}>
                                                Upadate
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Transition appear show={display} as={Fragment}>
                <Dialog as="div" open={display} onClose={() => setDisplay(false)}>
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
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                        <div className="text-lg font-bold">To Display List Product</div>
                                    </div>
                                    <div className="p-5">
                                        <div>
                                            <form className="space-y-5">
                                                <div>
                                                    <h1>Apakah Anda yakin ingin melakukan To Display?</h1>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setDisplay(false)}>
                                                Kembali
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                onClick={() => {
                                                    handleDisplayConfirmation(selectedItem || 0);
                                                }}
                                            >
                                                To Display
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default DetailRepair;
