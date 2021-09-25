import React from 'react';
import DonutSize6 from '../maps/DonutSize6'
import DonutSize8 from '../maps/DonutSize8'
import GridSize8 from '../maps/GridSize8'
import GridSize10 from '../maps/GridSize10'
import PassageSize10 from '../maps/PassageSize10'
import SquareSize6 from '../maps/SquareSize6'
import SquareSize8 from '../maps/SquareSize8'
import CrossSize9 from '../maps/CrossSize9'

export default function GetMap({mapName, getCellContent, onCellClickFromUser, map, colorMotion, lastMotionCoords}) {
    // console.log(mapName, getCellContent, onCellClickFromUser, onCellClickFromUser, map, colorMotion)
    if (mapName === 'DonutSize6') {
        return <DonutSize6 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    } else if (mapName === 'DonutSize8') {
        return <DonutSize8 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    } else if (mapName === 'GridSize8') {
        return <GridSize8 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    } else if (mapName === 'GridSize10') {
        return <GridSize10 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    } else if (mapName === 'PassageSize10') {
        return <PassageSize10 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    } else if (mapName === 'SquareSize6') {
        return <SquareSize6 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    } else if (mapName === 'SquareSize8') {
        return <SquareSize8 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    } else if (mapName === 'CrossSize9') {
        return <CrossSize9 onCellClick={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} />
    }
}