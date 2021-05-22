import { PharmacyType } from './Pharmacy';

export type OrderType = {
    order_id: number;
    customer_user_id: number;
    pharmacy_ids: string;
    product_ids: any;
    address: string;
    contact: string;
    remark: string;
    delivery_date: string;
    order_date: string;
    sum_of_total: string;
    pharmacy: PharmacyType[];
 };

