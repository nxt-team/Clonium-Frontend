import React from 'react';

const cellSize = (window.innerWidth - 16 - 12) / 8 // (ширина - отступы по бокам - (кол-во ячеек в ряду * 2)) / кол-во ячеек
const cellStyle = {height: cellSize, width: cellSize}

export default function Message({onCellClick, getCellContent}) {
    
    return (
        <div style={{marginLeft: 6}} > { /* */}
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'}  onClick={() => onCellClick(1, 1)}>
                    {getCellContent(1, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 2)}>
                    {getCellContent(1, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 3)}>
                    {getCellContent(1, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 4)}>
                    {getCellContent(1, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 5)}>
                    {getCellContent(1, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 6)}>
                    {getCellContent(1, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 7)}>
                    {getCellContent(1, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 8)}>
                    {getCellContent(1, 8)}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 1)}>
                    {getCellContent(2, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 2)}>
                    {getCellContent(2, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 3)}>
                    {getCellContent(2, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 4)}>
                    {getCellContent(2, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 5)}>
                    {getCellContent(2, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 6)}>
                    {getCellContent(2, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 7)}>
                    {getCellContent(2, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 8)}>
                    {getCellContent(2, 8)}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 1)}>
                    {getCellContent(3, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 2)}>
                    {getCellContent(3, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 3)}>
                    {getCellContent(3, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 4)}>
                    {getCellContent(3, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 5)}>
                    {getCellContent(3, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 6)}>
                    {getCellContent(3, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 7)}>
                    {getCellContent(3, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 8)}>
                    {getCellContent(3, 8)}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 1)}>
                    {getCellContent(4, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 2)}>
                    {getCellContent(4, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 3)}>
                    {getCellContent(4, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 4)}>
                    {getCellContent(4, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 5)}>
                    {getCellContent(4, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 6)}>
                    {getCellContent(4, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 7)}>
                    {getCellContent(4, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 8)}>
                    {getCellContent(4, 8)}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 1)}>
                    {getCellContent(5, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 2)}>
                    {getCellContent(5, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 3)}>
                    {getCellContent(5, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 4)}>
                    {getCellContent(5, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 5)}>
                    {getCellContent(5, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 6)}>
                    {getCellContent(5, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 7)}>
                    {getCellContent(5, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 8)}>
                    {getCellContent(5, 8)}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 1)}>
                    {getCellContent(6, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 2)}>
                    {getCellContent(6, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 3)}>
                    {getCellContent(6, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 4)}>
                    {getCellContent(6, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 5)}>
                    {getCellContent(6, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 6)}>
                    {getCellContent(6, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 7)}>
                    {getCellContent(6, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 8)}>
                    {getCellContent(6, 8)}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 1)}>
                    {getCellContent(7, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 2)}>
                    {getCellContent(7, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 3)}>
                    {getCellContent(7, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 4)}>
                    {getCellContent(7, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 5)}>
                    {getCellContent(7, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 6)}>
                    {getCellContent(7, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 7)}>
                    {getCellContent(7, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 8)}>
                    {getCellContent(7, 8)}
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 1)}>
                    {getCellContent(8, 1)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 2)}>
                    {getCellContent(8, 2)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 3)}>
                    {getCellContent(8, 3)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 4)}>
                    {getCellContent(8, 4)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 5)}>
                    {getCellContent(8, 5)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 6)}>
                    {getCellContent(8, 6)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 7)}>
                    {getCellContent(8, 7)}
                </div>
                <div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 8)}>
                    {getCellContent(8, 8)}
                </div>
            </div>
        </div>
    )
}