import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './game.css'
import './home.css';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon28ArrowDownOutline from '@vkontakte/icons/dist/28/arrow_down_outline';
import Icon28ArrowUpOutline from '@vkontakte/icons/dist/28/arrow_up_outline';
import Icon20ServicesOutline from '@vkontakte/icons/dist/20/services_outline';
import Icon24StoryOutline from '@vkontakte/icons/dist/24/story_outline';
import { motion } from "framer-motion"
import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';
import Icon28TicketOutline from '@vkontakte/icons/dist/28/ticket_outline';
import {Card, CardScroll, Div, Group, IOS, Placeholder, platform, Separator} from "@vkontakte/vkui";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
const osName = platform();
const Home = ({ id, go, fetchedUser }) => {



    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={go} data-to="home">
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
                Это ты, если чё
            </Placeholder>
            <Title level="1" weight="semibold" style={{ marginLeft: 16 }} >
                Статистика
            </Title>

            <Group
                separator="hide"
                description="Нажми на карточку, чтобы посмотреть её описание.">

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
                                <Icon36GameOutline/>
                                <div
                                    style={{ justifyContent: 'center',
                                        display: "flex",
                                        marginLeft: 6,
                                        flexDirection: "column"}}
                                >
                                    <Caption  level="1" weight="regular" >180</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >игр сыграно</Caption>
                                </div>


                            </div>
                        </motion.div>
                    </Card>
                    <Card size="s"  >
                        <Card size="s"  >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <div style={{  justifyContent: 'center',
                                    alignItems: "center",
                                    display: "flex",
                                    width: 156,
                                    height: 56,
                                    padding: 4,
                                    flexDirection: "row"}} >
                                    <Icon24FavoriteOutline width={32} height={32}/>
                                    <div
                                        style={{ justifyContent: 'center',
                                            display: "flex",
                                            marginLeft: 6,
                                            flexDirection: "column"}}
                                    >
                                        <Caption  level="1" weight="regular" >267</Caption>
                                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >опыта набрано</Caption>
                                    </div>


                                </div>
                            </motion.div>
                        </Card>
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
                                <Icon28ArrowUpOutline width={36} height={36}/>
                                <div
                                    style={{ justifyContent: 'center',
                                        display: "flex",
                                        marginLeft: 6,
                                        flexDirection: "column"}}
                                >
                                    <Caption  level="1" weight="regular" >4</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >победы</Caption>
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
                                <Icon28ArrowDownOutline width={36} height={36}/>
                                <div
                                    style={{ justifyContent: 'center',
                                        display: "flex",
                                        marginLeft: 6,
                                        flexDirection: "column"}}
                                >
                                    <Caption  level="1" weight="regular" >6</Caption>
                                    <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >поражений</Caption>
                                </div>


                            </div>
                        </motion.div>
                    </Card>
                </CardScroll>
            </Group>

            <Banner
                before={<Icon28TicketOutline/>}
                header={<span>Билетики</span>}
                subheader={<span>Билеты нужны для игры. 1 билет = 1 игра. Каждый день тебе будут доваться 5 билетеков. Дополнительно билетики можно получить за просмотр рекламы</span>}
                actions={<Button mode="primary"  >Получить билетик</Button>}
            />

            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Прочее
            </Title>

            <Banner
                mode="image"
                size="s"
                header={<span style={{color: '#19191a'}} >Запоминай быстро</span>}
                subheader={<span style={{color: '#232324'}} >Наше второе мини приложение, <br/> которое поможет учить новый <br/>  материал быстро и эффективно </span>}
                background={
                    <div
                        style={{
                            backgroundColor: '#88DDBC',
                            backgroundImage: 'url(https://sun9-13.userapi.com/impg/_5jgcB0ut0idF7dYPlFMSvLQj02wIRNxXfG0sA/mvTzIFIABDI.jpg?size=576x576&quality=96&proxy=1&sign=611c07e2e6241f53d9a21368786edfbe&type=album)',
                            backgroundPosition: 'right bottom',
                            backgroundSize: 'auto 100%',

                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                }
                actions={
                    <React.Fragment>
                        <Button after={<Icon20ServicesOutline/>} mode="overlay_primary" size="m" >Открыть</Button>
                    </React.Fragment>
                }
            />

            <Banner
                mode="image"
                size="s"
                header="Оформи подписку VK Dunut"
                subheader={<span>Поддержи разработчика и получи <br/> доступ к офигенным плюшкам </span>}
                background={
                    <div
                        style={{
                            backgroundColor: '#ffc864',
                            backgroundImage: 'url(https://psv4.userapi.com/c536132/u476182155/docs/d24/e21fe374053d/image-removebg-preview.png?extra=OlzSVG0XTrSjF0WFLxhUyIhHMS7xWN2drIaNUnXasQvdVYePNdicBkImfKKNTtT_NCPHNNmSdLkLj1iMOA2Wx5vsEBUgdqmIgV0SoNGxFrOXnGQsOXn6FHUsKLffqnFTVtTcjRWawC_CVuJKr-1xj4L2)',
                            backgroundPosition: 'right bottom',
                            backgroundSize: 'auto 100%',

                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                }
                actions={
                    <React.Fragment>
                        <Button  mode="overlay_primary" size="l" >Подробнее</Button>
                        <Button  mode="tertiary" size="l" >Обновить</Button>
                    </React.Fragment>
                }
            />


        </Panel>
    )
};



export default Home;