import React from 'react';
import './MainButtons.css';
import {Div, Button} from "@vkontakte/vkui";
import { Icon28RadiowavesAroundOutline, Icon28FireOutline, Icon24CupOutline, Icon28Notifications } from '@vkontakte/icons';

export default function MainButtons(props) {
    const {
        go,
        changeActiveModal,
        areNotificationsEnabled,
        isUserInSuperFight,
    } = props;

    const renderButton = (areNotificationsEnabled, isUserInSuperFight) => {
        if (!areNotificationsEnabled) {
            return (
                <Button size="xl" before={<Icon28Notifications />} stretched style={{ marginRight: 8 }} mode="secondary">Уведомления</Button>
            )
        } if (!isUserInSuperFight) {
            return (
                <Button size="xl" before={<Icon28FireOutline />} stretched onClick={() => changeActiveModal('SuperFight')} style={{ marginRight: 8 }} mode="secondary">Супер бой</Button>
            )
        } else {
            return (
                <Button size="xl" before={<Icon28RadiowavesAroundOutline />} onClick={go} data-to="achievements" stretched style={{ marginRight: 8 }} mode="secondary">Достижения</Button>
            )
        }
    }

    return (
        <Div className="buttons_container">
            {renderButton(areNotificationsEnabled, isUserInSuperFight)}
            <Button size="xl" before={<Icon24CupOutline width={28} height={28} />} onClick={go} data-to="top" stretched mode="secondary">Топ</Button>
        </Div>
    )
}