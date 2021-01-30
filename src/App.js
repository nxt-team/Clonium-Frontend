import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import FormLayoutGroup from '@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Radio from '@vkontakte/vkui/dist/components/Radio/Radio';
import Checkbox from '@vkontakte/vkui/dist/components/Checkbox/Checkbox';
import '@vkontakte/vkui/dist/vkui.css';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import './panels/loading.css'
import { motion } from "framer-motion"
import Game from './panels/Game';
import Home from './panels/Home';
import Home2 from './panels/Home2';
import './mapsPreview/mapsCells.css'
import './panels/home.css'
import Profile from './panels/profile'
import Top from './panels/Top'
import Loading from './panels/loading'
import TicketAnimation from './panels/TicketAnimation'
import WaitingForStart from './panels/WaitingForStart'

import CreatingRoom from './panels/CreatingRoom'

import {
	Card,
	CardScroll,
	Div,
	ModalPage,
	ModalRoot,
	Panel,
	Select,
	Root,
	Gallery,
	HorizontalScroll
} from "@vkontakte/vkui";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";

const App = () => {
	const [activePanel, setActivePanel] = useState('home2');
	const [fetchedUser, setUser] = useState({id: 476182155, first_name: "Загрузка", last_name: ""});
	const [popout, setPopout] = useState(null);
	const [activeModal, setActiveModal] = useState(null)
	const [activeView, setActiveView] = useState('main')

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			} else if (type === 'VKWebAppGetUserInfoResult') {
				setUser(data);
				console.log('up')
			}
		});
		async function fetchData() {
			// TODO: добавить метод инициализации

		}
		fetchData();
	}, []);

	const go = e => {
		// if (e.currentTarget.dataset.to === 'game') {
		// 	setPopout(<TicketAnimation/>)
		// 	setTimeout(() => setPopout(null), 2500)
		// }
		setActivePanel(e.currentTarget.dataset.to);
	};

	const modal = (
		<ModalRoot
			activeModal={activeModal}
			onClose={() => setActiveModal(null)}
		>
			<ModalPage
				id="SuperFight"
				settlingHeight={100}
				onClose={() => setActiveModal(null)}
				header={
					<ModalPageHeader
						right={
							<PanelHeaderButton onClick={() => setActiveModal(null)}>
								<Icon24Dismiss />
							</PanelHeaderButton>
						}
					>
						Супер бой
					</ModalPageHeader>
				}
			>
				<Div>
					<Text weight="regular" style={{ marginBottom: 16 }}>
						Супер бой проходит на самой большой карте 10 на 17 клеток, в субботу
						вечером. Игроки разделяются на 5 команд. Всего в игре может принять
						участие максиму 10 человек.
						<br />
						<br />
						Игроки находящиеся в топ 10 по опыту гарантированно имеют шанс
						поучаствовать в супер боее. Остальные смогут принять участие, только
						если место какого то игрока из топ 10 будет свободно.
						<br />
						<br />
						Команда, победившая в супер бое, получает стикер пак (для каждого
						члена команды). За подробностями супер боёв следите в нашей беседе и
						в нашем сообществе.
					</Text>
					<Button size="xl">Участвовать</Button>
				</Div>
			</ModalPage>
		</ModalRoot>
	);

	function changeActiveModal (newActiveModal) {
		setActiveModal(newActiveModal)
	}

	function goToCreatingRoom () {
		setActiveView('creatingRoom')
	}

	function goToMainView () {
		setActiveView('main')
	}


	return (
		<Root activeView={activeView} >
			<View id='main' activePanel={activePanel} popout={popout} modal={modal}>
				<Loading id={'loading'}/>
				<Home2 id={'home2'} go={go} goToCreatingRoom={goToCreatingRoom} fetchedUser={fetchedUser} />
				<Game id={'game'} go={go} fetchedUser={fetchedUser} go={go} />
				<Home id='home' go={go} fetchedUser={fetchedUser} />
				<Profile id={'profile'} go={go} fetchedUser={fetchedUser}/>
				<Top go={go} id='top' changeActiveModal={changeActiveModal} fetchedUser={fetchedUser}/>
				<WaitingForStart id='waitingForStart' go={go} />
			</View>
			<View activePanel={"creatingRoom"} id="creatingRoom">
				<CreatingRoom id={'creatingRoom'} goToMainView={goToMainView} />
			</View>
		</Root>
	);
}

export default App;

