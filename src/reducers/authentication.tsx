import { AuthenticationInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { AnyAction } from 'redux';
import { CustomerUserType } from '../types/models/CustomerUser';

type initalStateType = {
    LoginUser: {
      Token: string,
      CustomerUser: CustomerUserType
    }
}

const initalState:initalStateType = {
    LoginUser: {
      Token: "",
      CustomerUser: {
        customer_user_id: 0,
        email: '',
        name: '',
        shopping_cart_items: '',
        bookmark: ''
      }
    }
};

export default (state:initalStateType = initalState , action: AuthenticationInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        LoginUser: action.payload
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        LoginUser: action.payload
      };
    case ActionTypes.UPDATE_SHOPPING_CART:
        return {
          ...state,
          LoginUser: action.payload
        };
    case ActionTypes.UPDATE_PERSONAL_INFORMATION:
        return {
          ...state,
          LoginUser: action.payload
        };
    case ActionTypes.TOGGLE_BOOKMARK:
      return {
        ...state,
        LoginUser: action.payload
      };
    default:
      break;
  }

  return state;
};