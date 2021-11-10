import React from 'react';
import './UserStat.css'
import {Caption, Card, CardScroll} from "@vkontakte/vkui";
import {
    Icon24FavoriteOutline,
    Icon28TicketOutline,
    Icon32ErrorCircleOutline,
    Icon24CupOutline
} from "@vkontakte/icons";

export default function UserStat({exp, tickets, warns, rate}) {

    function expCaption () {
        if (exp % 100 !== 11 && exp % 10 === 1) {
            return 'опыт'
        } else {
            return 'опыта'
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

    function warnsCaption () { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (warns === 1) {
            return "пред"
        } else {
            return "преда"
        }
    }

    function rateCaption () { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
        if (rate % 100 !== 11 && rate % 10 === 1) {
            return 'рейтинг'
        }else {
            return 'рейтинга'
        }
    }

    // function gamesCaption () {
    //     if (games % 100 !== 11 && games % 10 === 1) {
    //         return 'игра сыграна'
    //     } else {
    //         return 'игр сыграно'
    //     }
    // }
    //
    // function winsCaption () { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
    //     if (wins % 100 !== 11 && wins % 10 === 1) {
    //         return 'победа'
    //     } if (wins % 100 !== 12 && wins % 100 !== 13 && wins % 100 !== 14 && (wins % 10 === 2 || wins % 10 === 3 || wins % 10 === 4)) {
    //         return 'победы'
    //     } else {
    //         return 'побед'
    //     }
    // }

    // function losesCaption () { // https://poisk2.ru/okonchaniya-suschestvitelnyh-posle-chislitelnyh/
    //     if (loses % 100 !== 11 && loses % 10 === 1) {
    //         return 'поражение'
    //     } if (loses % 100 !== 12 && loses % 100 !== 13 && loses % 100 !== 14 && (loses % 10 === 2 || loses % 10 === 3 || loses % 10 === 4)) {
    //         return 'поражения'
    //     } else {
    //         return 'поражений'
    //     }
    // }

    return (
        <CardScroll style={{marginTop: 12, marginBottom: 12}}>
            <Card style={{backgroundColor: "var(--background_content)", padding: "0 20px"}}>
                <div className={"UserStat_container"}>
                    <Icon24FavoriteOutline width={32} height={32}/>
                    <div className={'UserStat_text_box'} >
                        <Caption level="1" weight="regular">{exp}</Caption>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                            {expCaption()}
                        </Caption>
                    </div>


                </div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)", padding: "0 20px"}}>
                <div className={"UserStat_container"} >
                    <Icon28TicketOutline width={32} height={32}/>
                    <div className={'UserStat_text_box'} >
                        <Caption level="1" weight="regular">{tickets}</Caption>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                            {ticketsCaption()}
                        </Caption>
                    </div>


                </div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)", padding: "0 20px"}}>
                <div className={"UserStat_container"} >
                    <Icon24CupOutline width={28} height={28}/>
                    <div className={'UserStat_text_box'} >
                        <Caption level="1" weight="regular">{rate}</Caption>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                            {rateCaption()}
                        </Caption>
                    </div>


                </div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)", padding: "0 20px"}}>
                <div className={"UserStat_container"} >
                    <Icon32ErrorCircleOutline width={28} height={28} />
                    <div className={'UserStat_text_box'} >
                        <Caption level="1" weight="regular">{warns}</Caption>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular">
                            {warnsCaption()}
                        </Caption>
                    </div>


                </div>
            </Card>
        </CardScroll>
    )
}