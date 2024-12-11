import React, { Fragment, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency, formatRupiah, useDebounce } from '../../helper/functions';
import { clsx } from '@mantine/core';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import { DateRange, DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import { addDays, endOfMonth, format, subDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Dialog, Transition } from '@headlessui/react';
import { id } from 'date-fns/locale';
import { useGetGeneralSalesQuery, useLazyExportMonthlyAnalyticSaleQuery, useLazyExportYearlyAnalyticSaleQuery } from '../../store/services/analysticApi';
import { useGetShowSaleQuery } from '../../store/services/saleApi';
import { GetShowSaleDocumentItem } from '../../store/services/types';
import { DataTable } from 'mantine-datatable';
import IconArchive from '../../components/Icon/IconArchive';
import { Alert } from '../../commons';
import toast from 'react-hot-toast';

const ContentLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex w-full justify-center gap-x-6 items-center text-xs">
            {payload.map((item: any) => (
                <div key={item.id} className="flex gap-x-2 items-center capitalize">
                    <div className={clsx('h-2 w-3 rounded', item.value === 'total_display_price' && 'bg-red-500', item.value === 'total_price_sale' && 'bg-sky-500')} />
                    {item.value === 'total_price_sale' && 'Sale Price'}
                </div>
            ))}
        </ul>
    );
};

const ContentTooltip = ({ active, payload, label }: { active: boolean | undefined; payload: any; label: string }) => {
    if (active && payload && label) {
        return (
            <div className="bg-white rounded px-3 py-1.5 border text-xs dark:bg-gray-900 shadow-sm">
                <p className="text-sm font-bold">{label}</p>
                <div className="mb-2 bg-gray-500 dark:bg-gray-300 w-full h-[1px]" />
                <p>Sale Price: {formatCurrency(payload[0].value)}</p>
            </div>
        );
    }
    return null;
};

const GeneralSale = () => {
    const [state, setState] = useState<Range[]>([
        {
            startDate: undefined,
            endDate: undefined,
            key: 'selection',
        },
    ]);

    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (ranges: RangeKeyDict) => {
        const { selection } = ranges;
        setState([selection]);
    };
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [layout, setLayout] = useState(searchParams[0].get('l') ?? 'list');
    const router = useNavigate();
    const debouncedSearch = useDebounce(search);
    const currentDate = new Date();
    const minDate = subDays(currentDate, 49);
    const maxDate = endOfMonth(currentDate);
    const {
        data: dataGeneralSales,
        isSuccess: isSuccessGeneralSales,
        refetch: refetchGeneralSales,
    } = useGetGeneralSalesQuery({ from: state[0].startDate ? format(state[0].startDate, 'dd-MM-yyyy') : '', to: state[0].endDate ? format(state[0].endDate, 'dd-MM-yyyy') : '' });

    const generalSales: any = useMemo(() => {
        if (isSuccessGeneralSales) {
            return dataGeneralSales?.data.resource;
        }
    }, [dataGeneralSales]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSaleId, setSelectedSaleId] = useState<string | undefined>(undefined);
    const [exportMonthly, { isLoading: isExportLoading }] = useLazyExportMonthlyAnalyticSaleQuery();
    const [exportYearly, { isLoading: isExportLoadingYearly }] = useLazyExportYearlyAnalyticSaleQuery();

    const openModal = (id: string) => {
        setSelectedSaleId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSaleId(undefined);
    };

    const { data: ShowSaleData, isError, isLoading } = useGetShowSaleQuery(selectedSaleId);

    const ShowSale = useMemo(() => {
        return ShowSaleData?.data.resource;
    }, [ShowSaleData]);

    const clearSearch = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSearch('');
    };
    const clearRange = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setState([
            {
                startDate: undefined,
                endDate: undefined,
                key: 'selection',
            },
        ]);
    };

    const handleCurrentId = useCallback(
        (l: string) => {
            setLayout(l);
            let currentQuery = {};

            if (searchParams[0]) {
                currentQuery = qs.parse(searchParams[0].toString());
            }

            const updateQuery: any = {
                ...currentQuery,
                l: l,
            };

            if (!l || l === '') {
                delete updateQuery.l;
                setLayout('');
            }

            const url = qs.stringifyUrl(
                {
                    url: `/dashboard/general_sale`,
                    query: updateQuery,
                },
                { skipNull: true }
            );

            router(url);
        },
        [searchParams[0], router]
    );

    // const handleExportMonthly = () => {
    //     const fromDate = state[0].startDate ? format(state[0].startDate, 'dd-MM-yyyy') : '';
    //     const toDate = state[0].endDate ? format(state[0].endDate, 'dd-MM-yyyy') : '';
    //     exportMonthly({ from: fromDate, to: toDate });
    // };

    const handleExportMonthly = async () => {
        try {
            const fromDate = state[0].startDate ? format(state[0].startDate, 'dd-MM-yyyy') : '';
            const toDate = state[0].endDate ? format(state[0].endDate, 'dd-MM-yyyy') : '';
            const response = await exportMonthly({ from: fromDate, to: toDate }).unwrap();
            const url = response.data.resource;
            const fileName = url.substring(url.lastIndexOf('/') + 1);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success(response.data.message || 'Data General Sale berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data General Sale.');
            console.error('Error exporting General Sale to Excel:', err);
        }
    };

    const handleExportYearly = async () => {
        try {
            const year = state[0].startDate ? format(state[0].startDate, 'yyyy') : '';
            const response = await exportYearly(year).unwrap(); // Changed to exportYearlyAnalyticSale
            const url = response.data.resource;
            const fileName = url.substring(url.lastIndexOf('/') + 1);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success(response.data.message || 'Data General Sale berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data General Sale.');
            console.error('Error exporting General Sale to Excel:', err);
        }
    };

    useEffect(() => {
        handleCurrentId(layout);
    }, []);

    return (
        <div className="w-full flex flex-col relative">
            <div className="w-full flex justify-between mb-5 items-center sticky top-14 py-5 bg-white/5 backdrop-blur-sm z-10">
                <h3 className="text-2xl font-bold">General Sale</h3>
                <div className="flex gap-2">
                    {isSuccessGeneralSales && (
                        <div className="px-3 h-10 py-1 border rounded flex gap-3 items-center font-semibold border-gray-500">
                            <p>{generalSales?.month.current_month.month + ' ' + generalSales?.month.current_month.year}</p>
                            {generalSales?.month.date_from.date !== null && (
                                <>
                                    <p className="w-[1px] h-full bg-black" />
                                    <p>
                                        {generalSales?.month.date_from.date +
                                            ' ' +
                                            generalSales?.month.date_from.month +
                                            ' ' +
                                            generalSales?.month.date_from.year +
                                            ' - ' +
                                            (generalSales?.month.date_to.date + ' ' + generalSales?.month.date_to.month + ' ' + generalSales?.month.date_to.year)}
                                    </p>
                                    <button onClick={clearRange}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 text-red-500"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="m15 9-6 6" />
                                            <path d="m9 9 6 6" />
                                        </svg>
                                    </button>
                                </>
                            )}
                            <p className="w-[1px] h-full bg-black" />
                            <button onClick={() => setIsOpen(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <button className="w-10 h-10 flex items-center justify-center border border-l-none rounded border-gray-500 hover:bg-sky-100" onClick={refetchGeneralSales}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M8 16H3v5" />
                        </svg>
                    </button>
                    <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <Dialog.Panel className="rounded-md space-y-4 border bg-white p-5">
                                <Dialog.Title className="font-bold">Pick a range date</Dialog.Title>
                                <DateRangePicker
                                    editableDateInputs={true}
                                    onChange={handleSelect}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    maxDate={maxDate}
                                    minDate={minDate}
                                    direction="horizontal"
                                    ranges={state}
                                />
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </div>
            </div>
            <div className="w-full h-[350px] relative">
                {!isSuccessGeneralSales && (
                    <div className="w-full h-full bg-sky-500/50 absolute top-0 left-0 flex items-center justify-center rounded-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-7 h-7 animate-spin"
                        >
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M8 16H3v5" />
                        </svg>
                    </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={generalSales?.chart}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 30,
                            bottom: 5,
                        }}
                    >
                        <YAxis
                            tickLine={false}
                            tickFormatter={(value) =>
                                parseFloat(value) < 1000
                                    ? `${formatCurrency(value)}`
                                    : parseFloat(value) < 1000000
                                    ? `${formatCurrency(parseFloat(value) / 1000)}K`
                                    : `${formatCurrency(parseFloat(value) / 1000000)} Jt`
                            }
                            width={100}
                            style={{ fontSize: '11px' }}
                            padding={{ bottom: 10 }}
                        />
                        <XAxis dataKey="date" stroke="#000" fontSize={12} padding={{ left: 0, right: 0 }} textAnchor="end" style={{ fontSize: '11px' }} angle={-45} height={80} />
                        <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} />} />
                        <Legend content={<ContentLegend />} />
                        <Line type={'bump'} dataKey="total_price_sale" stroke="#0ea5e9" dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="w-full flex flex-col gap-4 mt-10 border rounded-md p-5">
                <div className="flex w-full items-center gap-5">
                    <label htmlFor="search" className="relative w-full flex items-center mb-0">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 absolute left-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-9 rounded outline-none px-10 text-xs border border-gray-500" />
                        <button onClick={clearSearch} className={clsx('h-5 w-5 absolute right-2 items-center justify-center outline-none', search.length > 0 ? 'flex' : 'hidden')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </label>
                    <div className="flex border border-gray-500 rounded flex-none h-9 overflow-hidden">
                        <button
                            className={clsx('w-9 h-full flex items-center justify-center outline-none', layout === 'list' ? 'bg-sky-300' : 'bg-transparent')}
                            onClick={() => handleCurrentId('list')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" />
                                <path d="M14 4h7" />
                                <path d="M14 9h7" />
                                <path d="M14 15h7" />
                                <path d="M14 20h7" />
                            </svg>
                        </button>
                        <button
                            className={clsx('w-9 h-full flex items-center justify-center outline-none', layout === 'grid' ? 'bg-sky-300' : 'bg-transparent')}
                            onClick={() => handleCurrentId('grid')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="14" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" />
                            </svg>
                        </button>
                    </div>
                    <div className="relative w-full flex justify-end">
                        {/* New export buttons for year and month */}
                        <button onClick={handleExportYearly} className="btn btn-lg lg:btn btn-primary uppercase ml-4" disabled={isExportLoadingYearly}>
                            {isExportLoading ? 'Exporting...' : 'Export Year Data'}
                        </button>
                        <button onClick={handleExportMonthly} className="btn btn-lg lg:btn btn-primary uppercase ml-4" disabled={isExportLoading}>
                            {isExportLoading ? 'Exporting...' : 'Export Month Data'}
                        </button>
                    </div>
                </div>

                {layout === 'grid' ? (
                    <div className="grid grid-cols-4 gap-4 w-full">
                        {debouncedSearch ? (
                            generalSales?.list_document_sale.filter((item: any) => item.code_document_sale.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                generalSales?.list_document_sale
                                    .filter((item: any) => item.code_document_sale.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any, i: any) => (
                                        <div
                                            key={item.code_document_sale}
                                            className="flex w-full bg-white rounded-md overflow-hidden shadow p-5 justify-center flex-col border border-transparent transition-all hover:border-sky-300 box-border relative"
                                        >
                                            <div className="flex w-full items-center">
                                                <div className="w-full flex flex-col">
                                                    <p className="text-sm font-light text-gray-500">{item.code_document_sale}</p>
                                                    <h3 className="text-gray-700 font-bold text-base">{item.buyer_name_document_sale}</h3>
                                                </div>
                                                <button
                                                    onClick={() => openModal(item.id)}
                                                    className="w-10 h-10 hover:bg-gray-100 transition-all flex flex-none items-center justify-center rounded-full"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="w-4 h-4"
                                                    >
                                                        <path d="M7 7h10v10" />
                                                        <path d="M7 17 17 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="w-full h-[1px] bg-gray-500 my-2" />
                                            <div className="flex flex-col">
                                                <p className="text-xs font-light text-gray-500">Sale Price</p>
                                                <p className="text-sm font-light text-gray-800">{formatCurrency(item.total_purchase)}</p>
                                            </div>
                                            <p className="absolute text-end text-[100px] font-bold bottom-8 right-2 text-gray-300/20 z-0">{i + 1}</p>
                                        </div>
                                    ))
                            ) : (
                                <div className="w-full flex justify-center col-span-4 items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                                </div>
                            )
                        ) : generalSales?.list_document_sale.length > 0 ? (
                            generalSales?.list_document_sale.map((item: any, i: any) => (
                                <div
                                    key={item.code_document_sale}
                                    className="flex w-full bg-white rounded-md overflow-hidden shadow p-5 justify-center flex-col border border-transparent transition-all hover:border-sky-300 box-border relative"
                                >
                                    <div className="flex w-full items-center">
                                        <div className="w-full flex flex-col">
                                            <p className="text-sm font-light text-gray-500">{item.code_document_sale}</p>
                                            <h3 className="text-gray-700 font-bold text-base">{item.buyer_name_document_sale}</h3>
                                        </div>
                                        <button onClick={() => openModal(item.id)} className="w-10 h-10 hover:bg-gray-100 transition-all flex flex-none items-center justify-center rounded-full">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4"
                                            >
                                                <path d="M7 7h10v10" />
                                                <path d="M7 17 17 7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-full h-[1px] bg-gray-500 my-2" />
                                    <div className="flex flex-col">
                                        <p className="text-xs font-light text-gray-500">Sale Price</p>
                                        <p className="text-sm font-light text-gray-800">{formatCurrency(item.total_purchase)}</p>
                                    </div>
                                    <p className="absolute text-end text-[100px] font-bold bottom-8 right-2 text-gray-300/20 z-0">{i + 1}</p>
                                </div>
                            ))
                        ) : (
                            <div className="w-full flex justify-center col-span-4 items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 w-full">
                        <div className="w-full flex items-center h-10 px-5 gap-2 bg-sky-300 rounded">
                            <div className="w-10 font-bold flex-none text-center">No</div>
                            <div className="w-full flex items-center gap-2">
                                <div className="w-2/6 flex-none text-center font-bold">Code Document</div>
                                <div className="w-2/6 flex-none text-center font-bold">Buyer Name</div>
                                <div className="w-1/6 flex-none text-center font-bold">Sale Price</div>
                                <div className="w-1/6 flex-none text-center font-bold">Option</div>
                            </div>
                        </div>
                        {debouncedSearch ? (
                            generalSales?.list_document_sale.filter((item: any) => item.code_document_sale.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                generalSales?.list_document_sale
                                    .filter((item: any) => item.code_document_sale.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any, i: any) => (
                                        <div key={item.code_document_sale} className="w-full flex items-center h-10 px-5 gap-2 hover:border-sky-500 border-b border-sky-200">
                                            <div className="w-10 flex-none text-center">{i + 1}</div>
                                            <div className="w-full flex items-center gap-2">
                                                <div className="w-2/6 flex-none text-center">{item.code_document_sale}</div>
                                                <div className="w-2/6 flex-none text-start">{item.buyer_name_document_sale}</div>
                                                <div className="w-1/6 flex-none text-center">{formatCurrency(item.total_purchase)}</div>
                                                <div className="w-1/6 flex-none text-center">
                                                    <button onClick={() => openModal(item.id)} className="px-3 bg-sky-500 py-0.5 rounded-sm">
                                                        Detail
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="w-full flex justify-center col-span-4 items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                                </div>
                            )
                        ) : generalSales?.list_document_sale.length > 0 ? (
                            generalSales?.list_document_sale.map((item: any, i: any) => (
                                <div key={item.code_document_sale} className="w-full flex items-center h-10 px-5 gap-2 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-10 flex-none text-center">{i + 1}</div>
                                    <div className="w-full flex items-center gap-2">
                                        <div className="w-2/6 flex-none text-center">{item.code_document_sale}</div>
                                        <div className="w-2/6 flex-none text-start">{item.buyer_name_document_sale}</div>
                                        <div className="w-1/6 flex-none text-center">{formatCurrency(item.total_purchase)}</div>
                                        <div className="w-1/6 flex-none text-center">
                                            <button onClick={() => openModal(item.id)} className="px-3 bg-sky-500 py-0.5 rounded-sm">
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full flex justify-center col-span-4 items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" open={isModalOpen} onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/60 z-[999] overflow-y-auto" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-[999] overflow-y-auto">
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
                                <Dialog.Panel className="panel border-0 p-5 rounded-lg overflow-hidden my-8 w-full max-w-5xl text-black dark:text-white-dark bg-white dark:bg-[#121c2c]">
                                    {isLoading && <p>Loading...</p>}
                                    {isError && !ShowSaleData?.data.status ? (
                                        <Alert message={ShowSaleData?.data.message ?? 'Anda tidak berhak mengakses halaman ini'} />
                                    ) : (
                                        <>
                                            <h1 className="text-lg font-semibold py-4">Detail Sale</h1>
                                            <div className="border border-gray-500/20 panel xl:1/3 lg:w-2/5 sm:w-full ss:w-full rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6 pt-12 mt-8 relative">
                                                <div className="bg-primary absolute mt-2 text-white-light ltr:left-6 rtl:right-6 -top-8 w-16 h-16 rounded-md flex items-center justify-center mb-5 mx-auto">
                                                    <IconArchive fill className="w-12 h-12" />
                                                </div>
                                                <div className="xl:1/3 lg:w-2/5 sm:w-1/2">
                                                    <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                                                        <div className="text-white-dark mr-2">DOC SALE :</div>
                                                        <div className="whitespace-nowrap">{ShowSale?.code_document_sale}</div>
                                                    </div>
                                                    <div className="items-center text-lg w-full justify-between mb-2">
                                                        <div className="text-white-dark">QTY :</div>
                                                        <ul className="space-y-3 list-inside list-disc font-semibold">{ShowSale?.total_product_document_sale}</ul>
                                                    </div>
                                                    <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                                                        <div className="text-white-dark mr-2">VOUCHER :</div>
                                                        <div className="whitespace-nowrap"> {ShowSale && typeof ShowSale.voucher === 'string' ? formatRupiah(ShowSale.voucher) : ''}</div>
                                                    </div>
                                                    <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                                                        <div className="text-white-dark mr-2">PRICE TOTAL :</div>
                                                        <div className="whitespace-nowrap">
                                                            {' '}
                                                            {ShowSale && typeof ShowSale.total_price_document_sale === 'string' ? formatRupiah(ShowSale.total_price_document_sale) : ''}
                                                        </div>
                                                    </div>
                                                    <div className="justify-start grid xl:grid-cols-span-2 text-lg w-full mb-2">
                                                        <div className="text-white-dark mr-2">BUYER :</div>
                                                        <div className="whitespace-nowrap">{ShowSale?.buyer_name_document_sale}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end mt-4">
                                                <Link to={`/outbound/sale/kasir/print_product/${ShowSale?.code_document_sale}`} type="button" className="btn btn-lg lg:btn btn-primary uppercase">
                                                    Export By Product
                                                </Link>
                                                <Link to={`/outbound/sale/kasir/print/${ShowSale?.code_document_sale}`} type="button" className="btn btn-lg lg:btn btn-primary uppercase ml-4">
                                                    Export data
                                                </Link>
                                            </div>

                                            <div className="datatables xl:col-span-3 mt-4">
                                                <DataTable
                                                    records={ShowSale?.sales}
                                                    columns={[
                                                        {
                                                            accessor: 'No',
                                                            title: 'No',
                                                            render: (item: GetShowSaleDocumentItem, index: number) => <span>{index + 1}</span>,
                                                        },
                                                        {
                                                            accessor: 'product_barcode_sale',
                                                            title: 'Barcode',
                                                            render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_barcode_sale}</span>,
                                                        },
                                                        {
                                                            accessor: 'product_name_sale',
                                                            title: 'Nama Produk',
                                                            render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_name_sale}</span>,
                                                        },
                                                        {
                                                            accessor: 'product_qty_sale',
                                                            title: 'Qty',
                                                            render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.product_qty_sale}</span>,
                                                        },
                                                        {
                                                            accessor: 'product_price_sale',
                                                            title: 'Harga',
                                                            render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{formatRupiah(item.product_price_sale)}</span>,
                                                        },
                                                        {
                                                            accessor: 'status_sale',
                                                            title: 'Status',
                                                            render: (item: GetShowSaleDocumentItem) => <span className="font-semibold">{item.status_sale}</span>,
                                                        },
                                                    ]}
                                                />
                                            </div>

                                            <button onClick={closeModal} className="mt-4 btn btn-primary">
                                                Close
                                            </button>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default GeneralSale;
