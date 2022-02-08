import React from 'react';
import './PhraseButtons.css';
import phrase_config from '../../constatnts/phrase_config.json'
import {CardScroll, Card, Group} from "@vkontakte/vkui";
import PhrasesOpenButton from "../PhrasesOpenButton";
import GradientLock from "../GradientLock";
import {sendPhrase} from "../../api/socket";

export default function PhraseButtons({arePhrases, checkAndSend}) {

    let items = []
    if (arePhrases) {
        for (let phrase of phrase_config) {
            items.push(
                <>
                    <div
                        onClick={() => checkAndSend(phrase)}
                        className={phrase["isForDonuts"] ? "phrase_disabled" : "phrase"}
                    >
                        {phrase["text"]}
                    </div>
                    {/*{item["isForDonuts"]&&*/}
                    {/*    <div  className={"phrase_lock_indicator"}>*/}
                    {/*        <GradientLock width={24} height={24} />*/}
                    {/*    </div>*/}
                    {/*}*/}
                </>
            )
        }
    }
    return (
        <div className={"phrase_group"}>
            {items}
        </div>
    )
}