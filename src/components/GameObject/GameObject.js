import React, { useState, useEffect, memo } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './game.css'
import {
    Caption, ScreenSpinner
} from "@vkontakte/vkui";
import BasicGetCellContent from "../../gameFunctions/BasicGetCellContent";
import basicOnCellClick from "../../gameFunctions/BasicOnCellClick";
import GameScore from "../../components/GameScore";
import GetMap from "../../gameFunctions/GetMap";
import Timer from "../../components/Timer";
import {clickMap, leaveFight, socket} from "../../api/socket";
import GlobalTimer from "../../components/GlobalTimer";
import BasicGetImgCellContent from "../../gameFunctions/BasicGetImgCellContent";
import Messenger from "../../components/Messanger";
import PhraseButtons from "../../components/PhraseButtons";

let userColor = ""
let colors = []

let isRecursion = false
let lastColorMotion = "red"
let turn_time = true // true - ограничено
let isGlobalTimer = false
let game_time = 10
let serverColorMotion
let lastMotionCoords = [-1, -1]
let pieceAvatarsConfig = {
    "red": "",
    "blue": "",
    "green": "",
    "yellow": ""
}

function getColorInfo (color) {
    if (color === "blue") {
        return (
            <Caption level="2" style={{ marginLeft: 6, color: '#00D8FF' }}>
                синий
            </Caption>
        )
    } else if (color === "red") {
        return (
            <Caption level="2" style={{ marginLeft: 6, color: '#FF79CB' }}>
                красный
            </Caption>
        )
    } else if (color === "green") {
        return (
            <Caption level="2" style={{ marginLeft: 6, color: '#2EE367' }}>
                зелёный
            </Caption>
        )
    } else if (color === "yellow") {
        return (
            <Caption level="2" style={{ marginLeft: 6, color: '#FFB327' }}>
                жёлтый
            </Caption>
        )
    }
}

const GameObject = ({
                          startupParameters,
                          gameTime,
                          turnTime,
                          gameError,
                          mapName,
                          secretId,
                          fetchedUser,
                          startMap,
                          startColorMotion,
                          startColors,
                          startUserColor,
                          finishData,
                          goToEndFight,
                          fightStart,
                          userBalances,
                          usersInFight,
                          isVibration,
                      }) => {
    const [map, setMap] = useState(startMap);
    const [colorMotion, setColorMotion] = useState(startColorMotion);
    const [isAnimation, setIsAnimation] = useState(false)

    if (finishData.length !== 0 && !isAnimation) {
        game_time = 0
        goToEndFight()
        console.log("go to end fight")
    }

    useEffect(() => {
        console.log("CONNECTED COORDS")
        socket.off("cords")
        socket.off("leave")
        socket.off("kick")

        socket.on("cords", (data) => {
            console.log("cords " + data)

            console.log(
                " Color motion: " + colorMotion,
            )

            serverColorMotion = data[2]
            let flag = false
            if (map[data[0] - 1][data[1] - 1]['state'] !== 3) {
                flag = true
            }

            changeLastMotionCoords(data[0], data[1])
            onCellClick(data[0], data[1])
            changeColorMotion(lastColorMotion, true)
            if (flag) {
                console.log(lastColorMotion, serverColorMotion, " проверка на ео")
                if (serverColorMotion && lastColorMotion !== serverColorMotion) {
                    console.log("ERROR ERROR ЕО ", serverColorMotion, lastColorMotion)
                    gameError()
                }
            }
        });

        socket.on("leave", (color) => {
            console.log("LEAVE", color)

            let newMap = map.slice()
            map.forEach(function(row, rowIndex, array) {
                row.forEach(function(cell, cellIndex, array) {
                    if (cell['color'] === color) {
                        newMap[rowIndex][cellIndex]['color'] = null
                        newMap[rowIndex][cellIndex]['state'] = null
                    }
                });
            });

            setMap(newMap)
            if (lastColorMotion === color) {
                if (colors.length > 2) {
                    changeColorMotion(lastColorMotion, false)
                }
            } else {
                const colorIndex = colors.indexOf(color)
                colors.splice(colorIndex, 1)
            }

        })

        socket.on("kick", (color) => {
            console.log("KICK", color)

            if (color !== lastColorMotion) {
                console.log("ОШИБКА", color, lastColorMotion)
                gameError()
            }

            let newMap = map.slice()
            map.forEach(function(row, rowIndex, array) {
                row.forEach(function(cell, cellIndex, array) {
                    if (cell['color'] === color) {
                        newMap[rowIndex][cellIndex]['color'] = null
                        newMap[rowIndex][cellIndex]['state'] = null
                    }
                });
            });
            changeColorMotion(lastColorMotion, false)
            setMap(newMap)

        })

        lastMotionCoords = [-1, -1]
        lastColorMotion = startColorMotion
        serverColorMotion = startColorMotion
        colors = startColors
        userColor = startUserColor
        turn_time = turnTime

        usersInFight.forEach((item, i) => {
            pieceAvatarsConfig[item["color"]] = item["piece_avatar"]
        })

        setMap(map.slice())

    },[])

    function changeLastMotionCoords (row, column) {
        if (userBalances["vk_donut"] !== 0) {
            if (map[row - 1][column - 1]['state'] === 3) {
                lastMotionCoords = [-1, -1]
            } else {
                lastMotionCoords = [row, column]
            }
        }
    }

    function changeColorMotion (color, isUserChange) {

        if (isUserChange) {
            const colorMotionIndex = colors.indexOf(color)
            console.log("colorMotionIndex", colorMotionIndex)
            if (colorMotionIndex + 2 > colors.length) {
                console.log("colorMotionIndex + 2 > color.length. ->", colors[0])
                lastColorMotion = colors[0]
                setColorMotion(colors[0])
            } else {
                console.log("colorMotionIndex + 2 <= color.length, ->", colors[colorMotionIndex + 1])
                lastColorMotion = colors[colorMotionIndex + 1]
                setColorMotion(colors[colorMotionIndex + 1])
            }
        } else { // то есть цвет меняем при кике или при ливе. причем colorMotion === kickedUserColor
            const colorMotionIndex = colors.indexOf(color)
            colors.splice(colorMotionIndex, 1) // удаляем кикнутого игрока
            if (colorMotionIndex < colors.length) { // то цвет переходит следующему игроку после удаленного
                lastColorMotion = colors[colorMotionIndex]
                setColorMotion(colors[colorMotionIndex])
            } else { // удаленный игрок был последним в массиве colors. цвет переходит перому
                lastColorMotion = colors[0]
                setColorMotion(colors[0])
            }
        }
    }

    function findAnimateIcons (row, column) {
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
            isRecursion = false
            // changeColorMotion(("line 181 " + row + " " + column))
            colors.forEach((item, i) => {
                if (count(item) === 0) {
                    console.log("KILLED " + item)

                    if (lastColorMotion === item && colors.length > 2) {
                        changeColorMotion(lastColorMotion, false)
                    } else {
                        const colorIndex = colors.indexOf(item)
                        colors.splice(colorIndex, 1)
                    }
                }
            })
            setIsAnimation(false)
            if (serverColorMotion && lastColorMotion !== serverColorMotion) {
                console.log("ERROR ERROR EO ", serverColorMotion, lastColorMotion)
                gameError()
            }
        }
    }

    function getCellContent (row, column) {
        if (pieceAvatarsConfig[map[row - 1][column - 1]['color']] === "0" || map[row - 1][column - 1]['color'] === "dead") {
            return BasicGetCellContent({row, column, map})
        } else {
            return BasicGetImgCellContent({row, column, map, pieceAvatarsConfig})
        }
    }

    function onCellClick(row, column) {
        console.log("onCellClick " + row, column)
        if (map[row - 1][column - 1]['state'] === 3) {
            isRecursion = true
            setIsAnimation(true)
        }
        basicOnCellClick(row, column, map, startupParameters, setMap, onCellClick, findAnimateIcons, isVibration)
    }

    function onCellClickFromUser (row, column) {
        console.log("click from user \n", "is animation: ", isAnimation)
        if (!isAnimation && map[row - 1][column - 1]['color'] === colorMotion && colorMotion === userColor ) {
            serverColorMotion = ""
            changeLastMotionCoords(row, column)
            onCellClick(row, column)
            clickMap(secretId, fetchedUser, row, column)
            changeColorMotion(lastColorMotion, true)
        }
    }

    function count(color) {
        let result = 0;
        for (let row of map) {
            for (let column of row) {
                if (column['color'] === color) {
                    if (isNaN(column['state'])) {
                        result += 4; // animate
                    } else {
                        result += column['state'] // число
                    }
                }
            }
        }

        return result;
    }

    function translateColorMotion () {
        if (colorMotion === userColor) {
            return "Твой ход"
        } else if (colorMotion === 'red') {
            return "Ход красного"
        } else if (colorMotion === 'blue') {
            return "Ход синего"
        } else if (colorMotion === 'green') {
            return "Ход зелёного"
        } else if (colorMotion === 'yellow') {
            return "Ход жёлтого"
        }
    }

    function kickUser () {
        console.log('нужно кинкнуть ' + colorMotion)
    }

    function getMapInfo () {
        if (!isRecursion) {
            return (
                <div
                    style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Title level="1" weight="semibold">
                        {translateColorMotion()}
                    </Title>
                    {turn_time&&
                        <Timer onExpiration={() => kickUser()} colorMotion={colorMotion}  />
                    }
                </div>
            )
        } else {
            return (
                <div
                    style={{
                        marginBottom: 8,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Title level="1" weight="semibold">
                        Анимация
                    </Title>
                </div>
            )
        }
    }

    return (
        <>

            {getMapInfo()}

            <GameScore count={count} colors={colors} />
            <div style={{display: "flex", justifyContent: "center", zIndex: 5501}}>
                <div style={{maxWidth: 600, maxHeight: 600, display: "flex"}}>
                    <GetMap
                        onCellClickFromUser={onCellClickFromUser}
                        lastMotionCoords={lastMotionCoords}
                        getCellContent={getCellContent} map={map}
                        colorMotion={colorMotion}
                        mapName={mapName}
                    />
                </div>
            </div>

        </>
    )


};

const areEqual = (prevProps, nextProps) => {
    return prevProps.finishData === nextProps.finishData;
}

export default memo(GameObject, areEqual);

