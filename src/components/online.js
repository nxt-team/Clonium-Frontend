import React, {useState, useEffect} from 'react';
import {ModalCard} from "@vkontakte/vkui";
import {socket, updateOnline} from "../api/socket";

export default function Online({online}) {

    // const [ online, setOnline] = useState(lastOnline)
    // console.log("Last online: " + lastOnline)
    // useEffect(() => {
    //     // TODO: добавить сюда сокет офф и потестить
    //     socket.once("online", (data) => {
    //         setOnline(data)
    //         lastOnline = data
    //         console.log("new Online", data)
    //     });
    // })

    return (
        <div className={'onlineHomePage'}>
            {online + " online"}
        </div>
    )
}