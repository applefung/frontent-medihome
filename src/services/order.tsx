import { request } from '../util/request';

type CreateOrderServiceType = {
    customerUserId: number,
    pharmacyIds: string,
    productIds: string,
    address: string,
    contact: string,
    remark: string,
    deliveryDate: string,
    sumOfTotal: string,
};

const createOrderService  = async (data: CreateOrderServiceType, token: string) => {
    const resp = await request({
        url: '/token/createorder',
        method: 'post',
        data: data,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

const getOrderService  = async (queryString: string, token: string) => {
    const resp = await request({
        url: '/token/getcustomerorder?customerUserId='+queryString,
        method: 'get',
        data: null,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { createOrderService, getOrderService };