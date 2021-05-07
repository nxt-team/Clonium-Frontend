import React, { useState} from 'react';
import {
    PanelHeader,
    Title,
    Panel,
    WriteBar,
    Div,
    Slider,
    WriteBarIcon,
    Gallery,
    Text,
} from "@vkontakte/vkui";
import './RateFight.css'


const FightResults = ({ id, goToMainView }) => {


    return (
        <Panel
            id={id}
            >
            <PanelHeader
                separator={false}
                transparent={true}
            />


        </Panel>
    )
};



export default FightResults;