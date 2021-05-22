
import { Dispatch } from 'redux';
import { AuthenticationInterface, AuthenticationInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { loginService } from '../services/authentication';
import { Alert } from 'react-native';
import i18n from '../i18n';

type LoginType = {
    email: string;
    password: string;
};

const login = (data: LoginType): any => {
    return async (dispatch: Dispatch<AuthenticationInterfaceDispatchTypes>) => {
      const resp = await loginService(data).catch((error: Error) => {
          Alert.alert(
              i18n.t('error'),
              i18n.t('login.emailOrPasswordWrong'),
              [
                {
                  text: i18n.t('ok'),
                  style: "cancel",
                },
              ],
            );
          throw error;
      });

      dispatch<AuthenticationInterface>({
        type: ActionTypes.LOGIN,
        payload: resp
      });
    };
  };
  
const logout = () => {
    return (dispatch: Dispatch<AuthenticationInterfaceDispatchTypes>) => {
      dispatch<AuthenticationInterface>({
        type: ActionTypes.LOGOUT,
        payload: {
          Token: "",
          CustomerUser: {
            customer_user_id: 0,
            email: '',
            name: '',
            shopping_cart_items: '',
            bookmark: ''
          }
        }
      });
    };
  };

  export { login, logout };