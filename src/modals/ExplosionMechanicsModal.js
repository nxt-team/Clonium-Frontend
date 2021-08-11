import React from 'react';
import AnimatedDoneIcon from "../components/AnimatedDoneIcon";
import {ModalCard} from "@vkontakte/vkui";

export default function ExplosionMechanicsModal({id, closeModal}) {
    return (
        <ModalCard
            id={id}
            onClose={closeModal}
            icon={<AnimatedDoneIcon/>}
            header="Разъяснение"
            caption={<span style={{color: "var(--text_primary)"}} >Фишки, появившиеся после разложения, добавляются к рядом стоящим. Если у тех масса = 3, то они тоже раскладываются.</span>}
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