import React, {useEffect, useState} from 'react';

import {
    Panel,
    PanelHeader,
    Div,
    Button,
    Avatar,
    Title,
    Caption,
    Separator,
    SimpleCell,
    RichCell,
    UsersStack,
    PanelHeaderButton, Spinner
} from '@vkontakte/vkui';

import {
    Icon24AddSquareOutline,
    Icon20RecentOutline,
    Icon20Users,
    Icon28RadiowavesAroundOutline,
    Icon28ChevronRightCircleOutline,
    Icon28HistoryForwardOutline,
    Icon24ChevronCompactRight, Icon28DonateCircleFillYellow,
} from '@vkontakte/icons';

import './home.css';
import './game.css'
import './home.css';
import { motion } from "framer-motion"

import MainButtons from "../../components/MainButtons";
import InfoBanners from "../../components/InfoBanners"
import UserStat from "../../components/UserStat";
import bridge from "@vkontakte/vk-bridge";
import {getFights, getUserBalances, init} from "../../api/api";
import GlobalLeaderBoardPlace from "../../components/GlobalLeaderBoardPlace";
import {joinRoom} from "../../api/socket";
import Online from "../../components/online";
import {PullToRefresh} from "@gmelum/vkui";

const numericIndicator = {
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
    background: 'var(--modal_card_background)',
}

const Home = ({id, go, changeActiveModal, goToCreatingRoom, fetchedUser, userBalances, goToPage, updateNeedUsersInFight, updateSecretId}) => {

    const [fights, setFights] = useState([])

    useEffect(() => {
        async function fights() {
            const fights = await getFights(fetchedUser)
            setFights(fights)
        }
        fights();

    }, []);

    function renderFights () {
        if (fights.length === 0) {
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Spinner size="large" style={{ margin: "150px 0" }} />
                </div>
            )
        } else {
            let content = []
            fights.forEach((item, index, array) => {
                const photos = []
                item["users"].forEach((user, index) => photos.push(user["avatar"]))
                let needPlayers = item["max_user_number"] - item["users"].length

                switch (needPlayers) {
                    case 0:
                        needPlayers = "ERROR"
                        break;
                    case 1:
                        needPlayers = "ожидают 1 игрока"
                        break;
                    case 2:
                        needPlayers = "ожидают 2 игроков"
                        break;
                    case 3:
                        needPlayers = "ожидают 3 игроков"
                        break;
                    case 4:
                        needPlayers = "ожидают 4 игроков"
                        break;
                }

                let mapName = ""

                switch (item["map_name"]) {
                    case "DonutSize6":
                        mapName = "Бублик 6 на 6"
                        break;
                    case "DonutSize8":
                        mapName = "Бублик 8 на 8"
                        break;
                    case "GridSize8":
                        mapName = "Сетка 8 на 8"
                        break;
                    case "GridSize10":
                        mapName = "Сетка 10 на 10"
                        break;
                    case "PassageSize10":
                        mapName = "Проход"
                        break;
                    case "SquareSize6":
                        mapName = "Квадрат 6 на 6"
                        break;
                    case "SquareSize8":
                        mapName = "Квадрат 8 на 8"
                        break;
                }

                let stick = ""

                switch (index) {
                    case 0:
                        stick = "leftStickBlue"
                        break;
                    case 1:
                        stick = "leftStickGreen"
                        break;
                    case 2:
                        stick = "leftStickYellow"
                        break;
                    case 3:
                        stick = "leftStickRed"
                        break;
                }


                content.push(
                    <SimpleCell style={{marginTop: 12}}
                                onClick={() => {
                                    updateNeedUsersInFight(item["max_user_number"]);
                                    updateSecretId(item["secret_id"])
                                    joinRoom(fetchedUser, item["secret_id"]);
                                    goToPage("waitingForStart");
                                }}
                                after={<Icon28ChevronRightCircleOutline/>}>
                        <RichCell
                            style={{padding: 0}}
                            disabled
                            before={<div className={stick}/>}
                            bottom={
                                <UsersStack
                                    layout={"horizontal"}
                                    size={"s"}
                                    photos={photos}
                                >{needPlayers}</UsersStack>
                            }
                            actions={
                                <>
                                    <div style={{display: "flex", alignItems: "center",}}>
                                        <Icon20RecentOutline/>
                                        <Caption level="2" weight="regular" style={{marginLeft: 4}}>{item["game_time"] !== -1 ? item["game_time"] / 60 + " мин" : "бесконечное"}</Caption>
                                    </div>
                                    <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>
                                        <Icon20Users/>
                                        <Caption level="2" weight="regular" style={{marginLeft: 4}}>{item["max_user_number"]}</Caption>
                                    </div>
                                </>
                            }
                        >
                            {mapName}
                        </RichCell>
                    </SimpleCell>
                )
                
                content.push(<Separator wide={true}/>)
            })

            content.pop()

            return content
        }
    }

    function getIcon () {
        if (userBalances["vk_donut"] === 1) {
            return <Icon28DonateCircleFillYellow style={numericIndicator}/>
        } else if (userBalances["vk_donut"] === 2) {
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

    return (
        <Panel id={id}>
            <PanelHeader
                left={
                    <React.Fragment>
                        <PanelHeaderButton onClick={go} data-to="achievements">
                            <Icon28RadiowavesAroundOutline/>
                        </PanelHeaderButton>
                        <PanelHeaderButton onClick={go} data-to="history">
                            <Icon28HistoryForwardOutline style={{padding: 9}} width={26} height={26}/>
                        </PanelHeaderButton>
                    </React.Fragment>
                }
                separator={false}
            >
                Главная
            </PanelHeader>
            <PullToRefresh
                isFetching={fights.length !== 0}
                onRefresh={async () => {
                setFights([]);
                const fights = await getFights(fetchedUser)
                setFights(fights)
            }}>

            <Div>
                <div className={"profile_preview_container"} onClick={go}
                     data-to="profile">
                    <div className={'profile_preview'}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
                            {/*<Avatar size={64} src={fetchedUser.photo_200}/>*/}
                            <div className="avatar">
                                <Avatar size={64} src={fetchedUser.photo_200} className="avatar__photo" />
                                <div className="avatar__indicator" >
                                    {getIcon()}
                                </div>
                            </div>
                            <Title style={{marginTop: 8}} level="1"
                                   weight="semibold">{fetchedUser.first_name + ' ' + fetchedUser.last_name}</Title>
                        </div>
                        <UserStat exp={userBalances["exp"]} games={userBalances["fights"]} loses={userBalances["losses"]} tickets={userBalances["tickets"]} wins={userBalances["wins"]}/>
                    </div>
                    <div
                        className={"profile_preview_icon"}>
                        <Icon24ChevronCompactRight/>
                    </div>
                </div>
            </Div>

            <Online/>
            <MainButtons
                go={go}
                changeActiveModal={changeActiveModal}
                areNotificationsEnabled={false}
                isUserInSuperFight={false}
            />

            <div className={'fullContainer'}>
                <Title level="1" weight="semibold" style={{marginLeft: 16}}>
                    Доступные комнаты
                </Title>

                {renderFights()}
                {/*<SimpleCell style={{marginTop: 12}} onClick={go} data-to="game"*/}
                {/*            after={<Icon28ChevronRightCircleOutline/>}>*/}
                {/*    <RichCell*/}
                {/*        style={{padding: 0}}*/}
                {/*        disabled*/}
                {/*        before={<div className={'leftStickBlue'}/>}*/}
                {/*        bottom={*/}
                {/*            <UsersStack*/}
                {/*                photos={[*/}
                {/*                    'https://sun9-13.userapi.com/impf/c858416/v858416728/1f9d61/IqWLS0Gx06I.jpg?size=1200x1600&quality=96&proxy=1&sign=2cb19ae2c4f516ab287ac8163206e1b1&type=album',*/}
                {/*                    'https://sun9-74.userapi.com/impg/tVUfuQBGHwn9bcpyxQ6-i-NPXUuHG9ZwdRkZqw/oMwQUNvi7JY.jpg?size=1469x893&quality=96&proxy=1&sign=fe5d8da25e2667739e0620ae14af96ef&type=album',*/}
                {/*                    'https://sun1-84.userapi.com/impg/uxNacew5ooMPc2VrGY5E-Ju_VNSWnZxvcQYtpw/j1YAv3fEXi8.jpg?size=200x0&quality=96&crop=0,0,1620,2160&sign=2b1f3d3fdd72c1fbc590dbf0bc48e0f7&ava=1',*/}
                {/*                ]}*/}
                {/*            >Ожидают 1 игрока</UsersStack>*/}
                {/*        }*/}
                {/*        actions={*/}
                {/*            <>*/}
                {/*                <div style={{display: "flex", alignItems: "center",}}>*/}
                {/*                    <Icon20RecentOutline/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}> 5 мин</Caption>*/}
                {/*                </div>*/}
                {/*                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>*/}
                {/*                    <Icon20Users/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>4</Caption>*/}
                {/*                </div>*/}
                {/*            </>*/}
                {/*        }*/}
                {/*    >*/}
                {/*        Бублик 8 на 8*/}
                {/*    </RichCell>*/}
                {/*</SimpleCell>*/}
                {/*<Separator wide={true}/>*/}
                {/*<SimpleCell onClick={go} data-to="waitingForStart" after={<Icon28ChevronRightCircleOutline/>}>*/}
                {/*    <RichCell*/}
                {/*        style={{padding: 0}}*/}
                {/*        disabled*/}
                {/*        before={<div className={'leftStickGreen'}/>}*/}
                {/*        bottom={*/}
                {/*            <UsersStack*/}

                {/*                photos={[*/}
                {/*                    'https://sun9-72.userapi.com/impg/SbMjjzso9KKdQ3mIiA2-5Tnm4ELIxymXLuaZpw/YcOTTuPNMis.jpg?size=400x500&quality=96&proxy=1&sign=4288dd5469ddee6547094663a5622f37&type=album',*/}
                {/*                    'https://sun9-52.userapi.com/impf/c858236/v858236506/14e9ae/Gvh9pbVxcTM.jpg?size=879x736&quality=96&proxy=1&sign=561e152a479caf41c706ef7882073d65&type=album',*/}
                {/*                ]}*/}
                {/*            >Ожидают 1 игрока</UsersStack>*/}
                {/*        }*/}
                {/*        actions={*/}
                {/*            <>*/}
                {/*                <div style={{display: "flex", alignItems: "center",}}>*/}
                {/*                    <Icon20RecentOutline/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>бесконечное</Caption>*/}
                {/*                </div>*/}
                {/*                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>*/}
                {/*                    <Icon20Users/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>3</Caption>*/}
                {/*                </div>*/}
                {/*            </>*/}
                {/*        }*/}
                {/*    >*/}
                {/*        Квадрат 6 на 6*/}
                {/*    </RichCell>*/}
                {/*</SimpleCell>*/}
                {/*<Separator wide={true}/>*/}
                {/*<SimpleCell*/}
                {/*    onClick={() => changeActiveModal('noTickets')}*/}
                {/*    after={<Icon28ChevronRightCircleOutline/>}>*/}
                {/*    <RichCell*/}
                {/*        style={{padding: 0}}*/}
                {/*        disabled*/}
                {/*        before={<div className={'leftStickYellow'}/>}*/}
                {/*        bottom={*/}
                {/*            <UsersStack*/}
                {/*                photos={[*/}
                {/*                    'https://sun9-13.userapi.com/impf/c858416/v858416728/1f9d61/IqWLS0Gx06I.jpg?size=1200x1600&quality=96&proxy=1&sign=2cb19ae2c4f516ab287ac8163206e1b1&type=album',*/}
                {/*                    'https://sun9-74.userapi.com/impg/tVUfuQBGHwn9bcpyxQ6-i-NPXUuHG9ZwdRkZqw/oMwQUNvi7JY.jpg?size=1469x893&quality=96&proxy=1&sign=fe5d8da25e2667739e0620ae14af96ef&type=album',*/}
                {/*                    'https://sun1-84.userapi.com/impg/uxNacew5ooMPc2VrGY5E-Ju_VNSWnZxvcQYtpw/j1YAv3fEXi8.jpg?size=200x0&quality=96&crop=0,0,1620,2160&sign=2b1f3d3fdd72c1fbc590dbf0bc48e0f7&ava=1',*/}
                {/*                ]}*/}
                {/*            >Ожидают 1 игрока</UsersStack>*/}
                {/*        }*/}
                {/*        actions={*/}
                {/*            <>*/}
                {/*                <div style={{display: "flex", alignItems: "center",}}>*/}
                {/*                    <Icon20RecentOutline/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}> 15 мин</Caption>*/}
                {/*                </div>*/}
                {/*                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>*/}
                {/*                    <Icon20Users/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>4</Caption>*/}
                {/*                </div>*/}
                {/*            </>*/}
                {/*        }*/}
                {/*    >*/}
                {/*        Бублик 8 на 8*/}
                {/*    </RichCell>*/}
                {/*</SimpleCell>*/}
                {/*<Separator wide={true}/>*/}
                {/*<SimpleCell onClick={go} data-to="intro_1" after={<Icon28ChevronRightCircleOutline/>}>*/}
                {/*    <RichCell*/}
                {/*        style={{padding: 0}}*/}
                {/*        disabled*/}
                {/*        before={<div className={'leftStickRed'}/>}*/}
                {/*        bottom={*/}
                {/*            <UsersStack*/}

                {/*                photos={[*/}
                {/*                    'https://sun9-72.userapi.com/impg/SbMjjzso9KKdQ3mIiA2-5Tnm4ELIxymXLuaZpw/YcOTTuPNMis.jpg?size=400x500&quality=96&proxy=1&sign=4288dd5469ddee6547094663a5622f37&type=album',*/}
                {/*                    'https://sun9-52.userapi.com/impf/c858236/v858236506/14e9ae/Gvh9pbVxcTM.jpg?size=879x736&quality=96&proxy=1&sign=561e152a479caf41c706ef7882073d65&type=album',*/}
                {/*                ]}*/}
                {/*            >Ожидают 2 игроков</UsersStack>*/}
                {/*        }*/}
                {/*        actions={*/}
                {/*            <>*/}
                {/*                <div style={{display: "flex", alignItems: "center",}}>*/}
                {/*                    <Icon20RecentOutline/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}> 10 мин</Caption>*/}
                {/*                </div>*/}
                {/*                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>*/}
                {/*                    <Icon20Users/>*/}
                {/*                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>4</Caption>*/}
                {/*                </div>*/}
                {/*            </>*/}
                {/*        }*/}
                {/*    >*/}
                {/*        Квадрат 6 на 6*/}
                {/*    </RichCell>*/}
                {/*</SimpleCell>*/}

                <div style={{
                    marginTop: 12,
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button
                        style={{
                            alignItems: "center"
                        }}
                        mode="secondary"
                        size='l'
                        before={<Icon24AddSquareOutline/>}
                        onClick={() => goToCreatingRoom()}
                    >
                        Создать комнату
                    </Button>
                </div>
            </div>


            <div
                style={{
                    marginBottom: 12
                }}
            >
                <InfoBanners changeActiveModal={changeActiveModal} />
            </div>
            </PullToRefresh>


        </Panel>
    )
}

export default Home;