import React, { Fragment, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency } from '../helper/functions';
import { Tab } from '@headlessui/react';
import { clsx } from '@mantine/core';

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
                <p className="">Qty: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

const Analystic = () => {
    const [hoveredTransactions, setHoveredTransactions] = useState<number | null>(null);
    const [currentTransactions, setCurrentTransactions] = useState<number>(517);
    const [hoveredCustomers, setHoveredCustomers] = useState<number | null>(null);
    const [currentCustomers, setCurrentCustomers] = useState<number>(517);
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);
    const [currentValue, setCurrentValue] = useState<number>(2388255689);

    return (
        <div className="flex flex-col gap-4">
            <div className="grid w-full grid-cols-3 gap-4">
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
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} />} />
                                            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col w-[216px] h-full gap-3 flex-none">
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 bg-gradient-to-br from-sky-500/30 to-sky-500/10 justify-between">
                                        <h3 className="font-semibold">Total Quantity</h3>
                                        <p className="text-xl font-bold text-end">5000</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <h3 className="font-semibold">Total Display Price</h3>
                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <h3 className="font-semibold">Total After Discount</h3>
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
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} />} />
                                            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col w-[216px] h-full gap-3 flex-none">
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <h3 className="font-semibold">Total Quantity</h3>
                                        <p className="text-xl font-bold text-end">5000</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 bg-gradient-to-br from-sky-500/30 to-sky-500/10 justify-between">
                                        <h3 className="font-semibold">Total Display Price</h3>
                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <h3 className="font-semibold">Total After Discount</h3>
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
                                            <Tooltip cursor={false} content={({ active, payload, label }) => <ContentTooltip active={active} payload={payload} label={label} />} />
                                            <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} label={{ position: 'top' }} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col w-[216px] h-full gap-3 flex-none">
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <h3 className="font-semibold">Total Quantity</h3>
                                        <p className="text-xl font-bold text-end">5000</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 justify-between">
                                        <h3 className="font-semibold">Total Display Price</h3>
                                        <p className="text-xl font-bold text-end">{formatCurrency(53200000)}</p>
                                    </div>
                                    <div className="flex flex-col h-full px-5 py-3 border rounded-md border-sky-500 bg-gradient-to-br from-sky-500/30 to-sky-500/10 justify-between">
                                        <h3 className="font-semibold">Total After Discount</h3>
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
