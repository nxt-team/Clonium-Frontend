import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import '@vkontakte/vkui/dist/vkui.css';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Game from './views/main/Game';
import Home from './views/main/Home';
import './mapsPreview/mapsCells.css'
import './views/main/home.css'
import './utils/OpenSansFonts.css'
import Profile from './views/main/Profile'
import Top from './views/main/Top'
import History from './views/main/History'
import { Icon56FavoriteOutline } from '@vkontakte/icons';
import { Icon56VideoOutline } from '@vkontakte/icons';
import Achievements from './views/main/Achievements'
import { Icon28Messages } from '@vkontakte/icons';
import { Icon28StoryOutline } from '@vkontakte/icons';
import { Icon28NewsfeedOutline } from '@vkontakte/icons';
import { Icon56Users3Outline, Icon16Done } from '@vkontakte/icons';
import NoTickets from './views/main/NoTickets'
import WaitingForStart from './views/main/WaitingForStart'
import Customization from './views/main/Customization'
import CreatingRoom from './views/creatingRoom/CreatingRoom'
import RateFight from './views/endFight/RateFight'
import Offline from './views/offline/offline'
import Messenger from "./components/Messenger";
import FightResults from "./views/endFight/FightResults"
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
import {
	addReferral,
	getBeatenPlayers,
	getFight,
	getTicket,
	getUserBalances,
	init,
	updateAreNotificationsEnabled
} from "./api/api";
import UploadingPhotoModal from "./modals/UploadingPhotoModal";
import ShowImgPlayIconModal from "./modals/ShowImgPlayIconModal";
import WaitingForTheFight from "./views/main/WaitingForTheFight";
import {joinRoom, rejoinRoom, socket} from "./api/socket";
import RejoinedGame from "./views/main/RejoinedGame";
import PromocodeActivationModal from "./modals/PromocodeActivationModal";
import { Icon28CancelCircleFillRed } from '@vkontakte/icons';
import ClearCache from "./views/main/ClearCache";

const osName = platform();
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

let mapName = ""
let secretId = ""
let needUsersInFight = 0
let startCount = 34

let colorMotion = ""
let turnTime = true
let map = []
let colors = []
let fightStart = new Date()
let gameTime = 0
let userColor = ""
let beatenPlayers = []

let userProfileVkId = 1

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [finishData, setFinishData] = useState([])
	const [fetchedUser, setUser] = useState({id: 1, first_name: "Загрузка", last_name: ""});
	const [popout, setPopout] = useState(<ScreenSpinner/>); //
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
		"wins": 0,
		"vk_donut": 0,
		"user_rank": "",
		"status": "",
		"are_notifications_enabled": false,
		"isUserInSuperFight": false,
	})

	function updateStatusPanel (newStatus) {
		const status = newStatus.split('-')
		console.log("status on front ", status[0])

		if (status[0] === "waiting_for_players") {
			setFinishData([])
			map = []
			setActivePanel("waitingForStart")
		} else if (status[0] === "waiting_for_the_fight") {
			startCount = 34
			setActivePanel("waitingForTheFight")
		} else if (status[0] === "fight") {
			mapName = status[1]
			secretId = status[2]
			// setPopout(<TicketAnimation/>)
			// setTimeout(() => setPopout(null), 2700)
			setActivePanel("game")
		} else if (status[0] === "finish") {
			const data = JSON.parse(status[1])
			setFinishData(data)
		}
	}

	async function updateNotifications () {
		await updateAreNotificationsEnabled(fetchedUser, true)
		userBalances["are_notifications_enabled"] = true

	}

	useEffect(() => {
		console.log("CONNECTED SOCKETS")
		socket.on("status", (data) => {
			console.log("NEW STATUS", data)
			updateStatusPanel(data)
		});



		bridge.subscribe(({ detail: { type, data }}) => {
			console.log(type, data)
			if (type === 'VKWebAppAddToFavoritesResult') {
				completeSnackBar("Мини приложение в избранных")
			} else if (type === "VKWebAppAllowMessagesFromGroupResult") {
				completeSnackBar("Уведомления включены")
			}
		});

		async function fetchData() {
			let fetchUser = await bridge.send('VKWebAppGetUserInfo');
			setUser(fetchUser)
			let user = await init(fetchUser)
			setUserBalances(user)
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
			} else if (user["status"].split("_")[0] === "fight") {
				console.log("rejoin fight")

				socket.emit("rejoin room", {
					"secret_id": user["status"].split("_")[1],
					"vk_id": fetchUser.id,
					"avatar": fetchUser.photo_max_orig,
				}, (data) => {
					console.log(data)
					if (data[0] === "waiting_for_players") {
						secretId = user["status"].split("_")[1]
						needUsersInFight = data[2]
						setActivePanel("waitingForStart")
					} else if (data[0] === "waiting_for_the_fight") {
						const now = new Date();
						const fightStart = new Date(data[1])
						const time = new Date(fightStart - now)
						startCount = time.getSeconds() + 2
						setActivePanel("waitingForTheFight")
					} else if (data[0] === "fight") {
						mapName = data[7]
						colorMotion = data[1]
						turnTime = data[2]
						map = data[3]
						colors = data[4]
						fightStart = data[5]
						gameTime = data[6]
						userColor = data[8]
						secretId = user["status"].split("_")[1]
						setActivePanel("rejoinedGame")

					}
					// todo: доделать остальные статусы
				})

				setActiveView("main")
			} else {

				let newActiveModal = null

				let hash = window.location.hash
				console.log(hash)

				if (hash.indexOf("#fight=") !== -1) {
					console.log(hash)
					hash = hash.slice(7)
					console.log(hash)
					if (typeof (hash) !== NaN) {
						console.log(hash)
						const fight = await getFight(hash)
						if (fight === null) {
							console.log("NULLLL")
							newActiveModal = "noFight"
						} else if (fight["status"] === "waiting_for_players") {
							needUsersInFight = fight["max_user_number"]
							secretId = hash
							setTimeout(() => {joinRoom(fetchUser, hash); goToPage("waitingForStart")}, 300);
						} else {
							newActiveModal = "fightStarted"
						}
					}
				}

				setActiveView("main")
				setUserBalances(user)
				console.log(newActiveModal)
				setTimeout(() => setActiveModal(newActiveModal), 300)
			}
			setPopout(null)
		}

		fetchData();

		window.addEventListener('popstate', () => goBack());
	}, []);

	const go = e => {
		const panel = e.currentTarget.dataset.to
		window.history.pushState( {panel: panel}, panel ); // Создаём новую запись в истории браузера
		setActivePanel( panel ); // Меняем активную панель
		history.push( panel ); // Добавляем панель в историю
	};

	const goToPage = (panel) => {
		if (panel === "waitingForStart" && userBalances["tickets"] === 0) {
			setActiveModal("noTickets")
		} else {
			window.history.pushState( {panel: panel}, panel ); // Создаём новую запись в истории браузера
			setActivePanel( panel ); // Меняем активную панель
			history.push( panel ); // Добавляем панель в историю
		}
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

	const goIsolated2 = (panel) => {
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

	const goBackBySwipeBack = () => {
		if (history[history.length - 1] !== "history" || history[history.length - 1] !== "achievements") {
			if (history.length === 1) {  // Если в массиве одно значение:
				bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
			} else if (history.length > 1) { // Если в массиве больше одного значения:
				history.pop() // удаляем последний элемент в массиве.
				setActivePanel(history[history.length - 1]) // Изменяем массив с иторией и меняем активную панель.
			}
		}
	}

	const getSwipeBackHistory = () => {
		if (history[history.length - 1] !== "history" || history[history.length - 1] !== "achievements") {
			return ["home"]
		} else {
			return history
		}
	}

	const updateUserBalances = async () => {
		const user = await getUserBalances(fetchedUser)
		setUserBalances(user)
	}

	const addTicket = () => {
		userBalances["tickets"]++
	}


	const modal = (
		<ModalRoot
			activeModal={activeModal}
			onClose={() => setActiveModal(null)}
		>
			<SuperFightModal
				id='superFight'
				closeModal={() => setActiveModal(null)}
				completeSnackBar={completeSnackBar}
				changeIsUserInSuperFight={() => userBalances["isUserInSuperFight"] = true}
				isUserInSuperFight={userBalances["isUserInSuperFight"]} />
			<AboutVkDonutModal
				id='aboutVkDonut'
				closeModal={() => setActiveModal(null)}
				completeSnackBar={completeSnackBar}
				errorSnackBar={errorSnackBar}
				updateUserBalances={(newUserBalances) => setUserBalances(newUserBalances)}
			/>
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
						const user_platform = startupParameters.get('vk_platform')
						if (user_platform === 'mobile_android' || user_platform === 'mobile_ipad' || user_platform === 'mobile_iphone') {
							bridge.send("VKWebAppShowNativeAds", {ad_format: "reward"})
								.then(async data => {
									if (data.result) {
										const result = await getTicket(fetchedUser)
										console.log(result)
										if (result.success) {
											setActiveModal(null)
											addTicket()
											completeSnackBar("Билет зачислен")
										}
									} else if (data.no_ad_reason === "no ad") {
										setActiveModal(null)
										bridge.send("VKWebAppShowNativeAds", {ad_format: "preloader"})
											.then(async data => {
												if (data.result) {
													const result = await getTicket(fetchedUser)
													console.log(result)
													if (result.success) {
														setActiveModal(null)
														addTicket()
														completeSnackBar("Билет зачислен")
													}
												} else if (data.no_ad_reason === "no ad") {
													setActiveModal(null)
													errorSnackBar("Не удалось получить билет. Закончилась реклама")
												} else {
													setActiveModal(null)
													errorSnackBar("Не известная ошибка. data: " + data)
												}
											})
									} else {
										setActiveModal(null)
										errorSnackBar("Не известная ошибка. data: " + data)
									}
								})
						} else {
							setActiveModal(null)
							errorSnackBar("Билет можно получить только в официальном приложение ВКонтакте")
						}
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
			<PromocodeActivationModal
				id={"promocodeActivation"}
				closeModal={() => setActiveModal(null)}
				errorSnackBar={errorSnackBar}
				completeSnackBar={completeSnackBar}
				startupParameters={startupParameters}
				fetchedUser={fetchedUser}
				updateUserBalances={updateUserBalances}
			/>
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
							changeActiveModal("ticketFromAd")
						}
					},
					{
						title: 'Закрыть',
						mode: 'secondary',
						action: () => {
							setActiveModal(null);
						}
					}
				]}
			>
			</ModalCard>
			<ModalCard
				id={"fightStarted"}
				onClose={() => setActiveModal(null)}
				icon={<AnimatedErrorIcon/>}
				header="Бой уже начался"
				caption="Места для вас в этом бою не нашлось :("
				actions={[
					{
						title: 'Закрыть',
						mode: 'secondary',
						action: () => {
							setActiveModal(null);
						}
					}
				]}
			>
			</ModalCard>
			<ModalCard
				id={"noFight"}
				onClose={() => setActiveModal(null)}
				icon={<AnimatedErrorIcon/>}
				header="Такого боя нет"
				caption="Бой не найден"
				actions={[
					{
						title: 'Закрыть',
						mode: 'secondary',
						action: () => {
							setActiveModal(null);
						}
					}
				]}
			>
			</ModalCard>
			<ModalCard
				id={"fightError"}
				onClose={() => setActiveModal(null)}
				icon={<AnimatedErrorIcon/>}
				header="Ошибка боя"
				caption="не удалось присоединиться к комнате"
				actions={[
					{
						title: 'Закрыть',
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

	function goToClearCache () {
		setActiveView('clearCache')
	}

	async function goToEndFight (beatenPlayersColors) {
		beatenPlayers = beatenPlayersColors

		if (activePanel !== "rateFight") {
			bridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"})
		}

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

	function errorSnackBar (text) {
		setPopout(
			<Snackbar
				layout="vertical"
				duration={5000}
				onClose={() => setPopout(null)}
				before={<Icon28CancelCircleFillRed width={24} height={24} />}
			>
				{text}
			</Snackbar>
		)
	}

	function screenSpinnerOn () {
		setPopout(<ScreenSpinner/>)
	}

	function screenSpinnerOff () {
		setPopout(null)
	}

	async function endIntro () {
		let newActiveModal = null

		let hash = window.location.hash
		console.log(hash)

		if (hash.indexOf("#fight=") !== -1) {
			console.log(hash)
			hash = hash.slice(7)
			console.log(hash)
			if (typeof (hash) !== NaN) {
				console.log(hash)
				const fight = await getFight(hash)
				if (fight === null) {
					console.log("NULLLL")
					newActiveModal = "noFight"
				} else if (fight["status"] === "waiting_for_players") {
					needUsersInFight = fight["max_user_number"]
					secretId = hash
					setTimeout(() => {joinRoom(fetchedUser, hash); goToPage("waitingForStart")}, 300);
				} else {
					newActiveModal = "fightStarted"
				}
			}
			setTimeout(() => setActiveModal(newActiveModal), 300)
		}

		setActivePanel("home")
	}

	return (
		<ConfigProvider
			// scheme={scheme}
		>
			<Root activeView={activeView} >
				<View activePanel={"loading"} id="loading" popout={popout}>
					<Panel id={"loading"}>
						{/*<canvas id='example' style={{"width": 1080 / 2, "height": 1920 / 2}} />*/}
					</Panel>
				</View>
				<View id='main' history={getSwipeBackHistory()} onSwipeBack={goBackBySwipeBack} activePanel={activePanel} popout={popout} modal={modal}>
					<Intro id='intro_1' panel_go={panel_go} endIntro={endIntro} changeActiveModal={changeActiveModal}/>
					<Achievements id='achievements' fetchedUser={fetchedUser} openAchievementModal={openAchievementModal} />
					<History id='history' go={go} fetchedUser={fetchedUser} />
					<Home
						id={'home'}
						goToPage={goToPage}
						updateNeedUsersInFight={(newPlayers) => needUsersInFight = newPlayers}
						updateSecretId={(newId) => secretId = newId }
						go={go}
						changeActiveModal={changeActiveModal}
						goToCreatingRoom={goToCreatingRoom}
						fetchedUser={fetchedUser}
						userBalances={userBalances}
						updateNotifications={updateNotifications}
						startupParameters={startupParameters}
					/>
					<WaitingForStart id={'waitingForStart'} go={go} are_notifications_enabled={userBalances["are_notifications_enabled"]} secretId={secretId} updateNotifications={updateNotifications} fetchedUser={fetchedUser} needUsersInFight={needUsersInFight} />
					<WaitingForTheFight id={"waitingForTheFight"} startCount={startCount} />
					<Game
						id={'game'}
						changeActiveModal={changeActiveModal}
						fetchedUser={fetchedUser}
						secretId={secretId}
						startupParameters={startupParameters}
						goToEndFight={goToEndFight}
						mapName={mapName}
						goToMainViewHome={goToMainViewHome}
						finishData={finishData}
					/>
					<RejoinedGame
						id={'rejoinedGame'}
						changeActiveModal={changeActiveModal}
						fetchedUser={fetchedUser}
						secretId={secretId}
						startupParameters={startupParameters}
						goToEndFight={goToEndFight}
						mapName={mapName}
						goToMainViewHome={goToMainViewHome}
						startMap={map}
						startColorMotion={colorMotion}
						startColors={colors}
						startUserColor={userColor}
						finishData={finishData}
						gameTime={gameTime}
						turnTime={turnTime}
						fightStart={fightStart}
					/>
					<Profile
						id={'profile'}
						changeActiveModal={changeActiveModal}
						go={go}
						fetchedUser={fetchedUser}
						userBalances={userBalances}
						startupParameters={startupParameters}
						screenSpinnerOff={screenSpinnerOff}
						screenSpinnerOn={screenSpinnerOn}
						errorSnackBar={errorSnackBar}
						goToClearCache={goToClearCache}
					/>
					<Top goToPage={goToPage} id='top' changeActiveModal={changeActiveModal} fetchedUser={fetchedUser} updateUserProfileVkId={(newVkId) => userProfileVkId = newVkId} />
					<NoTickets id='noTickets' go={go} changeActiveModal={changeActiveModal} />
					<Customization id='customization' go={go} changeActiveModal={changeActiveModal} fetchedUser={fetchedUser} imgLink={imgLink} />
					<UserProfile id='userProfile' vk_id={userProfileVkId} changeActiveModal={changeActiveModal} />
				</View>
				<View activePanel={"creatingRoom"} id="creatingRoom">
					<CreatingRoom id={'creatingRoom'} goToMainView={goToMainView} goToPage={goToPage} fetchedUser={fetchedUser}
								  updateNeedUsersInFight={(newPlayers) => needUsersInFight = newPlayers}
								  updateSecretId={(newId) => secretId = newId }
					/>
				</View>
				<View activePanel={activePanel} id="endFight" popout={popout}>
					<RateFight id={'rateFight'} goIsolated={goIsolated2} screenSpinnerOff={screenSpinnerOff} screenSpinnerOn={screenSpinnerOn} fetchedUser={fetchedUser} />
					<FightResults id={'fightResults'} secretId={secretId} finishData={finishData} updateUserBalances={updateUserBalances} beatenPlayersColors={beatenPlayers} fetchedUser={fetchedUser} goToMainView={goToMainViewHome} fightResultsSharing={fightResultsSharing}/>
				</View>
				<View activePanel={"offline"} id="offline" modal={modal} >
					<Offline id={'offline'} goToMainView={goToMainView} changeActiveModal={changeActiveModal}/>
				</View>
				<View activePanel={"clearCache"} id="clearCache" >
					<ClearCache id='clearCache'/>
				</View>
			</Root>
		</ConfigProvider>
	);
}

export default App;

