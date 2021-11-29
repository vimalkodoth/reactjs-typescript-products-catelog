import { useParams } from 'react-router-dom';
import Form from './Form';
import { useAppSelector } from '../redux/hooks';

const EditProduct = (): JSX.Element => {
    const params = useParams();
    const { jsonData = [] } = useAppSelector((state) => state);
    const formInputData = jsonData.find((item) =>
        params.productId ? item._id === parseInt(params.productId) : false
    );

    if (!formInputData) return <div>Form data is not available!</div>;
    return <Form formData={formInputData} />;
};

export default EditProduct;
