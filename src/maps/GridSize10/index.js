import React from 'react';
import GameCell from "../../components/GameCell";

export default function Message({onCellClick, getCellContent, colorMotion, map, lastMotionCoords}) {

    const cellSize = (Math.min(document.documentElement.clientWidth, 500) - 20 - 12) / 10 // (ширина - отступы по бокам - (кол-во ячеек в ряду * 2)) / кол-во ячеек
    const cellStyle = {height: cellSize, width: cellSize}
    
    return (
        <div style={{marginLeft: 6}} > { /* */}
            <div style={{ display: 'flex' }}>
                <GameCell row={1} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={7} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={8} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={1} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={2} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={7} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={8} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={2} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={3} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={3} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={4} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={7} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={8} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={3} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={4} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={3} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={4} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={7} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={8} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={4} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={5} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={7} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={8} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={5} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={6} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={7} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={8} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={6} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={7} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={3} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={4} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={7} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={8} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={7} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={8} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={3} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={4} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={7} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={8} disabled={true} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={8} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={9} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={7} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={8} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={9} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
            <div style={{ display: 'flex' }}>
                <GameCell row={10} column={1} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={2} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={3} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={4} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={5} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={6} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={7} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={8} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={9} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
                <GameCell row={10} column={10} disabled={false} cellStyle={cellStyle} colorMotion={colorMotion} lastMotionCoords={lastMotionCoords} map={map} getCellContent={getCellContent} onCellClick={onCellClick}/>
            </div>
        </div>
    )
}