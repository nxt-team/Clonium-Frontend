import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import UsersStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './Top.css'
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import { motion } from "framer-motion"

import {Avatar, Div, Group, IOS, Placeholder, platform, Separator, Tabs, TabsItem} from "@vkontakte/vkui";
const osName = platform();

let config = [
    {
        "public_id": 186517166,
        "name": "Постирония для ветеранов",
        "avatar": "https://sun9-8.userapi.com/XJz4KstT3LbvZXA2-9AhiUmIssdMIrHu8HgXaw/vf1Gyeeg5B0.jpg",
        "experience": 1340,
    },
    {
        "public_id": 184298886,
        "name": "Я ленивый",
        "avatar": "https://sun9-55.userapi.com/d7erU2sYyBZyEEfW4m3KrfFTWpMDRhp3oGUy_g/Fn3iHIut_-Q.jpg",
        "experience": 510,
    },
    {
        "public_id": 195951895,
        "name": "GameBot",
        "avatar": "https://sun9-65.userapi.com/4-VUgK-GYtF3IC5vIO51lA75GlpMUjBT_7IZyw/aTewc5ftdWM.jpg",
        "experience": 245,
    }
]



const Home = ({ id, go, changeActiveModal, fetchedUser }) => {

    const [activeTab, setActiveTab] = useState('all');

    function secondVectorPush (params) {
        let secondVector = []

        if (activeTab !== 'friends') {
            for (let i = 0; i < config.length; i++) {
                secondVector.push(
                    <div
                        style={{
                            marginLeft: 6,
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row"
                        }}
                    >
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">{i + 1}</Caption>
                        <RichCell
                            href={ "https://vk.com/public" + params[i].public_id}
                            before={<Avatar size={48} src={params[i].avatar} />}
                        >
                            <h4 className={"kkk"}>{params[i].name}</h4>
                            <React.Fragment>
                                <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >{params[i].experience + " опыта"}</Caption>
                            </React.Fragment>
                        </RichCell>
                    </div>

                )
            }
            secondVector.push(
                <div
                    style={{
                        marginLeft: 6,
                        justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: 6,
                    }}
                >
                    <Button mode='tertiary' after={<Icon16Dropdown/>}>
                        Загрущить ещё
                    </Button>
                </div>
            )
            secondVector.push(
                <Separator/>
            )
            secondVector.push(
                <div
                    style={{
                        marginLeft: 6,
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">140</Caption>
                    <RichCell
                        before={<Avatar size={48} src={fetchedUser.photo_200} />}
                    >
                        <h4 className={"kkk"}>{fetchedUser.first_name + ' ' + fetchedUser.last_name}</h4>
                        <React.Fragment>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >{"3 опыта"}</Caption>
                        </React.Fragment>
                    </RichCell>
                </div>
            )
        } else {
            secondVector.push(
                <>
                    <Placeholder
                        icon={<Icon56UsersOutline />}
                        header="Нет доступа к друзьям"
                        action={<Button size="l" >Дать доступ</Button>}
                    >
                        Сначала дай нам доступ к друзьям, и только потом мы покажем их топ
                    </Placeholder>
                </>
            )
        }

        return(secondVector)

    }

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Топ
            </PanelHeader>

            <Tabs>
                <TabsItem
                    onClick={() => setActiveTab('all')}
                    selected={activeTab === 'all'}
                >
                    Все
                </TabsItem>
                <TabsItem
                    onClick={() => setActiveTab('friends')}
                    selected={activeTab === 'friends'}
                >
                    Друзья
                </TabsItem>
            </Tabs>
            {secondVectorPush(config)}
            <Banner
                before={<Icon28FireOutline fill={'#ec644c'}/>}
                header={<span>Супер игра</span>}
                subheader={<span>Игра на поле 10 на 17 между 10 игроками. Победитель получает стикерпак!</span>}
                actions={
                    <React.Fragment>
                        <Button mode="primary" >Участвовать</Button>
                        <Button  mode="tertiary" size="l" onClick={() => changeActiveModal('SuperFight')} >Подробнее</Button>
                    </React.Fragment>
                    }
            />

        </Panel>
    )
};



export default Home;