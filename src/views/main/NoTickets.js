import React, { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import { Icon28TicketOutline } from '@vkontakte/icons';
import { Icon24HelpOutline } from '@vkontakte/icons';
import {IOS, PanelHeaderButton, platform} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { Icon28GhostSimleOutline, Icon28ChevronBack, Icon24Back } from '@vkontakte/icons';
const osName = platform();



const Home = ({ id, go, changeActiveModal, fetchedUser }) => {

    useEffect(() => {
        bridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"});
    }, []);

    return (
        <Panel
            id={id}
        >
            <PanelHeader
                visor={false}
                transparent={true}
                separator={false}
                left={
                    <PanelHeaderButton onClick={go}  data-to="home">
                        {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
                    </PanelHeaderButton>
                }
            />
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
                    Кажется у кого-то <br/> нет билетов для игры
                </Title>
                <div style={{display: "flex"}}>
                    <Button size="l" onClick={() => changeActiveModal("getTicket")} before={<Icon28TicketOutline width={24} height={24} />} >Получить</Button>
                    <Button size="l" style={{ marginLeft: 8 }} mode="secondary"><Icon24HelpOutline /></Button>
                </div>
            </div>
        </Panel>
    )
};



export default Home;