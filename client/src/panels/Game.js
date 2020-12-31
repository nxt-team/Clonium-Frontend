import React, { useState, useEffect } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import './game.css'
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import { motion } from "framer-motion"
const Game = ({ id, go, fetchedUser }) => {

	const [x, setX] = useState(0);

	const changeX = () => {
		if (x === 0) {
			setX(200)
		} else {
			setX(0)
		}
	}

	return (
	<Panel id={id}>
		<PanelHeader>Example</PanelHeader>
		<Div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}

				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
					<svg className="cont" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="19" cy="19" r="18" fill="#00D8FF" stroke="white" stroke-width="2"/>
						<circle cx="19" cy="19" r="3" fill="#F5F5F5"/>
					</svg>

				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
			<div
				style={{display: "flex"}}
			>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>
				<div
					className={'cell'}
				>
				</div>

			</div>
		</Div>
	</Panel>
	)
};



export default Game;
