import { PROMOTION_VIEW_IDS } from '../global/const';

interface ClickParams {
	target: HTMLElement;
	container: string;
}

interface ComplexClickParams {
	target: HTMLElement;
	containerSelectors: {
		outerContainer: string;
		innerContent: string;
	};
	contentSelectors: {
		outerContainer: string;
		innerContent: string;
	};
}

export class ToolBox {
	/**
	 * Obtiene el contenido de texto del contenedor más cercano basado en el selector proporcionado.
	 */
	public static getClosestContainerText({ target, container }: ClickParams): string | null {
		if (!container) return null;
		const closestContainer = target.closest(container) as HTMLElement;
		if (!closestContainer) return null;
		console.log({ closestContainer, textContent: closestContainer.innerText }, 'tiene a');
		const textContent = target?.textContent;

		if (!closestContainer || !textContent) return null;

		return textContent;
	}

	/**
	 * Obtiene el texto del elemento clickeado dentro de un contenedor específico.
	 */
	public static getClickedElementText({ target, container }: ClickParams): string | null {
		if (!container) return null;
		const closestContainer = target.closest(container);
		const textContent = target?.textContent;
		console.log(closestContainer, textContent, 'tiene b');

		if (!closestContainer || !textContent) return null;

		return textContent;
	}

	/**
	 * Normaliza una cadena de texto eliminando acentos, convirtiendo a minúsculas y eliminando espacios adicionales.
	 */
	public static normalizeString(input: string | undefined | null): string {
		if (!input) return '';
		return input
			.toString()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.trim();
	}

	/**
	 * Extrae el texto de la sección y la opción desde elementos HTML según los selectores proporcionados.
	 */
	public static getSectionAndOptionText(params: ComplexClickParams): { section: string; option: string } | null {
		const { target, containerSelectors, contentSelectors } = params;

		const outerContainer = target.closest(containerSelectors.outerContainer);
		const sectionElement = outerContainer?.querySelector(containerSelectors.innerContent);

		const contentContainer = target.closest(contentSelectors.outerContainer);
		const optionElement = contentContainer?.querySelector(contentSelectors.innerContent);

		if (!sectionElement || !optionElement) return null;

		return {
			section: sectionElement.textContent ?? '',
			option: optionElement.textContent ?? '',
		};
	}

	/**
	 * Almacena IDs de promociones vistas en el almacenamiento de sesión, evitando duplicados.
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
	 */
	public static delayExecution(timeout: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, timeout));
	}

	/**
	 * Verifica si un producto está en la lista de cotización de crédito en el almacenamiento de sesión.
	 */
	public static isProductInCreditQuote({ productId }: { productId: string }): boolean {
		const creditQuoteProducts = JSON.parse(sessionStorage?.getItem('creditQuoterProducts') ?? '[]');
		if (!creditQuoteProducts || creditQuoteProducts?.length === 0) return false;
		return creditQuoteProducts.includes(productId);
	}

	/**
	 * Verifica si un producto está en la lista de productos seleccionados para comparación.
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
	 */
	public static generateRandomUniqueId(): string {
		return `id-${Math.random().toString(36).slice(2, 11)}-${Date.now().toString(36)}`;
	}
}

// interface GetClickBreadcrumbReturn {
// 	breadcrumb: string;
// 	breadcrumb_lv1: string;
// 	breadcrumb_lv2: string;
// 	breadcrumb_lv3: string;
// 	breadcrumb_lv4: string;
// }

// getClickBreadcrumb(): GetClickBreadcrumbReturn {
//   const classNamePLP = '.vtex-breadcrumb-1-x-link';
//   const classNameCLP = '.elektra-elektra-components-0-x-breadCrumbItem';
//   const breadCrumbClP = document.querySelectorAll(classNameCLP);
//   const breadcrumbPLP = document.querySelectorAll(classNamePLP);

//   const breadcrumbs: GetClickBreadcrumbReturn = {
//     breadcrumb: window.location.href || '',
//     breadcrumb_lv1: '',
//     breadcrumb_lv2: '',
//     breadcrumb_lv3: '',
//     breadcrumb_lv4: '',
//   };

//   if (breadcrumbPLP.length > 0) {
//     breadcrumbPLP.forEach((_element, index) => {
//       const breadcrumbLevel = `breadcrumb_lv${index + 1}` as keyof GetClickBreadcrumbReturn;
//       const value = document.querySelector(`${classNamePLP}--${index + 1}`)?.innerHTML ?? '';
//       if (index < 4 && value) {
//         breadcrumbs[breadcrumbLevel] = value;
//       }
//     });
//     breadcrumbs.breadcrumb_lv4 =
//       document.querySelector('.vtex-breadcrumb-1-x-term')?.innerHTML ?? '';
//   }

//   if (breadCrumbClP.length) {
//     breadCrumbClP.forEach((element, index) => {
//       const breadcrumbLevel = `breadcrumb_lv${index}` as keyof GetClickBreadcrumbReturn;
//       const value = element.innerHTML || '';

//       if (index < 4 && index > 0 && value) {
//         breadcrumbs[breadcrumbLevel] = value;
//       }
//     });
//   }

//   return breadcrumbs;
// },
// getClickPostalCode(): number | null {
//   const cp = document.querySelector('.inputPopUpPostalCode') as HTMLInputElement;
//   if (cp?.value) {
//     return Number.isNaN(Number(cp.value)) ? 0 : Number(cp.value);
//   }
//   return null;
// },
