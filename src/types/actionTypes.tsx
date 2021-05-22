import { Action } from 'redux';
import { CategoryType } from './models/Category';
import { CarouselType } from './models/Carousel';
import { PharmacyType } from './models/Pharmacy';
import { ProductType } from './models/Product';
import { CustomerUserType } from './models/CustomerUser';
import { ChatType } from './models/Chat';
import { OrderType } from './models/Order';
import { PharmacyCommentType } from './models/PharmacyComment';

// action
export enum ActionTypes {
    GET_ALL_CATEGORY,
    GET_ALL_CAROUSEL,
    GET_ALL_PHARMACY,
    GET_ALL_PRODUCT,
    LOGIN,
    LOGOUT,
    GET_ALL_SHOPPING_CART,
    UPDATE_SHOPPING_CART,
    GET_ROOM,
    GET_ALL_FRIEND_LIST,
    GET_ALL_ORDER,
    UPDATE_PERSONAL_INFORMATION,
    CREATE_PHARMACY_COMMENT,
    GET_ALL_PHARMACY_COMMENT,
    TOGGLE_BOOKMARK
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

export interface AuthenticationInterface extends Action{
    type: typeof ActionTypes.LOGIN | typeof ActionTypes.LOGOUT | typeof ActionTypes.UPDATE_SHOPPING_CART | typeof ActionTypes.UPDATE_PERSONAL_INFORMATION | typeof ActionTypes.TOGGLE_BOOKMARK;
    payload: {
        Token: string,
        CustomerUser: CustomerUserType,
    };
}
export type AuthenticationInterfaceDispatchTypes = AuthenticationInterface;

export interface GetShoppingCartInterface extends Action{
    type: typeof ActionTypes.GET_ALL_SHOPPING_CART;
    payload: PharmacyType[]
}
export type GetShoppingCartInterfaceDispatchTypes = GetShoppingCartInterface;

export interface GetRoomInterface extends Action{
    type: typeof ActionTypes.GET_ROOM | typeof ActionTypes.GET_ALL_FRIEND_LIST;
    payload: ChatType[]
}
export type GetRoomInterfaceDispatchTypes = GetRoomInterface;

export interface GetOrderInterface extends Action{
    type: typeof ActionTypes.GET_ALL_ORDER;
    payload: OrderType[]
}
export type GetOrderInterfaceDispatchTypes = GetOrderInterface;

export interface GetPharmacyCommentInterface extends Action{
    type: typeof ActionTypes.CREATE_PHARMACY_COMMENT | typeof ActionTypes.GET_ALL_PHARMACY_COMMENT;
    payload: PharmacyCommentType[]
}
export type GetPharmacyCommentInterfaceDispatchTypes = GetPharmacyCommentInterface;
