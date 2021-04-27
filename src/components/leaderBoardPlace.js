import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import UsersStack from '@vkontakte/vkui/dist/components/UsersStack/UsersStack';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import '../views/main/Top.css'
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';
import Icon16Dropdown from '@vkontakte/icons/dist/16/dropdown';
import { motion } from "framer-motion"

import { Icon201CircleFillGold, Icon202CircleFillSilver, Icon203CircleFillBronze} from '@vkontakte/icons';

import {
    Avatar,
    Div,
    Counter,
    Gallery,
    Group,
    IOS,
    Placeholder,
    platform,
    Separator,
    SimpleCell,
    Tabs,
    TabsItem
} from "@vkontakte/vkui";
const osName = platform();

const numericIndicator = {
    height: 20,
    width: 20,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
    background: 'var(--modal_card_background)',
}


const leaderBoardPlace = ({ place, avaUrl, userName, exp }) => {

    if (place === 1) {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <Icon201CircleFillGold style={numericIndicator} />
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    } else if (place === 2) {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <Icon202CircleFillSilver style={numericIndicator} />
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    } else if (place === 3) {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <Icon203CircleFillBronze style={numericIndicator} />
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    } else {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <div style={numericIndicator}>{place}</div>
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    }

};



export default leaderBoardPlace;