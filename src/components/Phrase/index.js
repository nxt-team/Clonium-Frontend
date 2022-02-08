import React from 'react';
import './Phrase.css';

export default function Phrase({text, map, phraseColor}) {
    if (text) {
        let color
        if (phraseColor === 'blue') {
            color = '#00D8FF'
        } else if (phraseColor === 'red') {
            color = '#FF79CB'
        } else if (phraseColor === 'green') {
            color = '#2EE367'
        } else if (phraseColor === 'yellow') {
            color = '#FFB327'
        }

        return (
            <div className={"phrase_message_container"}>
                <svg
                    style={{marginLeft: 4, marginTop: 2}}
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
                        fill={color}
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
                </svg>
                <div className={"phrase_message"} style={{border: "1px solid " + color}}>
                    {text}
                </div>
            </div>
        )
    } else {
        return (
            <div/>
        )
    }
}