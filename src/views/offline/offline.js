import React from 'react';
import {
    Panel,
    Button,
    Placeholder,
} from "@vkontakte/vkui";
import { Icon32ErrorCircleOutline } from '@vkontakte/icons';
import bridge from "@vkontakte/vk-bridge";

const Offline = ({ id, goToMainView, popout, activePanel, goToEndFightView, changePopou}) => {

    const reconnecting = () => {
        if (window.navigator.onLine) {
            if (popout) {
                if (popout.type.name === "ScreenSpinner") {
                    window.location.href = ''
                } else if (activePanel === "rateFight" || activePanel === "fightResults") {
                    goToEndFightView()
                } else {
                    changePopou(null)
                    goToMainView()
                }
            } else if (activePanel === "rateFight" || activePanel === "fightResults") {
                goToEndFightView()
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
                Приложение не может функционировать без интернет соединения
            </Placeholder>
        </Panel>
    )
};



export default Offline;