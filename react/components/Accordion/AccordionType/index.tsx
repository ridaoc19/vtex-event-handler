import React, { useState } from 'react';

import type { EventGroup } from '../../../utils/groupByPageTypeAndEvent';
import useCssHandles from '../../../hooks/useCssHandles';
import SvgType from '../../common/icons/svgType';
import AccordionEvent from '../AccordionEvent';
import Svg from '../../common/icons/Svg';
import Events from '../Events';
import './style.css';

interface AccordionTypeProps {
	title: string;
	total: number;
	isOpen: boolean;
	onToggle: () => void;
	events: EventGroup[];
}

const AccordionType = ({ title, total, isOpen, onToggle, events }: AccordionTypeProps): JSX.Element => {
	const style = useCssHandles([
		'accordion-type',
		'accordion-type__button',
		'accordion-type__icon',
		'accordion-type__children',
	] as const);

	const [openEventIndex, setOpenEventIndex] = useState<number | null>(null);

	const toggleEvent = (index: number): void => {
		setOpenEventIndex(openEventIndex === index ? null : index);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key === 'Enter' || event.key === ' ') {
			onToggle();
		}
	};

	return (
		<div className={style['accordion-type']}>
			<button
				className={style['accordion-type__button']}
				onClick={onToggle}
				onKeyDown={handleKeyDown}
				aria-expanded={isOpen}
				aria-controls={`accordion-content-${title}`}
			>
				<span>
					<span>{total} </span>
					<span>{title}</span>
				</span>
				<span className={style['accordion-type__icon']}>
					{isOpen ? Svg({ type: SvgType.Maximize }) : Svg({ type: SvgType.Minimize })}
				</span>
			</button>
			{isOpen && (
				<div id={`accordion-type-${title}`} className={style['accordion-type__children']}>
					{events.map(({ event, items }, indexEv) => (
						<AccordionEvent
							key={indexEv}
							title={event}
							total={items.length}
							isOpen={openEventIndex === indexEv}
							onToggle={(): void => toggleEvent(indexEv)}
						>
							<Events items={items} />
						</AccordionEvent>
					))}
				</div>
			)}
		</div>
	);
};

export default AccordionType;
