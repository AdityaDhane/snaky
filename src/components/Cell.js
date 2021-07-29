import React from 'react';

function Cell(props) {
    const bgColor = props.fill?'purple':'skyblue';
    const style = {
        height: '50px',
        width: '50px',
        backgroundColor: bgColor,
    };
    return (
      <div className="grid-item" style={style}></div>
    )
}

export default Cell;