import { useEffect } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { requestJSON } from './action';
import './styles.css';
import Table from './Table';
import { TJsonData } from './utils/dataService';
import EditProduct from './EditProduct';
import NotFound from './NotFound';

export type TRows = string | number | boolean;

const getHeadingsFromJson = () => {
    //jsonData.length ? Object.keys(jsonData[0]) : [];
    return ['_id', 'product_name', 'weight', 'availability', 'isEditable'];
};

const getRowsFromJson = (
    jsonData: TJsonData[],
    useKeys = getHeadingsFromJson()
) => {
    const rows = jsonData.reduce((acc, item) => {
        const values: TRows[] = useKeys.map(
            (key) => item[key as keyof TJsonData]
        );
        return acc.concat([values]);
    }, [] as TRows[][]);
    return rows;
};

const AppCSS = css`
    max-width: 480px;
`;
const App = (): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jsonData = [], isLoading } = useAppSelector((state) => state);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestJSON());
    }, [dispatch]);
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
