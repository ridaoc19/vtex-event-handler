import { ItemsProduct } from '../events/gtm/useMessages/useMessageElektra/type';
import generateJSON from '../../__generated__/schema.json';
import { TotalMapEvents } from '../typings/message';
import { ToolBox } from '../utils/Toolbox';

const apiBaseUrl = '/api/catalog_system/pub/products/search';

export interface GetProduct {
	typeGet: 'skuId' | 'productId';
	dataItem: Array<{
		id: string;
		quantity: number;
		index: number;
	}>;
}

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

export class GetItem {
	private readonly toolBox = ToolBox;

	constructor() {
		this.toolBox = ToolBox;
	}

	private fetchProduct: FetchProduct = async ({ typeGet, id }) => {
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
							e.sellers.some(
								seller => seller?.commertialOffer?.AvailableQuantity > 0
							)
					  ) ?? data.items[0];

			if (!item) {
				console.error(`Error en la respuesta a ITEM: ${response.status}`);
				return null;
			}

			const defaultSeller =
				item.sellers.find(({ sellerDefault }) => sellerDefault) ?? item.sellers[0];

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

	/**
	 * Transforma los datos de un producto en el formato necesario.
	 */
	private async transformProductData({
		commertialOffer,
		sellerName,
		quantity,
		product,
		index,
		item,
	}: {
		product: Omit<FetchProductType.FetchProduct, 'items'>;
		item: Omit<FetchProductType.Item, 'sellers'>;
		commertialOffer: FetchProductType.CommertialOffer;
		sellerName: FetchProductType.Seller['sellerName'];
		index: number;
		quantity: number;
	}): Promise<ItemsProduct> {
		const { productId, brand, categories, Modelo } = product;
		const { itemId, nameComplete } = item;

		return {
			comparador: this.toolBox.isSelectedComparator({ productId }),
			cotizador_prestamo: this.toolBox.isProductInCreditQuote({ productId }),
			item_name: nameComplete,
			item_id: itemId,
			product_id: productId,
			price: Number(commertialOffer?.Price),
			price_without_discount: Number(commertialOffer?.ListPrice),
			item_brand: brand,
			item_category: categories[0]?.split('/').filter(Boolean)[0],
			item_category2: categories[0]?.split('/').filter(Boolean)[1],
			item_category3: categories[0]?.split('/').filter(Boolean)[2],
			item_variant: item?.name,
			quantity,
			index,
			currency: 'MXN',
			item_list_name: categories[0]?.split('/').filter(Boolean)[0],
			item_list_id: item?.itemId,
			discount: Number(commertialOffer?.ListPrice) - Number(commertialOffer?.Price),
			disponibilidad_de_inventario: commertialOffer?.IsAvailable,
			disponibilidad_de_envio: false, // ! pendiente
			disponibilidad_en_tienda: false, // ! pendiente
			semanalidad: 0, //! pendiente
			vendor: sellerName,
			modelo: Modelo && Array.isArray(Modelo) ? Modelo[0] : '',
			oferta_relampago: this.toolBox.SelectedFlashOffer({ productId }),
		};
	}

	/**
	 * Obtiene los datos de los productos y los transforma.
	 */
	public async getProductData<T extends keyof TotalMapEvents>({
		typeGet,
		dataItem,
		eventName,
	}: {
		typeGet: 'skuId' | 'productId';
		eventName: T;
		dataItem: Array<{
			id: string;
			quantity?: number;
			index?: number;
		}>;
	}): Promise<ItemsProduct[] | []> {
		const json = generateJSON.definitions.TotalMapEvents.properties[eventName];
		if (!('ecommerce' in json.properties)) return [];
		const requireEvent = json.properties.ecommerce.properties.items.items.required;

		const transformedData: Array<ItemsProduct | null> = await Promise.all(
			dataItem.map(async ({ id, index = 1, quantity = 1 }) => {
				try {
					const dataProduct = await this.fetchProduct({ typeGet, id });

					if (!dataProduct) {
						console.error(`No se encontró el producto con id: ${id}`);
						return null;
					}

					const { defaultSeller, item, product, commertialOffer } = dataProduct;

					const data = await this.transformProductData({
						commertialOffer,
						sellerName: defaultSeller.sellerName,
						quantity,
						product,
						index,
						item,
					});

					return requireEvent.reduce((acc, items) => {
						if (items in data) {
							return { ...acc, [items]: data[items as keyof ItemsProduct] };
						}
						return acc;
					}, {} as Partial<ItemsProduct>) as ItemsProduct;
				} catch (error) {
					console.error(`Error al obtener el producto con id: ${id}`, error);
					return null;
				}
			})
		);

		return transformedData.filter((item): item is ItemsProduct => item !== null);
	}
}
