import React  from 'react';
import AnimatedDoneIcon from "../components/AnimatedDoneIcon";
import {ModalCard} from "@vkontakte/vkui";

export default function GrabRivalsModal({id, closeModal}) {
    return (
        <ModalCard
            id={id}
            onClose={closeModal}
            icon={<AnimatedDoneIcon/>}
            header="Разъяснение"
            caption={<span style={{color: "var(--text_primary)"}} >Появившиеся фишки после взрыва могут захватывать не только клетки, но и фишки соперников</span>}
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