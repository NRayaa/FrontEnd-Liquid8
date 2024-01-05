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
            per_page: number;
            current_page: number;
            data: CheckProductDocumentItem[];
        };
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
};
