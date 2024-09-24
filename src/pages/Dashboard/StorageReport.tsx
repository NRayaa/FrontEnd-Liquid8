import React, { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { formatCurrency, useDebounce } from '../../helper/functions';
import { clsx } from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import { useGetStorageReportQuery, useLazyExportGenerateExcelStorageReportQuery } from '../../store/services/analysticApi';
import toast from 'react-hot-toast';

const ContentTooltip = ({ active, payload, label }: { active: boolean | undefined; payload: any; label: string }) => {
    if (active && payload && label) {
        return (
            <div className="bg-white rounded px-3 py-1.5 border text-xs dark:bg-gray-900 shadow-sm">
                <p className="text-sm font-bold">{label}</p>
                <div className="mb-2 bg-gray-500 dark:bg-gray-300 w-full h-[1px]" />
                <div className="flex flex-col gap-1">
                    {
                        <div className="flex w-full gap-4 justify-between">
                            <p>Qty:</p>
                            <p>{payload[0].value.toLocaleString()}</p>
                        </div>
                    }
                    {
                        <div className="flex w-full gap-4 justify-between">
                            <p>Value:</p>
                            <p>{formatCurrency(payload[0].payload.total_price_category)}</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
    return null;
};

const StorageReport = () => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [layout, setLayout] = useState(searchParams[0].get('l') ?? 'list');
    const router = useNavigate();
    const debouncedSearch = useDebounce(search);
    const { data: dataStorageReport, isSuccess: isSuccessStorageReport, refetch: refetchStorageReport } = useGetStorageReportQuery(undefined);
    const [exportToExcel] = useLazyExportGenerateExcelStorageReportQuery();

    const storageReport: any = useMemo(() => {
        if (isSuccessStorageReport) {
            return dataStorageReport?.data.resource;
        }
    }, [dataStorageReport]);

    const clearSearch = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSearch('');
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
                    url: `/dashboard/storage_report`,
                    query: updateQuery,
                },
                { skipNull: true }
            );

            router(url);
        },
        [searchParams[0], router]
    );

    const handleExportData = async () => {
        try {
            const response = await exportToExcel({}).unwrap();
            const url = response.data.resource;
            const fileName = url.substring(url.lastIndexOf('/') + 1);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            toast.success('Data Storage berhasil diekspor ke Excel.');
        } catch (err) {
            toast.error('Gagal mengekspor data Storage.');
            console.error('Error exporting Storage to Excel:', err);
        }
    };

    useEffect(() => {
        handleCurrentId(layout);
    }, []);

    return (
        <div className="w-full flex flex-col relative">
            <div className="w-full flex justify-between mb-5 items-center sticky top-14 py-5 bg-white/5 backdrop-blur-sm z-10">
                <h3 className="text-2xl font-bold">Report Product Per-Category</h3>
                <div className="flex gap-2">
                    {isSuccessStorageReport && (
                        <p className="px-5 h-10 border rounded flex items-center font-semibold border-gray-500 cursor-default">
                            {storageReport?.month.current_month.month + ' ' + storageReport?.month.current_month.year}
                        </p>
                    )}
                    <button onClick={refetchStorageReport} className="w-10 h-10 flex items-center justify-center border border-l-none rounded border-gray-500 hover:bg-sky-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M8 16H3v5" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-full h-[500px] relative">
                {!isSuccessStorageReport && (
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
                    <BarChart
                        data={storageReport?.chart?.category}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 30,
                            bottom: 5,
                        }}
                    >
                        <XAxis
                            dataKey="category_product"
                            stroke="#000"
                            fontSize={12}
                            axisLine={false}
                            padding={{ left: 0, right: 0 }}
                            height={100}
                            textAnchor="end"
                            style={{ fontSize: '10px' }}
                            angle={-50}
                        />
                        <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} />} />
                        <Bar dataKey="total_category" fill="#0ea5e9" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: 'black' }} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className=" flex w-full gap-4 mt-10">
                <div className="w-full px-5 py-3 border border-gray-500 rounded-md flex flex-col gap-2">
                    <p>Total Product</p>
                    <p className="text-2xl font-bold">{storageReport?.total_all_category.toLocaleString()}</p>
                </div>
                <div className="w-full px-5 py-3 border border-gray-500 rounded-md flex flex-col gap-2">
                    <p>Total Value</p>
                    <p className="text-2xl font-bold">{formatCurrency(storageReport?.total_all_price_category)}</p>
                </div>
            </div>
            <div className="w-full flex justify-between mb-5 mt-5 items-center sticky top-14 py-5 bg-white/5 backdrop-blur-sm z-10">
                <h3 className="text-2xl font-bold">Report Product Per-Color</h3>
            </div>
            <div className="flex w-full gap-4">
                {storageReport?.chart?.tag_product.map((tag: any) => (
                    <div key={tag.tag_product} className="w-full px-5 py-3 border border-gray-500 rounded-md flex flex-col gap-2">
                        <p>Total Product {tag.tag_product}</p>
                        <p className="text-2xl font-bold">{tag.total_tag_product.toLocaleString()}</p>
                        <p>Total Value</p>
                        <p className="text-xl font-bold">{formatCurrency(tag.total_price_tag_product)}</p>
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 mt-10 border rounded-md py-5">
                <div className="w-full flex flex-col gap-4 mt-10 border rounded-md py-5">
                    <div className="w-full sticky top-[135px] flex flex-col gap-4 py-4 shadow-md px-5 bg-white/5 backdrop-blur-sm">
                        <div className="w-full flex justify-start">
                            <h3 className="text-lg font-semibold">List Product Per-Category</h3>
                        </div>
                        <div className="w-full flex justify-between items-center">
                            <div className="flex items-center gap-5" style={{ width: '60%' }}>
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
                            </div>
                            <div className="flex justify-end" style={{ width: '40%' }}>
                                <button onClick={handleExportData} className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    Export Data
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {layout === 'grid' ? (
                    <div className="grid grid-cols-4 gap-4 w-full px-5">
                        {debouncedSearch ? (
                            storageReport?.chart?.category.filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                storageReport?.chart?.category
                                    .filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any) => (
                                        <div
                                            key={item.category_product}
                                            className="flex w-full bg-white rounded-md overflow-hidden shadow px-5 py-3 justify-center flex-col border border-transparent transition-all hover:border-sky-300 box-border"
                                        >
                                            <p className="text-sm font-light text-gray-500 pb-1">{item.category_product}</p>
                                            <div className="flex flex-col">
                                                <h3 className="text-gray-700 border-t text-sm font-bold pb-2 pt-1">{formatCurrency(item.total_price_category)}</h3>
                                                <h3 className="text-gray-700 font-bold text-2xl">{item.total_category.toLocaleString()}</h3>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="w-full flex justify-center col-span-4 items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                                </div>
                            )
                        ) : (
                            storageReport?.chart?.category.map((item: any) => (
                                <div
                                    key={item.category_product}
                                    className="flex w-full bg-white rounded-md overflow-hidden shadow px-5 py-3 justify-center flex-col border border-transparent transition-all hover:border-sky-300 box-border"
                                >
                                    <p className="text-sm font-light text-gray-500 pb-1">{item.category_product}</p>
                                    <div className="flex flex-col">
                                        <h3 className="text-gray-700 border-t text-sm font-bold pb-2 pt-1">{formatCurrency(item.total_price_category)}</h3>
                                        <h3 className="text-gray-700 font-bold text-2xl">{item.total_category.toLocaleString()}</h3>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 w-full px-5">
                        <div className="w-full flex items-center h-10 px-5 bg-sky-300 rounded">
                            <div className="w-2/3 flex-none text-center font-bold">Category Name</div>
                            <div className="w-1/6 flex-none text-center font-bold">Total Product</div>
                            <div className="w-1/6 flex-none text-center font-bold">Value Product</div>
                        </div>
                        {debouncedSearch ? (
                            storageReport?.chart?.category.filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                storageReport?.chart?.category
                                    .filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any) => (
                                        <div key={item.category_product} className="w-full flex items-center h-10 px-5 hover:border-sky-500 border-b border-sky-200">
                                            <div className="w-2/3 flex-none text-start font-semibold">{item.category_product}</div>
                                            <div className="w-1/6 flex-none text-center font-semibold">{item.total_category.toLocaleString()}</div>
                                            <div className="w-1/6 flex-none text-center font-semibold">{formatCurrency(item.total_price_category)}</div>
                                        </div>
                                    ))
                            ) : (
                                <div className="w-full flex items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                                </div>
                            )
                        ) : storageReport?.chart?.category.length > 0 ? (
                            storageReport?.chart?.category.map((item: any) => (
                                <div key={item.category_product} className="w-full flex items-center h-10 px-5 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-2/3 flex-none text-start font-semibold">{item.category_product}</div>
                                    <div className="w-1/6 flex-none text-center font-semibold">{item.total_category.toLocaleString()}</div>
                                    <div className="w-1/6 flex-none text-center font-semibold">{formatCurrency(item.total_price_category)}</div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full flex items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StorageReport;
