import { request } from '../util/request';

type LoginServiceType = {
    email: string;
    password: string;
};

const loginService  = async (data: LoginServiceType) => {
    const resp = await request({
        url: '/login',
        method: 'post',
        data: data
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

type SignUpSendVerificationCodeServiceType = {
    email: string;
};

const signUpSendVerificationCodeService = async (data: SignUpSendVerificationCodeServiceType) => {
    const resp = await request({
        url: '/signupverificationcode',
        method: 'post',
        data: data
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

type SignUpServiceType = {
    email: string;
    name: string;
    password: string;
    verificationCode: string;
};

const signUpService = async (data: SignUpServiceType) => {
    const resp = await request({
        url: '/signup',
        method: 'put',
        data: data
    }).catch((error: Error) => {
        throw error;
    });

    return resp;
};

type ForgotPasswordSendVerificationCodeServiceType = {
    email: string;
};

const forgotPasswordSendVerificationCodeService = async (data: ForgotPasswordSendVerificationCodeServiceType) => {
    const resp = await request({
        url: '/forgotpasswordverificationcode',
        method: 'post',
        data: data
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

type ForgotPasswordServiceType = {
    email: string;
    password: string;
    verificationCode: string;
};

const forgotPasswordService = async (data: ForgotPasswordServiceType) => {
    const resp = await request({
        url: '/forgotpassword',
        method: 'put',
        data: data
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

type EditPersonalInformationServiceType = {
    key: string;
    value: string;
    customerUserId: number;
};

const editPersonalInformationService  = async (data: EditPersonalInformationServiceType, token: string) => {
    const resp = await request({
        url: '/token/editpersonalinformation',
        method: 'post',
        data: data,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
};

type ToggleBookmarkServiceType = {
    customerUserId: number;
    pharmacyId: number;
    type: number;
}

const toggleBookmarkService = async(data: ToggleBookmarkServiceType, token: string) =>{
    const resp = await request({
        url: '/token/togglebookmark',
        method: 'post',
        data: data,
        token: token,
    }).catch((error: Error) => {
        throw error;
    });
    return resp;
}

export { loginService, signUpSendVerificationCodeService, signUpService, forgotPasswordSendVerificationCodeService, forgotPasswordService, editPersonalInformationService, toggleBookmarkService };