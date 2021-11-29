/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/typed-hooks';
import { requestJSON } from '../redux/action';
import { AppCSS } from './App.styles';
import AppRoutes from './Routes';

export type TRows = string | number | boolean;

const App = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
        jsonData = [],
        isLoading,
        isError,
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestJSON());
    }, [dispatch]);

    if (isLoading) return <div>Loading data...</div>;
    if (isError) return <div>Some error occured...</div>;
    return (
        <div css={AppCSS}>
            <BrowserRouter>
                <AppRoutes jsonData={jsonData} />
            </BrowserRouter>
        </div>
    );
};

export default App;
