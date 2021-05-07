import React, { useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Top.css'
import {
    Icon28AddSquareOutline,
    Icon56UsersOutline,
    Icon28AchievementCircleFillBlue,
    Icon28FireOutline,
    Icon201CircleFillGold
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
    TabsItem, FixedLayout, Banner
} from "@vkontakte/vkui";
const osName = platform();

const Top = ({ id, go, changeActiveModal, fetchedUser }) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [superFightBanner, setSuperFightBanner] = useState(true)

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
                <TabsItem
                    onClick={() => setSlideIndex(2)}
                    selected={slideIndex === 2}
                >
                    Друзья2
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
                    <Placeholder
                        icon={<Icon28AchievementCircleFillBlue height={56} width={56} />}
                        header="I место"
                    >
                        в топе среди друзей
                    </Placeholder>
                    <Separator/>
                    <Group header={
                        <Header>
                            Играющие друзья
                        </Header>
                    }>
                        <LeaderBoardPlace place={1} avaUrl={fetchedUser.photo_200} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name} exp={150}/>
                        <LeaderBoardPlace place={2} avaUrl={"https://sun1-83.userapi.com/s/v1/ig2/JS57hZzqjd_faSZrR9m3P7W_-fFbo7PUWOBTsfyKMA5O1sRHcvIyU83LibkB696aWN_iFG9jrV6-71dHsZDxzsCv.jpg?size=200x0&quality=96&crop=59,3,963,963&ava=1"} userName={"Фёдор Темников"} exp={59}/>
                        <LeaderBoardPlace place={3} avaUrl={"https://sun1-95.userapi.com/s/v1/ig2/zC9hZf5wO-uV0H6uePP6m1o5DvVX23XU3mpmWCYx3oZdVZsl9kxts4s_MQ85brgMY3qK_xsT1mKxF-H713SXZDZB.jpg?size=200x0&quality=96&crop=105,0,915,915&ava=1"} userName={"Ярик Кращук"} exp={15}/>

                    </Group>
                    <Separator/>
                    <Group header={
                        <Header>
                            Неиграющие друзья
                        </Header>
                    }>
                        <SimpleCell before={<Avatar size={40} src={"https://sun9-65.userapi.com/Jm47wQlR6z_R_rbAd_7LUf0NQg7QAv35MpvNhA/Ht8eYywub4o.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Игорь Фёдоров</SimpleCell>
                        <SimpleCell before={<Avatar size={40} src={"https://sun9-61.userapi.com/O-2f7t0yecmx38WXoF37RkhkJTG2rcjL4Yq88w/J39s0u1f90c.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Иван Засыпкин</SimpleCell>
                        <SimpleCell before={<Avatar size={40} src={"https://sun9-34.userapi.com/c857132/v857132690/49628/r4wBoWw0mJI.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Илья Гришин</SimpleCell>
                        <SimpleCell before={<Avatar size={40} src={"https://sun9-60.userapi.com/c851416/v851416327/be840/bnUHAblZoBY.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Тимофей Чаптыков</SimpleCell>
                        <SimpleCell before={<Avatar size={40} src={"https://sun9-49.userapi.com/c850332/v850332555/115030/JyNJrr4cytY.jpg?ava=1"} />} after={<Icon28AddSquareOutline />}>Михаил Лихачёв</SimpleCell>

                    </Group>
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
                                    <Button style={{backgroundColor: '#fff', color: '#000'}} onClick={() => changeActiveModal('SuperFight')} >Подробнее</Button>
                                </React.Fragment>
                            }
                    />
                    }

                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={100} place={1} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={97} place={2} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={83} place={3} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={69} place={4} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={54} place={5} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={51} place={6} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={48} place={7} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={45} place={8} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={43} place={9} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                    <GlobalLeaderBoardPlace avaUrl={"https://vk.com/images/camera_200.png"} exp={37} place={10} rank={"Властелин"} userName={fetchedUser.first_name + ' ' + fetchedUser.last_name}/>
                </div>
                <div>
                    <Placeholder
                        icon={<Icon56UsersOutline />}
                        header="Нет доступа к друзьям"
                        action={<Button size="l" >Дать доступ</Button>}
                    >
                        Сначала дай нам доступ к друзьям, и только потом мы покажем их топ
                    </Placeholder>
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
                            description={"7 опыта · 1456 место"}
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