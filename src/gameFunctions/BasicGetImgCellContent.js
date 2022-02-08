import React from 'react';
import ImgAnimatedPlayIcon from "../components/ImgAnimatedPlayIcon";
import PlayIcon from "../components/playIcon";
import ImgPlayIcon from "../components/ImgPlayIcon";

export default function BasicGetImgCellContent({row, column, map, pieceAvatarsConfig}) {

    if (map[row - 1][column - 1]['state'] === 'animate') {
        const mapLen = map.length
        const svgSize = (Math.min(document.documentElement.clientWidth, 500) - 12 - mapLen * 2) / mapLen // число 16, т к у элементов задан margin 1px
        let animatedIcons = []
        if (map[row - 1][column] !== undefined && map[row - 1][column]["color"] !== "disabled") {
            animatedIcons.push(
                <ImgAnimatedPlayIcon
                    key={1}
                    imgLink={pieceAvatarsConfig[map[row - 1][column - 1]['color']]}
                    color={map[row - 1][column - 1]['color']}
                    svgSize={svgSize}
                    start={{
                        scale: 1.3
                    }}
                    end={{
                        rotationY: 360,
                        x: svgSize + 2,
                        duration: 1,
                        scale: 1
                    }}
                    changed={true}
                />
            )
        } if (map[row - 2] !== undefined && map[row - 2][column - 1]["color"] !== "disabled") {
            animatedIcons.push(
                <ImgAnimatedPlayIcon
                    key={2}
                    imgLink={pieceAvatarsConfig[map[row - 1][column - 1]['color']]}
                    color={map[row - 1][column - 1]['color']}
                    svgSize={svgSize}
                    start={{
                        scale: 1.3
                    }}
                    end={{
                        rotationX: -360,
                        y: -svgSize - 2,
                        duration: 1,
                        scale: 1
                    }}
                    changed={true}
                />
            )
        } if (map[row - 1][column - 2] !== undefined && map[row - 1][column - 2]["color"] !== "disabled") {
            animatedIcons.push(
                <ImgAnimatedPlayIcon
                    key={3}
                    imgLink={pieceAvatarsConfig[map[row - 1][column - 1]['color']]}
                    color={map[row - 1][column - 1]['color']}
                    svgSize={svgSize}
                    start={{
                        scale: 1.3
                    }}
                    end={{
                        rotationY: -360,
                        x: -svgSize - 2,
                        duration: 1,
                        scale: 1
                    }}
                    changed={true}
                />
            )
        } if (map[row] !== undefined && map[row][column - 1]["color"] !== "disabled") {
            animatedIcons.push(
                <ImgAnimatedPlayIcon
                    key={4}
                    imgLink={pieceAvatarsConfig[map[row - 1][column - 1]['color']]}
                    color={map[row - 1][column - 1]['color']}
                    svgSize={svgSize}
                    start={{
                        scale: 1.3
                    }}
                    end={{
                        rotationX: 360,
                        y: svgSize + 2,
                        duration: 1,
                        scale: 1
                    }}
                    changed={true}
                />
            )
        }
        return animatedIcons
    } else if (map[row - 1][column - 1]['state'] !== null) {
        return <ImgPlayIcon color={map[row - 1][column - 1]['color']} size={map[row - 1][column - 1]['state']} imgLink={pieceAvatarsConfig[map[row - 1][column - 1]['color']]} />
    }
}