import { CarouselType } from '../types/models/Carousel';
import { GetCarouselInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';

type initalStateType = {
    Carousel: CarouselType[]
}

const initalState:initalStateType = {
  Carousel: []
};

export default (state:initalStateType = initalState , action: GetCarouselInterfaceDispatchTypes) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_CAROUSEL:
      return {
        ...state,
        Carousel: action.payload
      };
    default:
      break;
  }

  return state;
};