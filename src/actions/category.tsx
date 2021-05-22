
import { Dispatch } from 'redux';
import { GetCategoryInterface, GetCategoryInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getCategoryService } from '../services/category';
import { Alert } from 'react-native';
import i18n from '../i18n';

const getCategory = () => {
    return async (dispatch: Dispatch<GetCategoryInterfaceDispatchTypes>) => {
      const resp = await getCategoryService().catch((error: Error) => {
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

      dispatch<GetCategoryInterface>({
        type: ActionTypes.GET_ALL_CATEGORY,
        payload: resp
      });
    };
  };
  
  export { getCategory };