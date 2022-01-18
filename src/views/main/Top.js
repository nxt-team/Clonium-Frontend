import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Top.css'
import {
    Icon32SearchOutline,
    Icon56UsersOutline,
    Icon28AchievementCircleFillBlue,
    Icon28AddSquareOutline,
} from '@vkontakte/icons';
import { Icon28GiftCircleFillYellow } from '@vkontakte/icons';
import LeaderBoardPlace from '../../components/LeaderBoardPlace'
import GlobalLeaderBoardPlace from "../../components/GlobalLeaderBoardPlace";
import {
    Avatar,
    Search,
    Group,
    IOS,
    Placeholder,
    platform,
    Separator,
    SimpleCell,
    Tabs,
    Header,
    TabsItem,
    FixedLayout,
    Banner,
    Spinner
} from "@vkontakte/vkui";
import {getFriendsTop, getGlobalTop} from "../../api/api";
import bridge from '@vkontakte/vk-bridge';
import SwipeableViews from "react-swipeable-views";
import {refLinkShare} from "../../sharing/sharing";
import ExpGlobalLeaderBoardPlace from "../../components/ExpGlobalLeaderBoardPlace";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import config from "../../constatnts/config.json"
const osName = platform();
let updateHeight

const Top = ({ id, goToPage, changeActiveModal, fetchedUser, updateUserProfileVkId }) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [superFightBanner, setSuperFightBanner] = useState(false)
    const [globalTop, setGlobalTop] = useState([])
    const [friendsTop, setFriendsTop] = useState([])
    const [searchData, setSearchData] = useState("")
    const [nonPlayingFriends, setNonPlayingFriends] = useState([])

    async function getFriendsTopByBridge () {
        const token = await bridge.send("VKWebAppGetAuthToken", {"app_id": config["app_id"], "scope": "friends"})
            .catch(() => setFriendsTop(["client_error"]))
        console.log(token)
        if (token !== undefined) {
            const friends = await bridge.send("VKWebAppCallAPIMethod", {
                "method": "friends.get", "request_id": "1", "params":
                    {
                        "user_id": fetchedUser.id,
                        "order": "hints",
                        // "fields": "photo_200_orig",
                        "v": "5.131",
                        "access_token": token["access_token"]
                    }
            });
            console.log(friends["response"]["items"])
            const friendsTop = await getFriendsTop(fetchedUser, friends["response"]["items"])
            setFriendsTop(friendsTop)
            let nonPlaying = await bridge.send("VKWebAppCallAPIMethod", {
                "method": "friends.search", "request_id": "1", "params":
                    {
                        "user_id": fetchedUser.id,
                        "fields": "photo_200,sex",
                        "q": "",
                        "v": "5.131",
                        "count": 10,
                        "access_token": token["access_token"]
                    }
            });
            const friendsInGame = []
            friendsTop[0].forEach((item) => friendsInGame.push(item["vk_id"]))
            nonPlaying = nonPlaying["response"]["items"].filter(item => friendsInGame.indexOf(item["id"]) === -1)
            nonPlaying.splice(5)
            setNonPlayingFriends(nonPlaying)
            updateHeight.updateHeight()
        }
    }

    useEffect(() => {
        async function getTops() {
            const globalTop = await getGlobalTop(fetchedUser)
            setGlobalTop(globalTop)
            updateHeight.updateHeight()
            await getFriendsTopByBridge()
        }
        getTops();
    }, []);

    function renderGlobalTop () {
        if (globalTop.length === 0) {
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{ marginTop: 20 }} />
                </div>
            )
        } else if (searchData.toLocaleLowerCase() === "индюк") {
            return (
                <Placeholder
                    scretched
                    icon={<Icon32SearchOutline width={56} height={56} />}
                    header="Сам индюк"
                >
                   Ты нашёл пасхалку
                </Placeholder>
            )
        }
        
        else if (searchData.trim().length > 0) {
            const search = searchData.toLowerCase()
            const data = globalTop[2].filter(({username}) => username.toLowerCase().indexOf(search) > -1);
            let content = []
            console.log(data)
            data.forEach((item, index) => {
                content.push(
                    <GlobalLeaderBoardPlace
                        onClick={() => {
                            console.log("clicked")
                            updateUserProfileVkId(item["vk_id"])
                            changeActiveModal("profileModal")
                        }}
                        avaUrl={item["avatar"]}
                        rate={Math.round(item["rating"])}
                        place={index + 1}
                        rank={item["user_rank"]}
                        userName={item["username"]}
                        vkDonut={item["vk_donut"]}
                        piece_avatar={item["piece_avatar"]}
                    />
                )
            })
            if (content.length) {
                return content
            } else {
                return (
                    <Placeholder
                        scretched
                        icon={<Icon32SearchOutline width={56} height={56} />}
                        header="Ничего не найдено"
                    >
                        Возможно, игрок не входит в топ 100 или не зарегестрирован в приложении
                    </Placeholder>
                )
            }
        } else {
            let content = []
            console.log(globalTop[0])
            globalTop[2].forEach((item, index) => {
                content.push(
                    <GlobalLeaderBoardPlace
                        onClick={() => {
                            console.log("clicked")
                            updateUserProfileVkId(item["vk_id"])
                            changeActiveModal("profileModal")
                        }}
                        avaUrl={item["avatar"]}
                        rate={Math.round(item["rating"])}
                        place={index + 1}
                        rank={item["user_rank"]}
                        userName={item["username"]}
                        vkDonut={item["vk_donut"]}
                        piece_avatar={item["piece_avatar"]}
                    />
                )
            })

            return content
        }
    }

    function renderFriendsTop () {
        if (friendsTop.length === 0 ) {
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{ margin: 20 }} />
                </div>
            )
        } else if (friendsTop[0] === "client_error") {
            return (
                <Placeholder
                    icon={<Icon56UsersOutline />}
                    header="Нет доступа к друзьям"
                    action={<Button size="l" onClick={async () => {setFriendsTop([]); await getFriendsTopByBridge()}} >Дать доступ</Button>}
                >
                    Сначала дай нам доступ к друзьям, и только потом мы покажем их топ
                </Placeholder>
            )
        } else {
            let content = []
            friendsTop[0].forEach((item, index, array) => {
                content.push(
                    <LeaderBoardPlace
                        onClick={() => {
                            console.log("clicked")
                            updateUserProfileVkId(item["vk_id"])
                            // goToPage("userProfile")
                            changeActiveModal("profileModal")
                        }}
                        place={index + 1}
                        avaUrl={item["avatar"]}
                        userName={item["username"]}
                        exp={item["exp"]}/>
                )
            })
            let nonPlayingFriendsContent = []
            nonPlayingFriends.forEach((item) => {
                nonPlayingFriendsContent.push(
                    <SimpleCell
                        style={{cursor: "pointer"}}
                        before={<Avatar size={40} src={item["photo_200"]} />}
                        after={<Icon28AddSquareOutline />}
                        onClick={() => refLinkShare(fetchedUser.id)}
                    >
                        {item["first_name"] + " " + item["last_name"]}
                    </SimpleCell>
                )
            })
            return (
                <>
                    <Placeholder
                        icon={<Icon28AchievementCircleFillBlue height={56} width={56} />}
                        header={friendsTop[1] + " место"}
                    >
                        в топе среди друзей
                    </Placeholder>
                    <Separator/>
                    <Group header={
                        <Header>
                            Играющие друзья
                        </Header>
                    }>
                        {content}
                    </Group>
                    {nonPlayingFriends.length > 0 &&
                        <>
                            <Separator/>
                            <Group header={
                                <Header>
                                    Неиграющие друзья
                                </Header>
                            }>
                                {nonPlayingFriendsContent}
                            </Group>
                        </>
                    }
                    <div style={{height: "calc(8px + var(--safe-area-inset-bottom))"}} />
                </>
            )
        }
    }

    function renderExpTop () {
        if (globalTop.length === 0) {
            return (
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{marginTop: 20}}/>
                </div>
            )
        } else {
            let content = [

            ]
            globalTop[0].forEach((item, index) => {
                content.push(
                    <ExpGlobalLeaderBoardPlace
                        onClick={() => {
                            updateUserProfileVkId(item["vk_id"])
                            changeActiveModal("profileModal")
                        }}
                        avaUrl={item["avatar"]}
                        exp={item["exp"]}
                        place={index + 1}
                        rank={item["user_rank"]}
                        userName={item["username"]}
                        vkDonut={item["vk_donut"]}
                        piece_avatar={item["piece_avatar"]}
                        illumination={item["username"] === fetchedUser.first_name + ' ' + fetchedUser.last_name}
                    />
                )
            })

            return content
        }
    }

    function getUserStat () {
        if (slideIndex === 1) {
            if (globalTop[1]["position"] !== 0) {
                return globalTop[1]["exp"] + " опыта · " + globalTop[1]["position"] + " место"
            } else {
                return globalTop[1]["exp"] + " опыта"
            }

        } else if (slideIndex === 2) {
            if (globalTop[3]["position"] !== 0) {
                return "рейтинг " + Math.round(globalTop[3]["rating"]) + " · " + globalTop[3]["position"] + " место"
            } else {
                return "рейтинг " + Math.round(globalTop[3]["rating"])
            }
        }
    }

    return (
        <Panel id={id} style={{position: "fixed"}}>
            <PanelHeader
                left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Топ
            </PanelHeader>

            <Tabs>
                <TabsItem
                    onClick={() => {
                        setSlideIndex(0)
                    }}
                    selected={slideIndex === 0}
                >
                    Друзья
                </TabsItem>
                <TabsItem
                    onClick={() => setSlideIndex(1)}
                    selected={slideIndex === 1}
                    after={
                        <div className={"top__ImgContainer"}>
                            <Icon28GiftCircleFillYellow width={20} height={20}  />
                        </div>
                    }
                >
                    Опыт
                </TabsItem>
                <TabsItem
                    onClick={() => setSlideIndex(2)}
                    selected={slideIndex === 2}
                >
                    Рейтинг
                </TabsItem>
            </Tabs>
            <SwipeableViews
                action={(action) => updateHeight = action}
                enableMouseEvents
                // animateHeight
                index={slideIndex}
                onChangeIndex={slideIndex => {
                    if (slideIndex === 0) {
                        document.getElementById("topSearch").blur()
                    }
                    setSlideIndex(slideIndex)
                }}
            >
                <div className={"friendsSlide"} >
                    {renderFriendsTop()}
                </div>
                <div className={"globalSlide"} >
                    <Banner
                        mode="image"
                        style={{margin: 0, marginBottom: 4}}
                        imageTheme={"light"}
                        before={<Avatar src={"https://media.discordapp.net/attachments/655117045616082974/905169136798290000/256-removebg-preview.png"}/>}
                        header={
                            <Title level="2" weight="semibold" className={"top_exp_banner_header"} >
                                Раздаём призы топу
                            </Title>
                        } // <span className={"top_exp_banner_header"}>Раздаем призы топу</span>
                        subheader={<span className={"top_exp_banner_subheader"} >Каждую неделю этот топ обнуляется. Первые 3 лидера получают стикеры и Clonium Pass.</span>}
                        background={
                            <div className={"top_exp_banner"} />
                        }
                        actions={
                            <React.Fragment >
                                <Button style={{backgroundColor: '#fff', color: '#000'}} href="https://vk.com/@pipeweb-topy-klonii" rel="noreferrer" target="_blank" >Подробнее</Button>
                            </React.Fragment>
                        }
                    />
                    {renderExpTop()}
                </div>
                <div className={"globalSlide"} >
                    <Search
                        id="topSearch"
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                        after={null}
                    />
                    {renderGlobalTop()}
                </div>
            </SwipeableViews>

            {(slideIndex !== 0 && globalTop.length !== 0)&&
                <>
                <FixedLayout
                    style={{backgroundColor: "var(--background_light)", borderRadius: "20px 20px 0 0"}}
                    vertical="bottom"
                >
                    <div style={{marginTop: 8}} className="end_block">
                        <SimpleCell
                            disabled={true}
                            before={
                                <div className="avatar">
                                    <Avatar size={48} src={fetchedUser.photo_200} className="avatar__photo" />
                                </div>
                            }
                            description={getUserStat()}
                        >
                            {fetchedUser.first_name + ' ' + fetchedUser.last_name}
                        </SimpleCell>

                    </div>
                    </FixedLayout>
                </>
                }


        </Panel>
    )
};



export default Top;