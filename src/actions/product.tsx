
import { Dispatch } from 'redux';
import { GetProductInterface, GetProductInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getProductService } from '../services/product';
import { Alert } from 'react-native';


const getProduct = (queryString: string) => {
    return async (dispatch: Dispatch<GetProductInterfaceDispatchTypes>) => {
      const resp = await getProductService(queryString).catch((error: Error) => {
          Alert.alert("System Error")
      });

      dispatch<GetProductInterface>({
        type: ActionTypes.GET_ALL_PRODUCT,
        payload: resp
      });
    };
  };
  
  export { getProduct };