import React from 'react';
import './Phrase.css';
import {CardScroll, Card, Group} from "@vkontakte/vkui";
import { motion } from "framer-motion"

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
                <motion.div
                    animate={{ scale: [1.5, 1, 1, 1], rotate: [ -10, 10, -10, 0] }}
                    transition={{ duration: 0.7, times: [0.1, 0.2, 0.5, 0.7] }}
                >
                    <div className={"phrase_message"}>
                        {text}
                    </div>
                </motion.div>
            </div>
        )
    } else {
        return (
            <div/>
        )
    }
}