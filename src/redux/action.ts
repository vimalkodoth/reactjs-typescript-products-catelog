import JSONDATA from './constants';
import type { TAppThunk } from './store';
import { fetchJsonData, IData } from '../utils/dataService';

export const requestJSON = (): TAppThunk<void> => async (dispatch) => {
    dispatch({
        type: JSONDATA.LOAD,
    });
    try {
        const json = await fetchJsonData('../productData.json');

        dispatch({
            type: JSONDATA.LOAD_SUCCESS,
            payload: json,
            isError: false,
        });
    } catch (e) {
        dispatch({
            type: JSONDATA.LOAD_SUCCESS,
            payload: [],
            isError: true,
        });
    }
};

type TFormData = IData | undefined;

export const updateStore = (formData: TFormData) => ({
    type: JSONDATA.UPDATE,
    payload: formData,
    isError: false,
});
