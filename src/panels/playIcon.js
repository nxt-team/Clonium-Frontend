import React, { useState, useEffect } from 'react';
import './game.css'
import './home.css';
const Home = ({ color, size }) => {

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
                    stroke="currentColor"
                    stroke-width="2"
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
                    stroke="currentColor"
                    stroke-width="2"
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
                    stroke="currentColor"
                    stroke-width="2"
                />
                <circle cx="19" cy="16" r="3" fill="#F5F5F5" />
                <circle cx="15" cy="22" r="3" fill="#F5F5F5" />
                <circle cx="23" cy="22" r="3" fill="#F5F5F5" />
            </svg>
        )
    }
};



export default Home;