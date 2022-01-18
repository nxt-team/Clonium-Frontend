import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './achievements.css'
import {
    Icon28CancelOutline,
    Icon28Dice4Outline,
    Icon28SortHorizontalOutline,
    Icon28Dice2Outline,
    Icon28Dice3Outline,
    Icon28CancelCircleFillRed,
    Icon28AchievementCircleFillBlue,
    Icon28Flash
} from '@vkontakte/icons';
import {
    Footer,
    PanelHeaderButton,
    SimpleCell,
    Spinner,
    Separator
} from "@vkontakte/vkui";
import {getUserHistory} from "../../api/api";



const History = ({ id, fetchedUser, goToMainView, showSecretId }) => {

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
                content.push(<Separator/>)
                const history_event = item["history_event"].split(':')
                if (history_event[0] === "Бонус") {
                    content.push(
                        <SimpleCell disabled={true} before={<Icon28Flash/>} after={item["history_award"]} description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )
                } else if (history_event[0] === "Штраф") {
                    content.push(
                        <SimpleCell disabled={true} before={<Icon28CancelCircleFillRed/>} after={item["history_award"]}
                                    description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )
                } else if (history_event[0] === "Награда") {
                    content.push(
                        <SimpleCell disabled={true} before={<Icon28AchievementCircleFillBlue/>} after={item["history_award"]}
                                    description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )

                } else if (history_event[0] === "Обмен") {
                    content.push(
                        <SimpleCell disabled={true} before={<Icon28SortHorizontalOutline/>} after={item["history_award"]}
                                    description={history_event[1]}>{history_event[0]}</SimpleCell>
                    )

                } else if (history_event[0].slice(0, 3) === "Бой") {
                    let icon
                    if (history_event[0][6] == 4) {
                        icon = <Icon28Dice4Outline/>
                    } else if (history_event[0][6] == 3) {
                        icon = <Icon28Dice3Outline/>
                    } else {
                        icon = <Icon28Dice2Outline/>
                    }

                    let description = []
                    if (history_event[1]) {
                        for (const i of history_event[1].split("|")) {
                            description.push(<span>{i}</span>)
                            description.push(<br/>)
                        }

                        description.pop()
                    } else {
                        description = ""
                    }

                    let key
                    if (history_event[2]) {
                        key = history_event[2]
                    } else {
                        key = "Отсутствует"
                    }

                    content.push(
                        <SimpleCell
                            style={{alignItems: "flex-start"}}
                            before={icon}
                            onClick={() => showSecretId(key)}
                            after={
                                <span style={{marginTop: 10}}>
                                    {item["history_award"]}
                                </span>
                            }
                            description={description}
                        >
                            {history_event[0]}
                        </SimpleCell>
                    )
                } else {
                    content.push(
                        <SimpleCell disabled={true} before={<Icon28CancelCircleFillRed/>} after="ERROR"
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
                    <PanelHeaderButton onClick={goToMainView} >
                        <Icon28CancelOutline />
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