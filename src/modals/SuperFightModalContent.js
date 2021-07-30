import React from 'react';
import {Div} from "@vkontakte/vkui";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {updateIsUserInSuperFight} from "../api/api";

export default function SuperFightModalContent({id, closeModal, completeSnackBar, isUserInSuperFight, changeIsUserInSuperFight}) {
    return (
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
            <Button
                size="xl"
                disabled={isUserInSuperFight}
                onClick={() => {
                updateIsUserInSuperFight();
                closeModal();
                changeIsUserInSuperFight();
                completeSnackBar("Участвуешь");
            }}>{isUserInSuperFight ? "Ты участвуешь" : "Участвовать"}</Button>
        </Div>
    )
}