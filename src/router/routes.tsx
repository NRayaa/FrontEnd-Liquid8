import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const DataInput = lazy(() => import('../pages/Inbound/DataProcess/DataInput'));
const AddDataInput = lazy(() => import('../pages/Inbound/DataProcess/AddDataInput'));
const ListData = lazy(() => import('../pages/Inbound/DataProcess/ListData'));
const MultiCheck = lazy(() => import('../pages/Inbound/CheckProduct/MultiCheck'));
const DetailListData = lazy(() => import('../pages/Inbound/DataProcess/DetailListData'));
const RiwayatCheck = lazy(() => import('../pages/Inbound/RiwayarCheck/RiwayatCheck'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
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
    // Riwayat Check
    {
        path: '/inbound/riwayat_check/riwayat_check',
        element: <RiwayatCheck />,
        layout: 'default',
    },
];

export { routes };
