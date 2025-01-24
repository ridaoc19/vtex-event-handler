// eslint-disable-next-line no-restricted-syntax
export enum KeyEventsMessage {
	virtual_page = 'virtual_page',
	view_promotion = 'view_promotion',
	select_promotion = 'select_promotion',
	click_menu_element = 'click_menu_element',
	view_item_list = 'view_item_list',
	view_search_results = 'view_search_results',
	view_category_list = 'view_category_list',
	select_category = 'select_category',
	view_item = 'view_item',
}

export type MapEventsMessage = {
	[KeyEventsMessage.virtual_page]: {
		event: KeyEventsMessage.virtual_page;
		page_type: string;
	};
	[KeyEventsMessage.view_promotion]: {
		event: KeyEventsMessage.view_promotion;
		page_type: string;
		ecommerce: {
			items: ItemPromotion[];
		};
	};
	[KeyEventsMessage.select_promotion]: {
		event: KeyEventsMessage.select_promotion;
		page_type: string;
		ecommerce: {
			items: ItemPromotion[];
		};
	};
	[KeyEventsMessage.click_menu_element]: {
		event: KeyEventsMessage.click_menu_element;
		section: string;
		opcion: string;
		page_type: string;
	};
	[KeyEventsMessage.view_item_list]: {
		event: KeyEventsMessage.view_item_list;
		page_type: string;
		ecommerce: {
			items: Array<
				Omit<
					ItemsProduct,
					| 'comparador'
					| 'cotizador_prestamo'
					| 'disponibilidad_en_tienda'
					| 'disponibilidad_de_envio'
					| 'disponibilidad_de_inventario'
				>
			>;
		};
	};
	[KeyEventsMessage.view_search_results]: {
		event: KeyEventsMessage.view_search_results;
		page_type: string;
		search_term: string;
		search_msg: string;
		search_results: string;
		department: string;
		category: string;
		category2: string;
		category3: string;
		ecommerce: {
			items: Array<
				Omit<
					ItemsProduct,
					| 'comparador'
					| 'cotizador_prestamo'
					| 'disponibilidad_en_tienda'
					| 'disponibilidad_de_envio'
					| 'disponibilidad_de_inventario'
				>
			>;
		};
	};
	[KeyEventsMessage.view_category_list]: {
		event: KeyEventsMessage.view_category_list;
		page_type: string;
		item_category: string;
		item_category2: string;
		item_category3: string;
		item_category4: string;
		department_id: string;
		department_name: string;
	};
	[KeyEventsMessage.select_category]: {
		event: KeyEventsMessage.select_category;
		page_type: string;
		index: number;
		card_name: string;
		item_category: string;
		item_category2: string;
		item_category3: string;
		item_category4: string;
		department_id: string;
		department_name: string;
	};
	[KeyEventsMessage.view_item]: {
		event: KeyEventsMessage.view_item;
		page_type: string;
		ecommerce: {
			items: Array<
				Omit<
					ItemsProduct,
					| 'cotizador_prestamo'
					| 'disponibilidad_en_tienda'
					| 'disponibilidad_de_envio'
					| 'disponibilidad_de_inventario'
				>
			>;
		};
	};
};

export type ItemPromotion = {
	item_name: string;
	item_id: string;
	promotion_id: string;
	promotion_name: string;
	item_brand: string;
	item_category: string;
	item_category2: string;
	item_category3: string;
	creative_slot: string;
	creative_name: string;
	location_id: string;
	quantity: number;
	index: number;
};

export interface ItemsProduct {
	comparador: boolean;
	cotizador_prestamo: boolean;
	item_name: string;
	item_id: string;
	product_id: string;
	price: number;
	price_without_discount: number;
	discount: number;
	item_brand: string;
	item_category: string;
	item_category2: string;
	item_category3: string;
	item_variant: string;
	quantity: number;
	index: number;
	currency: string;
	item_list_name: string;
	item_list_id: string;
	disponibilidad_de_inventario: boolean;
	disponibilidad_de_envio: boolean;
	disponibilidad_en_tienda: boolean;
	semanalidad: number;
	vendor: string;
	modelo: string;
	oferta_relampago: boolean;
}
