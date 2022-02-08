import React from 'react';
import './gameScore.css';
import {Progress} from "@vkontakte/vkui";

const colorsPalette = {
    red: "#FF79CB",
    blue: "#00D8FF",
    green: "#2EE367",
    yellow: "#FFB327"
}

export default function GameScore({count, colors}) {


    if (colors.length !== 2) {
        let content = []

        for (let i = 0; i < colors.length; i++) {
            content.push(
                <>
                    <svg
                        style={{ flexGrow: 1 }}
                        width="22"
                        height="22"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="19"
                            cy="19"
                            r="18"
                            fill={colorsPalette[colors[i]]}
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle cx="19" cy="19" r="3" fill="#F5F5F5" />
                    </svg>
                    <div style={{ flexGrow: i === colors.length ? 1 : 0.5 }} >{count(colors[i])}</div>
                </>
            )
        }

        return (
            <div className={'gameScore_container'} >
                {content}
            </div>
        )
    }


    const value = count(colors[0]) / (count(colors[0]) + count(colors[1])) * 100

    return (
        <div className={'gameScore_container'} style={{display: "block", padding: "12px 8px"}} >
            <Progress value={value} id={"fight_progress"} className={colors[0] + "_progress"} style={{backgroundColor: colorsPalette[colors[1]]}}/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{marginLeft: 4}}>
                    {count(colors[0])}
                </div>
                <div style={{marginRight: 4}} >
                    {count(colors[1])}
                </div>
            </div>
        </div>
    )

}