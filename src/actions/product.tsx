
import { Dispatch } from 'redux';
import { GetProductInterface, GetProductInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getProductService } from '../services/product';
import { Alert } from 'react-native';
import i18n from '../i18n';

const getProduct = (queryString: string) => {
    return async (dispatch: Dispatch<GetProductInterfaceDispatchTypes>) => {
      const resp = await getProductService(queryString).catch((error: Error) => {
        Alert.alert(
          i18n.t('error'),
          i18n.t('systemError'),
          [
            {
              text: i18n.t('ok'),
              style: "cancel",
            },
          ],
        );
      });

      dispatch<GetProductInterface>({
        type: ActionTypes.GET_ALL_PRODUCT,
        payload: resp
      });
    };
  };
  
  export { getProduct };