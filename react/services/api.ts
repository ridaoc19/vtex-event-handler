const apiBaseUrl = '/api/catalog_system/pub/products/search';

export interface FetchProductReturn {
	product: FetchProductType.FetchProduct;
	item: FetchProductType.Item;
	defaultSeller: FetchProductType.Seller;
	commertialOffer: FetchProductType.CommertialOffer;
}

export interface FetchProductParams {
	typeGet: 'skuId' | 'productId';
	id: string;
}

export type FetchProduct = (data: FetchProductParams) => Promise<FetchProductReturn | null>;

export const fetchProduct: FetchProduct = async ({ typeGet, id }) => {
	const queryParam = typeGet === 'skuId' ? 'skuId' : 'productId';

	try {
		const response = await fetch(`${apiBaseUrl}?fq=${queryParam}:${id}`);

		if (!response.ok) {
			console.error(`Error en la respuesta de la API: ${response.status}`);
			return null;
		}
		const jsonConvert: FetchProductType.FetchProduct[] = await response.json();
		const data: FetchProductType.FetchProduct = jsonConvert[0];

		const item =
			typeGet === 'skuId'
				? data.items.find(e => e?.itemId === id)
				: data.items.find(e =>
						e.sellers.some(seller => seller?.commertialOffer?.AvailableQuantity > 0)
				  ) ?? data.items[0];

		if (!item) {
			console.error(`Error en la respuesta a ITEM: ${response.status}`);
			return null;
		}

		const defaultSeller = item.sellers.find(({ sellerDefault }) => sellerDefault) ?? item.sellers[0];

		if (!defaultSeller) {
			console.error(`Error en la respuesta a defaultSeller: ${response.status}`);
			return null;
		}

		return {
			item,
			product: data,
			defaultSeller,
			commertialOffer: defaultSeller.commertialOffer,
		};
	} catch (error) {
		console.error(`Error al obtener datos del producto: ${error}`);
		return null;
	}
};
