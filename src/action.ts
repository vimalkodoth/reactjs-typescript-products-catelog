import JSONDATA from './constants';
import type { TAppThunk } from './store';
import { fetchJsonData } from './utils/dataService';

export const requestJSON = (): TAppThunk<void> => async (dispatch) => {
    dispatch({
        type: JSONDATA.LOAD,
    });
    try {
        const json = await fetchJsonData('../productData.json');
        console.log(json);
        dispatch({
            type: JSONDATA.LOAD_SUCCESS,
            userData: json,
            isError: false,
        });
    } catch (e) {
        dispatch({
            type: JSONDATA.LOAD_SUCCESS,
            userData: [],
            isError: true,
        });
    }
};
