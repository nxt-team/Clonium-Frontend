import React from 'react';
import AnimatedDoneIcon from "../components/AnimatedDoneIcon";
import {File, ModalCard, Spinner} from "@vkontakte/vkui";

export default function ShowImgPlayIconModal({id, closeModal, imgLink}) {
    console.log(imgLink)
    return (
        <ModalCard
            id={id}
            onClose={() => closeModal()}
            icon={
                <svg
                    style={{color: "var(--text_primary)"}}
                    className="cont"
                    viewBox="0 0 38 38"
                    fill="none"
                    width="76"
                    height="76"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">
                            <image className='twombly' xlinkHref={imgLink}
                                   x="0" y="0"/>
                        </pattern>

                    </defs>
                    <circle cx="19" cy="19" r="18" fill="url(#img1)" stroke="currentColor" stroke-width="2"/>
                    <circle cx="19" cy="19" r="3" fill="#F5F5F5" stroke="#232324"/>
                </svg>
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