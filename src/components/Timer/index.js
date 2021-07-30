import React, {useState, useEffect} from 'react';
import {Title} from "@vkontakte/vkui";
import { useSpring, animated } from '@react-spring/web'
import useInterval from "@use-it/interval";

let localColorMotion = 'red'

export default function Timer({onExpiration, colorMotion}) {

    const [count, setCount] = useState(15);

    // if (localColorMotion !== colorMotion) {
    //     setCount(15)
    //     localColorMotion = colorMotion
    // }
    //
    // useEffect(() => {
    //
    //         setTimeout(() => {
    //             console.log("time out")
    //             setCount(count - 1);
    //             if (count < 1) {
    //                 setCount(15)
    //                 onExpiration()
    //             }
    //         }, 1000)
    //     }
    //     , [count])

    if (localColorMotion !== colorMotion) {
            setCount(15)
            localColorMotion = colorMotion
        }


        useInterval(() => {
            setCount((currentCount) => currentCount - 1);
            if (count < 1) {
                onExpiration()
                setCount(15)
            }
        }, 1000);

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