import { request } from '../util/request';

type AddToShoppingCartServiceType = {
    customerUserId: number;
    productId: string;
    type: number;
};

const addToShoppingCartService  = async (data: AddToShoppingCartServiceType, token: string) => {
    const resp = await request({
        url: '/token/addtoshoppingcart',
        method: 'put',
        data: data,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

const getShoppingCartService = async (customerUserId: number, token: string) => {
    const resp = await request({
        url: '/token/getshoppingcart?customerUserId= ' + customerUserId,
        method: 'get',
        data: null,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { addToShoppingCartService, getShoppingCartService };