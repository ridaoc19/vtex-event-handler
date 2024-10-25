import { useCallback } from 'react';
import { usePixel } from 'vtex.pixel-manager';

import { MapMessage, TotalMapEvents } from '../../typings/message';
import { KeyEventsMessage } from '../useMessageElektraGTM/help/type';
import type { KeyEventsClick } from '../useClickElektraGTM/type';

export type SendEventDataLayer = <T extends KeyEventsClick | KeyEventsMessage>(
	event: T
) => {
	payload: (payload: Omit<TotalMapEvents[T], 'event' | 'page_type'>) => void;
};

export type BuildEventPayload = <T extends keyof MapMessage, E extends KeyEventsClick | KeyEventsMessage>(
	keyMessage: T,
	dataMessage: MapMessage[T],
	callback: (
		newDataMessage: MapMessage[T]
	) => { event: E; payload: Omit<TotalMapEvents[E], 'event' | 'page_type'> }
) => void;

export type UseSendEvent = () => {
	buildEventPayload: BuildEventPayload;
};

const useSendEvent: UseSendEvent = () => {
	const { push } = usePixel();

	const sendEventDataLayer = useCallback<SendEventDataLayer>(
		event => ({
			payload: (payload): void => {
				const pageType = sessionStorage.getItem('locationEvent') ?? '';

				const data = {
					page_type: pageType,
					...payload,
					event,
				};

				window.dataLayer.push(data);
				push({ event: 'updateDataContext', data });
			},
		}),
		[push]
	);

	const buildEventPayload = useCallback<BuildEventPayload>(
		(keyMessage, dataMessage, callback) => {
			if (keyMessage) {
				const { event, payload } = callback(dataMessage);
				sendEventDataLayer(event).payload(payload);
			}
		},
		[sendEventDataLayer]
	);

	return { buildEventPayload };
};

export default useSendEvent;
