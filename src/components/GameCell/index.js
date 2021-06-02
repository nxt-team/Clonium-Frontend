import React from 'react';
import './Cell.css';

export default function GameCell ({row, column, disabled, onCellClick, getCellContent, colorMotion, map, cellStyle}) {
    function getClassName () {
        if (colorMotion === map[row -1][column - 1]['color']) {
            return 'active_cell'
        } else {
            return 'cell'
        }
    }

    if (disabled) {
        return (
            <div style={cellStyle} className={'disabled_cell'} />
        )
    } else {
        return (
            <div style={cellStyle} className={getClassName()}  onClick={() => onCellClick(row, column)}>
                {getCellContent(row, column)}
            </div>
        )
    }
}