import React, {useEffect, useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Top.css'
import {
    Icon56UsersOutline,
    Icon28AchievementCircleFillBlue,
    Icon28FireOutline,
} from '@vkontakte/icons';
import LeaderBoardPlace from '../../components/LeaderBoardPlace'
import GlobalLeaderBoardPlace from "../../components/GlobalLeaderBoardPlace";
import {
    Avatar,
    Search,
    Gallery,
    Group,
    IOS,
    Placeholder,
    platform,
    Separator,
    SimpleCell,
    Tabs,
    Header,
    TabsItem, FixedLayout, Banner, Spinner
} from "@vkontakte/vkui";
import {getFriendsTop, getGlobalTop} from "../../api/api";
import bridge from '@vkontakte/vk-bridge';
const osName = platform();

const Top = ({ id, go, changeActiveModal, fetchedUser }) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [superFightBanner, setSuperFightBanner] = useState(true)
    const [globalTop, setGlobalTop] = useState([])
    const [friendsTop, setFriendsTop] = useState([])

    async function getFriendsTopByBridge () {
        const token = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7848428, "scope": "friends"})
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
        }
    }

    useEffect(() => {
        async function getTops() {
            const globalTop = await getGlobalTop(fetchedUser)
            setGlobalTop(globalTop)
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
        } else {
            let content = []
            console.log(globalTop)
            console.log(globalTop[0])
            globalTop[0].forEach((item, index, array) => {
                content.push(
                    <GlobalLeaderBoardPlace
                        avaUrl={item["avatar"]}
                        exp={item["exp"]}
                        place={index + 1}
                        rank={item["user_rank"]}
                        userName={item["username"]}
                    />
                )
            })

            return content
        }
    }

    function renderFriendsTop () {
        if (friendsTop.length === 0) {
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
                        place={index + 1}
                        avaUrl={item["avatar"]}
                        userName={item["username"]}
                        exp={item["exp"]}/>
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
                </>
            )
        }
    }

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Топ
            </PanelHeader>

            <Tabs>
                <TabsItem
                    onClick={() => setSlideIndex(0)}
                    selected={slideIndex === 0}
                >
                    Друзья
                </TabsItem>
                <TabsItem
                    onClick={() => setSlideIndex(1)}
                    selected={slideIndex === 1}
                >
                    Все
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
                    {renderFriendsTop()}
                    {/*<Separator/>*/}
                    {/*<Group header={*/}
                    {/*    <Header>*/}
                    {/*        Неиграющие друзья*/}
                    {/*    </Header>*/}
                    {/*}>*/}
                    {/*    <SimpleCell before={<Avatar size={40} src={"https://sun9-65.userapi.com/Jm47wQlR6z_R_rbAd_7LUf0NQg7QAv35MpvNhA/Ht8eYywub4o.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Игорь Фёдоров</SimpleCell>*/}
                    {/*    <SimpleCell before={<Avatar size={40} src={"https://sun9-61.userapi.com/O-2f7t0yecmx38WXoF37RkhkJTG2rcjL4Yq88w/J39s0u1f90c.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Иван Засыпкин</SimpleCell>*/}
                    {/*    <SimpleCell before={<Avatar size={40} src={"https://sun9-34.userapi.com/c857132/v857132690/49628/r4wBoWw0mJI.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Илья Гришин</SimpleCell>*/}
                    {/*    <SimpleCell before={<Avatar size={40} src={"https://sun9-60.userapi.com/c851416/v851416327/be840/bnUHAblZoBY.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Тимофей Чаптыков</SimpleCell>*/}
                    {/*    <SimpleCell before={<Avatar size={40} src={"https://sun9-49.userapi.com/c850332/v850332555/115030/JyNJrr4cytY.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Михаил Лихачёв</SimpleCell>*/}

                    {/*</Group>*/}
                </div>
                <div>
                    <Search after={null}/>
                    {superFightBanner&&
                        <Banner
                            mode="image"
                            style={{margin: 0}}
                            before={<Icon28FireOutline fill={'#fff'}/>}
                            header={<span>Супер игра</span>}
                            subheader={<span>Поле 10×17 и 10 игрков. Победитель получает стикерпак!</span>}
                            asideMode="dismiss"
                            onDismiss={() => setSuperFightBanner(false)}
                            background={
                                <div
                                    style={{
                                        backgroundColor: '#ec644c',
                                    }}
                                />
                            }
                            actions={
                                <React.Fragment >
                                    <Button style={{backgroundColor: '#fff', color: '#000'}} onClick={() => changeActiveModal('superFight')} >Подробнее</Button>
                                </React.Fragment>
                            }
                    />
                    }
                    {renderGlobalTop()}
                    </div>
            </Gallery>

            {slideIndex === 1 &&
                <>
                <div style={{height: 110}} />
                <FixedLayout
                    style={{backgroundColor: "var(--background_light)", borderRadius: "20px 20px 0 0"}}
                    vertical="bottom"
                >
                    <div style={{marginTop: 8}} className="end_block">
                        <SimpleCell
                            before={
                                <div className="avatar">
                                    <Avatar size={48} src={fetchedUser.photo_200} className="avatar__photo" />
                                </div>
                            }
                            description={globalTop[1]["exp"] + " опыта · " + globalTop[1]["position"] + " место"}
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