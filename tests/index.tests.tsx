import { render, shallow, mount } from 'enzyme';
import App from '../src/components/App';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';
import productData from '../productData.json';
import * as api from '../src/utils/dataService';
import { IData } from '../src/utils/dataService';

describe('App', () => {
    it('should render correctly', () => {
        const wrapper = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();
    });
    it('should render App component', () => {
        const wrapper = shallow(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(wrapper.find(App)).toHaveLength(1);
    });
    it("should render 'Loading data' text", async () => {
        jest.spyOn(api, 'fetchJsonData').mockResolvedValue(
            productData as IData[]
        );
        const wrapper = mount(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(wrapper.text()).toBe('Loading data...');
    });
});
