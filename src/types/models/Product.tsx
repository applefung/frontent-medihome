export type ProductType = {
    product_id: string;
    category_id: number;
    title_en: string;
    title_cn: string;
    description_en: string;
    description_cn: string;
    price: string;
    image: string;
    tag: string;
    isSelected?: boolean;
    shoppingCartAmount?: number;
    amount?: number;
 };
