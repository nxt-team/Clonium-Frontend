import React from 'react';
import {Div, ModalPageHeader, ModalPage} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Button from "@vkontakte/vkui/dist/components/Button/Button";

export default function SuperFightModal({id, closeModal}) {
    return (
        <ModalPage
            id={id}
            settlingHeight={100}
            onClose={closeModal}
            header={
                <ModalPageHeader
                    right={
                        <PanelHeaderButton onClick={closeModal}>
                            <Icon24Dismiss />
                        </PanelHeaderButton>
                    }
                >
                    Супер бой
                </ModalPageHeader>
            }
        >
            <Div>
                <Text weight="regular" style={{ marginBottom: 16 }}>
                    Супер бой проходит на самой большой карте 10 на 17 клеток, в субботу
                    вечером. Игроки разделяются на 5 команд. Всего в игре может принять
                    участие максиму 10 человек.
                    <br />
                    <br />
                    Игроки находящиеся в топ 10 по опыту гарантированно имеют шанс
                    поучаствовать в супер боее. Остальные смогут принять участие, только
                    если место какого то игрока из топ 10 будет свободно.
                    <br />
                    <br />
                    Команда, победившая в супер бое, получает стикер пак (для каждого
                    члена команды). За подробностями супер боёв следите в нашей беседе и
                    в нашем сообществе.
                </Text>
                <Button size="xl">Участвовать</Button>
            </Div>
        </ModalPage>
    )
}