import { Action } from 'redux';
import { CategoryType } from './models/Category';
import { CarouselType } from './models/Carousel';
import { PharmacyType } from './models/Pharmacy';
import { ProductType } from './models/Product';

// action
export enum ActionTypes {
    GET_ALL_CATEGORY,
    GET_ALL_CAROUSEL,
    GET_ALL_PHARMACY,
    GET_ALL_PRODUCT,
}

export interface GetCategoryInterface extends Action{
    type: typeof ActionTypes.GET_ALL_CATEGORY;
    payload: CategoryType[];
}
export type GetCategoryInterfaceDispatchTypes = GetCategoryInterface;


export interface GetCarouselInterface extends Action{
    type: typeof ActionTypes.GET_ALL_CAROUSEL;
    payload: CarouselType[];
}
export type GetCarouselInterfaceDispatchTypes = GetCarouselInterface;

export interface GetPharmacyInterface extends Action{
    type: typeof ActionTypes.GET_ALL_PHARMACY;
    payload: PharmacyType[];
}
export type GetPharmacyInterfaceDispatchTypes = GetPharmacyInterface;

export interface GetProductInterface extends Action{
    type: typeof ActionTypes.GET_ALL_PRODUCT;
    payload: ProductType[];
}
export type GetProductInterfaceDispatchTypes = GetProductInterface;