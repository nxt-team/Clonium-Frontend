import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Text from '@vkontakte/vkui/dist/components/Typography/Text/Text';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import { Icon56GalleryOutline } from '@vkontakte/icons';
import Game from './views/main/Game';
import Home from './views/main/Home';
import './mapsPreview/mapsCells.css'
import './views/main/home.css'
import Profile from './views/main/Profile'
import Top from './views/main/Top'
import History from './views/main/History'
import { Icon56FavoriteOutline } from '@vkontakte/icons';
import { Icon56VideoOutline } from '@vkontakte/icons';
import Achievements from './views/main/Achievements'
import { Icon28Messages } from '@vkontakte/icons';
import { Icon28StoryOutline } from '@vkontakte/icons';
import { Icon28NewsfeedOutline } from '@vkontakte/icons';
import TicketAnimation from './components/TicketAnimation'
import { Icon56Users3Outline, Icon16Done } from '@vkontakte/icons';
import NoTickets from './views/main/NoTickets'
import WaitingForStart from './views/main/WaitingForStart'
import Customization from './views/main/Customization'
import CreatingRoom from './views/creatingRoom/CreatingRoom'
import imagenation from "imagenation";
import RateFight from './views/endFight/RateFight'
import Offline from './views/offline/offline'
import Messenger from "./components/Messenger";
import FightResults from "./views/endFight/FightResults"
import {fightResultsPostShare} from './sharing/sharing'
import {
	Div,
	ModalPage,
	ModalRoot,
	Root,
	Spinner,
	ConfigProvider,
	ModalCard,
	File,
	Input,
	ScreenSpinner,
	ActionSheetItem,
	ActionSheet,
	platform,
	IOS,
	Panel,
	Snackbar,
	Avatar
} from "@vkontakte/vkui"
import Intro from "./views/main/Intro";
import AnimatedErrorIcon from "./components/AnimateErrorIcon";
import GameMechanicsModal from "./modals/GameMechanicsModal";
import ExplosionMechanicsModal from "./modals/ExplosionMechanicsModal"
import SuperFightModal from "./modals/SuperFightModal";
import AboutVkDonutModal from "./modals/AboutVkDonutModal";
import GrabRivalsModal from "./modals/GrabRivalsModal";
import AchievementModal from "./modals/AchievmentModal";
import UserProfile from "./views/main/UserProfile";
import {addReferral, init} from "./api/api";
import UploadingPhotoModal from "./modals/UploadingPhotoModal";
import ShowImgPlayIconModal from "./modals/ShowImgPlayIconModal";
import WaitingForTheFight from "./views/main/WaitingForTheFight";
import {socket} from "./api/socket";

const osName = platform();
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

let mapName = ""
let secretId = ""
const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState({id: 1, first_name: "Загрузка", last_name: ""});
	const [popout, setPopout] = useState(<ScreenSpinner/>); // <ScreenSpinner/>
	const [activeModal, setActiveModal] = useState(null)
	const [activeView, setActiveView] = useState('loading')
	const [imgLink, setImgLink] = useState(null)
	const [history, setHistory] = useState(['home']) // Заносим начальную панель в массив историй.
	const [achievementModalData, setAchievementModalData] = useState(["Титул", "Сабхидер", true])
	const [userBalances, setUserBalances] = useState({
		"tickets": 0,
		"exp": 5,
		"fights": 0,
		"losses": 0,
		"wins": 0
	})

	console.log("PANEL: " + activePanel)

	function updateStatusPanel (newStatus) {
		const status = newStatus.split('-')
		console.log("status on front ", status[0])

		if (status[0] === "waiting_for_players") {
			setActivePanel("waitingForStart")
		} else if (status[0] === "waiting_for_the_fight") {
			setActivePanel("waitingForTheFight")
		} else if (status[0] === "fight") {
			mapName = status[1]
			secretId = status[2]
			setActivePanel("game")
		}
	}

	useEffect(() => {
		console.log("CONNECTED SOCKETS")
		socket.on("status", (data) => {
			console.log("NEW STATUS", data)
			updateStatusPanel(data)
		});



		bridge.subscribe(({ detail: { type, data }}) => {});

		async function fetchData() {
			let fetchUser = await bridge.send('VKWebAppGetUserInfo');
			setUser(fetchUser)
			let user = await init(fetchUser)
			if (user["status"] === "success") {

				let hash = window.location.hash

				if (hash.indexOf("#invite=") !== -1) {
					hash = parseInt(hash.slice(8))
					if (typeof (hash) !== NaN) {
						await addReferral(fetchUser, hash)
					}
				}

				setActivePanel("intro_1")
				setActiveView("main")
			} else {
				setActiveView("main")
				setUserBalances(user)
			}
			setPopout(null)
			console.log("inited")


		}

		fetchData();

		window.addEventListener('popstate', () => goBack());
	}, []);

	const go = e => {
		const panel = e.currentTarget.dataset.to
		// if (e.currentTarget.dataset.to === 'game') {
		// 	setPopout(<TicketAnimation/>)
		// 	setTimeout(() => setPopout(null), 2700)
		// }
		window.history.pushState( {panel: panel}, panel ); // Создаём новую запись в истории браузера
		setActivePanel( panel ); // Меняем активную панель
		history.push( panel ); // Добавляем панель в историю
	};

	const goToPage = (panel) => {
		window.history.pushState( {panel: panel}, panel ); // Создаём новую запись в истории браузера
		setActivePanel( panel ); // Меняем активную панель
		history.push( panel ); // Добавляем панель в историю
	}

	const panel_go = panel => {
		window.history.pushState( {panel: panel}, panel ); // Создаём новую запись в истории браузера
		setActivePanel( panel ); // Меняем активную панель
		history.push( panel ); // Добавляем панель в историю
	}

	window.addEventListener('offline', () => {
		goToOffline()
	})

	const goIsolated = e => {
		const panel = e.currentTarget.dataset.to
		setActivePanel( panel );
	}

	const goBack = () => {
		if( history.length === 1 ) {  // Если в массиве одно значение:
			bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
		} else if( history.length > 1) { // Если в массиве больше одного значения:
			history.pop() // удаляем последний элемент в массиве.
			setActivePanel( history[history.length - 1] ) // Изменяем массив с иторией и меняем активную панель.
		}
	}


	const modal = (
		<ModalRoot
			activeModal={activeModal}
			onClose={() => setActiveModal(null)}
		>
			<SuperFightModal id='superFight' closeModal={() => setActiveModal(null)}/>
			<AboutVkDonutModal id='aboutVkDonut' closeModal={() => setActiveModal(null)}/>
			<ModalCard
				id={"ticketFromAddToFavorites"}
				onClose={() => setActiveModal(null)}
				icon={<Icon56FavoriteOutline />}
				header="Билет за добавление в избранные"
				caption="Добавь мини-приложение в избранные и получи необходимый для игры билет"
				actions={[{
					title: 'Добавить',
					mode: 'primary',
					action: () => {
						setActiveModal(null);
						bridge.send("VKWebAppAddToFavorites");
					}
				}]}
			>
			</ModalCard>
			<ModalCard
				id={"ticketFromSubscribing"}
				onClose={() => setActiveModal(null)}
				icon={<Icon56Users3Outline />}
				header="Билет за подписку"
				caption="Подпишись на сообщество и получи необходимый для игры билет"
				actions={[{
					title: 'Подписаться',
					mode: 'primary',
					action: () => {
						setActiveModal(null);
					}
				}]}
			>
			</ModalCard>
			<ModalCard
				id={"ticketFromAd"}
				onClose={() => setActiveModal(null)}
				icon={<Icon56VideoOutline />}
				header="Билет за просмотр рекламы"
				caption="Посмотри рекламу и получи необходимый для игры билет"
				actions={[{
					title: 'Смотреть',
					mode: 'primary',
					action: () => {
						setActiveModal(null);
					}
				}]}
			>
			</ModalCard>
			<UploadingPhotoModal
				id={"uploadingPhoto"}
				closeModal={() => setActiveModal(null)}
				imgLink={imgLink}
				fetchedUser={fetchedUser}
				changeActiveModal={(newModal) => setActiveModal(newModal)}
				setImgLink={(newImgLink) => setImgLink(newImgLink)}
			/>
			<ShowImgPlayIconModal id={"showImgPlayIcon"} imgLink={imgLink} closeModal={() => {setImgLink(null); setActiveModal(null)}} />
			<ModalCard
				id={"promoСodeActivation"}
				onClose={() => setActiveModal(null)}
				header="Введи промокод"
				caption="Промокод будет активирован за просмотр рекламы"
				actions={[{
					title: 'Активировать',
					mode: 'primary',
					action: () => {
						setActiveModal(null);
					}
				}]}>
					<Input />
			</ModalCard>
			<ModalPage
				id="messanger"
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
						Чат
					</ModalPageHeader>
				}
			>
				<Messenger/>
			</ModalPage>
			<ModalCard
				id={"noTickets"}
				onClose={() => setActiveModal(null)}
				icon={<AnimatedErrorIcon/>}
				header="Нет билетов"
				caption="У тебя закончались билеты, а они нужны для игры"
				actions={[
					{
						title: 'Получить',
						mode: 'primary',
						action: () => {
							changeActiveModal("getTicket")
						}
					},
					{
						title: 'Справка',
						mode: 'secondary',
						action: () => {
							setActiveModal(null);
						}
					}
				]}
			>
			</ModalCard>
			<GameMechanicsModal id={"gameMechanicsModal"} closeModal={() => setActiveModal(null)}/>
			<ExplosionMechanicsModal id={"explosionMechanicsModal"} closeModal={() => setActiveModal(null)}/>
			<GrabRivalsModal id={"grabRivalsModal"} closeModal={() => setActiveModal(null)}/>
			<AchievementModal id={"achievementModal"} closeModal={() => setActiveModal(null)} data={achievementModalData} fetchedUser={fetchedUser} completeSnackBar={completeSnackBar} />

		</ModalRoot>
	);

	function arrayRandElement(arr) {
		const rand = Math.floor(Math.random() * arr.length);
		return arr[rand];
	}

	function changeActiveModal (newActiveModal) {
		if (newActiveModal === 'getTicket') {
			setActiveModal(arrayRandElement(["ticketFromAddToFavorites", "ticketFromSubscribing", "ticketFromAd"]))
		} else {
			setActiveModal(newActiveModal)
		}

	}

	function goToCreatingRoom () {
		setActiveView('creatingRoom')
	}

	function goToMainView () {
		setActiveView('main')
	}

	function goToMainViewHome () {
		setActivePanel('home')
		setActiveView('main')
		setHistory(['home'])
	}

	function goToOffline () {
		setActiveView('offline')
	}

	function goToEndFight () {
		setActivePanel("rateFight")
		setActiveView("endFight")
	}

	function fightResultsSharing () {
		console.log('clicked')
		setPopout(
			<ActionSheet onClose={() => setPopout(null)}>
				<ActionSheetItem autoclose before={<Icon28StoryOutline/>}>
					В историю
				</ActionSheetItem>
				<ActionSheetItem autoclose before={<Icon28NewsfeedOutline/>}>
					На стену
				</ActionSheetItem>
				<ActionSheetItem autoclose before={<Icon28Messages/>}>
					Картинкой в сообщения
				</ActionSheetItem>
				{osName === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
			</ActionSheet>
		)
	}

	function openAchievementModal (title, caption, isCompleted) {
		setAchievementModalData([title, caption, isCompleted])
		setActiveModal('achievementModal')
	}

	function completeSnackBar (text) {
		setPopout(
			<Snackbar
				layout="vertical"
				duration={2000}
				onClose={() => setPopout(null)}
				before={<Avatar size={24} style={{backgroundColor: 'var(--accent)'}}><Icon16Done fill="#fff" width={14} height={14} /></Avatar>}
			>
				{text}
			</Snackbar>
		)
	}

	return (
		<ConfigProvider
			// scheme={scheme}
		>
			<Root activeView={activeView} >
				<View activePanel={"loading"} id="loading" popout={popout}>
					<Panel id={"loading"}/>
				</View>
				<View id='main' history={history} onSwipeBack={goBack} activePanel={activePanel} popout={popout} modal={modal}>
					<Achievements id='achievements' fetchedUser={fetchedUser} openAchievementModal={openAchievementModal} />
					<History id='history' go={go} fetchedUser={fetchedUser} />
					<Home id={'home'} goToPage={goToPage} go={go} changeActiveModal={changeActiveModal} goToCreatingRoom={goToCreatingRoom} fetchedUser={fetchedUser} userBalances={userBalances} />
					<WaitingForStart id={'waitingForStart'} go={go} fetchedUser={fetchedUser} />
					<WaitingForTheFight id={"waitingForTheFight"} />
					<Game
						id={'game'}
						changeActiveModal={changeActiveModal}
						fetchedUser={fetchedUser}
						secretId={secretId}
						startupParameters={startupParameters}
						goToEndFight={goToEndFight}
						mapName={mapName} />
					<Profile id={'profile'} changeActiveModal={changeActiveModal} go={go} fetchedUser={fetchedUser} userBalances={userBalances}/>
					<Top go={go} id='top' changeActiveModal={changeActiveModal} fetchedUser={fetchedUser}/>
					<NoTickets id='noTickets' go={go} changeActiveModal={changeActiveModal} />
					<Customization id='customization' go={go} changeActiveModal={changeActiveModal} fetchedUser={fetchedUser} imgLink={imgLink} />
					<Intro id='intro_1' panel_go={panel_go} changeActiveModal={changeActiveModal}/>
					<UserProfile id="userProfile" />
				</View>
				<View activePanel={"creatingRoom"} id="creatingRoom">
					<CreatingRoom id={'creatingRoom'} goToMainView={goToMainView} goToPage={goToPage} fetchedUser={fetchedUser} />
				</View>
				<View activePanel={activePanel} id="endFight" popout={popout}>
					<RateFight id={'rateFight'} goIsolated={goIsolated} />
					<FightResults id={'fightResults'} goToMainView={goToMainViewHome} fightResultsSharing={fightResultsSharing}/>
				</View>
				<View activePanel={"offline"} id="offline" modal={modal} >
					<Offline id={'offline'} goToMainView={goToMainView} changeActiveModal={changeActiveModal}/>
				</View>
			</Root>
		</ConfigProvider>
	);
}

export default App;

