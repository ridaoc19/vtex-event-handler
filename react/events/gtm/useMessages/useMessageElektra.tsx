import { useCallback } from 'react';

import { ModalData } from '../../../Taggeo';
import { PROMOTION_VIEW_IDS, QUERY_DEV_TAGGEO, TEXT_SEARCH } from '../../../utils/const';
import { KeyMessage, MapMessage } from '../../../typings/message';
import useSendEvent from '../../../hooks/useSendData';
import { KeyEventsMessage } from './helper/type';

type EventMessageElektra = (data: { rawData: MessageEvent['data'] }) => Promise<ModalData | null>;
type UseMessageElektra = () => { eventMessageElektra: EventMessageElektra };

const useMessageElektra: UseMessageElektra = () => {
	const { buildEventMessage } = useSendEvent();

	const eventMessageElektra: EventMessageElektra = useCallback(async ({ rawData }) => {
		let dataModal: ModalData | null = null;

		switch (rawData.eventName) {
			// ? Limpia TEXT_SEARCH evento del search
			case KeyMessage.pageInfo: {
				buildEventMessage(KeyMessage.pageInfo, rawData, ({ data }) => {
					if (!['emptySearchView', 'internalSiteSearchView'].includes(data.eventType))
						sessionStorage.removeItem(TEXT_SEARCH);
				});
				break;
			}

			// ! virtual_page
			case KeyMessage.pageView: {
				buildEventMessage(KeyMessage.pageView, rawData, ({ data, sendEvent, help }) => {
					sessionStorage.removeItem(PROMOTION_VIEW_IDS);
					help.locationEvent({ pageTitle: data.pageTitle, routeId: data.routeId });
					sendEvent(KeyEventsMessage.virtual_page, {});
				});
				break;
			}

			// ! view_promotion
			case KeyMessage.promoView: {
				buildEventMessage(KeyMessage.promoView, rawData, ({ data, tool, sendEvent, help }) => {
					if (tool.storagePromoId({ ids: data.promotions.map(({ id }) => id) })) {
						sendEvent(KeyEventsMessage.view_promotion, {
							ecommerce: { items: help.itemPromotion(data) },
						});
					}
				});
				break;
			}

			// ? Para el modal
			case KeyMessage.modalData: {
				if (sessionStorage[QUERY_DEV_TAGGEO]) {
					const { data } = rawData as MapMessage[KeyMessage.modalData];
					const backupDL = sessionStorage.getItem('backupDataLayer');
					const dataSend: ModalData = backupDL ? JSON.parse(backupDL) : [];

					const updatedData = [...dataSend, data];

					dataModal = updatedData;
					sessionStorage.setItem('backupDataLayer', JSON.stringify(updatedData));
				}
				break;
			}

			default: {
				break;
			}
		}

		return dataModal;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { eventMessageElektra };
};

export default useMessageElektra;
