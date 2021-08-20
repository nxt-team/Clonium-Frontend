import React from 'react';
import './PhraseButtons.css';
import {CardScroll, Card, Group} from "@vkontakte/vkui";
import { motion } from "framer-motion"

export default function PhraseButtons({doPhrase}) {
    return (
        <Group
            // description={"Фразы можно настроить в разделе Кастомизация. Главная -> Профиль -> Кастомизация"}
            className={"phrase_group"}
        >
            <CardScroll >
                <Card onClick={() => doPhrase("Ух ты!")} >
                    <motion.div whileTap={{scale: 0.7}} >
                        <div className={"phrase_container"}>
                            Ух ты!
                        </div>
                    </motion.div>
                </Card>

                <Card onClick={() => doPhrase("Ой")} >
                    <motion.div whileTap={{scale: 0.7}} >
                        <div className={"phrase_container"}>
                            Ой
                        </div>
                    </motion.div>
                </Card>
                <Card onClick={() => doPhrase("Удачи...")} >
                    <motion.div whileTap={{scale: 0.7}} >
                        <div className={"phrase_container"}>
                            Удачи...
                        </div>
                    </motion.div>
                </Card>
                <Card onClick={() => doPhrase("Не уходи!")} >
                    <motion.div whileTap={{scale: 0.7}} >
                        <div className={"phrase_container"}>
                            Не уходи!
                        </div>
                    </motion.div>
                </Card>
                <Card onClick={() => doPhrase("Ладно")} >
                    <motion.div whileTap={{scale: 0.7}} >
                        <div className={"phrase_container"}>
                            Ладно
                        </div>
                    </motion.div>
                </Card>
                <Card onClick={() => doPhrase("Помогите")} >
                    <motion.div whileTap={{scale: 0.7}} >
                        <div className={"phrase_container"}>
                            Помогите
                        </div>
                    </motion.div>
                </Card>
            </CardScroll>
        </Group>
    )
}