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
    PanelHeaderButton,
    Spinner,
    PullToRefresh,
    Tooltip
} from '@vkontakte/vkui';

import {
    Icon24AddSquareOutline,
    Icon20RecentOutline,
    Icon20Users,
    Icon28RadiowavesAroundOutline,
    Icon28ChevronRightCircleOutline,
    Icon28HistoryForwardOutline,
    Icon24ChevronCompactRight,
    Icon28DonateCircleFillYellow,
    Icon24Switch
} from '@vkontakte/icons';

import './home.css';
import './game.css'
import './home.css';

import MainButtons from "../../components/MainButtons";
import InfoBanners from "../../components/InfoBanners"
import UserStat from "../../components/UserStat";
import {getFights} from "../../api/api";
import {joinRoom} from "../../api/socket";
import Online from "../../components/online";

const numericIndicator = {
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
}

const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

const Home = ({id, go, isStartTooltip, resetIsStartTooltip, changeActiveModal, goToCreatingRoom, fetchedUser, userBalances, online, updateNeedUsersInFight, updateSecretId, updateNotifications, startupParameters, goIsolated, goToAchievements, goToHistory, goToPage}) => {

    const [fights, setFights] = useState([])
    const [isShownStartTooltip, setIsShownStartTooltip] = useState(isStartTooltip)

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
                        needPlayers = "?????????????? 1 ????????????"
                        break;
                    case 2:
                        needPlayers = "?????????????? 2 ??????????????"
                        break;
                    case 3:
                        needPlayers = "?????????????? 3 ??????????????"
                        break;
                    case 4:
                        needPlayers = "?????????????? 4 ??????????????"
                        break;
                }

                let mapName = ""

                switch (item["map_name"]) {
                    case "DonutSize6":
                        mapName = "???????????? 6 ???? 6"
                        break;
                    case "DonutSize8":
                        mapName = "???????????? 8 ???? 8"
                        break;
                    case "GridSize8":
                        mapName = "?????????? 8 ???? 8"
                        break;
                    case "GridSize10":
                        mapName = "?????????? 10 ???? 10"
                        break;
                    case "PassageSize10":
                        mapName = "????????????"
                        break;
                    case "SquareSize6":
                        mapName = "?????????????? 6 ???? 6"
                        break;
                    case "SquareSize8":
                        mapName = "?????????????? 8 ???? 8"
                        break;
                    case "CrossSize9":
                        mapName = "??????????"
                        break;
                    case "WhirlSize10":
                        mapName = "??????????"
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
                    <SimpleCell style={{marginTop: 12, cursor: "pointer"}}
                                onClick={() => {
                                    updateNeedUsersInFight(item["max_user_number"]);
                                    updateSecretId(item["secret_id"])
                                    joinRoom(fetchedUser, item["secret_id"]);
                                    goIsolated("waitingForStart");
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
                                        <Caption level="2" weight="regular" style={{marginLeft: 4}}>{item["game_time"] !== -1 ? item["game_time"] / 60 + " ??????" : "??????????????????????"}</Caption>
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
                        {!userBalances["are_notifications_enabled"] &&
                        <PanelHeaderButton onClick={goToAchievements}>
                            <Icon28RadiowavesAroundOutline/>
                        </PanelHeaderButton>
                        }
                        <PanelHeaderButton onClick={goToHistory}>
                            <Icon28HistoryForwardOutline style={{padding: 9}} width={26} height={26}/>
                        </PanelHeaderButton>
                    </React.Fragment>
                }
                separator={false}
            >
                ??????????????
            </PanelHeader>
            <PullToRefresh
                isFetching={fights.length === 0}
                onRefresh={async () => {
                    setFights([]);
                    const fights = await getFights(fetchedUser)
                    setFights(fights)
                }}>

                <Div>
                    <div className={"profile_preview_container"} onClick={!isShownStartTooltip && go}
                         data-to="profile">
                        <div className={'profile_preview'}>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                {/*<Avatar size={64} src={fetchedUser.photo_200}/>*/}
                                <div className="avatar" style={{margin: "6px 0 6px 0"}}>
                                    <Avatar size={64} src={fetchedUser.photo_200} className="avatar__photo" />
                                    <div className="avatar__indicator" >
                                        {getIcon()}
                                    </div>
                                </div>
                                <div
                                    style={{marginTop: 8, display: "block", width: "calc(100% - 16px)", textAlign: "center", marginLeft: 8, marginRight: 8}}
                                >
                                    <Title
                                        level="1"
                                        weight="semibold"
                                        style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", lineHeight: "34px"}}
                                    >
                                        <span dangerouslySetInnerHTML={{__html: fetchedUser.first_name + ' ' + fetchedUser.last_name}}/>
                                    </Title>
                                </div>
                            </div>
                            <UserStat
                                exp={userBalances["exp"]}
                                tickets={userBalances["tickets"]}
                                rate={userBalances["rate"]}
                            />
                        </div>
                        <div
                            className={"profile_preview_icon"}>
                            <Icon24ChevronCompactRight/>
                        </div>
                    </div>
                </Div>

                <Online online={online} />
                <MainButtons
                    goToPage={goToPage}
                    goToAchievements={goToAchievements}
                    updateNotifications={updateNotifications}
                    changeActiveModal={changeActiveModal}
                    vkDonut={userBalances["vk_donut"]}
                    areNotificationsEnabled={userBalances["are_notifications_enabled"]}
                    isUserInSuperFight={false}
                />
                <Tooltip
                    mode="light"
                    text="?????????? ?? ??????????????, ?????????? ???????????? ????????"
                    isShown={isShownStartTooltip}
                    onClose={() => {setIsShownStartTooltip(false); resetIsStartTooltip()}}
                    offsetX={10}
                    offsetY={0}
                    alignY={"top"}
                >
                    <div className={'fullContainer'}>
                        <div style={{display: "flex", justifyContent: "space-between"}} >
                            <Title level="1" weight="semibold" style={{marginLeft: 16}} >
                                ?????????????????? ??????????????
                            </Title>

                            {startupParameters.get('vk_platform') === "desktop_web" &&
                                <div className={"refreshButton"} onClick={async () => {
                                    setFights([]);
                                    const fights = await getFights(fetchedUser)
                                    setFights(fights)
                                }}>
                                    <Icon24Switch width={20} height={20} />
                                </div>
                            }

                        </div>

                        {renderFights()}

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
                                ?????????????? ??????????????
                            </Button>
                        </div>
                    </div>
                </Tooltip>



                <div
                    style={{
                        marginBottom: 12
                    }}
                >
                    <InfoBanners changeActiveModal={changeActiveModal} startupParameters={startupParameters} />
                </div>
            </PullToRefresh>


        </Panel>
    )
}

export default Home;