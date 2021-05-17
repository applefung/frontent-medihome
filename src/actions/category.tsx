
import { Dispatch } from 'redux';
import { GetCategoryInterface, GetCategoryInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getCategoryService } from '../services/category';
import { Alert } from 'react-native';

const getCategory = () => {
    return async (dispatch: Dispatch<GetCategoryInterfaceDispatchTypes>) => {
      const resp = await getCategoryService().catch((error: Error) => {
          Alert.alert("System Error")
      });

      dispatch<GetCategoryInterface>({
        type: ActionTypes.GET_ALL_CATEGORY,
        payload: resp
      });
    };
  };
  
  export { getCategory };