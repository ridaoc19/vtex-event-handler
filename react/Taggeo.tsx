import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useRuntime } from 'vtex.render-runtime';

import useMessageElektraGTM from './hooks/useEventMsgGTM';
import { QUERY_DEV_TAGGEO } from './global/const';
import { KeyMessage, MapMessage } from './typings/message';
import Modal from './components/Modal';
import useClickGTM from './hooks/useClickGTM';

const Accordion = React.lazy(() => import('./components/Accordion'));

export type ModalData = Array<MapMessage[KeyMessage.modalData]['data']>;
const Taggeo = (): JSX.Element => {
	const [modalData, setModalData] = useState<ModalData>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { eventMsgGTM } = useMessageElektraGTM();
	const { eventClickGTM } = useClickGTM();
	const { query } = useRuntime();

	const handleClickEvent = useCallback(
		(event: MouseEvent): void => {
			eventClickGTM({ event });
		},
		[eventClickGTM]
	);

	const handleMessageEvent = useCallback(
		async (event: MessageEvent): Promise<void> => {
			if (event?.data?.eventName) {
				const totalEvents = await eventMsgGTM({ rawData: event.data });

				if (totalEvents && totalEvents.length > 0) setModalData(totalEvents);
			}
		},
		[eventMsgGTM]
	);

	useEffect(() => {
		const isDevTaggeo = query && Object.keys(query).includes(QUERY_DEV_TAGGEO);
		const isStoredTaggeo = sessionStorage[QUERY_DEV_TAGGEO];

		if (isDevTaggeo || isStoredTaggeo) {
			if (!isStoredTaggeo) sessionStorage.setItem(QUERY_DEV_TAGGEO, 'true');
			setIsModalOpen(true);
		}
	}, [query]);

	useEffect(() => {
		window.addEventListener('message', handleMessageEvent);
		document.body.addEventListener('click', handleClickEvent);

		return (): void => {
			document.body.removeEventListener('click', handleClickEvent);
			window.removeEventListener('message', handleMessageEvent);
		};
	}, [handleClickEvent, handleMessageEvent]);

	return (
		<>
			{isModalOpen ? (
				<Modal
					isOpen
					onClean={(): void => setModalData([])}
					onClose={(): void => {
						sessionStorage.removeItem(QUERY_DEV_TAGGEO);
						setIsModalOpen(false);
					}}
				>
					<Suspense fallback={<div>Cargando schemas...</div>}>
						<Accordion modalData={modalData} />
					</Suspense>
				</Modal>
			) : null}
		</>
	);
};

export default Taggeo;
