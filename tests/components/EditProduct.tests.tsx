import { Provider } from 'react-redux';
import EditProduct from '../../src/components/EditProduct';
import { store } from '../../src/redux/store';
import { mount } from 'enzyme';

describe('EditProduct component', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <EditProduct />
            </Provider>
        );
        expect(wrapper.text()).toBe('Form data is not available!');
    });
});
