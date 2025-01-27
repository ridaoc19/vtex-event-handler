import { useCallback } from 'react';

import useSendEvent from '../../../../hooks/useSendData';
import { KeyMessage } from '../../../../typings/message';
import { KeyEventsMessage } from './type';

export type EventMessageElektra = (data: { rawData: MessageEvent['data'] }) => void;
type UseMessageElektra = () => { eventMessageElektra: EventMessageElektra };

const useMessageElektra: UseMessageElektra = () => {
	const { buildEventMessage: build } = useSendEvent();

	const eventMessageElektra: EventMessageElektra = useCallback(async ({ rawData }) => {
		switch (rawData.eventName) {
			// ! virtual_page
			case KeyMessage.pageView: {
				build('dual', KeyMessage.pageView, rawData, ({ sendEvent }) => {
					sendEvent(KeyEventsMessage.virtual_page, {});
				});
				break;
			}

			// ! view_promotion
			case KeyMessage.promoView: {
				build('dual', KeyMessage.promoView, rawData, ({ data, tool, sendEvent, help }) => {
					if (tool.storagePromoId({ ids: data.promotions.map(({ id }) => id) })) {
						sendEvent(KeyEventsMessage.view_promotion, {
							ecommerce: { items: help.itemPromotion(data) },
						});
					}
				});
				break;
			}

			// ! view_item
			case KeyMessage.productView: {
				build('dual', KeyMessage.productView, rawData, async ({ data, getItem, sendEvent }) => {
					const items = await getItem({
						eventName: KeyEventsMessage.view_item,
						typeGet: 'skuId',
						dataItem: [{ id: data.product.items[0].itemId }],
					});
					if (items.length > 0) {
						sendEvent(KeyEventsMessage.view_item, { ecommerce: { items } });
					}
				});
				break;
			}

			default: {
				break;
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { eventMessageElektra };
};

export default useMessageElektra;
