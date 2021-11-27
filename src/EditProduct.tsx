import { useParams } from 'react-router-dom';
import Form from './Form';
import { useAppSelector } from './hooks';

const EditProduct = (): JSX.Element => {
    const params = useParams();
    const { jsonData = [] } = useAppSelector((state) => state);

    const formInputData = jsonData.find((item) =>
        params.productId ? item._id === parseInt(params.productId) : false
    );

    return <Form data={formInputData} />;
};

export default EditProduct;
