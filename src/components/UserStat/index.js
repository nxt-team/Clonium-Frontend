import React from 'react';
import './UserStat.css'
import {Caption, Card, CardScroll} from "@vkontakte/vkui";
import {
    Icon24FavoriteOutline,
    Icon28ArrowDownOutline,
    Icon28ArrowUpOutline,
    Icon28TicketOutline,
    Icon36GameOutline
} from "@vkontakte/icons";
import { motion } from "framer-motion"

export default function UserStat({exp, tickets, games, wins, loses}) {

    function expCaption () {
        if (exp % 100 !== 11 && exp % 10 === 1) {
            return 'опыт набран'
        } else {
            return 'опыта набрано'
        }
    }

    function ticketsCaption () { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (tickets % 100 !== 11 && tickets % 10 === 1) {
            return 'билет'
        } if (tickets % 100 !== 12 && tickets % 100 !== 13 && tickets % 100 !== 14 && (tickets % 10 === 2 || tickets % 10 === 3 || tickets % 10 === 4)) {
            return 'билета'
        } else {
            return 'билетов'
        }
    }

    function gamesCaption () {
        if (games % 100 !== 11 && games % 10 === 1) {
            return 'игра сыграна'
        } else {
            return 'игр сыграно'
        }
    }

    function winsCaption () { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (wins % 100 !== 11 && wins % 10 === 1) {
            return 'победа'
        } if (wins % 100 !== 12 && wins % 100 !== 13 && wins % 100 !== 14 && (wins % 10 === 2 || wins % 10 === 3 || wins % 10 === 4)) {
            return 'победы'
        } else {
            return 'побед'
        }
    }

    function losesCaption () { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (loses % 100 !== 11 && loses % 10 === 1) {
            return 'поражение'
        } if (loses % 100 !== 12 && loses % 100 !== 13 && loses % 100 !== 14 && (loses % 10 === 2 || loses % 10 === 3 || loses % 10 === 4)) {
            return 'поражения'
        } else {
            return 'поражений'
        }
    }

    return (
        <CardScroll style={{marginTop: 12, marginBottom: 12}}>
            <Card style={{backgroundColor: "var(--background_content)"}}>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <div style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 156,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"
                    }}>
                        <Icon24FavoriteOutline width={32} height={32}/>
                        <div className={'UserStat_text_box'} >
                            <Caption level="1" weight="regular">{exp}</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                                {expCaption()}
                            </Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)"}}>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <div style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 128,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"
                    }}>
                        <Icon28TicketOutline width={32} height={32}/>
                        <div className={'UserStat_text_box'} >
                            <Caption level="1" weight="regular">{tickets}</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                                {ticketsCaption()}
                            </Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)"}}>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <div style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 144,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"
                    }}>
                        <Icon36GameOutline/>
                        <div className={'UserStat_text_box'} >
                            <Caption level="1" weight="regular">{games}</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                                {gamesCaption()}
                            </Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)"}}>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <div style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 128,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"
                    }}>
                        <Icon28ArrowUpOutline width={36} height={36}/>
                        <div className={'UserStat_text_box'} >
                            <Caption level="1" weight="regular">{wins}</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                                {winsCaption()}
                            </Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)"}}>
                <motion.div
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <div style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 144,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"
                    }}>
                        <Icon28ArrowDownOutline width={36} height={36}/>
                        <div className={'UserStat_text_box'} >
                            <Caption level="1" weight="regular">{loses}</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                                {losesCaption()}
                            </Caption>
                        </div>

                    </div>
                </motion.div>
            </Card>
        </CardScroll>
    )
}