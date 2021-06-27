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
import {fightInviteShare} from "../../sharing/sharing";
import bridge from "@vkontakte/vk-bridge";

const WaitingForStart = ({ id, go, secretId, fetchedUser, needUsersInFight, updateNotifications}) => {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        socket.once("avatars", (data) => {
            setPhotos(data)
        });
    })

    function notificationsOn () {
        bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 199025669, "key": "dBuBKe1kFcdemzB"})
            .then(
                () => updateNotifications()
            )
    }

    function getNeedPlayers () {
        let needPlayers = needUsersInFight - photos.length

        switch (needPlayers) {
            case 0:
                needPlayers = ""
                break;
            case 1:
                needPlayers = "ожидаем 1 игрока"
                break;
            case 2:
                needPlayers = "ожидаем 2 игроков"
                break;
            case 3:
                needPlayers = "ожидаем 3 игроков"
                break;
            case 4:
                needPlayers = "ожидаем 4 игроков"
                break;
        }

        return needPlayers
    }


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
                >{getNeedPlayers()}</UsersStack>
                <div style={{display: "flex", marginTop: 8}}>
                    <Button size="l" before={<Icon24ShareOutline/>} onClick={() => fightInviteShare(secretId)} >Позвать друзей</Button>
                    <Button size="l" style={{ marginLeft: 8 }} onClick={notificationsOn} mode="secondary"><Icon24NotificationOutline /></Button>
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