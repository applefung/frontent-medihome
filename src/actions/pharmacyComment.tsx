
import { Dispatch } from 'redux';
import { GetPharmacyCommentInterface, GetPharmacyCommentInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { postPharmacyCommentService, getPharmacyCommentService } from '../services/pharmacyComment';
import { Alert } from 'react-native';
import i18n from '../i18n';

type PostPharmacyCommentType = {
    customerUserId: number;
    pharmacyId: number;
    content: string;
    rating: number
};

const postPharmacyComment = (data: PostPharmacyCommentType, token: string):any => {
    return async (dispatch: Dispatch<GetPharmacyCommentInterfaceDispatchTypes>) => {
      const resp = await postPharmacyCommentService(data, token).catch((error: Error) => {
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

      dispatch<GetPharmacyCommentInterface>({
        type: ActionTypes.CREATE_PHARMACY_COMMENT,
        payload: resp
      });
    };
  };
  
  const getAllPharmacyComment = (queryString: number):any => {
    return async (dispatch: Dispatch<GetPharmacyCommentInterfaceDispatchTypes>) => {
      const resp = await getPharmacyCommentService(queryString).catch((error: Error) => {
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

      dispatch<GetPharmacyCommentInterface>({
        type: ActionTypes.GET_ALL_PHARMACY_COMMENT,
        payload: resp
      });
    };
  };

  export { postPharmacyComment, getAllPharmacyComment };