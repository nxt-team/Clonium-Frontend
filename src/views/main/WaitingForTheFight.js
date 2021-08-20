import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import {
    Avatar,
    FixedLayout,
    Group, SimpleCell, Spinner,
} from "@vkontakte/vkui";
import useInterval from "@use-it/interval";
import bridge from "@vkontakte/vk-bridge";
import LeaderBoardPlace from "../../components/LeaderBoardPlace";
import {Icon201CircleFillGold} from "@vkontakte/icons";
import {getAnyUser, getFight} from "../../api/api";
import PlayerPreview from "../../components/PlayerPreview";

let finalSeconds
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const WaitingForTheFight = ({ id, startCount, secretId}) => {

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

    setTimeout(() => {
        if (count > 0) {
            const timeNow = new Date()
            const secondsNow = timeNow.getSeconds() + timeNow.getMinutes() * 60
            if (count < 6) {
                const user_platform = startupParameters.get('vk_platform')
                if (user_platform === 'mobile_android' || user_platform === 'mobile_ipad' || user_platform === 'mobile_iphone' || user_platform === 'mobile_iphone_messenger') {
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