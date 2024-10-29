interface GetClickBreadcrumbReturn {
	breadcrumb: string;
	breadcrumb_lv1: string;
	breadcrumb_lv2: string;
	breadcrumb_lv3: string;
	breadcrumb_lv4: string;
}

export default class ElementToolkit {
	/**
	 * Selecciona todos los elementos que coinciden con el selector CSS especificado.
	 * @param selector - Selector CSS de los elementos a seleccionar.
	 * @returns Una lista de nodos de elementos que coinciden con el selector.
	 */
	public static bySelectorAll(selector: string): NodeListOf<Element> {
		return document.querySelectorAll(selector);
	}

	/**
	 * Selecciona el primer elemento que coincide con el selector CSS especificado.
	 * @param selector - Selector CSS del elemento a seleccionar.
	 * @returns El primer elemento que coincide con el selector, o null si no se encuentra.
	 */
	public static bySelector(selector: string): Element | null {
		return document.querySelector(selector);
	}

	/**
	 * Selecciona elementos por tag.
	 * @param tag - El nombre del tag de los elementos a seleccionar.
	 * @returns Una colección de elementos HTML que coinciden con el tag.
	 */
	public static byTag(tag: string): HTMLCollectionOf<Element> {
		return document.getElementsByTagName(tag);
	}

	/**
	 * Selecciona elementos por rol de accesibilidad.
	 * @param role - El rol de accesibilidad de los elementos a seleccionar.
	 * @returns Una lista de nodos de elementos que coinciden con el rol.
	 */
	public static byRole(role: string): NodeListOf<Element> {
		return document.querySelectorAll(`[role="${role}"]`);
	}

	/**
	 * Selecciona elementos por clase.
	 * @param className - El nombre de la clase de los elementos a seleccionar.
	 * @returns Una colección de elementos HTML que coinciden con la clase.
	 */
	public static byClass(className: string): HTMLCollectionOf<Element> {
		return document.getElementsByClassName(className);
	}

	/**
	 * Selecciona un elemento por ID.
	 * @param id - El ID del elemento a seleccionar.
	 * @returns El elemento HTML correspondiente al ID, o null si no se encuentra.
	 */
	public static byId(id: string): HTMLElement | null {
		return document.getElementById(id);
	}

	/**
	 * Busca el elemento más cercano al elemento dado que coincide con el selector especificado.
	 * @param element - El elemento desde el cual se inicia la búsqueda.
	 * @param selector - Selector CSS del elemento a buscar.
	 * @returns El elemento más cercano que coincide con el selector, o null si no se encuentra.
	 */
	public static closest(element: Element, selector: string): Element | null {
		return element.closest(selector);
	}

	/**
	 * Obtiene el valor de un atributo específico de un elemento.
	 * @param element - El elemento del cual se obtendrá el atributo.
	 * @param attribute - El nombre del atributo cuyo valor se desea obtener.
	 * @returns El valor del atributo, o null si no existe.
	 */
	public static getAttribute(element: Element, attribute: string): string | null {
		return element.getAttribute(attribute);
	}

	/**
	 * Obtiene el texto interno de un elemento.
	 * @param element - El elemento del cual se obtendrá el texto.
	 * @returns El texto interno del elemento, o un string vacío si el elemento no es un HTMLElement.
	 */
	public static innerText(element: Element): string {
		return (element as HTMLElement).innerText || '';
	}

	/**
	 * Obtiene el contenido HTML interno de un elemento.
	 * @param element - El elemento del cual se obtendrá el contenido HTML.
	 * @returns El contenido HTML interno del elemento, o un string vacío si el elemento no es un HTMLElement.
	 */
	public static innerHTML(element: Element): string {
		return (element as HTMLElement).innerHTML || '';
	}

	/**
	 * Obtiene el texto de contenido de un elemento.
	 * @param element - El elemento del cual se obtendrá el texto de contenido.
	 * @returns El texto de contenido del elemento, o un string vacío si el elemento no es un HTMLElement.
	 */
	public static textContent(element: Element): string {
		return (element as HTMLElement).textContent ?? '';
	}

	/**
	 * Selecciona el primer elemento que coincide con la expresión XPath especificada.
	 * @param xpath - La expresión XPath del elemento a seleccionar.
	 * @returns El primer elemento que coincide con la expresión XPath, o null si no se encuentra.
	 */
	public static byXPath(xpath: string): Element | null {
		return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
			.singleNodeValue as Element | null;
	}

	/**
	 * Selecciona todos los elementos que coinciden con la expresión XPath especificada.
	 * @param xpath - La expresión XPath de los elementos a seleccionar.
	 * @returns Una lista de elementos que coinciden con la expresión XPath.
	 */
	public static byXPathAll(xpath: string): Element[] {
		const result: Element[] = [];
		const nodesSnapshot = document.evaluate(
			xpath,
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);

		for (let i = 0; i < nodesSnapshot.snapshotLength; i++) {
			const node = nodesSnapshot.snapshotItem(i) as Element | null;

			if (node) result.push(node);
		}

		return result;
	}

	/**
	 * Obtiene la ruta de navegación (breadcrumb) de la página actual.
	 * @returns Un objeto que contiene la URL actual y los niveles de la ruta de navegación.
	 */
	public static getClickBreadcrumb(): GetClickBreadcrumbReturn {
		const classNamePLP = '.vtex-breadcrumb-1-x-link';
		const classNameCLP = '.elektra-elektra-components-0-x-breadCrumbItem';
		const breadCrumbClP = document.querySelectorAll(classNameCLP);
		const breadcrumbPLP = document.querySelectorAll(classNamePLP);

		const breadcrumbs: GetClickBreadcrumbReturn = {
			breadcrumb: window.location.href || '',
			breadcrumb_lv1: '',
			breadcrumb_lv2: '',
			breadcrumb_lv3: '',
			breadcrumb_lv4: '',
		};

		if (breadcrumbPLP.length > 0) {
			breadcrumbPLP.forEach((_element, index) => {
				const breadcrumbLevel = `breadcrumb_lv${index + 1}` as keyof GetClickBreadcrumbReturn;
				const value = document.querySelector(`${classNamePLP}--${index + 1}`)?.innerHTML ?? '';

				if (index < 4 && value) {
					breadcrumbs[breadcrumbLevel] = value;
				}
			});
			breadcrumbs.breadcrumb_lv4 =
				document.querySelector('.vtex-breadcrumb-1-x-term')?.innerHTML ?? '';
		}

		if (breadCrumbClP.length) {
			breadCrumbClP.forEach((element, index) => {
				const breadcrumbLevel = `breadcrumb_lv${index}` as keyof GetClickBreadcrumbReturn;
				const value = element.innerHTML || '';

				if (index < 4 && index > 0 && value) {
					breadcrumbs[breadcrumbLevel] = value;
				}
			});
		}

		return breadcrumbs;
	}

	/**
	 * Obtiene el código postal ingresado en el campo correspondiente.
	 * @returns El código postal como número, o null si no se ha ingresado.
	 */
	public static getClickPostalCode(): number | null {
		const cp = document.querySelector('.inputPopUpPostalCode') as HTMLInputElement;

		if (cp?.value) {
			return Number.isNaN(Number(cp.value)) ? 0 : Number(cp.value);
		}

		return null;
	}
}
