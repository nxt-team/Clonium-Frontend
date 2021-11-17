import React, {useState, useEffect} from 'react';
import AnimatedDoneIcon from "../components/AnimatedDoneIcon";
import {File, ModalCard, Gallery} from "@vkontakte/vkui";
import ImgPlayIcon from "../components/ImgPlayIcon";
import useInterval from "@use-it/interval";


export default function ShowImgPlayIconModal({id, closeModal, imgLink}) {

    const [slideIndex, setSlideIndex] = useState(0)

    setTimeout(() => {
        if (slideIndex < 3) {
            setSlideIndex(slideIndex + 1)
        } else {
            setSlideIndex(0)
        }
    }, 1500)

    return (
        <ModalCard
            id={id}
            onClose={() => closeModal()}
            icon={
                <Gallery
                    slideWidth="90%"
                    align="center"
                    style={{ height: 76 }}
                    slideIndex={slideIndex}
                    onChange={i => setSlideIndex(i)}
                >
                    <ImgPlayIcon color={"red"} size={1} imgLink={imgLink} />
                    <ImgPlayIcon color={"blue"} size={2} imgLink={imgLink} />
                    <ImgPlayIcon color={"yellow"} size={3} imgLink={imgLink} />
                    <ImgPlayIcon color={"green"} size={3} imgLink={imgLink} />
                </Gallery>
            }
            header="Твоя фишка"
            caption="Теперь так будут выглядить твои фишки во время игры"
            actions={[{
                title: 'Хорошо',
                mode: 'primary',
                action: () => {
                    closeModal();
                }
            }]}
        >
        </ModalCard>
    )
}