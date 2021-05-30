import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './game.css'
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import './home.css';
import './other.scss'
import { Icon28PincodeOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { Icon56DonateOutline } from '@vkontakte/icons';
import { Icon28PaletteOutline } from '@vkontakte/icons';
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon28ArrowDownOutline from '@vkontakte/icons/dist/28/arrow_down_outline';
import Icon28ArrowUpOutline from '@vkontakte/icons/dist/28/arrow_up_outline';
import Icon24StoryOutline from '@vkontakte/icons/dist/24/story_outline';
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import { motion } from "framer-motion"

import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';
import Icon28TicketOutline from '@vkontakte/icons/dist/28/ticket_outline';
import {Card, CardScroll, Input, FormLayoutGroup, Group, IOS, Placeholder, platform, SimpleCell} from "@vkontakte/vkui";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
const osName = platform();

const Profile = ({ id, go, fetchedUser, changeActiveModal }) => {

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Профиль
            </PanelHeader>

            <Placeholder
                icon={<Avatar size={72} src={fetchedUser.photo_200} />}
                header={fetchedUser.first_name + ' ' + fetchedUser.last_name}
                action={<Button size="l" before={<Icon24StoryOutline/>} >Попонтаваться</Button>}
            >
                начинающий
            </Placeholder>
            <Title level="1" weight="semibold" style={{ marginLeft: 16 }} >
                Статистика
            </Title>

            <Group
                separator="hide"
                >
                <CardScroll style={{marginBottom: 6}}>
                    <Card size="s"  >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div style={{ justifyContent: 'center',
                                alignItems: "center",
                                display: "flex",
                                width: 144,
                                height: 56,
                                padding: 4,
                                flexDirection: "row"}} >
                                <Icon36GameOutline style={{color: 'var(--accent)'}} />
                                <div
                                    style={{ justifyContent: 'center',
                                        display: "flex",
                                        marginLeft: 6,
                                        flexDirection: "column"}}
                                >
                                    <Caption level="1" weight="regular">180</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3"
                                             weight="regular">игр сграно</Caption>
                                </div>


                            </div>
                        </motion.div>
                    </Card>
                    <Card size="s"  >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div style={{  justifyContent: 'center',
                                alignItems: "center",
                                display: "flex",
                                width: 128,
                                height: 56,
                                padding: 4,
                                flexDirection: "row"}} >
                                <Icon28ArrowUpOutline style={{color: 'var(--button_commerce_background)'}} width={36} height={36}/>
                                <div
                                    style={{ justifyContent: 'center',
                                        display: "flex",
                                        marginLeft: 6,
                                        flexDirection: "column"}}
                                >
                                    <Caption level="1" weight="regular">4</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3"
                                             weight="regular">победы</Caption>
                                </div>


                            </div>
                        </motion.div>
                    </Card>
                    <Card size="s"  >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div style={{ justifyContent: 'center',
                                alignItems: "center",
                                display: "flex",
                                width: 144,
                                height: 56,
                                padding: 4,
                                flexDirection: "row"}} >
                                <Icon28ArrowDownOutline style={{color: 'var(--destructive)'}} width={36} height={36}/>
                                <div
                                    style={{ justifyContent: 'center',
                                        display: "flex",
                                        marginLeft: 6,
                                        flexDirection: "column"}}
                                >
                                    <Caption level="1" weight="regular">7</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3"
                                             weight="regular">поражений</Caption>
                                </div>


                            </div>
                        </motion.div>
                    </Card>
                </CardScroll>
            </Group>

            <Banner
                before={<Avatar style={{boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 8%) !important"}} mode="app"><Icon28TicketOutline style={{color: "var(--text_primary)"}} /></Avatar>}
                header={<span >14 билетов</span>}
                subheader={<span>Билеты нужны для игры. 1 билет = 1 игра. Каждый день тебе будут доваться 5 билетеков. Дополнительно билетики можно получить за просмотр рекламы</span>}
                actions={<Button mode="primary"  >Получить билетик</Button>}
            />
            <Banner
                before={<Avatar mode="app"><Icon24FavoriteOutline width={28} height={28} style={{color: "var(--text_primary)"}} /></Avatar>}
                header={<span >223 опыта </span>}
                subheader={<span>Опыт даётся за сыгранный бой. За преждевременный выход из боя мы отберём у тебя 2 опыта. </span>}
                actions={<Button mode="primary" >Подробнее</Button>}
            />
            {/*<FormLayout  >*/}
            {/*    <FormLayoutGroup>*/}
            {/*        <div style={{display: "flex", justifyContent: "space-between"}} >*/}
            {/*            <div style={{width: "100%"}}>*/}
            {/*                <Input placeholder="Промокод" type="text" maxLength={8}/>*/}
            {/*            </div>*/}
            {/*            <Button*/}
            {/*                mode="secondary"*/}
            {/*                style={{*/}
            {/*                    padding: "0 8px",*/}
            {/*                    marginLeft: 0,*/}
            {/*                    alignSelf: "flex-end",*/}
            {/*                    height: 44*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                Активировать*/}
            {/*            </Button>*/}
            {/*        </div>*/}
            {/*    </FormLayoutGroup>*/}
            {/*</FormLayout>*/}


            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Прочее
            </Title>
            <div className={"containerProfile"}>
                <div className={'fullContainer'} >
                    <SimpleCell before={<Icon28ServicesOutline  />} expandable onClick={() => bridge.send("VKWebAppAddToFavorites") /* bridge.send("VKWebAppAddToMenu")*/ }  >Добавь сервис в избранные</SimpleCell>
                    <SimpleCell before={<Icon28ShareOutline  />} onClick={() => bridge.send("VKWebAppShare", {"link": "https://vk.com/app7705406#invite=" + fetchedUser.id})} expandable >Расскажи друзьям</SimpleCell>
                    <SimpleCell before={<Icon28PaletteOutline  />} onClick={go} data-to="customization" expandable >Кастомизация</SimpleCell>
                    <SimpleCell before={<Icon28EditOutline  />} target="_blank" href="https://vk.com/topic-199025669_47671567" expandable >Обратная связь</SimpleCell>
                    <SimpleCell before={<Icon28PincodeOutline  />} onClick={() => changeActiveModal("promoСodeActivation")} expandable >Активировать промокод</SimpleCell>
                </div>

            <div className="Other__notify">
                <div className="Other__notify__cont_wrap">
                    <div className="Other__notify__cont">
                        <div className="Other__notify__title">Оформи подписку VK Donut</div>
                        <div className="Other__notify__caption">
                            Поддержи разработчика и получи доступ к крутым функциям и плюшкам
                        </div>
                    </div>
                    <div className="Other__notify__icon donut">
                        <Icon56DonateOutline />
                    </div>
                </div>
                <div className="Other__notify__actions">
                    <Button
                        onClick={() => changeActiveModal('aboutVkDonut')}
                        size="l"
                    >Подробнее</Button>
                    <Button
                        size="l"
                        mode="tertiary"
                    >Обновить</Button>
                </div>
            </div>
            </div>
            <div style={{height: 12}}/>


        </Panel>
    )
};

export default Profile;