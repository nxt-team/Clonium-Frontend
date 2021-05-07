import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import '../main/waitingForStart.css'
import '../creatingRoom/CreatingRoom.css'
import '../main/home.css'
import bridge from '@vkontakte/vk-bridge';
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption';
import Icon24ShareOutline from '@vkontakte/icons/dist/24/share_outline';
import Icon24NotificationOutline from '@vkontakte/icons/dist/24/notification_outline';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';
import {
    WriteBar,
    Radio,
    FormLayout,
    FormLayoutGroup,
    Card,
    Placeholder,
    platform,
    Separator,
    Div,
    Slider,
    CardScroll, IOS, CardGrid,
    PanelHeaderClose, Gallery, Text, FixedLayout
} from "@vkontakte/vkui";
import {
    Icon28CancelOutline,
    Icon28UserOutline,
    Icon28UsersOutline,
    Icon28Users3Outline,
    Icon28GhostOutline, Icon28TargetOutline
} from '@vkontakte/icons';
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack";
import Icon28Notifications from "@vkontakte/icons/dist/28/notifications";
import { Icon24DismissDark } from '@vkontakte/icons';
import DonutSize6 from '../../mapsPreview/DonutSize6';
import DonutSize8 from '../../mapsPreview/DonutSize8';
import GridSize8 from '../../mapsPreview/GridSize8';
import GridSize10 from '../../mapsPreview/GridSize10';
import PassageSize10 from '../../mapsPreview/PassageSize10';
import SquareSize6 from '../../mapsPreview/SquareSize6';
import SquareSize8 from '../../mapsPreview/SquareSize8';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";



const Home = ({ id, go, goToMainView, fetchedUser }) => {

    const [slideIndex, setSlideIndex] = useState(4)
    const [comment, setComment] = useState('')

    return (
        <Panel
            id={id}
        >
            <PanelHeader
                separator={false}
                transparent={true}
            >
            </PanelHeader>
            <div
                style={{
                    marginTop: 8,
                    display: 'flex',
                    textAlign: 'center',
                    flexDirection: "column",
                }}
            >
                <Title level="1" weight="semibold" style={{fontSize: 32, lineHeight: "36px"}}>
                    Как прошёл бой?
                </Title>
                <Text weight="regular" style={{marginTop: 8}} >
                    хорошо
                </Text>
            </div>

            <Gallery
                slideWidth="100%"
                align="center"
                style={{height: 400}}
                slideIndex={Number(slideIndex.toFixed(0))}
                onChange={newSlideIndex => setSlideIndex(newSlideIndex)}
            >
                <div className="rateFight_gallery_div">
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/grinning-squinting-face_1f606.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/grinning-face-with-big-eyes_1f603.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/grinning-face_1f600.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/slightly-smiling-face_1f642.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/neutral-face_1f610.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/confused-face_1f615.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/frowning-face_2639-fe0f.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/pouting-face_1f621.png"}/>
                </div>
                <div className="rateFight_gallery_div" >
                    <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/face-with-symbols-on-mouth_1f92c.png"}/>
                </div>


            </Gallery>
            <Div>
                <Slider
                    step={1}
                    min={0}
                    max={8}
                    value={Number(slideIndex)}
                    onChange={value => setSlideIndex(value)}
                />
            </Div>
            <WriteBar
                style={{marginRight: 12}}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Коментарий"
            />
            <Div>
                <Button size="xl" disabled={comment.length === 0} onClick={goToMainView}>Готово!</Button>
            </Div>


        </Panel>
    )
};



export default Home;