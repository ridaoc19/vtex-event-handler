import { ModalData } from '../../../Taggeo';
import useMessageElektra from './useMessageElektra';
import useMessageItalika from './useMessageItalika';

type EventMsgGTM = (data: { rawData: MessageEvent['data'] }) => Promise<ModalData | null>;
type UseMessage = () => { eventMessageElektra: EventMsgGTM; eventMessageItalika: EventMsgGTM };

const useMessage: UseMessage = () => {
	const { eventMessageElektra } = useMessageElektra();
	const { eventMessageItalika } = useMessageItalika();

	return { eventMessageElektra, eventMessageItalika };
};

export default useMessage;
