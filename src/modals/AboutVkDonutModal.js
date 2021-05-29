import React from 'react';
import {Div, ModalCard, ModalPage} from "@vkontakte/vkui";
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Text from "@vkontakte/vkui/dist/components/Typography/Text/Text";
import Button from "@vkontakte/vkui/dist/components/Button/Button";

export default function AboutVkDonutModal({id, closeModal}) {
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
                    VK Donut
                </ModalPageHeader>
            }
        >
            <Div>
                <Text weight="regular" style={{ marginBottom: 16 }}>
                    Оформи подписку Vk Donut и получи следующее преимущества: <br/>
                    <br/>
                    • Возможность выбора аватарки для фишки <br/>
                    • Подсветка ходов соперников (видно кто куда тыкает) <br/>
                    • 5 билетов в день <br/>
                    • Звездочка рядом с именем в топе <br/>
                    • Никакой рекламы <br/>
                </Text>
                <Button size="xl">Оформить</Button>
            </Div>
        </ModalPage>
    )
}