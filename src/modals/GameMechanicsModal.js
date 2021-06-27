import React, {useState, useEffect} from 'react';
import AnimatedDoneIcon from "../components/AnimatedDoneIcon";
import {ModalCard} from "@vkontakte/vkui";

export default function GameMechanicsModal({id, closeModal}) {
    return (
        <ModalCard
            id={id}
            onClose={closeModal}
            icon={<AnimatedDoneIcon/>}
            header="Разъяснение"
            caption={<span style={{color: "var(--text_primary)"}} >С каждым нажатием, фишка увеличивает свою массу на 1. При нажатии на фишку с массой 3 происходит разложение фишки на 4 новые.</span>}
            actions={[
                {
                    title: 'Прочитал',
                    mode: 'primary',
                    action: () => {
                        closeModal();
                    }
                }
            ]}
        >
        </ModalCard>
    )
}