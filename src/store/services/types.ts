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

interface ProductOlds {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: {
                id: number;
                code_document: string;
                old_barcode_product: string;
                old_name_product: string;
                old_quantity_product: string;
                old_price_product: string;
                created_at: string;
                updated_at: string;
            }[];
        };
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

export type { UserDataItem, GenerateInboundDataProcessResponse, ProductOlds, MergeHeader, MergeHeaderBody };