import React, {useState} from 'react';
import MessageList from '../MessageList';
import './Messenger.css';
import {WriteBar, WriteBarIcon} from "@vkontakte/vkui";

export default function Messenger(props) {
    const [text, setText] = useState('')
    return (
        <>
          <div className="messenger">
            <div className="scrollable content">
              <MessageList />
            </div>
          </div>
            <WriteBar
                style={{background: "var(--content_tint_background)"}}
                value={text}
                onChange={(e) => setText(e.target.value)}
                after={
                    <WriteBarIcon
                        mode="send"
                        disabled={text.length === 0}
                    />
                }
                placeholder="Сообщение"
            />
        </>
    );
}