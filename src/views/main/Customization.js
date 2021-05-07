import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {Avatar, Div, Group, IOS, FormLayoutGroup, platform, Radio, FormLayout, TabsItem, Button} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
const osName = platform();



const Customization = ({ id, go, changeActiveModal, fetchedUser }) => {


    return (
        <Panel
            id={id}
        >
            <PanelHeader
                left={<PanelHeaderButton onClick={() => window.history.back()} data-to="profile">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Кастомизация
            </PanelHeader>
            <FormLayout>
                <FormLayoutGroup top="Аватарка фишки">
                    <Radio name="radio" value="1" description="Цвет фишки будет задан игрой" defaultChecked>Цветная</Radio>
                    <Radio name="radio" onClick={() => changeActiveModal('uploadingPhoto')} value="2" description="Ты можешь загрузить фотографию, и она станет аватаркой твоих фишек " >Фотография</Radio>

                </FormLayoutGroup>
            </FormLayout>
            {/*<svg*/}
            {/*    className="cont"*/}
            {/*    viewBox="0 0 38 38"*/}
            {/*    fill="none"*/}
            {/*    xmlns="http://www.w3.org/2000/svg"*/}
            {/*>*/}
            {/*    <defs>*/}
            {/*        <pattern id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">*/}
            {/*            <image className='twombly' xlinkHref="https://photocentra.ru/images/main57/576214_main.jpg"*/}
            {/*                   x="0" y="0"/>*/}
            {/*        </pattern>*/}

            {/*    </defs>*/}
            {/*    <circle*/}
            {/*        cx="19"*/}
            {/*        cy="19"*/}
            {/*        r="18"*/}
            {/*        fill="url(#img1)"*/}
            {/*        stroke="currentColor"*/}
            {/*        stroke-width="2"*/}
            {/*    />*/}
            {/*    <circle cx="19" cy="19" r="3" fill="#F5F5F5" />*/}
            {/*</svg>*/}





        </Panel>
    )
};
// <Button
//     style
//     mode="secondary"
//     size='l'
//     before={<Icon24CameraOutline />}
// >
//     Загрузить фотографию
// </Button>




export default Customization;