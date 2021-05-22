
import { Dispatch } from 'redux';
import { GetCarouselInterface, GetCarouselInterfaceDispatchTypes, ActionTypes } from '../types/actionTypes';
import { getCarouselService } from '../services/carousel';
import { Alert } from 'react-native';
import i18n from '../i18n';

const getCarousel = () => {
    return async (dispatch: Dispatch<GetCarouselInterfaceDispatchTypes>) => {
      const resp = await getCarouselService().catch((error: Error) => {
        Alert.alert(
          i18n.t('error'),
          i18n.t('systemError'),
          [
            {
              text: i18n.t('ok'),
              style: "cancel",
            },
          ],
        );
      });

      dispatch<GetCarouselInterface>({
        type: ActionTypes.GET_ALL_CAROUSEL,
        payload: resp
      });
    };
  };
  
  export { getCarousel };