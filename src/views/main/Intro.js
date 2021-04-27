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
    TabsItem, Placeholder
} from "@vkontakte/vkui";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import { Icon28GhostOutline } from '@vkontakte/icons';
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
const osName = platform();



const Intro = ({ id, panel_go, changeActiveModal, fetchedUser }) => {

    const [slideIndex, setSlideIndex] = useState(0);


    const clickChangeSlideIndex = () => {
        console.log(slideIndex)
        if (slideIndex !== 2) {
            setSlideIndex(slideIndex + 1)
        } else {
            panel_go("home")
        }
    }

    return (
        <Panel
            id={id}
        >
            <div className="blur_container">
                <div className="circle_container">
                    <img src="https://psv4.userapi.com/c532036/u476182155/docs/d14/d889ce771490/fluid_10.png?extra=EKqnpeqszo8abDn8BH1D-KBv-H-H0Jpeeoy0AXh79Lb7J90fIwa3CDZhVnUQPE1ZLXVPmOgST2iXdQ__mTydP3XY1t7PO03EUHHy3BhJA0-3psrwjiHBXV9qraJJD9Y5nwNRKkIWiSTdPswT-8LSJwk" className="img"/>
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
                        icon={<Icon28GhostOutline style={{color: "var(--text_primary)"}} width={64} height={64} />}
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
                        icon={<Icon28TargetOutline style={{color: "var(--text_primary)"}} width={64} height={64} />}
                        header={
                            <Title level="1" weight="semibold" >
                                Цель игры
                            </Title>
                        }
                    >
                        <div style={{color: "var(--text_primary)"}} >уничтожить и захватить фишки соперников</div>
                    </Placeholder>
                </div>
                <div>
                    <Placeholder
                        className="placeholderPosition"
                        icon={<Icon28GhostOutline style={{color: "var(--text_primary)"}} width={64} height={64} />}
                        header={
                            <Title level="1" weight="semibold" >
                                Салют!
                            </Title>
                        }
                    >
                        <div style={{color: "var(--text_primary)"}} >Давай пройдём обучение</div>
                    </Placeholder>
                </div>

            </Gallery>


            <FixedLayout
                style={{backgroundColor: "var(--input_background)", borderRadius: "24px 24px 0 0", padding: "24px"}}
                vertical="bottom"
            >
                <div style={{display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center"}}>
                    <div>
                        <Text weight="regular" >
                            {slideIndex*50}%
                        </Text>
                        <Progress
                            style={{width: 100, marginTop: 6}}
                            value={slideIndex*50}
                        />
                    </div>
                    <Button
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