import React, { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import {Icon24HelpOutline, Icon28GhostSimleOutline, Icon28TicketOutline} from '@vkontakte/icons';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {socket} from "../../api/socket";
import {reconnectUser} from "../../api/api";
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const mobile_platforms = ["mobile_android", "mobile_ipad", "mobile_iphone", "mobile_iphone_messenger"]


const AlreadyConnected = ({ id}) => {

    useEffect(() => {
        bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
    }, []);

    async function doReconnection () {
        const reconnectResult = await reconnectUser()
        bridge.send("VKWebAppStorageSet", {"key": "reloading", "value": "1"});
        console.log(reconnectResult);
        if (mobile_platforms.indexOf(startupParameters.get('vk_platform')) !== -1) {
            window.location.reload()
        } else {
            window.location.href = ''
        }

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
                textAlign: "center"
            }}>
                <div >
                    <Icon28GhostSimleOutline width={64} height={64} />
                </div>
                <Title level="1" weight="semibold" style={{ margin: "20px 12px 28px"}} >
                    Ты уже имеешь активную сессию в приложении.
                </Title>
                <div style={{display: "flex"}}>
                    <Button size="l" onClick={() => doReconnection()} >Переподключиться</Button>
                </div>
            </div>
        </Panel>
    )
};



export default AlreadyConnected;