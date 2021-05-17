import { request } from '../util/request';

const getCarouselService  = async () => {
    const resp = await request({
        url: '/carousel',
        method: 'get',
        data: null
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { getCarouselService };