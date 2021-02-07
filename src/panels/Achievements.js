import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import { Icon28TicketOutline } from '@vkontakte/icons';
import { Icon24HelpOutline } from '@vkontakte/icons';
import { motion } from "framer-motion"
import { Icon28ArrowRightOutline } from '@vkontakte/icons';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';
import {Avatar, Div, FixedLayout, Group, IOS, PanelHeaderButton, platform, Separator, Tabs, TabsItem} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import { Icon28GhostSimleOutline, Icon28ChevronBack, Icon24Back } from '@vkontakte/icons';
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";
import Icon28Notifications from "@vkontakte/icons/dist/28/notifications";
const osName = platform();



const Home = ({ id, go, modalOn, fetchedUser }) => {
    const [activeTab, setActiveTab] = useState('available');

    return (
        <Panel
            id={id}
        >
            <PanelHeader
                separator={false}
                left={
                    <PanelHeaderButton onClick={go} data-to="home2">
                        <Icon28ArrowRightOutline />
                    </PanelHeaderButton>
                }
            />
            <Title level="1" weight="semibold" style={{ marginLeft: "12px", marginBottom: 6}} >
                Достижения
            </Title>
            <Tabs mode="buttons">
                <TabsItem
                    onClick={() => setActiveTab('available')}
                    selected={activeTab === 'available'}
                >
                    Доступные
                </TabsItem>
                <TabsItem
                    onClick={() => setActiveTab('completed')}
                    selected={activeTab === 'completed'}
                >
                    Выполненные
                </TabsItem>
            </Tabs>
        </Panel>
    )
};



export default Home;