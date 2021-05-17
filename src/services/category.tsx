import { request } from '../util/request';

const getCategoryService  = async () => {
    const resp = await request({
        url: '/category',
        method: 'get',
        data: null
    }).catch((error: Error) => {
        throw error;
    })
    return resp;
};

export { getCategoryService };