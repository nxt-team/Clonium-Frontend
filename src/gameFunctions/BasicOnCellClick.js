import React from 'react';
import bridge from "@vkontakte/vk-bridge";
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const user_platform = startupParameters.get('vk_platform')
const mobile_platforms = ["mobile_android", "mobile_ipad", "mobile_iphone", "mobile_iphone_messenger"]

function callTapticEngine (isVibration) {
    if (mobile_platforms.indexOf(user_platform) !== -1 && isVibration) {
        bridge.send("VKWebAppTapticImpactOccurred", {"style": "light"});
    }
}

function callHeavyTapticEngine (isVibration) {
    if (mobile_platforms.indexOf(user_platform) !== -1 && isVibration) {
        bridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"});
    }
}

function basicOnCellClick(row, column, map, startupParameters, setMap, onCellClick, findAnimateIcons, isVibration) {
    console.log(map)
    const mapSize = map[0].length
    if (0 < row < mapSize && 0 < column < mapSize) {
        let newMap = map.slice();
        if (map[row - 1][column - 1]['state'] === 1) {
            callTapticEngine(isVibration)
            newMap[row - 1][column - 1]['state'] = 2;
            setMap(newMap);
        } else if (map[row - 1][column - 1]['state'] === 2) {
            callTapticEngine(isVibration)
            newMap[row - 1][column - 1]['state'] = 3;
            setMap(newMap);
        } else if (map[row - 1][column - 1]['state'] === 3) {
            const color = newMap[row - 1][column - 1]['color'];
            newMap[row - 1][column - 1]['state'] = "animate";
            setMap(newMap)
            callHeavyTapticEngine(isVibration)

            setTimeout(() => {
                newMap = map.slice()
                newMap[row - 1][column - 1]['state'] = null;
                newMap[row - 1][column - 1]['color'] = null;

                try {

                    if (newMap[row - 2][column - 1]['color'] === "disabled") {
                        throw new SyntaxError()
                    }

                    newMap[row - 2][column - 1]['color'] = color;
                    if (newMap[row - 2][column - 1]['state'] === null) {
                        newMap[row - 2][column - 1]['state'] = 1;
                    } else {
                        onCellClick(row - 1, column);
                    }
                } catch (err) {}

                try {

                    if (newMap[row][column - 1]['color'] === "disabled") {
                        throw new SyntaxError()
                    }

                    newMap[row][column - 1]['color'] = color;

                    if (newMap[row][column - 1]['state'] === null) {
                        newMap[row][column - 1]['state'] = 1;
                    } else {
                        onCellClick(row + 1, column);
                    }
                } catch (err) {}

                try {

                    if (newMap[row - 1][column - 2]['color'] === "disabled") {
                        throw new SyntaxError()
                    }

                    newMap[row - 1][column - 2]['color'] = color;

                    if (newMap[row - 1][column - 2]['state'] === null) {
                        newMap[row - 1][column - 2]['state'] = 1;
                    } else {
                        onCellClick(row, column - 1);
                    }
                } catch (err) {}

                try {

                    if (newMap[row - 1][column]['color'] === "disabled") {
                        throw new SyntaxError()
                    }

                    newMap[row - 1][column]['color'] = color;

                    if (newMap[row - 1][column]['state'] === null) {
                        newMap[row - 1][column]['state'] = 1;
                    } else {
                        onCellClick(row, column + 1);
                    }
                } catch (err) {}

                setMap(newMap);
                findAnimateIcons(row, column)
            }, 1500)

        }
    }
}

export default basicOnCellClick;