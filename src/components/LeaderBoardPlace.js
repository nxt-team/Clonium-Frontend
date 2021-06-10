import React from 'react';
import '../views/main/Top.css'

import { Icon201CircleFillGold, Icon202CircleFillSilver, Icon203CircleFillBronze} from '@vkontakte/icons';

import {
    Avatar,
    SimpleCell,
} from "@vkontakte/vkui";

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


const leaderBoardPlace = ({ place, avaUrl, userName, exp }) => {

    if (place === 1) {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <Icon201CircleFillGold style={numericIndicator} />
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    } else if (place === 2) {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <Icon202CircleFillSilver style={numericIndicator} />
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    } else if (place === 3) {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <Icon203CircleFillBronze style={numericIndicator} />
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    } else {
        return (
            <SimpleCell
                before={
                    <div className="avatar">
                        <Avatar size={48} src={avaUrl} className="avatar__photo" />
                        <div  className="avatar__indicator" >
                            <div style={numericIndicator}>{place}</div>
                        </div>
                    </div>
                }
                description={exp + " опыта"}
            >
                {userName}
            </SimpleCell>
        )
    }

};



export default leaderBoardPlace;