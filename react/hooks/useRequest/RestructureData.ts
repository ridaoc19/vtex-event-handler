import { fetchProduct } from '../../services/api';
import { ToolBox } from '../../utils/Toolbox';
import { ItemsProduct } from '../useEventMsgGTM/helper/type';

export class Data {
	private readonly toolBox = ToolBox;
	constructor() {
		this.toolBox = ToolBox;
	}

	public async getOrderForm(): Promise<OrderFormType.OrderForm | null> {
		return localStorage?.orderform ? JSON.parse(localStorage?.orderform) : null;
	}

	private isSelectedComparator({ productId }: { productId: string }): boolean {
		const productIdsSelectedComparator = localStorage?.getItem('comparatorProductIdsSelected')
			? JSON.parse(localStorage?.comparatorProductIdsSelected)
			: [];

		const productSelected = productIdsSelectedComparator?.map(
			(itemComparator: { idAdded: string }) => itemComparator?.idAdded
		);

		return productSelected?.includes(productId);
	}

	public async getItem({
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
			comparador: this.isSelectedComparator({ productId }),
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
			disponibilidad_de_envio: false,
			disponibilidad_en_tienda: false,
			semanalidad: 0,
			vendor: sellerName,
			modelo: Modelo && Array.isArray(Modelo) ? Modelo[0] : '',
		};
	}

	public async getData({ id, typeGet }: { typeGet: 'skuId' | 'productId'; id: string }): Promise<void> {
		const dataProduct = await fetchProduct(typeGet, id);

		console.log(dataProduct);
	}
}
