import React, { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useDebounce } from '../../helper/functions';
import { clsx } from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import { useGetAnalyticSalesQuery, useGetGeneralSalesQuery, useGetStorageReportQuery } from '../../store/services/analysticApi';

const categoryTotal = [
    {
        label: 'Electronics Hv (>1JT)',
        value: 109,
    },
    {
        label: 'Electronics Art (0-1JT)',
        value: 239,
    },
    {
        label: 'Mainan Hv',
        value: 0,
    },
    {
        label: 'Baby Products (Popok, Susu, Pampers)',
        value: 316,
    },
    {
        label: 'Other & Art',
        value: 260,
    },
    {
        label: 'FMCG',
        value: 13,
    },
    {
        label: 'Toys & Hobbies (200-699)',
        value: 9,
    },
    {
        label: 'Fashion',
        value: 565,
    },
    {
        label: 'Otomotif Mobil',
        value: 6,
    },
    {
        label: 'Otomotif Motor',
        value: 129,
    },
    {
        label: 'Toys & Hobbies (1-199)',
        value: 38,
    },
    {
        label: 'Otomotif',
        value: 3,
    },
    {
        label: 'Accessories LV (1-499rb)',
        value: 21,
    },
    {
        label: 'Accessories HV (>500rb)',
        value: 2,
    },
    {
        label: 'Electronics HV',
        value: 5,
    },
    {
        label: 'Electronics ART/ Mainan HV',
        value: 37,
    },
    {
        label: 'Baby Products/ Pampers',
        value: 5,
    },
    {
        label: 'Other,ART,Beauty,Toys(200-699)',
        value: 65,
    },
    {
        label: 'Fashion,Otomotif,Toys(1-199)',
        value: 111,
    },
    {
        label: 'Toys & Hobbies HV (700rb<)',
        value: 2,
    },
    {
        label: 'ART HV (Kompor)',
        value: 6,
    },
    {
        label: 'ATK',
        value: 24,
    },
];

const ContentTooltip = ({ active, payload, label }: { active: boolean | undefined; payload: any; label: string }) => {
    if (active && payload && label) {
        return (
            <div className="bg-white rounded px-3 py-1.5 border text-xs dark:bg-gray-900 shadow-sm">
                <p className="text-sm font-bold">{label}</p>
                <div className="mb-2 bg-gray-500 dark:bg-gray-300 w-full h-[1px]" />
                {<p>qty: {payload[0].value}</p>}
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

    console.log(dataStorageReport);
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

    useEffect(() => {
        handleCurrentId(layout);
    }, []);
    return (
        <div className="w-full flex flex-col relative">
            <div className="w-full flex justify-between mb-5 items-center sticky top-14 py-5 bg-white/5 backdrop-blur-sm z-10">
                <h3 className="text-2xl font-bold">Report Product Per-Category</h3>
                <div className="flex gap-2">
                    <p className="px-5 h-10 border rounded flex items-center font-semibold border-gray-500 cursor-default">Agustus 2024</p>
                    <button className="w-10 h-10 flex items-center justify-center border border-l-none rounded border-gray-500 hover:bg-sky-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M8 16H3v5" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="w-full h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={storageReport?.chart}
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
            <div className="w-full flex flex-col gap-4 mt-10 border rounded-md py-5">
                <div className="w-full sticky top-[135px] flex flex-col gap-4 py-4 shadow-md px-5 bg-white/5 backdrop-blur-sm">
                    <div className="w-full flex justify-start">
                        <h3 className="text-lg font-semibold">List Product Per-Category</h3>
                    </div>
                    <div className="flex w-1/2 items-center gap-5">
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
                </div>
                {layout === 'grid' ? (
                    <div className="grid grid-cols-4 gap-4 w-full px-5">
                        {debouncedSearch ? (
                            storageReport?.chart.filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                storageReport?.chart
                                    .filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any) => (
                                        <div
                                            key={item.category_product}
                                            className="flex w-full bg-white rounded-md overflow-hidden shadow px-5 justify-center h-24 gap-2 flex-col border border-transparent transition-all hover:border-sky-300 box-border"
                                        >
                                            <p className="text-sm font-light text-gray-500">{item.category_product}</p>
                                            <div className="flex justify-between items-center">
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
                            storageReport?.chart.map((item: any) => (
                                <div
                                    key={item.category_product}
                                    className="flex w-full bg-white rounded-md overflow-hidden shadow px-5 justify-center h-24 gap-2 flex-col border border-transparent transition-all hover:border-sky-300 box-border"
                                >
                                    <p className="text-sm font-light text-gray-500">{item.category_product}</p>
                                    <div className="flex justify-between items-center">
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
                            <div className="w-1/3 flex-none text-center font-bold">Total Product</div>
                        </div>
                        {debouncedSearch ? (
                            storageReport?.chart.filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                storageReport?.chart
                                    .filter((item: any) => item.category_product.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any) => (
                                        <div key={item.category_product} className="w-full flex items-center h-10 px-5 hover:border-sky-500 border-b border-sky-200">
                                            <div className="w-2/3 flex-none text-start font-semibold">{item.category_product}</div>
                                            <div className="w-1/3 flex-none text-center font-semibold">{item.total_category.toLocaleString()}</div>
                                        </div>
                                    ))
                            ) : (
                                <div className="w-full flex items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                                </div>
                            )
                        ) : storageReport?.chart.length > 0 ? (
                            storageReport?.chart.map((item: any) => (
                                <div key={item.category_product} className="w-full flex items-center h-10 px-5 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-2/3 flex-none text-start font-semibold">{item.category_product}</div>
                                    <div className="w-1/3 flex-none text-center font-semibold">{item.total_category.toLocaleString()}</div>
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
