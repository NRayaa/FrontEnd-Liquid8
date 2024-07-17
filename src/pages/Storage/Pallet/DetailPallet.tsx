import { DataTable } from 'mantine-datatable';
import { Link, useParams } from 'react-router-dom';
import { ChangeEvent, Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';
import {
    useAddDetailPalletProductMutation,
    useDeleteDetailPalletProductMutation,
    useDisplayPalletListsQuery,
    useExportToExcelDetailPalletMutation,
    useShowPalletQuery,
    useUpdateDetailPalletMutation,
} from '../../../store/services/palletApi';
import { formatRupiah, useDebounce } from '../../../helper/functions';
import BarcodePalet from './BarcodePalet';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { PaletListItem, ProdcutItem, SubPaletItem } from '../../../store/services/types';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';

const PalletDetail = () => {
    const { id }: any = useParams();
    const { data, isSuccess, refetch } = useShowPalletQuery(id);
    const [deletePallete] = useDeleteDetailPalletProductMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchProductBundle, setSearchProductBundle] = useState('');
    const [pageProduct, setPageProduct] = useState<number>(1);
    const debounceValueProductBundle = useDebounce(searchProductBundle);
    const { data: listProduct } = useDisplayPalletListsQuery({ page: pageProduct, q: debounceValueProductBundle });
    const [addDetailPalletProduct] = useAddDetailPalletProductMutation();
    const [updateDetailPallet] = useUpdateDetailPalletMutation();
    const [exportToExcel] = useExportToExcelDetailPalletMutation();

    const productNewData = useMemo(() => {
        return listProduct?.data.resource.data;
    }, [data]);

    const detailDataPallet = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);

    const [editFormData, setEditFormData] = useState({
        nama_palet: '',
        total_price_palet: '',
    });

    useEffect(() => {
        if (isSuccess && data) {
            const resource = data.data.resource;
            setEditFormData({
                nama_palet: resource.name_palet,
                total_price_palet: resource.total_price_palet,
            });
        }
    }, [data, isSuccess]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleSaveEdit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const body = {
                nama_palet: editFormData.nama_palet,
                total_price_palet: editFormData.total_price_palet,
            };
            await updateDetailPallet({ id, body });
            toast.success('Data Pallet berhasil diperbarui.');
            refetch();
        } catch (error) {
            toast.error('Gagal memperbarui data Pallet.');
            console.error('Error updating Pallet:', error);
        }
    };

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
            toast.success('Data Pallet berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data Pallet.');
            console.error('Error exporting Pallet to Excel:', err);
        }
    };

    const handleSearchButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearchProductBundle('');
    };

    const handleAddDetailProduct = async (e: MouseEvent<HTMLButtonElement>, selectedProductId: string) => {
        e.preventDefault();
        try {
            await addDetailPalletProduct({ productId: id, palletId: selectedProductId });
            toast.success('Produk berhasil ditambahkan ke bundle.');
            setIsModalOpen(false);
            setSearchProductBundle('');
            refetch();
        } catch (error) {
            toast.error('Gagal menambahkan produk ke bundle.');
            console.error('Error adding product to bundle:', error);
        }
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
                .then(async (result) => {
                    if (result.value) {
                        await deletePallete(id);
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
                        refetch();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
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

    return (
        <div>
            <div>
                <Transition appear show={isModalOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        open={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false);
                            setSearchProductBundle('');
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
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchProductBundle(e.target.value)}
                                                value={searchProductBundle}
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
                                                        render: (item: ProdcutItem, index: number) => <span>{index + 1}</span>,
                                                    },
                                                    {
                                                        accessor: 'id product',
                                                        title: 'Id Produk',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.id}</span>,
                                                    },
                                                    {
                                                        accessor: 'barcode',
                                                        title: 'Barcode',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.old_barcode_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'name',
                                                        title: 'Nama',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.new_name_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'category',
                                                        title: 'Kategori',
                                                        render: (item: ProdcutItem) => <span className="font-semibold">{item.new_category_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Opsi',
                                                        titleClassName: '!text-center',
                                                        render: (item: ProdcutItem) => (
                                                            <div className="flex items-center w-max mx-auto gap-6">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-info"
                                                                    onClick={(e) => {
                                                                        handleAddDetailProduct(e, item.id.toString());
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
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/storage/pallet">
                        <span>Pallet</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Pallet</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Pallet</h1>
            </div>
            <div>
                <div className="flex gap-4 items-center mb-4 divide-x divide-gray-500">
                    <form className="w-[400px]" onSubmit={handleSaveEdit}>
                        {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode Pallet :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataPallet?.palet_barcode} className=" form-input w-[250px]" required />
                        </div>
                        <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Pallet :
                            </label>
                            <input id="categoryName" type="text" className=" form-input w-[250px]" onChange={handleInputChange} name="nama_palet" value={editFormData.nama_palet} required />
                        </div>
                        <div className="flex items-center justify-between  mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori Pallet :
                            </label>
                            <input id="categoryName" disabled type="text" value={detailDataPallet?.category_palet} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga Lama :
                            </label>
                            <input id="categoryName" disabled type="text" value={formatRupiah(detailDataPallet?.total_harga_lama ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga Baru:
                            </label>
                            <input
                                id="categoryName"
                                // disabled
                                type="text"
                                name="total_price_palet"
                                onChange={handleInputChange}
                                value={editFormData.total_price_palet}
                                // value={formatRupiah(detailDataPallet?.total_price_palet ?? '0')}
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4 px-16">
                            Update
                        </button>
                    </form>
                    <div className="px-4">
                        <BarcodePalet
                            barcode={detailDataPallet?.palet_barcode ?? ''}
                            category={detailDataPallet?.category_palet ?? ''}
                            newPrice={formatRupiah(detailDataPallet?.total_price_palet ?? '0')}
                            oldPrice={formatRupiah(detailDataPallet?.total_price_palet ?? '0')}
                            namePalet={detailDataPallet?.name_palet ?? ''}
                        />
                    </div>
                </div>
                {/* <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div> */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/storage/pallet">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <div className="flex items-center justify-between mb-4">
                            <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto mr-4" onClick={handleSearchButtonClick}>
                                Add
                            </button>
                            <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData}>
                                Export data
                            </button>
                        </div>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            highlightOnHover
                            records={detailDataPallet?.palet_products}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item: SubPaletItem, index: number) => <span>{index + 1}</span> },
                                { accessor: 'code_document', title: 'Code Document', sortable: true, render: (item: SubPaletItem) => <span>{item.code_document}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode', sortable: true, render: (item: SubPaletItem) => <span>{item.new_barcode_product}</span> },
                                { accessor: 'new_category_product', title: 'Kategori', sortable: true, render: (item: SubPaletItem) => <span>{item.new_category_product}</span> },
                                { accessor: 'new_name_product', title: 'Nama', sortable: true, render: (item: SubPaletItem) => <span>{item.new_name_product}</span> },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true, render: (item: SubPaletItem) => <span>{formatRupiah(item.new_price_product ?? '0')}</span> },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: (item: SubPaletItem) => <span className="badge whitespace-nowrap bg-primary">{item.new_status_product}</span>,
                                },
                                {
                                    accessor: 'Aksi',
                                    title: 'Aksi',
                                    render: (item: SubPaletItem) => (
                                        <div className="flex items-center w-max mx-auto gap-6">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => showAlert({ type: 11, id: item.id })}>
                                                Remove
                                            </button>
                                        </div>
                                    ),
                                    textAlignment: 'center',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PalletDetail;
