import { KeyMessage, MapMessage } from '../../../typings/message';
import { ItemPromotion } from './type';

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
};
