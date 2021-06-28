import React, {useState, useEffect} from 'react';
import {Div, ModalPageHeader, ModalPage, Input, ModalCard, WriteBar} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import bridge from '@vkontakte/vk-bridge';
import {activatePromocode, getTicket, updateIsUserInSuperFight} from "../api/api";

export default function PromocodeActivationModal({id, closeModal, fetchedUser, errorSnackBar, completeSnackBar, startupParameters, updateUserBalances}) {

    const [promocode, setPromocode] = useState()

    useEffect(() => {
        document.getElementById('promocodeInput').focus()
    }, [])

    async function makePromocodeActivation () {
        const user_platform = startupParameters.get('vk_platform')
        if (user_platform === 'mobile_android' || user_platform === 'mobile_ipad' || user_platform === 'mobile_iphone') {
            if (promocode.trim().length > 0) {
                bridge.send("VKWebAppShowNativeAds", {ad_format: "reward"})
                    .then(async data => {
                        if (data.result) {
                            const result = await activatePromocode(promocode, fetchedUser)
                            console.log(result)
                            if (result.success) {
                                closeModal()
                                completeSnackBar("Промокод активирован")
                            } else {
                                closeModal()
                                errorSnackBar("Не удалось активировать промокод")
                            }
                        } else if (data.no_ad_reason === "no ad") {
                            closeModal()
                            bridge.send("VKWebAppShowNativeAds", {ad_format: "preloader"})
                                .then(async data => {
                                    if (data.result) {
                                        const result = await activatePromocode(promocode, fetchedUser)
                                        console.log(result)
                                        if (result.success) {
                                            closeModal()
                                            updateUserBalances()
                                            completeSnackBar("Промокод активирован")
                                        } else {
                                            closeModal()
                                            errorSnackBar("Не удалось активировать промокод")
                                        }
                                    } else if (data.no_ad_reason === "no ad") {
                                        closeModal()
                                        errorSnackBar("Не удалось получить билет. Закончилась реклама")
                                    } else {
                                        closeModal()
                                        errorSnackBar("Не известная ошибка. data: " + data)
                                    }
                                })
                        } else {
                            closeModal()
                            errorSnackBar("Не известная ошибка. data: " + data)
                        }
                    })
                    .catch(error => {
                        closeModal()
                        errorSnackBar("Не удалось активировать промокод. " + error)
                    });
            }
        } else {
            closeModal()
            errorSnackBar("Промокод можно активировать только в официальном приложение ВКонтакте")
        }


    }

    return (
        <ModalCard
            id={id}
            onClose={() => closeModal()}
            header="Введи промокод"
            caption="Промокод будет активирован за просмотр рекламы"
            actions={[{
                title: 'Активировать',
                mode: 'primary',
                action: () => {makePromocodeActivation()}
            }]}>
            <Input
                id={"promocodeInput"}
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
            />
        </ModalCard>
    )
}