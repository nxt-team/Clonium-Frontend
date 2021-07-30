import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Icon28ErrorOutline } from '@vkontakte/icons';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './game.css'
import {IOS, platform, Caption, Separator, SimpleCell, WriteBar, WriteBarIcon} from "@vkontakte/vkui";
import BasicGetCellContent from "../../gameFunctions/BasicGetCellContent";
import basicOnCellClick from "../../gameFunctions/BasicOnCellClick";
import GameScore from "../../components/GameScore";
import GetMap from "../../gameFunctions/GetMap";
import Timer from "../../components/Timer";
import GridSize8Map from "../../maps/GridSize8/map.json"
import DonutSize6Map from "../../maps/DonutSize6/map.json";
import DonutSize8Map from "../../maps/DonutSize8/map.json";
import GridSize10Map from "../../maps/GridSize10/map.json";
import PassageSize10Map from "../../maps/PassageSize10/map.json";
import SquareSize6Map from "../../maps/SquareSize6/map.json";
import SquareSize8Map from "../../maps/SquareSize8/map.json";
import {getFight} from "../../api/api";
import {clickMap, kickUserSend, leaveFight, socket} from "../../api/socket";
import GlobalTimer from "../../components/GlobalTimer";
let userColor = ""
let colors

let isRecursion = false
let lastColorMotion
let turn_time = true // true - ограничено
let isGlobalTimer = false
let game_time = 0
let beatenPlayers = []

function getStartJson(mapName) {
	if (mapName === "GridSize8") {
		return GridSize8Map
	} else if (mapName === 'DonutSize6') {
		return DonutSize6Map
	} else if (mapName === 'DonutSize8') {
		return DonutSize8Map
	} else if (mapName === 'GridSize8') {
		return GridSize8Map
	} else if (mapName === 'GridSize10') {
		return GridSize10Map
	} else if (mapName === 'PassageSize10') {
		return PassageSize10Map
	} else if (mapName === 'SquareSize6') {
		return SquareSize6Map
	} else if (mapName === 'SquareSize8') {
		return SquareSize8Map
	}
}

function getColorInfo (color) {
	if (color === "blue") {
		return (
			<Caption level="2" style={{ marginLeft: 6, color: '#00D8FF' }}>
				синий
			</Caption>
		)
	} else if (color === "red") {
		return (
			<Caption level="2" style={{ marginLeft: 6, color: '#FF79CB' }}>
				красный
			</Caption>
		)
	} else if (color === "green") {
		return (
			<Caption level="2" style={{ marginLeft: 6, color: '#2EE367' }}>
				зелёный
			</Caption>
		)
	} else if (color === "yellow") {
		return (
			<Caption level="2" style={{ marginLeft: 6, color: '#FFB327' }}>
				жёлтый
			</Caption>
		)
	}
}

const Game = ({id, startupParameters, changeActiveModal, goToMainViewHome, mapName, secretId, fetchedUser, goToEndFight, finishData}) => {
	const [map, setMap] = useState(getStartJson(mapName).slice());
	const [colorMotion, setColorMotion] = useState("red");
	const [isAnimation, setIsAnimation] = useState(false)

	if (finishData.length !== 0 && !isAnimation) {
		goToEndFight(beatenPlayers)
		console.log("go to end fight")
		console.log(beatenPlayers)
	}

	console.log(
		" Color motion: " + colorMotion,
		" Last color motion: " + lastColorMotion,
	)

	useEffect(() => {
		console.log("CONNECTED COORDS")
		socket.off("cords")

		socket.on("cords", (data) => {
			console.log("cords " + data)

			console.log(
				" Color motion: " + colorMotion
			)
			onCellClick(data[0], data[1])
			changeColorMotion(lastColorMotion, ("line 103 " + data))

		});
	}, [])

	useEffect(() => {
		async function getFightInfo () {
			beatenPlayers = []
			const fight = await getFight(secretId)
			turn_time = fight["turn_time"]
			if (fight["game_time"] === -1) {
				isGlobalTimer = false
			} else {
				isGlobalTimer = true
				game_time = fight["game_time"]
			}
			fight.users.forEach((item, i) => {
				if (item.vk_id === fetchedUser.id) {
					userColor = item.color
				}
			})
			setMap(getStartJson(mapName))
			// setColorMotion(colors[0])
			lastColorMotion = "red"
			colors = ["red", "blue", "green", "yellow"]
			colors = colors.splice(0, fight.max_user_number)
			console.log(fight.max_user_number)
			console.log(userColor, colors)
			let newMap = map.slice();
			const len = map.length
			if (colors.length === 2) {
				newMap[1][1]['color'] = "red"
				newMap[1][1]['state'] = 3
				newMap[len - 2][len - 2]['color'] = "blue"
				newMap[len - 2][len - 2]['state'] = 3
			} else if (colors.length === 3) {
				newMap[1][1]['color'] = "red"
				newMap[1][1]['state'] = 3
				newMap[len - 2][len - 2]['color'] = "blue"
				newMap[len - 2][len - 2]['state'] = 3
				newMap[1][len - 2]['color'] = "green"
				newMap[1][len - 2]['state'] = 3
			} else if (colors.length === 4) {
				newMap[1][1]['color'] = "red"
				newMap[1][1]['state'] = 3
				newMap[len - 2][len - 2]['color'] = "blue"
				newMap[len - 2][len - 2]['state'] = 3
				newMap[1][len - 2]['color'] = "green"
				newMap[1][len - 2]['state'] = 3
				newMap[len - 2][1]['color'] = "yellow"
				newMap[len - 2][1]['state'] = 3
			}
			setMap(newMap)
		}
		getFightInfo()
	},[])

	function changeColorMotion (color, source) {

		const colorMotionIndex = colors.indexOf(color)
		console.log("colorMotionIndex", colorMotionIndex)
		if (colorMotionIndex + 2 > colors.length) {
			console.log("colorMotionIndex + 2 > color.length. ->", colors[0])
			lastColorMotion = colors[0]
			setColorMotion(colors[0])
		} else {
			console.log("colorMotionIndex + 2 <= color.length, ->", colors[colorMotionIndex + 1])
			lastColorMotion = colors[colorMotionIndex + 1]
			setColorMotion(colors[colorMotionIndex + 1])
		}
	}

	function findAnimateIcons (row, column) {
		let flag = false
		map.forEach(function(row, index, array) {
			row.forEach(function(cell, index, array) {
				if (cell['state'] === "animate") {
					flag = true
					return 1
				}
			});

			if (flag) {
				return 1
			}
		});

		if (!flag) {
			isRecursion = false
			// changeColorMotion(("line 181 " + row + " " + column))
			colors.forEach((item, i) => {
				if (count(item) === 0) {
					console.log("KILLED " + item)
					if (item !== userColor) {
						beatenPlayers.push(item)
					}
					const colorMotionIndex = colors.indexOf(item)
					colors.splice(colorMotionIndex, 1)
					console.log(colors)
					if (item === colorMotion) {
						console.log(lastColorMotion, colorMotion)
						changeColorMotion(lastColorMotion)
						console.log(lastColorMotion, colorMotion)
					}
				}
			})
			setIsAnimation(false)
		}

		console.log("FLag: " + flag)
	}

	function getCellContent (row, column) {
		return BasicGetCellContent({row, column, map})
	}

	function onCellClick(row, column) {
		console.log(
			"main on cell click" + row, column + " \n",
			" Color motion: " + colorMotion,
			"----------------------------"
		)

		// if ( map[row - 1][column - 1]['color'] === colorMotion) { //  && colorMotion === userColor
		// 	console.log("making onCellClick")
		if (map[row - 1][column - 1]['state'] === 3) {
			isRecursion = true
			setIsAnimation(true)
		}
		basicOnCellClick(row, column, map, startupParameters, setMap, onCellClick, findAnimateIcons)
		if (!isAnimation) {
			// changeColorMotion(("line 212 " + row + " " + column))

		}
		// }
	}

	function onCellClickFromUser (row, column) {
		console.log("click from user \n", "is animation: ", isAnimation)
		if (!isAnimation && map[row - 1][column - 1]['color'] === colorMotion && colorMotion === userColor ) {
			onCellClick(row, column)
			clickMap(secretId, fetchedUser, row, column)
			changeColorMotion(lastColorMotion, ("line 217 " + row + " " + column))
		}
	}

	function count(color) {
		let result = 0;
		for (let row of map) {
			for (let column of row) {
				if (column['color'] === color) {
					if (isNaN(column['state'])) {
						result += 4; // animate
					} else {
						result += column['state'] // число
					}

				}
			}
		}

		return result;
	}

	function translateColorMotion () {
		if (colorMotion === userColor) {
			return "Твой ход"
		} else if (colorMotion === 'red') {
			return "Ход красного"
		} else if (colorMotion === 'blue') {
			return "Ход синего"
		} else if (colorMotion === 'green') {
			return "Ход зелёного"
		} else if (colorMotion === 'yellow') {
			return "Ход жёлтого"
		}
	}

	function kickUser () {
		if (!isAnimation) {
			console.log('нужно кинкнуть ' + colorMotion)
			if (colorMotion !== userColor) {
				beatenPlayers.push(colorMotion)
			}
			let newMap = map.slice()
			map.forEach(function(row, rowIndex, array) {
				row.forEach(function(cell, cellIndex, array) {
					if (cell['color'] === colorMotion) {
						newMap[rowIndex][cellIndex]['color'] = null
						newMap[rowIndex][cellIndex]['state'] = null
					}
				});
			});

			kickUserSend(colorMotion, secretId)

			const colorMotionIndex = colors.indexOf(colorMotion)
			colors.splice(colorMotionIndex, 1)
			setMap(newMap)
			changeColorMotion(lastColorMotion, "kik user")
		}
	}

	function getMapInfo () {
		if (!isRecursion) {
			return (
				<div
					style={{
						marginBottom: 8,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Title level="1" weight="semibold">
						{translateColorMotion()}
					</Title>
					{turn_time&&
						<Timer onExpiration={() => kickUser()} colorMotion={colorMotion} />
					}
				</div>
			)
		} else {
			return (
				<div
					style={{
						marginBottom: 8,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Title level="1" weight="semibold">
						Анимация
					</Title>
				</div>
			)
		}
	}

	return (
		<Panel id={id}>
			<PanelHeader
				separator={false}
				transparent={true}
				// left={<PanelHeaderButton onClick={() => changeActiveModal('messanger')}>
				// 	<Icon28MessagesOutline/>
				// </PanelHeaderButton>}
			>
			</PanelHeader>

			{getMapInfo()}

			<GameScore count={count} />
			<GetMap onCellClickFromUser={onCellClickFromUser} getCellContent={getCellContent} map={map} colorMotion={colorMotion} mapName={mapName}/>

			<div
				style={{
					marginBottom: 0,
					display: 'flex',
					justifyContent: 'center',
					padding: 12,
				}}
			>
				<div style={{backgroundColor: "var(--content_tint_background)", padding: "8px 12px", borderRadius: 10, display: "flex"}} >
					<Caption level="2" style={{ color: "var(--text_secondary)"}} weight="regular">
						Твой цвет:
					</Caption>
					{getColorInfo(userColor)}
				</div>
				{isGlobalTimer &&
					<div style={{
						backgroundColor: "var(--content_tint_background)",
						padding: "8px 12px",
						marginLeft: 10,
						borderRadius: 10,
						display: "flex"
					}}>
						<Caption level="2" style={{color: "var(--text_secondary)"}} weight="regular">
							До конца боя:
						</Caption>
						<GlobalTimer gameTime={game_time}/>
					</div>
				}
			</div>

			<div
				style={{
					marginTop: 12,
					marginBottom: 24,
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Button onClick={() => {leaveFight(fetchedUser); setTimeout(() => goToMainViewHome(), 300)}} mode="tertiary">Сдаться</Button>
			</div>
		</Panel>
	);
};

export default Game;

