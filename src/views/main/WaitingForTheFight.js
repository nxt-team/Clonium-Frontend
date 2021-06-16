import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import {
    FixedLayout,
    Group,
} from "@vkontakte/vkui";
import useInterval from "@use-it/interval";

const WaitingForTheFight = ({ id, startCount}) => {

    const [count, setCount] = useState(startCount);

    useInterval(() => {
        setCount((currentCount) => currentCount - 1);
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