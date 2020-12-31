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
import Game from './panels/Game';
import Home from './panels/Home';
import StartingGame from './panels/StartingGame';
import Profile from './panels/profile'
import Top from './panels/Top'
import Loading from './panels/loading'
import {Div, ModalPage, ModalRoot, Panel, Select} from "@vkontakte/vkui";

const App = () => {
	const [activePanel, setActivePanel] = useState('loading');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null);
	const [activeModal, setActiveModal] = useState(null)

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			console.log(user)
			setActivePanel('home')

		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const modalOnCreateRoom = () => {
		console.log('changed')
		setActiveModal(
			<ModalRoot activeModal='1_modal'>
				<ModalPage
					id='1_modal'
					settlingHeight={100}
					onClose={() => setActiveModal(null)}
					header={
						<ModalPageHeader
							right={<PanelHeaderButton onClick={() => setActiveModal(null)}><Icon24Dismiss /></PanelHeaderButton>}
						>
							Настройте комнату
						</ModalPageHeader>
					}
				>
					<FormLayout>

						<Select top="Карта" placeholder="Выбрать карту"  >
							<option value="m">Квадрат</option>
							<option value="f">Бублик</option>
							<option value="s">Сетка</option>
							<option value="d">Проход</option>
						</Select>

						<FormLayoutGroup top="Кол-во игроков">
							<Radio name="players" value={0} defaultChecked >2</Radio>
							<Radio name="players" value={1}>3</Radio>
							<Radio name="players" value={2}>4</Radio>
						</FormLayoutGroup>

						<FormLayoutGroup top="Размер поля">
							<Radio name="size" value={3} defaultChecked>8 на 8</Radio>
							<Radio name="size" value={4}>6 на 6</Radio>
						</FormLayoutGroup>

						<FormLayoutGroup top="Время">
							<Radio name="time" value={5} defaultChecked>10 минут</Radio>
							<Radio name="time" value={6}>Бесконечное время</Radio>
						</FormLayoutGroup>

						<FormLayoutGroup top="Дополнительно">
							<Checkbox>Приватно</Checkbox>
						</FormLayoutGroup>
						<Button size="xl" >Создать</Button>
					</FormLayout>
				</ModalPage>
			</ModalRoot>
		)
	}

	const modalOnInfoSuperFight= () => {
		setActiveModal(
			<ModalRoot activeModal='2_modal'>
				<ModalPage
					id='2_modal'
					settlingHeight={100}
					onClose={() => setActiveModal(null)}
					header={
						<ModalPageHeader
							right={<PanelHeaderButton onClick={() => setActiveModal(null)}><Icon24Dismiss /></PanelHeaderButton>}
						>
							Супер бой
						</ModalPageHeader>
					}
				>
					<Div>
						<Text weight="regular" style={{ marginBottom: 16 }}>
							Супер бой проходит на самой большой карте 10 на 17 клеток, в субботу вечером.
							Игроки разделяются на 5 команд. Всего в игре может принять участие максиму 10 человек.
							<br/>
							<br/>
							Игроки находящиеся в топ 10 по опыту гарантированно имеют шанс поучаствовать в супер боее.
							Остальные смогут принять участие, только если место какого то игрока из топ 10 будет свободно.
							<br/>
							<br/>
							Команда, победившая в супер бое, получает стикер пак (для каждого члена команды).
							За подробностями супер боёв следите в нашей беседе и в нашем сообществе.
						</Text>
					</Div>
				</ModalPage>
			</ModalRoot>
		)
	}

	return (
		<View activePanel={activePanel} popout={popout} modal={activeModal}>
			<Loading id={'loading'}/>
			<Game id='game' fetchedUser={fetchedUser} go={go} />
			<Home id='home' go={go} fetchedUser={fetchedUser} />
			<StartingGame id='startingGame' go={go} modalOn={modalOnCreateRoom} />
			<Profile id={'profile'} go={go} fetchedUser={fetchedUser}/>
			<Top go={go} id='top' modalOn={modalOnInfoSuperFight} fetchedUser={fetchedUser}/>
		</View>
	);
}

export default App;

