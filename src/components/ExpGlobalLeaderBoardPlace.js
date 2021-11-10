import {Avatar, SimpleCell} from "@vkontakte/vkui";
import React from "react";
import '../views/main/Top.css'
import {Icon20DonateCircleFillYellow, Icon28DonateCircleFillYellow} from '@vkontakte/icons';
import {Icon201CircleFillGold, Icon202CircleFillSilver, Icon203CircleFillBronze} from "@vkontakte/icons";
import ImgPlayIcon from "./ImgPlayIcon";
import PlayIcon from "./playIcon";

const numericIndicator = {
    height: 20,
    width: 20,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
}

const ExpGlobalLeaderBoardPlace = ({ place, avaUrl, userName, exp, rank, illumination, onClick, piece_avatar }) => {

    function getAvatar () {
        if (piece_avatar.length > 1) {
            return (
                <div style={{width: 32, height: 32}} >
                    <ImgPlayIcon imgLink={piece_avatar} color={"red"} size={3} />
                </div>
            )
        }
    }
    switch (place) {
        case 1:
            place = <Icon201CircleFillGold  />
            break
        case 2:
            place = <Icon202CircleFillSilver/>
            break
        case 3:
            place = <Icon203CircleFillBronze/>
            break
    }

    let style = {cursor: "pointer"}
    if (illumination) {
        style = {cursor: "pointer", background: "var(--background_light)"}
    }

    return (
        <SimpleCell
            onClick={onClick}
            style={style}
            before={
                <div className="GlobalPlace__container" >
                    <div className="GlobalPlace__indicator">
                        {place}
                    </div>
                    <Avatar size={48} src={avaUrl} className="GlobalPlace__avatar" />
                </div>
            }
            description={rank + " • " + exp + " опыта"}
            after={getAvatar()}
        >
            <span dangerouslySetInnerHTML={{__html: userName}}/>
        </SimpleCell>
    )

};

export default ExpGlobalLeaderBoardPlace;