import { useSelector } from 'react-redux';
import { useGetUsersQuery } from '../store/services/usersApi';
import { IRootState } from '../store';
import { useMemo, useState } from 'react';
import Dropdown from '../components/Dropdown';
import IconHorizontalDots from '../components/Icon/IconHorizontalDots';
import ReactApexChart from 'react-apexcharts';
import IconCashBanknotes from '../components/Icon/IconCashBanknotes';
import IconUser from '../components/Icon/IconUser';
import IconNetflix from '../components/Icon/IconNetflix';
import IconBolt from '../components/Icon/IconBolt';
import IconPlus from '../components/Icon/IconPlus';
import IconCaretDown from '../components/Icon/IconCaretDown';
import { useGetDashboardQuery } from '../store/services/dashboardApi';

const Index = () => {
    // const { data } = useGetUsersQuery('');
    const { data, isLoading } = useGetDashboardQuery(undefined);
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    const inboundData = useMemo(() => {
        return data?.data.resource.chart_inbound_outbound.map((item) => item.inbound_count);
    }, [data]);

    const outboundData = useMemo(() => {
        return data?.data.resource.chart_inbound_outbound.map((item) => item.outbound_count);
    }, [data]);

    const listInboundData = useMemo(() => {
        return data?.data.resource.inbound_data.data;
    }, [data]);

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Inbound',
                data: inboundData,
                // data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Outbound',
                data: outboundData,
                // data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1 + '';
                        // return value;
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const productSales = useMemo(() => {
        return data?.data?.resource?.product_sales || [];
    }, [data]);

    const totalSales = productSales?.find((item) => item.all_total)?.all_total || 0; 
    const productCategories = productSales.filter((item) => !item.all_total); 
    const randomColors = useMemo(() => {
        return data?.data?.resource?.product_sales.map(() => getRandomColor()) || [];
    }, [data]);

    //Sales By Category
    const salesByCategory: any = {
        series: productCategories.map((item) => parseInt(String(item.total), 10)),
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 0,
                colors: isDark ? '#888ea8' : randomColors,
            },
            colors: randomColors,
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '85%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: 10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? 'randomColors' : randomColors,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: () => totalSales,
                            },
                        },
                    },
                },
            },
            labels: productCategories.map((item) => item.new_category_product),
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    const productData = useMemo(() => {
        return data?.data?.resource?.product_data || [];
    }, [data]);

    const totalProductData = productData?.find((item) => item.all_total)?.all_total || 0;
    const productCategoriesData = productData.filter((item) => !item.all_total); 
    const randomColorsProductData = useMemo(() => {
        return data?.data?.resource?.product_data.map(() => getRandomColor()) || [];
    }, [data]);

    //Product By Category
    const productByCategory: any = {
        series: productCategoriesData.map((item) => parseInt(String(item.total), 10)),
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 0,
                colors: isDark ? '#888ea8' : randomColorsProductData,
            },
            colors: randomColorsProductData,
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '85%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: 10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? 'randomColorsProductData' : randomColorsProductData,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: () => totalProductData,
                            },
                        },
                    },
                },
            },
            labels: productCategoriesData.map((item) => item.new_category_product),
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    const productExpired = useMemo(() => {
        return data?.data?.resource?.expired_data || [];
    }, [data]);
    const totalProductExpired = productExpired?.find((item) => item.all_total)?.all_total || 0;
    const productCategoriesExpired = productExpired.filter((item) => !item.all_total);
    const randomColorsProductExpired = useMemo(() => {
        return data?.data?.resource?.expired_data.map(() => getRandomColor()) || [];
    }, [data]);

    //Expired By Category
    const expiredByCategory: any = {
        series: productCategoriesExpired.map((item) => Math.round((item.total / totalProductExpired) * 10)),
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 0,
                colors: isDark ? '#888ea8' : randomColorsProductExpired,
            },
            colors: randomColorsProductExpired,
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '85%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: 10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? 'randomColorsProductExpired' : randomColorsProductExpired,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: () => totalProductExpired,
                            },
                        },
                    },
                },
            },
            labels: productCategoriesExpired.map((item) => item.new_category_product),
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    return (
        <div>
            {/* <h1 className="text-5xl font-bold mb-4">Test api</h1>
            <ul>{data?.length !== 0 && data?.map((item) => <li key={item.id}>{item.name}</li>)}</ul> */}
            <div className="grid xl:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full xl:col-span-2">
                    <div className="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg">Inbound Outbound </h5>
                    </div>
                    <p className="text-lg dark:text-white-light/90">
                        <span className="text-primary ml-2"></span>
                    </p>
                    <div className="relative">
                        <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                            {loading ? (
                                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                </div>
                            ) : (
                                <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} />
                            )}
                        </div>
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex items-center mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Sales By Category</h5>
                    </div>
                    <div>
                        <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                            {loading ? (
                                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                </div>
                            ) : (
                                <ReactApexChart series={salesByCategory.series} options={salesByCategory.options} type="donut" height={460} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                <div className="panel h-full">
                    <div className="flex items-center justify-between dark:text-white-light mb-5">
                        <h5 className="font-semibold text-lg">Inbound Data</h5>
                    </div>
                    <div>
                        <div className="space-y-6">
                            {listInboundData?.map((item, index) => (
                                <div key={index} className="flex">
                                    <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-success-light dark:bg-success text-success dark:text-success-light">ID</span>
                                    <div className="px-3 flex-1">
                                        <div>{item.base_document}</div>
                                        <div className="text-xs text-white-dark dark:text-gray-500">{formatDate(item.created_at)}</div>
                                    </div>
                                    <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">{item.total_column_in_document}</span>
                                </div>
                            ))}
                            {/* <div className="flex">
                                <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-warning-light dark:bg-warning text-warning dark:text-warning-light">
                                    <IconCashBanknotes />
                                </span>
                                <div className="px-3 flex-1">
                                    <div>Cash withdrawal</div>
                                    <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                </div>
                                <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">12.000</span>
                            </div>
                            <div className="flex">
                                <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-danger-light dark:bg-danger text-danger dark:text-danger-light">
                                    <IconUser className="w-6 h-6" />
                                </span>
                                <div className="px-3 flex-1">
                                    <div>Amy Diaz</div>
                                    <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                </div>
                                <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">43.000</span>
                            </div>
                            <div className="flex">
                                <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                                    <IconNetflix />
                                </span>
                                <div className="px-3 flex-1">
                                    <div>Netflix</div>
                                    <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                </div>
                                <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">25.000</span>
                            </div>
                            <div className="flex">
                                <span className="shrink-0 grid place-content-center text-base w-9 h-9 rounded-md bg-info-light dark:bg-info text-info dark:text-info-light">DA</span>
                                <div className="px-3 flex-1">
                                    <div>Daisy Anderson</div>
                                    <div className="text-xs text-white-dark dark:text-gray-500">10 Jan 1:00PM</div>
                                </div>
                                <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">50.000</span>
                            </div>
                            <div className="flex">
                                <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-primary-light dark:bg-primary text-primary dark:text-primary-light">
                                    <IconBolt />
                                </span>
                                <div className="px-3 flex-1">
                                    <div>Electricity Bill</div>
                                    <div className="text-xs text-white-dark dark:text-gray-500">04 Jan 1:00PM</div>
                                </div>
                                <span className="text-danger text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre">20.000</span>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="panel h-full">
                    <div className="flex items-center mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Outbound By Category</h5>
                    </div>
                    <div>
                        <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                            {loading ? (
                                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                </div>
                            ) : (
                                <ReactApexChart series={expiredByCategory.series} options={expiredByCategory.options} type="donut" height={460} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="panel h-full">
                    <div className="flex items-center mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Product By Category</h5>
                    </div>
                    <div>
                        <div className="bg-white dark:bg-black rounded-lg overflow-hidden">
                            {loading ? (
                                <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                </div>
                            ) : (
                                <ReactApexChart series={productByCategory.series} options={productByCategory.options} type="donut" height={460} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
