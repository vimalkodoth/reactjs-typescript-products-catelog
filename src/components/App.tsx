/** @jsxImportSource @emotion/react */
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/typed-hooks';
import { requestJSON } from '../redux/action';
import Table from './Table';
import EditProduct from './EditProduct';
import NotFound from './NotFound';
import { AppCSS } from './App.styles';
import { getHeadingsFromJson, getRowsFromJson } from '../utils/helpers';

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

    if (isLoading) return <div>Loading data ...</div>;
    if (isError) return <div>Some error occured ...</div>;
    return (
        <div css={AppCSS}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Table
                                headings={getHeadingsFromJson()}
                                rows={getRowsFromJson(jsonData)}
                            />
                        }
                    ></Route>
                    <Route
                        path="/edit-product/:productId"
                        element={<EditProduct />}
                    ></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
