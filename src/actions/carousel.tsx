
import { Dispatch } from 'redux';
import { GetCarouselInterface, GetCarouselInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getCarouselService } from '../services/carousel';
import { Alert } from 'react-native';

const getCarousel = () => {
    return async (dispatch: Dispatch<GetCarouselInterfaceDispatchTypes>) => {
      const resp = await getCarouselService().catch((error: Error) => {
          Alert.alert("System Error")
      });

      dispatch<GetCarouselInterface>({
        type: ActionTypes.GET_ALL_CAROUSEL,
        payload: resp
      });
    };
  };
  
  export { getCarousel };