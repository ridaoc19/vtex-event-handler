import { useCallback } from 'react';

import useSendEvent from '../../../hooks/useSendData';
import { ModalData } from '../../../Taggeo';
import { KeyMessage, MapMessage } from '../../../typings/message';
import { PRODUCT_IMPRESSION, PROMOTION_VIEW_IDS, QUERY_DEV_TAGGEO, TEXT_SEARCH } from '../../../utils/const';
import useMessageElektra from './useMessageElektra';
import useMessageItalika from './useMessageItalika';

type EventMessage = (data: { rawData: MessageEvent['data'] }) => Promise<ModalData | null>;
type UseMessage = () => {
	eventMessage: EventMessage;
};

const useMessage: UseMessage = () => {
	const { eventMessageElektra } = useMessageElektra();
	const { eventMessageItalika } = useMessageItalika();
	const { buildEventMessage: build } = useSendEvent();

	const eventMessage: EventMessage = useCallback(async ({ rawData }) => {
		let dataModal: ModalData | null = null;

		switch (rawData.eventName) {
			// ? limpieza sessionStorage y guardar location
			case KeyMessage.pageView: {
				build('dual', KeyMessage.pageView, rawData, ({ data, help }) => {
					sessionStorage.removeItem(PROMOTION_VIEW_IDS);
					sessionStorage.removeItem(PRODUCT_IMPRESSION);
					help.locationEvent({ pageTitle: data.pageTitle, routeId: data.routeId });
				});
				break;
			}

			// ? Limpia TEXT_SEARCH evento del search
			case KeyMessage.pageInfo: {
				build('dual', KeyMessage.pageInfo, rawData, ({ data }) => {
					if (!['emptySearchView', 'internalSiteSearchView'].includes(data.eventType))
						sessionStorage.removeItem(TEXT_SEARCH);
				});
				break;
			}
			// ? Para el modal
			case KeyMessage.modalData: {
				if (sessionStorage[QUERY_DEV_TAGGEO]) {
					const { data } = rawData as MapMessage[KeyMessage.modalData];
					console.log(data, 'tiene 3');

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

		eventMessageElektra({ rawData });
		eventMessageItalika({ rawData });
		return dataModal;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { eventMessageElektra, eventMessageItalika, eventMessage };
};

export default useMessage;
