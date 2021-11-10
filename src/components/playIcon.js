import React, { useState, useEffect } from 'react';
import '../views/main/game.css'
import '../views/main/home.css';
const playIcon = ({ color, size }) => {

    let fill = ''
    const random_id = Math.floor(Math.random() * 100001)
    let mainCircleStroke = "currentColor"
    if (color === 'blue') {
       fill = '#00D8FF'
    } else if (color === 'red') {
        fill = '#FF79CB'
    } else if (color === 'green') {
        fill = '#2EE367'
    } else if (color === 'yellow') {
        fill = '#FFB327'
    } else if (color === "dead") {
        fill = 'url(#paint0_radial_502:' + random_id + ')'
        mainCircleStroke = '#989B99'
    }


    if (size === 1) {
        return (
            <svg
                className="cont"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill={fill}
                    stroke={mainCircleStroke}
                    strokeWidth="2"
                />
                <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
            </svg>
        )
    } else if (size === 2) {
        return (
            <svg
                className="cont"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill={fill}
                    stroke={mainCircleStroke}
                    strokeWidth="2"
                />
                <circle cx="15" cy="19" r="3" fill="#F5F5F5" />
                <circle cx="23" cy="19" r="3" fill="#F5F5F5" />
                <circle cx="15" cy="19" r="3" fill="#F5F5F5" />
                <circle cx="23" cy="19" r="3" fill="#F5F5F5" />
            </svg>
        )
    } else if (size === 3) {
        return (
            <svg
                className="cont"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill={fill}
                    stroke={mainCircleStroke}
                    strokeWidth="2"
                />
                <circle cx="19" cy="16" r="3" fill="#F5F5F5" />
                <circle cx="15" cy="22" r="3" fill="#F5F5F5" />
                <circle cx="23" cy="22" r="3" fill="#F5F5F5" />
                <defs >
                    <radialGradient id={'paint0_radial_502:' + random_id} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19 19) rotate(90) scale(19)">
                        <stop stopColor="#979A98"/>
                        <stop offset="0.602083" stopColor="#9FA19F" stopOpacity="0.653125"/>
                        <stop offset="0.9999" stopColor="#9FA19F" stopOpacity="0.653125"/>
                        <stop offset="1" stopColor="#ADADAD" stopOpacity="0"/>
                    </radialGradient>
                </defs>
            </svg>
        )
    }
};



export default playIcon;