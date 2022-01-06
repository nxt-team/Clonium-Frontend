import React, { useState, useEffect} from 'react';
import {
    PanelHeader,
    Title,
    Panel,
    WriteBar,
    Div,
    Slider,
    WriteBarIcon,
    Button,
    Text, Progress, FixedLayout, Spinner, SimpleCell,
} from "@vkontakte/vkui";
import './FightResults.css'
import {
    Icon24ChevronCompactRight,
    Icon28FavoriteOutline,
    Icon28PaletteOutline,
    Icon56DonateOutline
} from '@vkontakte/icons';
import { Icon24CupOutline } from '@vkontakte/icons';
import { Icon28PollSquareOutline } from '@vkontakte/icons';
import {fightResultsNativeStoryShare, fightResultsPostShare} from "../../sharing/sharing";
import {getBeatenPlayers} from "../../api/api";
import { Icon28StoryOutline } from '@vkontakte/icons';
import { Icon28InfoCircleOutline } from '@vkontakte/icons';
import { PieChart, Pie, Cell, Legend, Tooltip, YAxis, XAxis, BarChart, Bar, ReferenceLine, LabelList} from 'recharts';
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import { Icon28CrownOutline } from '@vkontakte/icons';
import { Icon28FaceRecognitionOutline } from '@vkontakte/icons';

let userBalances



const data = [
    {
        date: "2000-01",
        uv: 4000,
        pv: 2400,
        amt: 2400,
        i: 0
    },
    {
        date: "2000-02",
        uv: 3000,
        pv: 1398,
        amt: 2210,
        i: 1
    },
    {
        date: "2000-03",
        uv: 2000,
        pv: 9800,
        amt: 2290,
        i: 2
    },
    {
        date: "2000-04",
        uv: 2780,
        pv: 3908,
        amt: 2000,
        i: 3
    },
    {
        date: "2000-05",
        uv: 1890,
        pv: 4800,
        amt: 2181,
        i: 4
    },
    {
        date: "2000-06",
        uv: 2390,
        pv: 3800,
        amt: 2500,
        i: 5
    },
    {
        date: "2000-07",
        uv: 3490,
        pv: 4300,
        amt: 2100,
        i: 6
    },
    {
        date: "2000-08",
        uv: 4000,
        pv: 2400,
        amt: 2400,
        i: 7
    }
];


function scheme () {
    if (document.body.getAttribute("scheme") === "client_light" || document.body.getAttribute("scheme") === "bright_light") {
        return "light"
    } else {
        return "dark"
    }
}


const monthTickFormatter = (tick) => {
    const date = new Date(tick);

    return date.getMonth() + 1;
};
let n = 1023
const renderQuarterTick = (tickProps) => {
    const { x, y, payload } = tickProps;
    const { value, offset } = payload;
    const isLast = value === 7;
    const isFirst = value === 0;

    if (value % 2 === 0 || isLast) {
        const pathX = Math.floor(isLast ? x + offset : x - offset) + 0.5;
        let textAnchor = "middle"
        if (isLast) {
            textAnchor = "end"
        } else if (isFirst) {
            textAnchor = "start"
        }

        return <text fill={"rgb(102, 102, 102)"} x={pathX} y={y + 8} textAnchor={textAnchor}>{n}</text>
    }
    return null;
};

const FightResults = ({ id, goToMainView, beatenPlayersColors, fData, changeActiveModal, fetchedUser, updateUserBalances, goToTemporaryBanned, resetSecretId, resetBeatenPlayers, completeSnackBar, screenSpinnerOff, screenSpinnerOn }) => {

    const [beatenPlayers, setBeatenPlayers] = useState(null)
    const [rangeInd, setRangeInd] = useState(-1)
    const finishData = [1, 2.4424992879185083, "+3", "Предыдущий соперник не успел сходить", false]
    const isStata = true
    let padding

    if (!isStata) {
        padding = "28px 20px";
    } else {
        padding = "20px"
    }

    useEffect(() => {

        async function getPlayers () {
            setBeatenPlayers([{"vk_id": 48851029,"socket_id":"vdORAVUTX8MuZYUOACd-","avatar":"https://sun9-73.userapi.com/sun9-16/s/v1/ig2/p4BDPs81AxQx-uyaAt_qF259fgJVnI_UXao79iVtXWnSuijyaYy8PBp3_i1kuAJ12hJ39HlbsAu4_K61Tw1C6-19.jpg?size=200x200&quality=96&crop=1,124,838,838&ava=1","piece_avatar":"0","username":"Виктория Макейчик","vk_donut":0,"rank":"Ноу-нейм","type":"player","color":"red","place":2,"exp":0}])
            // userBalances = await updateUserBalances()
            // if (beatenPlayersColors.length !== 0) {
            //     // const bp = await getBeatenPlayers(secretId, beatenPlayersColors)
            //     setBeatenPlayers(beatenPlayersColors)
            //     console.log(beatenPlayers)
            // }
            // resetSecretId()
        }

        getPlayers()

    }, [])

    function go () {
        resetBeatenPlayers()
        if (userBalances["warnings"] === 3) {
            goToTemporaryBanned()
        } else {
            goToMainView()
        }
    }

    function share () {
        if (fetchedUser.id % 2 === 1) {
            changeActiveModal("fightResultsStoryShare")
        } else {
            let theme
            if (document.body.getAttribute("scheme") === "client_light" || document.body.getAttribute("scheme") === "bright_light") {
                theme = "bright"
            } else {
                theme = "dark"
            }
            screenSpinnerOn()
            fightResultsNativeStoryShare(
                screenSpinnerOff,
                completeSnackBar,
                updateUserBalances,
                beatenPlayers,
                fetchedUser.photo_200,
                theme,
                Math.floor(Math.random() * 3)
            )
        }
    }

    function getRateNum () {
        if (finishData[1] === "?") {
            return "?"
        } else {
            return !finishData[4] ? Math.round(finishData[1]) * -1 : Math.round(finishData[1])
        }
    }

    return (
        <Panel
            id={id}
            >
            <PanelHeader
                separator={false}
                transparent={true}
            />
            <div id="d2">аа</div>
            <div id="d1">.</div>
            <Div className={"fight__title__container"}>
                <Title level="1" weight="semibold" style={{
                    fontSize: 32,
                    lineHeight: "28px",
                }}>
                    Бой завершён
                </Title>
                <Text style={{color: "var(--text_secondary)", marginTop: 8}}>{finishData[3]}</Text>
            </Div>
            {isStata&&
            <div className={"hot_statistic"} style={{backgroundColor: scheme() === "dark" ? "rgba(255, 193, 7, 0.12)" : "rgba(255, 193, 7, 0.4)"}}>
                <Title level="1" weight="regular">
                    Ты захватил <span style={{color: scheme() === "dark" ? "#ffc107" : "var(--accent)"}} >246</span> фишек
                </Title>
                <Text style={{color: "var(--text_secondary)", marginTop: 4}}>
                    Это больше чем у 90% игроков. Поделись результатом и получи X2 опыта.
                </Text>

                <BarChart
                    margin={{ top: 5, right: 0, bottom: 8, left: 0 }}
                    width={document.documentElement.clientWidth - 24 - 48}
                    height={240}
                    data={data}
                >

                    <Bar dataKey="uv" legendType={"none"} maxBarSize={40}
                         radius={[12, 12, 12, 12]}
                         animationBegin={300}
                    > {
                        data.map((entry, index) => (
                            <Cell
                                onClick={() => setRangeInd(index)}
                                key={`cell-${index}`}
                                fill={scheme() === "dark" ? "#232324" : "#fff"}
                                stroke={scheme() === "dark" ? "#ffc107" : "var(--accent)"}
                                strokeWidth={index === rangeInd || rangeInd === -1 && index === 7? 1 : 0}/>
                        ))
                    }
                    </Bar>
                    <XAxis dataKey="0" tickLine={false} axisLine={false} tick={() => null} height={4}/>
                    <XAxis
                        dataKey="i"
                        axisLine={true}
                        tickLine={false}
                        interval={0}
                        tick={renderQuarterTick}
                        height={10}
                        scale="band"
                        xAxisId="quarter"
                    />
                </BarChart>
                {/*<Text style={{color: "var(--text_secondary)", fontSize: 12, lineHeight: "14px"}}>*/}
                {/*    {rangeInd === -1 ? "Нажми на стобец" : data[rangeInd]["name"] + " фишек захвачено" }*/}
                {/*</Text>*/}
                <Button size="l" style={{marginTop: 12}} before={<Icon24StoryOutline/>} >Поделиться</Button>

            </div>
            }



            <div className={"main_container"}>
                <div style={{flexGrow: 1}}>
                    <div className={"result__container"} style={{padding: padding}} >
                        <div className={"icon__container"}>
                            <Icon28FavoriteOutline/>
                        </div>
                        <div>
                            <Title level="1" weight="regular">
                                {finishData[2]}
                            </Title>
                            <Text style={{color: "var(--text_secondary)", marginTop: 4}}>
                                опыта
                            </Text>
                        </div>
                    </div>
                    <div className={"result__container"} style={{marginTop: 0, padding: padding}}  >
                        <div className={"icon__container"}>
                            <Icon28CrownOutline height={28} width={28}/>
                        </div>
                        <div>
                            <Title level="1" weight="regular">
                                {finishData[0]}
                            </Title>
                            <Text style={{color: "var(--text_secondary)", marginTop: 4}}>
                                место
                            </Text>
                        </div>
                    </div>
                </div>
                <div style={{flexGrow: 1}}>
                    <div className={"result__container"} style={{marginLeft: 12, padding: padding}} >
                        <div className={"icon__container"}>
                            <Icon24CupOutline height={28} width={28}/>
                        </div>
                        <div>
                            <Title level="1" weight="regular">
                                {getRateNum()}
                            </Title>
                            <Text style={{color: "var(--text_secondary)", marginTop: 4}}>
                                {finishData[1] !== "?" ? "рейтинга" : "неизвестно"}
                            </Text>
                        </div>
                    </div>

                    {!beatenPlayers
                        ?
                        <div className={"result__container"} style={{marginLeft: 12, marginTop: 0, padding: padding}}>
                            <div className={"icon__container"}>
                                <Icon28FaceRecognitionOutline/>
                            </div>
                            <div>
                                <Title level="3" weight="regular"
                                       style={{color: "var(--text_secondary)", marginTop: 4}}>
                                    больше <br/>внимания
                                </Title>
                            </div>

                        </div>
                        :

                        <div
                            onClick={share}
                            className={"result__container"}
                            style={{marginLeft: 12, marginTop: 0, paddingRight: 8, padding: padding}}>
                            <div className={"icon__container"}>
                                <Icon28StoryOutline/>
                            </div>
                            <div>
                                <Title level="3" weight="regular"
                                       style={{color: "var(--text_secondary)", marginTop: 4}}>
                                    вернуть <br/>билет
                                </Title>
                            </div>
                            <div className={"go_icon"}>
                                <Icon24ChevronCompactRight/>
                            </div>

                        </div>
                    }
                </div>
            </div>

            {isStata
                ?
                <Div className={"buttons__container"}>
                    <Button size="xl" onClick={goToMainView}>Завершить</Button>
                </Div>
                :
                <FixedLayout vertical="bottom">
                    <Div >
                        <Button size="xl" onClick={goToMainView}>Завершить</Button>
                    </Div>
                </FixedLayout>
            }


        </Panel>
    )
};

// {/*<PieChart width={document.documentElement.clientWidth - 24 - 48 - 12} height={300}>*/}
// {/*    <Legend*/}
// {/*        verticalAlign="bottom"*/}
// {/*        height={28}*/}
// {/*    />*/}
// {/*    <Pie data={data} dataKey="students" outerRadius={100}*/}
// {/*         cy={130}*/}
// {/*         labelLine={false}*/}
// {/*         label={renderCustomizedLabel} fill="rgba(255, 193, 7, 0.22)">*/}
// {/*        {*/}
// {/*            data.map((entry, index) => (*/}
// {/*                <Cell key={`cell-${index}`} fill={"rgba(255, 193, 7, " + (0.22 + 0.2 * index).toFixed(2) + ")"}/>*/}
// {/*            ))*/}
// {/*        }*/}
// {/*    </Pie>*/}
// {/*</PieChart>*/}

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);
//
//     return (
//         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
//             {`${(percent * 100).toFixed(0)}%`}
//         </text>
//     );
// };

// {/*<LabelList*/}
// {/*           dataKey="name"*/}
// {/*           position="bottom"*/}
// {/*           fill="white"*/}
// {/*           strokeWidth={0}*/}
// {/*           // angle={270}*/}
// {/*           fontSize="12"*/}
// {/*/>*/}
// {


export default FightResults;