import React, {useState, useEffect} from 'react';
import {ModalPageHeader, Footer, Gallery, Spinner, ModalPage, Placeholder} from "@vkontakte/vkui";
import bridge from '@vkontakte/vk-bridge';
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import {Icon28FireOutline, Icon28SwitchOutline} from '@vkontakte/icons';
import { Icon56AppleDeviceOutline } from '@vkontakte/icons';
import "./AboutVkDonutModal.css"
import {getDonateLink, getUserBalances} from "../api/api";
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

export default function AboutVkDonutModalContent({closeModal, completeSnackBar, errorSnackBar, updateUserBalances, userBalances}) {

    function getBulletsColor () {
        if (document.body.getAttribute("scheme") === "client_light" || document.body.getAttribute("scheme") === "bright_light") {
            return "dark"
        } else {
            return "light"
        }
    }

    function ShowOrderBox (item_name) {
        bridge.send("VKWebAppShowOrderBox", {type:"item",item:item_name})
            .then(data => console.log(data.status))
            .catch(error => console.log(error));
    }

    async function updateUserVkDonut (from) {
        const newUserBalances = await getUserBalances()
        if (newUserBalances["vk_donut"] !== 0) {
            closeModal()
            updateUserBalances(newUserBalances)
            completeSnackBar("Премиальные возможности подключены")
        } else {
            closeModal()
            errorSnackBar("Ты не оформил подписку Clonium Pass")
        }
    }

    function getSubTitle () {
        if (userBalances["vk_donut"] === 1) {
            let now = new Date()
            let donut_end = new Date(userBalances.donut_end)
            let daysLag = Math.ceil(Math.abs(donut_end.getTime() - now.getTime()) / (1000 * 3600 * 24)) - 1
            console.log(now, donut_end, daysLag)
            if (daysLag > 0) {
                if (daysLag % 100 !== 11 && daysLag % 10 === 1) {
                    return daysLag + ' день остался'
                } if (daysLag % 100 !== 12 && daysLag % 100 !== 13 && daysLag % 100 !== 14 && (daysLag % 10 === 2 || daysLag % 10 === 3 || daysLag % 10 === 4)) {
                    return daysLag + ' дня осталось'
                } else {
                    return daysLag + ' дней осталось'
                }
            } else {
                return "Осталось менее 1 дня"
            }

        } else {
            return "19 голосов"
        }
    }
    if (startupParameters.get('vk_platform') === "mobile_iphone" || startupParameters.get('vk_platform') === "mobile_ipad") {
        return (
            <Placeholder
                icon={<Icon56AppleDeviceOutline />}
                header="Упс..."
                action={<Button mode="tertiary" onClick={closeModal} >Закрыть</Button>}
            >
                Кажется, на этом устройстве нельзя оформить Clonium Pass
            </Placeholder>
        )
    } else {
        return (
            <>
                <Gallery
                    slideWidth="90%"
                    style={{ height: "100%", paddingTop: 8}}
                    bullets={getBulletsColor()}
                >
                    <div className={"VK_Donut_slide"}>
                        <div className={'VK_Donut_container'} id={"1_donut_slide"} >
                            <Title level="1" weight="semibold" style={{ marginBottom: 12, marginTop: 4 }} >
                                30 дней
                            </Title>
                            <Text weight="regular" style={{ marginBottom: 16 }}>
                                • Выбор аватарки для фишки<br/>
                                • Подсветка ходов соперников<br/>
                                • Карта "Проход", "Крест" и "Вихрь"<br/>
                                • Кастомный выбор времени игры от 5 мин до 45 мин<br/>
                                • Бесконечное кол-во билетов<br/>
                                • Доступ к закрытой беседе<br/>
                                • Специальные промокоды для донов<br/>
                            </Text>
                            <div >
                                <div style={{display: "flex"}}>
                                    <Button
                                        size="xl"
                                        onClick={() => ShowOrderBox("subscription_id_1")}
                                    >
                                        {userBalances["vk_donut"] === 1 ? "Продлить" : "Оформить"}
                                    </Button>
                                </div>
                                <Footer style={{margin: "8px 0"}} >{getSubTitle()}</Footer>
                            </div>
                        </div>
                    </div>

                    <div className={"VK_Donut_slide"}>
                        <div className={'VK_Donut_container'} >
                            <Title level="1" weight="semibold" style={{ marginBottom: 12, marginTop: 4, display: "flex" }} >
                                Навсегда
                            </Title>
                            <Text weight="regular" style={{ marginBottom: 16}}>
                                Все те же преимущества <br/>
                                + ракета рядом с именем в топе,<br/>
                                но с единоразовым платежом  и навсегда.
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </Text>
                            <div >
                                <div style={{display: "flex"}}>
                                    <Button size="xl"
                                            onClick={() => ShowOrderBox("subscription_id_2")}>Приобрести</Button>
                                </div>
                                <Footer style={{margin: "8px 0"}} >39 голосов</Footer>
                            </div>
                        </div>
                    </div>
                </Gallery>
            </>
        )
    }
}