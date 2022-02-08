import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './game.css'
import {
    Caption, FixedLayout, ScreenSpinner
} from "@vkontakte/vkui";
import toaster from "toasted-notes";
import BasicGetCellContent from "../../gameFunctions/BasicGetCellContent";
import basicOnCellClick from "../../gameFunctions/BasicOnCellClick";
import GameScore from "../../components/GameScore";
import GetMap from "../../gameFunctions/GetMap";
import Timer from "../../components/Timer";
import {clickMap, leaveFight, sendPhrase, socket} from "../../api/socket";
import GlobalTimer from "../../components/GlobalTimer";
import BasicGetImgCellContent from "../../gameFunctions/BasicGetImgCellContent";
import Messenger from "../../components/Messanger";
import PhraseButtons from "../../components/PhraseButtons";
import GameObject from "../../components/GameObject/GameObject";

import PhrasesOpenButton from "../../components/PhrasesOpenButton";
import Phrase from "../../components/Phrase";
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
                          setPopout,
                          errorSnackBar
}) => {
    const [arePhrases, setArePhrases] = useState(false)
    const [sendingDisabled, setSendingDisabled] = useState(false)
    useEffect(() => {
        socket.on("messages", (phrase) => {
            console.log(phrase)
            toaster.notify(<Phrase text={phrase[1]} phraseColor={phrase[0]} /> , {
                position: "bottom-left",
                duration: 2500
            })
            setArePhrases(false)
            setSendingDisabled(true)
            setTimeout(() => setSendingDisabled(false), 2000)
        })
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
    }, [])

    function checkAndSend(phrase) {
        setArePhrases(false)
        if (phrase["isForDonuts"] && !userBalances["vk_donut"]) {
            errorSnackBar("Доступно оформившим Clonium Pass")
        } else {
            sendPhrase(phrase["id"])
            setSendingDisabled(true)
            toaster.notify(<Phrase text={phrase["text"]} phraseColor={startUserColor} /> , {
                position: "bottom-left",
                duration: 2500
            })
            setTimeout(() => setSendingDisabled(false), 2000)
        }
    }

    return (
        <Panel id={id}>
            {startupParameters.get('vk_platform') !== "desktop_web"
                ?
                <PanelHeader
                    separator={false}
                    transparent={true}
                >
                </PanelHeader>
                :
                <div style={{height: 16}} />
            }



            <GameObject
                isVibration={isVibration}
                fetchedUser={fetchedUser}
                secretId={secretId}
                startupParameters={startupParameters}
                goToEndFight={goToEndFight}
                mapName={mapName}
                startMap={startMap}
                startColorMotion={startColorMotion}
                startColors={startColors}
                startUserColor={startUserColor}
                finishData={finishData}
                gameTime={gameTime}
                turnTime={turnTime}
                fightStart={fightStart}
                userBalances={userBalances}
                usersInFight={usersInFight}
                gameError={gameError}
                setPopout={setPopout}
            />
            {!arePhrases &&
                <>
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
                        {getColorInfo(startUserColor)}
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
                        marginBottom: 12,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        style={{zIndex: 5}}
                        onClick={() => leaveFight(fetchedUser)} mode="tertiary"
                    >Сдаться</Button>
                </div>
                </>
            }

            <FixedLayout onClick={() => console.log("clicked #2")} vertical="bottom">
                <PhraseButtons
                    arePhrases={arePhrases}
                    checkAndSend={checkAndSend}
                />
                <PhrasesOpenButton
                    onClick={() => !sendingDisabled && setArePhrases(!arePhrases)}
                    arePhrases={arePhrases}
                    disabled={sendingDisabled}
                />
            </FixedLayout>
        </Panel>
    )


};

export default RejoinedGame;

