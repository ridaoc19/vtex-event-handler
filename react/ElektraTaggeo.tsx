import React, { useCallback, useEffect, useState } from 'react';
import { useRuntime } from 'vtex.render-runtime';

import useMessageElektraGTM from './hooks/useMessageElektraGTM';
import { QUERY_DEV_TAGGEO } from './global/const';
import { KeyMessage, MapMessage } from './typings/message';

export type ModalData = Array<MapMessage[KeyMessage.modalData]['data']>;

const ElektraTaggeo = (props: { active: boolean }): JSX.Element => {
	const { query } = useRuntime();
	const [modalData, setModalData] = useState<ModalData>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { eventMsgGTM } = useMessageElektraGTM(isModalOpen);
	console.log(props, modalData, 'tiene');

	const handleClickEvent = useCallback((event: MouseEvent): void => {
		console.warn(event);
		// eventClickElektraGTM({ event });
	}, []);

	const handleMessageEvent = useCallback(async (event: MessageEvent): Promise<void> => {
		const totalEvents = await eventMsgGTM({ event });
		if (totalEvents && totalEvents.length > 0) setModalData(totalEvents);
	}, []);

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

	return <div>ElektraTaggeo</div>;
};

ElektraTaggeo.schema = {
	title: 'Cualquier otra cosa',
	type: 'object',
	properties: {
		active: {
			title: '¿Visualizar taggeo?',
			type: 'boolean',
			default: false,
		},
	},
};

export default ElektraTaggeo;
