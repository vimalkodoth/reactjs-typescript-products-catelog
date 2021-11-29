import { TRows } from '../components/App';
import { IData } from './dataService';

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
