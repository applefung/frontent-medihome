import { request } from '../util/request';

const getProductService  = async (queryString: string) => {
    const resp = await request({
        url: '/product?'+queryString,
        method: 'get',
        data: null
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { getProductService };