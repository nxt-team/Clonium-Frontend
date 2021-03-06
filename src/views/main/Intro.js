import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import './intro.css'
import { Icon28TargetOutline } from '@vkontakte/icons';
import {
    FixedLayout,
    Gallery,
    Progress,
    SimpleCell, Placeholder
} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { Icon28GameOutline } from '@vkontakte/icons';
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import fluid from "../../img/fluid 10.png"
import wavingHand from "../../img/waving-hand.png"
import GameMechanics from "../../components/IntroComponents/GameMechanics"
import ExplosionMechanics from "../../components/IntroComponents/ExplosionMechanics";
import GrabRivals from "../../components/IntroComponents/GrabRivals"
import { Icon28AddSquareOutline } from '@vkontakte/icons';
import { Icon28FavoriteOutline } from '@vkontakte/icons';
import {maintainingEvents} from "../../api/api";

let used_slides = []
let fluidClass = "show"
const Intro = ({ id, panel_go, changeActiveModal, endIntro }) => {

    const [slideIndex, setSlideIndex] = useState(0);
    const [galleryContent, setGalleryContent] = useState([])

    useEffect(() => {
        if (used_slides.indexOf(slideIndex) === -1) {
            used_slides.push(slideIndex)
            const events = ["complete_1_slide", "complete_2_slide", "complete_3_slide", "complete_4_slide", "complete_5_slide", "complete_6_slide"]
            console.log(events[slideIndex])
            maintainingEvents(events[slideIndex])
        }
    }, [slideIndex])

    const clickChangeSlideIndex = () => {
        console.log(slideIndex, galleryContent.length)
        if (slideIndex - 2 === galleryContent.length) {
            endIntro()
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
            <div className={"lastIntroSlide"}>
                <Placeholder
                    style={{padding: "48px 32px 0", marginTop: "var(--safe-area-inset-top)"}}
                    icon={<img style={{width: 96, height: 96, borderRadius: "20px"}} src={"https://sun9-53.userapi.com/impg/VoUEHIs7prmKhySY8x-hSD0QaBwTUPLX1581RA/uGLoluP92oY.jpg?size=278x278&quality=96&sign=e2947c1fa9a63e5f9e4d6b8a713808c3&type=album"} />}
                    header="????????????"
                />
                <div>
                    <SimpleCell disabled={true} multiline={true} before={<Icon28GameOutline />}>?????????? ?? ?????????????? ???????????????? ???????????? ?? ?????????????????? ????????????????</SimpleCell>
                    <SimpleCell disabled={true} multiline={true} before={<Icon28AddSquareOutline />}>???????????????? ?????????????????? ?????????????? ?????? ???????? ?? ????????????????</SimpleCell>
                    <SimpleCell disabled={true} multiline={true} before={<Icon28FavoriteOutline/>}>???????????????? ?????????????? ?? ?????????????? ????????????????????</SimpleCell>
                </div>
            </div>
        )
    }

    return (
        <Panel
            className={"intro__panel"}
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
                                ??????????!
                            </Title>
                        }
                    >
                        <div style={{color: "var(--text_primary)"}} >?????????? ?????????????? ????????????????</div>
                    </Placeholder>
                </div>
                <div>
                    <Placeholder
                        className="placeholderPosition"
                        icon={<Icon28TargetOutline style={{color: "var(--text_primary)"}} width={96} height={96} />}
                        header={
                            <Title level="1" weight="semibold" >
                                ???????? ????????
                            </Title>
                        }
                    >
                        <div style={{color: "var(--text_primary)"}} >???????????????????? ?? ?????????????????? ?????????? ????????????????????</div>
                    </Placeholder>
                </div>
                <div >
                    <GameMechanics done={doneGameMechanics} changeActiveModal={changeActiveModal} />
                </div>
                {galleryContent}

            </Gallery>


            <FixedLayout
                className={"intro__fixedLayout"}
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
                        ????????????
                    </Button>
                </div>
            </FixedLayout>
        </Panel>
    )
};



export default Intro;