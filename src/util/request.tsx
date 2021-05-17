import Axios from 'axios';
import { apiUrl } from '../common/constants';
const TIMEOUT = 25000;

const instance = Axios.create({
    baseURL: apiUrl,
    timeout: TIMEOUT
});

type Request = {
    url: string,
    method: string,
    data?: any,
}

type GetRequest = {
    url: string
}

type PostRequest = {
  url: string,
  data?: unknown;
}

type PutRequest = {
  url: string,
  data?: unknown;
}

const getRequest = async ({ url }: GetRequest) => {
    const resp = await instance.get(url).catch((error: Error) => {
        throw error;
    })
    return resp.data.msg_remark;

};

const request = async ({ url, method, data }: Request) => {
  switch (method) {
    case 'get':
        const resp = await getRequest({ url }).catch((error: Error) => {
            throw error;
        })
        return resp;
    case 'post':
      break;
    case 'delete':
      break;
    case 'put':
      break;
    default:
      break;
  }
};

export { request };