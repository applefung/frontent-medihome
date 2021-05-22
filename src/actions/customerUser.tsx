
import { Dispatch } from 'redux';
import { AuthenticationInterface, AuthenticationInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { editPersonalInformationService, toggleBookmarkService } from '../services/authentication';
import { Alert } from 'react-native';
import i18n from '../i18n';

type AditPersonalInformationType = {
  customerUserId: number;
  key: string;
  value: string
};

const editPersonalInformation = (data: AditPersonalInformationType, token: string): any => {
  return async (dispatch: Dispatch<AuthenticationInterfaceDispatchTypes>) => {
    const resp = await editPersonalInformationService(data, token).catch((error: Error) => {
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
      type: ActionTypes.UPDATE_PERSONAL_INFORMATION,
      payload: {
        Token: token,
        CustomerUser: resp
      }
    });
  };
};

type ToggleBookmarkType = {
  customerUserId: number,
  pharmacyId: number;
  type: number;
}

const toggleBookmark = (data: ToggleBookmarkType, token: string): any => {
  return async (dispatch: Dispatch<AuthenticationInterfaceDispatchTypes>) => {
    const resp = await toggleBookmarkService(data, token).catch((error: Error) => {
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
      type: ActionTypes.TOGGLE_BOOKMARK,
      payload: {
        Token: token,
        CustomerUser: resp
      }
    });
  };
};

  export { editPersonalInformation, toggleBookmark };