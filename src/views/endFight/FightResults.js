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
    Text, Progress, FixedLayout, Spinner,
} from "@vkontakte/vkui";
import './FightResults.css'
import { Icon28FavoriteOutline } from '@vkontakte/icons';
import { Icon24CupOutline } from '@vkontakte/icons';
import { Icon28PollSquareOutline } from '@vkontakte/icons';
import {fightResultsPostShare} from "../../sharing/sharing";
import {getBeatenPlayers} from "../../api/api";

let userBalances
const FightResults = ({ id, goToMainView, beatenPlayersColors, finishData, fetchedUser, secretId, updateUserBalances, goToTemporaryBanned }) => {

    const [beatenPlayers, setBeatenPlayers] = useState(null)
    const [isSkipButtonDisabled, setIsSkipButtonDisabled] = useState(true)

    useEffect(() => {

        async function getPlayers () {
            userBalances = await updateUserBalances()
            if (beatenPlayersColors.length !== 0) {
                const bp = await getBeatenPlayers(secretId, beatenPlayersColors)
                setBeatenPlayers(bp)
                console.log(beatenPlayers)
            }
        }

        getPlayers()
        setTimeout(() => setIsSkipButtonDisabled(false), 3000)

    }, [])

    function go () {
        if (userBalances["warnings"] === 3) {
            goToTemporaryBanned()
        } else {
            goToMainView()
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
            <Div className={"fight__title__container"}>
                <Title level="1" weight="semibold">
                    Бой завершён!
                </Title>
                <Text style={{color: "var(--text_secondary)", marginTop: 4}}>Вот твои результаты:</Text>
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
                {/*<div style={{display: "flex"}} >*/}
                {/*    <div className={"result__container__vertical"}>*/}
                {/*        <div style={{display: "flex", alignItems: "center", marginLeft: 4 }} >*/}
                {/*            <div className={"icon__container"}>*/}
                {/*                <Icon24CupOutline height={28} width={28}/>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <Title level="1" weight="semibold">*/}
                {/*                    1*/}
                {/*                </Title>*/}
                {/*                <Text style={{color: "var(--text_secondary)", marginTop: 4}}>*/}
                {/*                    место ты занял*/}
                {/*                </Text>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={"result__container__vertical"} style={{marginLeft: 12}}>*/}
                {/*        <div className={"icon__container"}>*/}
                {/*            <Icon28PollSquareOutline/>*/}
                {/*        </div>*/}
                {/*        <div style={{*/}
                {/*            // display: "flex", alignItems: "center"*/}
                {/*             marginTop: 4, marginLeft: 4 }} >*/}
                {/*            <Title level="1" weight="semibold" >*/}
                {/*                3*/}
                {/*            </Title>*/}
                {/*            <Text style={{color: "var(--text_secondary)"}}>*/}
                {/*                игрока обыграно*/}
                {/*            </Text>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*</div>*/}


            </Div>

            <div style={{height: 112}}/>


            <FixedLayout vertical="bottom">
                <Div className={"buttons__container"}>
                    {finishData[1] - finishData[0] === 0
                        ?
                        <Button size="xl" onClick={goToMainView} >Завершить</Button>
                        :
                        <>
                            <Button size="xl" before={ beatenPlayers === null &&
                                <Spinner size={"m"} />
                            } disabled={beatenPlayers === null} onClick={() => fightResultsPostShare(fetchedUser.id, finishData[0], beatenPlayers)} >Похвастаться</Button>
                            <Button className={"skip__button"} disabled={isSkipButtonDisabled} style={{color: "var(--text_secondary)", marginTop: 12}} onClick={go} mode="tertiary">
                                Пропустить
                            </Button>
                        </>
                    }
                </Div>

            </FixedLayout>


        </Panel>
    )
};



export default FightResults;