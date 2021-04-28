import React from 'react';
import {
    Panel,
    Button,
    Placeholder,
} from "@vkontakte/vkui";
import { Icon32ErrorCircleOutline } from '@vkontakte/icons';

const Home = ({ id, goToMainView}) => {

    const reconnecting = () => {
        if (window.navigator.onLine) {
            goToMainView()
        }
    }

    return (
        <Panel
            id={id}
        >
            <Placeholder
                icon={<Icon32ErrorCircleOutline width={96} height={96} />}
                header="Ну давай, работай"
                action={<Button onClick={reconnecting} size="l" mode="primary">Переподключиться</Button>}
                stretched
            >
                Приложение не может функционировать без интернет соединения
            </Placeholder>
        </Panel>
    )
};



export default Home;