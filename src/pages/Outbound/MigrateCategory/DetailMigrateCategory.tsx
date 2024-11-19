import { DataTable } from 'mantine-datatable';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ChangeEvent, Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { useAddDetailBundleProductMutation, useDeleteDetailBundleProductMutation, useDetailBundleProductQuery, useExportToExcelDetailBundleMutation, useUpdateDetailBundleMutation } from '../../../store/services/bundleProductApi';
import { formatRupiah, useDebounce } from '../../../helper/functions';
import { useGetDisplayExpiredQuery } from '../../../store/services/productNewApi';
import { MigratedCategoryItem, ProductExpiredItem } from '../../../store/services/types';
import IconSquareCheck from '../../../components/Icon/IconSquareCheck';
import BarcodePrinted from '../../RepairStation/ListProductRepair/BarcodePrinted';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { useDetailProductMigrateCategoryQuery } from '../../../store/services/migrateApi';

const DetailMigrateCategory = () => {
    const { id }: any = useParams();
    const { data, isSuccess, refetch } = useDetailProductMigrateCategoryQuery(id);
    const [exportToExcel, results] = useExportToExcelDetailBundleMutation();
    const [searchProductBundle, setSearchProductBundle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageProduct, setPageProduct] = useState<number>(1);
    const debounceValueProductBundle = useDebounce(searchProductBundle);
    const { data: listProduct, refetch: refetchListProduct } = useGetDisplayExpiredQuery({ page: pageProduct, q: debounceValueProductBundle });
    const [deleteBundle, resultsDeleteBundle] = useDeleteDetailBundleProductMutation();
    const [addDetailBundleProduct] = useAddDetailBundleProductMutation();
    const [updateDetailBundle] = useUpdateDetailBundleMutation();

    const productNewData = useMemo(() => {
        return listProduct?.data.resource.data;
    }, [listProduct]);

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
            await addDetailBundleProduct({ productId: id, bundleId: selectedProductId });
            toast.success('Produk berhasil ditambahkan ke bundle.');
            setIsModalOpen(false);
            setSearchProductBundle('');
            refetch();
        } catch (error) {
            toast.error('Gagal menambahkan produk ke bundle.');
            console.error('Error adding product to bundle:', error);
        }
    };

    const detailDataBundle = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);

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

            toast.success('Data Bundle berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data Bundle.');
            console.error('Error exporting Bundle to Excel:', err);
        }
    };

    const [editFormData, setEditFormData] = useState({
        name_bundle: '',
        category: '',
        total_price_custom_bundle: '',
        total_price_bundle: '',
    });

    // useEffect(() => {
    //     if (isSuccess && data) {
    //         const resource = data.data.resource;
    //         setEditFormData({
    //             name_bundle: resource.name_bundle,
    //             category: resource.category,
    //             total_price_custom_bundle: resource.total_price_custom_bundle,
    //             total_price_bundle: resource.total_price_bundle,
    //         });
    //     }
    // }, [data, isSuccess]);

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
                name_bundle: editFormData.name_bundle,
                category: editFormData.category,
                total_price_custom_bundle: editFormData.total_price_custom_bundle,
                total_price_bundle: editFormData.total_price_bundle,
            };
            await updateDetailBundle({ id, body });
            toast.success('Data Bundle berhasil diperbarui.');
            refetch();
        } catch (error) {
            toast.error('Gagal memperbarui data Bundle.');
            console.error('Error updating Bundle:', error);
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
                        await deleteBundle(id)
                            .unwrap()
                            .then((res) => console.log(res))
                            .catch((err) => console.log('error', err));
                        // swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
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
                                                highlightOnHover
                                                className="whitespace-nowrap table-hover"
                                                records={productNewData}
                                                columns={[
                                                    {
                                                        accessor: 'No',
                                                        title: 'No',
                                                        render: (item: ProductExpiredItem, index: number) => <span>{index + 1}</span>,
                                                    },
                                                    {
                                                        accessor: 'id product',
                                                        title: 'Id Produk',
                                                        render: (item: ProductExpiredItem) => <span className="font-semibold">{item.id}</span>,
                                                    },
                                                    {
                                                        accessor: 'barcode',
                                                        title: 'Barcode',
                                                        render: (item: ProductExpiredItem) => <span className="font-semibold">{item.old_barcode_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'name',
                                                        title: 'Nama',
                                                        render: (item: ProductExpiredItem) => <span className="font-semibold">{item.new_name_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'category',
                                                        title: 'Kategori',
                                                        render: (item: ProductExpiredItem) => <span className="font-semibold">{item.new_category_product}</span>,
                                                    },
                                                    {
                                                        accessor: 'action',
                                                        title: 'Opsi',
                                                        titleClassName: '!text-center',
                                                        render: (item: ProductExpiredItem) => (
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
                    <Link to="/outbound/category_migrate/category_migrate">
                        <span>Migrate Category</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Product Migrate Category</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Product Migrate Category </h1>
            </div>
            <div>
                {/* <div className="flex gap-4 items-center mb-4 divide-x divide-gray-500">
                    <form className="w-[400px]" onSubmit={handleSaveEdit}>
                        <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button>
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Barcode Bundle :
                            </label>
                            <input id="categoryName" type="text" value={detailDataBundle?.barcode_bundle} className=" form-input w-[250px]" required />
                        </div>
                        <span className="text-[8px] text[#7A7A7A]">*note : MaxPrice merupakan inputan nullable</span>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Bundle :
                            </label>
                            <input id="categoryName" type="text" className=" form-input w-[250px]" onChange={handleInputChange} name="name_bundle" value={editFormData.name_bundle} required />
                        </div>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori :
                            </label>
                            <input id="categoryName" type="text" onChange={handleInputChange} name="category" value={editFormData.category} className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Awal :
                            </label>
                            <input
                                id="categoryName"
                                type="text"
                                onChange={handleInputChange}
                                name="total_price_bundle"
                                value={editFormData.total_price_bundle}
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Custom Display :
                            </label>
                            <input
                                id="categoryName"
                                type="text"
                                onChange={handleInputChange}
                                name="total_price_custom_bundle"
                                value={editFormData.total_price_custom_bundle}
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                        <div className="flex items-center mt-4">
                            <button type="submit" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto">
                                Update
                            </button>
                        </div>
                    </form>
                    <div className="px-4">
                        <BarcodePrinted
                            barcode={detailDataBundle?.barcode_bundle ?? ''}
                            newPrice={formatRupiah(detailDataBundle?.total_price_custom_bundle ?? '0')}
                            oldPrice={formatRupiah(detailDataBundle?.total_price_bundle ?? '0')}
                            category={detailDataBundle?.name_bundle ?? ''}
                            isBundle
                        />
                    </div>
                </div> */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/outbound/category_migrate/category_migrate">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <div className="flex items-center justify-between mb-4">
                            <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto mr-4" onClick={handleSearchButtonClick}>
                                Add
                            </button>
                            {/* <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData}>
                                Export data
                            </button> */}
                        </div>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            records={detailDataBundle?.migrate_bulky_products}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item: MigratedCategoryItem, index: number) => <span>{index + 1}</span> },
                                { accessor: 'code_document', title: 'Code Document', sortable: true, render: (item: MigratedCategoryItem) => <span>{item.code_document}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode', sortable: true, render: (item: MigratedCategoryItem) => <span>{item.new_barcode_product}</span> },
                                { accessor: 'new_category_product', title: 'Kategori', sortable: true, render: (item: MigratedCategoryItem) => <span>{item.new_category_product}</span> },
                                { accessor: 'new_name_product', title: 'Nama', sortable: true, render: (item: MigratedCategoryItem) => <span>{item.new_name_product}</span> },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true, render: (item: MigratedCategoryItem) => <span>{formatRupiah(item.new_price_product ?? '0')}</span> },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: (item: MigratedCategoryItem) => <span className="badge whitespace-nowrap bg-primary">{item.new_status_product}</span>,
                                },
                                {
                                    accessor: 'Aksi',
                                    title: 'Aksi',
                                    render: (item: MigratedCategoryItem) => (
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

export default DetailMigrateCategory;
