import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'mantine-datatable';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { formatRupiah, generateRandomStringFormatBundle, useDebounce } from '../../../helper/functions';
import { ProductExpiredItem, ProductStaggingItem } from '../../../store/services/types';
import {
    useDeleteFilterProductStaggingsMutation,
    useDoneCheckAllProductStaggingMutation,
    useFilterProductStaggingMutation,
    useGetFilterProductStaggingQuery,
    useGetListProductStaggingQuery,
} from '../../../store/services/staggingApi';
import Swal from 'sweetalert2';

const ListProductStagging = () => {
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchLeftTable, setSearchLeftTable] = useState<string>('');
    const debounceValue = useDebounce(searchLeftTable);
    const { data, isSuccess, refetch } = useGetListProductStaggingQuery({ page: leftTablePage, q: debounceValue });
    const filterStagging = useGetFilterProductStaggingQuery(rightTablePage);
    const [filterProductStagging, results] = useFilterProductStaggingMutation();
    const [deletefilterProductStaggings, resultsDeleteBundle] = useDeleteFilterProductStaggingsMutation();
    const [doneCheckAllProductStagging, resultsDone] = useDoneCheckAllProductStaggingMutation();
    const [loadingAdd, setLoadingAdd] = useState<number | null>(null);
    const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
    const [processedItems, setProcessedItems] = useState<number[]>([]); // Menyimpan ID item yang telah berhasil diproses

    const productStaggings = useMemo(() => {
        if (isSuccess) {
            return data?.data.resource.data;
        }
    }, [data]);

    const filterStaggingProducts: any = useMemo(() => {
        if (filterStagging.isSuccess) {
            return filterStagging.data.data.resource.data.data;
        }
    }, [filterStagging.data, data]);

    const handleAddFilterStagging = async (id: number) => {
        if (loadingAdd === id || processedItems.includes(id)) return; 

        setLoadingAdd(id); 
        try {
            await filterProductStagging(id); 
            setProcessedItems((prevItems) => [...prevItems, id]); 
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingAdd(null); 
        }
    };

    const handleDeleteProductStagging = async (id: number) => {
        if (loadingDelete === id || processedItems.includes(id)) return; 

        setLoadingDelete(id);
        try {
            await deletefilterProductStaggings(id); 
            setProcessedItems((prevItems) => [...prevItems, id]); 
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingDelete(null); 
        }
    };

    const handleAddLeftTable = (item: ProductExpiredItem) => {
        handleAddFilterStagging(item.id);
    };

    useEffect(() => {
        if (results.isSuccess) {
            toast.success(results.data.data.message);

            refetch();
            filterStagging.refetch();
        } else if (results.isError) {
            toast.error(results?.data?.data?.message ?? 'Error');
        }
    }, [results, filterStagging.isSuccess]);

    useEffect(() => {
        if (resultsDeleteBundle.isSuccess) {
            toast.success(resultsDeleteBundle?.data.data.message);
            refetch();
            filterStagging.refetch();
        } else if (resultsDeleteBundle.isError) {
            toast.error(resultsDeleteBundle?.data?.data?.message ?? 'Error');
        }
    }, [resultsDeleteBundle]);

    const showAlert = async ({ type }: any) => {
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
                    title: 'Yakin ingin menyelesaikan semua pengecekan?',
                    text: 'Proses ini tidak bisa dibatalkan',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Ya, Selesaikan',
                    cancelButtonText: 'Batalkan',
                    reverseButtons: true,
                    padding: '2em',
                })
                .then(async (resultsDone) => {
                    if (resultsDone.isConfirmed) {
                        try {
                            await doneCheckAllProductStagging({}).unwrap();
                            refetch();
                            filterStagging.refetch();
                            swalWithBootstrapButtons.fire('Selesai!', 'Semua pengecekan sudah diselesaikan.', 'success');
                        } catch (error) {
                            swalWithBootstrapButtons.fire('Gagal', 'Ada masalah saat menyelesaikan pengecekan.', 'error');
                        }
                    } else if (resultsDone.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire('Dibatalkan', 'Proses dibatalkan.', 'error');
                    }
                });
        }
    };

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/stagging/list_product_stagging">
                        <span>Stagging</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Product Stagging</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">List Product Stagging</h1>
            </div>
            <div>
                {/* <div className="flex items-start">
                    <form className="w-[400px] mb-4 " onSubmit={handleCreateBundle}>
                        <button type="submit" className="btn btn-primary mb-4 px-16">
                            Create Bundle
                        </button>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama Bundle :
                            </label>
                            <input id="categoryName" type="text" className=" form-input w-[250px]" required value={nameBundle} onChange={(e) => setNameBundle(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga :
                            </label>
                            <input
                                disabled
                                id="categoryName"
                                type="text"
                                placeholder="Rp"
                                className="form-input w-[250px]"
                                required
                                value={formatRupiah(filterStagging?.data?.data?.resource?.total_new_price?.toString() ?? '0')}
                            />
                        </div>
                        {!isCategory && (
                            <div className="flex items-center justify-between mb-2 mt-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Color Name:
                                </label>
                                <input id="Color Name" disabled type="text" className=" form-input w-[250px]" required value={colorName} />
                            </div>
                        )}
                        {isCategory && (
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="kategori" className="text-[15px] font-semibold whitespace-nowrap">
                                    Kategori :
                                </label>
                                <select
                                    id="gridState"
                                    className="form-input w-[250px]"
                                    onChange={(e) => {
                                        const selectedNameCategory = e.target.selectedOptions[0].getAttribute('data-name-category');
                                        setSelectedCategory(selectedNameCategory);
                                        const totalNewPrice = Number(filterStagging?.data?.data.resource.total_new_price);
                                        const priceDiscount = totalNewPrice - (totalNewPrice * Number(e.target.value)) / 100;
                                        setCustomPrice(JSON.stringify(priceDiscount));
                                    }}
                                >
                                    <option>Choose...</option>
                                    {categories?.map((item: any, index: any) => {
                                        return (
                                            <option key={index} value={item.discount_category} data-name-category={item.name_category}>
                                                {item.name_category} {item.discount_category + '%'}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Custom Harga :
                            </label>
                            <input id="categoryName" type="text" placeholder="Rp" className=" form-input w-[250px]" required value={customPrice} onChange={(e) => setCustomPrice(e.target.value)} />
                        </div>
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
                                oldPrice={formatRupiah(filterStagging?.data?.data.resource.total_new_price.toString() ?? '0')}
                                isBundle
                            />
                        </div>
                    )}
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                </div> */}
                <div>
                    <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                        {/* add button back */}
                        <div className="flex md:items-center md:flex-row flex-col gap-2">
                            <button className="btn btn-warning" onClick={() => showAlert({ type: 11 })}>
                                DONE CHECK ALL
                            </button>
                        </div>
                        <div className="ltr:ml-auto rtl:mr-auto mx-6">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={searchLeftTable} onChange={(e) => setSearchLeftTable(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={productStaggings}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductStaggingItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: ProductStaggingItem) => {
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
                                        render: (item: ProductStaggingItem) => <p className="truncate">{item.new_name_product}</p>,
                                    },
                                    {
                                        accessor: 'category',
                                        title: 'Kategori',
                                        sortable: true,
                                        render: (item: ProductStaggingItem) => <span>{item.new_category_product ? item.new_category_product : item.new_tag_product}</span>,
                                    },
                                    {
                                        accessor: 'harga',
                                        title: 'Harga',
                                        sortable: true,
                                        render: (item: ProductStaggingItem, index: number) => {
                                            let price: string | undefined;
                                            if (item.new_category_product !== null && item.new_category_product !== undefined) {
                                                price = item.new_price_product;
                                            } else if (item.new_tag_product !== null && item.new_tag_product !== undefined) {
                                                price = item.fixed_price;
                                            } else {
                                                price = item.old_price_product;
                                            }

                                            return <span>{price !== undefined ? formatRupiah(price) : '0'}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProductStaggingItem) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                {!processedItems.includes(item.id) &&
                                                    loadingAdd !== item.id && (
                                                        <button type="button" className="btn btn-outline-info" onClick={() => handleAddFilterStagging(item.id)}>
                                                            Add
                                                        </button>
                                                    )}
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
                                records={filterStaggingProducts}
                                columns={[
                                    { accessor: 'id', title: 'No', sortable: true, render: (item: ProductStaggingItem, index: number) => <span>{index + 1}</span> },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item: ProductStaggingItem) => {
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
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item: ProductStaggingItem) => <span>{item.new_name_product}</span> },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item: ProductStaggingItem) => (
                                            <div className="flex items-center space-x-2">
                                                {!processedItems.includes(item.id) &&
                                                    loadingDelete !== item.id && ( 
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => handleDeleteProductStagging(item.id)}>
                                                            Delete
                                                        </button>
                                                    )}
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

export default ListProductStagging;