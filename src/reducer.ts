import { AnyAction } from 'redux';
import USER from './constants';

const initialState = {
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
                jsonData: action.jsonData,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default reducer;
