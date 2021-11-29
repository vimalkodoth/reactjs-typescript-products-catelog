import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface Validation {
    required?: {
        value: boolean;
        message: string;
    };
}

type ErrorRecord<T> = Partial<Record<keyof T, TBase>>;

type Validations<T> = Partial<Record<keyof T, Validation>>;

type TBase = string | boolean | number;

export const useForm = <T extends Record<keyof T, TBase>>(options?: {
    validations?: Validations<T>;
    initialValues: T;
    onSubmit?: () => void;
}) => {
    const [data, setData] = useState<T>((options?.initialValues || {}) as T);
    const [errors, setErrors] = useState<ErrorRecord<T>>({});
    const [isValid, setIsValid] = useState(true);
    const handleChange =
        (key: keyof T) =>
        (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
            const value =
                e.target.type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : e.target.value;
            setData({
                ...data,
                [key]: value,
            });
        };

    const validateForm = () => {
        const validations = options?.validations;
        const newErrors: ErrorRecord<T> = {};
        let valid = true;
        if (validations) {
            for (const key in validations) {
                const value = data[key];
                const validation = validations[key];
                if (validation?.required?.value && !value) {
                    valid = false;
                    newErrors[key] = validation?.required?.message;
                }
            }
        }
        return {
            isValid: valid,
            errors: Object.keys(newErrors).length ? newErrors : {},
        };
    };

    useEffect(() => {
        const { isValid, errors } = validateForm();
        setIsValid(isValid);
        setErrors(errors);
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (options?.onSubmit) {
            options.onSubmit();
        }
    };

    return {
        data,
        isValid,
        handleChange,
        handleSubmit,
        errors,
    };
};
