import { lazy } from 'react';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const DataInput = lazy(() => import('../pages/Inbound/DataProcess/DataInput'));
const AddDataInput = lazy(() => import('../pages/Inbound/DataProcess/AddDataInput'));
const ListData = lazy(() => import('../pages/Inbound/CheckProduct/ListData'));
const MultiCheck = lazy(() => import('../pages/Inbound/CheckProduct/MultiCheck'));
const DetailListData = lazy(() => import('../pages/Inbound/CheckProduct/DetailListData'));
const CheckHistory = lazy(() => import('../pages/Inbound/CheckHistory'));
const DetailCheckHistory = lazy(() => import('../pages/Inbound/CheckHistory/Detail'));
const Product = lazy(() => import('../pages/Storage/Product'));
const DetailProduct = lazy(() => import('../pages/Storage/Product/DetailProduct'));
const CategorySetting = lazy(() => import('../pages/Storage/CategorySetting'));
const AddCategory = lazy(() => import('../pages/Storage/CategorySetting/AddCategory'));
const EditCategory = lazy(() => import('../pages/Storage/CategorySetting/EditCategory'));
const TagWarna = lazy(() => import('../pages/Storage/CategorySetting/TagWarna'));
const AddTagWarna = lazy(() => import('../pages/Storage/CategorySetting/TagWarna/AddTagWarna'));
const EditTagWarna = lazy(() => import('../pages/Storage/CategorySetting/TagWarna/EditTagWarna'));

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
        path: '/inbound/check_product/list_data',
        element: <ListData />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/detail_data',
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
    {
        path: '/storage/product',
        element: <Product />,
        layout: 'default',
    },
    {
        path: '/storage/product/:id',
        element: <DetailProduct />,
        layout: 'default',
    },
    {
        path: '/storage/categorysetting',
        element: <CategorySetting />,
        layout: 'default',
    },
    {
        path: '/storage/categorysetting/add_category',
        element: <AddCategory />,
        layout: 'default',
    },
    {
        path: '/storage/categorysetting/tag_warna',
        element: <TagWarna />,
        layout: 'default',
    },
    {
        path: '/storage/categorysetting/tag_warna/add',
        element: <AddTagWarna />,
        layout: 'default',
    },
    {
        path: '/storage/categorysetting/tag_warna/:id',
        element: <EditTagWarna />,
        layout: 'default',
    },
    {
        path: '/storage/categorysetting/:id',
        element: <EditCategory />,
        layout: 'default',
    },
];

export { routes };
