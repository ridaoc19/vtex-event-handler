import React from 'react';

import './style.css';
import useCssHandles from '../../../hooks/useCssHandles';
import SvgType from '../../common/icons/svgType';
import Svg from '../../common/icons/Svg';

interface AccordionEventProps {
	title: string;
	children: React.ReactNode;
	total: number;
	isOpen: boolean;
	onToggle: () => void;
}

const AccordionEvent = ({ title, children, total, isOpen, onToggle }: AccordionEventProps): JSX.Element => {
	const style = useCssHandles([
		'accordion-event',
		'accordion-event__button',
		'accordion-event__icon',
		'accordion-event__children',
	] as const);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key === 'Enter' || event.key === ' ') {
			onToggle();
		}
	};

	return (
		<div className={style['accordion-event']}>
			<button
				className={style['accordion-event__button']}
				onClick={onToggle}
				onKeyDown={handleKeyDown}
				aria-expanded={isOpen}
				aria-controls={`accordion-event-content-${title}`}
			>
				<span>
					<span>{total} </span>
					<span>{title}</span>
				</span>
				<span className={style['accordion-event__icon']}>
					{isOpen ? Svg({ type: SvgType.Maximize }) : Svg({ type: SvgType.Minimize })}
				</span>
			</button>
			{isOpen && (
				<div
					id={`accordion-event-content-${title}`}
					className={style['accordion-event__children']}
				>
					{children}
				</div>
			)}
		</div>
	);
};

export default AccordionEvent;
