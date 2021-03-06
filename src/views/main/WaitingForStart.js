import React, {useState, useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';
import { Icon24Copy } from '@vkontakte/icons';
import {
    FixedLayout,
    Group, Spinner, Tooltip
} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";
import {leaveFight, socket} from "../../api/socket";
import {fightInviteShare} from "../../sharing/sharing";
import bridge from "@vkontakte/vk-bridge";
import config from "../../constatnts/config.json"

const WaitingForStart = ({ id, resetSecretId, secretId, fetchedUser, needUsersInFight, updateNotifications, are_notifications_enabled, goIsolated, userBalances}) => {

    const [photos, setPhotos] = useState([])
    const [isNotificationsTooltip, setIsNotificationsTooltip] = useState(false)

    useEffect(() => {
        socket.once("avatars", (data) => {
            setPhotos(data)
        });

    })

    useEffect(() => {
        setTimeout(() => {
            if (!are_notifications_enabled && userBalances["fights"] > 1) {
                setIsNotificationsTooltip(true)
            }
        }, 7000)
    }, [])

    function notificationsOn () {
        bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 206549924, "key": "dBuBKe1kFcdemzB"})
            .then(
                () => updateNotifications()
            )
    }

    function copyFightLink (secretId) {
        bridge.send("VKWebAppCopyText", {"text": "https://vk.com/" + config["short_name"] + "#fight=" + secretId});
    }

    function getNeedPlayers () {
        let needPlayers = needUsersInFight - photos.length

        switch (needPlayers) {
            case 0:
                needPlayers = ""
                break;
            case 1:
                needPlayers = "?????????????? 1 ????????????"
                break;
            case 2:
                needPlayers = "?????????????? 2 ??????????????"
                break;
            case 3:
                needPlayers = "?????????????? 3 ??????????????"
                break;
            case 4:
                needPlayers = "?????????????? 4 ??????????????"
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
                    ???????? ????????????????????
                </Title>
                <UsersStack
                    photos={photos}
                >
                    {photos.length === 0 ? <Spinner size="small"/> : getNeedPlayers()}
                </UsersStack>
                <div style={{display: "flex", marginTop: 8}}>
                    <Button size="l" before={<Icon24ShareOutline/>} onClick={() => fightInviteShare(secretId)} >?????????????? ????????????</Button>
                    {!are_notifications_enabled
                        ?
                        <Tooltip
                            mode="light"
                            text="???????????? ??????????????????????, ?????????? ???? ???????????????????? ???????????? ??????!"
                            isShown={isNotificationsTooltip}
                            onClose={() => setIsNotificationsTooltip(false)}
                            offsetY={10}
                            offsetX={-160}
                            cornerOffset={160}
                        >
                            <Button
                                size="l"
                                style={{ marginLeft: 8 }}
                                onClick={notificationsOn}
                                mode="secondary">
                                <Icon24NotificationOutline />
                            </Button>
                        </Tooltip>
                        :
                        <Button size="l" style={{ marginLeft: 8 }} onClick={() => copyFightLink(secretId)} mode="secondary"><Icon24Copy /></Button>
                    }
                </div>
                <Group
                    description={<span>???????????????? ???????????? ?????????????? ?? ??????????, <br/> ?????????? ?????????????? ?????????????????? ??????????????</span>}
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
                    <Button onClick={() => {leaveFight(fetchedUser); resetSecretId(); setTimeout(() => goIsolated("home"), 300)}} data-to="home" mode="tertiary">???????????????? ??????????????</Button>
                </div>
            </FixedLayout>
        </Panel>
    )
};



export default WaitingForStart;