import {Avatar, SimpleCell} from "@vkontakte/vkui";
import React from "react";
import '../views/main/Top.css'
import {Icon20DonateCircleFillYellow, Icon28DonateCircleFillYellow} from '@vkontakte/icons';
import {Icon201CircleFillGold, Icon202CircleFillSilver, Icon203CircleFillBronze} from "@vkontakte/icons";
import ImgPlayIcon from "./ImgPlayIcon";
import PlayIcon from "./playIcon";
import TopDonutIcon from "./TopDonutIcon";

const numericIndicator = {
    height: 20,
    width: 20,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
}

const GlobalLeaderBoardPlace = ({ place, avaUrl, userName, rate, rank, vkDonut, onClick, piece_avatar }) => {

    function getAvatar () {
        if (piece_avatar.length > 1) {
            return (
                <div style={{width: 32, height: 32}} >
                    <ImgPlayIcon imgLink={piece_avatar} color={"red"} size={3} />
                </div>
            )
        }
    }

    return (
        <SimpleCell
            onClick={onClick}
            style={{cursor: "pointer"}}
            before={
                <div className="GlobalPlace__container" >
                    <div className="GlobalPlace__indicator">
                        {place}
                    </div>
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <TopDonutIcon vk_donut={vkDonut}/>
                        </div>
                    </div>
                </div>
            }
            description={rank + ", рейтинг " + rate}
            after={getAvatar()}
        >
            <span dangerouslySetInnerHTML={{__html: userName}}/>
        </SimpleCell>
    )


};

export default GlobalLeaderBoardPlace;