import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './waitingForStart.css'
import { Icon28ClearDataOutline } from '@vkontakte/icons';


const ClearCache = ({ id}) => {


    return (
        <Panel
            id={id}
        >
            <PanelHeader
                visor={false}
                transparent={true}
                separator={false}
            />
            <div style={{
                width: "100vw",
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
            }}>
                <div >
                    <Icon28ClearDataOutline width={64} height={64} />
                </div>
                <Title level="1" weight="semibold" style={{ margin: "20px 12px 28px"}} >
                    Очисти кэш мини приложения
                </Title>
            </div>
        </Panel>
    )
};



export default ClearCache;