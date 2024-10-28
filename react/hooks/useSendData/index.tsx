import { usePixel } from 'vtex.pixel-manager';

import { MapMessage, TotalMapEvents } from '../../typings/message';
import ElementToolkit from '../../utils/DomToolbox';
import { ToolBox } from '../../utils/Toolbox';

export type SendEvent = <T extends keyof TotalMapEvents>(
	event: T,
	payload: Omit<TotalMapEvents[T], 'event' | 'page_type'>
) => void;
export type BuildEventPayload = <T extends keyof MapMessage>(
	keyMessage: T,
	rawData: MapMessage[T],
	callback: (data: {
		data: MapMessage[T];
		dom: typeof ElementToolkit;
		tool: typeof ToolBox;
		sendEvent: SendEvent;
	}) => Promise<void> | void
) => void;

export type UseSendEvent = () => {
	buildEventPayload: BuildEventPayload;
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

	const buildEventPayload: BuildEventPayload = (keyMessage, rawData, callback) => {
		if (keyMessage) {
			callback({ data: rawData, dom: ElementToolkit, tool: ToolBox, sendEvent });
		}
	};

	return { buildEventPayload };
};

export default useSendEvent;
