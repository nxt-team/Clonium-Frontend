import React, { useState, useEffect } from 'react';
import '../../views/main/intro.css'
import AnimatedPlayIcon from "../animatedPlayIcon";
import PlayIcon from "../playIcon";
import {
    Title, Text, Button
} from "@vkontakte/vkui";

const startJson = [
    [
        { "color": null, "state": null },
        { "color": null, "state": null },
        { "color": null, "state": null },
    ],
    [
        { "color": null, "state": null },
        { "color": "blue", "state": 1 },
        { "color": null, "state": null },
    ],
    [
        { "color": null, "state": null },
        { "color": null, "state": null },
        { "color": null, "state": null },
    ],
]

let doneCalled = false
let isAnimation = false

const GameMechanics = ({done, changeActiveModal}) => {
    const [context, setContext] = useState(<Title style={{marginTop: 12}} level="2" weight="regular">Нажми на фишку</Title>)
    const [changeContextCall, setChangeContextCall] = useState(0)

    const changeContext = () => {
        if (changeContextCall === 0) {
            setContext(<Title style={{marginTop: 12}} level="2" weight="regular">Ещё!</Title>)
            setChangeContextCall(1)
        } else if (changeContextCall === 1) {
            setContext(<Title style={{marginTop: 12}} level="2" weight="regular">Ещё! Ещё!</Title>)
            setChangeContextCall(2)
        } else if (changeContextCall === 2) {
            setContext(<Button style={{marginTop: 12}} onClick={() => changeActiveModal("gameMechanicsModal")} mode="secondary" >Показать разъяснение</Button>)
            setChangeContextCall(3)
        }
    }

    const IntroGameMap = () => {
        const [map, setMap] = useState(startJson);

        function findAnimateIcons () {
            let flag = false
            map.forEach(function(row, index, array) {
                row.forEach(function(cell, index, array) {
                    if (cell['state'] === "animate") {
                        flag = true
                        return 1
                    }
                });

                if (flag) {
                    return 1
                }
            });

            if (!flag) {
                isAnimation = false
            }
        }

        function getCellContet(row, column) {
            if (map[row - 1][column - 1]['state'] === 'animate') {
                const svgSize = 64
                let animatedIcons = []
                if (map[row - 1][column] !== undefined) {
                    animatedIcons.push(
                        <AnimatedPlayIcon
                            color={map[row - 1][column - 1]['color']}
                            svgSize={svgSize}
                            start={{
                                scale: 1.3
                            }}
                            end={{
                                rotationY: 360,
                                x: svgSize + 2,
                                duration: 1,
                                scale: 1
                            }}
                            changed={true}
                        />
                    )
                } if (map[row - 2] !== undefined) {
                    animatedIcons.push(
                        <AnimatedPlayIcon
                            color={map[row - 1][column - 1]['color']}
                            svgSize={svgSize}
                            start={{
                                scale: 1.3
                            }}
                            end={{
                                rotationX: -360,
                                y: -svgSize - 2,
                                duration: 1,
                                scale: 1
                            }}
                            changed={true}
                        />
                    )
                } if (map[row - 1][column - 2] !== undefined) {
                    animatedIcons.push(
                        <AnimatedPlayIcon
                            color={map[row - 1][column - 1]['color']}
                            svgSize={svgSize}
                            start={{
                                scale: 1.3
                            }}
                            end={{
                                rotationY: -360,
                                x: -svgSize - 2,
                                duration: 1,
                                scale: 1
                            }}
                            changed={true}
                        />
                    )
                } if (map[row] !== undefined) {
                    animatedIcons.push(
                        <AnimatedPlayIcon
                            color={map[row - 1][column - 1]['color']}
                            svgSize={svgSize}
                            start={{
                                scale: 1.3
                            }}
                            end={{
                                rotationX: 360,
                                y: svgSize + 2,
                                duration: 1,
                                scale: 1
                            }}
                            changed={true}
                        />
                    )
                }
                return animatedIcons
            } else if (map[row - 1][column - 1]['color'] !== null) {
                return <PlayIcon color={map[row - 1][column - 1]['color']} size={map[row - 1][column - 1]['state']} />
            }
        }

        function onCellClickFromUser(row, column) {
            if (!isAnimation) {
                if (map[row - 1][column - 1]['state'] === 3) {
                    isAnimation = true
                }
                onCellClick(row, column)
            }

        }

        function onCellClick(row, column) {
            if (0 < row < 9 && 0 < column < 9) {
                let newMap = map.slice();
                if (map[row - 1][column - 1]['state'] === 1) {
                    // callTapticEngine(startupParameters)
                    newMap[row - 1][column - 1]['state'] = 2;
                    setMap(newMap);
                    changeContext()
                } else if (map[row - 1][column - 1]['state'] === 2) {
                    // callTapticEngine(startupParameters)
                    newMap[row - 1][column - 1]['state'] = 3;
                    setMap(newMap);
                    changeContext()
                } else if (map[row - 1][column - 1]['state'] === 3) {
                    const color = newMap[row - 1][column - 1]['color'];
                    newMap[row - 1][column - 1]['state'] = "animate";
                    setMap(newMap)
                    changeContext()
                    // callHeavyTapticEngine(startupParameters)

                    setTimeout(() => {
                        newMap = map.slice()
                        newMap[row - 1][column - 1]['state'] = null;
                        newMap[row - 1][column - 1]['color'] = null;

                        try {
                            newMap[row - 2][column - 1]['color'] = color;
                            if (newMap[row - 2][column - 1]['state'] === null) {
                                newMap[row - 2][column - 1]['state'] = 1;
                            } else {
                                onCellClick(row - 1, column);
                            }
                        } catch (err) {}

                        try {
                            newMap[row][column - 1]['color'] = color;

                            if (newMap[row][column - 1]['state'] === null) {
                                newMap[row][column - 1]['state'] = 1;
                            } else {
                                onCellClick(row + 1, column);
                            }
                        } catch (err) {}

                        try {
                            newMap[row - 1][column - 2]['color'] = color;

                            if (newMap[row - 1][column - 2]['state'] === null) {
                                newMap[row - 1][column - 2]['state'] = 1;
                            } else {
                                onCellClick(row, column - 1);
                            }
                        } catch (err) {}

                        try {
                            newMap[row - 1][column]['color'] = color;

                            if (newMap[row - 1][column]['state'] === null) {
                                newMap[row - 1][column]['state'] = 1;
                            } else {
                                onCellClick(row, column + 1);
                            }
                        } catch (err) {}

                        findAnimateIcons()
                        setMap(newMap);
                        if (map[1][1]['state'] === null && !doneCalled) {
                            doneCalled = true
                            done()
                        }
                        changeContext()
                    }, 1500)

                }
            }
        }



        return (
            <div>
                <div style={{ display: 'flex', width: "min-content" }}>
                    <div className={'intro__cell'}  onClick={() => onCellClickFromUser(1, 1)}>
                        {getCellContet(1, 1)}
                    </div>
                    <div className={'intro__cell'} onClick={() => onCellClickFromUser(1, 2)}>
                        {getCellContet(1, 2)}
                    </div>
                    <div className={'intro__cell'} onClick={() => onCellClickFromUser(1, 3)}>
                        {getCellContet(1, 3)}
                    </div>
                </div>
                <div style={{ display: 'flex', width: "min-content" }}>
                    <div className={'intro__cell'}  onClick={() => onCellClickFromUser(2, 1)}>
                        {getCellContet(2, 1)}
                    </div>
                    <div className={'intro__cell'} onClick={() => onCellClickFromUser(2, 2)}>
                        {getCellContet(2, 2)}
                    </div>
                    <div className={'intro__cell'} onClick={() => onCellClickFromUser(2, 3)}>
                        {getCellContet(2, 3)}
                    </div>
                </div>
                <div style={{ display: 'flex', width: "min-content" }}>
                    <div className={'intro__cell'}  onClick={() => onCellClickFromUser(3, 1)}>
                        {getCellContet(3, 1)}
                    </div>
                    <div className={'intro__cell'} onClick={() => onCellClickFromUser(3, 2)}>
                        {getCellContet(3, 2)}
                    </div>
                    <div className={'intro__cell'} onClick={() => onCellClickFromUser(3, 3)}>
                        {getCellContet(3, 3)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={"centered_container"} >
            <IntroGameMap/>
            <div style={{textAlign: "center"}}>
                {context}
            </div>
        </div>
    )
}

export default GameMechanics