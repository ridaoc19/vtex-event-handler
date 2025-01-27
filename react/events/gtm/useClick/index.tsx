import useClickElektra from './useClickElektra';
import useClickItalika from './useClickItalika';

type EventClick = (data: { event: MouseEvent }) => void;

type UseClick = () => {
	eventClick: EventClick;
};

const useClickGTM: UseClick = () => {
	const { eventClickElektra } = useClickElektra();
	const { eventClickItalika } = useClickItalika();

	const eventClick: EventClick = ({ event }) => {
		eventClickElektra({ event });
		eventClickItalika({ event });
	};

	return { eventClick };
};

export default useClickGTM;
