// import { useLazyQuery } from 'react-apollo';

import { KeyEventsMessage } from '../../events/gtm/useMessages/helper/type';
import { Data } from './RestructureData';

interface UseRequestResult {
	fetchProduct: () => Promise<void>;
}

const useRequest = (): UseRequestResult => {
	const fetchProduct = async (): Promise<void> => {
		const pro = new Data();
		try {
			const product = await pro.getProductData({
				eventName: KeyEventsMessage.view_item,
				typeGet: 'skuId',
				dataItem: [{ id: '1300309658' }, { id: '1300309658' }],
			});

			console.warn(product, 'tiene datos:');
		} catch (errors) {
			console.error('Error al obtener el producto:', errors);
		}
	};

	return { fetchProduct };
};

export default useRequest;
