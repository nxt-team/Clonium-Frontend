import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './achievements.css'
import { Icon28Dice4Outline } from '@vkontakte/icons';
import { Icon28ArrowRightOutline } from '@vkontakte/icons';
import { Icon28CancelCircleFillRed } from '@vkontakte/icons';
import {
    Footer,
    PanelHeaderButton,
    SimpleCell,
    Spinner,
} from "@vkontakte/vkui";
import { Icon28AchievementCircleFillBlue } from '@vkontakte/icons';
import { Icon28Flash } from '@vkontakte/icons';
import {getUserHistory} from "../../api/api";



const History = ({ id, fetchedUser }) => {

    const [history, setHistory] = useState([])

    useEffect(() => {
        async function getHistory() {
            const history = await getUserHistory(fetchedUser)
            if (history.length === 0) {
                setHistory([null])
            } else {
                setHistory(history.reverse())
            }
        }
        getHistory();
    }, []);


    function renderHistory () {
        if (history.length === 0) {
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{ marginTop: 20 }} />
                </div>
            )
        } else if (history[0] === null) {
            return <Footer>Здесь будет отображаться твоя история</Footer>
        } else {
            let content = []
            history.forEach((item, index, array) => {
                const history_event = item["history_event"].split(':')
                if (history_event[0] === "Бонус") {
                    content.push(
                        <SimpleCell before={<Icon28Flash/>} after={item["history_award"]} description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )
                } else if (history_event[0] === "Штраф") {
                    content.push(
                        <SimpleCell before={<Icon28CancelCircleFillRed/>} after={item["history_award"]}
                                    description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )
                } else if (history_event[0] === "Награда") {
                    content.push(
                        <SimpleCell before={<Icon28AchievementCircleFillBlue/>} after={item["history_award"]}
                                    description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )
                } else if (history_event[0].slice(0, 3) === "Бой") {
                    content.push(
                        <SimpleCell before={<Icon28Dice4Outline/>} after={item["history_award"]}
                                    description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )
                } else {
                    content.push(
                        <SimpleCell before={<Icon28CancelCircleFillRed/>} after="ERROR"
                                    description="ERROR">ERROR</SimpleCell>
                    )
                }
            });

            return content
        }
    }

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
            {renderHistory()}


        </Panel>
    )
};



export default History;