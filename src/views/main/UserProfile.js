import React, {useState} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './achievements.css'
import {
    IOS,
    PanelHeaderButton, platform,
    Button,
    RichCell,
    Avatar,
    Div,
    Banner, Card, Caption, CardScroll, SimpleCell
} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import {
    Icon202CircleFillSilver,
    Icon24FavoriteOutline, Icon28ArrowDownOutline, Icon28ArrowUpOutline,
    Icon28DonateCircleFillYellow,
    Icon28FavoriteOutline, Icon28TicketOutline, Icon36GameOutline
} from '@vkontakte/icons';
import Icon24Back from "@vkontakte/icons/dist/24/back";
import UserStat from "../../components/UserStat";

const osName = platform();

const numericIndicator = {
    height: 20,
    width: 20,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
    background: 'var(--modal_card_background)',
}

const UserProfile = ({id}) => {

    const [isVkDonutBanner, setIsVkDonutBanner] = useState(true)

    return (
        <Panel
            id={id}
        >
            <PanelHeader
                left={<PanelHeaderButton onClick={() => window.history.back()} data-to="home">
                    {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                </PanelHeaderButton>}
            >
                Профиль
            </PanelHeader>
            <Div
                style={{paddingBottom: 0}}
            >
                <RichCell
                    style={{backgroundColor: "var(--content_tint_background)", borderRadius: 8}}
                    multiline
                    before={
                        <div className="avatar">
                            <Avatar size={72} src={"https://sun9-16.userapi.com/c857724/v857724589/9c7ad/01M-8UlcNoo.jpg?ava=1"} className="avatar__photo" />
                            <div className="avatar__indicator" >
                                <Icon28DonateCircleFillYellow style={numericIndicator} />
                            </div>
                        </div>
                    }
                    caption="Властелин фишек"
                >
                    <Title level="2" weight="regular" style={{marginBottom: 4}} >Тарас Иванов</Title>
                </RichCell>
            </Div>
            {isVkDonutBanner&&
                <Banner
                    before={
                        <div className={"icon__container"} style={{marginRight: 0}}>
                            <Icon28FavoriteOutline/>
                        </div>
                    }
                    header="У пользователя офрмлена подписка Vk Donut"
                    subheader="Оформи тоже для игры с комфортом"
                    asideMode="dismiss"
                    actions={<Button mode="primary">Подробнее</Button>}
                    onDismiss={() => setIsVkDonutBanner(false)}
                />
            }
            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Статистика
            </Title>
            <UserStat exp={0} games={0} loses={0} tickets={0} wins={0}/>
            <Title level="1" weight="semibold" style={{ marginLeft: 16, marginTop: 32 }} >
                Достижения
            </Title>
            <Div>
                <div style={{backgroundColor: "var(--content_tint_background)", borderRadius: 12}} >
                    <SimpleCell
                        disabled
                        description="Сыграть 1 игру"
                    >
                        Начинающий
                    </SimpleCell>
                    <SimpleCell
                        disabled
                        description="Сыграть 1 игру"
                    >
                        Начинающий
                    </SimpleCell>
                    <SimpleCell
                        disabled
                        description="Сыграть 1 игру"
                    >
                        Начинающий
                    </SimpleCell>
                </div>
            </Div>

        </Panel>
    )
};



export default UserProfile;