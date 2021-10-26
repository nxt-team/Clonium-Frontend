import React, { useState, useEffect } from 'react';
import '../views/main/game.css'
import '../views/main/home.css';
const ImgPlayIcon = ({ color, size, imgLink }) => {

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

    const random_id = Math.floor(Math.random() * 100001)

    if (size === 1) {
        return (
            <svg
                // style={{color: "var(--text_primary)"}}
                className="cont"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id={"img" + color + random_id} patternUnits="userSpaceOnUse" width="100%" height="100%">
                        <image className='twombly' xlinkHref={imgLink}
                               x="0" y="0"/>
                    </pattern>

                </defs>
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill={"url(#img" + color + random_id + ")"}
                    stroke={fill}
                    stroke-width="2"
                />
                <circle cx="19" cy="19" r="3" fill={fill}/>
            </svg>
        )
    } else if (size === 2) {
        return (
            <svg
                // style={{color: "var(--text_primary)"}}
                className="cont"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id={"img" + color  + random_id} patternUnits="userSpaceOnUse" width="100%" height="100%">
                        <image className='twombly' xlinkHref={imgLink}
                               x="0" y="0"/>
                    </pattern>

                </defs>
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill={"url(#img" + color + random_id + ")"}
                    stroke={fill}
                    stroke-width="2"
                />
                <circle cx="15" cy="19" r="3" fill={fill} />
                <circle cx="23" cy="19" r="3" fill={fill} />
            </svg>
        )
    } else if (size === 3) {
        return (
            <svg
                // style={{color: "var(--text_primary)"}}
                className="cont"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id={"img" + color + random_id} patternUnits="userSpaceOnUse" width="100%" height="100%">
                        <image className='twombly' xlinkHref={imgLink}
                               x="0" y="0"/>
                    </pattern>

                </defs>
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill={"url(#img" + color + random_id + ")"}
                    stroke={fill}
                    stroke-width="2"
                />
                <circle cx="19" cy="16" r="3" fill={fill}  />
                <circle cx="15" cy="22" r="3" fill={fill}  />
                <circle cx="23" cy="22" r="3" fill={fill}  />
            </svg>
        )
    }
};



export default ImgPlayIcon;