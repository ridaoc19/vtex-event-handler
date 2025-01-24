import useRequest from '../../../hooks/useRequest';
import useSendEvent from '../../../hooks/useSendData';
import { KeyEventsClick } from './type';

type EventClickElektra = (data: { event: MouseEvent }) => void;

type UseClickElektra = () => {
	eventClickElektra: EventClickElektra;
};

const useClickElektra: UseClickElektra = () => {
	const { buildEventClick } = useSendEvent();
	const { fetchProduct } = useRequest();

	const eventClickElektra: EventClickElektra = ({ event }) => {
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

	return { eventClickElektra };
};

export default useClickElektra;
