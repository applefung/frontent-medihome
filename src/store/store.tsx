import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import categoryReducer from '../reducers/category';
import carouselReducer from '../reducers/carousel';
import PharmacyReducer from '../reducers/pharmacy';
import ProductReducer from '../reducers/product';

const rootReducer = combineReducers({
    Category: categoryReducer,
    Carousel: carouselReducer,
    Pharmacy: PharmacyReducer,
    Products: ProductReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;