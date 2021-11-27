/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateStore } from './action';
import { useAppDispatch } from './hooks';
import { TJsonData } from './utils/dataService';

type TFormProps = {
    data: TJsonData | undefined;
};

const formCSS = css`
    display: flex;
    flex-direction: column;
`;

const fieldCSS = css`
    display: flex;
    padding: 1em;
`;

const labelCSS = css`
    flex: 0 1 6em;
`;

const submitButtonCSS = css`
    align-self: center;
`;

const Form = ({ data }: TFormProps): JSX.Element => {
    const [values, setValues] = useState(data);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setValues((oldValues = {} as TJsonData) => ({
            ...oldValues,
            [e.target.id]:
                e.target.type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : e.target.value,
        }));
    };
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        dispatch(updateStore(values));
        navigate('/');
    };
    if (!values) return <div>No data found!</div>;
    return (
        <form onSubmit={handleSubmit} css={formCSS}>
            <div css={fieldCSS}>
                <label htmlFor="product_name" css={labelCSS}>
                    Name
                </label>
                <input
                    id="product_name"
                    type="text"
                    value={values['product_name']}
                    onChange={handleChange}
                />
            </div>
            <div css={fieldCSS}>
                <label htmlFor="weight" css={labelCSS}>
                    Weight
                </label>
                <input
                    id="weight"
                    type="text"
                    onChange={handleChange}
                    value={values['weight']}
                />
            </div>
            <div css={fieldCSS}>
                <label htmlFor="availability" css={labelCSS}>
                    Availability
                </label>
                <input
                    id="availability"
                    type="number"
                    onChange={handleChange}
                    value={values['availability']}
                />
            </div>
            <div css={fieldCSS}>
                <label htmlFor="url" css={labelCSS}>
                    Product Url
                </label>
                <input
                    id="url"
                    type="text"
                    onChange={handleChange}
                    value={values['url']}
                />
            </div>
            <div css={fieldCSS}>
                <label htmlFor="price_tier" css={labelCSS}>
                    Price Tier
                </label>
                <input
                    id="price_tier"
                    type="radio"
                    value="budget"
                    onChange={handleChange}
                    checked={values['price_tier'] === 'budget' ? true : false}
                />{' '}
                budget
                <input
                    id="price_tier"
                    type="radio"
                    value="premier"
                    onChange={handleChange}
                    checked={values['price_tier'] === 'premier' ? true : false}
                />{' '}
                premier
            </div>
            <div css={fieldCSS}>
                <label htmlFor="price_range" css={labelCSS}>
                    Price Range
                </label>
                {values['price_tier'] === 'budget' ? (
                    <select
                        id="price_range"
                        onChange={handleChange}
                        value={values['price_range']}
                    >
                        <option value="$1-10">$1-10</option>
                        <option value="$11-20">$11-20</option>
                        <option value="$20-50">$20-50</option>
                    </select>
                ) : (
                    <select
                        id="price_range"
                        onChange={handleChange}
                        value={values['price_range']}
                    >
                        <option value="$50-99">$10-99</option>
                        <option value="$100-199">$100-199</option>
                        <option value="$200+">$200+</option>
                    </select>
                )}
            </div>
            <div css={fieldCSS}>
                <label htmlFor="isEditable" css={labelCSS}>
                    Is Editable
                </label>
                <input
                    id="isEditable"
                    type="checkbox"
                    onChange={handleChange}
                    checked={values['isEditable']}
                ></input>
            </div>
            <button type="submit" css={submitButtonCSS}>
                Submit
            </button>
        </form>
    );
};

export default Form;
