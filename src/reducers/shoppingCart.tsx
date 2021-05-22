import { PharmacyType } from '../types/models/Pharmacy';
import { GetShoppingCartInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    Pharmacy: PharmacyType[]
}

const initalState:initalStateType = {
    Pharmacy: []
};

export default (state:initalStateType = initalState , action: GetShoppingCartInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_SHOPPING_CART:
      return {
        ...state,
        Pharmacy: action.payload
      };
    default:
      break;
  }

  return state;
};