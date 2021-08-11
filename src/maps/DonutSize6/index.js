import React from 'react';
import GameCell from "../../components/GameCell";

export default function Message({onCellClick, getCellContent, colorMotion, map, lastMotionCoords}) {

    const cellSize = (document.documentElement.clientWidth - 12 - 12) / 6 // (ширина - отступы по бокам - (кол-во ячеек в ряду * 2)) / кол-во ячеек
    const cellStyle = {height: cellSize, width: cellSize}
    
    return (
        <div style={{marginLeft: 6}} >
            <div style={{ display: 'flex' }}>
                <GameCell row={1} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={2} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={3} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={3} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={4} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={4} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={3} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={4} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={5} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={6} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
        </div>
    )
}