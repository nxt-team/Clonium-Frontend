import React, {useState} from 'react';
import {Caption} from "@vkontakte/vkui";
import { useSpring, animated } from '@react-spring/web'
import useInterval from "@use-it/interval";

let seconds

export default function GlobalTimer({gameTime}) {

    const [count, setCount] = useState(gameTime);

    setTimeout(() => setCount(count - 1), 1000)
    if (count % 60 < 10) {
        seconds = "0" + count % 60
    } else {
        seconds = count % 60
    }

    return (
        <Caption level="2" style={{ marginLeft: 6}}>
            {Math.floor(count/60) + ":" + seconds}
        </Caption>

    )
}