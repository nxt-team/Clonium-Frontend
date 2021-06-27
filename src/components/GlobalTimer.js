import React, {useState} from 'react';
import {Caption} from "@vkontakte/vkui";
import { useSpring, animated } from '@react-spring/web'
import useInterval from "@use-it/interval";

export default function GlobalTimer({gameTime}) {

    const [count, setCount] = useState(gameTime);

    setTimeout(() => setCount(count - 1), 1000)

    return (
        <Caption level="2" style={{ marginLeft: 6}}>
            {Math.floor(count/60) + ":" + count % 60}
        </Caption>

    )
}