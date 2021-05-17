import { request } from '../util/request';

const getPharmacyService  = async (queryString: string) => {
    const resp = await request({
        url: queryString==="all"?'/pharmacy':'/pharmacy?'+queryString,
        method: 'get',
        data: null
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { getPharmacyService };