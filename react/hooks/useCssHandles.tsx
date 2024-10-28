import { useCssHandles as vtexUseCssHandles } from 'vtex.css-handles';

function useCssHandles<T extends readonly string[]>(classNames: T): Record<T[number], string> {
	return vtexUseCssHandles(classNames);
}

export default useCssHandles;
