import { ChatType } from '../types/models/Chat';
import { GetRoomInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    Chat: ChatType[]
}

const initalState:initalStateType = {
    Chat: []
};

export default (state:initalStateType = initalState , action: GetRoomInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.GET_ROOM:
      return {
        ...state,
        Chat: action.payload
      };
    case ActionTypes.GET_ALL_FRIEND_LIST:
      return {
        ...state,
        Chat: action.payload
      };
    default:
      break;
  }

  return state;
};