import React, { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { formatCurrency, useDebounce } from '../../helper/functions';
import { clsx } from '@mantine/core';
import { useNavigate, useSearchParams } from 'react-router-dom';
import qs from 'query-string';
import { Dialog } from '@headlessui/react';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import { endOfMonth, format, subDays } from 'date-fns';
import { id } from 'date-fns/locale';
import { useGetAnalyticSalesQuery } from '../../store/services/analysticApi';

const categoryTotal = [
    {
        label: '01',
        display_price: 2000000,
        sale_price: 1500000,
    },
    {
        label: '02',
        display_price: 3000000,
        sale_price: 1000000,
    },
    {
        label: '03',
        display_price: 20000000,
        sale_price: 15000000,
    },
    {
        label: '04',
        display_price: 33200000,
        sale_price: 28000000,
    },
    {
        label: '05',
        display_price: 55000000,
        sale_price: 25000000,
    },
    {
        label: '06',
        display_price: 35000000,
        sale_price: 30000000,
    },
    {
        label: '07',
        display_price: 46000000,
        sale_price: 45000000,
    },
    {
        label: '08',
        display_price: 32000000,
        sale_price: 28900000,
    },
    {
        label: '09',
        display_price: 65000000,
        sale_price: 62000000,
    },
    {
        label: '10',
        display_price: 55000000,
        sale_price: 30000000,
    },
    {
        label: '11',
        display_price: 55000000,
        sale_price: 25000000,
    },
    {
        label: '12',
        display_price: 35000000,
        sale_price: 30000000,
    },
    {
        label: '13',
        display_price: 46000000,
        sale_price: 45000000,
    },
    {
        label: '14',
        display_price: 32000000,
        sale_price: 28900000,
    },
    {
        label: '15',
        display_price: 65000000,
        sale_price: 62000000,
    },
    {
        label: '16',
        display_price: 55000000,
        sale_price: 30000000,
    },
    {
        label: '17',
        display_price: 46000000,
        sale_price: 45000000,
    },
    {
        label: '18',
        display_price: 32000000,
        sale_price: 28900000,
    },
    {
        label: '19',
        display_price: 65000000,
        sale_price: 62000000,
    },
    {
        label: '20',
        display_price: 55000000,
        sale_price: 30000000,
    },
    {
        label: '21',
        display_price: 55000000,
        sale_price: 25000000,
    },
    {
        label: '22',
        display_price: 35000000,
        sale_price: 30000000,
    },
    {
        label: '23',
        display_price: 46000000,
        sale_price: 45000000,
    },
    {
        label: '24',
        display_price: 32000000,
        sale_price: 28900000,
    },
    {
        label: '25',
        display_price: 65000000,
        sale_price: 62000000,
    },
    {
        label: '26',
        display_price: 55000000,
        sale_price: 30000000,
    },
    {
        label: '27',
        display_price: 46000000,
        sale_price: 45000000,
    },
    {
        label: '28',
        display_price: 32000000,
        sale_price: 28900000,
    },
    {
        label: '29',
        display_price: 65000000,
        sale_price: 62000000,
    },
    {
        label: '30',
        display_price: 55000000,
        sale_price: 30000000,
    },
];

const ContentTooltip = ({ active, payload, label }: { active: boolean | undefined; payload: any; label: string }) => {
    if (active && payload && label) {
        return (
            <div className="bg-white rounded px-3 py-1.5 border text-xs dark:bg-gray-900 shadow-sm">
                <p className="text-sm font-bold">{label}</p>
                <div className="mb-2 bg-gray-500 dark:bg-gray-300 w-full h-[1px]" />
                <p className="font-bold mb-2">Quantity:</p>
                {payload.map((item: any) => (
                    <div key={item.dataKey} className="flex items-center">
                        <p className="w-3 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <div className="flex items-center w-full gap-2">
                            <p className="text-black w-full">{item.name}</p>
                            <p className="flex flex-none whitespace-nowrap">: {item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const ContentLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex w-full justify-center gap-x-6 items-center text-xs flex-wrap">
            {payload.map((item: any) => (
                <div key={item.id} className="flex gap-x-2 items-center capitalize">
                    <div key={item.id} className="h-2 w-3 rounded" style={{ backgroundColor: item.color }} />
                    {item.value}
                </div>
            ))}
        </ul>
    );
};

const colorPalette = [
    '#bae6fd',
    '#7dd3fc',
    '#38bdf8',
    '#0ea5e9',
    '#0284c7',
    '#fecdd3',
    '#fda4af',
    '#fb7185',
    '#f43f5e',
    '#e11d48',
    '#ddd6fe',
    '#c4b5fd',
    '#a78bfa',
    '#8b5cf6',
    '#7c3aed',
    '#bbf7d0',
    '#86efac',
    '#4ade80',
    '#22c55e',
    '#16a34a',
    '#fef08a',
    '#fde047',
    '#facc15',
    '#eab308',
    '#ca8a04',
    '#e2e8f0',
    '#cbd5e1',
    '#94a3b8',
    '#64748b',
    '#475569',
    '#334155',
];

const AnalyticSale = () => {
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
    const {
        data: dataAnalyticSales,
        isSuccess: isSuccessAnalyticSales,
        refetch: refetchAnalyticSales,
    } = useGetAnalyticSalesQuery({ from: state[0].startDate ? format(state[0].startDate, 'dd-MM-yyyy') : '', to: state[0].endDate ? format(state[0].endDate, 'dd-MM-yyyy') : '' });

    const [colorMap, setColorMap] = useState<{ [key: string]: string }>({});

    const analyticSales: any = useMemo(() => {
        if (isSuccessAnalyticSales) {
            return dataAnalyticSales?.data.resource;
        }
    }, [dataAnalyticSales]);

    const currentDate = new Date();
    const minDate = subDays(currentDate, 49);
    const maxDate = endOfMonth(currentDate);

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
                    url: `/dashboard/analytic_sale`,
                    query: updateQuery,
                },
                { skipNull: true }
            );

            router(url);
        },
        [searchParams[0], router]
    );

    useEffect(() => {
        const uniqueKeys = Array.from(
            analyticSales?.chart
                ? analyticSales?.chart.reduce((keys: any, entry: any) => {
                      Object.keys(entry).forEach((key) => {
                          if (key !== 'date') {
                              keys.add(key);
                          }
                      });
                      return keys;
                  }, new Set<string>())
                : [].reduce((keys: any, entry: any) => {
                      Object.keys(entry).forEach((key) => {
                          if (key !== 'date') {
                              keys.add(key);
                          }
                      });
                      return keys;
                  }, new Set<string>())
        );

        const newColorMap: { [key: string]: string } = {};
        uniqueKeys.forEach((key: any, index: any) => {
            // Use existing color or generate a new color if palette is exhausted
            newColorMap[key] = colorPalette[index] || `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        });

        setColorMap(newColorMap);
    }, [isSuccessAnalyticSales, state[0].startDate, state[0].endDate, analyticSales]);

    useEffect(() => {
        handleCurrentId(layout);
    }, []);
    return (
        <div className="w-full flex flex-col relative">
            <div className="w-full flex justify-between mb-5 items-center sticky top-14 py-5 bg-white/5 backdrop-blur-sm z-10">
                <h3 className="text-2xl font-bold">Analytic Sale</h3>
                <div className="flex gap-2">
                    <div className="px-3 h-10 py-1 border rounded flex gap-3 items-center font-semibold border-gray-500">
                        <p>{analyticSales?.month.current_month.month + ' ' + analyticSales?.month.current_month.year}</p>
                        {analyticSales?.month.date_from.date && (
                            <>
                                <p className="w-[1px] h-full bg-black" />
                                <p>
                                    {analyticSales?.month.date_from.date +
                                        ' ' +
                                        analyticSales?.month.date_from.month +
                                        ' ' +
                                        analyticSales?.month.date_from.year +
                                        ' - ' +
                                        (analyticSales?.month.date_to.date + ' ' + analyticSales?.month.date_to.month + ' ' + analyticSales?.month.date_to.year)}
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
                        <button className="h-full w-4" onClick={() => setIsOpen(true)}>
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
                    <button className="w-10 h-10 flex items-center justify-center border border-l-none rounded border-gray-500 hover:bg-sky-100" onClick={refetchAnalyticSales}>
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
            <div className="w-full h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={analyticSales?.chart}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 30,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="date" stroke="#000" fontSize={12} padding={{ left: 0, right: 0 }} textAnchor="end" style={{ fontSize: '10px' }} angle={-45} height={80} />
                        <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} />} />
                        <Legend content={<ContentLegend />} />
                        {Object.keys(colorMap).map((key) => (
                            <Bar stackId={'a'} dataKey={key} fill={colorMap[key]} key={key} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="w-full flex flex-col gap-4 mt-10 border rounded-md p-5">
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
                {layout === 'grid' ? (
                    <div className="grid grid-cols-4 gap-4 w-full">
                        {debouncedSearch ? (
                            analyticSales?.list_analytic_sale.filter((item: any) => item.product_category_sale.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                analyticSales?.list_analytic_sale
                                    .filter((item: any) => item.product_category_sale.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any, i: any) => (
                                        <div
                                            key={item.code_document_sale}
                                            className="flex w-full bg-white rounded-md overflow-hidden shadow p-5 justify-center flex-col border border-transparent transition-all hover:border-sky-300 box-border relative"
                                        >
                                            <div className="flex w-full items-center gap-4">
                                                <p className="text-sm font-bold text-black w-full">{item.product_category_sale}</p>
                                                <p className="w-10 h-10 bg-gray-100 transition-all flex flex-none items-center justify-center rounded-full">{item.total_category}</p>
                                            </div>
                                            <div className="w-full h-[1px] bg-gray-500 my-2" />
                                            <div className="flex flex-col">
                                                <p className="text-xs font-light text-gray-500">Purchase</p>
                                                <p className="text-sm font-light text-gray-800">{formatCurrency(item.purchase)}</p>
                                            </div>
                                            <div className="flex flex-col mt-2">
                                                <p className="text-xs font-light text-gray-500">Display Price</p>
                                                <p className="text-sm font-light text-gray-800">{formatCurrency(item.display_price_sale)}</p>
                                            </div>
                                            <p className="absolute text-end text-[100px] font-bold bottom-8 right-2 text-gray-300/20 z-0">{i + 1}</p>
                                        </div>
                                    ))
                            ) : (
                                <div className="w-full flex justify-center col-span-4 items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                                </div>
                            )
                        ) : analyticSales?.list_analytic_sale.length > 0 ? (
                            analyticSales?.list_analytic_sale.map((item: any, i: any) => (
                                <div
                                    key={item.code_document_sale}
                                    className="flex w-full bg-white rounded-md overflow-hidden shadow p-5 justify-center flex-col border border-transparent transition-all hover:border-sky-300 box-border relative"
                                >
                                    <div className="flex w-full items-center gap-4">
                                        <p className="text-sm font-bold text-black w-full">{item.product_category_sale}</p>
                                        <p className="w-10 h-10 bg-gray-100 transition-all flex flex-none items-center justify-center rounded-full">{item.total_category}</p>
                                    </div>
                                    <div className="w-full h-[1px] bg-gray-500 my-2" />
                                    <div className="flex flex-col">
                                        <p className="text-xs font-light text-gray-500">Purchase</p>
                                        <p className="text-sm font-light text-gray-800">{formatCurrency(item.purchase)}</p>
                                    </div>
                                    <div className="flex flex-col mt-2">
                                        <p className="text-xs font-light text-gray-500">Display Price</p>
                                        <p className="text-sm font-light text-gray-800">{formatCurrency(item.display_price_sale)}</p>
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
                                <div className="w-1/4 flex-none text-center font-bold">Category Name</div>
                                <div className="w-1/4 flex-none text-center font-bold">Quantity</div>
                                <div className="w-1/4 flex-none text-center font-bold">Purchase</div>
                                <div className="w-1/4 flex-none text-center font-bold">Display Price</div>
                            </div>
                        </div>
                        {debouncedSearch ? (
                            analyticSales?.list_analytic_sale.filter((item: any) => item.product_category_sale.toLowerCase().includes(debouncedSearch.toLowerCase())).length > 0 ? (
                                analyticSales?.list_analytic_sale
                                    .filter((item: any) => item.product_category_sale.toLowerCase().includes(debouncedSearch.toLowerCase()))
                                    .map((item: any, i: any) => (
                                        <div key={item.product_category_sale} className="w-full flex items-center h-10 px-5 gap-2 hover:border-sky-500 border-b border-sky-200">
                                            <div className="w-10 flex-none text-center">{i + 1}</div>
                                            <div className="w-full flex items-center gap-2">
                                                <div className="w-1/4 flex-none text-start">{item.product_category_sale}</div>
                                                <div className="w-1/4 flex-none text-center">{item.total_category}</div>
                                                <div className="w-1/4 flex-none text-center">{formatCurrency(parseFloat(item.purchase))}</div>
                                                <div className="w-1/4 flex-none text-center">{formatCurrency(parseFloat(item.display_price_sale))}</div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="w-full flex justify-center col-span-4 items-center px-5 py-10 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-full flex-none text-center font-semibold">No Data Viewed.</div>
                                </div>
                            )
                        ) : analyticSales?.list_analytic_sale.length > 0 ? (
                            analyticSales?.list_analytic_sale.map((item: any, i: any) => (
                                <div key={item.product_category_sale} className="w-full flex items-center h-10 px-5 gap-2 hover:border-sky-500 border-b border-sky-200">
                                    <div className="w-10 flex-none text-center">{i + 1}</div>
                                    <div className="w-full flex items-center gap-2">
                                        <div className="w-1/4 flex-none text-start">{item.product_category_sale}</div>
                                        <div className="w-1/4 flex-none text-center">{item.total_category}</div>
                                        <div className="w-1/4 flex-none text-center">{formatCurrency(parseFloat(item.purchase))}</div>
                                        <div className="w-1/4 flex-none text-center">{formatCurrency(parseFloat(item.display_price_sale))}</div>
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
        </div>
    );
};

export default AnalyticSale;
