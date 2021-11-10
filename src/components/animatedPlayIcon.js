import React, { useRef, useEffect } from 'react';
import '../views/main/game.css'
import '../views/main/home.css';
import {gsap} from "gsap";
const Svg = ({ start, svgSize, end, changed, color }) => {

    let fill = ''

    if (color === 'blue') {
        fill = '#00D8FF'
    } else if (color === 'red') {
        fill = '#FF79CB'
    } else if (color === 'green') {
        fill = '#2EE367'
    } else if (color === 'yellow') {
        fill = '#FFB327'
    }

    const ref = useRef();

    useEffect(() => {
        if (!changed) {
            return;
        }

        var tl = gsap.timeline();

        tl.to(ref.current, start).to(ref.current, end);

        // use tl?.kill() in real app
        return () => tl.kill();
    }, [start, end, changed]);

    return (
        <svg
            style={{ borderRadius: "100%", position: "absolute"}}
            ref={ref}
            height={svgSize}
            width={svgSize}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="19"
                cy="19"
                r="18"
                fill={fill}
                stroke="currentColor"
                strokeWidth="2"
            />
            <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
        </svg>
    );
};



export default Svg;