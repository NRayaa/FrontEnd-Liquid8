import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { formatCurrency } from '../helper/functions';

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
const sales = [
    {
        label: 'Electronics Hv (>1JT)',
        value: 3500,
    },
    {
        label: 'Electronics Art (0-1JT)',
        value: 3500,
    },
    {
        label: 'Mainan Hv',
        value: 3500,
    },
];

const getCurrentMonthData = () => {
    const currentMonth = new Date().getMonth();
    return data[currentMonth];
};

const Analystic = () => {
    const [hoveredTransactions, setHoveredTransactions] = useState<number | null>(null);
    const [currentTransactions, setCurrentTransactions] = useState<number>(getCurrentMonthData().transactions);
    const [hoveredCustomers, setHoveredCustomers] = useState<number | null>(null);
    const [currentCustomers, setCurrentCustomers] = useState<number>(getCurrentMonthData().customers);
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);
    const [currentValue, setCurrentValue] = useState<number>(getCurrentMonthData().value);

    useEffect(() => {
        setCurrentTransactions(getCurrentMonthData().transactions);
        setCurrentCustomers(getCurrentMonthData().customers);
        setCurrentValue(getCurrentMonthData().value);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="grid w-full grid-cols-3 gap-4">
                <div className="flex w-full border border-sky-200 rounded-md bg-gradient-to-tl from-sky-500/20 to-sky-500/0 px-5 py-3">
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
                                <Line type="monotone" dataKey="transactions" stroke="#0ea5e9" dot={false} />
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
                                <Line type="monotone" dataKey="customers" stroke="#22c55e" dot={false} />
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
                                <Line type="monotone" dataKey="customers" stroke="#6366f1" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full rounded-md bg-gradient-to-tl from-indigo-500/20 to-indigo-500/0 shadow px-5 py-3">
                <h5 className="font-semibold text-lg">Sales per Quantity</h5>
                <div className="w-full flex justify-end h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            onMouseMove={(state) => {
                                if (state.isTooltipActive && state.activePayload) {
                                    const { payload } = state.activePayload[0];
                                    setHoveredValue(payload.transactions);
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
                            <Bar type="monotone" dataKey="customers" stroke="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analystic;
