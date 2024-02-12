import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, Fragment, useMemo, ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IRootState } from '../../../store';
import { useGetListProductRepairQuery, useUpdateProductRepairMutation, useUpdateThrowsMutation } from '../../../store/services/listProductAPI';
import { GetListProductRepairItem, ProdcutItem } from '../../../store/services/types';
import { useGetCategoriesQuery } from '../../../store/services/categoriesApi';
import toast from 'react-hot-toast';

const ListProductRepair = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data: listProductData, refetch } = useGetListProductRepairQuery({ page, q: search });
    const { data: categoriesData } = useGetCategoriesQuery(undefined);
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const [productData, setProductData] = useState<ProdcutItem | null>(null);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [repair, setRepair] = useState(false);
    const [throws, setThrows] = useState(false);
    const [updateThrows, results] = useUpdateThrowsMutation();

    const dataListProductRepair = useMemo(() => {
        return listProductData?.data?.resource?.data;
    }, [listProductData]);

    const dataCategories = useMemo(() => {
        return categoriesData?.data?.resource;
    }, [categoriesData]);

    const [input, setInput] = useState({
        old_barcode_product: '',
        old_price_product: 0,
        new_barcode_product: '',
        new_name_product: '',
        new_price_product: '',
        new_quantity_product: 0,
        new_category_product: '',
        new_status_product: '',
    });

    const closePopup = () => {
        setRepair(false);
        setInput({
            old_barcode_product: '',
            old_price_product: 0,
            new_barcode_product: '',
            new_name_product: '',
            new_price_product: '',
            new_quantity_product: 0,
            new_category_product: '',
            new_status_product: '',
        });
    };
    const [updateProductRepair, result] = useUpdateProductRepairMutation();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleRepair = (id: number) => {
        setSelectedItem(id);
        setRepair(true);
        const selectedProduct = dataListProductRepair?.find((product) => product.id === id);
        setProductData(selectedProduct || null);
        console.log(id);
    };

    const handleRepairSend = async (id: number) => {
        try {
            const body = {
                old_barcode_product: productData?.old_barcode_product,
                old_price_product: productData?.old_price_product,
                new_status_product: productData?.new_status_product,
                new_barcode_product: productData?.new_barcode_product,
                new_name_product: productData?.new_name_product,
                new_price_product: calculatedPrice,
                new_quantity_product: input.new_quantity_product,
                new_category_product: input.new_category_product,
            };
            await updateProductRepair({ id, body });
            setRepair(false);
            toast.success("Success repair product")
            refetch();
        } catch (err) {
            console.error(err);
        }
    };

    const handleThrows = (id: number) => {
        setSelectedItem(id);
        setThrows(true);
    };

    const handleThrowsConfirmation = async (id: number) => {
        try {
            await updateThrows(id);
            toast.success("Success throws product")
            refetch();
        } catch (err) {
            console.error('Error updating throws:', err);
        } finally {
            setThrows(false);
        }
    };

    const calculateDiscount = (): number => {
        const selectedCategoryItem = dataCategories?.find((category) => category.id === selectedCategory);
        return selectedCategoryItem ? parseFloat(selectedCategoryItem.discount_category) : 0;
    };

    const [discount, setDiscount] = useState<number>(0);
    const [calculatedPrice, setCalculatedPrice] = useState<string>('0');

    useEffect(() => {
        const calculatedDiscount = calculateDiscount();
        setDiscount(calculatedDiscount);
        const oldPrice = parseFloat(productData?.old_price_product || '0');
        const discountedPrice = (oldPrice * (100 - calculatedDiscount)) / 100;
        setCalculatedPrice(discountedPrice.toFixed(2));
    }, [selectedCategory, productData]);

    useEffect(() => {
        if (results) {
            refetch();
        }
    }, [results]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Repair Station</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>List Product Repair</span>
                </li>
            </ul>

            <div className="mb-5">
                <Transition appear show={repair} as={Fragment}>
                    <Dialog as="div" open={repair} onClose={closePopup}>
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
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-[2xl] text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Repair</div>
                                        </div>
                                        <div className="space-y-5 col-span-2">
                                            <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="flex flex-col gap-4">
                                                        <h1 className="flex justify-center text-lg font-bold">Old Data</h1>
                                                        <div>
                                                            <label htmlFor="gridBarcode1">Barcode</label>
                                                            <input
                                                                id="gridBarcode1"
                                                                disabled
                                                                type="text"
                                                                placeholder="Enter Barcode"
                                                                className="form-input"
                                                                value={productData?.old_barcode_product || ''}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridNama1">Nama</label>
                                                            <input id="gridNama1" type="text" disabled placeholder="Enter Nama" className="form-input" value={productData?.new_name_product || ''} />
                                                        </div>
                                                        {/* <div> */}
                                                        <input id="gridNama1" type="hidden" disabled placeholder="Enter Display" className="form-input" value={productData?.new_status_product || ''} />
                                                        {/* </div> */}
                                                        <div>
                                                            <label htmlFor="gridNama3">Harga</label>
                                                            <input id="gridNama3" disabled type="text" placeholder="Enter Harga" className="form-input" value={productData?.old_price_product || ''} />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridQTY1">QTY</label>
                                                            <input id="gridQTY1" disabled type="text" placeholder="Enter QTY" className="form-input" value={productData?.new_quantity_product || ''} />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-4">
                                                        <h1 className="flex justify-center text-lg font-bold">New Data</h1>
                                                        <div>
                                                            <label htmlFor="gridBarcode1">Barcode</label>
                                                            <input
                                                                id="gridBarcode1"
                                                                type="text"
                                                                placeholder="Enter Barcode"
                                                                className="form-input"
                                                                name="new_barcode_product"
                                                                value={productData?.new_barcode_product || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridNama1">Nama</label>
                                                            <input
                                                                id="gridNama1"
                                                                type="text"
                                                                placeholder="Enter Nama"
                                                                className="form-input"
                                                                name="new_name_product"
                                                                value={productData?.new_name_product || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridNama3">Harga</label>
                                                            <input
                                                                id="gridNama3"
                                                                type="text"
                                                                placeholder="Enter Harga"
                                                                className="form-input"
                                                                name="new_price_product"
                                                                value={calculatedPrice}
                                                                onChange={handleInputChange}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="gridQTY1">QTY</label>
                                                            <input
                                                                id="gridQTY1"
                                                                type="text"
                                                                placeholder="Enter QTY"
                                                                className="form-input"
                                                                name="new_quantity_product"
                                                                value={input.new_quantity_product || ''}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                        {/* <div> */}
                                                            {/* <label htmlFor="discount">Discount (%)</label> */}
                                                            <input
                                                                id="discount"
                                                                type="hidden"
                                                                placeholder="Enter Discount"
                                                                className="form-input"
                                                                name="discount"
                                                                value={calculateDiscount()}
                                                                onChange={handleInputChange}
                                                            />
                                                        {/* </div> */}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 panel ss:grid-cols-1 sm:grid-cols-1">
                                                    <div className="flex flex-col gap-4">
                                                        <h1 className="flex justify-start text-lg font-bold">Category</h1>
                                                        <form className="space-y-5 flex flex-wrap">
                                                            {dataCategories?.map((category, index) => (
                                                                <div key={category.id} className="flex items-center w-1/2">
                                                                    <input
                                                                        type="radio"
                                                                        id={`category${category.id}`}
                                                                        name="new_category_product"
                                                                        className="mr-2"
                                                                        value={category.name_category}
                                                                        onChange={(e) => {
                                                                            handleInputChange(e);
                                                                            setSelectedCategory(category.id);
                                                                        }}
                                                                    />
                                                                    <label htmlFor={`category${category.id}`} className="mr-8">
                                                                        {category.name_category}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </form>
                                                    </div>

                                                    <div className="flex justify-end items-center mt-8">
                                                        <Link to="/repair_station/list_product_repair">
                                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleRepairSend(selectedItem || 0)}>
                                                                Repair
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Transition appear show={throws} as={Fragment}>
                    <Dialog as="div" open={throws} onClose={() => setThrows(false)}>
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
                                    <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg text-black dark:text-white-dark">
                                        <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                                            <div className="text-lg font-bold">Thows List Product</div>
                                        </div>
                                        <div className="p-5">
                                            <div>
                                                <form className="space-y-5">
                                                    <div>
                                                        <h1>Apakah Anda yakin ingin melakukan throws?</h1>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setThrows(false)}>
                                                    Kembali
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => handleThrowsConfirmation(selectedItem || 0)}>
                                                    Throws
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

            <div className="panel mt-6 dark:text-white-light mb-5">
                <h1 className="text-lg font-bold flex justify-start py-4">List Product Repair </h1>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <div className="ltr:mr-auto rtl:ml-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
                <div className="datatables panel xl:col-span-2">
                    <DataTable
                        highlightOnHover
                        className="whitespace-nowrap table-hover "
                        records={dataListProductRepair}
                        columns={[
                            { accessor: 'id', title: 'No', render: (item: GetListProductRepairItem, index: number) => <span>{index + 1}</span> },
                            { accessor: 'barcode', title: 'Barcode', render: (item: GetListProductRepairItem) => <span>{item.new_barcode_product}</span> },
                            { accessor: 'firstName', title: 'Nama', render: (item: GetListProductRepairItem) => <span>{item.new_name_product}</span> },
                            {
                                accessor: 'keterangan',
                                title: 'Keterangan',
                                render: (item: GetListProductRepairItem) => {
                                    const newQualityData = JSON.parse(item.new_quality);
                                    const keterangan = newQualityData.abnormal;
                                    return <span>{keterangan}</span>;
                                },
                            },
                            {
                                accessor: 'action',
                                title: 'Opsi',
                                titleClassName: '!text-center',
                                render: (item: GetListProductRepairItem) => (
                                    <div className="flex items-center w-max mx-auto gap-6">
                                        <button type="button" className="btn btn-outline-info" onClick={() => handleRepair(item.id)}>
                                            REPAIR
                                        </button>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleThrows(item.id)}>
                                            THROWS
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        totalRecords={listProductData?.data?.resource?.total ?? 0}
                        recordsPerPage={listProductData?.data?.resource?.per_page ?? 10}
                        page={page}
                        onPageChange={(prevPage) => setPage(prevPage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListProductRepair;
