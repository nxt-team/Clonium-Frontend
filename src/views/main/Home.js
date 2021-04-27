import React from 'react';
import {
    platform,
    IOS,
    PanelHeaderSimple,
    Card,
    Div,
    Counter,
    Cell,
    FixedLayout,
    Group,
    TabbarItem,
    CardScroll,
    CellButton, Placeholder, Separator, SimpleCell, RichCell, Footer, PanelHeaderButton
} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import './home.css';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import Icon28ChevronUpOutline from '@vkontakte/icons/dist/28/chevron_up_outline';
import './game.css'
import './home.css';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon28ArrowDownOutline from '@vkontakte/icons/dist/28/arrow_down_outline';
import Icon28ArrowUpOutline from '@vkontakte/icons/dist/28/arrow_up_outline';
import Icon28SwitchOutline from '@vkontakte/icons/dist/28/switch_outline';
import { motion } from "framer-motion"
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';
import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';
import Icon28TicketOutline from '@vkontakte/icons/dist/28/ticket_outline';
import Icon20TicketOutline from '@vkontakte/icons/dist/20/ticket_outline';
import Icon24CupOutline from '@vkontakte/icons/dist/24/cup_outline';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon28ChatsOutline from '@vkontakte/icons/dist/28/chats_outline';
import { Icon24AddSquareOutline } from '@vkontakte/icons';
import {Icon20RecentOutline, Icon24Back, Icon28ChevronBack} from '@vkontakte/icons';
import { Icon20Users, Icon28UserOutline } from '@vkontakte/icons';
import { Icon28RadiowavesAroundOutline } from '@vkontakte/icons';
import Icon20NotificationOutline from '@vkontakte/icons/dist/20/notification_outline';
import Icon28ChevronRightOutline from '@vkontakte/icons/dist/28/chevron_right_outline';
import Icon28AddSquareOutline from '@vkontakte/icons/dist/28/add_square_outline';
import Icon28BombOutline from '@vkontakte/icons/dist/28/bomb_outline';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import { Icon28ChevronRightCircleOutline } from '@vkontakte/icons';
import { Icon24ChevronRight } from '@vkontakte/icons';
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import Icon28ServicesOutline from "@vkontakte/icons/dist/28/services_outline";
import { Icon24ChevronCompactRight } from '@vkontakte/icons';
import { Icon28HistoryForwardOutline } from '@vkontakte/icons';
const osName = platform();


console.log(osName)

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const gal = [
    <Banner
        style={{ margin: 0, width: 220}}
        before={<Icon28ChatsOutline width={34} height={34}/>}
        header={<span>Беседа</span>}
        subheader={<span>поболтай с другими <br/> игроками</span>}
        background={
            <div
                style={{
                    backgroundColor: 'var(--background_page)',
                }}
            />
        }
    />,
    <Banner
        style={{ margin: 0, width: 200}}
        before={<Icon28Users3Outline width={34} height={34}/>}
        header={<span>Сообщество</span>}
        subheader={<span>будь в курсе нововстей</span>}
        background={
            <div
                style={{
                    backgroundColor: 'var(--background_page)',
                }}
            />
        }
    />,
    <Banner
        style={{ margin: 0, width: 200,}}
        before={<Icon28InfoOutline width={34} height={34}/>}
        header={<span>Спрвка</span>}
        subheader={<span>об игре, правилах и нюансах</span>}
        background={
            <div
                style={{
                    backgroundColor: 'var(--background_page)',
                }}
            />
        }
    />,
    <Banner
        style={{ margin: 0, width: 220}}
        before={<Icon28BombOutline style={{color: "#65c063"}} width={34} height={34}/>}
        header={<span >Подписка</span>}
        subheader={<span>специальные возможности</span>}
        background={
            <div
                style={{
                    backgroundColor: 'var(--background_page)',
                }}
            />
        }
    />
]

const Home = props => (
    <Panel id={props.id}  >
        <PanelHeader
            left={
                <React.Fragment>
                    <PanelHeaderButton onClick={props.go} data-to="achievements">
                        <Icon28RadiowavesAroundOutline/>
                    </PanelHeaderButton>
                    <PanelHeaderButton onClick={props.go} data-to="history" >
                        <Icon28HistoryForwardOutline style={{padding: 9}} width={26} height={26} />
                    </PanelHeaderButton>
                </React.Fragment>
            }
            separator={false}
        >
            Главная
        </PanelHeader>

        <Div >
            <div className={"profile_preview_container"} onClick={props.go}
                 data-to="profile" >
                <div className={'profile_preview'}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
                        <Avatar size={64} src={props.fetchedUser.photo_200} />
                        <Title style={{marginTop: 8}} level="1" weight="semibold">{props.fetchedUser.first_name + ' ' + props.fetchedUser.last_name}</Title>
                    </div>
                    <CardScroll style={{marginTop: 12, marginBottom: 12}} >
                        <Card  style={{backgroundColor: "var(--background_content)"}} >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div style={{  justifyContent: 'center',
                                    alignItems: "center",
                                    display: "flex",
                                    width: 156,
                                    height: 44,
                                    padding: 4,
                                    flexDirection: "row"}} >
                                    <Icon24FavoriteOutline width={32} height={32}/>
                                    <div
                                        style={{ justifyContent: 'center',
                                            display: "flex",
                                            marginLeft: 6,
                                            flexDirection: "column"}}
                                    >
                                        <Caption  level="1" weight="regular" >267</Caption>
                                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >опыта набрано</Caption>
                                    </div>


                                </div>
                            </motion.div>
                        </Card>
                        <Card  style={{backgroundColor: "var(--background_content)"}} >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div style={{  justifyContent: 'center',
                                    alignItems: "center",
                                    display: "flex",
                                    width: 128,
                                    height: 44,
                                    padding: 4,
                                    flexDirection: "row"}} >
                                    <Icon28TicketOutline width={32} height={32}/>
                                    <div
                                        style={{ justifyContent: 'center',
                                            display: "flex",
                                            marginLeft: 6,
                                            flexDirection: "column"}}
                                    >
                                        <Caption  level="1" weight="regular" >13</Caption>
                                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >билетов</Caption>
                                    </div>


                                </div>
                            </motion.div>
                        </Card>
                        <Card  style={{backgroundColor: "var(--background_content)"}}  >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div style={{ justifyContent: 'center',
                                    alignItems: "center",
                                    display: "flex",
                                    width: 144,
                                    height: 44,
                                    padding: 4,
                                    flexDirection: "row"}} >
                                    <Icon36GameOutline/>
                                    <div
                                        style={{ justifyContent: 'center',
                                            display: "flex",
                                            marginLeft: 6,
                                            flexDirection: "column"}}
                                    >
                                        <Caption  level="1" weight="regular" >180</Caption>
                                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >игр сыграно</Caption>
                                    </div>


                                </div>
                            </motion.div>
                        </Card>
                        <Card style={{backgroundColor: "var(--background_content)"}} >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div style={{  justifyContent: 'center',
                                    alignItems: "center",
                                    display: "flex",
                                    width: 128,
                                    height: 44,
                                    padding: 4,
                                    flexDirection: "row"}} >
                                    <Icon28ArrowUpOutline width={36} height={36}/>
                                    <div
                                        style={{ justifyContent: 'center',
                                            display: "flex",
                                            marginLeft: 6,
                                            flexDirection: "column"}}
                                    >
                                        <Caption  level="1" weight="regular" >4</Caption>
                                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >победы</Caption>
                                    </div>


                                </div>
                            </motion.div>
                        </Card>
                        <Card  style={{backgroundColor: "var(--background_content)"}} >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div style={{ justifyContent: 'center',
                                    alignItems: "center",
                                    display: "flex",
                                    width: 144,
                                    height: 44,
                                    padding: 4,
                                    flexDirection: "row"}} >
                                    <Icon28ArrowDownOutline width={36} height={36}/>
                                    <div
                                        style={{ justifyContent: 'center',
                                            display: "flex",
                                            marginLeft: 6,
                                            flexDirection: "column"}}
                                    >
                                        <Caption  level="1" weight="regular" >6</Caption>
                                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >поражений</Caption>
                                    </div>

                                </div>
                            </motion.div>
                        </Card>
                    </CardScroll>
                </div>
                <div
                    className={"profile_preview_icon"}>
                    <Icon24ChevronCompactRight/>
                </div>
            </div>
        </Div>

        <div className={'onlineHomePage'} >
            10 online
        </div>
        <Div style={{display: "flex", alignItems: "center"}}>
            <Button size="xl" before={<Icon28Notifications />} stretched style={{ marginRight: 8 }} mode="secondary">Уведомления</Button>
            <Button size="xl" before={<Icon24CupOutline width={28} height={28} />} onClick={props.go} data-to="top" stretched mode="secondary">Топ</Button>
        </Div>

        <div className={'fullContainer'} >
            <Title level="1" weight="semibold" style={{ marginLeft: 16}} >
                Доступные комнаты
            </Title>
            <SimpleCell style={{marginTop: 12}} onClick={props.go} data-to="game" after={<Icon28ChevronRightCircleOutline/>} >
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
                            <div style={{display: "flex", alignItems: "center",  }} >
                                <Icon20RecentOutline/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} > 5 мин</Caption>
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginLeft: 8 }} >
                                <Icon20Users/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} >4</Caption>
                            </div>
                        </>
                    }
                >
                    Бублик 8 на 8
                </RichCell>
            </SimpleCell>
            <Separator wide={true}/>
            <SimpleCell onClick={props.go} data-to="waitingForStart" after={<Icon28ChevronRightCircleOutline/>} >
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
                            <div style={{display: "flex", alignItems: "center",  }} >
                                <Icon20RecentOutline/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} >бесконечное</Caption>
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginLeft: 8 }} >
                                <Icon20Users/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} >3</Caption>
                            </div>
                        </>
                    }
                >
                    Квадрат 6 на 6
                </RichCell>
            </SimpleCell>
            <Separator wide={true}/>
            <SimpleCell onClick={props.go} data-to="noTickets" after={<Icon28ChevronRightCircleOutline/>} >
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
                            <div style={{display: "flex", alignItems: "center",  }} >
                                <Icon20RecentOutline/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} > 15 мин</Caption>
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginLeft: 8 }} >
                                <Icon20Users/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} >4</Caption>
                            </div>
                        </>
                    }
                >
                    Бублик 8 на 8
                </RichCell>
            </SimpleCell>
            <Separator wide={true}/>
            <SimpleCell onClick={props.go} data-to="intro_1" after={<Icon28ChevronRightCircleOutline/>} >
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
                            <div style={{display: "flex", alignItems: "center",  }} >
                                <Icon20RecentOutline/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} > 10 мин</Caption>
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginLeft: 8 }} >
                                <Icon20Users/>
                                <Caption level="2" weight="regular" style={{marginLeft: 4}} >4</Caption>
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
                    scretched
                    before={<Icon24AddSquareOutline />}
                    onClick={() => props.goToCreatingRoom()}
                >
                    Создать комнату
                </Button>
            </div>
        </div>


        <div
            style={{
                marginTop: 24,
            }}
        >
            <Gallery
                slideWidth="custom"
            >
                {shuffle(gal)}
            </Gallery>
        </div>


    </Panel>
);

export default Home;