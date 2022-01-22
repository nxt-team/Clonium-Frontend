import React from 'react';
import {
    Panel,
    Button,
    Placeholder,
} from "@vkontakte/vkui";
import { Icon32ErrorCircleOutline } from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";
import {doDisconnect, doReconnect, socket} from "../../api/socket";
const mobile_platforms = ["mobile_android", "mobile_ipad", "mobile_iphone", "mobile_iphone_messenger"]
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

const Offline = ({ id, goToMainView, activePanel, goToEndFightView, isLoadingInitData, screenSpinnerOff}) => {

    const reconnecting = async () => {
        doReconnect()
        if (window.navigator.onLine) {
            screenSpinnerOff()
            if (activePanel === "rateFight" || activePanel === "fightResults") {
                goToEndFightView()
            } else if (isLoadingInitData || activePanel === "game" || activePanel === "rejoinedGame"  || activePanel === "waitingForTheFight" || activePanel === "waitingForStart") {
                doDisconnect()
                await bridge.send("VKWebAppStorageSet", {"key": "reloading", "value": "1"});
                if (mobile_platforms.indexOf(startupParameters.get('vk_platform')) !== -1) {
                    window.location.reload()
                } else {
                    window.location.href = ''
                }
            } else {
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
                Приложение не может функционировать без интернет-соединения
            </Placeholder>
        </Panel>
    )
};



export default Offline;