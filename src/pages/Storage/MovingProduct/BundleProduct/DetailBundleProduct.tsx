import { DataTable } from 'mantine-datatable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDetailBundleProductQuery, useExportToExcelDetailBundleMutation } from '../../../../store/services/bundleProductApi';
import { ChangeEvent, Fragment, MouseEvent, useMemo, useState } from 'react';
import { formatRupiah, useDebounce } from '../../../../helper/functions';
import IconArrowBackward from '../../../../components/Icon/IconArrowBackward';
import { NewProductItem, ProductExpiredItem, SubSalesProductsProps } from '../../../../store/services/types';
import BarcodePrinted from '../../../Inbound/CheckProduct/BarcodePrinted';
import { Dialog, Transition } from '@headlessui/react';
import { useGetDisplayExpiredQuery, useGetSaleProductsQuery } from '../../../../store/services/productNewApi';
import IconSquareCheck from '../../../../components/Icon/IconSquareCheck';
import toast from 'react-hot-toast';
import { useAddSaleMutation, useGetListSaleQuery } from '../../../../store/services/saleApi';

const DetailBundleProduct = () => {
    const navigate = useNavigate();
    const { id }: any = useParams();
    const { data, isSuccess } = useDetailBundleProductQuery(id);
    const [exportToExcel, results] = useExportToExcelDetailBundleMutation();
    const [searchSales, setSearchSales] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageProduct, setPageProduct] = useState<number>(1);
    const [pageSales, setPageSales] = useState<number>(1);
    const debounceValueSales = useDebounce(searchSales);
    const { data: listSaleData, isError, isLoading, refetch: refetchListSale } = useGetListSaleQuery(pageSales);
    const {  data: listProduct, refetch } = useGetDisplayExpiredQuery({ page: pageProduct, q: debounceValueSales });
    const [addSale] = useAddSaleMutation();
    const [scanProduct, setScanProduct] = useState('');

    const productNewData = useMemo(() => {
        return listProduct?.data.resource.data;
    }, [listProduct]);

    const handleSearchButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSearchSales('');
    };

    const handleAddSale = async (barcode_value: string) => {
        try {
            const body = {
                sale_barcode: barcode_value,
            };
            await addSale(body)
                .unwrap()
                .then((res) => {
                    toast.success(res.data.message);
                    setScanProduct('');
                    navigate('/outbound/sale/kasir');
                    refetchListSale();
                })
                .catch((err) => toast.error(err.data.data.message));
        } catch (err) {}
    };

    const handleProductSelection = (e: MouseEvent<HTMLButtonElement>, selectedProductBarcode: string) => {
        e.preventDefault();
        handleAddSale(selectedProductBarcode);
        setIsModalOpen(false);
        setSearchSales('');
    };

    const detailDataBundle = useMemo(() => {
        if (isSuccess) {
            return data.data.resource;
        }
    }, [data]);

    const handleExportData = async () => {
        try {
            const body = {
                id: detailDataBundle?.id,
            };
            await exportToExcel(body);
        } catch (err) {
            console.log(err);
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
                        // await deleteDocument(id);
                        swalWithBootstrapButtons.fire('Deleted!', 'Your file has been deleted.', 'success');
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
                                                                        handleProductSelection(e, item.old_barcode_product);
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
                    <Link to="/storage/storage/bundle_product">
                        <span>Moving Product</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Detail Bundle</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Detail Bundle</h1>
            </div>
            <div>
                <div className="flex gap-4 items-center mb-4 divide-x divide-gray-500">
                    <form className="w-[400px]">
                        {/* <button type="submit" className="btn btn-primary mb-4 px-16">
                        Create Bundle
                    </button> */}
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
                            <input id="categoryName" type="text" value={detailDataBundle?.name_bundle} className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Kategori :
                            </label>
                            <input id="categoryName" type="text" value={detailDataBundle?.category} className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Awal :
                            </label>
                            <input id="categoryName" type="text" value={formatRupiah(detailDataBundle?.total_price_bundle ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Custom Display :
                            </label>
                            <input id="categoryName" type="text" value={formatRupiah(detailDataBundle?.total_price_custom_bundle ?? '0')} placeholder="Rp" className=" form-input w-[250px]" required />
                        </div>
                        <div className="flex items-center mt-4">
                            <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData}>
                                Edit
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
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/storage/moving_product/bundle">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <div className="flex items-center justify-between mb-4">
                            {/* <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto mr-4" onClick={handleSearchButtonClick}>
                                Add
                            </button> */}
                            {/* <button type="button" className="btn btn-lg lg:btn btn-primary uppercase w-full md:w-auto lg:w-auto" onClick={handleExportData}>
                                Export data
                            </button> */}
                        </div>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            records={detailDataBundle?.product_bundles}
                            columns={[
                                { accessor: 'id', title: 'No', sortable: true, render: (item: NewProductItem, index: number) => <span>{index + 1}</span> },
                                { accessor: 'code_document', title: 'Code Document', sortable: true, render: (item: NewProductItem) => <span>{item.code_document}</span> },
                                { accessor: 'new_barcode_product', title: 'Barcode', sortable: true, render: (item: NewProductItem) => <span>{item.new_barcode_product}</span> },
                                { accessor: 'new_category_product', title: 'Kategori', sortable: true, render: (item: NewProductItem) => <span>{item.new_category_product}</span> },
                                { accessor: 'new_name_product', title: 'Nama', sortable: true, render: (item: NewProductItem) => <span>{item.new_name_product}</span> },
                                { accessor: 'new_price_product', title: 'Harga', sortable: true, render: (item: NewProductItem) => <span>{formatRupiah(item.new_price_product ?? '0')}</span> },
                                {
                                    accessor: 'status',
                                    title: 'Status',
                                    sortable: true,
                                    render: (item: NewProductItem) => <span className="badge whitespace-nowrap bg-primary">{item.new_status_product}</span>,
                                },
                                {
                                    accessor: 'Aksi',
                                    title: 'Aksi',
                                    render: (item: NewProductItem) => (
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

export default DetailBundleProduct;
