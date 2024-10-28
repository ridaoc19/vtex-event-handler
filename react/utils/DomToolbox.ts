export default class ElementToolkit {
	// Selecciona elementos por tag
	public static byTag(tag: string): HTMLCollectionOf<Element> {
		return document.getElementsByTagName(tag);
	}

	// Selecciona elementos por role de accesibilidad
	public static byRole(role: string): NodeListOf<Element> {
		return document.querySelectorAll(`[role="${role}"]`);
	}

	// Selecciona elementos por clase
	public static byClass(className: string): HTMLCollectionOf<Element> {
		return document.getElementsByClassName(className);
	}

	// Selecciona un elemento por ID
	public static byId(id: string): HTMLElement | null {
		return document.getElementById(id);
	}

	// Selecciona elementos por un selector CSS
	public static bySelector(selector: string): NodeListOf<Element> {
		return document.querySelectorAll(selector);
	}

	// Agrega un evento a un elemento
	public static addEvent(element: HTMLElement, event: string, handler: EventListener): void {
		element.addEventListener(event, handler);
	}

	// Remueve un evento de un elemento
	public static removeEvent(element: HTMLElement, event: string, handler: EventListener): void {
		element.removeEventListener(event, handler);
	}

	// Modifica el estilo de un elemento
	public static setStyle(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
		Object.assign(element.style, styles);
	}

	// Agrega una clase a un elemento
	public static addClass(element: HTMLElement, className: string): void {
		element.classList.add(className);
	}

	// Remueve una clase de un elemento
	public static removeClass(element: HTMLElement, className: string): void {
		element.classList.remove(className);
	}

	// Busca elementos y aplica un callback
	public static findAndApply(selector: string, callback: (el: Element) => void): void {
		const elements = this.bySelector(selector);
		elements.forEach(callback);
	}
}
