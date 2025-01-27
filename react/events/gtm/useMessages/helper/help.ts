import { KeyMessage, MapMessage, RouteId } from '../../../../typings/message';
import { ItemPromotion } from '../useMessageElektra/type';

export default {
	itemPromotion({ promotions }: Pick<MapMessage[KeyMessage.promoView], 'promotions'>): ItemPromotion[] {
		return promotions.map(({ id, name, position }) => ({
			item_name: id || '',
			item_id: '',
			promotion_id: id || '',
			promotion_name: id || '',
			item_brand: '',
			item_category: '',
			item_category2: '',
			item_category3: '',
			creative_slot: '',
			creative_name: id || '',
			location_id: name || '',
			quantity: 1,
			index: +position,
		}));
	},
	locationEvent({ routeId, pageTitle }: Pick<MapMessage[KeyMessage.pageView], 'pageTitle' | 'routeId'>): void {
		switch (routeId) {
			case RouteId.Home:
				sessionStorage.locationEvent = 'home';
				break;

			case RouteId.Product:
				sessionStorage.locationEvent = 'pdp';
				break;

			case RouteId.Search:
			case RouteId.SearchBrand:
			case RouteId.SearchDepartment:
			case RouteId.SearchCategory:
			case RouteId.SearchSubcategory:
				sessionStorage.locationEvent = 'plp';
				break;

			default:
				sessionStorage.locationEvent = pageTitle;
				break;
		}
	},
};
