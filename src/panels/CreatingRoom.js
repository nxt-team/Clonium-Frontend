import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import './CreatingRoom.css'
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
    CardScroll, IOS, CardGrid
} from "@vkontakte/vkui";
import { Icon28CancelOutline, Icon28UserOutline, Icon28UsersOutline, Icon28Users3Outline } from '@vkontakte/icons';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";
import Icon28Notifications from "@vkontakte/icons/dist/28/notifications";
import { Icon24DismissDark } from '@vkontakte/icons';
import DonutSize6 from '../mapsPreview/DonutSize6';
import DonutSize8 from '../mapsPreview/DonutSize8';
import GridSize8 from '../mapsPreview/GridSize8';
import GridSize10 from '../mapsPreview/GridSize10';
import PassageSize10 from '../mapsPreview/PassageSize10';
import SquareSize6 from '../mapsPreview/SquareSize6';
import SquareSize8 from '../mapsPreview/SquareSize8';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";

const PluginGavnoSannoe = [
    'var(--dynamic_blue)',
    'var(--field_border)',
    'var(--field_border)',
    'var(--field_border)',
    'var(--field_border)',
    'var(--field_border)',
    'var(--field_border)',
];

const Home = ({ id, go, goToMainView, fetchedUser }) => {

    const [mapsSelect, setMapsSelect] = useState(PluginGavnoSannoe)


    return (
        <Panel
            id={id}
        >
            <PanelHeader
                left={<PanelHeaderButton onClick={goToMainView} >
                    <Icon28CancelOutline/>
                </PanelHeaderButton>}
            >
                Создание
            </PanelHeader>
            <FormLayout>
                <FormLayoutGroup top="карта">
                    <CardScroll>
                        <Card
                            onClick={() =>
                                setMapsSelect([
                                    'var(--dynamic_blue)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                ])
                            }
                            size="s"
                            style={{
                                border: '1px solid ' + mapsSelect[0],
                                backgroundColor: 'var(--background_page)',
                            }}
                        >
                            <div
                                style={{
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
                            onClick={() =>
                                setMapsSelect([
                                    'var(--field_border)',
                                    'var(--dynamic_blue)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                ])
                            }
                            size="s"
                            style={{
                                border: '1px solid ' + mapsSelect[1],
                                backgroundColor: 'var(--background_page)',
                            }}
                        >
                            <div
                                style={{
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
                            onClick={() =>
                                setMapsSelect([
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--dynamic_blue)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                ])
                            }
                            size="s"
                            style={{
                                border: '1px solid ' + mapsSelect[2],
                                backgroundColor: 'var(--background_page)',
                            }}
                        >
                            <div
                                style={{
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
                            onClick={() =>
                                setMapsSelect([
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--dynamic_blue)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                ])
                            }
                            size="s"
                            style={{
                                border: '1px solid ' + mapsSelect[3],
                                backgroundColor: 'var(--background_page)',
                            }}
                        >
                            <div
                                style={{
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
                            onClick={() =>
                                setMapsSelect([
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--dynamic_blue)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                ])
                            }
                            size="s"
                            style={{
                                border: '1px solid ' + mapsSelect[4],
                                backgroundColor: 'var(--background_page)',
                            }}
                        >
                            <div
                                style={{
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
                                    Квдрат 6 на 6
                                </Title>
                                <SquareSize6 />
                            </div>
                        </Card>
                        <Card
                            onClick={() =>
                                setMapsSelect([
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--dynamic_blue)',
                                    'var(--field_border)',
                                ])
                            }
                            size="s"
                            style={{
                                border: '1px solid ' + mapsSelect[5],
                                backgroundColor: 'var(--background_page)',
                            }}
                        >
                            <div
                                style={{
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
                            onClick={() =>
                                setMapsSelect([
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--field_border)',
                                    'var(--dynamic_blue)',
                                ])
                            }
                            size="s"
                            style={{
                                border: '1px solid ' + mapsSelect[6],
                                backgroundColor: 'var(--background_page)',
                            }}
                        >
                            <div
                                style={{
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
                <FormLayoutGroup top={'Кол-во игроков: '}>
                    <CardGrid>
                        <Card size="s">
                            <div className={"userChose"} >
                                <Icon28UserOutline/>
                                <Caption style={{color: "var(--text_secondary)", marginTop: 4}} level="1"
                                         weight="regular">1 игрок</Caption>
                            </div>
                        </Card>
                        <Card size="s">
                            <div className={"userChose"} >
                                <Icon28UsersOutline/>
                                <Caption style={{color: "var(--text_secondary)", marginTop: 4}} level="1"
                                         weight="regular">2 игрока</Caption>
                            </div>
                        </Card>
                        <Card size="s">
                            <div className={"userChose"} >
                                <Icon28Users3Outline/>
                                <Caption style={{color: "var(--text_secondary)", marginTop: 4}} level="1"
                                         weight="regular">3 игрока</Caption>
                            </div>
                        </Card>
                    </CardGrid>
                </FormLayoutGroup>

                <FormLayoutGroup top="Время">
                    <Radio name="time" value={5} defaultChecked>
                        10 минут
                    </Radio>
                    <Radio name="time" value={6}>
                        Бесконечное время
                    </Radio>
                </FormLayoutGroup>

                <FormLayoutGroup top="Дополнительно">
                    <Checkbox>Приватно</Checkbox>
                </FormLayoutGroup>
                <Button size="xl">Создать</Button>
            </FormLayout>
        </Panel>
    )
};



export default Home;