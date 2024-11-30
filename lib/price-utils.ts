export async function getRQPrice(): Promise<string> {
    try {
        const response = await fetch('/api/price');
        const data = await response.json();
        return `$${data.price.toFixed(2)}`;
    } catch (error) {
        console.error('Error fetching RQ price:', error);
        return '$9.95';
    }
}