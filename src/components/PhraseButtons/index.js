import React from 'react';
import './PhraseButtons.css';
import {CardScroll, Card, Group} from "@vkontakte/vkui";

export default function PhraseButtons({doPhrase}) {
    return (
        <Group
            // description={"Фразы можно настроить в разделе Кастомизация. Главная -> Профиль -> Кастомизация"}
            className={"phrase_group"}
        >
            <CardScroll >
                <Card onClick={() => doPhrase("Ух ты!")} >
                    <div className={"phrase_container"}>
                        Ух ты!
                    </div>
                </Card>

                <Card onClick={() => doPhrase("Ой")} >
                    <div className={"phrase_container"}>
                        Ой
                    </div>
                </Card>
                <Card onClick={() => doPhrase("Удачи...")} >
                    <div className={"phrase_container"}>
                        Удачи...
                    </div>
                </Card>
                <Card onClick={() => doPhrase("Не уходи!")} >
                    <div className={"phrase_container"}>
                        Не уходи!
                    </div>
                </Card>
                <Card onClick={() => doPhrase("Ладно")} >
                    <div className={"phrase_container"}>
                        Ладно
                    </div>
                </Card>
                <Card onClick={() => doPhrase("Помогите")} >
                    <div className={"phrase_container"}>
                        Помогите
                    </div>
                </Card>
            </CardScroll>
        </Group>
    )
}