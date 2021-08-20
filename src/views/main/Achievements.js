import React, { useState, useEffect } from 'react';
import './achievements.css'
import {
    Icon28AchievementCircleFillBlue,
    Icon28ArrowRightOutline
} from '@vkontakte/icons';
import { Icon28CancelOutline } from '@vkontakte/icons';
import {
    Footer,
    Gallery,
    PanelHeaderButton,
    Placeholder,
    SimpleCell, Spinner,
    Tabs,
    TabsItem,
    Title,
    Panel,
    PanelHeader,
    Button, PanelHeaderClose
} from "@vkontakte/vkui";
import {getUserAchievements} from "../../api/api";

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
        rank: "Sub",
        task: "Подписаться на сообщество",
        reward: 5
    },
    {
        achievement_id: 8,
        rank: "Властелин фишек",
        task: "Сыграть 100 игр",
        reward: 25
    },

]

let isDrag = false

const Achievements = ({ id, fetchedUser, openAchievementModal, goToMainView }) => {

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
            return (
                <Placeholder
                    icon={<Icon28AchievementCircleFillBlue width={56} height={56} />}
                    header="У тебя пока нет достижений"
                    action={<Button size="l" onClick={() => goToMainView()} >На главную</Button>}
                >
                    Здесь появятся твои достижения. Скорее отправляйся зарабатывать их
                </Placeholder>
            )
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
                                    {achievementContent["rank"] === "Sub" ? "билетов" : "опыта"}
                                </div>
                            </div>
                        }
                        description={achievementContent["task"]}
                        onClick={
                            () => {
                                if (!isDrag) {
                                    openAchievementModal(
                                        achievementContent["rank"],
                                        achievementContent["task"],
                                        achievementContent["achievement_id"]
                                    )
                                }
                            }
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
                                     {item["rank"] === "Sub" ? "билетов" : "опыта"}
                                </div>
                            </div>
                        }
                        description={item["task"]}
                        onClick={
                            () => {
                                if (!isDrag) {
                                    openAchievementModal(
                                        item["rank"],
                                        item["task"],
                                        null
                                    )
                                }
                            }

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
                    <PanelHeaderButton onClick={goToMainView} >
                        <Icon28CancelOutline />
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
                onDragStart={() => isDrag = true}
                onDragEnd={() => setTimeout(() => isDrag = false, 200)}
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