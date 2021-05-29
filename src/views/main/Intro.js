import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import './intro.css'
import { Icon28TargetOutline } from '@vkontakte/icons';
import {
    Avatar,
    Div,
    FixedLayout,
    Group,
    Gallery,
    PanelHeaderButton,
    platform,
    Progress,
    InfoRow,
    Header,
    SimpleCell, Placeholder
} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { Icon28GhostOutline } from '@vkontakte/icons';
import { Icon28GameOutline } from '@vkontakte/icons';
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import fluid from "../../img/fluid 10.png"
import wavingHand from "../../img/waving-hand.png"
import GameMechanics from "../../components/IntroComponents/GameMechanics"
import ExplosionMechanics from "../../components/IntroComponents/ExplosionMechanics";
import GrabRivals from "../../components/IntroComponents/GrabRivals"
import Icon24StoryOutline from "@vkontakte/icons/dist/24/story_outline";
import { Icon28AddSquareOutline } from '@vkontakte/icons';
import { Icon28FavoriteOutline } from '@vkontakte/icons';

let fluidClass = "show"
const Intro = ({ id, panel_go, changeActiveModal, fetchedUser }) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [galleryContent, setGalleryContent] = useState([])

    const clickChangeSlideIndex = () => {
        console.log(slideIndex)
        if (slideIndex - 2 === galleryContent.length) {
            window.history.back()
        } else {
            setSlideIndex(slideIndex + 1)
        }
    }
    const addClass = (className) => {
        var myButtonClasses = document.getElementById("fluid").classList;
        myButtonClasses.add(className);
    }

    const removeClass = (className) => {
        var myButtonClasses = document.getElementById("fluid").classList;
        myButtonClasses.remove(className);
    }

    if ((slideIndex === 5 || slideIndex > 1) && fluidClass === "show") {
        addClass("hideFluid")
        fluidClass = "hide"
    } else if ((slideIndex === 5 ||slideIndex < 2) && fluidClass === "hide") {
        removeClass("hideFluid")
        fluidClass = "show"
    }

    const doneGameMechanics = () => {
        changeActiveModal("gameMechanicsModal")
        galleryContent.push(
            <div>
                <ExplosionMechanics done={doneExplosionMechanics} changeActiveModal={changeActiveModal}/>
            </div>
        )
    }

    const doneExplosionMechanics = () => {
        changeActiveModal("explosionMechanicsModal")
        galleryContent.push(
            <div>
                <GrabRivals done={doneGrabRivals} changeActiveModal={changeActiveModal}/>
            </div>
        )
    }

    const doneGrabRivals = () => {
        changeActiveModal("grabRivalsModal")
        // galleryContent.push(
        //     <div>
        //         <AboutMap done={doneAboutMap} changeActiveModal={changeActiveModal}/>
        //     </div>
        // )
        galleryContent.push(
            <div>
                <Placeholder
                    style={{padding: "48px 32px 0", marginTop: "var(--safe-area-inset-top)"}}
                    icon={<img style={{width: 96, height: 96, borderRadius: "20px"}} src={"https://sun9-53.userapi.com/impg/VoUEHIs7prmKhySY8x-hSD0QaBwTUPLX1581RA/uGLoluP92oY.jpg?size=278x278&quality=96&sign=e2947c1fa9a63e5f9e4d6b8a713808c3&type=album"} />}
                    header="Клоний"
                />
                <div>
                    <SimpleCell disadled={true} multiline={true} before={<Icon28GameOutline />}>Играй с другими игроками онлайн в публичных комнатах</SimpleCell>
                    <SimpleCell disadled={true} multiline={true} before={<Icon28AddSquareOutline />}>Создавай приватные комнаты для игры с друзьями</SimpleCell>
                    <SimpleCell disadled={true} multiline={true} before={<Icon28FavoriteOutline/>}>Выполняй задания и получай достижения</SimpleCell>
                </div>
            </div>
        )
    }

    return (
        <Panel
            style={{overflowY: "hidden"}}
            id={id}
        >
            <div className="blur_container">
                <div id="fluid" className="circle_container">
                    <img src={fluid} className="img"/>
                </div>
            </div>
            <Gallery
                slideWidth="100%"
                align="center"
                className="gallery_position"
                slideIndex={slideIndex}
                onChange={newSlideIndex => setSlideIndex(newSlideIndex)}
            >
                <div>
                    <Placeholder
                        className="placeholderPosition"
                        // icon={<Icon28GhostOutline style={{color: "var(--text_primary)"}} width={64} height={64} />}
                        icon={<img src={wavingHand} style={{width: 96, height: 96}} />}
                        header={
                            <Title level="1" weight="semibold" >
                                Салют!
                            </Title>
                        }
                    >
                        <div style={{color: "var(--text_primary)"}} >Давай пройдём обучение</div>
                    </Placeholder>
                </div>
                <div>
                    <Placeholder
                        className="placeholderPosition"
                        icon={<Icon28TargetOutline style={{color: "var(--text_primary)"}} width={96} height={96} />}
                        header={
                            <Title level="1" weight="semibold" >
                                Цель игры
                            </Title>
                        }
                    >
                        <div style={{color: "var(--text_primary)"}} >уничтожить и захватить фишки соперников</div>
                    </Placeholder>
                </div>
                <div >
                    <GameMechanics done={doneGameMechanics} changeActiveModal={changeActiveModal} />
                </div>
                {galleryContent}

            </Gallery>


            <FixedLayout
                style={{backgroundColor: "var(--input_background)", borderRadius: "24px 24px 0 0", padding: "24px"}}
                vertical="bottom"
            >
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center"}}>
                    <div>
                        <Text weight="regular" >
                            {slideIndex*20}%
                        </Text>
                        <Progress
                            style={{width: 100, marginTop: 6}}
                            value={slideIndex*20}
                        />
                    </div>
                    <Button
                        disabled={slideIndex - 2 === galleryContent.length && slideIndex !== 5}
                        size="l"
                        mode="primary"
                        onClick={clickChangeSlideIndex}
                    >
                        Дальше
                    </Button>
                </div>
            </FixedLayout>
        </Panel>
    )
};



export default Intro;