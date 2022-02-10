import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {
    IOS,
    FormLayoutGroup,
    platform,
    Radio,
    FormLayout,
    Spinner,
    SimpleCell,
    Placeholder
} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import {isDonut, isPieceAvatar, updatePieceAvatar} from "../../api/api";
import {Icon28CancelCircleFillRed, Icon32ErrorCircleOutline} from "@vkontakte/icons";
import { Icon56LockOutline } from '@vkontakte/icons';
const osName = platform();
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))


const Customization = ({ id, go, changeActiveModal, fetchedUser, imgLink }) => {
    const [isDon, setIsDon] = useState(null)
    const [isPieceAvatarPhoto, setIsPieceAvatarPhoto] = useState(false)

    useEffect(() => {
        async function updateIsDonut() {
            const isPieceAvatarPhoto = await isPieceAvatar(fetchedUser)
            console.log(isPieceAvatarPhoto)
            setIsPieceAvatarPhoto(isPieceAvatarPhoto)
            const isDon = await isDonut(fetchedUser)
            setIsDon(isDon)
        }
        updateIsDonut();
    }, []);

    console.log(isPieceAvatarPhoto)

    async function changeIsPieceAvatarPhoto () {
        setIsPieceAvatarPhoto(!isPieceAvatarPhoto)
        if (isPieceAvatarPhoto) {
            await updatePieceAvatar(fetchedUser, "0")
        }
    }

    function showDonut () {
        if (startupParameters.get('vk_platform') === "mobile_web" || startupParameters.get('vk_platform') === "desktop_web" || startupParameters.get('vk_platform') === "mobile_android") {
            changeActiveModal('aboutVkDonut')
        }
    }

    function renderCustomization () {
        if (isDon === null) {
            return (
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Spinner size="regular" style={{ marginTop: 20 }} />
                </div>
            )
        } else if (isDon) {
            return (
                <FormLayout>
                    <FormLayoutGroup top="Аватарка фишки">
                        <Radio name="radio"
                               onChange={changeIsPieceAvatarPhoto}
                               checked={!isPieceAvatarPhoto}
                               value="1" description="Цвет фишки будет задан игрой" defaultChecked>Цветная</Radio>
                        <Radio checked={isPieceAvatarPhoto} name="radio" onChange={changeIsPieceAvatarPhoto} onClick={() => {changeActiveModal('uploadingPhoto'); setIsPieceAvatarPhoto(true)}} value="2" description="Ты можешь загрузить фотографию, и она станет аватаркой твоих фишек " >Фотография</Radio>

                    </FormLayoutGroup>
                </FormLayout>
            )
        } else {
            return (
                <>
                    <Placeholder
                        icon={<Icon56LockOutline />}
                    >
                        Вам не хватает прав доступа
                    </Placeholder>
                    <SimpleCell
                        onClick={showDonut}
                        before={<Icon28CancelCircleFillRed/>}
                        style={{cursor: "pointer"}}
                    >
                        Доступно с подпиской Clonium Pass
                    </SimpleCell>
                </>
            )
        }
    }

    return (
        <Panel
            id={id}
        >
            <PanelHeader
                left={<PanelHeaderButton onClick={() => window.history.back()} data-to="profile">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Аватарка фишки
            </PanelHeader>
            {renderCustomization()}
            {/*<svg*/}
            {/*    className="cont"*/}
            {/*    viewBox="0 0 38 38"*/}
            {/*    fill="none"*/}
            {/*    xmlns="http://www.w3.org/2000/svg"*/}
            {/*>*/}
            {/*    <defs>*/}
            {/*        <pattern id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">*/}
            {/*            <image className='twombly' xlinkHref="https://photocentra.ru/images/main57/576214_main.jpg"*/}
            {/*                   x="0" y="0"/>*/}
            {/*        </pattern>*/}

            {/*    </defs>*/}
            {/*    <circle*/}
            {/*        cx="19"*/}
            {/*        cy="19"*/}
            {/*        r="18"*/}
            {/*        fill="url(#img1)"*/}
            {/*        stroke="currentColor"*/}
            {/*        stroke-width="2"*/}
            {/*    />*/}
            {/*    <circle cx="19" cy="19" r="3" fill="#F5F5F5" />*/}
            {/*</svg>*/}





        </Panel>
    )
};
// <Button
//     style
//     mode="secondary"
//     size='l'
//     before={<Icon24CameraOutline />}
// >
//     Загрузить фотографию
// </Button>




export default Customization;