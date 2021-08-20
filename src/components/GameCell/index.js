import React from 'react';
import './Cell.css';

export default function GameCell ({row, column, disabled, onCellClick, getCellContent, colorMotion, map, cellStyle, lastMotionCoords}) {

    function getClassName () {
        if (colorMotion === map[row -1][column - 1]['color']) {
            if (colorMotion === "blue") {
                return "active_cell_blue"
            } else if (colorMotion === "red") {
                return "active_cell_red"
            } else if (colorMotion === "green") {
                return "active_cell_green"
            } else if (colorMotion === "yellow") {
                return "active_cell_yellow"
            }
            return 'active_cell'
        } else if (lastMotionCoords) {
            if (lastMotionCoords[0] === row && lastMotionCoords[1] === column) {
                return 'motion_cell'
            } else {
                return 'cell'
            }
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