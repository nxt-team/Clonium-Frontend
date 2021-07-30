import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import {
    Group,
} from "@vkontakte/vkui";
import useInterval from "@use-it/interval";
import bridge from "@vkontakte/vk-bridge";

let finalSeconds
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const WaitingForTheFight = ({ id, startCount}) => {

    const [count, setCount] = useState(startCount);

    useEffect(() => {
        const timeNow = new Date()
        finalSeconds = timeNow.getSeconds() + timeNow.getMinutes() * 60 + startCount

    }, [])

    useInterval(() => {
        if (count > 0) {
            const timeNow = new Date()
            const secondsNow = timeNow.getSeconds() + timeNow.getMinutes() * 60
            setCount(finalSeconds - secondsNow);
            if (count < 5) {
                const user_platform = startupParameters.get('vk_platform')
                if (user_platform === 'mobile_android' || user_platform === 'mobile_ipad' || user_platform === 'mobile_iphone' || user_platform === 'mobile_iphone_messenger') {
                    bridge.send("VKWebAppTapticImpactOccurred", {"style": "medium"});
                }
            }
        }
    }, 1000);

    return (
        <Panel
            id={id}
        >
            <div style={{
                width: "100vw",
                height: "90vh",
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
        </Panel>
    )
};



export default WaitingForTheFight;