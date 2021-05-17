import { PharmacyType } from '../types/models/Pharmacy';
import { GetPharmacyInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    Pharmacy: PharmacyType[]
}

const initalState:initalStateType = {
    Pharmacy: []
};

export default (state:initalStateType = initalState , action: GetPharmacyInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_PHARMACY:
      return {
        ...state,
        Pharmacy: action.payload
      };
    default:
      break;
  }

  return state;
};