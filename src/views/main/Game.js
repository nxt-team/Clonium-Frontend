import React, { useState, useEffect, useRef } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { Icon28ErrorOutline } from '@vkontakte/icons';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './game.css'
import {IOS, platform, Caption, Separator, SimpleCell, WriteBar, WriteBarIcon} from "@vkontakte/vkui";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import { Icon28MessagesOutline } from '@vkontakte/icons';
import BasicGetCellContent from "../../gameFunctions/BasicGetCellContent";
import basicOnCellClick from "../../gameFunctions/BasicOnCellClick";
import GameScore from "../../components/GameScore";
import GetMap from "../../gameFunctions/GetMap";
import Timer from "../../components/Timer";
import GridSize8 from '../../maps/GridSize8'
import GridSize8Map from "../../maps/GridSize8/map.json"
const userColor = "blue"
const colors = ["red", "blue", "green", "yellow"]

let isRecursion = false

function getStartJson(mapName) {
	if (mapName === "GridSize8") {
		return GridSize8Map
	}
}

const Game = ({id, startupParameters, changeActiveModal, goToEndFight, mapName}) => {
	const [map, setMap] = useState(getStartJson(mapName));
	const [colorMotion, setColorMotion] = useState("red");
	const [isAnimation, setIsAnimation] = useState(false);
	console.log('rendered')

	useEffect(() => {

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
		console.log(newMap)
		setMap(newMap)
	}, [])

	function changeColorMotion () {
		if (colors.indexOf(colorMotion) + 1 === colors.length) {
			setColorMotion(colors[0])
		} else {
			setColorMotion(colors[colors.indexOf(colorMotion) + 1])
		}
	}

	function findAnimateIcons () {
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
			changeColorMotion()
			setIsAnimation(false)
		}

		// TODO: здесб же сделать функцию, которая проверяет, не сажрали кого. Перебирает массив колорс и чекает наличие фишек для каждого цвета
	}

	function getCellContent (row, column) {
		return BasicGetCellContent({row, column, map})
	}

	function onCellClick(row, column) {
		console.log(map)

		if ( map[row - 1][column - 1]['color'] === colorMotion) {
			if (map[row - 1][column - 1]['state'] === 3) {
				isRecursion = true
				setIsAnimation(true)
			}
			basicOnCellClick(row, column, map, startupParameters, setMap, onCellClick, findAnimateIcons)
			if (!isAnimation) {
				changeColorMotion()
			}
		}
	}

	function onCellClickFromUser (row, column) {
		if (!isAnimation) {
			onCellClick(row, column)
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
			let newMap = map.slice()
			map.forEach(function(row, rowIndex, array) {
				row.forEach(function(cell, cellIndex, array) {
					if (cell['color'] === colorMotion) {
						newMap[rowIndex][cellIndex]['color'] = null
						newMap[rowIndex][cellIndex]['state'] = null
					}
				});
			});
			const colorMotionIndex = colors.indexOf(colorMotion)
			colors.splice(colorMotionIndex, 1)
			setMap(newMap)
			setColorMotion(colors[colorMotionIndex])
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
					<Timer onExpiration={() => kickUser()} colorMotion={colorMotion} />
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
				left={<PanelHeaderButton onClick={() => changeActiveModal('messanger')}>
					<Icon28MessagesOutline/>
				</PanelHeaderButton>}
			>
			</PanelHeader>

			{getMapInfo()}

			<GameScore count={count}/>
			{/*<GetMap onCellClick={onCellClick} getCellContent={getCellContent} mapName={mapName}/>*/}
			<GridSize8 onCellClick={onCellClickFromUser} getCellContent={getCellContent} map={map} colorMotion={colorMotion}/>

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
					<Caption level="2" style={{ marginLeft: 6, color: '#00D8FF' }}>
						голубой
					</Caption>
				</div>
				<div style={{backgroundColor: "var(--content_tint_background)", padding: "8px 12px", marginLeft: 10, borderRadius: 10, display: "flex"}} >
					<Caption level="2" style={{ color: "var(--text_secondary)"}} weight="regular">
						До конца боя:
					</Caption>
					<Caption level="2" style={{ marginLeft: 6}}>
						3:10
					</Caption>
				</div>
			</div>

			<div
				style={{
					marginTop: 12,
					marginBottom: 24,
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Button onClick={goToEndFight}  data-to="home" mode="tertiary">Сдаться</Button>
			</div>
		</Panel>
	);
};

export default Game;

