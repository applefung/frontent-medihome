
import { Dispatch } from 'redux';
import { GetRoomInterface, GetRoomInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getRoomService, getFriendListService } from '../services/chat';
import { Alert } from 'react-native';
import i18n from '../i18n';

const getRoom = (customerUserId: number, pharmacyId: number, token: string):any => {
    return async (dispatch: Dispatch<GetRoomInterfaceDispatchTypes>) => {
      const resp = await getRoomService(customerUserId, pharmacyId, token).catch((error: Error) => {
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

      dispatch<GetRoomInterface>({
        type: ActionTypes.GET_ROOM,
        payload: resp
      });
    };
  };
  
const getFriendList = (customerUserId: number, token: string):any => {
  return async (dispatch: Dispatch<GetRoomInterfaceDispatchTypes>) => {
    const resp = await getFriendListService(customerUserId, token).catch((error: Error) => {
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

    dispatch<GetRoomInterface>({
      type: ActionTypes.GET_ALL_FRIEND_LIST,
      payload: resp
    });
  };
};

export { getRoom, getFriendList };