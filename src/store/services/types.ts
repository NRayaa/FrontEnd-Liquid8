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

interface Pagination {
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
interface NewProduct {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            old_barcode_product: string;
            new_barcode_product: string;
            new_name_product: string;
            new_quantity_product: number;
            new_price_product: number;
            new_date_in_product: string;
            new_status_product: string;
            new_category_product: string;
            new_tag_product: string;
            new_quality: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
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
    DeleteNewProductResponse,
};
