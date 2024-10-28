import React, { Suspense } from 'react';

import { EventGroup } from '../../../utils/groupByPageTypeAndEvent';
import useCssHandles from '../../../hooks/useCssHandles';
import './style.css';

const JsonEditor = React.lazy(() => import('../../common/JsonEditor'));

type EventsType = (data: { items: EventGroup['items'] }) => JSX.Element;
const Events: EventsType = ({ items }): JSX.Element => {
	const style = useCssHandles(['events'] as const);
	return (
		<div className={style.events}>
			{items.map((jsonData, indexJson) => (
				<div key={indexJson} style={{ minWidth: '22rem' }}>
					<Suspense fallback={<div>Cargando editor...</div>}>
						<JsonEditor jsonData={jsonData} />
					</Suspense>
				</div>
			))}
		</div>
	);
};

export default Events;
