import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './loading.css'
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import RichCell from "@vkontakte/vkui/dist/components/RichCell/RichCell";
import Icon28FireOutline from '@vkontakte/icons/dist/28/fire_outline';
import Icon56UsersOutline from '@vkontakte/icons/dist/56/users_outline';
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';
import { motion } from "framer-motion"

import {Avatar, Div, Group, IOS, Placeholder, platform, Separator, Tabs, TabsItem} from "@vkontakte/vkui";
const osName = platform();



const Home = ({ id, go, modalOn, fetchedUser }) => {


    return (
        <Panel
            id={id}
        >
            <PanelHeader
            >
                Загрузка
            </PanelHeader>
            <div
                className='big-div'
            >
                <motion.div
                    className='example-container'
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 0, 270, 270, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        loop: Infinity,
                        repeatDelay: 1
                    }}
                />
            </div>



        </Panel>
    )
};



export default Home;