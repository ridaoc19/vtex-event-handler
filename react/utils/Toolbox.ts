import { PROMOTION_VIEW_IDS } from './const';

export class ToolBox {
	/**
	 * Normaliza una cadena de texto eliminando acentos, convirtiendo a minúsculas y eliminando espacios adicionales.
	 * @param input - La cadena de texto a normalizar. Puede ser undefined o null.
	 * @returns La cadena normalizada, o una cadena vacía si el input es null o undefined.
	 */
	public static cleanStr(input: string | undefined | null): string {
		if (!input) return '';

		return input
			.toString()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.trim();
	}

	/**
	 * Almacena IDs de promociones vistas en el almacenamiento de sesión, evitando duplicados.
	 * @param ids - Un objeto que contiene un array de IDs de promociones a almacenar.
	 * @returns true si se han añadido nuevos IDs, false si todos los IDs ya existían.
	 */
	public static storagePromoId({ ids }: { ids: string[] }): boolean {
		const sessionStorages = sessionStorage.getItem(PROMOTION_VIEW_IDS);
		const dataSend: string[] = sessionStorages ? JSON.parse(sessionStorages) : [];

		const allIdsExist = ids.every(id => dataSend.includes(id));

		if (allIdsExist) {
			return false;
		}

		const updatedData = [...new Set([...dataSend, ...ids])];

		sessionStorage.setItem(PROMOTION_VIEW_IDS, JSON.stringify(updatedData));

		return true;
	}

	/**
	 * Pausa la ejecución por un tiempo especificado en milisegundos.
	 * @param timeout - El tiempo de espera en milisegundos antes de resolver la promesa.
	 * @returns Una promesa que se resuelve después del tiempo especificado.
	 */
	public static delayExecution(timeout: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, timeout));
	}

	/**
	 * Verifica si un producto está en la lista de cotización de crédito en el almacenamiento de sesión.
	 * @param productId - El ID del producto a verificar.
	 * @returns true si el producto está en la lista de cotización de crédito, false en caso contrario.
	 */
	public static isProductInCreditQuote({ productId }: { productId: string }): boolean {
		const creditQuoteProducts = JSON.parse(sessionStorage?.getItem('creditQuoterProducts') ?? '[]');

		if (!creditQuoteProducts || creditQuoteProducts?.length === 0) return false;

		return creditQuoteProducts.includes(productId);
	}

	/**
	 * Verifica si un producto está en la lista de productos seleccionados para comparación.
	 * @param productId - El ID del producto a verificar.
	 * @returns true si el producto está en la lista de comparación, false en caso contrario.
	 */
	public static isProductInComparisonList({ productId }: { productId: string }): boolean {
		const selectedProductIds = localStorage?.getItem('comparatorProductIdsSelected')
			? JSON.parse(localStorage.comparatorProductIdsSelected)
			: [];

		const selectedIds = selectedProductIds?.map((item: { idAdded: string }) => item?.idAdded);

		return selectedIds?.includes(productId);
	}

	/**
	 * Genera un ID único aleatorio.
	 * @returns Un ID único en formato de string.
	 */
	public static generateRandomUniqueId(): string {
		return `id-${Math.random().toString(36).slice(2, 11)}-${Date.now().toString(36)}`;
	}

	/**
	 * Obtiene el orderForm almacenado en localStorage.
	 * @returns El orderForm parseado desde localStorage, o null si no existe.
	 */
	public static async getOrderForm(): Promise<OrderFormType.OrderForm | null> {
		return localStorage?.orderform ? JSON.parse(localStorage?.orderform) : null;
	}

	/**
	 * Verifica si un producto está seleccionado en el comparador de productos.
	 * @param productId - El ID del producto a verificar.
	 * @returns true si el producto está seleccionado en el comparador, false en caso contrario.
	 */
	public static isSelectedComparator({ productId }: { productId: string }): boolean {
		const productIdsSelectedComparator = localStorage?.getItem('comparatorProductIdsSelected')
			? JSON.parse(localStorage?.comparatorProductIdsSelected)
			: [];

		const productSelected = productIdsSelectedComparator?.map(
			(itemComparator: { idAdded: string }) => itemComparator?.idAdded
		);

		return productSelected?.includes(productId);
	}

	/**
	 * Verifica si un productId está incluido en la lista seleccionados para la oferta flash.
	 * La lista se obtiene desde el almacenamiento de sesión.
	 * @param productId - El ID del producto que se desea verificar.
	 * @returns true si el productId está presente en la lista de la oferta flash, false en caso contrario.
	 * @description Este método consulta la clave `selectedProductFlashOffer` en el almacenamiento de sesión,
	 * parsea su contenido como un array de strings y realiza la validación. Si la clave no existe,
	 * asume que no hay productos seleccionados y retorna false.
	 */
	public static SelectedFlashOffer({ productId }: { productId: string }): boolean {
		const selectedFlashOffer = sessionStorage?.selectedProductFlashOffer
			? JSON.parse(sessionStorage?.selectedProductFlashOffer)
			: [];

		return selectedFlashOffer?.includes(productId);
	}
}
