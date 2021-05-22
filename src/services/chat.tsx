import { request } from '../util/request';

const getRoomService = async (customerUserId: number, pharmacyId: number, token: string) => {
    const resp = await request({
        url: '/token/getRoom?customerUserId= ' + customerUserId + "&pharmacyId=" + pharmacyId,
        method: 'get',
        data: null,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

const getFriendListService = async (customerUserId: number, token: string) => {
    const resp = await request({
        url: '/token/getfriendlist?customerUserId= ' + customerUserId,
        method: 'get',
        data: null,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { getRoomService, getFriendListService };