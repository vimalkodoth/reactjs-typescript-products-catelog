import { AnyAction } from 'redux';
import USER from './constants';
import { IData } from '../utils/dataService';

export type TReduxState = {
    jsonData: IData[];
    isLoading: boolean;
    isError: boolean;
};
const initialState: TReduxState = {
    jsonData: [],
    isLoading: false,
    isError: false,
};

const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case USER.LOAD:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case USER.LOAD_SUCCESS:
            return {
                ...state,
                jsonData: action.payload,
                isLoading: false,
            };
        case USER.UPDATE:
            const { _id } = action.payload;
            const currentIndex = state.jsonData.findIndex(
                (item) => item._id === _id
            );
            return {
                ...state,
                jsonData: [
                    ...state.jsonData.slice(0, currentIndex),
                    action.payload,
                    ...state.jsonData.slice(currentIndex + 1),
                ],
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;
