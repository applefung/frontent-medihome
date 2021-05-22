
import { Dispatch } from 'redux';
import { GetPharmacyInterface, GetPharmacyInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getPharmacyService } from '../services/pharmacy';
import { Alert } from 'react-native';
import i18n from '../i18n';

const getPharmacy = (queryString: string) => {
    return async (dispatch: Dispatch<GetPharmacyInterfaceDispatchTypes>) => {
      const resp = await getPharmacyService(queryString).catch((error: Error) => {
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

      dispatch<GetPharmacyInterface>({
        type: ActionTypes.GET_ALL_PHARMACY,
        payload: resp
      });
    };
  };
  
  export { getPharmacy };