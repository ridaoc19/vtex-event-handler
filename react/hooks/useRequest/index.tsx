import { useLazyQuery } from 'react-apollo';

import GET_PRODUCT_BY_ID from '../../services/graphQL/getProducto.gql';

interface UseRequestResult {
	fetchProduct: () => Promise<void>;
	loading: boolean;
	data: unknown;
	error: Error | undefined;
}

const useRequest = (): UseRequestResult => {
	const [getProduct, { loading, data, error }] = useLazyQuery(GET_PRODUCT_BY_ID);

	// console.log('tiene:', { loading, data, error });

	const fetchProduct = async (): Promise<void> => {
		try {
			false && getProduct();
			// await fetchProductData('skuId', '1300309658');
			// const productData = await getProduct({
			// 	variables: {
			// 		type: 'sku',
			// 		id: 1300309658,
			// 	},
			// });

			console.warn('tiene datos:');
		} catch (errors) {
			console.error('Error al obtener el producto:', errors);
		}
	};

	return { fetchProduct, loading, data, error };
};

export default useRequest;
