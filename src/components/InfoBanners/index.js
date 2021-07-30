import React from 'react';
import './InfoBanners.css';
import {Text, CardScroll, Card, Caption, Link} from "@vkontakte/vkui";
import {
    Icon28RadiowavesAroundOutline,
    Icon28BombOutline,
    Icon28Users3Outline,
    Icon28InfoOutline,
    Icon28ChatsOutline,
    Icon28TicketOutline,
    Icon36GameOutline,
    Icon28ArrowUpOutline,
    Icon28ArrowDownOutline,
    Icon56DonateOutline
} from '@vkontakte/icons';
import { motion } from "framer-motion"
import Button from "@vkontakte/vkui/dist/components/Button/Button";

export default function InfoBanners(props) {
    const {
        publicUrl,
        chatUrl,
        startupParameters,
        changeActiveModal,
    } = props;

    return (
        <CardScroll>
            <Card  >
                <Link target="_blank" href="https://vk.com/@nxt.team-clonium" >
                    <div className="InfoBanner"  >
                        <div className="InfoBanner__Icon__Before__Green" >
                            <Icon28InfoOutline className="InfoBanner__Icon__Green" width={32} height={32}/>
                        </div>
                        <div className="InfoBanner__TextContainer" >
                            <Text weight="regular" >Справка</Text>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >об игре, правилах <br/> и нюансах</Caption>
                        </div>
                    </div>
                </Link>

            </Card>
            <Card  >
                <Link target="_blank" href="https://vk.com/pipeweb" >
                <div className="InfoBanner" >
                    <div className="InfoBanner__Icon__Before__Blue" >
                        <Icon28Users3Outline className="InfoBanner__Icon__Blue" width={32} height={32}/>
                    </div>
                    <div className="InfoBanner__TextContainer" >
                        <Text weight="regular" >Сообщество</Text>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >будь в курсе <br/> новостей</Caption>
                    </div>
                </div>
                </Link>
            </Card>
            <Card  >
                <Link target="_blank"
                      // href="https://vk.me/join/zJ8DxkYAjOlAxQX/y74M/HYEjtfHxOWCMIM="
                >
                <div className="InfoBanner" >
                    <div className="InfoBanner__Icon__Before__Red" >
                        <Icon28ChatsOutline className="InfoBanner__Icon__Red" width={32} height={32}/>
                    </div>
                    <div className="InfoBanner__TextContainer" >
                        <Text weight="regular" >Беседа</Text>
                        <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >общение с другими <br/> игроками</Caption>
                    </div>
                </div>
                </Link>
            </Card>
            {(startupParameters.get('vk_platform') === "mobile_web" || startupParameters.get('vk_platform') === "desktop_web" || startupParameters.get('vk_platform') === "mobile_android") &&
                <Card onClick={() => changeActiveModal("aboutVkDonut")} >
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
            }
        </CardScroll>
    )
}