import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatRupiah, generateRandomStringFormatQCD } from '../../../helper/functions';
import { DataTable } from 'mantine-datatable';
import { useAddFilterDumpMutation, useAddListDumpMutation, useDeleteFilterDumpMutation, useGetDumpsQuery, useGetFilterDumpQuery, useGetListDumpQuery } from '../../../store/services/listDumpApi';
import toast from 'react-hot-toast';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';

const CreateDump = () => {
    const [isCategory, setIsCategory] = useState(false);
    const [leftTablePage, setLeftTablePage] = useState<number>(1);
    const [rightTablePage, setRightTablePage] = useState<number>(1);
    const [searchDump, setSearchDump] = useState('');
    const navigate = useNavigate();

    const { data: dataFilter, refetch: refetchFilter, isSuccess: isSuccessFilter } = useGetFilterDumpQuery({ page: 1 });
    const { data: dataDump, refetch: refetchDump, isSuccess: isSuccessDump } = useGetDumpsQuery({ page: 1, q: searchDump });
    const [addFilterDump] = useAddFilterDumpMutation();
    const [addListDump] = useAddListDumpMutation();
    const [deleteFilterDump] = useDeleteFilterDumpMutation();

    // dataFilter
    const dataFilterSelected = useMemo(() => {
        if (isSuccessFilter) {
            return dataFilter.data.resource.data;
        }
    }, [isSuccessFilter, dataFilter]);

    const dataFilterProduct = useMemo(() => {
        if (isSuccessFilter) {
            return dataFilter.data.resource.data.data;
        }
    }, [isSuccessFilter, dataFilter]);
    const categories = useMemo(() => {
        if (isSuccessFilter) {
            return dataFilter.data.resource.category;
        }
    }, [isSuccessFilter, dataFilter]);

    // dataDump
    const dataDumpSelected = useMemo(() => {
        if (isSuccessDump) {
            return dataDump.data.resource;
        }
    }, [isSuccessDump, dataDump]);

    const dataDumpProduct = useMemo(() => {
        if (isSuccessDump) {
            return dataDump.data.resource.data;
        }
    }, [isSuccessDump, dataDump]);

    const [input, setInput] = useState({
        name_bundle: '',
        total_price_bundle: '',
        name_color: '',
        total_price_custom_bundle: '',
        total_product_bundle: '',
        barcode_bundle: generateRandomStringFormatQCD(),
        category: '',
    });

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddFilter = async (id: number) => {
        await addFilterDump(id)
            .unwrap()
            .then((res) => {
                toast.success(res.data.message);
                refetchDump();
                refetchFilter();
            })
            .catch((err) => toast.error(err.data.message));
    };
    const handleRemomveFilter = async (id: number) => {
        await deleteFilterDump(id)
            .unwrap()
            .then((res) => {
                toast.success(res.data.message);
                refetchDump();
                refetchFilter();
            })
            .catch((err) => toast.error(err.data.message));
    };

    const handleAddListDump = async (e: FormEvent) => {
        e.preventDefault();
        const body = {
            name_bundle: input.name_bundle,
            total_price_bundle: input.total_price_bundle,
            name_color: input.name_color,
            total_price_custom_bundle: input.total_price_custom_bundle,
            total_product_bundle: input.total_product_bundle,
            barcode_bundle: input.barcode_bundle,
            category: input.category,
        };

        await addListDump(body)
            .unwrap()
            .then((res) => {
                toast.success(res.data.message);
                refetchDump();
                refetchFilter();
                navigate('/repair_station/list_dump');
            })
            .catch((err) => toast.error(err.data.message));
    };

    useEffect(() => {
        if (parseFloat(input.total_price_bundle) >= 100000) {
            setIsCategory(true);
        } else {
            setIsCategory(false);
        }
    }, [input.total_price_bundle]);

    useEffect(() => {
        if (isSuccessFilter) {
            setInput((prev) => ({
                ...prev,
                total_price_bundle: dataFilter?.data.resource.total_new_price.toString(),
                total_price_custom_bundle: dataFilter?.data.resource.total_new_price.toString(),
                total_product_bundle: dataFilter?.data.resource.data.total.toString(),
            }));

            if (dataFilter?.data.resource.total_new_price >= 100000) {
                setIsCategory(true);
                setInput((prev) => ({ ...prev, name_color: '' }));
            } else {
                setIsCategory(false);
                setInput((prev) => ({ ...prev, name_color: dataFilter.data.resource.data.data[0]?.new_tag_product[0].name_color ?? '', category: '' }));
            }
        }
    }, [dataFilter]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="text-primary hover:underline before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/repair_station/list_dump">
                        <span>QCD</span>
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Create QCD</span>
                </li>
            </ul>
            <div>
                <h1 className="text-lg font-semibold py-4">Create QCD</h1>
            </div>
            <div>
                <div className="flex items-start">
                    <form className="w-[400px] mb-4 " onSubmit={handleAddListDump}>
                        <button type="submit" className="btn btn-primary mb-4 px-16">
                            Create QCD
                        </button>
                        <div className="flex items-center justify-between mb-2 mt-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Nama QCD :
                            </label>
                            <input id="categoryName" type="text" className=" form-input w-[250px]" required value={input.name_bundle} name="name_bundle" onChange={handleChangeInput} />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                Total Harga :
                            </label>
                            <input disabled id="categoryName" type="text" placeholder="Rp" className="form-input w-[250px]" required value={formatRupiah(input.total_price_bundle)} />
                        </div>
                        {!isCategory && (
                            <div className="flex items-center justify-between mb-2 mt-2">
                                <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                    Color Name:
                                </label>
                                <input id="Color Name" disabled type="text" className=" form-input w-[250px]" required value={input.name_color} />
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
                                    value={input.category}
                                    onChange={(e) => {
                                        const selectedNameCategory = e.target.value;
                                        setInput((prev) => ({ ...prev, category: selectedNameCategory ?? '' }));
                                        const totalNewPrice = Number(dataFilter?.data.resource.total_new_price);
                                        const priceDiscount = totalNewPrice - totalNewPrice * (Number(e.target.selectedOptions[0].getAttribute('data-name-category')) / 100);
                                        setInput((prev) => ({ ...prev, total_price_custom_bundle: priceDiscount.toString() }));
                                    }}
                                >
                                    <option>Choose...</option>
                                    {categories?.map((item: any, index: any) => {
                                        return (
                                            <option key={index} value={item.name_category} data-name-category={item.discount_category}>
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
                            <input
                                id="categoryName"
                                type="text"
                                placeholder="Rp"
                                className=" form-input w-[250px]"
                                required
                                value={input.total_price_custom_bundle}
                                onChange={(e) => setInput((prev) => ({ ...prev, total_price_custom_bundle: e.target.value }))}
                            />
                        </div>
                        <input
                            type="text"
                            className="mt-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                            placeholder="Search..."
                            value={searchDump}
                            onChange={(e) => setSearchDump(e.target.value)}
                        />
                    </form>
                    {/* {isBarcodePrint && (
                        <div className="ml-12">
                            <BarcodePrinted
                                barcode={barcode}
                                category={selectedCategory}
                                newPrice={formatRupiah(customDisplay)}
                                oldPrice={formatRupiah(filterBundles?.data?.data.resource.total_new_price.toString() ?? '0')}
                                isBundle
                            />
                        </div>
                    )} */}
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    {/* <div className="ltr:ml-auto rtl:mr-auto mx-6">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div> */}
                </div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/repair_station/list_dump">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <span className="flex justify-end mr-64 text-sm font-semibold">Total Barang : {dataFilterSelected?.total} </span>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="datatables xl:col-span-3">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={dataDumpProduct}
                                columns={[
                                    {
                                        accessor: 'id',
                                        title: 'No',
                                        sortable: true,
                                        render: (item, index) => <span>{index + 1}</span>,
                                    },
                                    {
                                        accessor: 'barcode',
                                        title: 'Barcode LQD',
                                        sortable: true,
                                        render: (item) => {
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
                                        render: (item) => <p className="truncate">{item.new_name_product}</p>,
                                    },
                                    { accessor: 'category', title: 'Kategori', sortable: true, render: (item) => <span>{item.new_category_product}</span> },
                                    {
                                        accessor: 'totalMasuk',
                                        title: 'Total Masuk',
                                        sortable: true,
                                        render: (item, index: number) => {
                                            let price: string | null;
                                            if (item.new_category_product) {
                                                price = item.new_price_product;
                                            } else {
                                                price = item.old_price_product;
                                            }

                                            return <span>{price !== null ? formatRupiah(price) : '0'}</span>;
                                        },
                                    },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item) => (
                                            <div className="flex items-center w-max mx-auto gap-6">
                                                <button type="button" className="btn btn-outline-info" onClick={() => handleAddFilter(item.id)}>
                                                    Add
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={dataDumpSelected?.total ?? 0}
                                recordsPerPage={dataDumpSelected?.per_page ?? 10}
                                page={leftTablePage}
                                onPageChange={(prevPage) => setLeftTablePage(prevPage)}
                            />
                        </div>
                        <div className="datatables xl:col-span-2">
                            <DataTable
                                highlightOnHover
                                className="whitespace-nowrap table-hover "
                                records={dataFilterProduct}
                                columns={[
                                    {
                                        accessor: 'id',
                                        title: 'No',
                                        sortable: true,
                                        render: (item, index: number) => <span>{index + 1}</span>,
                                    },
                                    { accessor: 'barcode', title: 'Barcode LQD', sortable: true, render: (item) => <span>{item.new_barcode_product}</span> },
                                    { accessor: 'firstName', title: 'Nama Produk', sortable: true, render: (item) => <span>{item.new_name_product}</span> },
                                    {
                                        accessor: 'action',
                                        title: 'Opsi',
                                        titleClassName: '!text-center',
                                        render: (item) => (
                                            <div className="flex items-center space-x-2">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => handleRemomveFilter(item.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                totalRecords={dataFilterSelected?.total ?? 0}
                                recordsPerPage={dataFilterSelected?.per_page ?? 10}
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

export default CreateDump;
