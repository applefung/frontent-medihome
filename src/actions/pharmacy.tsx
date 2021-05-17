
import { Dispatch } from 'redux';
import { GetPharmacyInterface, GetPharmacyInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getPharmacyService } from '../services/pharmacy';
import { Alert } from 'react-native';

const getPharmacy = (queryString: string) => {
    return async (dispatch: Dispatch<GetPharmacyInterfaceDispatchTypes>) => {
      const resp = await getPharmacyService(queryString).catch((error: Error) => {
          Alert.alert("System Error")
      });

      dispatch<GetPharmacyInterface>({
        type: ActionTypes.GET_ALL_PHARMACY,
        payload: resp
      });
    };
  };
  
  export { getPharmacy };