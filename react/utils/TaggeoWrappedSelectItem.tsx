import React, { ReactNode } from 'react';

import useSendEvent from '../hooks/useSendData';
import { KeyEventsClick } from '../events/gtm/useClick/useClickElektra/type';

interface Props {
	children: ReactNode | ReactNode[];
}

const TaggeoWrappedSelectItem: React.FC<Props> = ({ children }) => {
	const { buildEventClick: build } = useSendEvent();

	const handleClickEvent = (event: React.MouseEvent<HTMLDivElement>): void => {
		build('dual', event, ({ target, dom, sendEvent }) => {
			const card = dom.closest(target, '.taggeo-wrapped-select-item-1');
			if (card) {
				const skuId = dom.bySelector('cite', card)?.dataset.id;
				if (skuId) {
					const { section, items } = dom.dataShelf([{ skuId }]);
					sendEvent(KeyEventsClick.select_item, {
						seccion: section,
						ecommerce: {
							items,
						},
					});
				}
			}
		});
	};

	return (
		<div
			className='taggeo-wrapped-select-item-1'
			style={{ display: 'contents' }}
			onClick={handleClickEvent}
			onKeyPress={(e): void => {
				e.key === 'Enter' && console.warn('Enter');
			}}
			role='button'
			tabIndex={0}
		>
			{children}
		</div>
	);
};

export default TaggeoWrappedSelectItem;
