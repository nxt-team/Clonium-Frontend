import React from 'react';
import './PhrasesOpenButton.css';
import { Icon28SmileOutline, Icon28CancelOutline } from '@vkontakte/icons';

export default function PhrasesOpenButton({onClick, arePhrases, disabled }) {
    return (
        <div className={"phrase_button_container"} onClick={onClick}>
            <div className={"phrase_button"}>
                {arePhrases
                    ?
                    <Icon28CancelOutline/>
                    :
                    <Icon28SmileOutline style={disabled && {color: "var(--text_secondary)"}}/>
                }

            </div>
        </div>
    )
}