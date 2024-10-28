import type { ReactNode, ReactPortal } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDevice } from 'vtex.device-detector';

import useCssHandles from '../../hooks/useCssHandles';
import Svg from '../common/icons/Svg';
import SvgType from '../common/icons/svgType';
import './style.css';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	onClean: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, onClean }): ReactPortal | null => {
	const style = useCssHandles([
		'modal',
		'modal-content',
		'modal-content__header',
		'modal-content__header--button',
		'modal-content__header--button-close',
		'modal-content__header--button-reload',
		'modal-content__header--button-clear',
		'modal-content__children',
		'modal-resize',
		'modal-resize__line',
		'modal-resize__button',
	] as const);
	const { isMobile } = useDevice();
	const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);
	const [modalWidth, setModalWidth] = useState(420);
	const [isResizing, setIsResizing] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isMaximize, setIsMaximize] = useState(true);

	useEffect(() => {
		const tenPercentOfWindowWidth = window.innerWidth * 0.05;
		if (modalWidth >= window.innerWidth - tenPercentOfWindowWidth) {
			setIsResizing(false);
			setModalWidth(window.innerWidth - tenPercentOfWindowWidth);
		} else if (modalWidth <= 420 && modalWidth > 16) {
			setIsResizing(false);
			setModalWidth(420);
		}
	}, [modalWidth]);

	useEffect(() => {
		const modalDiv = document.createElement('div');
		modalDiv.setAttribute('id', 'modal-root');
		document.body.appendChild(modalDiv);
		setModalRoot(modalDiv);

		return (): void => {
			document.body.removeChild(modalDiv);
		};
	}, []);

	const handleMouseDown = (_e: React.MouseEvent): void => {
		if (isMaximize && !isMobile) {
			setIsResizing(true);
		}
	};

	const handleMouseMove = (e: MouseEvent): void => {
		if (isResizing) {
			const newWidth = window.innerWidth - e.clientX;
			setModalWidth(newWidth);
		}
	};

	const handleMouseUp = (): void => {
		if (isResizing) {
			setIsResizing(false);
		}
	};

	useEffect(() => {
		if (isResizing) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		} else {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}

		return (): void => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isResizing]);

	if (!isOpen || !modalRoot) {
		return null;
	}

	return createPortal(
		<div
			className={style.modal}
			style={{ width: `${modalWidth}px`, right: 0, left: 'auto' }}
			ref={modalRef}
		>
			<div className={style['modal-content']}>
				<div className={style['modal-content__header']}>
					<button
						className={`${style['modal-content__header--button-clear']} ${style['modal-content__header--button']}`}
						onClick={(): void => {
							sessionStorage.removeItem('backupDataLayer');
							onClean();
						}}
					>
						{Svg({ type: SvgType.Clean })}
					</button>
					<button
						className={`${style['modal-content__header--button-reload']} ${style['modal-content__header--button']}`}
						onClick={(): void => window.location.reload()}
					>
						{Svg({ type: SvgType.Update })}
					</button>
					<button
						className={`${style['modal-content__header--button-close']} ${style['modal-content__header--button']}`}
						onClick={onClose}
					>
						{Svg({ type: SvgType.Close })}
					</button>
				</div>
				<div className={style['modal-content__children']}>{children}</div>
			</div>
			<div className={style['modal-resize']}>
				<button
					className={style['modal-resize__button']}
					onClick={(): void => {
						setIsMaximize(!isMaximize);
						setModalWidth(isMaximize ? 16 : 420);
					}}
				>
					{isMaximize ? '>' : '<'}
				</button>
				{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
				<div className={style['modal-resize__line']} onMouseDown={handleMouseDown} />
			</div>
		</div>,
		modalRoot
	);
};

export default Modal;
