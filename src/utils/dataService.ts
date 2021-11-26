type TJsonData = {
    _id: number;
    product_name: string;
    weight: string;
    availability: number;
    url: string;
    price_tier: string;
    price_range: string;
    unit_cost: string;
    isEditable: boolean;
};

export async function fetchJsonData(file: any): Promise<TJsonData> {
    let response, data: TJsonData;
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
