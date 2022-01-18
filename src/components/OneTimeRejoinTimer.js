import React, {useState, useEffect} from 'react';
import {Title} from "@vkontakte/vkui";
import useInterval from "@use-it/interval";


export default function OneTimeRejoinTimer({onExpiration, startCount, resetOneTimeTimer}) {

    const [count, setCount] = useState(startCount);

    useEffect(() => {
        console.log("RESETED ONE TIME TIMER")
        resetOneTimeTimer()
    }, [])

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