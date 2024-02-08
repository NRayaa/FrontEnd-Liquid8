import { Pagination } from '@mantine/core';

interface UserDataItem {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}
interface GenerateInboundDataProcessResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            headers: any;
            file_name: string;
            templateHeaders: string[];
            fileDetails: {
                total_column_count: number;
                total_row_count: number;
            };
        };
    };
}
interface ProductOldsItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_name_product: string;
    old_quantity_product: string;
    old_price_product: string;
    created_at: string;
    updated_at: string;
}
interface ProductOlds {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ProductOldsItem[];
        };
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url: string;
        to: number;
        total: number;
    };
}
interface MergeHeader {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            old_barcode_product: string;
            old_name_product: string;
            old_quantity_product: number;
            old_price_product: number;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface MergeHeaderBody {
    code_document: string | undefined;
    headerMappings: {
        old_barcode_product: string[] | undefined;
        old_name_product: string[] | undefined;
        old_quantity_product: string[] | undefined;
        old_price_product: string[] | undefined;
    };
}
interface Barcode {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            code_document: string;
            old_barcode_product: string;
            old_name_product: string;
            old_quantity_product: string;
            old_price_product: string;
            created_at: string;
            updated_at: string;
        };
    };
}
interface CheckProductDocumentLinks {
    url: null;
    label: string;
    active: boolean;
}

interface CheckProductDocumentItem {
    id: number;
    code_document: string;
    base_document: string;
    total_column_document: string;
    total_column_in_document: string;
    date_document: string;
    status_document: string;
    created_at: string;
    updated_at: string;
}
interface CheckProductDocument {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: CheckProductDocumentItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: CheckProductDocumentLinks[];
            next_page_url: null;
            path: string;
            per_page: number;
            prev_page_url: null;
            to: number;
            total: number;
        };
    };
}

interface GetBarcodeBody {
    code_document: string;
    old_barcode_product: string;
}
interface Product {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_name_product: string;
    old_quantity_product: string;
    old_price_product: string;
    created_at: string;
    updated_at: string;
}
interface Color {
    id: number;
    hexa_code_color: string;
    name_color: string;
    min_price_color: string;
    max_price_color: string;
    fixed_price_color: string;
    created_at: string;
    updated_at: string;
}
interface GetBarcodeResponse {
    data: {
        status: boolean;
        message: string;
        resource: any;
    };
}
interface DetailProductOld {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ItemDetailOldsProduct[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: {
                url: null | string;
                label: string;
                active: boolean;
            }[];
            next_page_url: string;
            path: string;
            per_page: number;
            prev_page_url: null | number;
            to: number;
            total: number;
        };
    };
}
interface ItemDetailOldsProduct {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_name_product: string;
    old_quantity_product: string;
    old_price_product: string;
    created_at: string;
    updated_at: string;
}

interface GetCategoriesItem {
    id: number;
    name_category: string;
    discount_category: string;
    max_price_category: string;
    created_at: string;
    updated_at: string;
}
interface GetCategories {
    data: {
        status: boolean;
        message: string;
        resource: GetCategoriesItem[];
    };
}
interface ProdcutItem {
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    old_price_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_category_product: string;
    new_tag_product: string;
    new_quality: string;
    updated_at: string;
    created_at: string;
    id: number;
}
interface NewProduct {
    data: {
        status: boolean;
        message: string;
        resource: ProdcutItem;
    };
}
interface NewProductBody {
    code_document: string | undefined;
    old_barcode_product: string | undefined;
    new_barcode_product: string | undefined;
    new_name_product: string | undefined;
    old_name_product: string | undefined;
    new_quantity_product: number | undefined;
    new_price_product: number | undefined;
    new_date_in_product: string | undefined;
    new_status_product: string | undefined;
    condition: string | undefined;
    new_category_product: string | undefined;
    new_tag_product: string | undefined;
    deskripsi: string | undefined;
}

interface ColorTagItem {
    id: number;
    hexa_code_color: string;
    name_color: string;
    min_price_color: string;
    max_price_color: string;
    fixed_price_color: string;
    created_at: string;
    updated_at: string;
}
interface ColorTag {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ColorTagItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: CheckProductDocumentLinks[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface CheckAllProducts {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            total_data: string;
            total_data_in: number;
            total_data_lolos: number;
            total_data_damaged: number;
            total_data_abnormal: number;
            total_discrepancy: number;
            precentage_total_data: number;
            percentage_in: number;
            percentage_lolos: number;
            percentage_damaged: number;
            percentage_abnormal: number;
            percentage_discrepancy: number;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface GetRiwayatcheckItem {
    id: number;
    code_document: string;
    total_data: string;
    total_data_in: string;
    total_data_lolos: string;
    total_data_damaged: string;
    total_data_abnormal: string;
    total_discrepancy: string;
    precentage_total_data: string;
    percentage_in: string;
    percentage_lolos: string;
    percentage_damaged: string;
    percentage_abnormal: string;
    percentage_discrepancy: string;
    created_at: string;
    updated_at: string;
}
interface DetailGetRiwayatcheck {
    data: {
        status: boolean;
        message: string;
        resource: GetRiwayatcheckItem;
    };
}
interface Links {
    url: string | null;
    label: string;
    active: boolean;
}
interface GetRiwayatcheck {
    data: {
        status: true;
        message: 'list riwayat';
        resource: {
            current_page: number;
            data: GetRiwayatcheckItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface NewProductItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_price_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: null | string;
    created_at: string;
    updated_at: string;
}
interface GetAllNewProduct {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: NewProductItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DeleteNewProductResponse {
    data: {
        status: boolean;
        message: string;
        resource: NewProductItem;
    };
}

interface DetailNewProduct {
    data: {
        status: boolean;
        message: string;
        resource: NewProductItem;
    };
}
interface ProductExpiredItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: null | string;
    new_name_product: null | string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: null | string;
    new_tag_product: null | string;
    created_at: string;
    updated_at: string;
}
interface ProductExpired {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ProductExpiredItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DetailExpiredProduct {
    data: {
        status: boolean;
        message: string;
        resource: ProductExpiredItem;
    };
}
interface BundleSubItem {
    id: number;
    bundle_id: string;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: null | string;
    new_tag_product: null | string;
    created_at: null | string;
    updated_at: null | string;
}
interface BundleItem {
    id: number;
    name_bundle: string;
    total_price_bundle: string;
    total_price_custom_bundle: string;
    total_product_bundle: string;
    barcode_bundle: string;
    created_at: string;
    updated_at: string;
    product_bundles: BundleSubItem[];
}
interface BundleResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: BundleItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DetailBundleResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            name_bundle: string;
            total_price_bundle: string;
            total_price_custom_bundle: string;
            total_product_bundle: string;
            barcode_bundle: string;
            created_at: string;
            updated_at: string;
        };
    };
}
interface DeleteBundleResponse {
    data: {
        status: boolean;
        message: string;
        resource: null;
    };
}
interface FilterProduct {
    status: boolean;
    message: string;
    resource: ProductExpiredItem;
}
interface GetFilterProductBundles {
    data: {
        status: boolean;
        message: string;
        resource: {
            total_new_price: string;
            data: {
                current_page: number;
                data: ProductExpiredItem[];
                first_page_url: string;
                from: number;
                last_page: number;
                last_page_url: string;
                links: Links[];
                next_page_url: null | string;
                path: string;
                per_page: number;
                prev_page_url: null | string;
                to: number;
                total: number;
            };
        };
    };
}
interface CreateBundle {
    data: {
        status: boolean;
        message: string;
        resource: {
            name_bundle: string;
            total_price_bundle: string;
            total_price_custom_bundle: string;
            total_product_bundle: string;
            barcode_bundle: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface CreateBundleBody {
    name_bundle: string;
    total_price_bundle: number;
    total_price_custom_bundle: number;
    total_product_bundle: number | undefined;
    barcode_bundle: string;
}
interface PromoListItem {
    id: number;
    new_product_id: string;
    name_promo: string;
    discount_promo: string;
    price_promo: string;
    created_at: string;
    updated_at: string;
    new_product: {
        id: number;
        code_document: string;
        old_barcode_product: string;
        new_barcode_product: null | string;
        new_name_product: null | string;
        new_quantity_product: string;
        new_price_product: string;
        new_date_in_product: string;
        new_status_product: string;
        new_quality: string;
        new_category_product: null | string;
        new_tag_product: null | string;
        created_at: string;
        updated_at: string;
    };
}
interface PromoLists {
    data: {
        status: true;
        message: 'list promo';
        resource: {
            current_page: 1;
            data: PromoListItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DetailPromo {
    data: {
        status: boolean;
        message: string;
        resource: PromoListItem;
    };
}
interface EditPromoBody {
    name_promo: string;
    discount_promo: string;
    price_promo: string;
}
interface EditPromoResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            new_product_id: string;
            name_promo: string;
            discount_promo: string;
            price_promo: string;
            created_at: string;
            updated_at: string;
        };
    };
}
interface PaletListItemArray {
    id: number;
    palet_id: string;
    code_document: string;
    old_barcode_product: null | string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: null | string;
    new_category_product: string;
    new_tag_product: null | string;
    created_at: null | string;
    updated_at: null | string;
}
interface PaletListItem {
    id: number;
    name_palet: string;
    category_palet: string;
    total_price_palet: string;
    total_product_palet: string;
    palet_barcode: string;
    created_at: string;
    updated_at: string;
    palet_products: PaletListItemArray[];
}
interface PaletLists {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: PaletListItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DeletePaletList {
    data: {
        status: boolean;
        message: string;
        resource: null;
    };
}
interface DisplayPallet {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ProdcutItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface filterPalletLists {
    data: {
        status: boolean;
        message: string;
        resource: {
            total_new_price: string;
            data: {
                current_page: number;
                data: ProdcutItem[];
                first_page_url: string;
                from: number;
                last_page: number;
                last_page_url: string;
                links: Links[];
                next_page_url: null | string;
                path: string;
                per_page: number;
                prev_page_url: null | string;
                to: number;
                total: number;
            };
        };
    };
}
interface FilterDisplayPallet {
    data: {
        status: boolean;
        message: string;
        resource: ProdcutItem;
    };
}
interface CreatePaletBody {
    name_palet: string;
    category_palet: string;
    total_price_palet: string;
    total_product_palet: number | undefined;
    palet_barcode: string;
}
interface CreatePaletResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            name_palet: string;
            category_palet: string;
            total_price_palet: string;
            total_product_palet: string;
            palet_barcode: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}

interface GetListProductRepairItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    old_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: string;
    created_at: string;
    updated_at: string;
}

interface GetListProductRepair {
    data: {
        status: boolean;
        message: string;
        resource: {
            data: GetListProductRepairItem[];
        };
    };
}

interface GetListDumpItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    old_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: string;
    created_at: string;
    updated_at: string;
}

interface GetListDump {
    data: {
        status: boolean;
        message: string;
        resource: {
            data: GetListDumpItem[];
        };
    };
}
interface CreatePromo {
    data: {
        status: boolean;
        message: string;
        resource: {
            new_product_id: string;
            name_promo: string;
            discount_promo: string;
            price_promo: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface CreatePromoBody {
    new_product_id: number | string | undefined;
    name_promo: string | string;
    discount_promo: number | string;
    price_promo: number | string;
}

interface GetListRoleItem {
    id: number;
    role_name: string;
    created_at: string;
    updated_at: string;
}

interface GetListRole {
    data: {
        status: boolean;
        message: string;
        resource: GetListRoleItem;
    };
}

interface GetListAkunItem {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at: string;
    password: string;
    role_id: string;
    created_at: string;
    updated_at: string;
}

interface GetListAkun {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListAkunItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface GetListSaleItem 
{
    id: number;
    code_document_sale?: string;
    product_name_sale?: string;
    product_price_sale?: string;
    product_qty_sale?: string;
    created_at: string;
    updated_at: string;
}

interface GetTotalSaleItem 
{
    total_sale: string;
}

interface GetListSale {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data:(GetListSaleItem | GetTotalSaleItem)[];            
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface GetListMigrateItem {
    id: number;
    code_document_migrate: string;
    destiny_document_migrate: string;
    total_product_document_migrate: string;
    total_price_document_migrate: string;
    created_at: string;
    updated_at: string;
}

interface GetListMigrate {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListMigrateItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface GetListSaleDocumentItem {
    id: number;
    code_document_sale: string;
    buyer_name_document_sale: string;
    total_product_document_sale: string;
    total_price_document_sale: number;
    status_document_sale: string;
    created_at: string;
    updated_at: string;
}

interface GetListSaleDocument {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListSaleDocumentItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

export type {
    UserDataItem,
    GenerateInboundDataProcessResponse,
    ProductOlds,
    MergeHeader,
    MergeHeaderBody,
    Barcode,
    CheckProductDocument,
    CheckProductDocumentItem,
    ProductOldsItem,
    GetBarcodeBody,
    GetBarcodeResponse,
    DetailProductOld,
    GetCategories,
    NewProduct,
    NewProductBody,
    ColorTag,
    ColorTagItem,
    GetCategoriesItem,
    CheckAllProducts,
    GetRiwayatcheck,
    GetRiwayatcheckItem,
    DetailGetRiwayatcheck,
    GetAllNewProduct,
    NewProductItem,
    DetailNewProduct,
    DeleteNewProductResponse,
    ProductExpired,
    DetailExpiredProduct,
    ProductExpiredItem,
    BundleItem,
    BundleResponse,
    DetailBundleResponse,
    DeleteBundleResponse,
    FilterProduct,
    GetFilterProductBundles,
    CreateBundle,
    CreateBundleBody,
    PromoLists,
    PromoListItem,
    DetailPromo,
    EditPromoBody,
    EditPromoResponse,
    FilterDisplayPallet,
    filterPalletLists,
    DisplayPallet,
    DeletePaletList,
    PaletLists,
    PaletListItem,
    ProdcutItem,
    CreatePaletResponse,
    CreatePaletBody,
    GetListProductRepair,
    GetListProductRepairItem,
    GetListDump,
    GetListDumpItem,
    CreatePromo,
    CreatePromoBody,
    GetListRole,
    GetListRoleItem,
    GetListAkun,
    GetListAkunItem,
    GetListSale,
    GetListSaleItem,
    GetListMigrate,
    GetListMigrateItem,
    GetListSaleDocument,
    GetListSaleDocumentItem,
    ItemDetailOldsProduct,
};