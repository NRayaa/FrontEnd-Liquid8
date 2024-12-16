import React, { useMemo } from 'react';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import IconSend from '../../../components/Icon/IconSend';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import { useDetailB2BQuery } from '../../../store/services/b2bApi';
import { BreadCrumbs } from '../../../components';
import { formatRupiah } from '../../../helper/functions';

const DetailB2B = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List Data'));
    });
    const { id }: any = useParams();
    const { data: ShowB2BData } = useDetailB2BQuery(id);

    const ShowB2B = useMemo(() => {
        return ShowB2BData?.data.resource;
    }, [ShowB2BData]);

    return (
        <div>
            <BreadCrumbs base="B2B" basePath="/b2b/b2b/list_b2b" sub="List B2B" subPath="/b2b/b2b/list_b2b" current="Detail B2B" />

            <div>
                <h1 className="text-lg font-semibold py-4">Detail B2B</h1>
            </div>
            <div>
                <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 my-8 relative">
                    <div className="bg-primary absolute mt-2 text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                        <IconSend fill className="w-12 h-12" />
                    </div>
                    <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">CODE DOCUMENT BULKY :</div>
                            <div className="whitespace-nowrap">{ShowB2B?.code_document_bulky}</div>
                        </div>
                        <div className=" items-center text-lg w-full justify-between mb-2">
                            <div className="text-white-dark">QTY :</div>
                            <ul className="space-y-3 list-inside list-disc font-semibold">{ShowB2B?.total_product_bulky}</ul>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">TOTAL OLD PRICE :</div>
                            <div className="whitespace-nowrap"> {ShowB2B && typeof ShowB2B.total_old_price_bulky === 'string' ? formatRupiah(ShowB2B.total_old_price_bulky) : ''}</div>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">DISCOUNT :</div>
                            <div className="whitespace-nowrap">{ShowB2B?.discount_bulky}</div>
                        </div>
                        <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                            <div className="text-white-dark mr-2">AFTERPRICE :</div>
                            <div className="whitespace-nowrap"> {ShowB2B && typeof ShowB2B.after_price_bulky === 'string' ? formatRupiah(ShowB2B.after_price_bulky) : ''}</div>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/b2b/b2b/list_b2b">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                    </div>
                    <div className="datatables xl:col-span-3">
                        <DataTable
                            records={ShowB2B?.bulky_sales}
                            columns={[
                                { accessor: 'id', title: 'No', render: (e, index) => index + 1 },
                                { accessor: 'barcode_bulky_sale', title: 'Barcode' },
                                { accessor: 'name_product_bulky_sale', title: 'Name' },
                                { accessor: 'product_category_bulky_sale', title: 'Category' },
                                { accessor: 'old_price_bulky_sale', title: 'Price' },
                            ]}
                            minHeight={200}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailB2B;
