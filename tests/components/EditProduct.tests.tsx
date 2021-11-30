import { Provider } from 'react-redux';
import EditProduct from '../../src/components/EditProduct';
import { store } from '../../src/redux/store';
import { mount } from 'enzyme';
import * as ReactRouterDOM from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import productData from '../../productData.json';
import * as typedHooks from '../../src/hooks/typed-hooks';

const useSelectorMock = jest.spyOn(typedHooks, 'useAppSelector');
const useParamsMock = jest.spyOn(ReactRouterDOM, 'useParams');

beforeEach(() => {
    useSelectorMock.mockClear();
});
jest.mock('react-router-dom', () => ({
    __esModule: true,
    ...(jest.requireActual('react-router-dom') as object),
    useNavigate: () => ({
        navigate: jest.fn(),
    }),
    BrowserRouter: ({ children }) => children,
}));

describe('EditProduct component', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <EditProduct />
            </Provider>
        );
        expect(wrapper.text()).toBe('Form data is not available!');
    });
    it('should render correctly with memory router', async () => {
        useParamsMock.mockReturnValue({
            productId: '1',
        });
        useSelectorMock.mockReturnValue({
            jsonData: productData,
        });
        const wrapper = mount(
            <MemoryRouter initialEntries={['/edit-product/1']}>
                <Provider store={store}>
                    <EditProduct />
                </Provider>
            </MemoryRouter>
        );
        expect(wrapper.find('form')).toBeDefined();
    });
});
