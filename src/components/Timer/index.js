import React, {useState, useEffect} from 'react';
import {Title} from "@vkontakte/vkui";

let localColorMotion = 'red'
let startCount = 15

export function setLocalColor (color, startTimer) {
    localColorMotion = color
    startCount = startTimer
    console.log('SET LOCAL COLOR', localColorMotion, startTimer)
}

export default function Timer({onExpiration, colorMotion}) {

    const [count, setCount] = useState(startCount);

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

    useEffect(() => {
        console.log("START COUNT", startCount, localColorMotion, colorMotion)
        setInterval(() => {
            setCount((currentCount) => currentCount > 0 ? currentCount - 1 : currentCount);
            if (count < 1) {
                onExpiration()
                document.getElementById("motionTimer").classList.remove('color_pulse');
                startCount = 15
                setCount(15)
            }
        }, 1000);
    }, [])

    if (localColorMotion !== colorMotion) {
        if (document.getElementById("motionTimer")) {
            document.getElementById("motionTimer").classList.remove('color_pulse');
        }
        startCount = 15
        setCount(15)
        localColorMotion = colorMotion
    } else {

        if (count === 6) {
            if (document.getElementById("motionTimer")) {
                document.getElementById("motionTimer").classList.add('color_pulse');
            }
        }
    }

    return (
        <div style={{
            marginLeft: 12
        }}
             id={"motionTimer"}
        >
            <Title level="1" weight="bold"

                   style={{marginLeft: 12}}>
                {count}
            </Title>
        </div>

    )
}