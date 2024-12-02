interface RQTestItem {
    id: string;
    price: number;
}

export async function getRQTestItem(): Promise<RQTestItem | null> {
    try {
        const response = await fetch('/api/items?filter=rq_test');
        const { data } = await response.json();

        // Since we're filtering for RQ Test, we should get an array with one item
        const rqTestItem = Array.isArray(data) && data[0];
        return rqTestItem || null;
    } catch (error) {
        console.error('Error fetching RQ test item:', error);
        return null;
    }
}