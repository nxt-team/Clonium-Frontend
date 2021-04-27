import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';
import {
    FixedLayout,
    Group,
} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";

const WaitingForStart = ({ id, go, modalOn, fetchedUser }) => {


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
                        <Icon56Users3Outline  />
                    </div>
                </div>
                <Title level="1" weight="semibold" style={{ margin: "16px 12px 6px"}} >
                    Ждём соперников
                </Title>
                <UsersStack
                    photos={[
                        'https://sun9-72.userapi.com/impg/SbMjjzso9KKdQ3mIiA2-5Tnm4ELIxymXLuaZpw/YcOTTuPNMis.jpg?size=400x500&quality=96&proxy=1&sign=4288dd5469ddee6547094663a5622f37&type=album',
                        'https://sun9-52.userapi.com/impf/c858236/v858236506/14e9ae/Gvh9pbVxcTM.jpg?size=879x736&quality=96&proxy=1&sign=561e152a479caf41c706ef7882073d65&type=album',
                    ]}
                >Ожидают 2 игроков</UsersStack>
                <div style={{display: "flex", marginTop: 8}}>
                    <Button size="l" before={<Icon24ShareOutline/>} >Позвать друзей</Button>
                    <Button size="l" style={{ marginLeft: 8 }} mode="secondary"><Icon24NotificationOutline /></Button>
                </div>
                <Group
                    description={<span>Пригласи друзей сыграть с тобой, <br/> чтобы быстрее заполнить комнату</span>}
                >
                </Group>
            </div>
            <FixedLayout vertical="bottom" >
                <div
                    style={{
                        marginBottom: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button onClick={go}  data-to="home" mode="tertiary">Покинуть комнату</Button>
                </div>
            </FixedLayout>
        </Panel>
    )
};



export default WaitingForStart;