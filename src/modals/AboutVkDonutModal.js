import React, {useState, useEffect} from 'react';
import {ModalPageHeader, Footer, Gallery, Spinner, ModalPage} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import "./AboutVkDonutModal.css"
import {getDonateLink, getUserBalances} from "../api/api";

export default function AboutVkDonutModal({id, closeModal, completeSnackBar, errorSnackBar, updateUserBalances}) {
    const [donateLink, setDonateLink] = useState(null)
    const [isUpdateButton, setIsUpdateButton] = useState(false)

    useEffect(() => {
        async function getLink () {
            const link = await getDonateLink()
            console.log(link)
            setDonateLink(link)
        }
        getLink()
    }, [])

    function getBulletsColor () {
        if (document.body.getAttribute("scheme") === "client_light" || document.body.getAttribute("scheme") === "bright_light") {
            return "dark"
        } else {
            return "light"
        }
    }
    
    function addUpdateButton () {
        setIsUpdateButton(true)
    }

    async function updateUserVkDonut (from) {
        const newUserBalances = await getUserBalances()
        if (newUserBalances["vk_donut"] !== 0) {
            closeModal()
            updateUserBalances(newUserBalances)
            completeSnackBar("Премиальные возможности подключены")
        } else {
            closeModal()
            if (from === "vkDonut") {
                errorSnackBar("Ты не оформил подписку VK Donut")
            } else {
                errorSnackBar("Выставленный счёт не оплачен")
            }
        }
    }

    return (
        <ModalPage
            id={id}
            settlingHeight={100}
            onClose={() => closeModal}
            header={
                <ModalPageHeader
                    right={
                        <PanelHeaderButton onClick={closeModal}>
                            <Icon24Dismiss />
                        </PanelHeaderButton>
                    }
                >
                    Подписки
                </ModalPageHeader>
            }
        >
            <Gallery
                slideWidth="90%"
                style={{ height: "100%", paddingTop: 8 }}
                bullets={getBulletsColor()}
            >
                <div className={"VK_Donut_slide"}>
                    <div className={'VK_Donut_container'} >
                        <Title level="1" weight="semibold" style={{ marginBottom: 12, marginTop: 4 }} >
                            VK Donut
                        </Title>
                        <Text weight="regular" style={{ marginBottom: 16 }}>
                            • Возможность выбора аватарки для фишки<br/>
                            • Подсветка ходов соперников<br/>
                            • 5 билетов в день<br/>
                            • Звездочка рядом с именем в топе<br/>
                            • Никакой рекламы<br/>
                            • Крутые тактики в сообществе<br/>
                            • Секретные прмокоды<br/>
                        </Text>
                        <div >
                            <div style={{display: "flex"}}>
                                <Button size="xl" href="https://vk.com/donut/nxt.team" target="_blank" onClick={addUpdateButton} >Оформить VK Donut</Button>
                                { isUpdateButton &&
                                    <Button size="xl" style={{marginLeft: 12}} mode="secondary" onClick={() => updateUserVkDonut("vkDonut")} >Обновить</Button>
                                }
                            </div>
                            <Footer style={{margin: "8px 0"}} >от 99₽</Footer>
                        </div>
                    </div>
                </div>

                <div className={"VK_Donut_slide"}>
                    <div className={'VK_Donut_container'} >
                        <Title level="1" weight="semibold" style={{ marginBottom: 12, marginTop: 4 }} >
                            Навсегда
                        </Title>
                        <Text weight="regular" style={{ marginBottom: 16 }}>
                            Все тежи приемущества <br/>
                            + создание своих карт (скоро) <br/>
                            + ракета рядом с именем в топе, <br/>
                            но с единоразовым платежом  и навсегда.
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </Text>
                        <div >
                            <div style={{display: "flex"}}>
                                { donateLink
                                    ? <Button size="xl" target="_blank" href={donateLink} onClick={addUpdateButton} >Приобрести</Button>
                                    : <Button size="xl" disabled={true} ><Spinner size="regular" /></Button>
                                }
                                { isUpdateButton &&
                                    <Button size="xl" style={{marginLeft: 12}} mode="secondary" onClick={() => updateUserVkDonut("forever")} >Обновить</Button>
                                }
                            </div>
                            <Footer style={{margin: "8px 0"}} >499₽</Footer>
                        </div>
                    </div>
                </div>
            </Gallery>
        </ModalPage>
    )
}