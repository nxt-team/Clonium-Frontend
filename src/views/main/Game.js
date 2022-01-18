import React, { useState, useEffect } from 'react';
import './game.css'
import {PanelHeader, Button, Caption, Title, Panel, WriteBar, WriteBarIcon} from "@vkontakte/vkui";
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
import CrossSize9 from "../../maps/CrossSize9/map.json";
import WhirlSize10 from "../../maps/WhirlSize10/map.json";
import {getFight} from "../../api/api";
import {clickMap, leaveFight, socket} from "../../api/socket";
import GlobalTimer from "../../components/GlobalTimer";
import BasicGetImgCellContent from "../../gameFunctions/BasicGetImgCellContent";
let userColor = ""
let colors = []

let isRecursion = false
let lastColorMotion = "red"
let turn_time = true // true - ограничено
let isGlobalTimer = false
let game_time = 0
let beatenPlayers = []
let serverColorMotion
let lastMotionCoords = [-1, -1]
let pieceAvatarsConfig = {
	"red": "",
	"blue": "",
	"green": "",
	"yellow": ""
}
let phraseColor

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
	} else if (mapName === 'CrossSize9') {
		return CrossSize9
	} else if (mapName === 'WhirlSize10') {
		return WhirlSize10
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

const Game = ({
				  id,
				  startupParameters,
				  screenSpinnerOff,
				  screenSpinnerOn,
				  mapName,
				  secretId,
				  fetchedUser,
				  goToEndFight,
				  finishData,
				  userBalances,
				  isVibration,
				  gameError,
				  startMap
}) => {
	const [map, setMap] = useState(startMap);
	const [colorMotion, setColorMotion] = useState("red");
	const [isAnimation, setIsAnimation] = useState(false)
	const [phrase, setPhrase] = useState(null)

	if (finishData.length !== 0 && !isAnimation) {
		game_time = 0
		goToEndFight(beatenPlayers)
		console.log("go to end fight")
		console.log(beatenPlayers)
	}

	// console.log(
	// 	" Color motion: " + colorMotion,
	// 	" Last color motion: " + lastColorMotion,
	// )

	useEffect(() => {
		console.log("CONNECTED COORDS")
		socket.off("cords")
		socket.off("leave")
		socket.off("kick")

		socket.on("cords", (data) => {
			console.log("cords " + data)

			console.log(
				" Color motion: " + colorMotion
			)

			serverColorMotion = data[2]

			let flag = false
			if (map[data[0] - 1][data[1] - 1]['state'] !== 3) {
				flag = true
			}

			changeLastMotionCoords(data[0], data[1])
			onCellClick(data[0], data[1])
			changeColorMotion(lastColorMotion, true)
			if (flag) {
				console.log(lastColorMotion, serverColorMotion, " проверка на ео")
				if (serverColorMotion && lastColorMotion !== serverColorMotion) {
					console.log("ERROR ERROR ЕО ", serverColorMotion, lastColorMotion)
					gameError()
				}
			}

		});

		socket.on("leave", (color) => {
			console.log("LEAVE", color)

			beatenPlayers.push(color)

			let newMap = map.slice()
			map.forEach(function(row, rowIndex, array) {
				row.forEach(function(cell, cellIndex, array) {
					if (cell['color'] === color) {
						newMap[rowIndex][cellIndex]['color'] = null
						newMap[rowIndex][cellIndex]['state'] = null
					}
				});
			});

			
			setMap(newMap)
			if (lastColorMotion === color) {
				changeColorMotion(lastColorMotion, false)
			} else {
				const colorIndex = colors.indexOf(color)
				colors.splice(colorIndex, 1)
			}

		})

		socket.on("kick", (color) => {
			console.log("KICK", color)

			if (color !== lastColorMotion) {
				console.log("ОШИБКА", color, lastColorMotion)
				gameError()
			}
			beatenPlayers.push(lastColorMotion)

			let newMap = map.slice()
			map.forEach(function(row, rowIndex, array) {
				row.forEach(function(cell, cellIndex, array) {
					if (cell['color'] === color) {
						newMap[rowIndex][cellIndex]['color'] = null
						newMap[rowIndex][cellIndex]['state'] = null
					}
				});
			});
			changeColorMotion(lastColorMotion, false)
			setMap(newMap)

		})
	}, [])

	useEffect(() => {
		async function getFightInfo () {
			screenSpinnerOn()
			beatenPlayers = []
			lastMotionCoords = [-1, -1]
			lastColorMotion = "red"
			serverColorMotion = "red"
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
				pieceAvatarsConfig[item["color"]] = item["piece_avatar"]
			})
			// setMap(getStartJson(mapName))
			// setColorMotion(colors[0])
			colors = ["red", "blue", "green", "yellow"]
			colors = colors.splice(0, fight.max_user_number)
			console.log(fight.max_user_number)
			console.log(userColor, colors)
			console.log(fight["map"])
			console.log("GET GAME TIME ", game_time)
			screenSpinnerOff()
		}
		getFightInfo()
	},[])

	function changeLastMotionCoords (row, column) {
		if (userBalances["vk_donut"] !== 0) {
			if (map[row - 1][column - 1]['state'] === 3) {
				lastMotionCoords = [-1, -1]
			} else {
				lastMotionCoords = [row, column]
			}
		}
	}

	function changeColorMotion (color, isUserChange) {

		if (isUserChange) {
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
		} else { // то есть цвет меняем при кике или при ливе. причем colorMotion === kickedUserColor
			const colorMotionIndex = colors.indexOf(color)
			colors.splice(colorMotionIndex, 1) // удаляем кикнутого игрока
			if (colorMotionIndex < colors.length) { // то цвет переходит следующему игроку после удаленного
				lastColorMotion = colors[colorMotionIndex]
				setColorMotion(colors[colorMotionIndex])
			} else { // удаленный игрок был последним в массиве colors. цвет переходит перому
				lastColorMotion = colors[0]
				setColorMotion(colors[0])
			}
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

					if (lastColorMotion === item) {
						changeColorMotion(lastColorMotion, false)
					} else {
						const colorIndex = colors.indexOf(item)
						colors.splice(colorIndex, 1)
					}
				}
			})
			setIsAnimation(false)
			console.log(lastColorMotion, serverColorMotion, " ПРОВЕРКА НА ЕО")
			if (serverColorMotion && lastColorMotion !== serverColorMotion) {
				console.log("ERROR ERROR ЕО ", serverColorMotion, lastColorMotion)
				gameError()
			}
		}

		console.log("FLag: " + flag)
	}

	function getCellContent (row, column) {
		if (pieceAvatarsConfig[map[row - 1][column - 1]['color']] === "0" || map[row - 1][column - 1]['color'] === "dead") {
			return BasicGetCellContent({row, column, map})
		} else {
			return BasicGetImgCellContent({row, column, map, pieceAvatarsConfig})
		}
	}

	function onCellClick(row, column) {
		console.log(
			"onCellClick " + row, column)

		// if ( map[row - 1][column - 1]['color'] === colorMotion) { //  && colorMotion === userColor
		// 	console.log("making onCellClick")
		if (map[row - 1][column - 1]['state'] === 3) {
			isRecursion = true
			setIsAnimation(true)
		}
		basicOnCellClick(row, column, map, startupParameters, setMap, onCellClick, findAnimateIcons, isVibration)
	}

	function onCellClickFromUser (row, column) {
		console.log("click from user \n", "is animation: ", isAnimation)
		if (!isAnimation && map[row - 1][column - 1]['color'] === colorMotion && colorMotion === userColor ) {
			serverColorMotion = ""
			changeLastMotionCoords(row, column)
			onCellClick(row, column)
			clickMap(secretId, fetchedUser, row, column)
			changeColorMotion(lastColorMotion, true)
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
		console.log('нужно кинкнуть ' + colorMotion)
		// if (!isAnimation) {
		// 	console.log('нужно кинкнуть ' + colorMotion)
		// 	if (colorMotion !== userColor) {
		// 		beatenPlayers.push(colorMotion)
		// 	}
		// 	let newMap = map.slice()
		// 	map.forEach(function(row, rowIndex, array) {
		// 		row.forEach(function(cell, cellIndex, array) {
		// 			if (cell['color'] === colorMotion) {
		// 				newMap[rowIndex][cellIndex]['color'] = null
		// 				newMap[rowIndex][cellIndex]['state'] = null
		// 			}
		// 		});
		// 	});
		//
		// 	kickUserSend(colorMotion, secretId)
		//
		// 	changeColorMotion(lastColorMotion, false)
		// 	setMap(newMap)
		// }
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
						<Timer onExpiration={() => kickUser()} colorMotion={colorMotion} startCount={15} />
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

	// function doPhrase (text) {
	// 	if (!phrase) {
	// 		// sendPhrase(id)
	// 		console.log(text)
	// 		phraseColor = userColor
	// 		setPhrase(text)
	// 		setTimeout(() => setPhrase(null), 3000)
	// 	}
	// }

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
			{/*<Phrase map={map} color={phraseColor} text={phrase} />*/}
			{map.length &&
				<>
					{getMapInfo()}

					<GameScore count={count} colors={colors} />
					<GetMap onCellClickFromUser={onCellClickFromUser} lastMotionCoords={lastMotionCoords} getCellContent={getCellContent} map={map} colorMotion={colorMotion} mapName={mapName}/>

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
						<GlobalTimer time={game_time} />
					</div>
					}
					</div>

				{/*<PhraseButtons doPhrase={doPhrase} />*/}

					<div
					style={{
					marginTop: 12,
					marginBottom: 24,
					display: 'flex',
					justifyContent: 'center',
				}}
					>
					<Button onClick={() => leaveFight(fetchedUser)} mode="tertiary">Сдаться</Button>
					</div>
				</>
			}

		</Panel>
	);
};

export default Game;

