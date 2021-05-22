import { OrderType } from '../types/models/Order';
import { GetOrderInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    Order: OrderType[]
}

const initalState:initalStateType = {
    Order: []
};

export default (state:initalStateType = initalState , action: GetOrderInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_ORDER:
      return {
        ...state,
        Order: action.payload
      };
    default:
      break;
  }

  return state;
};