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
import { Icon28SmartphoneOutline } from '@vkontakte/icons';
import Icon28ArrowDownOutline from '@vkontakte/icons/dist/28/arrow_down_outline';
import Icon28ArrowUpOutline from '@vkontakte/icons/dist/28/arrow_up_outline';
import Icon24StoryOutline from '@vkontakte/icons/dist/24/story_outline';
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import { Icon28DeleteOutline } from '@vkontakte/icons';
import { Icon28ChatsOutline } from '@vkontakte/icons';
import { motion } from "framer-motion"

import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';
import Icon28TicketOutline from '@vkontakte/icons/dist/28/ticket_outline';
import {
    Card,
    CardScroll,
    Input,
    FormLayoutGroup,
    Group,
    IOS,
    Placeholder,
    platform,
    SimpleCell,
    ANDROID,
    Link
} from "@vkontakte/vkui";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {loadFonts, postShare, showOffsStoryShare} from "../../sharing/sharing";
import {deleteUser} from "../../api/api";
const osName = platform();

const Profile = ({ id, go, fetchedUser, changeActiveModal, userBalances, startupParameters, screenSpinnerOff, screenSpinnerOn, goToClearCache }) => {

    function getTickets(tickets) {
        if (tickets % 100 !== 11 && tickets % 10 === 1) {
            return tickets + ' билет'
        }
        if (tickets % 100 !== 12 && tickets % 100 !== 13 && tickets % 100 !== 14 && (tickets % 10 === 2 || tickets % 10 === 3 || tickets % 10 === 4)) {
            return tickets + ' билета'
        } else {
            return tickets + ' билетов'
        }
    }

    function getExp(exp) {
        if (exp % 100 !== 11 && exp % 10 === 1) {
            return exp + ' опыт набран'
        } else {
            return exp + ' опыта набрано'
        }
    }

    function gamesCaption(games) {
        if (games % 100 !== 11 && games % 10 === 1) {
            return 'игра сыграна'
        } else {
            return 'игр сыграно'
        }
    }

    function winsCaption(wins) { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (wins % 100 !== 11 && wins % 10 === 1) {
            return 'победа'
        }
        if (wins % 100 !== 12 && wins % 100 !== 13 && wins % 100 !== 14 && (wins % 10 === 2 || wins % 10 === 3 || wins % 10 === 4)) {
            return 'победы'
        } else {
            return 'побед'
        }
    }

    function losesCaption(loses) { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (loses % 100 !== 11 && loses % 10 === 1) {
            return 'поражение'
        }
        if (loses % 100 !== 12 && loses % 100 !== 13 && loses % 100 !== 14 && (loses % 10 === 2 || loses % 10 === 3 || loses % 10 === 4)) {
            return 'поражения'
        } else {
            return 'поражений'
        }
    }

    function story() {
        screenSpinnerOn()
        showOffsStoryShare(
            fetchedUser.id,
            fetchedUser.first_name + " " + fetchedUser.last_name,
            fetchedUser.photo_200,
            userBalances["user_rank"],
            userBalances["fights"],
            userBalances["wins"],
            userBalances["losses"],
            userBalances["exp"],
            screenSpinnerOff
        )
    }

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Профиль
            </PanelHeader>
            <div id="d2">аа</div>
            <div id="d1">.</div>

            <Placeholder
                icon={<Avatar size={72} src={fetchedUser.photo_200} />}
                header={fetchedUser.first_name + ' ' + fetchedUser.last_name}
                action={<Button size="l" before={<Icon24StoryOutline/>} onClick={() => story()}>Попонтаваться</Button>}
            >
                {userBalances["user_rank"]}
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
                                    <Caption level="1" weight="regular">{userBalances["fights"]}</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3"
                                             weight="regular">{gamesCaption(userBalances["fights"])}</Caption>
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
                                    <Caption level="1" weight="regular">{userBalances["wins"]}</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3"
                                             weight="regular">{winsCaption(userBalances["wins"])}</Caption>
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
                                    <Caption level="1" weight="regular">{userBalances["losses"]}</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3"
                                             weight="regular">{losesCaption(userBalances["losses"])}</Caption>
                                </div>


                            </div>
                        </motion.div>
                    </Card>
                </CardScroll>
            </Group>

            <Banner
                before={<Avatar style={{boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 8%) !important"}} mode="app"><Icon28TicketOutline style={{color: "var(--text_primary)"}} /></Avatar>}
                header={<span >{getTickets(userBalances["tickets"])}</span>}
                subheader={<span>Билеты нужны для игры. 1 билет = 1 игра. Дополнительно билеты можно получить за просмотр рекламы</span>}
                actions={<Button mode="primary" onClick={() => changeActiveModal("ticketFromAd")} >Получить билетик</Button>}
            />
            <Banner
                before={<Avatar mode="app"><Icon24FavoriteOutline width={28} height={28} style={{color: "var(--text_primary)"}} /></Avatar>}
                header={<span >{getExp(userBalances["exp"])}</span>}
                subheader={<span>Опыт можно получить за хорошую игру в бою.</span>}
                actions={<Button mode="primary" target="_blank" href="https://vk.com/@nxt.team-clonium" >Подробнее</Button>}
            />


            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Прочее
            </Title>
            <div className={"containerProfile"}>
                <div className={'fullContainer'} >
                    <SimpleCell before={<Icon28ServicesOutline/>} expandable onClick={() => bridge.send("VKWebAppAddToFavorites") /* bridge.send("VKWebAppAddToMenu")*/ }  >Добавь сервис в избранные</SimpleCell>
                    <SimpleCell before={<Icon28ShareOutline/>} onClick={() => postShare(fetchedUser.id)} expandable >Рассказать друзьям</SimpleCell>
                    <SimpleCell before={<Icon28PaletteOutline/>} onClick={go} data-to="customization" expandable >Кастомизация</SimpleCell>
                    <SimpleCell before={<Icon28EditOutline/>} target="_blank" href="https://vk.com/topic-199025669_47671567" expandable >Обратная связь</SimpleCell>
                    <SimpleCell before={<Icon28PincodeOutline/>} onClick={() => changeActiveModal("promocodeActivation")} expandable >Активировать промокод</SimpleCell>
                    {osName === ANDROID &&
                        <SimpleCell before={<Icon28SmartphoneOutline/>} onClick={() => bridge.send("VKWebAppAddToHomeScreen")} expandable >Добавить на главный экран</SimpleCell>
                    }
                </div>

                {(userBalances["vk_donut"] === 0 && (startupParameters.get('vk_platform') === "mobile_web" || startupParameters.get('vk_platform') === "desktop_web" || startupParameters.get('vk_platform') === "mobile_android"))&&
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
                        </div>
                    </div>
                }


            </div>
            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Тестерам
            </Title>
            <div className={"containerProfile"}>
                <div className={'fullContainer'} >
                    <SimpleCell before={<Icon28DeleteOutline/>} onClick={async () => {await deleteUser(); goToClearCache();}} expandable >Удалить свой профиль из бд</SimpleCell>
                    <SimpleCell before={<Icon28ChatsOutline/>} href="https://vk.me/join/4nXMHh_Bj2OFh8X_AH33onT2ILbd18WTg3Y=" target="_blank" expandable >Беседа для тестеров</SimpleCell>
                </div>
            </div>
            <div style={{height: 12}}/>


        </Panel>
    )
};

export default Profile;