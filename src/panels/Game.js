import React, { useState, useEffect, useRef } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title';
import './game.css'
import { gsap } from "gsap";
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import { motion } from "framer-motion"
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import {IOS, platform, Caption} from "@vkontakte/vkui";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import startJson from "./test.json";
import PlayIcon from './playIcon'
import AnimatedPlayIcon from './animatedPlayIcon'
const osName = platform();
const cellSize = (window.innerWidth - 24 - 9) / 8
const cellStyle = {height: cellSize, width: cellSize}

const Game = ({id, go}) => {
	const [map, setMap] = useState(startJson);
	const [colorMotion, setColorMotion] = useState('голубого');
	const [update, setUpdate] = useState(0)
	console.log('changed')

	function changeColorMotion() {
		console.log('changeColorMotion')
		if (colorMotion === 'голубого') {
			setColorMotion('красного');
		} else if (colorMotion === 'красного') {
			setColorMotion('жёлтого');
		} else if (colorMotion === 'жёлтого') {
			setColorMotion('зелёного');
		} else {
			setColorMotion('голубого');
		}
	}

	function getCellContet(row, column) {
		if (map[row - 1][column - 1]['state'] === 'animate') {
			const svgSize = (window.innerWidth - 24 - 9) * 0.125
			console.log(svgSize)
			return (
				<>

					<AnimatedPlayIcon
						color={map[row - 1][column - 1]['color']}
						svgSize={svgSize}
						start={{
							scale: 1.3
						}}
						end={{
							rotationY: 360,
							x: svgSize + 1,
							duration: 1,
							scale: 1
						}}
						changed={true}
					/>
					<AnimatedPlayIcon
						color={map[row - 1][column - 1]['color']}
						svgSize={svgSize}
						start={{
							scale: 1.3
						}}
						end={{
							rotationX: -360,
							y: -svgSize - 1,
							duration: 1,
							scale: 1
						}}
						changed={true}
					/>
					<AnimatedPlayIcon
						color={map[row - 1][column - 1]['color']}
						svgSize={svgSize}
						start={{
							scale: 1.3
						}}
						end={{
							rotationY: -360,
							x: -svgSize - 1,
							duration: 1,
							scale: 1
						}}
						changed={true}
					/>
					<AnimatedPlayIcon
						color={map[row - 1][column - 1]['color']}
						svgSize={svgSize}
						start={{
							scale: 1.3
						}}
						end={{
							rotationX: 360,
							y: svgSize + 1,
							duration: 1,
							scale: 1
						}}
						changed={true}
					/>
				</>
			)
		} else if (map[row - 1][column - 1]['color'] !== null) {
			return <PlayIcon color={map[row - 1][column - 1]['color']} size={map[row - 1][column - 1]['state']} />
		}
	}

	function onCellClick(row, column) {
		if (0 < row < 9 && 0 < column < 9) {
			let newMap = map;
			console.log('clicked');
			if (map[row - 1][column - 1]['state'] === 1) {
				newMap[row - 1][column - 1]['state'] = 2;
				setMap(newMap);
				changeColorMotion();
			} else if (map[row - 1][column - 1]['state'] === 2) {
				newMap[row - 1][column - 1]['state'] = 3;
				setMap(newMap);
				changeColorMotion();
			} else if (map[row - 1][column - 1]['state'] === 3) {
				const color = newMap[row - 1][column - 1]['color'];
				newMap[row - 1][column - 1]['state'] = "animate";
				setMap(newMap)
				changeColorMotion()

				setTimeout(() => {
					newMap[row - 1][column - 1]['state'] = null;
					newMap[row - 1][column - 1]['color'] = null;

					try {
						newMap[row - 2][column - 1]['color'] = color;
						if (newMap[row - 2][column - 1]['state'] === null) {
							newMap[row - 2][column - 1]['state'] = 1;
						} else {
							onCellClick(row - 1, column);
						}
					} catch (err) {}

					try {
						newMap[row][column - 1]['color'] = color;

						if (newMap[row][column - 1]['state'] === null) {
							newMap[row][column - 1]['state'] = 1;
						} else {
							onCellClick(row + 1, column);
						}
					} catch (err) {}

					try {
						newMap[row - 1][column - 2]['color'] = color;

						if (newMap[row - 1][column - 2]['state'] === null) {
							newMap[row - 1][column - 2]['state'] = 1;
						} else {
							onCellClick(row, column - 1);
						}
					} catch (err) {}

					try {
						newMap[row - 1][column]['color'] = color;

						if (newMap[row - 1][column]['state'] === null) {
							newMap[row - 1][column]['state'] = 1;
						} else {
							onCellClick(row, column + 1);
						}
					} catch (err) {}

					setMap(newMap);
					console.log('changed2')
					console.log(map)
					setUpdate(update + 1)
					console.log(colorMotion)
				}, 1500)

			}
		}
	}

	function count(color) {
		let result = 0;
		for (let row of map) {
			for (let column of row) {
				if (column['color'] === color) {
					result += column['state'];
				}
			}
		}

		return result;
	}

	// const [counter, setCounter] = useState(15);
	// useEffect(() => {
	// 	counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	// }, [counter]);

	return (
		<Panel id={id}>
			<PanelHeader
				left={
					<PanelHeaderButton onClick={go}  data-to="home2">
						{osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
					</PanelHeaderButton>
				}
			>
				Бой id00124
			</PanelHeader>
			<div
				style={{
					marginTop: 20,
					marginBottom: 8,
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Title level="1" weight="semibold">
					{'Ход ' + colorMotion}
				</Title>
				<Title level="1" weight="bold" style={{ marginLeft: 12 }}>
					{
						//counter === 0 ? 'Time over' : counter
					}
					_
				</Title>
			</div>
			<div
				style={{
					padding: '12px 20px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Title level="2" weight="semibold">
					Очки:
				</Title>
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
						fill="#00D8FF"
						stroke="currentColor"
						stroke-width="2"
					/>
					<circle cx="19" cy="19" r="3" fill="#F5F5F5" />
				</svg>
				<div style={{ flexGrow: 1 }}>{count('blue')}</div>
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
						fill="#FFB327"
						stroke="currentColor"
						stroke-width="2"
					/>
					<circle cx="19" cy="19" r="3" fill="#F5F5F5" />
				</svg>
				<div style={{ flexGrow: 1 }}>{count('yellow')}</div>
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
						fill="#2EE367"
						stroke="currentColor"
						stroke-width="2"
					/>
					<circle cx="19" cy="19" r="3" fill="#F5F5F5" />
				</svg>
				<div style={{ flexGrow: 1 }}>{count('green')}</div>
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
						fill="#FF79CB"
						stroke="currentColor"
						stroke-width="2"
					/>
					<circle cx="19" cy="19" r="3" fill="#F5F5F5" />
				</svg>
				<div>{count('red')}</div>
			</div>

			<div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'}  onClick={() => onCellClick(1, 1)}>
						{getCellContet(1, 1)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 2)}>
						{getCellContet(1, 2)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 3)}>
						{getCellContet(1, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 4)}>
						{getCellContet(1, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 5)}>
						{getCellContet(1, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 6)}>
						{getCellContet(1, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 7)}>
						{getCellContet(1, 7)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(1, 8)}>
						{getCellContet(1, 8)}{' '}
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 1)}>
						{getCellContet(2, 1)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 2)}>
						{getCellContet(2, 2)}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 3)}>
						{getCellContet(2, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 4)}>
						{getCellContet(2, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 5)}>
						{getCellContet(2, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 6)}>
						{getCellContet(2, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 7)}>
						{getCellContet(2, 7)}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(2, 8)}>
						{getCellContet(2, 8)}{' '}
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 1)}>
						{getCellContet(3, 1)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 2)}>
						{getCellContet(3, 2)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 3)}>
						{getCellContet(3, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 4)}>
						{getCellContet(3, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 5)}>
						{getCellContet(3, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 6)}>
						{getCellContet(3, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 7)}>
						{getCellContet(3, 7)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(3, 8)}>
						{getCellContet(3, 8)}{' '}
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 1)}>
						{getCellContet(4, 1)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 2)}>
						{getCellContet(4, 2)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 3)}>
						{getCellContet(4, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 4)}>
						{getCellContet(4, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 5)}>
						{getCellContet(4, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 6)}>
						{getCellContet(4, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 7)}>
						{getCellContet(4, 7)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(4, 8)}>
						{getCellContet(4, 8)}{' '}
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 1)}>
						{getCellContet(5, 1)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 2)}>
						{getCellContet(5, 2)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 3)}>
						{getCellContet(5, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 4)}>
						{getCellContet(5, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 5)}>
						{getCellContet(5, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 6)}>
						{getCellContet(5, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 7)}>
						{getCellContet(5, 7)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(5, 8)}>
						{getCellContet(5, 8)}{' '}
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 1)}>
						{getCellContet(6, 1)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 2)}>
						{getCellContet(6, 2)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 3)}>
						{getCellContet(6, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 4)}>
						{getCellContet(6, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 5)}>
						{getCellContet(6, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 6)}>
						{getCellContet(6, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 7)}>
						{getCellContet(6, 7)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(6, 8)}>
						{getCellContet(6, 8)}{' '}
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 1)}>
						{getCellContet(7, 1)}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 2)}>
						{getCellContet(7, 2)}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 3)}>
						{getCellContet(7, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 4)}>
						{getCellContet(7, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 5)}>
						{getCellContet(7, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 6)}>
						{getCellContet(7, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 7)}>
						{getCellContet(7, 7)}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(7, 8)}>
						{getCellContet(7, 8)}{' '}
					</div>
				</div>
				<div style={{ display: 'flex' }}>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 1)}>
						{getCellContet(8, 1)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 2)}>
						{getCellContet(8, 2)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 3)}>
						{getCellContet(8, 3)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 4)}>
						{getCellContet(8, 4)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 5)}>
						{getCellContet(8, 5)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 6)}>
						{getCellContet(8, 6)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 7)}>
						{getCellContet(8, 7)}{' '}
					</div>
					<div style={cellStyle} className={'cell'} onClick={() => onCellClick(8, 8)}>
						{getCellContet(8, 8)}{' '}
					</div>
				</div>
			</div>

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
						До цонца боя:
					</Caption>
					<Caption level="2" style={{ marginLeft: 6}}>
						3 мин 10 сек
					</Caption>
				</div>
			</div>

			<div
				style={{
					marginTop: 12,
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Button mode="tertiary">Сдаться</Button>
			</div>
		</Panel>
	);
};

export default Game;

