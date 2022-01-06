import React, {useState, useEffect} from 'react';
import {ModalCard, Text} from "@vkontakte/vkui";
import "./CustomTooltip.css"

const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]

function fix (num) {
    if (num < 10) {
        return "0" + num
    } else {
        return num
    }
}



export default function CustomTooltip({active, payload, label}) {
    if (active) {
        const data = payload[0]["payload"]
        const date = new Date(data["date"])

        console.log(date, date.getDay())
        return (
            <div className={"CustomTooltip__container"}>
                <Text>{"Рейтинг: " + data["rating"]}</Text>
                <Text>{fix(date.getHours()) + ":" + fix(date.getMinutes()) + " " + fix(date.getDate()) + " " + months[date.getMonth()]}</Text>
            </div>
        )
    }

    return <></>

}