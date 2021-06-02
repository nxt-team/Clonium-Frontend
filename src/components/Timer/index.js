import React, {useState} from 'react';
import {Title} from "@vkontakte/vkui";
import { useSpring, animated } from '@react-spring/web'
import useInterval from "@use-it/interval";

let localColorMotion = 'red'

export default function Timer({onExpiration, colorMotion}) {

    const [count, setCount] = useState(15);
    const [state, toggle] = useState(true)
    const { x } = useSpring({
        from: { x: 0 },
        x: state ? 1 : 0,
        config: { duration: 1000 },
    })

    if (localColorMotion !== colorMotion) {
        setCount(15)
        localColorMotion = colorMotion
    }


    useInterval(() => {
        setCount((currentCount) => currentCount - 1);
        if (count < 6) {
            toggle(!state)
        } if (count < 1) {
            onExpiration()
            setCount(15)
        }
    }, 1000);



    return (
        <animated.div style={{
            marginLeft: 12,
            scale: x.to({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
            }),
        }}>
            <Title level="1" weight="bold"
                   style={{marginLeft: 12}}>
                {count}
            </Title>
        </animated.div>

    )
}