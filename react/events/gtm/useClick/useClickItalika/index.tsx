type EventClickItalika = (data: { event: MouseEvent }) => void;

type UseClickItalika = () => {
	eventClickItalika: EventClickItalika;
};

const useClickItalika: UseClickItalika = () => {
	const eventClickItalika: EventClickItalika = ({ event }) => {
		false && console.log(event);
	};

	return { eventClickItalika };
};

export default useClickItalika;
