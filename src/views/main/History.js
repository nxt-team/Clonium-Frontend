import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './achievements.css'
import { Icon28Dice4Outline } from '@vkontakte/icons';
import { Icon28ArrowRightOutline } from '@vkontakte/icons';
import {
    PanelHeaderButton,
    SimpleCell,
} from "@vkontakte/vkui";
import { Icon28AchievementCircleFillBlue } from '@vkontakte/icons';
import { Icon28Flash } from '@vkontakte/icons';



const History = ({ id, go, modalOn, fetchedUser }) => {

    return (
        <Panel
            id={id}
        >
            <PanelHeader
                separator={false}
                left={
                    <PanelHeaderButton onClick={() => window.history.back()} data-to="home">
                        <Icon28ArrowRightOutline />
                    </PanelHeaderButton>
                }
            />
            <Title level="1" weight="semibold" style={{ marginLeft: "12px", marginBottom: 6}} >
                История
            </Title>
            <SimpleCell before={<Icon28Dice4Outline/>} after="+1 опыт" description="3 место">Бой | 4 игрока</SimpleCell>
            <SimpleCell before={<Icon28AchievementCircleFillBlue/>} after="+20 опыта" description="за достижение">Награда</SimpleCell>
            <SimpleCell before={<Icon28AchievementCircleFillBlue/>} after="+10 опыта" description="за супербой">Награда</SimpleCell>
            <SimpleCell before={<Icon28Flash/>} after="+3 билета" description="ежедневный">Бонус</SimpleCell>
            <SimpleCell before={<Icon28Flash/>} after="+1 билет" description="выполнение задания">Бонус</SimpleCell>
            <SimpleCell before={<Icon28Flash/>} after="+1 билет" description="актвация промокода">Бонус</SimpleCell>


        </Panel>
    )
};



export default History;