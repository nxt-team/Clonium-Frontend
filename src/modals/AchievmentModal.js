import React from 'react';
import {ModalCard} from "@vkontakte/vkui";
import { Icon28AchievementCircleFillBlue } from '@vkontakte/icons';
import {changeUserRank} from "../api/api";

export default function AchievementModal({id, closeModal, data, fetchedUser, completeSnackBar}) {

    const title = data[0]
    const caption = data[1]
    const rank_id = data[2]

    async function changeRank (fetchedUser, rank_id) {
        closeModal()
        const result = await changeUserRank(fetchedUser, rank_id)
        if (result["success"]) {
            completeSnackBar("Ранг изменён")
        }
    }

    function actions () {
        if (rank_id !== null) {
            return (
                [
                    {
                        title: 'Задать рангом',
                        mode: 'secondary',
                        action: () => {
                            changeRank(fetchedUser, rank_id)
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