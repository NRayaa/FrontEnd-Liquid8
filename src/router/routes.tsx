import { lazy } from 'react';
import Kasir from '../pages/Outbound/Sale/Kasir';
import ListKasir from '../pages/Outbound/Sale/ListKasir';
import ListAkun from '../pages/Akun/Akun/ListAkun';
import ListRole from '../pages/Akun/Role/ListRole';
import AddAkun from '../pages/Akun/Akun/AddAkun';
import EditAkun from '../pages/Akun/Akun/EditAkun';
import LoginBoxed from '../pages/Authentication/LoginBoxed';
import DetailCashier from '../pages/Outbound/Sale/DetailCashier';
import ListBuyer from '../pages/Outbound/Buyer/ListBuyer';
import AddBuyer from '../pages/Outbound/Buyer/Addbuyer';
import DetailBuyer from '../pages/Outbound/Buyer/DetailBuyer';
import Bundle from '../pages/Storage/MovingProduct/BundleProduct/MovingBundleProduct';
import DetailBundleProduct from '../pages/Storage/MovingProduct/BundleProduct/DetailBundleProduct';
import Repair from '../pages/Storage/MovingProduct/RepairProduct/Repair';
import CreateRepair from '../pages/Storage/MovingProduct/RepairProduct/CreateRepair';
import DetailRepair from '../pages/Storage/MovingProduct/RepairProduct/DetailRepair';
import PalletProduct from '../pages/Storage/MovingProduct/PalletProduct/PalletProduct';
import CreatePalletProduct from '../pages/Storage/MovingProduct/PalletProduct/CreatePalletProduct';
import DetailPalletProduct from '../pages/Storage/MovingProduct/PalletProduct/DetailPalletProduct';
import CreateMovingBundleProduct from '../pages/Storage/MovingProduct/BundleProduct/CreateMovingBundleProduct';
import BundleProduct from '../pages/Storage/ExpiredProduct/BundleProduct/BundleProduct';
import MovingBundleProduct from '../pages/Storage/MovingProduct/BundleProduct/MovingBundleProduct';
import Notification from '../pages/Notification/Notification';
import PalletDetail from '../pages/Storage/Pallet/DetailPallet';
import CreateManualInbound from '../pages/Inbound/CheckProduct/CreateManualInbound';
import CreateDump from '../pages/RepairStation/ListDump/CreateDump';
import DetailDump from '../pages/RepairStation/ListDump/DetailDump';
import DetailApproveDocument from '../pages/Inbound/CheckProduct/ApprovementProduct/DetailApproveDocument';
import ListDestination from '../pages/Outbound/Migrate/ListDestination';
import AddDestination from '../pages/Outbound/Migrate/AddDestinnation';
import EditDestination from '../pages/Outbound/Migrate/EditDestination';
import Analystic from '../pages/Analystic';
import CreateLPRepair from '../pages/RepairStation/ListProductRepair/CreateRepair';
import ListProductApprove from '../pages/Inbound/CheckProduct/ListProduct/ListProduct';
import DetailApproveProductDocument from '../pages/Inbound/CheckProduct/ListProduct/DetailApproveProduct';
import DetailApproveProductItem from '../pages/Inbound/CheckProduct/ListProduct/DetailApproveProductItem';
import BulkingProduct from '../pages/Inbound/BulkingProduct/BulkingProduct';
import BulkingColor from '../pages/Inbound/BulkingProduct/BulkingColor';
import StorageReport from '../pages/Dashboard/StorageReport';
import GeneralSale from '../pages/Dashboard/GeneralSale';
import AnalyticSale from '../pages/Dashboard/AnalyticSale';
import { Navigate } from 'react-router-dom';
import ListProductStagging from '../pages/Stagging/ProductStagging/ListProductStagging';
import ListApprovementStagging from '../pages/Stagging/ApprovementStagging/ListApprovementStagging';
import DetailStaggingApprovement from '../pages/Stagging/ApprovementStagging/DetailApprovementStagging';
import ListScanResult from '../pages/Inbound/CheckProduct/ScanResult/ListScanResult';
import CheckScanResult from '../pages/Inbound/CheckProduct/ScanResult/CheckScanResult';
import ListScanResultApprovement from '../pages/Inbound/CheckProduct/ScanResultApprovement/ListScanResultApprovement';
import ListBkl from '../pages/Storage/Bkl/ListBkl';
import ListKendaraan from '../pages/Storage/Pallet/kendaraan/ListKendaraan';
import AddKendaraan from '../pages/Storage/Pallet/kendaraan/AddKendaraan';
import DetailKendaraan from '../pages/Storage/Pallet/kendaraan/DetailKendaraan';
import ListKondisi from '../pages/Storage/Pallet/kondisi/ListKondisi';
import AddKondisi from '../pages/Storage/Pallet/kondisi/AddKondisi';
import DetailKondisi from '../pages/Storage/Pallet/kondisi/DetailKondisi';
import ListWarehouse from '../pages/Storage/Pallet/warehouse/ListWarehouse';
import DetailWarehouse from '../pages/Storage/Pallet/warehouse/DetailWarehouse';
import AddWarehouse from '../pages/Storage/Pallet/warehouse/AddWarehouse';
import ListStatus from '../pages/Storage/Pallet/status/ListStatus';
import AddStatus from '../pages/Storage/Pallet/status/AddStatus';
import DetailStatus from '../pages/Storage/Pallet/status/DetailStatus';
import AddMerk from '../pages/Storage/Pallet/merk/AddMerk';
import ListMerk from '../pages/Storage/Pallet/merk/ListMerk';
import DetailMerk from '../pages/Storage/Pallet/merk/DetailMerk';
import CreateBkl from '../pages/Storage/Bkl/AddBkl';
import AddBkl from '../pages/Storage/Bkl/AddBkl';
import DetailBkl from '../pages/Storage/Bkl/DetailBkl';
import MigrateCategory from '../pages/Outbound/MigrateCategory/MigrateCategory';
import ListMigrateCategory from '../pages/Outbound/MigrateCategory/ListMigrateCategory';
import DetailListMigrateCategory from '../pages/Outbound/MigrateCategory/DetailListMigrateCategory';
import DetailMigrateCategory from '../pages/Outbound/MigrateCategory/DetailMigrateCategory';
import CreateMigrateCategory from '../pages/Outbound/MigrateCategory/CreateMigrateCategory';
import DetailProductInput from '../pages/Inbound/CheckProduct/ScanResultApprovement/DetailScanResultApprovement';
import ListAkunPanel from '../pages/Akun/AkunPanel/ListAkunPanel';
import AddAkunPanel from '../pages/Akun/AkunPanel/AddAkunPanel';
import EditAkunPanel from '../pages/Akun/AkunPanel/EditAkunPanel';
import DetailAkunPanel from '../pages/Akun/AkunPanel/DetailAkunPanel';
import AddBarcodeAkunPanel from '../pages/Akun/AkunPanel/AddBarcodeAkunPanel';
import ListB2B from '../pages/Outbound/B2B/ListB2B';
import DetailB2B from '../pages/Outbound/B2B/DetailB2B';
import AddB2B from '../pages/Outbound/B2B/AddB2B';
const Dashboard = lazy(() => import('../pages/Dashboard'));
const DataInput = lazy(() => import('../pages/Inbound/DataProcess/DataInput'));
const ListData = lazy(() => import('../pages/Inbound/CheckProduct/ListData'));
const ApprovementProduct = lazy(() => import('../pages/Inbound/CheckProduct/ApprovementProduct'));
const DetailApproveProduct = lazy(() => import('../pages/Inbound/CheckProduct/ApprovementProduct/DetailApproveProduct'));
const DetailProductApprovement = lazy(() => import('../pages/Inbound/CheckProduct/ApprovementProduct/DetailProductApprovement'));
const MultiCheck = lazy(() => import('../pages/Inbound/CheckProduct/MultiCheck'));
const DetailListData = lazy(() => import('../pages/Inbound/CheckProduct/DetailListData'));
const CheckHistory = lazy(() => import('../pages/Inbound/CheckHistory'));
const DetailCheckHistory = lazy(() => import('../pages/Inbound/CheckHistory/Detail'));
const ProductByCategory = lazy(() => import('../pages/Storage/Product/ByCategory'));
const ProductByColor = lazy(() => import('../pages/Storage/Product/ByColor'));
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
const KasirPrint = lazy(() => import('../pages/Outbound/Sale/KasirPrint'));
const KasirProductPrint = lazy(() => import('../pages/Outbound/Sale/KasirProductPrint'));

const routes = [
    // Authentication
    {
        path: '/auth/login',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    // dashboard
    {
        path: '/',
        element: <Navigate to={'/dashboard/storage_report'} replace />,
        layout: 'default',
    },
    {
        path: '/analystic',
        element: <Analystic />,
        layout: 'default',
    },
    // dashboard-new
    {
        path: '/dashboard/storage_report',
        element: <StorageReport />,
        layout: 'default',
    },
    {
        path: '/dashboard/general_sale',
        element: <GeneralSale />,
        layout: 'default',
    },
    {
        path: '/dashboard/analytic_sale',
        element: <AnalyticSale />,
        layout: 'default',
    },
    // notif
    {
        path: '/notification',
        element: <Notification />,
        layout: 'default',
    },
    //Inbound Data Process
    {
        path: '/inbound/data_process/data_input',
        element: <DataInput />,
        layout: 'default',
    },
    // Inbound Bulkig Product
    {
        path: '/inbound/bulking_product/bulking_category',
        element: <BulkingProduct />,
        layout: 'default',
    },
    {
        path: '/inbound/bulking_product/bulking_color',
        element: <BulkingColor />,
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
        path: '/storage/product/category',
        element: <ProductByCategory />,
        layout: 'default',
    },
    {
        path: '/storage/product/color',
        element: <ProductByColor />,
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
    // Moving Product Bundle
    {
        path: '/storage/moving_product/bundle',
        element: <MovingBundleProduct />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/create_bundle',
        element: <CreateMovingBundleProduct />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/detail_bundle/:id',
        element: <DetailBundleProduct />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/repair',
        element: <Repair />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/create_repair',
        element: <CreateRepair />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/detail_repair/:id',
        element: <DetailRepair />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/pallet',
        element: <PalletProduct />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/create_pallet',
        element: <CreatePalletProduct />,
        layout: 'default',
    },
    {
        path: '/storage/moving_product/detail_pallet/:id',
        element: <DetailPalletProduct />,
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
    {
        path: '/storage/pallet/detail_pallet/:id',
        element: <PalletDetail />,
        layout: 'default',
    },
    {
        path: '/storage/warehouse/',
        element: <ListWarehouse />,
        layout: 'default',
    },
    {
        path: '/storage/warehouse/create_warehouse',
        element: <AddWarehouse />,
        layout: 'default',
    },
    {
        path: '/storage/warehouse/detail_warehouse/:id',
        element: <DetailWarehouse />,
        layout: 'default',
    },
    {
        path: '/storage/kondisi/',
        element: <ListKondisi />,
        layout: 'default',
    },
    {
        path: '/storage/kondisi/create_kondisi',
        element: <AddKondisi />,
        layout: 'default',
    },
    {
        path: '/storage/kondisi/detail_kondisi/:id',
        element: <DetailKondisi />,
        layout: 'default',
    },
    {
        path: '/storage/status/',
        element: <ListStatus />,
        layout: 'default',
    },
    {
        path: '/storage/status/create_status',
        element: <AddStatus />,
        layout: 'default',
    },
    {
        path: '/storage/status/detail_status/:id',
        element: <DetailStatus />,
        layout: 'default',
    },
    {
        path: '/storage/merk/',
        element: <ListMerk />,
        layout: 'default',
    },
    {
        path: '/storage/merk/create_merk',
        element: <AddMerk />,
        layout: 'default',
    },
    {
        path: '/storage/merk/detail_merk/:id',
        element: <DetailMerk />,
        layout: 'default',
    },
    {
        path: '/storage/kendaraan/',
        element: <ListKendaraan />,
        layout: 'default',
    },
    {
        path: '/storage/kendaraan/create_kendaraan',
        element: <AddKendaraan />,
        layout: 'default',
    },
    {
        path: '/storage/kendaraan/detail_kendaraan/:id',
        element: <DetailKendaraan />,
        layout: 'default',
    },
    // Repair Station
    {
        path: '/repair_station/list_product_repair',
        element: <ListProductRepair />,
        layout: 'default',
    },
    {
        path: '/repair_station/list_product_repair/create',
        element: <CreateLPRepair />,
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
    {
        path: '/repair_station/create_dump',
        element: <CreateDump />,
        layout: 'default',
    },
    {
        path: '/repair_station/detail_dump/:id',
        element: <DetailDump />,
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
        path: '/outbound/migrate/list_destination',
        element: <ListDestination />,
        layout: 'default',
    },
    {
        path: '/outbound/migrate/list_destination/add_destination',
        element: <AddDestination />,
        layout: 'default',
    },
    {
        path: '/outbound/migrate/list_destination/edit_destination/:id',
        element: <EditDestination />,
        layout: 'default',
    },
    {
        path: '/outbound/category_migrate/category_migrate',
        element: <MigrateCategory />,
        layout: 'default',
    },
    {
        path: '/outbound/category_migrate/create_category_migrate',
        element: <CreateMigrateCategory />,
        layout: 'default',
    },
    {
        path: '/outbound/category_migrate/category_migrate/:id',
        element: <DetailMigrateCategory />,
        layout: 'default',
    },
    {
        path: '/outbound/category_migrate/list_category_migrate',
        element: <ListMigrateCategory />,
        layout: 'default',
    },
    {
        path: '/outbound/category_migrate/list_category_migrate/:id',
        element: <DetailListMigrateCategory />,
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
    {
        path: '/outbound/sale/list_kasir/detail_kasir/:id',
        element: <DetailCashier />,
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
    // Akun SPV
    {
        path: '/akun/akun/list_akun_panel',
        element: <ListAkunPanel />,
        layout: 'default',
    },
    {
        path: '/akun/akun/list_akun_panel/detail_akun/:id',
        element: <DetailAkunPanel />,
        layout: 'default',
    },
    {
        path: '/akun/akun/list_akun_panel/add_akun',
        element: <AddAkunPanel />,
        layout: 'default',
    },
    {
        path: '/akun/akun/list_akun_panel/edit_akun/:id',
        element: <EditAkunPanel />,
        layout: 'default',
    },
    {
        path: '/akun/akun/list_akun_panel/add_barcode_akun',
        element: <AddBarcodeAkunPanel />,
        layout: 'default',
    },
    // Role
    {
        path: '/akun/role/list_role',
        element: <ListRole />,
        layout: 'default',
    },
    // Buyer
    {
        path: '/buyer/buyer/list_buyer',
        element: <ListBuyer />,
        layout: 'default',
    },
    {
        path: '/buyer/buyer/list_buyer/add_buyer',
        element: <AddBuyer />,
        layout: 'default',
    },
    {
        path: '/buyer/buyer/list_buyer/detail_buyer/:id',
        element: <DetailBuyer />,
        layout: 'default',
    },
     // b2b
     {
        path: '/b2b/b2b/list_b2b',
        element: <ListB2B />,
        layout: 'default',
    },
    {
        path: '/b2b/b2b/list_b2b/add_b2b',
        element: <AddB2B />,
        layout: 'default',
    },
    {
        path: '/b2b/b2b/list_b2b/detail_b2b/:id',
        element: <DetailB2B />,
        layout: 'default',
    },
    {
        path: '/outbound/sale/kasir/print/:code_document_sale',
        element: <KasirPrint />,
        layout: 'default',
    },
    {
        path: '/outbound/sale/kasir/print_product/:code_document_sale',
        element: <KasirProductPrint />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/approvment_product',
        element: <ApprovementProduct />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/approvment_product/detail',
        element: <DetailApproveProduct />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/approvment_document/detail/:id',
        element: <DetailApproveDocument />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/approvment_product/detail/:id',
        element: <DetailProductApprovement />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/manual_inbound',
        element: <CreateManualInbound />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/product_approve_document',
        element: <ListProductApprove />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/product_approve_document/detail/:id',
        element: <DetailApproveProductDocument />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/product_approve_document_Item/detail/:id',
        element: <DetailApproveProductItem />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/approvment_product_stagging/detail',
        element: <DetailApproveProduct />,
        layout: 'default',
    },
    {
        path: '/stagging/list_product_stagging',
        element: <ListProductStagging />,
        layout: 'default',
    },
    {
        path: '/stagging/list_approvement_stagging',
        element: <ListApprovementStagging />,
        layout: 'default',
    },
    {
        path: '/stagging/approvement_stagging/detail/:id',
        element: <DetailStaggingApprovement />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/scan_result',
        element: <ListScanResult />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/check_scan_result',
        element: <CheckScanResult />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/product_input',
        element: <ListScanResultApprovement />,
        layout: 'default',
    },
    {
        path: '/inbound/check_product/product_input/detail/:id',
        element: <DetailProductInput />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/list_bkl',
        element: <ListBkl />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/add_bkl',
        element: <AddBkl />,
        layout: 'default',
    },
    {
        path: '/storage/expired_product/detail/:id',
        element: <DetailBkl />,
        layout: 'default',
    },
];

export { routes };
