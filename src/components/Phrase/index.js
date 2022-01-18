import React from 'react';
import './Phrase.css';

export default function Phrase({text, map, phraseColor}) {
    if (text) {
        let borderColor
        if (phraseColor === 'blue') {
            borderColor = '#00D8FF'
        } else if (phraseColor === 'red') {
            borderColor = '#FF79CB'
        } else if (phraseColor === 'green') {
            borderColor = '#2EE367'
        } else if (phraseColor === 'yellow') {
            borderColor = '#FFB327'
        }

        return (
            <div className={"phrase_message_container"}>
                <div className={"phrase_message"}>
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