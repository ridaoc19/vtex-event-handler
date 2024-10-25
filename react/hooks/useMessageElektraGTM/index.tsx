import { useCallback } from 'react';

import { QUERY_DEV_TAGGEO } from '../../global/const';
import { KeyMessage, MapMessage } from '../../typings/message';
import useSendEvent from '../useSendData';
import { KeyEventsMessage } from './help/type';
import { ModalData } from '../../ElektraTaggeo';

type EventMsgGTM = (data: { event: MessageEvent }) => Promise<ModalData | null>;
type UseMsgGTM = (isModalOpen: boolean) => { eventMsgGTM: EventMsgGTM };

const useMsgGTM: UseMsgGTM = () => {
	const { buildEventPayload } = useSendEvent();

	const eventMsgGTM: EventMsgGTM = useCallback(async ({ event }) => {
		if (!event?.data?.eventName) return null;
		let dataModal: ModalData | null = null;
		const dataMessage = event.data;

		switch (dataMessage.eventName) {
			// !
			case KeyMessage.clpView: {
				buildEventPayload(KeyMessage.clpView, dataMessage, () => {
					return {
						event: KeyEventsMessage.view_category_list,
						payload: {
							department_id: '',
							department_name: '',
							item_category: '',
							item_category2: '',
							item_category3: '',
							item_category4: '',
						},
					};
				});
				break;
			}
			// !
			case KeyMessage.modalData: {
				if (sessionStorage[QUERY_DEV_TAGGEO]) {
					const { data } = dataMessage as MapMessage[KeyMessage.modalData];
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
