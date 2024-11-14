import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { formatRupiah, generateRandomStringFormatBundle, useDebounce } from '../../../helper/functions';
import { useProductByCategoryQuery } from '../../../store/services/productNewApi';
import { useGetBundleProductsQuery } from '../../../store/services/bundleProductApi';
import { useGetAllColorTagQuery } from '../../../store/services/colorTagApi';
import { MigratedBulkyProductItem } from '../../../store/services/types';
import toast from 'react-hot-toast';
import BarcodePrinted from '../../RepairStation/ListProductRepair/BarcodePrinted';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import {
    useCreateFilterProductMigrateCategoryMutation,
    useDeleteFilterProductMigrateCategoryMutation,
    useFilterProductMigrateCategoryMutation,
    useGetFilterProductMigrateCategoryQuery,
} from '../../../store/services/migrateApi';

const CreateMigrateCategory = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const debounceValue = useDebounce(searchLeftTable);
    const { data, isSuccess, refetch } = useProductByCategoryQuery({ page: leftTablePage, q: debounceValue });
    const filterMigrated = useGetFilterProductMigrateCategoryQuery(rightTablePage);
    const [filterProductBundle, results] = useFilterProductMigrateCategoryMutation();
    const [deleteFilterProductMigrated, resultsDeleteBundle] = useDeleteFilterProductMigrateCategoryMutation();
    const [createBundle, resultsCreateBundle] = useCreateFilterProductMigrateCategoryMutation();
    const navigate = useNavigate();
    const bundleLists = useGetBundleProductsQuery({ page: 1, q: '' });
    const [isCategory, setIsCategory] = useState<boolean>(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [customDisplay, setCustomDisplay] = useState<any>('0');

    const [nameBundle, setNameBundle] = useState<string>('');
    const [customPrice, setCustomPrice] = useState<number>(0);
    const [totalProductBundle, setTotalProductBundle] = useState<string>('');
    const [colorName, setColorName] = useState<string>('');
    const [isBarcodePrint, setIsBarcodePrint] = useState<boolean>(false);
    const [barcode, setBarcode] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const searchDebounce = useDebounce(search);
    const { data: colorTags, refetch: refetchColorTags } = useGetAllColorTagQuery({ page, q: searchDebounce });
    const [colorOptions, setColorOptions] = useState<{ label: string; value: string }[]>([]);

    const expiredProducts = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    const filterMigratedProducts: any = useMemo(() => {
        if (filterMigrated.isSuccess) {
            return filterMigrated.data.data.resource.migrate_bulky_products;
        }
    }, [filterMigrated.data, data]);
    console.log('filterMigratedProducts', filterMigratedProducts);

    const handleAddFilterBundle = async (id: number) => {
        try {
            await filterProductBundle(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteProductBundle = async (id: number) => {
        try {
            await deleteFilterProductMigrated(id);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddLeftTable = (item: MigratedBulkyProductItem) => {
        handleAddFilterBundle(item.id);
        setTotalProductBundle(item.new_quantity_product ?? '');
    };

    const handleCreateBundle = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            const barcodeString = generateRandomStringFormatBundle();
            setBarcode(barcodeString);
            const body = {};

            await createBundle(body);
        } catch (err) {
            console.log(err);
        }
    };

    const dataColorTag: any = useMemo(() => {
        return colorTags?.data.resource;
    }, [colorTags]);

    useEffect(() => {
        if (dataColorTag) {
            const options = dataColorTag.map((item: any) => ({
                label: `${item.name_color} | ${item.fixed_price_color}`,
                value: item.name_color,
            }));
            setColorOptions(options);
        }
    }, [dataColorTag]);

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);

            refetch();
            filterMigrated.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results, filterMigrated.isSuccess]);

    useEffect(() => {
        if (resultsDeleteBundle.isSuccess) {
            toast.success(resultsDeleteBundle?.data.data.message);
            refetch();
            filterMigrated.refetch();
        } else if (resultsDeleteBundle.isError) {
            toast.error(resultsDeleteBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsDeleteBundle]);

    useEffect(() => {
        if (resultsCreateBundle.isSuccess) {
            toast.success(resultsCreateBundle?.data.data.message);
            bundleLists?.refetch();
            if (categories.length !== 0) {
                setIsBarcodePrint(true);
                setCustomDisplay(customPrice);
            } else {
                navigate('/outbound/category_migrate/category_migrate');
            }
        } else if (resultsCreateBundle.isError) {
            toast.error(resultsCreateBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsCreateBundle]);

    useEffect(() => {
        const resource = filterMigrated?.data?.data?.resource;

        if (resource && resource.total_new_price >= 100000 && resource.category !== null) {
            setIsCategory(true);
            setCategories(resource.category ?? []);
            setColorName('');
            setCustomPrice(Math.trunc(resource.total_new_price));
        } else {
            setIsCategory(false);
            if (resource && resource.category === null && resource.color && resource.fixed_price) {
                setCustomPrice(Math.trunc(resource.fixed_price));
                setColorName(resource.color);
                setSelectedCategory('');
            } else {
                setSelectedCategory('');
                setCustomPrice(0);
                setColorName('');
            }
        }
    }, [filterMigrated?.data?.data?.resource]);

    return (
        <div>
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
                    <span>Create Migrate Category</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Create Migrate Category</h1>
            </div>
            <div>
                <div className="flex items-start">
                    <form className="w-[400px] mb-4 " onSubmit={handleCreateBundle}>
                        <button type="submit" className="btn btn-primary mb-4 px-16">
                            Create Migrate Category
                        </button>
                        <input
                            type="text"
                            className="mt-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                            value={searchLeftTable}
                            onChange={(e) => setSearchLeftTable(e.target.value)}
                        />
                    </form>

                    {isBarcodePrint && (
                        <div className="ml-12">
                            <BarcodePrinted
                                barcode={barcode}
                                category={nameBundle}
                                newPrice={formatRupiah(customDisplay)}
                                oldPrice={formatRupiah(filterMigrated?.data?.data.resource.total_new_price.toString() ?? '0')}
                                isBundle
                            />
                        </div>
                    )}
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/outbound/category_migrate/category_migrate">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        {/* <span className="flex justify-end mr-64 text-sm font-semibold">Total Barang : {filterMigrated.data?.data.resource.total} </span> */}
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={expiredProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: MigratedBulkyProductItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: MigratedBulkyProductItem) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'firstName',
                                        title: 'Nama Produk',
                                        sortable: true,
                                        width: 220,
                                        render: (item: MigratedBulkyProductItem) => <p className="truncate">{item.new_name_product}</p>,
                                    },
                                    {
                                        accessor: 'category',
                                        title: 'Kategori',
                                        sortable: true,
                                        render: (item: MigratedBulkyProductItem) => <span>{item.new_category_product ? item.new_category_product : item.new_tag_product}</span>,
                                    },
                                    {
                                        accessor: 'harga',
                                        title: 'Harga',
                                        sortable: true,
                                        render: (item: MigratedBulkyProductItem, index: number) => <span>{formatRupiah(item.old_price_product ?? '0')}</span>,
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: MigratedBulkyProductItem) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                <button type="button" className="btn btn-outline-info" onClick={() => handleAddLeftTable(item)}>
                                                    Add
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
                                page={leftTablePage}
                                onPageChange={(prevPage) => setLeftTablePage(prevPage)}
                            />
                        </div>
                        <div className="datatables xl:col-span-2">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={filterMigratedProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: MigratedBulkyProductItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: MigratedBulkyProductItem) => {
                                            let barcode: string | undefined;

                                            if (!item.new_category_product && !item.new_tag_product) {
                                                barcode = item.old_barcode_product;
                                            } else if (item.new_category_product !== null) {
                                                barcode = item.new_barcode_product ?? undefined;
                                            } else if (item.new_tag_product !== null) {
                                                barcode = item.old_barcode_product;
                                            }

                                            return <span>{barcode ?? ''}</span>;
                                        },
                                    },
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: MigratedBulkyProductItem) => <span>{item.new_name_product}</span> },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: MigratedBulkyProductItem) => (
                                            <div className="flex items-center space-x-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteProductBundle(item.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={data?.data.resource.total ?? 0}
                                recordsPerPage={data?.data.resource.per_page ?? 10}
                                page={rightTablePage}
                                onPageChange={(prevPage) => setRightTablePage(prevPage)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateMigrateCategory;
