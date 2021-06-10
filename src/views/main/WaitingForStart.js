import React, {useState, useEffect} from 'react';
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
import {leaveFight, socket} from "../../api/socket";

const WaitingForStart = ({ id, go, modalOn, fetchedUser }) => {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        socket.once("avatars", (data) => {
            setPhotos(data)
            console.log("avatars", data)
        });
    })


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
                    photos={photos}
                >Ожидаем 2 игроков</UsersStack>
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
                    <Button onClick={() => {leaveFight(fetchedUser); setTimeout(() => window.history.back(), 300)}} data-to="home" mode="tertiary">Покинуть комнату</Button>
                </div>
            </FixedLayout>
        </Panel>
    )
};



export default WaitingForStart;