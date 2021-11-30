import { Route, Routes } from 'react-router-dom';
import { IData } from '../utils/dataService';
import { getHeadingsFromJson, getRowsFromJson } from '../utils/helpers';
import EditProduct from './EditProduct';
import NotFound from './NotFound';
import Table from './Table';

type TAppRoutes = {
    jsonData: IData[];
};

const AppRoutes = ({ jsonData }: TAppRoutes) => {
    return (
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
    );
};

export default AppRoutes;
