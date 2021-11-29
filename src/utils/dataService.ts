export interface IProduct {
    product_name: string;
    weight: string;
    availability: number;
    url: string;
    price_tier: string;
    price_range: string;
    unit_cost: string;
    isEditable: true;
}
export interface IData extends IProduct {
    _id: number;
}

export async function fetchJsonData(file: string): Promise<IData[]> {
    let response, data: IData[];
    try {
        // may error if no network connection, no valid json etc
        response = await fetch(file);
        data = await response.json();
    } catch (ex) {
        console.log(`[dataService Exception] ${JSON.stringify(ex)}`);
        throw ex;
    }
    if (!response.ok) {
        console.log(`[dataService Error] ${response.statusText}`);
        throw new Error(response.statusText);
    }
    return data;
}
