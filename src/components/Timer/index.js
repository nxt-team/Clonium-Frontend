import React, {useState} from 'react';
import {Title} from "@vkontakte/vkui";
import { useSpring, animated } from '@react-spring/web'
import useInterval from "@use-it/interval";

let localColorMotion = 'red'

export default function Timer({onExpiration, colorMotion}) {

    const [count, setCount] = useState(15);

    if (localColorMotion !== colorMotion) {
        setCount(15)
        localColorMotion = colorMotion
    }

    setTimeout(() => {
        setCount((currentCount) => currentCount - 1);
        if (count < 1) {
            onExpiration()
            setCount(15)
        }
    }, 1000)

    return (
        <div style={{
            marginLeft: 12
        }}>
            <Title level="1" weight="bold"
                   style={{marginLeft: 12}}>
                {count}
            </Title>
        </div>

    )
}