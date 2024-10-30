const apiBaseUrl = '/api/catalog_system/pub/products/search';

export async function fetchProduct(
	typeGet: 'skuId' | 'productId',
	id: string
): Promise<FetchProductType.FetchProduct | null> {
	const queryParam = typeGet === 'skuId' ? 'skuId' : 'productId';

	try {
		const response = await fetch(`${apiBaseUrl}?fq=${queryParam}:${id}`);

		if (!response.ok) {
			console.error(`Error en la respuesta de la API: ${response.status}`);

			return null;
		}

		const data: FetchProductType.FetchProduct[] = await response.json();

		return data.length > 0 ? data[0] : null;
	} catch (error) {
		console.error(`Error al obtener datos del producto: ${error}`);

		return null;
	}
}
