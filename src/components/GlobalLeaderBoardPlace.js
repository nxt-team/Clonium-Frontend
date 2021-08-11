import {Avatar, SimpleCell} from "@vkontakte/vkui";
import React from "react";
import '../views/main/Top.css'
import {Icon20DonateCircleFillYellow, Icon28DonateCircleFillYellow} from '@vkontakte/icons';
import {Icon201CircleFillGold, Icon202CircleFillSilver, Icon203CircleFillBronze} from "@vkontakte/icons";

const numericIndicator = {
    height: 20,
    width: 20,
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: 13,
    boxShadow: '0 4px 24px 0 rgb(0 0 0 / 8%), 0 0 12px 0 rgb(0 0 0 / 8%)',
}

const GlobalLeaderBoardPlace = ({ place, avaUrl, userName, exp, rank, vkDonut, onClick }) => {

    if (vkDonut === 1) {
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
                                <Icon20DonateCircleFillYellow style={numericIndicator} />
                            </div>
                        </div>
                    </div>
                }
                description={rank + ", " + exp + " опыта"}
            >
                <span dangerouslySetInnerHTML={{__html: userName}}/>
            </SimpleCell>
        )
    } else if (vkDonut === 2) {
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
                                <svg style={numericIndicator} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 14C0 6.268 6.268 0 14 0C21.732 0 28 6.268 28 14C28 21.732 21.732 28 14 28C6.268 28 0 21.732 0 14Z" fill="url(#paint_linear)"/>
                                    <path d="M11.3325 21.1202L9.16742 19.8702" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.8877 6.48039C16.0084 6.76786 9.3357 8.39974 9.33491 17.0801L13.665 19.5801C21.1013 15.1987 19.2403 8.64157 18.5652 6.87447C18.5144 6.74122 18.4194 6.62943 18.2961 6.55772C18.1728 6.48601 18.0287 6.45872 17.8877 6.48039V6.48039Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10.9874 10.7596L7.39676 12.0803C7.30707 12.1133 7.22614 12.1664 7.1602 12.2356C7.09425 12.3047 7.04504 12.3881 7.01635 12.4792L5.67963 16.7262C5.64777 16.8274 5.64221 16.9351 5.66348 17.0391C5.68475 17.1431 5.73215 17.2399 5.80121 17.3205C5.87027 17.4011 5.95872 17.4628 6.05822 17.4998C6.15771 17.5367 6.26498 17.5477 6.3699 17.5317L9.3349 17.0801" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18.3 14.9164L18.9641 18.7587C18.9804 18.8529 18.9748 18.9495 18.9479 19.0412C18.921 19.1329 18.8734 19.2172 18.8088 19.2876L15.7992 22.5687C15.7275 22.647 15.637 22.7056 15.5363 22.7392C15.4356 22.7727 15.328 22.7801 15.2237 22.7606C15.1194 22.7411 15.0217 22.6953 14.94 22.6276C14.8583 22.56 14.7951 22.4726 14.7565 22.3737L13.665 19.5801" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15.6288 12.0537C15.508 12.2629 15.2405 12.3346 15.0312 12.2138C14.8219 12.093 14.7502 11.8254 14.8711 11.6162C14.9919 11.4069 15.2594 11.3352 15.4687 11.4561C15.678 11.5769 15.7496 11.8444 15.6288 12.0537Z" fill="white" stroke="white"/>
                                    <defs>
                                        <linearGradient id="paint_linear" x1="-14" y1="14" x2="14" y2="42" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#70B2FF"/>
                                            <stop offset="1" stop-color="#5C9CE6"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                }
                description={rank + ", " + exp + " опыта"}
            >
                <span dangerouslySetInnerHTML={{__html: userName}}/>
            </SimpleCell>
        )
    } else {
        return (
            <SimpleCell
                onClick={onClick}
                style={{cursor: "pointer"}}
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
                <span dangerouslySetInnerHTML={{__html: userName}}/>
            </SimpleCell>
        )
    }

};

export default GlobalLeaderBoardPlace;