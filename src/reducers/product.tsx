import { ProductType } from '../types/models/Product';
import { GetProductInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    Products: ProductType[]
}

const initalState:initalStateType = {
    Products: []
};

export default (state:initalStateType = initalState , action: GetProductInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_PRODUCT:
      return {
        ...state,
        Products: action.payload
      };
    default:
      break;
  }

  return state;
};