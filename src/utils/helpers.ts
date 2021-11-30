import { TRows } from '../components/App';
import { IData, IProduct } from './dataService';

type TFormValidationInitializer = {
    onSubmit: () => void;
    initialValues: IProduct;
};

export const getHeadingsFromJson = (): string[] => {
    return ['_id', 'product_name', 'weight', 'availability', 'isEditable'];
};

export const getRowsFromJson = (
    jsonData: IData[],
    useKeys = getHeadingsFromJson()
): TRows[][] => {
    const rows = jsonData.reduce((acc, item) => {
        const values: TRows[] = useKeys.map((key) => item[key as keyof IData]);
        return acc.concat([values]);
    }, [] as TRows[][]);
    return rows;
};

export const getFormValidation = ({
    onSubmit,
    initialValues,
}: TFormValidationInitializer) => {
    return {
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
        onSubmit: onSubmit,
        initialValues: initialValues,
    };
};
