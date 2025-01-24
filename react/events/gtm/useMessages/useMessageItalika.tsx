import { useCallback } from 'react';

import { ModalData } from '../../../Taggeo';

type EventMessageItalika = (data: { rawData: MessageEvent['data'] }) => Promise<ModalData | null>;
type UseMessageItalika = () => { eventMessageItalika: EventMessageItalika };

const useMessageItalika: UseMessageItalika = () => {
	const eventMessageItalika: EventMessageItalika = useCallback(async ({ rawData }) => {
		false && console.log(rawData);
		const dataModal: ModalData | null = null;

		return dataModal;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { eventMessageItalika };
};

export default useMessageItalika;
