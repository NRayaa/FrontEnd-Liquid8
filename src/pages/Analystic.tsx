import React, { Fragment, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, LabelList, Cell, LabelProps } from 'recharts';
import { formatCurrency } from '../helper/functions';
import { Tab } from '@headlessui/react';
import { clsx } from '@mantine/core';
import { useGetSummarySalesQuery, useGetSummaryTransactionQuery } from '../store/services/analysticApi';

type DataPoint = {
    name: string;
    value: number;
};

const data = [
    {
        month: 'Jan',
        customers: 3500,
        transactions: 3200,
        value: 1000000,
    },
    {
        month: 'Feb',
        customers: 2500,
        transactions: 2800,
        value: 2500000,
    },
    {
        month: 'Mar',
        customers: 280,
        transactions: 250,
        value: 800000,
    },
    {
        month: 'Apr',
        customers: 1500,
        transactions: 1200,
        value: 3200000,
    },
    {
        month: 'May',
        customers: 2100,
        transactions: 2000,
        value: 2100500,
    },
    {
        month: 'Jun',
        customers: 3800,
        transactions: 3600,
        value: 3199000,
    },
    {
        month: 'Jul',
        customers: 2300,
        transactions: 2000,
        value: 1500000,
    },
    {
        month: 'Aug',
        customers: 4200,
        transactions: 4000,
        value: 4200000,
    },
    {
        month: 'Sep',
        customers: 3800,
        transactions: 3600,
        value: 3199000,
    },
    {
        month: 'Oct',
        customers: 2300,
        transactions: 2000,
        value: 1500000,
    },
    {
        month: 'Nov',
        customers: 4200,
        transactions: 4000,
        value: 4200000,
    },
    {
        month: 'Dec',
        customers: 4200,
        transactions: 4000,
        value: 4200000,
    },
];
const salesQty = [
    {
        label: 'Electronics Hv (>1JT)',
        qty: 109,
        dPrice: 196083010,
        aDiscount: 137258107,
    },
    {
        label: 'Electronics Art (0-1JT)',
        qty: 239,
        dPrice: 70953736,
        aDiscount: 42572242,
    },
    {
        label: 'Mainan Hv',
        qty: 0,
        dPrice: 0,
        aDiscount: 0,
    },
    {
        label: 'Baby Products (Popok, Susu, Pampers)',
        qty: 316,
        dPrice: 135474208,
        aDiscount: 81448000,
    },
    {
        label: 'Other & Art',
        qty: 260,
        dPrice: 42000000,
        aDiscount: 21000000,
    },
    {
        label: 'FMCG',
        qty: 13,
        dPrice: 3138000,
        aDiscount: 1514000,
    },
    {
        label: 'Toys & Hobbies (200-699)',
        qty: 9,
        dPrice: 2227000,
        aDiscount: 1113000,
    },
    {
        label: 'Fashion',
        qty: 565,
        dPrice: 99671000,
        aDiscount: 39868000,
    },
    {
        label: 'Otomotif Mobil',
        qty: 6,
        dPrice: 1166000,
        aDiscount: 466000,
    },
    {
        label: 'Otomotif Motor',
        qty: 129,
        dPrice: 30292000,
        aDiscount: 12117000,
    },
    {
        label: 'Toys & Hobbies (1-199)',
        qty: 38,
        dPrice: 4999000,
        aDiscount: 1999000,
    },
    {
        label: 'Otomotif',
        qty: 3,
        dPrice: 535000,
        aDiscount: 214000,
    },
    {
        label: 'Accessories LV (1-499rb)',
        qty: 21,
        dPrice: 3583000,
        aDiscount: 1769000,
    },
    {
        label: 'Accessories HV (>500rb)',
        qty: 2,
        dPrice: 3626000,
        aDiscount: 1450000,
    },
    {
        label: 'Electronics HV',
        qty: 5,
        dPrice: 1348000,
        aDiscount: 674000,
    },
    {
        label: 'Electronics ART/ Mainan HV',
        qty: 37,
        dPrice: 8984000,
        aDiscount: 6288000,
    },
    {
        label: 'Baby Products/ Pampers',
        qty: 5,
        dPrice: 9781000,
        aDiscount: 5744000,
    },
    {
        label: 'Other,ART,Beauty,Toys(200-699)',
        qty: 65,
        dPrice: 1134000,
        aDiscount: 680000,
    },
    {
        label: 'Fashion,Otomotif,Toys(1-199)',
        qty: 111,
        dPrice: 10872000,
        aDiscount: 5436000,
    },
    {
        label: 'Toys & Hobbies HV (700rb<)',
        qty: 2,
        dPrice: 20648000,
        aDiscount: 8099000,
    },
    {
        label: 'ART HV (Kompor)',
        qty: 6,
        dPrice: 2000000,
        aDiscount: 1200000,
    },
    {
        label: 'ATK',
        qty: 24,
        dPrice: 1383000,
        aDiscount: 830000,
    },
];

const generalSales = [
    {
        label: '1',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '2',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '3',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '4',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '5',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '6',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '7',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '8',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '9',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '10',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '11',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '12',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '13',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '14',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '15',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '16',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '17',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '18',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '19',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '20',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '21',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '22',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '23',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '24',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '25',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '26',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '27',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '28',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '29',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '30',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
    {
        label: '31',
        harga_awal: 250000,
        harga_modal: 200000,
        value_penjualan: 50000,
    },
];

const ContentTooltip = ({
    active,
    payload,
    label,
    qty = false,
    dPrice = false,
    aDiscount = false,
}: {
    active: boolean | undefined;
    payload: any;
    label: string;
    qty?: boolean;
    dPrice?: boolean;
    aDiscount?: boolean;
}) => {
    if (active && payload && label) {
        return (
            <div className="bg-white rounded px-3 py-1.5 border text-xs dark:bg-gray-900 shadow-sm">
                <p className="text-sm font-bold">{label}</p>
                <div className="mb-2 bg-gray-500 dark:bg-gray-300 w-full h-[1px]" />
                {qty && <p>Qty: {payload[0].value}</p>}
                {dPrice && <p>Display Price: {formatCurrency(parseFloat(payload[0].value))}</p>}
                {aDiscount && <p>After Discount: {formatCurrency(parseFloat(payload[0].value))}</p>}
            </div>
        );
    }
    return null;
};
const ContentGSTooltip = ({ active, payload, label }: { active: boolean | undefined; payload: any; label: string }) => {
    if (active && payload && label) {
        return (
            <div className="bg-white rounded px-3 py-1.5 border text-xs dark:bg-gray-900 shadow-sm">
                <p className="text-sm font-bold">{label} January 2024</p>
                <div className="mb-2 bg-gray-500 dark:bg-gray-300 w-full h-[1px]" />
                <p className="text-sky-700">Harga Awal: {formatCurrency(parseFloat(payload[0].value))}</p>
                <p className="text-green-700">Harga Modal: {formatCurrency(parseFloat(payload[1].value))}</p>
                <p className="text-yellow-700">Value Penjualan: {formatCurrency(parseFloat(payload[2].value))}</p>
            </div>
        );
    }
    return null;
};

const ContentLegend = (props: any) => {
    const { payload } = props;
    return (
        <ul className="flex w-full justify-center gap-x-6 items-center text-xs">
            {payload.map((item: any) => (
                <div key={item.id} className="flex gap-x-2 items-center capitalize">
                    <div
                        className={clsx(
                            'h-2 w-3 rounded',
                            item.value === 'harga_awal' && 'bg-sky-500',
                            item.value === 'harga_modal' && 'bg-green-500',
                            item.value === 'value_penjualan' && 'bg-yellow-500'
                        )}
                    />
                    {item.value === 'harga_awal' && 'Harga Awal'}
                    {item.value === 'harga_modal' && 'Harga Modal'}
                    {item.value === 'value_penjualan' && 'Value Penjualan'}
                </div>
            ))}
        </ul>
    );
};

const Analystic = () => {
    const [hoveredTransactions, setHoveredTransactions] = useState<number | null>(null);
    const [currentTransactions, setCurrentTransactions] = useState<number>(517);
    const [hoveredCustomers, setHoveredCustomers] = useState<number | null>(null);
    const [currentCustomers, setCurrentCustomers] = useState<number>(517);
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);
    const [currentValue, setCurrentValue] = useState<number>(2388255689);
    const { data: dataSummaryTransaction } = useGetSummaryTransactionQuery(undefined);
    const { data: dataSummarySales } = useGetSummarySalesQuery(undefined);

    console.log(dataSummaryTransaction, dataSummarySales);

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full grid grid-cols-6">
                <div className="w-full">hello</div>
                <div className="grid w-full grid-cols-3 gap-4 col-span-5">
                    <div className="flex w-full border border-yellow-200 rounded-md bg-gradient-to-tl from-yellow-500/20 to-yellow-500/0 px-5 py-3">
                        <div className="flex flex-col w-full gap-6">
                            <h5 className="font-semibold">Total Transactions</h5>
                            <div className="flex flex-col">
                                <p className="text-xl font-bold leading-none">{(hoveredTransactions !== null ? hoveredTransactions : currentTransactions).toLocaleString()}</p>
                                <p className="text-sm">on Januay</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    onMouseMove={(state) => {
                                        if (state.isTooltipActive && state.activePayload) {
                                            const { payload } = state.activePayload[0];
                                            setHoveredTransactions(payload.transactions);
                                        }
                                    }}
                                    onMouseLeave={() => setHoveredTransactions(null)}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 30,
                                        bottom: 5,
                                    }}
                                >
                                    <Tooltip active={false} />
                                    <Line type="monotone" dataKey="transactions" stroke="#a16207" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="flex w-full border border-green-200 rounded-md bg-gradient-to-tl from-green-500/20 to-green-500/0 px-5 py-3">
                        <div className="flex flex-col w-full gap-6">
                            <h5 className="font-semibold">Total Customers</h5>
                            <div className="flex flex-col">
                                <p className="text-xl font-bold leading-none">{(hoveredCustomers !== null ? hoveredCustomers : currentCustomers).toLocaleString()}</p>
                                <p className="text-sm">on Januay</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    onMouseMove={(state) => {
                                        if (state.isTooltipActive && state.activePayload) {
                                            const { payload } = state.activePayload[0];
                                            setHoveredCustomers(payload.transactions);
                                        }
                                    }}
                                    onMouseLeave={() => setHoveredCustomers(null)}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 30,
                                        bottom: 5,
                                    }}
                                >
                                    <Tooltip active={false} />
                                    <Line type="monotone" dataKey="customers" stroke="#15803d" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="flex w-full border border-indigo-200 rounded-md bg-gradient-to-tl from-indigo-500/20 to-indigo-500/0 px-5 py-3">
                        <div className="flex flex-col w-full gap-6">
                            <h5 className="font-semibold">Value Transactions</h5>
                            <div className="flex flex-col">
                                <p className="text-xl font-bold leading-none">{(hoveredValue !== null ? formatCurrency(hoveredValue) : formatCurrency(currentValue)).toLocaleString()}</p>
                                <p className="text-sm">on Januay</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    onMouseMove={(state) => {
                                        if (state.isTooltipActive && state.activePayload) {
                                            const { payload } = state.activePayload[0];
                                            setHoveredValue(payload.value);
                                        }
                                    }}
                                    onMouseLeave={() => setHoveredValue(null)}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 10,
                                        left: 30,
                                        bottom: 5,
                                    }}
                                >
                                    <Tooltip active={false} />
                                    <Line type="monotone" dataKey="customers" stroke="#4338ca" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full border-sky-200 rounded-md bg-gradient-to-tl from-sky-500/20 to-sky-500/0 border px-5 py-3">
                <Tab.Group>
                    <div className="flex w-full justify-between items-center py-4">
                        <h5 className="font-bold text-xl">Summary Sales</h5>
                        <Tab.List className={'flex'}>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={clsx('px-5 py-2 text-sm border-none outline-none shadow-none rounded-l-md rounded-r-none', selected ? 'bg-sky-300' : 'bg-white')}>
                                        Quantity
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={clsx('px-5 py-2 text-sm border-none outline-none shadow-none rounded-none', selected ? 'bg-sky-300' : 'bg-white')}>Display Price</button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={clsx('px-5 py-2 text-sm border-none outline-none shadow-none rounded-r-md rounded-l-none', selected ? 'bg-sky-300' : 'bg-white')}>
                                        After Discount
                                    </button>
                                )}
                            </Tab>
                        </Tab.List>
                        <div className="flex">
                            <button className="flex items-center justify-center w-9 h-9 bg-white outline-none hover:bg-white/80 rounded-l-md border border-r-0">
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
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <div className="flex items-center justify-center w-36 h-9 border bg-white cursor-default">November 2024</div>
                            <button className="flex items-center justify-center w-9 h-9 bg-white outline-none hover:bg-white/80 rounded-r-md border border-l-0">
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
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="w-full flex h-[300px] xl:h-[400px] gap-4">
                                <div className="w-full flex justify-end mt-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={salesQty}
                                            margin={{
                                                top: 5,
                                                right: 10,
                                                left: 30,
                                                bottom: 5,
                                            }}
                                        >
                                            <XAxis
                                                dataKey="label"
                                                stroke="#000"
                                                fontSize={12}
                                                axisLine={false}
                                                padding={{ left: 0, right: 0 }}
                                                height={85}
                                                textAnchor="start"
                                                style={{ fontSize: '10px' }}
                                                angle={25}
                                            />
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} qty />} />
                                            <Bar dataKey="qty" fill="#0ea5e9" radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col w-[216px] h-full gap-3 flex-none">
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 bg-gradient-to-br from-sky-500/30 to-sky-500/10 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Quantity</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">5000</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Display Price</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total After Discount</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>

                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="w-full flex h-[300px] xl:h-[400px] gap-4">
                                <div className="w-full flex justify-end mt-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={salesQty}
                                            margin={{
                                                top: 5,
                                                right: 10,
                                                left: 30,
                                                bottom: 5,
                                            }}
                                        >
                                            <XAxis
                                                dataKey="label"
                                                stroke="#000"
                                                fontSize={12}
                                                axisLine={false}
                                                padding={{ left: 0, right: 0 }}
                                                height={85}
                                                textAnchor="start"
                                                style={{ fontSize: '10px' }}
                                                angle={25}
                                            />
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} dPrice />} />
                                            <Bar dataKey="dPrice" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col w-[216px] h-full gap-3 flex-none">
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Quantity</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">5000</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 bg-gradient-to-br from-sky-500/30 to-sky-500/10 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Display Price</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total After Discount</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>

                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="w-full flex h-[300px] xl:h-[400px] gap-4">
                                <div className="w-full flex justify-end mt-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={salesQty}
                                            margin={{
                                                top: 5,
                                                right: 10,
                                                left: 30,
                                                bottom: 5,
                                            }}
                                        >
                                            <XAxis
                                                dataKey="label"
                                                stroke="#000"
                                                fontSize={12}
                                                axisLine={false}
                                                padding={{ left: 0, right: 0 }}
                                                height={85}
                                                textAnchor="start"
                                                style={{ fontSize: '10px' }}
                                                angle={25}
                                            />
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} aDiscount />} />
                                            <Bar dataKey="aDiscount" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col w-[216px] h-full gap-3 flex-none">
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500  justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Quantity</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">5000</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Display Price</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 bg-gradient-to-br from-sky-500/30 to-sky-500/10 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total After Discount</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>

                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <div className="flex flex-col w-full border-sky-200 rounded-md bg-gradient-to-tl from-sky-500/20 to-sky-500/0 border px-5 py-3">
                <Tab.Group>
                    <div className="flex w-full justify-between items-center py-4">
                        <h5 className="font-bold text-xl">General Sales</h5>
                        <Tab.List className={'flex'}>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={clsx('px-5 py-2 text-sm border-none outline-none shadow-none rounded-l-md rounded-r-none', selected ? 'bg-sky-300' : 'bg-white')}>
                                        Bulanan
                                    </button>
                                )}
                            </Tab>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button className={clsx('px-5 py-2 text-sm border-none outline-none shadow-none rounded-r-md', selected ? 'bg-sky-300' : 'bg-white')}>Tahunan</button>
                                )}
                            </Tab>
                        </Tab.List>
                        <div className="flex">
                            <button className="flex items-center justify-center w-9 h-9 bg-white outline-none hover:bg-white/80 rounded-l-md border border-r-0">
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
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </button>
                            <div className="flex items-center justify-center w-36 h-9 border bg-white cursor-default">November 2024</div>
                            <button className="flex items-center justify-center w-9 h-9 bg-white outline-none hover:bg-white/80 rounded-r-md border border-l-0">
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
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="w-full flex h-[300px] xl:h-[400px] gap-4">
                                <div className="w-full flex justify-end mt-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={generalSales}
                                            margin={{
                                                top: 5,
                                                right: 10,
                                                left: 30,
                                                bottom: 5,
                                            }}
                                        >
                                            <XAxis dataKey="label" stroke="#000" fontSize={12} axisLine={false} padding={{ left: 5, right: 0 }} />
                                            <YAxis
                                                tickFormatter={(value) => (parseFloat(value) < 1000 ? `${formatCurrency(value)}` : `${formatCurrency(parseFloat(value) / 1000)}K`)}
                                                fontSize={11}
                                                axisLine={false}
                                            />
                                            <Legend content={<ContentLegend />} />
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentGSTooltip active={active} payload={payload} label={label} />} />
                                            <Bar dataKey="harga_awal" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="harga_modal" fill="#22c55e" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="value_penjualan" fill="#eab308" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="w-full flex h-[300px] xl:h-[400px] gap-4">
                                <div className="w-full flex justify-end mt-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={salesQty}
                                            margin={{
                                                top: 5,
                                                right: 10,
                                                left: 30,
                                                bottom: 5,
                                            }}
                                        >
                                            <XAxis
                                                dataKey="label"
                                                stroke="#000"
                                                fontSize={12}
                                                axisLine={false}
                                                padding={{ left: 0, right: 0 }}
                                                height={85}
                                                textAnchor="start"
                                                style={{ fontSize: '10px' }}
                                                angle={25}
                                            />
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} dPrice />} />
                                            <Bar dataKey="dPrice" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col w-[216px] h-full gap-3 flex-none">
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Quantity</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">5000</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 bg-gradient-to-br from-sky-500/30 to-sky-500/10 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total Display Price</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>
                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="font-semibold">Total After Discount</h3>
                                            <p className="text-xs text-gray-500">January - November 2024</p>
                                        </div>

                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default Analystic;
