import useClickElektra from './useClickElektra';
import useClickItalika from './useClickItalika';

type EventClickGTM = (data: { event: MouseEvent }) => void;

type UseClickGTM = () => {
	eventClickElektra: EventClickGTM;
	eventClickItalika: EventClickGTM;
};

const useClickGTM: UseClickGTM = () => {
	const { eventClickElektra } = useClickElektra();
	const { eventClickItalika } = useClickItalika();

	return { eventClickElektra, eventClickItalika };
};

export default useClickGTM;
