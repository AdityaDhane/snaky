import React from 'react';

function Cell(props) {
		let bgColor = 'white';
		if(props.color > 0)
			bgColor = 'purple';
		else if(props.color < 0)
		bgColor = 'red';
		
		const side = props.cellSize + 'px';
		const style = {
				height: side,
				width: side,
				backgroundColor: bgColor,
		};
		return (
			<div className="grid-item" style={style}></div>
		)
}

export default Cell;