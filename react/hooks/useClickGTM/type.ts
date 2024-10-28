// eslint-disable-next-line no-restricted-syntax
export enum KeyEventsClick {
	click_ubica_tienda = 'click_ubica_tienda',
	click_breadcrumb = 'click_breadcrumb',
	click_viajes = 'click_viajes',
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
};
