import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const DataInput = lazy(() => import('../pages/Inbound/DataProcess/DataInput'));
const AddDataInput = lazy(() => import('../pages/Inbound/DataProcess/AddDataInput'));
const ListData = lazy(() => import('../pages/Inbound/DataProcess/ListData'));
const MultiCheck = lazy(() => import('../pages/Inbound/CheckProduct/MultiCheck'));
const DetailListData = lazy(() => import('../pages/Inbound/DataProcess/DetailListData'));
const CheckHistory = lazy(() => import('../pages/Inbound/CheckHistory'));
const DetailCheckHistory = lazy(() => import('../pages/Inbound/CheckHistory/Detail'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Dashboard />,
        layout: 'default',
    },
    //Inbound Data Process
    {
        path: '/inbound/data_process/data_input',
        element: <DataInput />,
        layout: 'default',
    },
    {
        path: '/inbound/data_process/add_data_input',
        element: <AddDataInput />,
        layout: 'default',
    },
    //List Data
    {
        path: '/inbound/data_process/list_data',
        element: <ListData />,
        layout: 'default',
    },
    {
        path: '/inbound/data_process/detail_data',
        element: <DetailListData />,
        layout: 'default',
    },
    // Check Product
    {
        path: '/inbound/check_product/multi_check',
        element: <MultiCheck />,
        layout: 'default',
    },
    {
        path: '/inbound/check_history',
        element: <CheckHistory />,
        layout: 'default',
    },
    {
        path: '/inbound/check_history/:id',
        element: <DetailCheckHistory />,
        layout: 'default',
    },
];

export { routes };
