import React from 'react';
import AnimatedPlayIcon from "../components/animatedPlayIcon";
import PlayIcon from "../components/playIcon";

export default function BasicGetCellContent({row, column, map}) {

    if (map[row - 1][column - 1]['state'] === 'animate') {
        const mapLen = map.length
        const svgSize = (document.documentElement.clientWidth - 12 - mapLen * 2) / mapLen // число 16, т к у элементов задан margin 1px
        let animatedIcons = []
        if (map[row - 1][column] !== undefined && map[row - 1][column]["color"] !== "disabled") {
            animatedIcons.push(
                <AnimatedPlayIcon
                    key={1}
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
                <AnimatedPlayIcon
                    key={2}
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
                <AnimatedPlayIcon
                    key={3}
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
                <AnimatedPlayIcon
                    key={4}
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
        return <PlayIcon color={map[row - 1][column - 1]['color']} size={map[row - 1][column - 1]['state']} />
    }
}