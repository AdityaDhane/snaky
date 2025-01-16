import React from 'react';

function Cell(props) {
		let bgColor = 'white';
		if (props.color > 0) {
			bgColor = 'purple';
		}
		else if(props.color < 0) {
			bgColor = 'red';
		}

		const side = props.cellSize + 'px';

		return (
			<div className="grid-item" style={{
				height: side,
				width: side,
				backgroundColor: bgColor,
			}} />
		)
}

export default Cell;