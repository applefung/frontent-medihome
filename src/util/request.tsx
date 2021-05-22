import Axios from 'axios';
import { apiUrl } from '../common/constants';
const TIMEOUT = 1000000;

const instance = Axios.create({
    baseURL: apiUrl,
    timeout: TIMEOUT
});

type Request = {
    url: string,
    method: string,
    data?: any,
    token?: string,
}

type GetRequest = {
    url: string
    token?: string
}

type PostRequest = {
  url: string,
  data?: unknown;
  token?: string;
}

type PutRequest = {
  url: string,
  data?: unknown;
  token?: string;
}

const getRequest = async ({ url, token }: GetRequest) => {
    instance.defaults.headers.Authorization = "Bearer " + token;
    const resp = await instance.get(url).catch((error: Error) => {
        throw error;
    });
    return resp.data.msg_remark;
};

const postRequest = async ({ url, data, token }: PostRequest) => {
  instance.defaults.headers.Authorization = "Bearer " + token;
  const resp = await instance.post(url, data).catch((error: Error) => {
      throw error;
  });
  return resp.data.msg_remark;
};

const putRequest = async ({ url, data, token }: PutRequest) => {
  instance.defaults.headers.Authorization = "Bearer " + token;
  const resp = await instance.put(url, data).catch((error: Error) => {
      throw error;
  });
  return resp.data.msg_remark;
};

const request = async ({ url, method, data, token }: Request) => {
  switch (method) {
    case 'get':
        const getResp = await getRequest({ url, token }).catch((error: Error) => {
            throw error;
        });
        return getResp;
    case 'post':
        const postResp = await postRequest({ url, data, token }).catch((error: Error) => {
            throw error;
        });
        return postResp;
    case 'put':
      const putResp = await putRequest({ url, data, token }).catch((error: Error) => {
          throw putResp;
      });
      return putResp;
    case 'delete':
      break;
    default:
      break;
  }
};

export { request };