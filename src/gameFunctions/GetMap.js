import React from 'react';
import DonutSize6 from '../maps/DonutSize6'
import DonutSize8 from '../maps/DonutSize8'
import GridSize8 from '../maps/GridSize8'
import GridSize10 from '../maps/GridSize10'
import PassageSize10 from '../maps/PassageSize10'
import SquareSize6 from '../maps/SquareSize6'
import SquareSize8 from '../maps/SquareSize8'

export default function GetMap({mapName, getCellContent, onCellClick}) {
    console.log('GetMap')
    if (mapName === 'DonutSize6') {
        return <DonutSize6 getCellContent={getCellContent} onCellClick={onCellClick} />
    } else if (mapName === 'DonutSize8') {
        return <DonutSize8 getCellContent={getCellContent} onCellClick={onCellClick} />
    } else if (mapName === 'GridSize8') {
        return <GridSize8 getCellContent={getCellContent} onCellClick={onCellClick} />
    } else if (mapName === 'GridSize10') {
        return <GridSize10 getCellContent={getCellContent} onCellClick={onCellClick} />
    } else if (mapName === 'PassageSize10') {
        return <PassageSize10 getCellContent={getCellContent} onCellClick={onCellClick} />
    } else if (mapName === 'SquareSize6') {
        return <SquareSize6 getCellContent={getCellContent} onCellClick={onCellClick} />
    } else if (mapName === 'SquareSize8') {
        return <SquareSize8 getCellContent={getCellContent} onCellClick={onCellClick} />
    }
}