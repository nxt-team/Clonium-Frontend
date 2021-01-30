import React, { useRef, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import Subhead from '@vkontakte/vkui/dist/components/Typography/Subhead/Subhead';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import './game.css'
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline';
import './home.css';
import Icon28ServicesOutline from '@vkontakte/icons/dist/28/services_outline';
import Icon28SettingsOutline from '@vkontakte/icons/dist/28/settings_outline';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon28ArrowDownOutline from '@vkontakte/icons/dist/28/arrow_down_outline';
import Icon28ArrowUpOutline from '@vkontakte/icons/dist/28/arrow_up_outline';
import Icon20ServicesOutline from '@vkontakte/icons/dist/20/services_outline';
import Icon24StoryOutline from '@vkontakte/icons/dist/24/story_outline';
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import { motion } from "framer-motion"
import Icon36GameOutline from '@vkontakte/icons/dist/36/game_outline';
import Icon28TicketOutline from '@vkontakte/icons/dist/28/ticket_outline';
import {Card, CardScroll, Cell, Div, Group, IOS, Placeholder, platform, Counter, SimpleCell} from "@vkontakte/vkui";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import {gsap} from "gsap";
const osName = platform();
const Svg = ({ start, svgSize, end, changed, onClick, color }) => {

    let fill = ''

    if (color === 'blue') {
        fill = '#00D8FF'
    } else if (color === 'red') {
        fill = '#FF79CB'
    } else if (color === 'green') {
        fill = '#2EE367'
    } else if (color === 'yellow') {
        fill = '#FFB327'
    }

    const ref = useRef();

    useEffect(() => {
        if (!changed) {
            return;
        }

        var tl = gsap.timeline();

        tl.to(ref.current, start).to(ref.current, end);

        // use tl?.kill() in real app
        return () => tl.kill();
    }, [start, end, changed]);

    return (
        <svg
            style={{ borderRadius: "100%", position: "absolute"}}
            ref={ref}
            height={svgSize}
            width={svgSize}
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="19"
                cy="19"
                r="18"
                fill={fill}
                stroke="currentColor"
                stroke-width="2"
            />
            <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
        </svg>
    );
};



export default Svg;