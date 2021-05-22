
import { Dispatch } from 'redux';
import { GetShoppingCartInterface, GetShoppingCartInterfaceDispatchTypes, AuthenticationInterface, AuthenticationInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getShoppingCartService, addToShoppingCartService } from '../services/shoppingCart';
import { Alert } from 'react-native';
import i18n from '../i18n';

type AddToShoppingCartType = {
  customerUserId: number;
  productId: string;
  type: number;
};

const addToShoppingCart = (data: AddToShoppingCartType, token: string): any => {
  return async (dispatch: Dispatch<AuthenticationInterfaceDispatchTypes>) => {
    const resp = await addToShoppingCartService(data, token).catch((error: Error) => {
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

    dispatch<AuthenticationInterface>({
      type: ActionTypes.UPDATE_SHOPPING_CART,
      payload: {
        Token: token,
        CustomerUser: resp
      }
    });
  };
};

const getShoppingCart = (queryString: number, token: string):any => {
    return async (dispatch: Dispatch<GetShoppingCartInterfaceDispatchTypes>) => {
      const resp = await getShoppingCartService(queryString, token).catch((error: Error) => {
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

      dispatch<GetShoppingCartInterface>({
        type: ActionTypes.GET_ALL_SHOPPING_CART,
        payload: resp
      });
    };
  };
  
  export { getShoppingCart, addToShoppingCart };