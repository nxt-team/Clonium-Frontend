import React from 'react';
import {ModalCard} from "@vkontakte/vkui";
import { Icon28AchievementCircleFillBlue } from '@vkontakte/icons';
import {changeUserRank} from "../api/api";
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

export default function AchievementModal({id, closeModal, data, fetchedUser, completeSnackBar, updateUserRank, userBalances, inviteReferrals, changeActiveModal}) {

    const title = data[0]
    let caption = data[1]
    const rank_id = data[2]

    if (title === "Промоутер") {
        caption += ". Приглашено: " + userBalances["referrals"]
        console.log(caption)
    }

    async function changeRank (fetchedUser, rank_id) {
        closeModal()
        const result = await changeUserRank(fetchedUser, rank_id)
        if (result["success"]) {
            updateUserRank(title)
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
        } else if (title === "Промоутер") {
            return (
                [
                    {
                        title: 'Пригласить',
                        mode: 'secondary',
                        action: () => {
                            setTimeout(() => {closeModal(); inviteReferrals()}, 100);
                        }
                    },
                ]
            )
        } else if (title === "Благодетель" && (startupParameters.get('vk_platform') === "mobile_web" || startupParameters.get('vk_platform') === "desktop_web" || startupParameters.get('vk_platform') === "mobile_android")) {
            return (
                [
                    {
                        title: 'Подробнее',
                        mode: 'secondary',
                        action: () => {
                            setTimeout(() => {
                                closeModal();
                                setTimeout(() => changeActiveModal("aboutVkDonut"), 200)
                            }, 100);
                        }
                    },
                ]
            )
        } else {
            return (
                [
                    {
                        title: 'Закрыть',
                        mode: 'secondary',
                        action: () => {
                            setTimeout(() => closeModal(), 100);
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