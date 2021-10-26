import React, {useState, useEffect} from 'react';
import {Div, ModalPageHeader, ModalPage, Input, ModalCard, WriteBar, Link} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import bridge from '@vkontakte/vk-bridge';
import {activatePromocode, getTicket, updateIsUserInSuperFight} from "../api/api";

export default function PromocodeActivationModal({id, closeModal, fetchedUser, errorSnackBar, completeSnackBar, changeActiveModal, updateUserBalances, useBalances}) {

    const [promocode, setPromocode] = useState("")

    // useEffect(() => {
    //     setTimeout(() => document.getElementById('promocodeInput').focus(), 0)
    // }, [])

    async function makePromocodeActivation () {
        if (promocode.trim().length > 0) {

            const result = await activatePromocode(promocode, fetchedUser)
            console.log(result)
            if (result.success) {
                closeModal()
                await updateUserBalances()
                setTimeout(() => changeActiveModal("successPromocodeActivation"), 500)
            } else {
                closeModal()
                setTimeout(() => changeActiveModal("erroredPromocodeActivation"), 500)
            }
            // } else {
            //     bridge.send("VKWebAppShowNativeAds", {ad_format: "reward"})
            //         .then(async data => {
            //             if (data.result) {
            //                 const result = await activatePromocode(promocode, fetchedUser)
            //                 console.log(result)
            //                 if (result.success) {
            //                     closeModal()
            //                     await updateUserBalances()
            //                     setTimeout(() => changeActiveModal("successPromocodeActivation"), 500)
            //                 } else {
            //                     closeModal()
            //                     setTimeout(() => changeActiveModal("erroredPromocodeActivation"), 500)
            //                 }
            //             } else if (data.no_ad_reason.toLowerCase() === "no ad" || data.no_ad_reason.toLowerCase() === "no ads" || data.error_data.error_reason.toLowerCase() === "no ad" || data.error_data.error_reason.toLowerCase() === "no ads") {
            //                 closeModal()
            //                 bridge.send("VKWebAppShowNativeAds", {ad_format: "preloader"})
            //                     .then(async data => {
            //                         if (data.result) {
            //                             const result = await activatePromocode(promocode, fetchedUser)
            //                             console.log(result)
            //                             if (result.success) {
            //                                 closeModal()
            //                                 await updateUserBalances()
            //                                 setTimeout(() => changeActiveModal("successPromocodeActivation"), 500)
            //                             } else {
            //                                 closeModal()
            //                                 setTimeout(() => changeActiveModal("erroredPromocodeActivation"), 500)
            //                             }
            //                         } else if (data.no_ad_reason.toLowerCase() === "no ad" || data.no_ad_reason.toLowerCase() === "no ads" || data.error_data.error_reason.toLowerCase() === "no ad" || data.error_data.error_reason.toLowerCase() === "no ads") {
            //                             closeModal()
            //                             errorSnackBar("Не удалось активировать промокод. Закончилась реклама")
            //                         } else {
            //                             closeModal()
            //                             errorSnackBar("Не известная ошибка. data: " + data)
            //                         }
            //                     })
            //                     .catch((e) => {
            //                         errorSnackBar("Не удалось активировать промокод. Закончилась реклама")
            //                     })
            //             } else {
            //                 closeModal()
            //                 errorSnackBar("Не известная ошибка. data: " + data)
            //             }
            //         })
            //         .catch((e) => {
            //             console.log(e)
            //             closeModal()
            //             bridge.send("VKWebAppShowNativeAds", {ad_format: "preloader"})
            //                 .then(async data => {
            //                     if (data.result) {
            //                         const result = await activatePromocode(promocode, fetchedUser)
            //                         console.log(result)
            //                         if (result.success) {
            //                             closeModal()
            //                             await updateUserBalances()
            //                             setTimeout(() => changeActiveModal("successPromocodeActivation"), 500)
            //                         } else {
            //                             closeModal()
            //                             setTimeout(() => changeActiveModal("erroredPromocodeActivation"), 500)
            //                         }
            //                     } else if (data.no_ad_reason.toLowerCase() === "no ad" || data.no_ad_reason.toLowerCase() === "no ads" || data.error_reason.toLowerCase() === "no ad" || data.error_reason.toLowerCase() === "no ads") {
            //                         closeModal()
            //                         errorSnackBar("Не удалось активировать промокод. Закончилась реклама")
            //                     } else {
            //                         closeModal()
            //                         errorSnackBar("Не известная ошибка. data: " + data)
            //                     }
            //                 })
            //                 .catch((e) => {
            //                     closeModal()
            //                     errorSnackBar("Не удалось активировать промокод. Закончилась реклама")
            //                 })
            //         })
            // }
        }


    }

    function keyDown (e) {
        const code = e.keyCode || e.which;
        if (code === 13 && promocode.trim().length > 0) {
            makePromocodeActivation()
        }
    }

    return (
        <ModalPage
            id={id}
            settlingHeight={100}
            onClose={closeModal}
            header={
                <ModalPageHeader
                    right={
                        <PanelHeaderButton onClick={closeModal}>
                            <Icon24Dismiss />
                        </PanelHeaderButton>
                    }
                >
                    Активация промокода
                </ModalPageHeader>
            }
        >
            <Div>
                <div style={{textAlign: "center"}}>
                    <Text weight="regular" style={{ marginBottom: 16, color: "var(--text_secondary)" }}>
                        Промокод будет активирован за просмотр рекламы.
                        Промокоды регулярно появляются на стене нашего <Link target="_blank" href="https://vk.com/clonium.group" >сообщества</Link>.
                    </Text>
                </div>
                <Input
                    style={{ marginBottom: 16 }}
                    id={"promocodeInput"}
                    onKeyDown={keyDown}
                    placeholder={"Введи промокод"}
                    value={promocode}
                    onChange={(e) => setPromocode(e.target.value)}
                />
                <Button
                    size="xl"
                    disabled={promocode.trim().length === 0}
                    onClick={() => {
                        makePromocodeActivation()
                    }}>Активировать</Button>
            </Div>
        </ModalPage>
    )
}