import { DataTable } from 'mantine-datatable';
import { useEffect, useMemo, useState } from 'react';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import IconArrowBackward from '../../../components/Icon/IconArrowBackward';
import IconNotesEdit from '../../../components/Icon/IconNotesEdit';
import IconArrowForward from '../../../components/Icon/IconArrowForward';
import { useDetailProductOldQuery } from '../../../store/services/productOldsApi';
import { formatRupiah } from '../../../helper/functions';

const DetailListData = () => {
    const { state } = useLocation();

    const [page, setPage] = useState<number>(1);
    const { data } = useDetailProductOldQuery({ codeDocument: state.codeDocument, page });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Detail List'));
    });

    const detailProductOlds = useMemo(() => {
        if (data?.data.resource !== null) {
            if (data?.data?.resource?.data.length !== 0) {
                return data?.data.resource.data;
            }
        }
    }, [data]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Home
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Data Process</span>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span> Detail List Data </span>
                </li>
            </ul>
            {/* <div className="panel flex items-center overflow-x-auto whitespace-nowrap p-3 text-primary">
            </div> */}
            <div className="panel mt-6">
                <div className="flex flex-wrap w-full justify-start mb-5">
                    <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                        <div className="bg-primary absolute text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                            <IconNotesEdit fill className="w-12 h-12" />
                        </div>
                        <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                            <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                                <div className="text-white-dark mr-2">Data Merged :</div>
                                <div className="whitespace-nowrap">{state?.codeDocument}</div>
                            </div>
                            <div className=" items-center text-lg w-full justify-between mb-2">
                                <div className="text-white-dark">BASE DATA : </div>
                                <ul className="space-y-3 list-inside list-disc font-semibold">
                                    <li>{state?.baseDocument}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 mx-6 gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto flex gap-6">
                        <Link to="/inbound/check_product/list_data">
                            <button type="button" className=" px-2 btn btn-outline-danger">
                                <IconArrowBackward className="flex mx-2" fill={true} /> Back
                            </button>
                        </Link>
                        <Link to="/inbound/check_product/multi_check" state={{ codeDocument: state.codeDocument }}>
                            <button type="button" className=" px-2 btn btn-outline-info">
                                <IconArrowForward className="flex mx-2" fill={true} /> Continue
                            </button>
                        </Link>
                    </div>
                </div>
                <h5 className="font-semibold text-lg dark:text-white-light mb-2">List Data Proses</h5>
                <div className="datatables">
                    {data?.data.resource !== null && (
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-hover"
                            records={detailProductOlds}
                            columns={[
                                {
                                    accessor: 'id',
                                    title: 'No',
                                    render: (item, index: number) => <span>{index + 1}</span>,
                                },
                                {
                                    accessor: 'code_document',
                                    title: 'Nama Data',
                                    render: (item) => <span>{item.code_document}</span>,
                                },
                                {
                                    accessor: 'old_barcode_product',
                                    title: 'Nomor Resi',
                                    render: (item) => <span>{item.old_barcode_product}</span>,
                                },
                                {
                                    accessor: 'old_name_product',
                                    title: 'Nama Produk',
                                    render: (item) => <span className="whitespace-pre-wrap">{item.old_name_product}</span>,
                                },
                                {
                                    accessor: 'old_quantity_product',
                                    title: 'QTY',
                                    render: (item) => <span>{item.old_quantity_product}</span>,
                                },
                                {
                                    accessor: 'old_price_product',
                                    title: 'Harga',
                                    render: (item) => <span>{formatRupiah(item.old_price_product)}</span>,
                                },
                            ]}
                            totalRecords={data?.data.resource.total ?? 0}
                            recordsPerPage={data?.data.resource.per_page ?? 10}
                            page={page}
                            onPageChange={(prevPage) => setPage(prevPage)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailListData;
