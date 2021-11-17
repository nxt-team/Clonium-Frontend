import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import {
    Avatar, Caption,
    FixedLayout, Gallery,
    Group, SimpleCell, Spinner, Text,
} from "@vkontakte/vkui";
import useInterval from "@use-it/interval";
import bridge from "@vkontakte/vk-bridge";
import LeaderBoardPlace from "../../components/LeaderBoardPlace";
import {Icon201CircleFillGold} from "@vkontakte/icons";
import {getAnyUser, getFight} from "../../api/api";
import PlayerPreview from "../../components/PlayerPreview";
const mobile_platforms = ["mobile_android", "mobile_ipad", "mobile_iphone", "mobile_iphone_messenger"]

let finalSeconds
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const WaitingForTheFight = ({ id, startCount, secretId, isVibration}) => {

    const [count, setCount] = useState(startCount);
    const [players, setPlayers] = useState([]);

    async function getData () {
        const fight = await getFight(secretId)
        setPlayers(fight["users"])
    }

    useEffect(() => {
        const timeNow = new Date()
        finalSeconds = 0
        finalSeconds = timeNow.getSeconds() + timeNow.getMinutes() * 60 + startCount
        getData()
    }, [])

    console.log(Math.floor(count / 2))

    setTimeout(() => {
        if (count > 0) {
            const timeNow = new Date()
            const secondsNow = timeNow.getSeconds() + timeNow.getMinutes() * 60
            if (count < 6) {
                const user_platform = startupParameters.get('vk_platform')
                if (mobile_platforms.indexOf(user_platform) !== -1 && isVibration) {
                    bridge.send("VKWebAppTapticImpactOccurred", {"style": "medium"});
                }
            }
            setCount(finalSeconds - secondsNow);
        }
    }, 1000);

    function renderPlayers () {
        if (players.length === 0) {
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{ marginTop: 20 }} />
                </div>
            )
        }
        else {
            let content = []
            players.forEach((item, index) => {
                content.push(
                    <PlayerPreview
                        color={item["color"]}
                        rank={item["rank"]}
                        userName={item["username"]}
                        avaUrl={item["avatar"]}
                        pieceAvatarUrl={item["piece_avatar"]}
                        vkDonut={item["vk_donut"]} />
                )
            })
            return content
        }
    }

    function getHeight () {
        if (players.length === 0) {
            return 104
        } else {
            return document.getElementById('players_container').clientHeight
        }
    }

    return (
        <Panel
            id={id}
        >
            <div style={{
                width: "100vw",
                height: "calc(100vh - " + getHeight() + "px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <div className={'pulseHover'} >
                    <div className="pulse" >
                        <Title level="1" weight="semibold" style={{fontSize: 32, lineHeight: "36px"}}>
                            {count}
                        </Title>
                    </div>
                </div>
                <Group
                    description={<span>до боя осталось</span>}
                >
                </Group>
            </div>

            <FixedLayout style={{backgroundColor: "var(--background_light)", borderRadius: "20px 20px 0 0"}}
                         vertical="bottom" id="players_container" >
                <div className={"players_container"} >
                    <Gallery
                        align="center"
                        style={{ height: "100%" }}
                        slideIndex={Math.abs(Math.floor(count / 4) - 6) % 5}
                        onChange={() => console.log("a")}
                    >
                        <Caption level="1" weight="semibold" className={"advice"} >
                            Серые фишки - мертвые фишки, за них никто не играет
                        </Caption>
                        <Caption level="1" weight="semibold" className={"advice"} >
                            Чем сильнее обыгранные соперники, тем больше рейтинга получишь ты за бой
                        </Caption>
                        <Caption level="1" weight="semibold" className={"advice"} >
                            Быстро получить опыт можно выполнив задания достижений
                        </Caption>
                        <Caption level="1" weight="semibold" className={"advice"} >
                            Вернуть билет можно, поделившись результатами боя
                        </Caption>
                        <Caption level="1" weight="semibold" className={"advice"} >
                            Твой рейтинг может подняться даже если ты занимаешь не первое место
                        </Caption>
                        <Caption level="1" weight="semibold" className={"advice"} >
                            Для игры с друзьями, создай приватную комнату со своими настройками
                        </Caption>
                    </Gallery>
                    <Title level="1" weight="semibold" style={{marginLeft: 16, width: "100vw", marginBottom: 4}}>
                        Игроки
                    </Title>
                    {renderPlayers()}
                </div>
            </FixedLayout>


        </Panel>
    )
};



export default WaitingForTheFight;