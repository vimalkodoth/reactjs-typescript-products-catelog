/** @jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { updateStore } from '../redux/action';
import { useAppDispatch } from '../hooks/typed-hooks';
import { IData, IProduct } from '../utils/dataService';
import {
    elemCSS,
    fieldCSS,
    fieldErrorCSS,
    formCSS,
    labelCSS,
    submitButtonCSS,
} from './Form.styles';
import useForm from '../hooks/useForm';

type TFormProps = {
    formData: IData;
};

const Form = ({ formData }: TFormProps): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        data: product,
        isValid,
        handleChange,
        handleSubmit,
        errors,
    } = useForm<IProduct>({
        validations: {
            product_name: {
                required: {
                    value: true,
                    message: 'This field is required',
                },
            },
            weight: {
                required: {
                    value: true,
                    message: 'This field is required',
                },
            },
            availability: {
                required: {
                    value: false,
                    message: '',
                },
            },
            url: {
                required: {
                    value: true,
                    message: 'This field is required',
                },
            },
            price_tier: {
                required: {
                    value: true,
                    message: 'This field is required',
                },
            },
            price_range: {
                required: {
                    value: true,
                    message: 'This field is required',
                },
            },
            isEditable: {
                required: {
                    value: false,
                    message: '',
                },
            },
        },
        onSubmit: () => {
            dispatch(updateStore({ _id: formData._id, ...product }));
            navigate('/');
        },
        initialValues: formData as IProduct,
    });

    if (!product) return <div>No product found!</div>;
    return (
        <form onSubmit={handleSubmit} css={formCSS}>
            <div css={elemCSS}>
                <div css={fieldCSS}>
                    <label htmlFor="product_name" css={labelCSS}>
                        Name
                    </label>
                    <input
                        id="product_name"
                        type="text"
                        value={product['product_name']}
                        onChange={handleChange('product_name')}
                    />
                </div>
                <p css={fieldErrorCSS}>
                    {errors.product_name ? errors.product_name : ''}
                </p>
            </div>
            <div css={elemCSS}>
                <div css={fieldCSS}>
                    <label htmlFor="weight" css={labelCSS}>
                        Weight
                    </label>
                    <input
                        id="weight"
                        type="text"
                        onChange={handleChange('weight')}
                        value={product['weight']}
                    />
                </div>
                <p css={fieldErrorCSS}>{errors.weight ? errors.weight : ''}</p>
            </div>
            <div css={elemCSS}>
                <div css={fieldCSS}>
                    <label htmlFor="availability" css={labelCSS}>
                        Availability
                    </label>
                    <input
                        id="availability"
                        type="number"
                        onChange={handleChange('availability')}
                        value={product['availability']}
                    />
                </div>
                <p css={fieldErrorCSS}>
                    {errors.availability ? errors.availability : ''}
                </p>
            </div>
            <div css={elemCSS}>
                <div css={fieldCSS}>
                    <label htmlFor="url" css={labelCSS}>
                        Product Url
                    </label>
                    <input
                        id="url"
                        type="text"
                        onChange={handleChange('url')}
                        value={product['url']}
                    />
                </div>
                <p css={fieldErrorCSS}>{errors.url ? errors.url : ''}</p>
            </div>
            <div css={elemCSS}>
                <div css={fieldCSS}>
                    <label htmlFor="price_tier" css={labelCSS}>
                        Price Tier
                    </label>
                    <input
                        id="price_tier"
                        type="radio"
                        value="budget"
                        onChange={handleChange('price_tier')}
                        checked={
                            product['price_tier'] === 'budget' ? true : false
                        }
                    />{' '}
                    budget
                    <input
                        id="price_tier"
                        type="radio"
                        value="premium"
                        onChange={handleChange('price_tier')}
                        checked={
                            product['price_tier'] === 'premium' ? true : false
                        }
                    />{' '}
                    premium
                </div>
                <p css={fieldErrorCSS}>
                    {errors.price_tier ? errors.price_tier : ''}
                </p>
            </div>
            <div css={elemCSS}>
                <div css={fieldCSS}>
                    <label htmlFor="price_range" css={labelCSS}>
                        Price Range
                    </label>
                    {product['price_tier'] === 'budget' ? (
                        <select
                            id="price_range"
                            onChange={handleChange('price_range')}
                            value={product['price_range']}
                        >
                            <option value="$1-10">$1-10</option>
                            <option value="$11-20">$11-20</option>
                            <option value="$20-50">$20-50</option>
                        </select>
                    ) : (
                        <select
                            id="price_range"
                            onChange={handleChange('price_range')}
                            value={product['price_range']}
                        >
                            <option value="$50-99">$10-99</option>
                            <option value="$100-199">$100-199</option>
                            <option value="$200+">$200+</option>
                        </select>
                    )}
                </div>
                <p css={fieldErrorCSS}>
                    {errors.price_range ? errors.price_range : ''}
                </p>
            </div>
            <div css={elemCSS}>
                <div css={fieldCSS}>
                    <label htmlFor="isEditable" css={labelCSS}>
                        Is Editable
                    </label>
                    <input
                        id="isEditable"
                        type="checkbox"
                        onChange={handleChange('isEditable')}
                        checked={product['isEditable']}
                    ></input>
                </div>
                <p css={fieldErrorCSS}>
                    {errors.isEditable ? errors.isEditable : ''}
                </p>
            </div>
            <button type="submit" css={submitButtonCSS} disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default Form;
