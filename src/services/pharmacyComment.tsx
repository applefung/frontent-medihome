import { request } from '../util/request';

const getPharmacyCommentService  = async (pharmacyId: number) => {
    const resp = await request({
        url: '/getpharmacycomment?pharmacyId='+pharmacyId,
        method: 'get',
        data: null
    }).catch((error: Error) => {   
        throw error;
    });
    return resp;
};

type PostPharmacyCommentServiceType = {
    customerUserId: number;
    pharmacyId: number;
    content: string;
    rating: number
};

const postPharmacyCommentService  = async (data: PostPharmacyCommentServiceType, token: string) => {
    const resp = await request({
        url: '/token/postpharmacycomment',
        method: 'post',
        data: data,
        token: token
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

export { getPharmacyCommentService, postPharmacyCommentService };