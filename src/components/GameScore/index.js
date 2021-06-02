import React from 'react';
import './gameScore.css';

export default function GameScore({count}) {
    return (
        <div
            className={'gameScore_container'}
        >
            <svg
                style={{ flexGrow: 1 }}
                width="22"
                height="22"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill="#00D8FF"
                    stroke="currentColor"
                    stroke-width="2"
                />
                <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
            </svg>
            <div style={{ flexGrow: 1 }}>{count('blue')}</div>
            <svg
                style={{ flexGrow: 1 }}
                width="22"
                height="22"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill="#FFB327"
                    stroke="currentColor"
                    stroke-width="2"
                />
                <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
            </svg>
            <div style={{ flexGrow: 1 }}>{count('yellow')}</div>
            <svg
                style={{ flexGrow: 1 }}
                width="22"
                height="22"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill="#2EE367"
                    stroke="currentColor"
                    stroke-width="2"
                />
                <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
            </svg>
            <div style={{ flexGrow: 1 }}>{count('green')}</div>
            <svg
                style={{ flexGrow: 1 }}
                width="22"
                height="22"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="19"
                    cy="19"
                    r="18"
                    fill="#FF79CB"
                    stroke="currentColor"
                    stroke-width="2"
                />
                <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
            </svg>
            <div style={{ flexGrow: 0.5 }} >{count('red')}</div>
        </div>
    )
}