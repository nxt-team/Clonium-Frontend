import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import '../main/waitingForStart.css'
import './CreatingRoom.css'
import bridge from '@vkontakte/vk-bridge';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';
import {
    Checkbox,
    Radio,
    FormLayout,
    FormLayoutGroup,
    Card,
    Placeholder,
    platform,
    Separator,
    Tabs,
    TabsItem,
    CardScroll, IOS, CardGrid,
    PanelHeaderClose, Spinner
} from "@vkontakte/vkui";
import { Icon28CancelOutline, Icon28UserOutline, Icon28UsersOutline, Icon28Users3Outline } from '@vkontakte/icons';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";
import Icon28Notifications from "@vkontakte/icons/dist/28/notifications";
import { Icon24DismissDark } from '@vkontakte/icons';
import DonutSize6 from '../../mapsPreview/DonutSize6';
import DonutSize8 from '../../mapsPreview/DonutSize8';
import GridSize8 from '../../mapsPreview/GridSize8';
import GridSize10 from '../../mapsPreview/GridSize10';
import PassageSize10 from '../../mapsPreview/PassageSize10';
import SquareSize6 from '../../mapsPreview/SquareSize6';
import SquareSize8 from '../../mapsPreview/SquareSize8';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import {createFight} from "../../api/api";
import {joinRoom} from "../../api/socket";

const selected = {
    border: '1px solid var(--dynamic_blue)',
    backgroundColor: 'var(--background_page)',
}

const unselcted = {
    border: '1px solid var(--field_border)',
    backgroundColor: 'var(--background_page)',
}

let turnTime = true // ограничено
let gameTime = 600

const CreatingRoom = ({ id, goToPage, goToMainView, fetchedUser, updateNeedUsersInFight, updateSecretId, goIsolated }) => {

    const [mapsSelect, setMapsSelect] = useState(0)
    const [playersNumber, setPlayersNumber] = useState(2)
    const [isPrivate, setIsPrivate] = useState(false)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        turnTime = true
        gameTime = 600
    }, [])

    const changeMapSelect = (mapId) => {
        setMapsSelect(mapId);
        bridge.send("VKWebAppTapticSelectionChanged", {});
    }

    const changePlayersNumber = (playersNumber) => {
        setPlayersNumber(playersNumber);
        bridge.send("VKWebAppTapticSelectionChanged", {});
    }

    const privateChanged = () => {
        setIsPrivate(!isPrivate)
        if (!isPrivate) {
            turnTime = true
        }
        console.log(turnTime)
    }

    const gameTimeChanged = (event) => {
        gameTime = event.target.value
    }

    async function createFightAndGo () {
        setIsCreating(true)
        const fight = await createFight(fetchedUser, mapsSelect, playersNumber, isPrivate, turnTime, gameTime)
        updateNeedUsersInFight(playersNumber)
        updateSecretId(fight["secret_id"])
        joinRoom(fetchedUser, fight["secret_id"])
        goToMainView()
        goIsolated("waitingForStart")
    }

    return (
        <Panel
            id={id}
        >
            <PanelHeader
                left={<PanelHeaderClose onClick={goToMainView} />}
            >
                Создание
            </PanelHeader>
            <FormLayout>
                <FormLayoutGroup top="Карта">
                    <CardScroll>
                        <Card
                            onClick={() => changeMapSelect(0)}
                            size="s"
                            style={mapsSelect === 0 ? selected : unselcted}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    height: '100%',
                                    width: 144,
                                    display: 'flex',
                                    padding: 12,
                                    flexDirection: 'column',
                                    justifyContent: '',
                                    alignItems: '',
                                }}
                            >
                                <Title level="2" weight="regular">
                                    Квадрат 8 на 8
                                </Title>
                                <SquareSize8 />
                            </div>
                        </Card>
                        <Card
                            onClick={() => changeMapSelect(1)}
                            size="s"
                            style={mapsSelect === 1 ? selected : unselcted}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    height: '100%',
                                    width: 144,
                                    display: 'flex',
                                    padding: 12,
                                    flexDirection: 'column',
                                    justifyContent: '',
                                    alignItems: '',
                                }}
                            >
                                <Title level="2" weight="regular">
                                    Бублик 8 на 8
                                </Title>
                                <DonutSize8 />
                            </div>
                        </Card>
                        <Card
                            onClick={() => changeMapSelect(2)}
                            size="s"
                            style={mapsSelect === 2 ? selected : unselcted}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    height: '100%',
                                    width: 144,
                                    display: 'flex',
                                    padding: 12,
                                    flexDirection: 'column',
                                    justifyContent: '',
                                    alignItems: '',
                                }}
                            >
                                <Title level="2" weight="regular">
                                    Сетка 8 на 8
                                </Title>
                                <GridSize8 />
                            </div>
                        </Card>
                        <Card
                            onClick={() => changeMapSelect(3)}
                            size="s"
                            style={mapsSelect === 3 ? selected : unselcted}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    height: '100%',
                                    width: 144,
                                    display: 'flex',
                                    padding: 12,
                                    flexDirection: 'column',
                                    justifyContent: '',
                                    alignItems: '',
                                }}
                            >
                                <Title level="2" weight="regular">
                                    Бублик 6 на 6
                                </Title>
                                <DonutSize6 />
                            </div>
                        </Card>
                        <Card
                            onClick={() => changeMapSelect(4)}
                            size="s"
                            style={mapsSelect === 4 ? selected : unselcted}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    height: '100%',
                                    width: 144,
                                    display: 'flex',
                                    padding: 12,
                                    flexDirection: 'column',
                                    justifyContent: '',
                                    alignItems: '',
                                }}
                            >
                                <Title level="2" weight="regular">
                                    Квадрат 6 на 6
                                </Title>
                                <SquareSize6 />
                            </div>
                        </Card>
                        <Card
                            onClick={() => changeMapSelect(5)}
                            size="s"
                            style={mapsSelect === 5 ? selected : unselcted}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    height: '100%',
                                    width: 144,
                                    display: 'flex',
                                    padding: 12,
                                    flexDirection: 'column',
                                    justifyContent: '',
                                    alignItems: '',
                                }}
                            >
                                <Title level="2" weight="regular">
                                    Сетка 10 на 10
                                </Title>
                                <GridSize10 />
                            </div>
                        </Card>
                        <Card
                            onClick={() => changeMapSelect(6)}
                            size="s"
                            style={mapsSelect === 6 ? selected : unselcted}
                        >
                            <div
                                style={{
                                    cursor: "pointer",
                                    height: '100%',
                                    width: 144,
                                    display: 'flex',
                                    padding: 12,
                                    flexDirection: 'column',
                                    justifyContent: '',
                                    alignItems: '',
                                }}
                            >
                                <Title level="2" weight="regular">
                                    Проход
                                </Title>
                                <PassageSize10 />
                            </div>
                        </Card>
                    </CardScroll>
                </FormLayoutGroup>
                <FormLayoutGroup top={'Кол-во игроков'}>
                    <CardGrid>
                        <Card size="s" onClick={() => changePlayersNumber(2)} style={playersNumber === 2 ? {} : {backgroundColor: "var(--background_content)"}} >
                            <div className={"userChose"} >
                                <svg width="28" style={playersNumber === 2 ? {color: "var(--accent)"} : {color: "var(--icon_secondary)"}} height="18" viewBox="0 0 28 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4643 14.5C13.4643 11.6611 10.7321 9.83928 6.73214 9.83928C2.73221 9.83928 0 11.6611 0 14.5C0 16.4989 1.32986 17.6071 3.10714 17.6071H10.3571C12.1344 17.6071 13.4643 16.4989 13.4643 14.5ZM2.07143 14.5C2.07143 13.0241 3.741 11.9107 6.73214 11.9107C9.72329 11.9107 11.3929 13.0241 11.3929 14.5C11.3929 15.2633 11.0656 15.5357 10.3571 15.5357H3.10714C2.39871 15.5357 2.07143 15.2633 2.07143 14.5ZM9.66158 1.21341C8.88465 0.436478 7.8309 0 6.73214 0C5.63339 0 4.57964 0.436478 3.8027 1.21341C3.02576 1.99035 2.58929 3.0441 2.58929 4.14286C2.58929 5.24161 3.02576 6.29536 3.8027 7.0723C4.57964 7.84924 5.63339 8.28571 6.73214 8.28571C7.8309 8.28571 8.88465 7.84924 9.66158 7.0723C10.4385 6.29536 10.875 5.24161 10.875 4.14286C10.875 3.0441 10.4385 1.99035 9.66158 1.21341ZM5.26742 2.67814C5.65589 2.28967 6.18277 2.07143 6.73214 2.07143C7.28152 2.07143 7.80839 2.28967 8.19686 2.67814C8.58533 3.0666 8.80357 3.59348 8.80357 4.14286C8.80357 4.69223 8.58533 5.21911 8.19686 5.60758C7.80839 5.99605 7.28152 6.21428 6.73214 6.21428C6.18277 6.21428 5.65589 5.99605 5.26742 5.60758C4.87895 5.21911 4.66071 4.69223 4.66071 4.14286C4.66071 3.59348 4.87895 3.0666 5.26742 2.67814Z" fill="currentColor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9643 14.5C27.9643 11.6611 25.2321 9.83928 21.2321 9.83928C17.2322 9.83928 14.5 11.6611 14.5 14.5C14.5 16.4989 15.8299 17.6071 17.6071 17.6071H24.8571C26.6344 17.6071 27.9643 16.4989 27.9643 14.5ZM16.5714 14.5C16.5714 13.0241 18.241 11.9107 21.2321 11.9107C24.2233 11.9107 25.8929 13.0241 25.8929 14.5C25.8929 15.2633 25.5656 15.5357 24.8571 15.5357H17.6071C16.8987 15.5357 16.5714 15.2633 16.5714 14.5ZM24.1616 1.21341C23.3846 0.436478 22.3309 0 21.2321 0C20.1334 0 19.0796 0.436478 18.3027 1.21341C17.5258 1.99035 17.0893 3.0441 17.0893 4.14286C17.0893 5.24161 17.5258 6.29536 18.3027 7.0723C19.0796 7.84924 20.1334 8.28571 21.2321 8.28571C22.3309 8.28571 23.3846 7.84924 24.1616 7.0723C24.9385 6.29536 25.375 5.24161 25.375 4.14286C25.375 3.0441 24.9385 1.99035 24.1616 1.21341ZM19.7674 2.67814C20.1559 2.28967 20.6828 2.07143 21.2321 2.07143C21.7815 2.07143 22.3084 2.28967 22.6969 2.67814C23.0853 3.0666 23.3036 3.59348 23.3036 4.14286C23.3036 4.69223 23.0853 5.21911 22.6969 5.60758C22.3084 5.99605 21.7815 6.21428 21.2321 6.21428C20.6828 6.21428 20.1559 5.99605 19.7674 5.60758C19.379 5.21911 19.1607 4.69223 19.1607 4.14286C19.1607 3.59348 19.379 3.0666 19.7674 2.67814Z" fill="currentColor"/>
                                </svg>

                                <Caption style={{color: "var(--text_secondary)", marginTop: 8}} level="1"
                                         weight="regular">2 игрока</Caption>
                            </div>
                        </Card>
                        <Card size="s" onClick={() => changePlayersNumber(3)} style={playersNumber === 3 ? {} : {backgroundColor: "var(--background_content)"}}>
                            <div className={"userChose"} >
                                <svg width="43" height="18" style={playersNumber === 3 ? {color: "var(--accent)"} : {color: "var(--icon_secondary)"}}  viewBox="0 0 43 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4643 14.5C13.4643 11.6611 10.7321 9.83928 6.73214 9.83928C2.73221 9.83928 0 11.6611 0 14.5C0 16.4989 1.32986 17.6071 3.10714 17.6071H10.3571C12.1344 17.6071 13.4643 16.4989 13.4643 14.5ZM2.07143 14.5C2.07143 13.0241 3.741 11.9107 6.73214 11.9107C9.72329 11.9107 11.3929 13.0241 11.3929 14.5C11.3929 15.2633 11.0656 15.5357 10.3571 15.5357H3.10714C2.39871 15.5357 2.07143 15.2633 2.07143 14.5ZM9.66158 1.21341C8.88465 0.436478 7.8309 0 6.73214 0C5.63339 0 4.57964 0.436478 3.8027 1.21341C3.02576 1.99035 2.58929 3.0441 2.58929 4.14286C2.58929 5.24161 3.02576 6.29536 3.8027 7.0723C4.57964 7.84924 5.63339 8.28571 6.73214 8.28571C7.8309 8.28571 8.88465 7.84924 9.66158 7.0723C10.4385 6.29536 10.875 5.24161 10.875 4.14286C10.875 3.0441 10.4385 1.99035 9.66158 1.21341ZM5.26742 2.67814C5.65589 2.28967 6.18277 2.07143 6.73214 2.07143C7.28152 2.07143 7.80839 2.28967 8.19686 2.67814C8.58533 3.0666 8.80357 3.59348 8.80357 4.14286C8.80357 4.69223 8.58533 5.21911 8.19686 5.60758C7.80839 5.99605 7.28152 6.21428 6.73214 6.21428C6.18277 6.21428 5.65589 5.99605 5.26742 5.60758C4.87895 5.21911 4.66071 4.69223 4.66071 4.14286C4.66071 3.59348 4.87895 3.0666 5.26742 2.67814Z" fill="currentColor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9643 14.5C27.9643 11.6611 25.2321 9.83928 21.2321 9.83928C17.2322 9.83928 14.5 11.6611 14.5 14.5C14.5 16.4989 15.8299 17.6071 17.6071 17.6071H24.8571C26.6344 17.6071 27.9643 16.4989 27.9643 14.5ZM16.5714 14.5C16.5714 13.0241 18.241 11.9107 21.2321 11.9107C24.2233 11.9107 25.8929 13.0241 25.8929 14.5C25.8929 15.2633 25.5656 15.5357 24.8571 15.5357H17.6071C16.8987 15.5357 16.5714 15.2633 16.5714 14.5ZM24.1616 1.21341C23.3846 0.436478 22.3309 0 21.2321 0C20.1334 0 19.0796 0.436478 18.3027 1.21341C17.5258 1.99035 17.0893 3.0441 17.0893 4.14286C17.0893 5.24161 17.5258 6.29536 18.3027 7.0723C19.0796 7.84924 20.1334 8.28571 21.2321 8.28571C22.3309 8.28571 23.3846 7.84924 24.1616 7.0723C24.9385 6.29536 25.375 5.24161 25.375 4.14286C25.375 3.0441 24.9385 1.99035 24.1616 1.21341ZM19.7674 2.67814C20.1559 2.28967 20.6828 2.07143 21.2321 2.07143C21.7815 2.07143 22.3084 2.28967 22.6969 2.67814C23.0853 3.0666 23.3036 3.59348 23.3036 4.14286C23.3036 4.69223 23.0853 5.21911 22.6969 5.60758C22.3084 5.99605 21.7815 6.21428 21.2321 6.21428C20.6828 6.21428 20.1559 5.99605 19.7674 5.60758C19.379 5.21911 19.1607 4.69223 19.1607 4.14286C19.1607 3.59348 19.379 3.0666 19.7674 2.67814Z" fill="currentColor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.5 14.5C42.5 11.6611 39.7678 9.83928 35.7679 9.83928C31.7679 9.83928 29.0357 11.6611 29.0357 14.5C29.0357 16.4989 30.3656 17.6071 32.1429 17.6071H39.3929C41.1701 17.6071 42.5 16.4989 42.5 14.5ZM31.1071 14.5C31.1071 13.0241 32.7767 11.9107 35.7679 11.9107C38.759 11.9107 40.4286 13.0241 40.4286 14.5C40.4286 15.2633 40.1013 15.5357 39.3929 15.5357H32.1429C31.4344 15.5357 31.1071 15.2633 31.1071 14.5ZM38.6973 1.21342C37.9204 0.436479 36.8666 0 35.7679 0C34.6691 0 33.6153 0.436479 32.8384 1.21342C32.0615 1.99035 31.625 3.0441 31.625 4.14286C31.625 5.24161 32.0615 6.29536 32.8384 7.0723C33.6153 7.84924 34.6691 8.28571 35.7679 8.28571C36.8666 8.28571 37.9204 7.84924 38.6973 7.0723C39.4742 6.29536 39.9107 5.24161 39.9107 4.14286C39.9107 3.0441 39.4742 1.99035 38.6973 1.21342ZM34.3031 2.67813C34.6916 2.28967 35.2185 2.07143 35.7679 2.07143C36.3172 2.07143 36.8441 2.28967 37.2326 2.67813C37.621 3.0666 37.8393 3.59348 37.8393 4.14286C37.8393 4.69223 37.621 5.21911 37.2326 5.60758C36.8441 5.99605 36.3172 6.21428 35.7679 6.21428C35.2185 6.21428 34.6916 5.99605 34.3031 5.60758C33.9147 5.21911 33.6964 4.69223 33.6964 4.14286C33.6964 3.59348 33.9147 3.0666 34.3031 2.67813Z" fill="currentColor"/>
                                </svg>


                                <Caption style={{color: "var(--text_secondary)", marginTop: 8}} level="1"
                                         weight="regular">3 игрока</Caption>
                            </div>
                        </Card>
                        <Card size="s" onClick={() => changePlayersNumber(4)} style={playersNumber === 4 ? {} : {backgroundColor: "var(--background_content)"}} >
                            <div className={"userChose"} >
                                <svg width="57" height="18" style={playersNumber === 4 ? {color: "var(--accent)"} : {color: "var(--icon_secondary)"}}  viewBox="0 0 57 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.4643 14.5C13.4643 11.6611 10.7321 9.83928 6.73214 9.83928C2.73221 9.83928 0 11.6611 0 14.5C0 16.4989 1.32986 17.6071 3.10714 17.6071H10.3571C12.1344 17.6071 13.4643 16.4989 13.4643 14.5ZM2.07143 14.5C2.07143 13.0241 3.741 11.9107 6.73214 11.9107C9.72329 11.9107 11.3929 13.0241 11.3929 14.5C11.3929 15.2633 11.0656 15.5357 10.3571 15.5357H3.10714C2.39871 15.5357 2.07143 15.2633 2.07143 14.5ZM9.66158 1.21341C8.88465 0.436478 7.8309 0 6.73214 0C5.63339 0 4.57964 0.436478 3.8027 1.21341C3.02576 1.99035 2.58929 3.0441 2.58929 4.14286C2.58929 5.24161 3.02576 6.29536 3.8027 7.0723C4.57964 7.84924 5.63339 8.28571 6.73214 8.28571C7.8309 8.28571 8.88465 7.84924 9.66158 7.0723C10.4385 6.29536 10.875 5.24161 10.875 4.14286C10.875 3.0441 10.4385 1.99035 9.66158 1.21341ZM5.26742 2.67814C5.65589 2.28967 6.18277 2.07143 6.73214 2.07143C7.28152 2.07143 7.80839 2.28967 8.19686 2.67814C8.58533 3.0666 8.80357 3.59348 8.80357 4.14286C8.80357 4.69223 8.58533 5.21911 8.19686 5.60758C7.80839 5.99605 7.28152 6.21428 6.73214 6.21428C6.18277 6.21428 5.65589 5.99605 5.26742 5.60758C4.87895 5.21911 4.66071 4.69223 4.66071 4.14286C4.66071 3.59348 4.87895 3.0666 5.26742 2.67814Z" fill="currentColor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9643 14.5C27.9643 11.6611 25.2321 9.83928 21.2321 9.83928C17.2322 9.83928 14.5 11.6611 14.5 14.5C14.5 16.4989 15.8299 17.6071 17.6071 17.6071H24.8571C26.6344 17.6071 27.9643 16.4989 27.9643 14.5ZM16.5714 14.5C16.5714 13.0241 18.241 11.9107 21.2321 11.9107C24.2233 11.9107 25.8929 13.0241 25.8929 14.5C25.8929 15.2633 25.5656 15.5357 24.8571 15.5357H17.6071C16.8987 15.5357 16.5714 15.2633 16.5714 14.5ZM24.1616 1.21341C23.3846 0.436478 22.3309 0 21.2321 0C20.1334 0 19.0796 0.436478 18.3027 1.21341C17.5258 1.99035 17.0893 3.0441 17.0893 4.14286C17.0893 5.24161 17.5258 6.29536 18.3027 7.0723C19.0796 7.84924 20.1334 8.28571 21.2321 8.28571C22.3309 8.28571 23.3846 7.84924 24.1616 7.0723C24.9385 6.29536 25.375 5.24161 25.375 4.14286C25.375 3.0441 24.9385 1.99035 24.1616 1.21341ZM19.7674 2.67814C20.1559 2.28967 20.6828 2.07143 21.2321 2.07143C21.7815 2.07143 22.3084 2.28967 22.6969 2.67814C23.0853 3.0666 23.3036 3.59348 23.3036 4.14286C23.3036 4.69223 23.0853 5.21911 22.6969 5.60758C22.3084 5.99605 21.7815 6.21428 21.2321 6.21428C20.6828 6.21428 20.1559 5.99605 19.7674 5.60758C19.379 5.21911 19.1607 4.69223 19.1607 4.14286C19.1607 3.59348 19.379 3.0666 19.7674 2.67814Z" fill="currentColor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M42.5 14.5C42.5 11.6611 39.7678 9.83928 35.7679 9.83928C31.7679 9.83928 29.0357 11.6611 29.0357 14.5C29.0357 16.4989 30.3656 17.6071 32.1429 17.6071H39.3929C41.1701 17.6071 42.5 16.4989 42.5 14.5ZM31.1071 14.5C31.1071 13.0241 32.7767 11.9107 35.7679 11.9107C38.759 11.9107 40.4286 13.0241 40.4286 14.5C40.4286 15.2633 40.1013 15.5357 39.3929 15.5357H32.1429C31.4344 15.5357 31.1071 15.2633 31.1071 14.5ZM38.6973 1.21342C37.9204 0.436479 36.8666 0 35.7679 0C34.6691 0 33.6153 0.436479 32.8384 1.21342C32.0615 1.99035 31.625 3.0441 31.625 4.14286C31.625 5.24161 32.0615 6.29536 32.8384 7.0723C33.6153 7.84924 34.6691 8.28571 35.7679 8.28571C36.8666 8.28571 37.9204 7.84924 38.6973 7.0723C39.4742 6.29536 39.9107 5.24161 39.9107 4.14286C39.9107 3.0441 39.4742 1.99035 38.6973 1.21342ZM34.3031 2.67813C34.6916 2.28967 35.2185 2.07143 35.7679 2.07143C36.3172 2.07143 36.8441 2.28967 37.2326 2.67813C37.621 3.0666 37.8393 3.59348 37.8393 4.14286C37.8393 4.69223 37.621 5.21911 37.2326 5.60758C36.8441 5.99605 36.3172 6.21428 35.7679 6.21428C35.2185 6.21428 34.6916 5.99605 34.3031 5.60758C33.9147 5.21911 33.6964 4.69223 33.6964 4.14286C33.6964 3.59348 33.9147 3.0666 34.3031 2.67813Z" fill="currentColor"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M57 14.5C57 11.6611 54.2678 9.83928 50.2679 9.83928C46.2679 9.83928 43.5357 11.6611 43.5357 14.5C43.5357 16.4989 44.8656 17.6071 46.6429 17.6071H53.8929C55.6701 17.6071 57 16.4989 57 14.5ZM45.6071 14.5C45.6071 13.0241 47.2767 11.9107 50.2679 11.9107C53.259 11.9107 54.9286 13.0241 54.9286 14.5C54.9286 15.2633 54.6013 15.5357 53.8929 15.5357H46.6429C45.9344 15.5357 45.6071 15.2633 45.6071 14.5ZM53.1973 1.21342C52.4204 0.436479 51.3666 0 50.2679 0C49.1691 0 48.1153 0.436479 47.3384 1.21342C46.5615 1.99035 46.125 3.0441 46.125 4.14286C46.125 5.24161 46.5615 6.29536 47.3384 7.0723C48.1153 7.84924 49.1691 8.28571 50.2679 8.28571C51.3666 8.28571 52.4204 7.84924 53.1973 7.0723C53.9742 6.29536 54.4107 5.24161 54.4107 4.14286C54.4107 3.0441 53.9742 1.99035 53.1973 1.21342ZM48.8031 2.67813C49.1916 2.28967 49.7185 2.07143 50.2679 2.07143C50.8172 2.07143 51.3441 2.28967 51.7326 2.67813C52.121 3.0666 52.3393 3.59348 52.3393 4.14286C52.3393 4.69223 52.121 5.21911 51.7326 5.60758C51.3441 5.99605 50.8172 6.21428 50.2679 6.21428C49.7185 6.21428 49.1916 5.99605 48.8031 5.60758C48.4147 5.21911 48.1964 4.69223 48.1964 4.14286C48.1964 3.59348 48.4147 3.0666 48.8031 2.67813Z" fill="currentColor"/>
                                </svg>

                                <Caption style={{color: "var(--text_secondary)", marginTop: 8}} level="1"
                                         weight="regular">4 игрока</Caption>
                            </div>
                        </Card>
                    </CardGrid>
                </FormLayoutGroup>

                <FormLayoutGroup top="Время игры">
                    <Radio name="time" onChange={gameTimeChanged} value={600} defaultChecked >
                        10 минут
                    </Radio>
                    <Radio name="time" onChange={gameTimeChanged} value={900} >
                        15 минут
                    </Radio>
                    <Radio name="time" onChange={gameTimeChanged} value={-1}>
                        Бесконечное время
                    </Radio>
                </FormLayoutGroup>

                <FormLayoutGroup top="Дополнительно">
                    <Checkbox onChange={privateChanged} >Приватно</Checkbox>
                    <Checkbox onChange={() => turnTime = !turnTime} disabled={!isPrivate} >Время хода не ограничено</Checkbox>
                </FormLayoutGroup>
                <Button size="xl" onClick={createFightAndGo}  >
                    {isCreating ? <Spinner size="regular" /> : "Создать"}
                </Button>
            </FormLayout>
        </Panel>
    )
};



export default CreatingRoom;