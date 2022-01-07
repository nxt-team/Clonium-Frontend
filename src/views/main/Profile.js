import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './game.css'
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import './home.css';
import './other.scss'
import {Icon28PincodeOutline} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { Icon56DonateOutline } from '@vkontakte/icons';
import { Icon24ErrorCircleOutline } from '@vkontakte/icons';
import { Icon28PaletteOutline } from '@vkontakte/icons';
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import { Icon28SmartphoneOutline, Icon28SortHorizontalOutline } from '@vkontakte/icons';
import Icon28ArrowDownOutline from '@vkontakte/icons/dist/28/arrow_down_outline';
import Icon28ArrowUpOutline from '@vkontakte/icons/dist/28/arrow_up_outline';
import Icon24StoryOutline from '@vkontakte/icons/dist/24/story_outline';
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import './Profile.css'
import {
    Card,
    CardScroll,
    Group,
    IOS,
    Placeholder,
    platform,
    SimpleCell,
    ANDROID,
    Switch
} from "@vkontakte/vkui";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {postShare, showOffsStoryShare} from "../../sharing/sharing";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import { Icon28SmartphoneStarsOutline, Icon24CupOutline, Icon28TicketOutline, Icon36GameOutline } from '@vkontakte/icons';
import InfoBanners from "../../components/InfoBanners";
const osName = platform();

const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const user_platform = startupParameters.get('vk_platform')
const mobile_platforms = ["mobile_android", "mobile_ipad", "mobile_iphone", "mobile_iphone_messenger"]

const Profile = ({ id, go, fetchedUser, changeActiveModal, userBalances, startupParameters, screenSpinnerOff, screenSpinnerOn, isVibration, switchSsVibration, errorSnackBar }) => {

    const [vibration, setVibration] = useState(isVibration);
    if (vibration !== isVibration) {
        switchSsVibration()
        if (!vibration) {
            bridge.send("VKWebAppStorageSet", {"key": "no_vibration", "value": "1"});
            console.log("value", "1")
        } else {
            bridge.send("VKWebAppStorageSet", {"key": "no_vibration", "value": ""});
            console.log("value", " ")
        }
    }

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
            return exp + ' опыт'
        } else {
            return exp + ' опыта'
        }
    }

    function gamesCaption(games) {
        if (games % 100 !== 11 && games % 10 === 1) {
            return 'игра сыграна'
        } else {
            return 'игр сыграно'
        }
    }

    function rateCaption (rate) { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (rate % 100 !== 11 && rate % 10 === 1) {
            return 'рейтинг'
        }else {
            return 'рейтинга'
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

    function getWarnings (warnings) {
        if (warnings === 0) {
            return "0 предов"
        } if (warnings === 1) {
            return "1 пред"
        } if (warnings === 2) {
            return "2 преда"
        } if (warnings === 3) {
            return "3 преда"
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
                header={<span dangerouslySetInnerHTML={{__html: fetchedUser.first_name + ' ' + fetchedUser.last_name}}/>}
                action={<Button size="l" before={<Icon24StoryOutline/>} onClick={() => story()}>Попонтоваться</Button>}
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
                            <div style={{ justifyContent: 'center',
                                alignItems: "center",
                                display: "flex",
                                width: 144,
                                height: 56,
                                padding: 4,
                                flexDirection: "row"}} >
                                <Icon24CupOutline width={32} height={32} style={{color: '#ffc107'}} />
                                <div
                                    style={{ justifyContent: 'center',
                                        display: "flex",
                                        marginLeft: 6,
                                        flexDirection: "column"}}
                                >
                                    <Caption level="1" weight="regular">{userBalances["rate"]}</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3"
                                             weight="regular">{rateCaption(userBalances["rate"])}</Caption>
                                </div>


                            </div>
                    </Card>
                    <Card size="s"  >
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
                    </Card>
                    <Card size="s"  >
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
                    </Card>
                    <Card size="s"  >
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
                    </Card>
                </CardScroll>
            </Group>

            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Балансы
            </Title>

            <CardScroll style={{margin: "12px 0"}}>
                <Card size="m" style={{borderRadius: 16, width: 180}}>
                    <div className={"balances_main_div"}>
                        <div className="InfoBanner__Icon__Before__Blue" style={{marginBottom: 12}}>
                            <Icon28TicketOutline className="InfoBanner__Icon__Blue" width={32} height={32}/>
                        </div>
                        <Title level="2" weight="regular">
                            {getTickets(userBalances["tickets"])}
                        </Title>
                        <Text weight="regular" style={{ marginBottom: 12, color: "var(--text_secondary)" }}>
                            Нужны для игры <br/> 1 билет = 1 игра
                        </Text>
                        <div className={"balances_button_div"}>
                            <Button style={{width: "100%"}} mode="primary" onClick={() => changeActiveModal("ticketFromAd")} >Получить билет</Button>
                        </div>
                    </div>
                </Card>
                <Card size="m" style={{borderRadius: 16, width: 180}}>
                    <div className={"balances_main_div"}>
                        <div className="InfoBanner__Icon__Before__Green" style={{marginBottom: 12}}>
                            <Icon24FavoriteOutline className="InfoBanner__Icon__Green" width={32} height={32}/>
                        </div>
                        <Title level="2" weight="regular">
                            {getExp(userBalances["exp"])}
                        </Title>
                        <Text weight="regular" style={{ marginBottom: 12, color: "var(--text_secondary)" }}>
                            Дается за <br/> хорошую игру
                        </Text>
                        <div className={"balances_button_div"}>
                            <Button style={{width: "100%"}} rel="noreferrer" mode="primary" target="_blank" href="https://vk.com/@pipeweb-clonium" >Подробнее</Button>
                        </div>
                    </div>
                </Card>
                <Card size="m" style={{borderRadius: 16, width: 180}}>
                    <div className={"balances_main_div"}>
                        <div className="InfoBanner__Icon__Before__Red" style={{marginBottom: 12}} >
                            <Icon24ErrorCircleOutline className="InfoBanner__Icon__Red" width={32} height={32}/>
                        </div>
                        <Title level="2" weight="regular">
                            {getWarnings(userBalances["warnings"])}
                        </Title>
                        <Text weight="regular" style={{ marginBottom: 12, color: "var(--text_secondary)" }}>
                            Дается за неактив в игре. 3 преда = бан
                        </Text>
                        <div className={"balances_button_div"}>
                            <Button style={{width: "100%"}} mode="primary" rel="noreferrer" target="_blank" href="https://vk.com/@pipeweb-clonium" >Подробнее</Button>
                        </div>
                    </div>
                </Card>
            </CardScroll>
            {/*{userBalances["vk_donut"]*/}
            {/*    ?*/}
            {/*    <Banner*/}
            {/*        before={<Avatar mode="app"><Icon28SortHorizontalOutline*/}
            {/*            style={{color: "var(--text_primary)"}}/></Avatar>}*/}
            {/*        header={<span>Обмен</span>}*/}
            {/*        subheader={<span>Обменяй 1 единицу опыта на 3 билета</span>}*/}
            {/*        actions={*/}
            {/*            <Button mode="primary" onClick={async () => {*/}
            {/*                if (userBalances["exp"] > 0) {*/}
            {/*                    screenSpinnerOn()*/}
            {/*                    await doChange();*/}
            {/*                    await updateUserBalances()*/}
            {/*                    screenSpinnerOff()*/}
            {/*                    completeSnackBar("Успешно")*/}
            {/*                } else {*/}
            {/*                    errorSnackBar("Недостаточно опыта")*/}
            {/*                }*/}

            {/*            }*/}
            {/*            }>Обменять</Button>*/}
            {/*        }*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <>*/}
            {/*    </>*/}
            {/*}*/}

            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Прочее
            </Title>
            <div className={"containerProfile"}>
                <div className={'fullContainer'} >
                    <SimpleCell style={{cursor: "pointer"}} before={<Icon28ServicesOutline/>} expandable onClick={() => bridge.send("VKWebAppAddToFavorites")}  >Добавь сервис в избранные</SimpleCell>
                    <SimpleCell style={{cursor: "pointer"}} before={<Icon28ShareOutline/>} onClick={() => postShare(fetchedUser.id)} expandable >Рассказать друзьям</SimpleCell>
                    <SimpleCell style={{cursor: "pointer"}} before={<Icon28EditOutline/>} rel="noreferrer" target="_blank" href="https://vk.com/topic-199025669_47671567" expandable >Обратная связь</SimpleCell>
                    <SimpleCell style={{cursor: "pointer"}} before={<Icon28PincodeOutline/>} onClick={() => changeActiveModal("promocodeActivation")} expandable >Активировать промокод</SimpleCell>
                    <SimpleCell style={{cursor: "pointer"}} before={<Icon28PaletteOutline/>} onClick={go} data-to="customization" expandable >Аватарка фишки</SimpleCell>
                    {osName === ANDROID &&
                        <SimpleCell style={{cursor: "pointer"}} before={<Icon28SmartphoneOutline/>} onClick={() => bridge.send("VKWebAppAddToHomeScreen")} expandable >Добавить на главный экран</SimpleCell>
                    }
                    {mobile_platforms.indexOf(user_platform) !== -1 &&
                        <SimpleCell before={<Icon28SmartphoneStarsOutline/>} disabled after={
                            <Switch
                                onChange={() => setVibration(!vibration)}
                                checked={vibration}
                            />
                        }>Вибрация</SimpleCell>
                    }
                </div>

                {(userBalances["vk_donut"] === 0 && (startupParameters.get('vk_platform') === "mobile_web" || startupParameters.get('vk_platform') === "desktop_web" || startupParameters.get('vk_platform') === "mobile_android"))&&
                    <div className="Other__notify">
                        <div className="Other__notify__cont_wrap">
                            <div className="Other__notify__cont">
                                <div className="Other__notify__title">Оформи Clonium Pass</div>
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
            <InfoBanners changeActiveModal={changeActiveModal} startupParameters={startupParameters} />
            <div style={{height: 12}}/>


        </Panel>
    )
};

export default Profile;