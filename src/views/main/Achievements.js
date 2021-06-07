import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './achievements.css'
import {
    Icon28AchievementCircleFillBlue,
    Icon28CancelCircleFillRed, Icon28Dice4Outline,
    Icon28Flash,
    Icon28TicketOutline
} from '@vkontakte/icons';
import { Icon24HelpOutline } from '@vkontakte/icons';
import { motion } from "framer-motion"
import { Icon28ArrowRightOutline } from '@vkontakte/icons';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';
import {
    Avatar,
    Div,
    FixedLayout, Footer,
    Gallery,
    Group,
    IOS,
    PanelHeaderButton,
    platform,
    Separator,
    SimpleCell, Spinner,
    Tabs,
    TabsItem
} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import { Icon28GhostSimleOutline, Icon28ChevronBack, Icon24Back } from '@vkontakte/icons';
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";
import Icon28Notifications from "@vkontakte/icons/dist/28/notifications";
import {getUserAchievements, getUserBalances, getUserHistory} from "../../api/api";
const osName = platform();

const achievementsList = [
    {
        achievement_id: 0,
        rank: "Начинающий",
        task: "Сыграть 1 игру",
        reward: 5
    },
    {
        achievement_id: 1,
        rank: "Трюкач",
        task: "Победить 5 раз",
        reward: 5
    },
    {
        achievement_id: 2,
        rank: "Страж",
        task: "Включить уведомления",
        reward: 5
    },
    {
        achievement_id: 3,
        rank: "Профи",
        task: "Победить 20 раз",
        reward: 10
    },
    {
        achievement_id: 4,
        rank: "Промоутер",
        task: "Пригласить 5 друзей",
        reward: 5
    },
    {
        achievement_id: 5,
        rank: "Благодетель",
        task: "Оформить VK Donut",
        reward: 15
    },
    {
        achievement_id: 6,
        rank: "Маг",
        task: "Сменить аватарку фишки",
        reward: 5
    },
    {
        achievement_id: 7,
        rank: "Гений игры",
        task: "Сыграть супер бой",
        reward: 10
    },
    {
        achievement_id: 8,
        rank: "Властелин фишек",
        task: "Сыграть 100 игр",
        reward: 25
    },

]

const Achievements = ({ id, fetchedUser, openAchievementModal }) => {

    const [userAchievements, setUserAchievements] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        async function getAchievements() {
            const achievements = await getUserAchievements(fetchedUser)
            if (achievements.length === 0) {
                setUserAchievements([null])
            } else {
                setUserAchievements(achievements)
            }
        }
        getAchievements();
    }, []);

    function renderUserAchievements () {
        if (userAchievements.length === 0) {
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{ marginTop: 20 }} />
                </div>
            )
        } else if (userAchievements[0] === null) {
            return <Footer>Здесь появятся твои награды</Footer>
        } else {
            let content = []
            userAchievements.forEach((item, index, array) => {
                const achievementContent = achievementsList[item]
                content.push(
                    <SimpleCell
                        expandable
                        after={
                            <div className={"exp_block"} >
                                <div className={"exp_block__count"} >
                                    {achievementContent["reward"]}
                                </div>
                                <div className={"exp_block__text"} >
                                    опыта
                                </div>
                            </div>
                        }
                        description={achievementContent["task"]}
                        onClick={
                            () => openAchievementModal(
                                achievementContent["rank"],
                                achievementContent["task"],
                                achievementContent["achievement_id"]
                            )
                        }
                    >
                        {achievementContent["rank"]}
                    </SimpleCell>
                )
            });

            content.push(
                <Footer>Нажми на достижение, чтобы изменить свой ранг</Footer>
            )

            return content
        }
    }

    function getOtherAchievements () {
        if (userAchievements.length === 0) {
            return (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{marginTop: 20}}/>
                </div>
            )
        } else {
            let otherAchievements = achievementsList.slice()
            let content = []

            userAchievements.forEach((item, index, array) => {
                delete otherAchievements[item]
            });

            otherAchievements.forEach((item, index, array) => {
                content.push(
                    <SimpleCell
                        expandable
                        after={
                            <div className={"exp_block"}>
                                <div className={"exp_block__count"}>
                                    {item["reward"]}
                                </div>
                                <div className={"exp_block__text"}>
                                    опыта
                                </div>
                            </div>
                        }
                        description={item["task"]}
                        onClick={
                            () => openAchievementModal(
                                item["rank"],
                                item["task"],
                                null
                            )
                        }
                    >
                        {item["rank"]}
                    </SimpleCell>
                )
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
                Достижения
            </Title>
            <Tabs mode="buttons">
                <TabsItem
                    onClick={() => setSlideIndex(0)}
                    selected={slideIndex === 0}
                >
                    Доступные
                </TabsItem>
                <TabsItem
                    onClick={() => setSlideIndex(1)}
                    selected={slideIndex === 1}
                >
                    Полученные
                </TabsItem>
            </Tabs>
            <Gallery
                slideWidth="100%"
                align="center"
                style={{ height: "100%" }}
                slideIndex={slideIndex}
                onChange={slideIndex => setSlideIndex(slideIndex)}
            >
                <div>
                    {getOtherAchievements()}
                </div>
                <div>
                    {renderUserAchievements()}
                </div>
            </Gallery>
        </Panel>
    )
};



export default Achievements;