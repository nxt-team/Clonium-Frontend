import React, {useState, useEffect} from 'react';
import {Caption} from "@vkontakte/vkui";
import { useSpring, animated } from '@react-spring/web'
import useInterval from "@use-it/interval";

let seconds
let finalSeconds
export default function GlobalTimer({time}) {

    const [count, setCount] = useState(time);
    const [gameTime, setGameTime] = useState(time);

    if (gameTime !== time) {
        setGameTime(time)
    }

    useEffect(() => {
        const timeNow = new Date()
        finalSeconds = timeNow.getHours() * 3600 + timeNow.getSeconds() + timeNow.getMinutes() * 60 + gameTime

    }, [gameTime])

    if (count === 0) {
        if (document.getElementById("globalTimer")) {
            document.getElementById("globalTimer").classList.remove('color_pulse');
        }
    } else {
        if (count === 20 && document.getElementById("globalTimer")) {
            document.getElementById("globalTimer").classList.add('color_pulse');
        }
        setTimeout(() => {
            const timeNow = new Date()
            const secondsNow = timeNow.getSeconds() + timeNow.getMinutes() * 60 + timeNow.getHours() * 3600
            setCount(finalSeconds - secondsNow);
        }, 1000)
    }


    if (count % 60 < 10) {
        seconds = "0" + count % 60
    } else {
        seconds = count % 60
    }
    return (
        <Caption level="2" style={{marginLeft: 6}} id={"globalTimer"}>
            {Math.floor(count / 60) + ":" + seconds}
        </Caption>
    )
}