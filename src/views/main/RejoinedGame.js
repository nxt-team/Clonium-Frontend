import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Icon28ErrorOutline } from '@vkontakte/icons';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './game.css'
import {IOS, platform, Caption, Separator, SimpleCell, WriteBar, WriteBarIcon} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import { Icon28MessagesOutline } from '@vkontakte/icons';
import BasicGetCellContent from "../../gameFunctions/BasicGetCellContent";
import basicOnCellClick from "../../gameFunctions/BasicOnCellClick";
import GameScore from "../../components/GameScore";
import GetMap from "../../gameFunctions/GetMap";
import Timer from "../../components/Timer";
import GridSize8Map from "../../maps/GridSize8/map.json"
import DonutSize6Map from "../../maps/DonutSize6/map.json";
import DonutSize8Map from "../../maps/DonutSize8/map.json";
import GridSize10Map from "../../maps/GridSize10/map.json";
import PassageSize10Map from "../../maps/PassageSize10/map.json";
import SquareSize6Map from "../../maps/SquareSize6/map.json";
import SquareSize8Map from "../../maps/SquareSize8/map.json";
import {getFight} from "../../api/api";
import {clickMap, kickUserSend, leaveFight, socket} from "../../api/socket";
import GlobalTimer from "../../components/GlobalTimer";
let userColor = ""
let colors = ["red", "blue", "green", "yellow"]

let isRecursion = false
let lastColorMotion = "red"
let turn_time = true // true - ограничено
let isGlobalTimer = false
let game_time = 10


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

const RejoinedGame = ({id, startupParameters, gameTime, turnTime, goToMainViewHome, mapName, secretId, fetchedUser, startMap, startColorMotion, startColors, startUserColor, finishData, goToEndFight, fightStart}) => {
    const [map, setMap] = useState(startMap);
    const [colorMotion, setColorMotion] = useState(startColorMotion);
    const [isAnimation, setIsAnimation] = useState(false)
    if (finishData.length !== 0 && !isAnimation) {
        goToEndFight()
    }


    console.log(
        " Color motion: " + colorMotion,
        "-------------!!!!!-------------"
    )

    useEffect(() => {
        console.log("CONNECTED COORDS")

        socket.on("cords", (data) => {
            console.log("cords " + data)

            console.log(
                " Color motion: " + colorMotion,
                "----------------------------"
            )
            onCellClick(data[0], data[1])
            changeColorMotion(lastColorMotion, ("line 103 " + data))

        });
    }, [])

    useEffect(() => {
        lastColorMotion = startColorMotion
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
            gameTime = gameTime - time.getSeconds() - time.getMinutes() * 60
            console.log(gameTime)
            isGlobalTimer = true
        }
        setMap(map.slice())

    },[])

    function getGlobalStartTime () {
        const now = new Date();
        const fightStartTime = new Date(fightStart)
        const time = new Date(now - fightStartTime)
        console.log(gameTime)
        console.log(fightStartTime)
        console.log(time.getSeconds() + time.getMinutes() * 60)
        gameTime = gameTime - time.getSeconds() - time.getMinutes() * 60
        console.log(gameTime)
        return gameTime
        // todo: доделать
    }

    function changeColorMotion (color, source) {

        if (color === "red") {
            setColorMotion("blue")
            lastColorMotion = "blue"
        } else if (color === "blue") {
            if (colors.indexOf("green") === -1) {
                setColorMotion( "red")
                lastColorMotion = "red"
            } else {
                setColorMotion( "green")
                lastColorMotion = "green"
            }
        } else if (color === "green") {
            if (colors.indexOf("yellow") === -1) {
                setColorMotion( "red")
                lastColorMotion = "red"
            } else {
                setColorMotion( "yellow")
                lastColorMotion = "yellow"
            }
        } else if (color === "yellow") {
            setColorMotion( "red")
            lastColorMotion = "red"
        } else {
            console.log("COLOR MOTION CHANGED ERROR to ", color, lastColorMotion, source )
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
                    const colorMotionIndex = colors.indexOf(item)
                    colors.splice(colorMotionIndex, 1)
                    if (item === colorMotion) {
                        changeColorMotion(lastColorMotion)
                    }
                }
            })
            setIsAnimation(false)
        }

        console.log("FLag: " + flag)
    }

    function getCellContent (row, column) {
        return BasicGetCellContent({row, column, map})
    }

    function onCellClick(row, column) {
        console.log(
            "main on cell click" + row, column + " \n",
            " Color motion: " + colorMotion,
            "----------------------------"
        )

        // if ( map[row - 1][column - 1]['color'] === colorMotion) { //  && colorMotion === userColor
        // 	console.log("making onCellClick")
        if (map[row - 1][column - 1]['state'] === 3) {
            isRecursion = true
            setIsAnimation(true)
        }
        basicOnCellClick(row, column, map, startupParameters, setMap, onCellClick, findAnimateIcons)
        if (!isAnimation) {
            // changeColorMotion(("line 212 " + row + " " + column))

        }
        // }
    }

    function onCellClickFromUser (row, column) {
        console.log("click from user \n", "is animation: ", isAnimation)
        if (!isAnimation && map[row - 1][column - 1]['color'] === colorMotion && colorMotion === userColor ) {
            onCellClick(row, column)
            clickMap(secretId, fetchedUser, row, column)
            changeColorMotion(lastColorMotion, ("line 217 " + row + " " + column))
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
        if (!isAnimation) {
            console.log('нужно кинкнуть ' + colorMotion)
            let newMap = map.slice()
            map.forEach(function(row, rowIndex, array) {
                row.forEach(function(cell, cellIndex, array) {
                    if (cell['color'] === colorMotion) {
                        newMap[rowIndex][cellIndex]['color'] = null
                        newMap[rowIndex][cellIndex]['state'] = null
                    }
                });
            });

            kickUserSend(colorMotion, secretId)

            const colorMotionIndex = colors.indexOf(colorMotion)
            colors.splice(colorMotionIndex, 1)
            setMap(newMap)
            changeColorMotion(lastColorMotion, "kik user")
        }
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
                    <Timer onExpiration={() => kickUser()} colorMotion={colorMotion} />
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

            <GameScore count={count} />
            <GetMap onCellClickFromUser={onCellClickFromUser} getCellContent={getCellContent} map={map} colorMotion={colorMotion} mapName={mapName}/>

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
                <div style={{backgroundColor: "var(--content_tint_background)", padding: "8px 12px", marginLeft: 10, borderRadius: 10, display: "flex"}} >
                    <Caption level="2" style={{ color: "var(--text_secondary)"}} weight="regular">
                        До конца боя:
                    </Caption>
                    {isGlobalTimer&&
                        <GlobalTimer gameTime={getGlobalStartTime()}/>
                    }
                </div>
            </div>

            <div
                style={{
                    marginTop: 12,
                    marginBottom: 24,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Button onClick={() => {leaveFight(fetchedUser); setTimeout(() => goToMainViewHome(), 300)}} mode="tertiary">Сдаться</Button>
            </div>
        </Panel>
    );
};

export default RejoinedGame;

