import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import UsersStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './game.css'
import Icon24GameOutline from '@vkontakte/icons/dist/24/game_outline';
import Icon28SwitchOutline from '@vkontakte/icons/dist/28/switch_outline';
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';
import { motion } from "framer-motion"

import {Div, IOS, Placeholder, platform, Separator} from "@vkontakte/vkui";
const osName = platform();
const Home = ({ id, go, modalOn }) => {

    const [status, setStatus] = useState(1);


    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderButton onClick={go} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Выбор комнаты
            </PanelHeader>
            <Placeholder
                icon={<Icon56AddCircleOutline />}
                header="Создать свою комнату"
                action={<Button size="l" onClick={() => modalOn()}>Создать</Button>}
            >
                Создайте комнату и сделайте персонализированные настройки игры
            </Placeholder>
            <Separator wide />
            <Banner
                size='m'
                header={"Бублик 8 на 8"}

                subheader={
                    <React.Fragment>
                        <UsersStack
                            style={{
                                paddingBottom: 0,
                                paddingTop: 6,
                                paddingLeft: 0,
                            }}
                            photos={[
                                'https://sun9-13.userapi.com/impf/c858416/v858416728/1f9d61/IqWLS0Gx06I.jpg?size=1200x1600&quality=96&proxy=1&sign=2cb19ae2c4f516ab287ac8163206e1b1&type=album',
                                'https://sun9-74.userapi.com/impg/tVUfuQBGHwn9bcpyxQ6-i-NPXUuHG9ZwdRkZqw/oMwQUNvi7JY.jpg?size=1469x893&quality=96&proxy=1&sign=fe5d8da25e2667739e0620ae14af96ef&type=album',
                                'https://sun1-84.userapi.com/impg/uxNacew5ooMPc2VrGY5E-Ju_VNSWnZxvcQYtpw/j1YAv3fEXi8.jpg?size=200x0&quality=96&crop=0,0,1620,2160&sign=2b1f3d3fdd72c1fbc590dbf0bc48e0f7&ava=1',
                            ]}
                            size="m"
                        >Ожидают 1 игрока</UsersStack>
                    </React.Fragment>
                }

                actions={<Button mode="primary"  >Присоединиться</Button>}
            />
            <Banner
                size='m'
                header={"Квадрат 6 на 6"}

                subheader={
                    <React.Fragment>
                        <UsersStack
                            style={{
                                paddingBottom: 0,
                                paddingTop: 6,
                                paddingLeft: 0,
                            }}
                            photos={[
                                'https://sun9-72.userapi.com/impg/SbMjjzso9KKdQ3mIiA2-5Tnm4ELIxymXLuaZpw/YcOTTuPNMis.jpg?size=400x500&quality=96&proxy=1&sign=4288dd5469ddee6547094663a5622f37&type=album',
                                'https://sun9-52.userapi.com/impf/c858236/v858236506/14e9ae/Gvh9pbVxcTM.jpg?size=879x736&quality=96&proxy=1&sign=561e152a479caf41c706ef7882073d65&type=album',
                            ]}
                            size="m"
                        >Ожидают 2 игроков</UsersStack>
                    </React.Fragment>
                }

                actions={<Button mode="primary"  >Присоединиться</Button>}
            />
            <Separator wide />
            <Div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Button
                    style={{
                        alignItems: "center"
                    }}
                    mode="secondary"
                    size='l'
                    scretched
                    after={
                        <Icon28SwitchOutline width={20} height={20}/>
                    }
                >
                    Обновить
                </Button>
            </Div>
        </Panel>
    )
};



export default Home;