import React, { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import {Icon24HelpOutline, Icon28GhostSimleOutline, Icon28TicketOutline} from '@vkontakte/icons';
import Button from "@vkontakte/vkui/dist/components/Button/Button";



const TemporaryBanned = ({ id, oursForUnban}) => {

    useEffect(() => {
        bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
    }, []);

    function getTitle () {
        if (oursForUnban % 10 === 1) {
            return "Ты был временно заблокирован за неактивность в 3 играх. До разблокировки осталось менее " + oursForUnban + " часа."
        } else {
            return "Ты был временно заблокирован за неактивность в 3 играх. До разблокировки осталось менее " + oursForUnban + " часов."
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
                <Title level="2" weight="regular" style={{ margin: "20px 12px 28px"}} >
                    {getTitle()}
                </Title>
                <div style={{display: "flex"}}>
                    <Button size="l" target="_blank" href="https://vk.me/pipeweb" >Тех. поддержка</Button>
                </div>
            </div>
        </Panel>
    )
};



export default TemporaryBanned;