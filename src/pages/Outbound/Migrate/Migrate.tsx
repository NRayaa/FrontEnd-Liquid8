import React, { useEffect, useMemo, useState } from 'react';
import { BreadCrumbs } from '../../../components';
import { useDeleteMigrateMutation, useGetIndexMigrateQuery, useMigrateFinishMutation, usePostMigrateMutation } from '../../../store/services/migrateApi';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../helper/functions';

const Migrate = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [migratePage, setMigratePage] = useState<number>(1);
    const [productPage, setProductPage] = useState<number>(1);
    const { data: IndexMigrateData, refetch } = useGetIndexMigrateQuery({ q: search, migratePage, productPage });
    const [postData, resultPost] = usePostMigrateMutation();
    const [deleteData, resultDelete] = useDeleteMigrateMutation();
    const [migrateFinish, resultMigrate] = useMigrateFinishMutation();
    const [formData, setFormData] = useState({
        destiny: '',
    });

    const IndexMigrate = useMemo(() => {
        return IndexMigrateData?.data.resource;
    }, [IndexMigrateData]);

    const handleAddProduct = async (id: number) => {
        try {
            await postData(id);
            refetch();
        } catch (error) {
            console.log('ERROR SEND', error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            await deleteData(id);
            refetch();
        } catch (error) {
            console.log('ERROR SEND', error);
        }
    };

    const handleMigrateFinish = async () => {
        const body = {
            destiny_document_migrate: formData.destiny,
        };
        try {
            await migrateFinish(body);
            refetch();
            navigate('/outbound/migrate/list_migrate');
        } catch (error) {
            console.log('ERROR SEND', error);
        }
    };

    useEffect(() => {
        if (resultMigrate.isSuccess || resultPost.isSuccess || resultDelete.isSuccess) {
            console.log('Success');
        } else if (resultMigrate.isSuccess || resultPost.isError || resultDelete.isError) {
            console.log('Error');
        }
    }, [resultDelete, resultPost, resultMigrate]);

    return (
        <>
            <BreadCrumbs base="Storage" basePath="outbound/migrate" sub="Migrate" subPath="/" current="Migrate" />
            <div className="panel mt-6 min-h-[450px] pr-12">
                <div className="mb-8">
                    <h5 className="font-semibold text-lg dark:text-white-light mb-2">Migrate</h5>
                    <div className="mb-4 flex justify-between">
                        <button type="button" onClick={handleMigrateFinish} className="btn-lg btn-primary uppercase px-6 rounded-md">
                            MIGRATE
                        </button>
                    </div>
                    <form className="w-[400px] mb-4 ">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                CODE DOC :
                            </label>
                            <input id="categoryName" type="text" value={IndexMigrate?.code_document_migrate} className="mb-2 form-input w-[250px]" disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="categoryName" className="text-[15px] font-semibold whitespace-nowrap">
                                DESTINY :
                            </label>
                            <input
                                id="categoryName"
                                type="text"
                                value={formData.destiny}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormData((prev) => ({ ...prev, destiny: e.target.value }));
                                }}
                                className=" form-input w-[250px]"
                                required
                            />
                        </div>
                    </form>
                </div>
                <div className="relative w-[220px]">
                    <input
                        type="text"
                        className="mb-4 form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            e.preventDefault();
                            setSearch(e.target.value);
                        }}
                    />
                    <button type="button" className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                        <svg className="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button type="button" className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <div className="grid grid-cols-2 space-x-5 w-full">
                    <div className="datatables col-span-1">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            idAccessor="new_product"
                            records={IndexMigrate?.new_product.data}
                            columns={[
                                {
                                    accessor: 'id',
                                    title: 'No',
                                    render: (e, index: number) => index + 1,
                                },
                                {
                                    accessor: 'new_barcode_product',
                                    title: 'Barcode',
                                },
                                {
                                    accessor: 'new_name_product',
                                    title: 'Name',
                                },
                                {
                                    accessor: 'new_price_product',
                                    title: 'Price',
                                    render: (e) => formatCurrency(e.new_price_product),
                                },
                                {
                                    accessor: 'opsi',
                                    title: 'Opsi',
                                    render: (e) => (
                                        <button type="button" onClick={() => handleAddProduct(e.id)} className="btn btn-outline-primary">
                                            ADD
                                        </button>
                                    ),
                                },
                            ]}
                            minHeight={200}
                            page={productPage}
                            onPageChange={(prev) => setProductPage(prev)}
                            totalRecords={IndexMigrate?.new_product.total ?? 0}
                            recordsPerPage={IndexMigrate?.new_product.per_page ?? 0}
                        />
                    </div>
                    <div className="datatables col-span-1">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover "
                            idAccessor="migrate"
                            records={IndexMigrate?.migrate.data}
                            columns={[
                                {
                                    accessor: 'id',
                                    title: 'No',
                                    render: (e, index: number) => index + 1,
                                },
                                {
                                    accessor: 'new_barcode_product',
                                    title: 'Barcode',
                                },
                                {
                                    accessor: 'new_name_product',
                                    title: 'Name',
                                },
                                {
                                    accessor: 'new_price_product',
                                    title: 'Price',
                                    render: (e) => formatCurrency(e.new_price_product),
                                },
                                {
                                    accessor: 'opsi',
                                    title: 'Opsi',
                                    render: (e) => (
                                        <button type="button" onClick={() => handleDeleteProduct(e.id)} className="btn btn-outline-danger">
                                            DELETE
                                        </button>
                                    ),
                                },
                            ]}
                            minHeight={200}
                            page={migratePage}
                            onPageChange={(prev) => setMigratePage(prev)}
                            totalRecords={IndexMigrate?.migrate.total ?? 0}
                            recordsPerPage={IndexMigrate?.migrate.per_page ?? 0}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Migrate;
