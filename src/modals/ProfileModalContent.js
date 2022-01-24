import React, {useEffect, useState} from 'react';
import {
    Div,
    SimpleCell,
    Footer,
    Spinner,
    Link,
    RichCell,
    Avatar,
    Banner
} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {getAnyUser, updateIsUserInSuperFight} from "../api/api";
import {
    Icon24ChevronCompactRight,
    Icon24FavoriteOutline,
    Icon24Users3Outline,
    Icon28ArrowDownOutline,
    Icon28ArrowUpOutline,
    Icon24Recent,
    Icon28DonateCircleFillYellow,
    Icon28FavoriteOutline,
    Icon28TicketOutline,
    Icon36GameOutline,
    Icon28PincodeOutline, Icon24CupOutline
} from "@vkontakte/icons";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from "../components/CustomTooltip/CustomTooltip";
import RateChart from "../components/RateChart";
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const numericIndicator = {
    height: 20,
    width: 20,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
    background: 'var(--modal_card_background)',
}

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
        task: "Оформить Clonium Pass",
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

export default function ProfileModalContent({closeModal, changeActiveModal, vk_id}) {

    const [isVkDonutBanner, setIsVkDonutBanner] = useState(true)
    const [userData, setUserData] = useState([])

    useEffect(() => {
        async function getUserdata() {
            const user = await getAnyUser(vk_id)
            console.log(user[0])
            setUserData(user[0])
        }
        getUserdata();
    }, []);

    function expCaption (exp) {
        if (exp % 100 !== 11 && exp % 10 === 1) {
            return 'Опыт набран'
        } else {
            return 'Опыта набрано'
        }
    }

    function ticketsCaption (tickets) { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (userData["vk_donut"] !== 0) {
            return "Билетов"
        } if (tickets % 100 !== 11 && tickets % 10 === 1) {
            return 'Билет'
        } if (tickets % 100 !== 12 && tickets % 100 !== 13 && tickets % 100 !== 14 && (tickets % 10 === 2 || tickets % 10 === 3 || tickets % 10 === 4)) {
            return 'Билета'
        } else {
            return 'Билетов'
        }
    }

    function gamesCaption (games) {
        if (games % 100 !== 11 && games % 10 === 1) {
            return 'Игра сыграна'
        } else {
            return 'Игр сыграно'
        }
    }

    function winsCaption (wins) { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (wins % 100 !== 11 && wins % 10 === 1) {
            return 'Победа'
        } if (wins % 100 !== 12 && wins % 100 !== 13 && wins % 100 !== 14 && (wins % 10 === 2 || wins % 10 === 3 || wins % 10 === 4)) {
            return 'Победы'
        } else {
            return 'Побед'
        }
    }

    function losesCaption (loses) { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (loses % 100 !== 11 && loses % 10 === 1) {
            return 'Поражение'
        } if (loses % 100 !== 12 && loses % 100 !== 13 && loses % 100 !== 14 && (loses % 10 === 2 || loses % 10 === 3 || loses % 10 === 4)) {
            return 'Поражения'
        } else {
            return 'Поражений'
        }
    }

    function rateCaption (rate) { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        return "Рейтинг"
    }

    function renderAchievements () {
        if (userData["achievements"].length !== 0) {
            const content = []
            userData["achievements"].forEach((item, index, array) => {
                const achievementContent = achievementsList[item]
                content.push(
                    <SimpleCell
                        disabled
                        description={achievementContent["task"]}
                    >
                        {achievementContent["rank"]}
                    </SimpleCell>
                )
            })
            return content
        } else {
            return (
                <Footer style={{padding: "12px 0"}} >У игрока отсутствуют достижения</Footer>
            )
        }
    }

    function getIcon () {
        if (userData["vk_donut"] === 1) {
            return <Icon28DonateCircleFillYellow style={numericIndicator}/>
        } else if (userData["vk_donut"] === 2) {
            return (
                <svg style={numericIndicator} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 14C0 6.268 6.268 0 14 0C21.732 0 28 6.268 28 14C28 21.732 21.732 28 14 28C6.268 28 0 21.732 0 14Z" fill="url(#paint0_linear)"/>
                    <path d="M11.3325 21.1202L9.16742 19.8702" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M17.8877 6.48039C16.0084 6.76786 9.3357 8.39974 9.33491 17.0801L13.665 19.5801C21.1013 15.1987 19.2403 8.64157 18.5652 6.87447C18.5144 6.74122 18.4194 6.62943 18.2961 6.55772C18.1728 6.48601 18.0287 6.45872 17.8877 6.48039V6.48039Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.9874 10.7596L7.39676 12.0803C7.30707 12.1133 7.22614 12.1664 7.1602 12.2356C7.09425 12.3047 7.04504 12.3881 7.01635 12.4792L5.67963 16.7262C5.64777 16.8274 5.64221 16.9351 5.66348 17.0391C5.68475 17.1431 5.73215 17.2399 5.80121 17.3205C5.87027 17.4011 5.95872 17.4628 6.05822 17.4998C6.15771 17.5367 6.26498 17.5477 6.3699 17.5317L9.3349 17.0801" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M18.3 14.9164L18.9641 18.7587C18.9804 18.8529 18.9748 18.9495 18.9479 19.0412C18.921 19.1329 18.8734 19.2172 18.8088 19.2876L15.7992 22.5687C15.7275 22.647 15.637 22.7056 15.5363 22.7392C15.4356 22.7727 15.328 22.7801 15.2237 22.7606C15.1194 22.7411 15.0217 22.6953 14.94 22.6276C14.8583 22.56 14.7951 22.4726 14.7565 22.3737L13.665 19.5801" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.6288 12.0537C15.508 12.2629 15.2405 12.3346 15.0312 12.2138C14.8219 12.093 14.7502 11.8254 14.8711 11.6162C14.9919 11.4069 15.2594 11.3352 15.4687 11.4561C15.678 11.5769 15.7496 11.8444 15.6288 12.0537Z" fill="white" stroke="white"/>
                    <defs>
                        <linearGradient id="paint0_linear" x1="-14" y1="14" x2="14" y2="42" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#70B2FF"/>
                            <stop offset="1" stop-color="#5C9CE6"/>
                        </linearGradient>
                    </defs>
                </svg>
            )
        } else {
            return <></>
        }
    }

    function renderUserData () {

        if (userData.length === 0) {
            return (
                <div style={{height: "90vh"}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Spinner size="regular" style={{marginTop: 20}}/>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <Div
                        style={{paddingBottom: 0}}
                    >
                        <Link target="_blank" href={"https://vk.com/id" + vk_id}>
                            <RichCell
                                style={{backgroundColor: "var(--content_tint_background)", borderRadius: 12}}
                                multiline
                                expandable
                                before={
                                    <div className="avatar">
                                        <Avatar size={72}
                                                src={userData["avatar"]}
                                                className="avatar__photo"/>
                                        <div className="avatar__indicator">
                                            {getIcon()}
                                        </div>
                                    </div>
                                }
                                caption={userData["user_rank"]}
                            >
                                <Title
                                    level="2"
                                    weight="regular"
                                    style={{marginBottom: 4, marginRight: 24, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}
                                >
                                    <span dangerouslySetInnerHTML={{__html: userData["username"].split(" ")[0]}}/>
                                    <br/>
                                    <span dangerouslySetInnerHTML={{__html: userData["username"].split(" ")[1]}}/>
                                </Title>
                                <div
                                    className={"profile_preview_icon"}>
                                    <Icon24ChevronCompactRight/>
                                </div>
                            </RichCell>
                        </Link>
                    </Div>
                    {(isVkDonutBanner && userData["vk_donut"] !== 0) &&
                    <Banner
                        before={
                            <div className={"icon__container"} style={{marginRight: 0}}>
                                <Icon28FavoriteOutline/>
                            </div>
                        }
                        header="У пользователя оформлена подписка Clonium Pass"
                        subheader="Оформи тоже для игры с комфортом"
                        asideMode="dismiss"
                        actions={(startupParameters.get('vk_platform') === "mobile_web" || startupParameters.get('vk_platform') === "desktop_web" || startupParameters.get('vk_platform') === "mobile_android") &&
                                <Button
                                    mode="primary"
                                    onClick={() => {
                                        closeModal();
                                        setTimeout(() => changeActiveModal("aboutVkDonut"), 200);
                                    }}
                                >
                                    Подробнее
                                </Button>
                            }
                        onDismiss={() => setIsVkDonutBanner(false)}
                    />
                    }
                    <Title level="1" weight="semibold" style={{marginLeft: 16, marginTop: 32}}>
                        Статистика
                    </Title>
                    <Div>
                        <div style={{backgroundColor: "var(--content_tint_background)", borderRadius: 12, padding: "4px 0"}}>
                            <SimpleCell
                                disabled={true}
                                before={<Icon24FavoriteOutline width={28} height={28}/>}
                                after={userData["exp"]}
                            >
                                {expCaption(userData["exp"])}
                            </SimpleCell>
                            <SimpleCell
                                disabled={true}
                                before={<Icon24CupOutline width={28} height={28}/>}
                                after={Math.round(userData["rating"])}
                            >
                                {rateCaption(userData["rating"])}
                            </SimpleCell>
                            <SimpleCell
                                disabled={true}
                                before={<Icon28TicketOutline/>}
                                after={userData["vk_donut"] !== 0 ? "∞" : userData["tickets"] }
                            >
                                {ticketsCaption(userData["tickets"])}
                            </SimpleCell>
                            <SimpleCell
                                disabled={true}
                                before={<Icon36GameOutline width={28} height={28}/>}
                                after={userData["stats"][0]["fights"]}
                            >
                                {gamesCaption(userData["stats"][0]["fights"])}
                            </SimpleCell>
                            <SimpleCell
                                disabled={true}
                                before={<Icon28ArrowUpOutline/>}
                                after={userData["stats"][0]["wins"]}
                            >
                                {winsCaption(userData["stats"][0]["wins"])}
                            </SimpleCell>
                            <SimpleCell
                                disabled={true}
                                before={<Icon28ArrowDownOutline/>}
                                after={userData["stats"][0]["losses"]}
                            >
                                {losesCaption(userData["stats"][0]["losses"])}
                            </SimpleCell>
                            <SimpleCell
                                disabled={true}
                                before={<Icon24Users3Outline/>}
                                after={userData["referrals"].length}
                            >
                                Приглашено игроков
                            </SimpleCell>
                            <SimpleCell
                                disabled={true}
                                before={<Icon28PincodeOutline/>}
                                after={userData["activated_promocodes"].length}
                            >
                                Активировано промокодов
                            </SimpleCell>
                        </div>
                    </Div>
                    <Title level="1" weight="semibold" style={{marginLeft: 16, marginTop: 32, marginBottom: 12}}>
                        График рейтинга
                    </Title>
                    <RateChart rating_history={userData["rating_history"]}/>
                    <Title level="1" weight="semibold" style={{marginLeft: 16, marginTop: 32}}>
                        Достижения
                    </Title>
                    <Div>
                        <div style={{backgroundColor: "var(--content_tint_background)", borderRadius: 12}}>
                            {renderAchievements()}
                        </div>
                    </Div>
                </>
            )
        }
    }

    return (
        <div>
            {renderUserData()}
        </div>
    )
}