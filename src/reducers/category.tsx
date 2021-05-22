import { CategoryType } from '../types/models/Category';
import { GetCategoryInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    Category: CategoryType[]
}

const initalState:initalStateType = {
  Category: []
};

export default (state:initalStateType = initalState , action: GetCategoryInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_CATEGORY:
      return {
        ...state,
        Category: action.payload
      };
    default:
      break;
  }

  return state;
};