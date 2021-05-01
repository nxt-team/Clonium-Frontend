import React from 'react';
import './InfoBanners.css';
import {Div, Button, Card, Caption} from "@vkontakte/vkui";
import {
    Icon28RadiowavesAroundOutline,
    Icon28BombOutline,
    Icon28Users3Outline,
    Icon28InfoOutline,
    Icon28ChatsOutline, Icon28TicketOutline, Icon36GameOutline, Icon28ArrowUpOutline, Icon28ArrowDownOutline
} from '@vkontakte/icons';
import {CardScroll, Text} from "@gmelum/vkui";
import { motion } from "framer-motion"

export default function InfoBanners(props) {
    const {
        publicUrl,
        chatUrl,
        referenceUrl,
        changeActiveModal,
    } = props;

    return (
        <CardScroll>
            <Card >
                <div className="InfoBanner" >
                    <div className="InfoBanner__Icon__Before__Green" >
                        <Icon28InfoOutline className="InfoBanner__Icon__Green" width={32} height={32}/>
                    </div>
                    <div className="InfoBanner__TextContainer" >
                        <Text weight="regular" >Справка</Text>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >об игре, правилах <br/> и нюансах</Caption>
                    </div>
                </div>
            </Card>
            <Card >
                <div className="InfoBanner" >
                    <div className="InfoBanner__Icon__Before__Blue" >
                        <Icon28Users3Outline className="InfoBanner__Icon__Blue" width={32} height={32}/>
                    </div>
                    <div className="InfoBanner__TextContainer" >
                        <Text weight="regular" >Сообщество</Text>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >будь в курсе <br/> новостей</Caption>
                    </div>
                </div>
            </Card>
            <Card >
                <div className="InfoBanner" >
                    <div className="InfoBanner__Icon__Before__Red" >
                        <Icon28ChatsOutline className="InfoBanner__Icon__Red" width={32} height={32}/>
                    </div>
                    <div className="InfoBanner__TextContainer" >
                        <Text weight="regular" >Беседа</Text>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >общение с другими <br/> игроками</Caption>
                    </div>
                </div>
            </Card>
            <Card >
                <div className="InfoBanner" >
                    <div className="InfoBanner__Icon__Before__Orange" >
                        <Icon28BombOutline className="InfoBanner__Icon__Orange" width={32} height={32}/>
                    </div>
                    <div className="InfoBanner__TextContainer" >
                        <Text weight="regular" >Подписка</Text>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >специальные <br/> возможнсоти</Caption>
                    </div>
                </div>
            </Card>
        </CardScroll>
    )
}