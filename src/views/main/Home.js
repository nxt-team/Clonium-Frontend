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
    PanelHeaderButton
} from '@vkontakte/vkui';

import {
    Icon24AddSquareOutline,
    Icon20RecentOutline,
    Icon20Users,
    Icon28RadiowavesAroundOutline,
    Icon28ChevronRightCircleOutline,
    Icon28HistoryForwardOutline,
    Icon24ChevronCompactRight,
} from '@vkontakte/icons';

import './home.css';
import './game.css'
import './home.css';
import { motion } from "framer-motion"

import MainButtons from "../../components/MainButtons";
import InfoBanners from "../../components/InfoBanners"
import UserStat from "../../components/UserStat";
import bridge from "@vkontakte/vk-bridge";
import {getUserBalances, init} from "../../api/api";

const Home = ({id, go, changeActiveModal, goToCreatingRoom, fetchedUser, userBalances}) => {

    const [fights, setFights] = useState([])

    useEffect(() => {
        async function getFights() {
        }
        getFights();

    }, []);

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
                            <Avatar size={64} src={fetchedUser.photo_200}/>
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

            <div className={'onlineHomePage'}>
                10 online
            </div>
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
                <SimpleCell style={{marginTop: 12}} onClick={go} data-to="game"
                            after={<Icon28ChevronRightCircleOutline/>}>
                    <RichCell
                        style={{padding: 0}}
                        disabled
                        before={<div className={'leftStickBlue'}/>}
                        bottom={
                            <UsersStack
                                photos={[
                                    'https://sun9-13.userapi.com/impf/c858416/v858416728/1f9d61/IqWLS0Gx06I.jpg?size=1200x1600&quality=96&proxy=1&sign=2cb19ae2c4f516ab287ac8163206e1b1&type=album',
                                    'https://sun9-74.userapi.com/impg/tVUfuQBGHwn9bcpyxQ6-i-NPXUuHG9ZwdRkZqw/oMwQUNvi7JY.jpg?size=1469x893&quality=96&proxy=1&sign=fe5d8da25e2667739e0620ae14af96ef&type=album',
                                    'https://sun1-84.userapi.com/impg/uxNacew5ooMPc2VrGY5E-Ju_VNSWnZxvcQYtpw/j1YAv3fEXi8.jpg?size=200x0&quality=96&crop=0,0,1620,2160&sign=2b1f3d3fdd72c1fbc590dbf0bc48e0f7&ava=1',
                                ]}
                            >Ожидают 1 игрока</UsersStack>
                        }
                        actions={
                            <>
                                <div style={{display: "flex", alignItems: "center",}}>
                                    <Icon20RecentOutline/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}> 5 мин</Caption>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>
                                    <Icon20Users/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>4</Caption>
                                </div>
                            </>
                        }
                    >
                        Бублик 8 на 8
                    </RichCell>
                </SimpleCell>
                <Separator wide={true}/>
                <SimpleCell onClick={go} data-to="waitingForStart" after={<Icon28ChevronRightCircleOutline/>}>
                    <RichCell
                        style={{padding: 0}}
                        disabled
                        before={<div className={'leftStickGreen'}/>}
                        bottom={
                            <UsersStack

                                photos={[
                                    'https://sun9-72.userapi.com/impg/SbMjjzso9KKdQ3mIiA2-5Tnm4ELIxymXLuaZpw/YcOTTuPNMis.jpg?size=400x500&quality=96&proxy=1&sign=4288dd5469ddee6547094663a5622f37&type=album',
                                    'https://sun9-52.userapi.com/impf/c858236/v858236506/14e9ae/Gvh9pbVxcTM.jpg?size=879x736&quality=96&proxy=1&sign=561e152a479caf41c706ef7882073d65&type=album',
                                ]}
                            >Ожидают 1 игрока</UsersStack>
                        }
                        actions={
                            <>
                                <div style={{display: "flex", alignItems: "center",}}>
                                    <Icon20RecentOutline/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>бесконечное</Caption>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>
                                    <Icon20Users/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>3</Caption>
                                </div>
                            </>
                        }
                    >
                        Квадрат 6 на 6
                    </RichCell>
                </SimpleCell>
                <Separator wide={true}/>
                <SimpleCell
                    onClick={() => changeActiveModal('noTickets')}
                    after={<Icon28ChevronRightCircleOutline/>}>
                    <RichCell
                        style={{padding: 0}}
                        disabled
                        before={<div className={'leftStickYellow'}/>}
                        bottom={
                            <UsersStack
                                photos={[
                                    'https://sun9-13.userapi.com/impf/c858416/v858416728/1f9d61/IqWLS0Gx06I.jpg?size=1200x1600&quality=96&proxy=1&sign=2cb19ae2c4f516ab287ac8163206e1b1&type=album',
                                    'https://sun9-74.userapi.com/impg/tVUfuQBGHwn9bcpyxQ6-i-NPXUuHG9ZwdRkZqw/oMwQUNvi7JY.jpg?size=1469x893&quality=96&proxy=1&sign=fe5d8da25e2667739e0620ae14af96ef&type=album',
                                    'https://sun1-84.userapi.com/impg/uxNacew5ooMPc2VrGY5E-Ju_VNSWnZxvcQYtpw/j1YAv3fEXi8.jpg?size=200x0&quality=96&crop=0,0,1620,2160&sign=2b1f3d3fdd72c1fbc590dbf0bc48e0f7&ava=1',
                                ]}
                            >Ожидают 1 игрока</UsersStack>
                        }
                        actions={
                            <>
                                <div style={{display: "flex", alignItems: "center",}}>
                                    <Icon20RecentOutline/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}> 15 мин</Caption>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>
                                    <Icon20Users/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>4</Caption>
                                </div>
                            </>
                        }
                    >
                        Бублик 8 на 8
                    </RichCell>
                </SimpleCell>
                <Separator wide={true}/>
                <SimpleCell onClick={go} data-to="intro_1" after={<Icon28ChevronRightCircleOutline/>}>
                    <RichCell
                        style={{padding: 0}}
                        disabled
                        before={<div className={'leftStickRed'}/>}
                        bottom={
                            <UsersStack

                                photos={[
                                    'https://sun9-72.userapi.com/impg/SbMjjzso9KKdQ3mIiA2-5Tnm4ELIxymXLuaZpw/YcOTTuPNMis.jpg?size=400x500&quality=96&proxy=1&sign=4288dd5469ddee6547094663a5622f37&type=album',
                                    'https://sun9-52.userapi.com/impf/c858236/v858236506/14e9ae/Gvh9pbVxcTM.jpg?size=879x736&quality=96&proxy=1&sign=561e152a479caf41c706ef7882073d65&type=album',
                                ]}
                            >Ожидают 2 игроков</UsersStack>
                        }
                        actions={
                            <>
                                <div style={{display: "flex", alignItems: "center",}}>
                                    <Icon20RecentOutline/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}> 10 мин</Caption>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginLeft: 8}}>
                                    <Icon20Users/>
                                    <Caption level="2" weight="regular" style={{marginLeft: 4}}>4</Caption>
                                </div>
                            </>
                        }
                    >
                        Квадрат 6 на 6
                    </RichCell>
                </SimpleCell>

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
                <InfoBanners/>
            </div>


        </Panel>
    )
}

export default Home;