import React, { useState, useEffect} from 'react';
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
    Button, Avatar,
} from "@vkontakte/vkui";
import './RateFight.css'
import {rateFight} from "../../api/api";

const adjectives = ['Ужасно', 'Плохо', 'Не очень', 'Так себе', 'Нормально', 'Хорошо', 'Классно', 'Круто', 'Супер-пупер']

const RateFight = ({ id, goIsolated, screenSpinnerOn, screenSpinnerOff, fetchedUser, secretId }) => {

    const [slideIndex, setSlideIndex] = useState(4)
    const [comment, setComment] = useState('')
    const [interacted, setInteracted] = useState(false)

    if (!interacted) {
        if (slideIndex !== 4 || comment !== '') {
            setInteracted(true)
        }
    }

    async function sendCommentAndGo () {
        screenSpinnerOn()
        await rateFight(fetchedUser, slideIndex + 1, comment + "\n" + secretId)
        goIsolated("fightResults")
        screenSpinnerOff()
    }


    return (
        <Panel
            id={id}
        >

            <div className={"main__container"} >
                <div
                    className="title__container"
                >
                    <PanelHeader
                        separator={false}
                        transparent={true}
                    />
                    <Title level="1" weight="semibold" style={{fontSize: 32, lineHeight: "36px"}}>
                        Как прошёл бой?
                    </Title>
                    <Text weight="regular" style={{marginTop: 8}} >
                        {adjectives[slideIndex]}
                    </Text>
                </div>

                <Gallery
                    slideWidth="100%"
                    align="center"
                    style={{height: "calc(100vh - var(--safe-area-inset-bottom))"}}
                    slideIndex={Number(slideIndex.toFixed(0))}
                    onChange={newSlideIndex => setSlideIndex(newSlideIndex)}
                >
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/face-with-symbols-on-mouth_1f92c.png"}/>
                    </div>
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/pouting-face_1f621.png"}/>
                    </div>
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/frowning-face_2639-fe0f.png"}/>
                    </div>
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/confused-face_1f615.png"}/>
                    </div>
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/neutral-face_1f610.png"}/>
                    </div>
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/slightly-smiling-face_1f642.png"}/>
                    </div>
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/grinning-face_1f600.png"}/>
                    </div>
                    <div className="rateFight_gallery_div" >
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/grinning-face-with-big-eyes_1f603.png"}/>
                    </div>
                    <div className="rateFight_gallery_div">
                        <img src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/271/grinning-squinting-face_1f606.png"}/>
                    </div>

                </Gallery>
                <div className="tools__container">
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
                        // style={{marginRight: 12}}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Твой комментарий"
                        maxlength={400}
                        before={
                            <WriteBarIcon disabled={true} style={{opacity: 1}}>
                            <Avatar size={34} src={fetchedUser.photo_200} />
                            </WriteBarIcon>
                        }
                        after={comment.length !== 0 ?
                            <WriteBarIcon
                                mode="send"
                                disabled={!interacted}
                                data-to="fightResults"
                                onClick={sendCommentAndGo}
                            />
                            :
                            <div style={{width: 8}} />
                        }
                    />
                    {(comment.length === 0)&&
                        <div style={{padding: "0 12px"}}>
                            <Button size="xl" disabled={!interacted} onClick={sendCommentAndGo}>Отправить</Button>
                        </div>
                    }
                </div>

            </div>

        </Panel>
    )
};



export default RateFight;