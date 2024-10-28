import { KeyMessage } from '../../typings/message';
import useSendEvent from '../useSendData';
import { KeyEventsClick } from './type';

type EventClickGTM = (data: { event: MouseEvent }) => void;

type UseClickGTM = () => {
	eventClickGTM: EventClickGTM;
};

const useClickGTM: UseClickGTM = () => {
	const { buildEventPayload } = useSendEvent();

	const eventClickGTM: EventClickGTM = ({ event }) => {
		const target = event.target as HTMLElement;

		buildEventPayload(KeyMessage.click, { event: KeyMessage.click }, ({ dom, tool, sendEvent }) => {
			const container = dom.closest(target, '.vtex-menu-2-x-styledLinkContainer--menu-item-faqs');
			if (container) {
				const text = tool.cleanStr(dom.innerText(container));
				if (text === tool.cleanStr('Viajes')) {
					sendEvent(KeyEventsClick.click_viajes, {});
				} else if (text === tool.cleanStr('Ubica tu tienda')) {
					sendEvent(KeyEventsClick.click_ubica_tienda, {});
				}
			}
		});
	};

	return { eventClickGTM };
};

export default useClickGTM;
