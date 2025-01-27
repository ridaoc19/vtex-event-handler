import React from 'react';
import { usePixel } from 'vtex.pixel-manager';

import { MapMessage, TotalMapEvents } from '../../typings/message';
import ElementToolkit from '../../utils/DomToolbox';
import { ToolBox } from '../../utils/Toolbox';
import HelpMessage from '../../events/gtm/useMessages/helper/help';
import HelpClick from '../../events/gtm/useClick/helper/help';
import { GetItem } from '../../services/GetItem';

export type SendEvent = <T extends keyof TotalMapEvents>(
	event: T,
	payload: Omit<TotalMapEvents[T], 'event' | 'page_type'>
) => void;

export type BuildEventMessage = <T extends keyof MapMessage>(
	pageType: 'elektra' | 'italika' | 'dual',
	keyMessage: T,
	rawData: MapMessage[T],
	callback: (data: {
		data: MapMessage[T];
		dom: typeof ElementToolkit;
		tool: typeof ToolBox;
		getItem: typeof GetItem.getProductData;
		help: typeof HelpMessage;
		sendEvent: SendEvent;
	}) => Promise<void> | void
) => void;

export type BuildEventClick = (
	pageType: 'elektra' | 'italika' | 'dual',
	event: React.MouseEvent<MouseEvent> | React.MouseEvent<HTMLDivElement> | MouseEvent,
	callback: (data: {
		target: HTMLElement;
		dom: typeof ElementToolkit;
		tool: typeof ToolBox;
		getItem: typeof GetItem.getProductData;
		help: typeof HelpClick;
		sendEvent: SendEvent;
	}) => Promise<void> | void
) => void;

export type UseSendEvent = () => {
	buildEventMessage: BuildEventMessage;
	buildEventClick: BuildEventClick;
};

const useSendEvent: UseSendEvent = () => {
	const { push } = usePixel();

	const sendEvent: SendEvent = (event, payload) => {
		const pageType = sessionStorage.getItem('locationEvent') ?? '';
		const data = {
			event,
			page_type: pageType,
			...payload,
		};

		window.dataLayer.push(data);
		push({ event: 'modalData', data });
	};

	// eslint-disable-next-line max-params
	const buildEventMessage: BuildEventMessage = (pageType, keyMessage, rawData, callback) => {
		const newPageType =
			pageType === 'elektra' ? window.isElektra : pageType === 'italika' ? window.isItalika : true;
		if (keyMessage && newPageType) {
			callback({
				data: rawData,
				dom: ElementToolkit,
				tool: ToolBox,
				getItem: GetItem.getProductData,
				help: HelpMessage,
				sendEvent,
			});
		}
	};

	const buildEventClick: BuildEventClick = (pageType, event, callback) => {
		const newPageType =
			pageType === 'elektra' ? window.isElektra : pageType === 'italika' ? window.isItalika : true;
		if (event && newPageType) {
			callback({
				target: event.target as HTMLElement,
				dom: ElementToolkit,
				tool: ToolBox,
				getItem: GetItem.getProductData,
				help: HelpClick,
				sendEvent,
			});
		}
	};

	return { buildEventMessage, buildEventClick };
};

export default useSendEvent;
