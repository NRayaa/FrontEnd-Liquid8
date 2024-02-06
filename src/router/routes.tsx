import { lazy } from 'react';
import Kasir from '../pages/Outbound/Sale/Kasir';
import ListKasir from '../pages/Outbound/Sale/ListKasir';
import ListAkun from '../pages/Akun/Akun/ListAkun';
import ListRole from '../pages/Akun/Role/ListRole';
import AddAkun from '../pages/Akun/Akun/AddAkun';
import EditAkun from '../pages/Akun/Akun/EditAkun';
import LoginBoxed from '../pages/Authentication/LoginBoxed';
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
const Pallet = lazy(() => import('../pages/Storage/Pallet'));
const PalletGenerate = lazy(() => import('../pages/Storage/Pallet/PalletGenerate'));
const ListProduct = lazy(() => import('../pages/Storage/ExpiredProduct/ListProduct/ListProduct'));
const DetailExpiredProduct = lazy(() => import('../pages/Storage/ExpiredProduct/ListProduct/DetailExpiredProduct'));
const BundleProduct = lazy(() => import('../pages/Storage/ExpiredProduct/BundleProduct/BundleProduct'));
const CreateBundle = lazy(() => import('../pages/Storage/ExpiredProduct/BundleProduct/CreateBundle'));
const DetailBundle = lazy(() => import('../pages/Storage/ExpiredProduct/BundleProduct/DetailBundle'));
const PromoProduct = lazy(() => import('../pages/Storage/ExpiredProduct/PromoProduct/PromoProduct'));
const CreatePromo = lazy(() => import('../pages/Storage/ExpiredProduct/PromoProduct/CreatePromo'));
const EditExpiredToPromo = lazy(() => import('../pages/Storage/ExpiredProduct/PromoProduct/EditExpiredToPromo'));
const DetailPromo = lazy(() => import('../pages/Storage/ExpiredProduct/PromoProduct/DetailPromo'));
const ListProductRepair = lazy(() => import('../pages/RepairStation/ListProductRepair/ListProductRepair'));
const RepairProduct = lazy(() => import('../pages/RepairStation/ListProductRepair/RepairProduct'));
const ListDump = lazy(() => import('../pages/RepairStation/ListDump/ListDump'));
const Migrate = lazy(() => import('../pages/Outbound/Migrate/Migrate'));
const ListMigrate = lazy(() => import('../pages/Outbound/Migrate/ListMigrate'));
const DetailMigrate = lazy(() => import('../pages/Outbound/Migrate/DetailMigrate'));

const routes = [
    // Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
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
        path: '/storage/categorysetting/sub_kategori',
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
    // Expired Product
    {
        path: '/storage/expired_product/list_product',
        element: <ListProduct />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/detail_product/:id',
        element: <DetailExpiredProduct />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/bundle_product',
        element: <BundleProduct />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/create_bundle',
        element: <CreateBundle />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/detail_bundle/:id',
        element: <DetailBundle />,
        layout: 'default',
    },
    // promo Product
    {
        path: '/storage/expired_product/promo_product',
        element: <PromoProduct />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/create_promo',
        element: <CreatePromo />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/create_promo/:id',
        element: <EditExpiredToPromo />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/detail_promo/:id',
        element: <DetailPromo />,
        layout: 'default',
    },
    // Pallet
    {
        path: '/storage/pallet/',
        element: <Pallet />,
        layout: 'default',
    },
    {
        path: '/storage/pallet/create_pallet/generate',
        element: <PalletGenerate />,
        layout: 'default',
    },
    // Repair Station
    {
        path: '/repair_station/list_product_repair',
        element: <ListProductRepair />,
        layout: 'default',
    },
    {
        path: '/repair_station/list_repair_product/repair_product',
        element: <RepairProduct />,
        layout: 'default',
    },
    {
        path: '/repair_station/list_dump',
        element: <ListDump />,
        layout: 'default',
    },
    // Outbound
    {
        path: '/outbound/migrate/migrate',
        element: <Migrate />,
        layout: 'default',
    },
    {
        path: '/outbound/migrate/list_migrate',
        element: <ListMigrate />,
        layout: 'default',
    },
    {
        path: '/outbound/migrate/list_migrate/detail_migrate/:id',
        element: <DetailMigrate />,
        layout: 'default',
    },
    {
        path: '/outbound/sale/kasir',
        element: <Kasir />,
        layout: 'default',
    },
    {
        path: '/outbound/sale/list_kasir',
        element: <ListKasir />,
        layout: 'default',
    },
    // Akun
    {
        path: '/akun/akun/list_akun',
        element: <ListAkun />,
        layout: 'default',
    },
    {
        path: '/akun/akun/list_akun/add_akun',
        element: <AddAkun />,
        layout: 'default',
    },
    {
        path: '/akun/akun/list_akun/edit_akun/:id',
        element: <EditAkun />,
        layout: 'default',
    },
    {
        path: '/akun/role/list_role',
        element: <ListRole />,
        layout: 'default',
    },
];

export { routes };
