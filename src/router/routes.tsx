import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const DataInput = lazy(() => import('../pages/Inbound/DataProcess/DataInput'));
const AddDataInput = lazy(() => import('../pages/Inbound/DataProcess/AddDataInput'));
const ListData = lazy(() => import('../pages/Inbound/DataProcess/ListData'));
const CheckProduct = lazy(() => import('../pages/Inbound/CheckProduct/CheckProduct'));
const DetailListData = lazy(() => import('../pages/Inbound/DataProcess/DetailListData'));

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
        path: '/inbound/data_process/check_product',
        element: <CheckProduct />,
        layout: 'default',
    },
];

export { routes };
