
import { request } from '../util/request';

const getSearchService  = async (queryString: string) => {
    const resp = await request({
        url: '/search?'+queryString,
        method: 'get',
        data: null
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { getSearchService };