import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './game.css'
import {
    Caption
} from "@vkontakte/vkui";
import BasicGetCellContent from "../../gameFunctions/BasicGetCellContent";
import basicOnCellClick from "../../gameFunctions/BasicOnCellClick";
import GameScore from "../../components/GameScore";
import GetMap from "../../gameFunctions/GetMap";
import Timer from "../../components/Timer";
import {clickMap, leaveFight, socket} from "../../api/socket";
import GlobalTimer from "../../components/GlobalTimer";
import BasicGetImgCellContent from "../../gameFunctions/BasicGetImgCellContent";

let userColor = ""
let colors = []

let isRecursion = false
let lastColorMotion = "red"
let turn_time = true // true - ограничено
let isGlobalTimer = false
let game_time = 10
let beatenPlayers = []
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

const RejoinedGame = ({
                          id,
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
                          startGameTimer
}) => {
    const [map, setMap] = useState(startMap);
    const [colorMotion, setColorMotion] = useState(startColorMotion);
    const [isAnimation, setIsAnimation] = useState(false)

    if (finishData.length !== 0 && !isAnimation) {
        goToEndFight(beatenPlayers)
        console.log("go to end fight")
        console.log(beatenPlayers)
    }

    // console.log("TIME", isGlobalTimer, game_time)
    // console.log(
    //     " Color motion: " + colorMotion,
    // )

    useEffect(() => {
        console.log("CONNECTED COORDS")

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

            beatenPlayers.push(color)

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
                changeColorMotion(lastColorMotion, false)
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
        if (gameTime === -1) {
            isGlobalTimer = false
        } else {
            const now = new Date();
            const fightStartTime = new Date(fightStart)
            const time = new Date(now - fightStartTime)
            console.log(gameTime)
            console.log(fightStartTime)
            console.log(time.getSeconds() + time.getMinutes() * 60)
            game_time = gameTime - time.getSeconds() - time.getMinutes() * 60
            console.log(game_time)
            isGlobalTimer = true
        }

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

    function countBeatenPlayers () {
        const basicColors = ["red", "blue", "green", "yellow"]
        const userPoints = count(userColor)
        const userColorIndex = basicColors.indexOf(userColor)
        console.log(beatenPlayers, userPoints, userColorIndex)

        colors.forEach((color) => {
            if (color !== userColor) {
                console.log(count(color), basicColors.indexOf(color))
                if (count(color) < userPoints) {
                    beatenPlayers.push(color)
                } else if (count(color) === userPoints && userColorIndex < basicColors.indexOf(color)) {
                    beatenPlayers.push(color)
                }
            }
        })
        console.log(beatenPlayers)
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
                    if (item !== userColor) {
                        beatenPlayers.push(item)
                    }

                    if (lastColorMotion === item) {
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
        console.log(
            "onCellClick " + row, column)

        // if ( map[row - 1][column - 1]['color'] === colorMotion) { //  && colorMotion === userColor
        // 	console.log("making onCellClick")
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
        // if (!isAnimation) {
        //     console.log('нужно кинкнуть ' + colorMotion)
        //     if (colorMotion !== userColor) {
        //         beatenPlayers.push(colorMotion)
        //     }
        //     let newMap = map.slice()
        //     map.forEach(function(row, rowIndex, array) {
        //         row.forEach(function(cell, cellIndex, array) {
        //             if (cell['color'] === colorMotion) {
        //                 newMap[rowIndex][cellIndex]['color'] = null
        //                 newMap[rowIndex][cellIndex]['state'] = null
        //             }
        //         });
        //     });
        //
        //     kickUserSend(colorMotion, secretId)
        //
        //     changeColorMotion(lastColorMotion, false)
        //     setMap(newMap)
        // }
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
        <Panel id={id}>
            <PanelHeader
                separator={false}
                transparent={true}
                // left={<PanelHeaderButton onClick={() => changeActiveModal('messanger')}>
                // 	<Icon28MessagesOutline/>
                // </PanelHeaderButton>}
            >
            </PanelHeader>

            {getMapInfo()}

            <GameScore count={count} colors={colors} />
            <GetMap onCellClickFromUser={onCellClickFromUser}  lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} mapName={mapName}/>

            {/*<PhraseButtons doPhrase={doPhrase} />*/}
            {/*<Separator wide={false}/>*/}
            <div
                style={{
                    marginBottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 12,
                }}
            >
                <div style={{backgroundColor: "var(--content_tint_background)", padding: "8px 12px", borderRadius: 10, display: "flex"}} >
                    <Caption level="2" style={{ color: "var(--text_secondary)"}} weight="regular">
                        Твой цвет:
                    </Caption>
                    {getColorInfo(userColor)}
                </div>
                {isGlobalTimer &&
                <div style={{
                    backgroundColor: "var(--content_tint_background)",
                    padding: "8px 12px",
                    marginLeft: 10,
                    borderRadius: 10,
                    display: "flex"
                }}>
                    <Caption level="2" style={{color: "var(--text_secondary)"}} weight="regular">
                        До конца боя:
                    </Caption>
                    <GlobalTimer time={game_time}/>

                </div>
                }
            </div>

            <div
                style={{
                    marginTop: 12,
                    marginBottom: 24,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => leaveFight(fetchedUser)} mode="tertiary">Сдаться</Button>
            </div>
        </Panel>
    )


};

export default RejoinedGame;

