import { useCallback } from 'react';

export type EventMessageItalika = (data: { rawData: MessageEvent['data'] }) => void;
type UseMessageItalika = () => { eventMessageItalika: EventMessageItalika };

const useMessageItalika: UseMessageItalika = () => {
	const eventMessageItalika: EventMessageItalika = useCallback(async ({ rawData }) => {
		false && console.warn(rawData);
		// const dataModal: ModalData | null = null;

		// return dataModal;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { eventMessageItalika };
};

export default useMessageItalika;
