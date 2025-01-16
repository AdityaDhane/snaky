import React from 'react';
import { CELL_COLORS } from '../constants/common';

function Cell(props) {
		let bgColor = CELL_COLORS.empty;
		if (props.color > 0) {
			bgColor = CELL_COLORS.snake;
		}
		else if(props.color < 0) {
			bgColor = CELL_COLORS.food;
		}

		return (
			<div className="grid-item" style={{
				height: props.cellSize + 'px',
				width: props.cellSize + 'px',
				backgroundColor: bgColor,
			}} />
		)
}

export default Cell;