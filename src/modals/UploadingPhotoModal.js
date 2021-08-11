import React from 'react';
import AnimatedDoneIcon from "../components/AnimatedDoneIcon";
import {File, ModalCard, Spinner} from "@vkontakte/vkui";
import {Icon56GalleryOutline} from "@vkontakte/icons";
import {onChange_originalFile} from "../api/api";

export default function UploadingPhotoModal({id, closeModal, imgLink, setImgLink, changeActiveModal, fetchedUser, errorSnackBar}) {
    return (
        <ModalCard
            id={id}
            onClose={() => closeModal()}
            icon={<Icon56GalleryOutline />}
            header="Загрузи фотографию"
            caption="Смени аватарку фишки на любую картинку"
        >
            <File
                accept="image/*"
                mode="primary"
                controlSize="xl"
                disabled={imgLink === "loading"}
                style={{marginTop: 16}}
                onChange={(e) => onChange_originalFile(e, setImgLink, changeActiveModal, fetchedUser, errorSnackBar, closeModal)}
            >
                {imgLink === "loading" ? <Spinner size="regular" /> : "Загрузить"}
            </File>
        </ModalCard>
    )
}