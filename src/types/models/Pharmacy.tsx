import { ProductType } from './Product';

export type PharmacyType = {
    pharmacy_id: number;
    product_ids: string;
    name_en: string;
    name_cn: string;
    address_en: string;
    address_cn: string;
    description_en: string;
    description_cn: string;
    business_time: string;
    contact: string;
    image: string;
    tag: string;
    products: ProductType[];
 };
