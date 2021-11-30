import useForm from '../../src/hooks/useForm';
import { getFormValidation } from '../../src/utils/helpers';
import productData from '../../productData.json';
import { mount } from 'enzyme';
import { IProduct } from '../../src/utils/dataService';

function setup(...args) {
    const returnVal = {};
    function TestComponent() {
        const object = useForm<IProduct>(...args);
        Object.assign(returnVal, object);
        return null;
    }
    mount(<TestComponent />);
    return returnVal as any;
}

describe('useForm hook', () => {
    it('must validate as valid for the form data', () => {
        const { isValid } = setup(
            getFormValidation({
                onSubmit: jest.fn,
                initialValues: productData[0] as IProduct,
            })
        );
        expect(isValid).toBeTruthy();
    });
    it('must validate as invalid for the form data', () => {
        const testData = productData[0];
        testData['product_name'] = '';
        const { isValid } = setup(
            getFormValidation({
                onSubmit: jest.fn,
                initialValues: testData as IProduct,
            })
        );
        expect(isValid).toBeFalsy();
    });
});
