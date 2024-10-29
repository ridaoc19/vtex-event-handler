import { usePixel } from 'vtex.pixel-manager';

import { MapMessage, TotalMapEvents } from '../../typings/message';
import ElementToolkit from '../../utils/DomToolbox';
import { ToolBox } from '../../utils/Toolbox';
import HelpMessage from '../useEventMsgGTM/helper/help';
import HelpClick from '../useClickGTM/helper/help';

export type SendEvent = <T extends keyof TotalMapEvents>(
	event: T,
	payload: Omit<TotalMapEvents[T], 'event' | 'page_type'>
) => void;

export type BuildEventMessage = <T extends keyof MapMessage>(
	keyMessage: T,
	rawData: MapMessage[T],
	callback: (data: {
		data: MapMessage[T];
		dom: typeof ElementToolkit;
		tool: typeof ToolBox;
		help: typeof HelpMessage;
		sendEvent: SendEvent;
	}) => Promise<void> | void
) => void;

export type BuildEventClick = (
	event: MouseEvent,
	callback: (data: {
		target: HTMLElement;
		dom: typeof ElementToolkit;
		tool: typeof ToolBox;
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

	const buildEventMessage: BuildEventMessage = (keyMessage, rawData, callback) => {
		if (keyMessage) {
			callback({ data: rawData, dom: ElementToolkit, tool: ToolBox, help: HelpMessage, sendEvent });
		}
	};

	const buildEventClick: BuildEventClick = (event, callback) => {
		if (event) {
			callback({
				target: event.target as HTMLElement,
				dom: ElementToolkit,
				tool: ToolBox,
				help: HelpClick,
				sendEvent,
			});
		}
	};

	return { buildEventMessage, buildEventClick };
};

export default useSendEvent;
