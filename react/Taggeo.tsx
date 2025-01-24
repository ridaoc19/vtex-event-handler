import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { useRuntime } from 'vtex.render-runtime';

import useMessage from './events/gtm/useMessages';
import { QUERY_DEV_TAGGEO } from './utils/const';
import { KeyMessage, MapMessage } from './typings/message';
import Modal from './components/Modal';
import useClick from './events/gtm/useClick';
import useRequest from './hooks/useRequest';

const Accordion = React.lazy(() => import('./components/Accordion'));

export type ModalData = Array<MapMessage[KeyMessage.modalData]['data']>;
const Taggeo = (): JSX.Element => {
	const { query } = useRuntime();
	const { eventClickElektra, eventClickItalika } = useClick();
	const { eventMessageElektra, eventMessageItalika } = useMessage();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState<ModalData>([]);
	const { fetchProduct } = useRequest();

	const handleClickEvent = useCallback(
		(event: MouseEvent): void => {
			eventClickElektra({ event });
			eventClickItalika({ event });
		},
		[eventClickElektra, eventClickItalika]
	);

	const handleMessageEvent = useCallback(
		async (event: MessageEvent): Promise<void> => {
			if (!event?.data?.eventName) return;

			const totalEventsElektra = (await eventMessageElektra({ rawData: event.data })) ?? [];
			const totalEventsItalika = (await eventMessageItalika({ rawData: event.data })) ?? [];

			const totalEvents = [...totalEventsElektra, ...totalEventsItalika];

			if (totalEvents && totalEvents.length > 0) setModalData(totalEvents);
		},
		[eventMessageElektra, eventMessageItalika]
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
			<button
				onClick={(): void => {
					fetchProduct();
				}}
			>
				button
			</button>
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
