import { render } from 'enzyme';
import App from '../src/components/App';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';

describe('App', () => {
    it('should render', () => {
        const wrapper = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
});
