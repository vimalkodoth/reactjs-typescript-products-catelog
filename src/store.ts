import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createStore, applyMiddleware, AnyAction } from 'redux';
import reducer from './reducer';

export const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = ThunkDispatch<TRootState, void, AnyAction>;
export type TAppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    TRootState,
    unknown,
    AnyAction
>;
