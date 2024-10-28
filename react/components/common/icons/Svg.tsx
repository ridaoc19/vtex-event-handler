import React from 'react';

import SvgType from './svgType';

function Svg({ type }: { type: SvgType }): JSX.Element | null {
	switch (type) {
		case SvgType.Clean:
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M9.87006 5.66998L6.45006 7.74999L4.89007 5.19C4.32007 4.25 4.62006 3.01 5.56006 2.44C6.50006 1.87 7.74006 2.16998 8.31006 3.10998L9.87006 5.66998Z'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M11.8201 9.15997L8.66012 11.08C6.82012 12.2 6.26011 14.46 7.15011 16.26L9.20011 20.44C9.86011 21.79 11.4601 22.26 12.7401 21.47L19.1701 17.56C20.4601 16.78 20.7701 15.15 19.8801 13.94L17.1101 10.2C15.9101 8.58001 13.6601 8.03997 11.8201 9.15997Z'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M10.7567 5.09791L5.63208 8.21851L7.71248 11.6349L12.8371 8.51431L10.7567 5.09791Z'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M14.3101 16.8101L15.9601 19.5201'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M11.75 18.37L13.4 21.08'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M16.8701 15.25L18.5201 17.96'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case SvgType.Minimize:
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M16.44 8.90002C20.04 9.21002 21.51 11.06 21.51 15.11V15.24C21.51 19.71 19.72 21.5 15.25 21.5H8.73998C4.26998 21.5 2.47998 19.71 2.47998 15.24V15.11C2.47998 11.09 3.92998 9.24002 7.46998 8.91002'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M12 2V14.88'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M15.3499 12.65L11.9999 16L8.6499 12.65'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case SvgType.Maximize:
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M16.44 8.90002C20.04 9.21002 21.51 11.06 21.51 15.11V15.24C21.51 19.71 19.72 21.5 15.25 21.5H8.73998C4.26998 21.5 2.47998 19.71 2.47998 15.24V15.11C2.47998 11.09 3.92998 9.24002 7.46998 8.91002'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M12 15V3.62'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M15.3499 5.85L11.9999 2.5L8.6499 5.85'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case SvgType.Update:
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		case SvgType.Close:
			return (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M14.9 2H9.10001C8.42001 2 7.46 2.4 6.98 2.88L2.88 6.98001C2.4 7.46001 2 8.42001 2 9.10001V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42001 22 9.10001 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.10001C22 8.42001 21.6 7.46001 21.12 6.98001L17.02 2.88C16.54 2.4 15.58 2 14.9 2Z'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M8.5 15.5L15.5 8.5'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<path
						d='M15.5 15.5L8.5 8.5'
						stroke='#292D32'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			);
		default:
			return null;
	}
}

export default Svg;
