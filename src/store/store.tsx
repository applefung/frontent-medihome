import { createStore, combineReducers, applyMiddleware, AnyAction } from 'redux';
import ReduxThunk from 'redux-thunk';
import categoryReducer from '../reducers/category';
import carouselReducer from '../reducers/carousel';
import PharmacyReducer from '../reducers/pharmacy';
import ProductReducer from '../reducers/product';
import AuthenticationReducer from '../reducers/authentication';
import ShoppingCartReducer from '../reducers/shoppingCart';
import ChatReducer from '../reducers/chat';
import OrderReducer from '../reducers/order';
import PharmacyCommentReducer from '../reducers/pharmacyComment';
import { useDispatch } from 'react-redux';
import { ThunkAction } from "redux-thunk";

const rootReducer = combineReducers({
    Category: categoryReducer,
    Carousel: carouselReducer,
    Pharmacy: PharmacyReducer,
    Products: ProductReducer,
    Authentication: AuthenticationReducer,
    ShoppingCart: ShoppingCartReducer,
    Chat: ChatReducer,
    Order: OrderReducer,
    PharmacyComment: PharmacyCommentReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export type AppThunk = ThunkAction<void, RootState, null, AnyAction>