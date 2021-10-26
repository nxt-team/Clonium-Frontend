import React, { useState, useEffect} from 'react';
import {
    PanelHeader,
    Title,
    Panel,
    WriteBar,
    Div,
    Slider,
    WriteBarIcon,
    Button,
    Text, Progress, FixedLayout, Spinner, SimpleCell,
} from "@vkontakte/vkui";
import './FightResults.css'
import {Icon28FavoriteOutline, Icon28PaletteOutline} from '@vkontakte/icons';
import { Icon24CupOutline } from '@vkontakte/icons';
import { Icon28PollSquareOutline } from '@vkontakte/icons';
import {fightResultsNativeStoryShare, fightResultsPostShare} from "../../sharing/sharing";
import {getBeatenPlayers} from "../../api/api";
import { Icon28StoryOutline } from '@vkontakte/icons';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';

let userBalances
const FightResults = ({ id, goToMainView, beatenPlayersColors, finishData, changeActiveModal, fetchedUser, updateUserBalances, goToTemporaryBanned, resetSecretId, resetBeatenPlayers, completeSnackBar, screenSpinnerOff, screenSpinnerOn }) => {

    const [beatenPlayers, setBeatenPlayers] = useState(null)

    useEffect(() => {

        async function getPlayers () {
            userBalances = await updateUserBalances()
            if (beatenPlayersColors.length !== 0) {
                // const bp = await getBeatenPlayers(secretId, beatenPlayersColors)
                setBeatenPlayers(beatenPlayersColors)
                console.log(beatenPlayers)
            }
            resetSecretId()
        }

        getPlayers()

    }, [])

    function go () {
        resetBeatenPlayers()
        if (userBalances["warnings"] === 3) {
            goToTemporaryBanned()
        } else {
            goToMainView()
        }
    }

    function share () {
        if (fetchedUser.id % 2 === 1) {
            changeActiveModal("fightResultsStoryShare")
        } else {
            let theme
            if (document.body.getAttribute("scheme") === "client_light" || document.body.getAttribute("scheme") === "bright_light") {
                theme = "bright"
            } else {
                theme = "dark"
            }
            screenSpinnerOn()
            fightResultsNativeStoryShare(
                screenSpinnerOff,
                completeSnackBar,
                updateUserBalances,
                beatenPlayers,
                fetchedUser.photo_200,
                theme,
                Math.floor(Math.random() * 3)
            )
        }
    }

    return (
        <Panel
            id={id}
            >
            <PanelHeader
                separator={false}
                transparent={true}
            />
            <div id="d2">аа</div>
            <div id="d1">.</div>
            <Div className={"fight__title__container"}>
                <Title level="1" weight="semibold">
                    Бой завершён!
                </Title>
                <Text style={{color: "var(--text_secondary)", marginTop: 4}}>{finishData[3]}</Text>
            </Div>


            <Div>
                <div className={"result__container"} >
                    <div className={"icon__container"}>
                        <Icon28FavoriteOutline/>
                    </div>
                    <div>
                        <Title level="1" weight="semibold">
                            {finishData[2]}
                        </Title>
                        <Text style={{color: "var(--text_secondary)", marginTop: 4}}>
                            опыта ты получаешь
                        </Text>
                    </div>
                </div>
                <div className={"result__container"} >
                    <div className={"icon__container"}>
                        <Icon24CupOutline height={28} width={28}/>
                    </div>
                    <div>
                        <Title level="1" weight="semibold">
                            {finishData[0]}
                        </Title>
                        <Text style={{color: "var(--text_secondary)", marginTop: 4}}>
                            место занял
                        </Text>
                    </div>
                </div>
                <div className={"result__container"} >
                    <div className={"icon__container"}>
                        <Icon28PollSquareOutline/>
                    </div>
                    <div>
                        <Title level="1" weight="semibold">
                            {finishData[1] - finishData[0]}
                        </Title>
                        <Text style={{color: "var(--text_secondary)", marginTop: 4}}>
                            игроков обыграл
                        </Text>
                    </div>
                </div>


            </Div>
            {finishData[1] - finishData[0] !== 0 &&
                <SimpleCell multiline={true} before={<Icon28InfoCircleOutline/>} disabled={true} >Получи 3 билета, поделившись результатом боя</SimpleCell>
            }


            <Div className={"buttons__container"}>
                {finishData[1] - finishData[0] === 0
                    ?
                    <Button size="xl" onClick={goToMainView} >Завершить</Button>
                    :
                    <>
                        <Button
                            size="xl"
                            before={ beatenPlayers === null &&
                                <Spinner size={"m"} />
                            }
                            disabled={beatenPlayers === null}
                            onClick={share}
                        >
                            Поделиться результатом
                        </Button>
                        <Button style={{marginTop: 12}} onClick={go} mode="tertiary">
                            Завершить
                        </Button>
                    </>
                }
            </Div>


        </Panel>
    )
};



export default FightResults;