import {Avatar, SimpleCell} from "@vkontakte/vkui";
import React from "react";
import '../views/main/Top.css'

const GlobalLeaderBoardPlace = ({ place, avaUrl, userName, exp, rank }) => {

    return (
        <SimpleCell
            before={
                <div className="GlobalPlace__container" >
                    <div className="GlobalPlace__indicator">
                        {place}
                    </div>
                    <Avatar size={48} src={avaUrl} className="GlobalPlace__avatar" />
                </div>
            }
            description={rank + ", " + exp + " опыта"}
        >
            {userName}
        </SimpleCell>
    )

};

export default GlobalLeaderBoardPlace;