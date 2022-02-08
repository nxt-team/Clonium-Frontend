import React, {useState} from 'react';
import MessageList from '../MessageList';
import './Messenger.css';
import {Separator, WriteBar, WriteBarIcon} from "@vkontakte/vkui";
import Phrase from "../Phrase";
import PhraseButtons from "../PhraseButtons";

export default function Messenger(props) {
    const [text, setText] = useState('')
    return (
        <>
            <div className="messenger">
                <PhraseButtons/>
                <Separator/>
                <div className="scrollable content">
                    <MessageList />
                </div>
            </div>
        </>
    );
}