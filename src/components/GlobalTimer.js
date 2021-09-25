import React, {useState, useEffect} from 'react';
import {Caption} from "@vkontakte/vkui";
import { useSpring, animated } from '@react-spring/web'
import useInterval from "@use-it/interval";

let seconds
let finalSeconds
export default function GlobalTimer({gameTime}) {

    const [count, setCount] = useState(gameTime);

    useEffect(() => {
        const timeNow = new Date()
        finalSeconds = timeNow.getHours() * 3600 + timeNow.getSeconds() + timeNow.getMinutes() * 60 + gameTime

    }, [])

    setTimeout(() => {
        const timeNow = new Date()
        const secondsNow = timeNow.getSeconds() + timeNow.getMinutes() * 60 + timeNow.getHours() * 3600
        setCount(finalSeconds - secondsNow);
    }, 1000)
    if (count % 60 < 10) {
        seconds = "0" + count % 60
    } else {
        seconds = count % 60
    }

    if (count < 1) {
        return (
            <Caption level="2" style={{ marginLeft: 6}}>
                0:00
            </Caption>
        )
    } else {
        return (
            <Caption level="2" style={{marginLeft: 6}}>
                {Math.floor(count / 60) + ":" + seconds}
            </Caption>
        )
    }
}