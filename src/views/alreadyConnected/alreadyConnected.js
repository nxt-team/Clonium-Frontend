import React, { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import { Icon28GhostSimleOutline} from '@vkontakte/icons';



const AlreadyConnected = ({ id}) => {

    useEffect(() => {
        bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
    }, []);

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
                    Ты был заблокирован, либо уже имеешь активную сессию в приложении.
                </Title>
            </div>
        </Panel>
    )
};



export default AlreadyConnected;