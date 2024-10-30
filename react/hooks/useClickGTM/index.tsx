import useRequest from '../useRequest';
import useSendEvent from '../useSendData';
import { KeyEventsClick } from './type';

type EventClickGTM = (data: { event: MouseEvent }) => void;

type UseClickGTM = () => {
	eventClickGTM: EventClickGTM;
};

const useClickGTM: UseClickGTM = () => {
	const { buildEventClick } = useSendEvent();
	const { fetchProduct } = useRequest();

	const eventClickGTM: EventClickGTM = ({ event }) => {
		const target = event.target as HTMLElement;

		buildEventClick(event, ({ dom, tool, sendEvent }) => {
			const container = dom.closest(target, '.vtex-menu-2-x-styledLinkContainer--menu-item-faqs');

			if (container) {
				const text = tool.cleanStr(dom.innerText(container));

				if (text === tool.cleanStr('Viajes')) {
					fetchProduct();
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
