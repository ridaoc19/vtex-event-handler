import { ItemsProduct } from '../../useMessages/useMessageElektra/type';

// eslint-disable-next-line no-restricted-syntax
export enum KeyEventsClick {
	click_ubica_tienda = 'click_ubica_tienda',
	click_breadcrumb = 'click_breadcrumb',
	click_viajes = 'click_viajes',
	select_item = 'select_item',
}
export type MapEventsClick = {
	[KeyEventsClick.click_viajes]: {
		event: KeyEventsClick.click_viajes;
		page_type: string;
	};
	[KeyEventsClick.click_ubica_tienda]: {
		event: KeyEventsClick.click_ubica_tienda;
		page_type: string;
	};
	[KeyEventsClick.click_breadcrumb]: {
		event: KeyEventsClick.click_breadcrumb;
		page_type: string;
		breadcrumb: string;
		breadcrumb_lv1: string;
		breadcrumb_lv2: string;
		breadcrumb_lv3: string;
		breadcrumb_lv4: string;
	};
	[KeyEventsClick.select_item]: {
		event: KeyEventsClick.select_item;
		page_type: string;
		seccion: string;
		ecommerce: {
			items: Array<
				Omit<
					ItemsProduct,
					| 'comparador'
					| 'cotizador_prestamo'
					| 'disponibilidad_en_tienda'
					| 'disponibilidad_de_envio'
					| 'disponibilidad_de_inventario'
					| 'oferta_relampago'
				>
			>;
		};
	};
};
