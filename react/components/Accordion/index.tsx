import React, { useState } from 'react';

import { groupByPageTypeAndEvent } from '../../utils/groupByPageTypeAndEvent';
import generateJSON from '../../../__generated__/schema.json';
import { KeyMessage, MapMessage } from '../../typings/message';
import useCssHandles from '../../hooks/useCssHandles';
import JsonEditor from '../common/JsonEditor';
import './style.css';
import AccordionType from './AccordionType';

const Accordion = ({ modalData }: { modalData: Array<MapMessage[KeyMessage.modalData]['data']> }): JSX.Element => {
	const style = useCssHandles(['event-inspector'] as const);
	const newData = groupByPageTypeAndEvent(modalData);

	const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number): void => {
		setOpenAccordionIndex(openAccordionIndex === index ? null : index);
	};

	return (
		<div className={style['event-inspector']}>
			{[generateJSON.definitions.TotalEvents.properties].map((item, ind) => {
				return <JsonEditor key={ind} jsonSchema={item} />;
			})}
			{newData.map(({ page_type, events }, index) => (
				<AccordionType
					key={index}
					title={page_type}
					total={events.length}
					isOpen={openAccordionIndex === index}
					onToggle={(): void => toggleAccordion(index)}
					events={events}
				/>
			))}
		</div>
	);
};

export default Accordion;
