import React from 'react';
import {ModalCard} from "@vkontakte/vkui";
import { Icon28AchievementCircleFillBlue } from '@vkontakte/icons';

export default function AchievementModal({id, closeModal, data}) {

    const title = data[0]
    const caption = data[1]
    const isCompleted = data[2]

    function actions () {
        console.log('secondButton')
        if (isCompleted) {
            return (
                [
                    {
                        title: 'Задать рангом',
                        mode: 'secondary',
                        action: () => {
                            closeModal();
                        }
                    }
                ]
            )
        } else {
            return (
                [
                    {
                        title: 'Закрыть',
                        mode: 'secondary',
                        action: () => {
                            closeModal();
                        }
                    },
                ]
            )
        }
    }

    return (
        <ModalCard
            id={id}
            onClose={() => closeModal()}
            icon={<Icon28AchievementCircleFillBlue width={56} height={56} />}
            header={title}
            caption={caption}
            actions={actions()}
            actionsLayout="vertical"
        >
        </ModalCard>
    )
}