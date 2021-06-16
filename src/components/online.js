import React, {useState, useEffect} from 'react';
import {ModalCard} from "@vkontakte/vkui";
import {socket, updateOnline} from "../api/socket";

export default function Online() {

    const [ online, setOnline] = useState(1)

    useEffect(() => {
        // TODO: добавить сюда сокет офф и потестить
        socket.once("online", (data) => {
            setOnline(data)
            console.log("new Online", data)
        });
    })

    return (
        <div className={'onlineHomePage'}>
            {online + " online"}
        </div>
    )
}