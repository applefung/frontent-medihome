import { PharmacyCommentType } from '../types/models/PharmacyComment';
import { GetPharmacyCommentInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    PharmacyComment: PharmacyCommentType[]
}

const initalState:initalStateType = {
    PharmacyComment: []
};

export default (state:initalStateType = initalState , action: GetPharmacyCommentInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.CREATE_PHARMACY_COMMENT:
      return {
        ...state,
        PharmacyComment: action.payload
      };
    case ActionTypes.GET_ALL_PHARMACY_COMMENT:
    return {
        ...state,
        PharmacyComment: action.payload
    };
    default:
      break;
  }

  return state;
};