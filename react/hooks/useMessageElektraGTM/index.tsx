import { useCallback } from 'react';

import { ModalData } from '../../ElektraTaggeo';
import { QUERY_DEV_TAGGEO } from '../../global/const';
import { KeyMessage, MapMessage } from '../../typings/message';
import useSendEvent from '../useSendData';
import help from './helper/help';
import { KeyEventsMessage } from './helper/type';

type EventMsgGTM = (data: { rawData: MessageEvent['data'] }) => Promise<ModalData | null>;
type UseMsgGTM = () => { eventMsgGTM: EventMsgGTM };

const useMsgGTM: UseMsgGTM = () => {
	const { buildEventPayload } = useSendEvent();

	const eventMsgGTM: EventMsgGTM = useCallback(async ({ rawData }) => {
		let dataModal: ModalData | null = null;

		switch (rawData.eventName) {
			case KeyMessage.promoView: {
				buildEventPayload(KeyMessage.promoView, rawData, ({data ,tool, sendEvent}) => {

					if (tool.storagePromoId({ ids: data.promotions.map(({ id }) => id) })) {
						sendEvent(KeyEventsMessage.view_promotion, {
							ecommerce: { items: help.itemPromotion(data) },
						});
					}
				});
				break;
			}
			// !
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
	}, []);
	return { eventMsgGTM };
};

export default useMsgGTM;
