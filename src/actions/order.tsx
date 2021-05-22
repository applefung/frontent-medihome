
import { Dispatch } from 'redux';
import { GetOrderInterface, GetOrderInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getOrderService } from '../services/order';
import { Alert } from 'react-native';
import i18n from '../i18n';

const getOrder = (queryString: string, token: string):any => {
    return async (dispatch: Dispatch<GetOrderInterfaceDispatchTypes>) => {
      const resp = await getOrderService(queryString, token).catch((error: Error) => {
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

      dispatch<GetOrderInterface>({
        type: ActionTypes.GET_ALL_ORDER,
        payload: resp
      });
    };
  };
  
  export { getOrder };