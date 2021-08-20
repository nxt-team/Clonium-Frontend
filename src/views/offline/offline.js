import React from 'react';
import {
    Panel,
    Button,
    Placeholder,
} from "@vkontakte/vkui";
import { Icon32ErrorCircleOutline } from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";
import {doDisconnect, doReconnect} from "../../api/socket";

const Offline = ({ id, goToMainView, activePanel, goToEndFightView, isLoadingInitData, screenSpinnerOff}) => {

    const reconnecting = async () => {
        if (window.navigator.onLine) {
            screenSpinnerOff()
            if (activePanel === "rateFight" || activePanel === "fightResults") {
                doReconnect()
                goToEndFightView()
            } else if (isLoadingInitData || activePanel === "game" || activePanel === "rejoinedGame"  || activePanel === "waitingForTheFight" || activePanel === "waitingForStart") {
                doDisconnect()
                await bridge.send("VKWebAppStorageSet", {"key": "reloading", "value": "1"});
                window.location.href = ''
            } else {
                doReconnect()
                goToMainView()
            }
        }
    }

    return (
        <Panel
            id={id}
        >
            <Placeholder
                icon={<Icon32ErrorCircleOutline width={96} height={96} />}
                header="Ну давай, работай"
                action={<Button
                    // onClick={reconnecting}
                    onClick={() => reconnecting()}
                    size="l" mode="primary">Переподключиться</Button>}
                stretched
            >
                Приложение не может функционировать без интернет соединения
            </Placeholder>
        </Panel>
    )
};



export default Offline;