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
import {Icon28CopyOutline, Icon56FavoriteOutline} from '@vkontakte/icons';
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
	Avatar, Alert
} from "@vkontakte/vkui"
import Intro from "./views/main/Intro";
import AnimatedErrorIcon from "./components/AnimateErrorIcon";
import GameMechanicsModal from "./modals/GameMechanicsModal";
import ExplosionMechanicsModal from "./modals/ExplosionMechanicsModal"
import SuperFightModalContent from "./modals/SuperFightModalContent";
import AboutVkDonutModalContent from "./modals/AboutVkDonutModalContent";
import GrabRivalsModal from "./modals/GrabRivalsModal";
import AchievementModal from "./modals/AchievmentModal";
import UserProfile from "./views/main/UserProfile";
import {
	addReferral, getAllUserInfo,
	getBeatenPlayers,
	getFight, getSubAchievement,
	getTicket,
	getUserBalances,
	init,
	updateAreNotificationsEnabled
} from "./api/api";
import UploadingPhotoModal from "./modals/UploadingPhotoModal";
import ShowImgPlayIconModal from "./modals/ShowImgPlayIconModal";
import WaitingForTheFight from "./views/main/WaitingForTheFight";
import {doDisconnect, doReconnect, joinRoom, rejoinRoom, socket} from "./api/socket";
import RejoinedGame from "./views/main/RejoinedGame";
import PromocodeActivationModal from "./modals/PromocodeActivationModal";
import { Icon28CancelCircleFillRed } from '@vkontakte/icons';
import ClearCache from "./views/main/ClearCache";
import ProfileModalContent from "./modals/ProfileModalContent";
import {postShare, refLinkCopy} from "./sharing/sharing";
import AlreadyConnected from "./views/alreadyConnected/alreadyConnected";
import AnimatedDoneIcon from "./components/AnimatedDoneIcon";
import Banned from "./views/banned/Banned";
import TemporaryBanned from "./views/temporaryBanned/TemporaryBanned";
import TicketAnimation from "./components/TicketAnimation";

const osName = platform();
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))
const mobile_platforms = ["mobile_android", "mobile_ipad", "mobile_iphone", "mobile_iphone_messenger"]
let mapName = ""
let secretId = ""
let needUsersInFight = 0
let startCount = 30

let colorMotion = ""
let turnTime = true
let map = []
let colors = []
let fightStart = new Date()
let gameTime = 0
let userColor = ""
let beatenPlayers = ""
let temporaryBannedOurs
let usersInFight

let userProfileVkId = 1
let isCustomizationLeaving = false
let initTimeInSeconds = 0
let isLoadingInitData = true
let isOfflineNeedShowInSnackBar = false

let startGameTimer

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [finishData, setFinishData] = useState([])
	const [fetchedUser, setUser] = useState({id: 1, first_name: "Загрузка", last_name: ""});
	const [popout, setPopout] = useState(<ScreenSpinner/>); // в offline используется номер этой строки
	const [activeModal, setActiveModal] = useState(null)
	const [activeView, setActiveView] = useState('loading')
	const [imgLink, setImgLink] = useState(null)
	const [history, setHistory] = useState(['home']) // Заносим начальную панель в массив историй.
	const [achievementModalData, setAchievementModalData] = useState(["Титул", "Сабхидер", true])
	const [userBalances, setUserBalances] = useState({
		"tickets": 5,
		"exp": 0,
		"fights": 0,
		"losses": 0,
		"wins": 0,
		"vk_donut": 0,
		"user_rank": "Ноу-нейм",
		"status": "0",
		"are_notifications_enabled": false,
		"isUserInSuperFight": false,
		"referrals": 0,
		"warnings": 0,
		"achievements": []
	})
	const [ online, setOnline] = useState(1)

	function updateStatusPanel (newStatus) {
		const status = newStatus.split('-')
		console.log("status on front ", status[0])

		if (status[0] === "waiting_for_players") {
			setFinishData([])
			map = []
			setActivePanel("waitingForStart")
		} else if (status[0] === "waiting_for_the_fight") {
			startCount = 28
			setPopout(<TicketAnimation/>)
			setTimeout( () => {setActivePanel("waitingForTheFight"); setPopout(null)}, 2700)
		} else if (status[0] === "fight") {
			mapName = status[1]
			secretId = status[2]
			// setPopout(<TicketAnimation/>)
			// setTimeout(() => setPopout(null), 2700)
			setActivePanel("game")
		} else if (status[0] === "finish") {
			const data = JSON.parse(status[1])
			setFinishData(data)
		} else if (status[0] === "fight_started") {
			setActivePanel("home")
			setActiveModal("fightStarted")
		}
	}

	async function updateNotifications () {
		userBalances["are_notifications_enabled"] = true
		await updateAreNotificationsEnabled(fetchedUser, true)

	}

	async function doReconnectForRejoin () {
		socket.disconnect()
		await bridge.send("VKWebAppStorageSet", {"key": "reloading", "value": "1"});
		window.location.href = ''
	}

	async function completeSubReward () {
		await getSubAchievement()
		let balances = await getUserBalances()
		setUserBalances(balances)
		setActiveView("main")
		completeSnackBar("Теперь ты крутой саб")
	}

	// console.log("Scroll bars: ", document.documentElement.clientWidth, window.innerWidth)

	useEffect(() => {
		socket.on("status", (data) => {
			console.log("NEW STATUS", data)
			updateStatusPanel(data)
		});

		socket.on("disconnectEvent", () => {
			setActiveView("alreadyConnected")
		})

		socket.on("online", (data) => {
			if (activePanel !== "game" || activePanel !== "rejoinedGame" || activePanel !== "intro_1") {
				setOnline(data)
			}
			console.log("new Online", data)
		});
		bridge.subscribe(({ detail: { type, data }}) => {
			console.log(type, data)
			if (type === 'VKWebAppAddToFavoritesResult') {
				completeSnackBar("Мини приложение в избранных")
			} else if (type === "VKWebAppAllowMessagesFromGroupResult") {
				completeSnackBar("Уведомления включены")
			} else if (type === "VKWebAppCopyTextResult") {
				completeSnackBar("Скопировано!")
			} else if (type === "VKWebAppJoinGroupResult") {
				completeSubReward()
			} else if (type === "VKWebAppViewHide") { // закрытие прилы
				socket.disconnect()
			} else if (type === "VKWebAppViewRestore" && !socket.connected && !isOfflineNeedShowInSnackBar) { // доставание из кэша
				setPopout(<ScreenSpinner/>)
				socket.connect()
				getAllUserInfo()
					.then((userData) => {
						const user = userData[0]
						if (userData[1]) {
							isOfflineNeedShowInSnackBar = true
							setActivePanel("home")
							setActiveView("alreadyConnected")
							setPopout(null)
						} else if (user["status"].split("_")[0] === "fight") {
							socket.emit("rejoin room", {
								"secret_id": user["status"].split("_")[1],
								"vk_id": user.vk_id,
								"avatar": user.avatar,
								"params": window.location.search.replace('?', '')
							}, (data) => {
								console.log(data)
								secretId = user["status"].split("_")[1]
								if (data[0] === "waiting_for_players") {
									needUsersInFight = data[2]
									setActivePanel("waitingForStart")
									setPopout(null)
								} else if (data[0] === "waiting_for_the_fight") {
									const now = new Date();
									const fightStart = new Date(data[1])
									const time = new Date(fightStart - now)
									startCount = time.getSeconds() - 30
									if (startCount === -30) {
										startCount = 30
									}
									setActivePanel("waitingForTheFight")
									setPopout(null)
								} else if (data[0] === "fight") {
									doReconnectForRejoin()
								}
							})
						} else {

							if (secretId.length > 0 && beatenPlayers === "") { // beatenPlayers нужно для того, что бы не крашилось приложение после просмотра рекламы в рейт файт
								setActivePanel("home")
								secretId = ""
							}

							let hash = window.location.hash
							console.log(hash)

							if (hash.indexOf("#fight=") !== -1) {
								console.log(hash)
								hash = hash.slice(7)
								console.log(hash)
								if (typeof (hash) !== NaN) {
									console.log(hash)
									getFight(hash)
										.then((fight) => {
											if (fight === null) {
												console.log("noFight")
											} else if (fight["status"] === "waiting_for_players") {
												needUsersInFight = fight["max_user_number"]
												secretId = hash
												if (user["tickets"] === 0) {
													setPopout(null)
													setActiveModal("noTickets")
												} else {
													setPopout(
														<Alert
															actions={[{
																title: 'Войти',
																autoclose: true,
																action: () => {
																	joinRoom({
																		"id": user.vk_id,
																		"photo_200": user.avatar,
																	}, hash);
																	setActivePanel("waitingForStart")
																},
															}, {
																title: 'Отмена',
																autoclose: true,
																mode: 'cancel'
															}]}
															onClose={() => setPopout(null)}
														>
															<h2>Войти в комнату?</h2>
															<p>Ты перешёл по ссылке для присоединения к комнате</p>
														</Alert>
													)
												}
											} else {
												setPopout(null)
											}
										})

								} else {
									setPopout(null)
								}
							} else {
								setPopout(null)
							}
						}
					})
			}
		});

		async function fetchData() {
			isLoadingInitData = true
			if (mobile_platforms.indexOf(startupParameters.get('vk_platform')) !== -1) {
				const storageGetData = await bridge.send("VKWebAppStorageGet", {"keys": ["reloading", "theme"]})
				console.log("storageGetData", storageGetData)
				const isReloading = storageGetData["keys"][0]["value"]
				if (isReloading) {
					let theme = storageGetData["keys"][1]["value"]
					console.log("THEME ", theme)
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = theme ? theme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
					await bridge.send("VKWebAppStorageSet", {"key": "reloading", "value": ""});
				}
			}
			let fetchUser = await bridge.send('VKWebAppGetUserInfo');
			setUser(fetchUser)
			let user = await init(fetchUser)
			console.log("INIT")
			setUserBalances(user)
			socket.connect()
			const timeNow = new Date()
			initTimeInSeconds = timeNow.getSeconds() * 1000 + timeNow.getMinutes() * 60000 + timeNow.getMilliseconds()

			if (user["status"] === "connected") {
				isOfflineNeedShowInSnackBar = true
				setActiveView("alreadyConnected")
				setPopout(null)
			} else if (user["status"] === "banned") {
				isOfflineNeedShowInSnackBar = true
				setActiveView("banned")
				setPopout(null)
			} else if (user["status"] === "temporaryBanned") {
				isOfflineNeedShowInSnackBar = true
				const timeNow = new Date()
				const ours_now = timeNow.getDate() * 24 + timeNow.getHours()
				const bannedTime = new Date(user["last_activity"])
				const banned_ours = bannedTime.getDate() * 24 + bannedTime.getHours()
				temporaryBannedOurs = banned_ours + 24 - ours_now
				setActiveView("temporaryBanned")
				setPopout(null)
			}

			else if (user["status"] === "success") {

				let hash = window.location.hash

				if (hash.indexOf("#invite=") !== -1) {
					hash = parseInt(hash.slice(8))
					if (typeof (hash) !== NaN) {
						await addReferral(fetchUser, hash)
					}
				}
				isOfflineNeedShowInSnackBar = true

				setActivePanel("intro_1")
				setActiveView("main")
				setPopout(null)
			} else if (user["status"].split("_")[0] === "fight") {
				console.log("rejoin fight")

				socket.emit("rejoin room", {
					"secret_id": user["status"].split("_")[1],
					"vk_id": fetchUser.id,
					"avatar": fetchUser.photo_max_orig,
					"params": window.location.search.replace('?', '')
				}, (data) => {
					console.log(data)
					let newPanel
					secretId = user["status"].split("_")[1]
					if (data[0] === "waiting_for_players") {
						needUsersInFight = data[2]
						newPanel = "waitingForStart"
					} else if (data[0] === "waiting_for_the_fight") {
						const now = new Date();
						const fightStart = new Date(data[1])
						const time = new Date(fightStart - now)
						startCount = time.getSeconds() - 30
						newPanel = "waitingForTheFight"
					} else if (data[0] === "fight") {
						mapName = data[7]
						colorMotion = data[1]
						turnTime = data[2]
						map = data[3]
						colors = data[4]
						fightStart = data[5]
						gameTime = data[6]
						userColor = data[8]
						usersInFight = data[9]
						startGameTimer = data[10]
						newPanel = "rejoinedGame"

					}
					setActivePanel(newPanel)
					setActiveView("main")
					setPopout(null)
				})
			} else {

				let newActiveModal = null

				let hash = window.location.hash
				console.log(hash)

				if (hash === "#donut") {
					newActiveModal = "aboutVkDonut"
				} else if (hash.indexOf("#fight=") !== -1) {
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
							if (user["tickets"] === 0) {
								newActiveModal = "noTickets"
							} else {
								joinRoom(fetchUser, hash);
								setActivePanel("waitingForStart")
							}
						} else if (fight["status"] === "fight_finished") {
							newActiveModal = "fightFinished"
						} else {
							newActiveModal = "fightStarted"
						}
					}
				}

				setActiveView("main")
				setTimeout(() => setActiveModal(newActiveModal), 300)
				setPopout(null)
			}
			isLoadingInitData = false
		}

		fetchData()

		window.addEventListener('popstate', () => {
			goBack()
		});

		window.addEventListener('offline', () => {
			const timeNow = new Date()
			const timeInSecondsNow = timeNow.getSeconds() * 1000 + timeNow.getMinutes() * 60000 + timeNow.getMilliseconds()
			console.log(timeInSecondsNow - initTimeInSeconds)
			if (timeInSecondsNow - initTimeInSeconds < 1000) {
				setTimeout(() => goToOffline(), 500)
			} else if (isOfflineNeedShowInSnackBar) {
				errorSnackBar("Интернет соединение потеряно")
			} else {
				goToOffline()
			}

		})
	}, []);

	const go = e => {
		const panel = e.currentTarget.dataset.to
		window.history.pushState( {panel: panel}, panel ); // Создаём новую запись в истории браузера
		setActivePanel( panel ); // Меняем активную панель
		history.push( panel ); // Добавляем панель в историю
	};

	const goToPage = (panel) => {
		if (panel === "waitingForStart" && userBalances["tickets"] === 0) {
			console.log(userBalances)
			console.log("noTickets")
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

	const goIsolated = e => {
		const panel = e.currentTarget.dataset.to
		setActivePanel( panel );
	}

	const goIsolated2 = (panel) => {
		if (panel === "waitingForStart" && userBalances["tickets"] === 0) {
			console.log(userBalances)
			console.log("noTickets")
			setActiveModal("noTickets")
		} else {
			setActivePanel(panel);
		}
	}

	const goBack = () => {
		console.log(activePanel, history)
		console.log(activeModal)
		if ( history.length === 1 ) {  // Если в массиве одно значение:
			bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
		} else if( history.length > 1) { // Если в массиве больше одного значения:

			if (isCustomizationLeaving) {
				setTimeout(() => {
					history.pop() // удаляем последний элемент в массиве.
					console.log("isCustomizationLeaving true")
					setActivePanel(history[history.length - 1]) // Изменяем массив с иторией и меняем активную панель.
					console.log("panel changed to", history[history.length - 1], "\n", "activePanel:", activePanel)
				}, 500)
			} else {
				history.pop() // удаляем последний элемент в массиве.
				setActivePanel(history[history.length - 1]) // Изменяем массив с иторией и меняем активную панель.
				console.log("panel changed to", history[history.length - 1], "\n", "activePanel:", activePanel)
			}

			if (history[history.length - 1] === "profile") {
				isCustomizationLeaving = true
				setTimeout(() => isCustomizationLeaving = false, 500)
			}
		}
	}

	const updateUserBalances = async () => {
		const user = await getUserBalances(fetchedUser)
		setUserBalances(user)
		return user
	}

	const addTicket = () => {
		let locBalances = userBalances
		locBalances["tickets"]++
		setUserBalances(locBalances)
	}


	const modal = (
		<ModalRoot
			activeModal={activeModal}
			onClose={() => setActiveModal(null)}
		>
			<ModalPage
				id={'superFight'}
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
				<SuperFightModalContent
					closeModal={() => setActiveModal(null)}
					completeSnackBar={completeSnackBar}
					changeIsUserInSuperFight={() => userBalances["isUserInSuperFight"] = true}
					isUserInSuperFight={userBalances["isUserInSuperFight"]}
				/>
			</ModalPage>
			<ModalPage
				id={"aboutVkDonut"}
				settlingHeight={50}
				onClose={() => setActiveModal(null)}
				header={
					<ModalPageHeader
						right={
							<PanelHeaderButton onClick={() =>setActiveModal(null)}>
								<Icon24Dismiss />
							</PanelHeaderButton>
						}
					>
						Подписка
						{/*Подписки*/}
					</ModalPageHeader>
				}
			>
				<AboutVkDonutModalContent
					closeModal={() => setActiveModal(null)}
					completeSnackBar={completeSnackBar}
					errorSnackBar={errorSnackBar}
					updateUserBalances={updateUserBalances}
					/>
			</ModalPage>
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
				header="5 билетов за подписку"
				caption="Подпишись на официальное сообщество и получи 5 билетов"
				actions={[{
					title: 'Подписаться',
					mode: 'primary',
					action: () => {
						setActiveModal(null);
						bridge.send("VKWebAppJoinGroup", {"group_id": 206549924});
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
						bridge.send("VKWebAppShowNativeAds", {ad_format: "reward"})
							.then(async data => {
								console.log(data)
								if (data.result) {
									const result = await getTicket(fetchedUser)
									console.log(result)
									if (result.success) {
										addTicket()
										setActiveModal(null)
										// completeSnackBar("Билет зачислен")
									}
								} else if (data.no_ad_reason.toLowerCase() === "no ad" || data.no_ad_reason.toLowerCase() === "no ads" || data.error_reason.toLowerCase() === "no ad" || data.error_reason.toLowerCase() === "no ads") {
									setActiveModal(null)
									bridge.send("VKWebAppShowNativeAds", {ad_format: "preloader"})
										.then(async data => {
											if (data.result) {
												const result = await getTicket(fetchedUser)
												console.log(result)
												if (result.success) {
													addTicket()
													setActiveModal(null)
													// completeSnackBar("Билет зачислен")
												}
											} else if (data.no_ad_reason.toLowerCase() === "no ad" || data.no_ad_reason.toLowerCase() === "no ads" || data.error_reason.toLowerCase() === "no ad" || data.error_reason.toLowerCase() === "no ads") {
												setActiveModal(null)
												errorSnackBar("Не удалось получить билет. Закончилась реклама")
											} else {
												setActiveModal(null)
												errorSnackBar("Не известная ошибка. data: " + data)
											}
										})
										.catch((e) => {
											errorSnackBar("Не удалось получить билет. Закончилась реклама")
										})
								} else {
									setActiveModal(null)
									errorSnackBar("Не известная ошибка. data: " + data)
								}
							})
							.catch((e) => {
								console.log(e)
								setActiveModal(null)
								bridge.send("VKWebAppShowNativeAds", {ad_format: "preloader"})
									.then(async data => {
										if (data.result) {
											const result = await getTicket(fetchedUser)
											console.log(result)
											if (result.success) {
												addTicket()
												setActiveModal(null)
												// completeSnackBar("Билет зачислен")
											}
										} else if (data.no_ad_reason.toLowerCase() === "no ad" || data.no_ad_reason.toLowerCase() === "no ads" || data.error_reason.toLowerCase() === "no ad" || data.error_reason.toLowerCase() === "no ads") {
											setActiveModal(null)
											errorSnackBar("Не удалось получить билет. Закончилась реклама")
										} else {
											setActiveModal(null)
											errorSnackBar("Не известная ошибка. data: " + data)
										}
									})
									.catch((e) => {
										setActiveModal(null)
										errorSnackBar("Не удалось получить билет. Закончилась реклама")
								})
							})

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
				errorSnackBar={errorSnackBar}
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
				changeActiveModal={changeActiveModal}
				useBalances={userBalances}
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
							if (userBalances["achievements"].indexOf(7) === -1 && userBalances["fights"] >= 5) {
								changeActiveModal("ticketFromSubscribing")
							} else {
								changeActiveModal("ticketFromAd")
							}
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
			<ModalCard
				id={"fightFinished"}
				onClose={() => setActiveModal(null)}
				icon={<AnimatedErrorIcon/>}
				header="Бой уже закончился"
				caption="Создай или присоединись в другой"
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
				id={"successPromocodeActivation"}
				onClose={() => setActiveModal(null)}
				icon={<AnimatedDoneIcon/>}
				header="Промокод активирован"
				caption="Бонус уже зачислен"
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
				id={"erroredPromocodeActivation"}
				onClose={() => setActiveModal(null)}
				icon={<AnimatedErrorIcon/>}
				header="Ошибка активации"
				caption="Не удалось активировать промокод"
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
			<AchievementModal
				id={"achievementModal"}
				closeModal={() => setActiveModal(null)}
				data={achievementModalData}
				fetchedUser={fetchedUser} 
				completeSnackBar={completeSnackBar}
				userBalances={userBalances}
				changeActiveModal={changeActiveModal}
				updateUserRank={(newRank) => userBalances["user_rank"] = newRank}
				inviteReferrals={inviteReferrals}
			/>
			{/*<ProfileModal*/}
			{/*	id={"profileModal"}*/}
			{/*	changeActiveModal={changeActiveModal}*/}
			{/*	closeModal={() => setActiveModal(null)}*/}
			{/*	vk_id={userProfileVkId}*/}
			{/*/>*/}
			<ModalPage
				id={"profileModal"}
				onClose={() => setActiveModal(null)}
				header={
					<ModalPageHeader
						right={
							<PanelHeaderButton onClick={() => setActiveModal(null)}>
								<Icon24Dismiss />
							</PanelHeaderButton>
						}
					>
						Профиль
					</ModalPageHeader>
				}
				settlingHeight={100}
			>
				<ProfileModalContent closeModal={() => setActiveModal(null)} vk_id={userProfileVkId} changeActiveModal={changeActiveModal}/>
			</ModalPage>
		</ModalRoot>
	);

	function changeActiveModal (newActiveModal) {
		setActiveModal(newActiveModal)
	}

	function goToCreatingRoom () {
		// window.history.pushState( {panel: "creatingRoom"}, "creatingRoom" );
		// history.push("creatingRoom")
		setActiveView('creatingRoom')
	}

	function goToMainView () {
		setActiveView('main')
	}

	function goToMainViewHome () {
		setActivePanel('home')
		setActiveView('main')
		// setHistory(['home'])
	}

	function goToOffline () {
		setActiveView('offline')
	}

	function goToClearCache () {
		setActiveView('clearCache')
	}

	function goToEndFightView () {
		setActiveView("endFight")
	}

	async function goToEndFight (beatenPlayersColors) {
		beatenPlayers = beatenPlayersColors

		if (popout) {
			setPopout(null)
		}

		if (activePanel !== "rateFight" && userBalances["vk_donut"] === 0) {
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

	function inviteReferrals () {
		setPopout(
			<ActionSheet onClose={() => setPopout(null)}>
				<ActionSheetItem autoclose onClick={() => postShare(fetchedUser.id)} before={<Icon28NewsfeedOutline/>}>
					Опубликовать пост
				</ActionSheetItem>
				<ActionSheetItem autoclose onClick={() => refLinkCopy(fetchedUser.id)} before={<Icon28CopyOutline />}>
					Скопировать ссылку
				</ActionSheetItem>
				{osName === IOS && <ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
			</ActionSheet>
		)
	}

	function openAchievementModal (title, caption, isCompleted) {
		if (title === "Sub" && !isCompleted) {
			bridge.send("VKWebAppJoinGroup", {"group_id": 206549924});
		} else {
			setAchievementModalData([title, caption, isCompleted])
			setActiveModal('achievementModal')
		}
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
		console.log(text)
		setPopout(
			<Snackbar
				action="Закрыть"
				onActionClick={() => setPopout(null)}
				layout="horizontal"
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
		if (!window.navigator.onLine) {
			errorSnackBar("Интернет соединение потеряно")
			return
		}

		if (!socket.connected) {
			socket.connect()
		}

		isOfflineNeedShowInSnackBar = false

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

	function goToAchievements () {
		setActiveView("achievements")
	}

	function goToHistory () {
		setActiveView("history")
	}

	function goToTemporaryBanned () {
		temporaryBannedOurs = 24
		setActiveView('temporaryBanned')
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
				<View id='main' history={history} onSwipeBack={goBack} activePanel={activePanel} popout={popout} modal={modal}>
					<Intro id='intro_1' panel_go={panel_go} endIntro={endIntro} changeActiveModal={changeActiveModal}/>
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
						goIsolated={goIsolated2}
						online={online}
						goToHistory={goToHistory}
						goToAchievements={goToAchievements}
					/>
					<WaitingForStart goIsolated={goIsolated2} id={'waitingForStart'} go={go} are_notifications_enabled={userBalances["are_notifications_enabled"]} secretId={secretId} updateNotifications={updateNotifications} fetchedUser={fetchedUser} needUsersInFight={needUsersInFight} />
					<WaitingForTheFight id={"waitingForTheFight"} startCount={startCount} secretId={secretId} />
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
						userBalances={userBalances}
						screenSpinnerOn={screenSpinnerOn}
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
						userBalances={userBalances}
						usersInFight={usersInFight}
						changePopout={(newPopout) => setPopout(newPopout) }
						startGameTimer={startGameTimer}
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
								  goIsolated={goIsolated2}
					/>
				</View>
				<View activePanel={activePanel} id="endFight" popout={popout}>
					<RateFight id={'rateFight'} goIsolated={goIsolated2} secretId={secretId} screenSpinnerOff={screenSpinnerOff} screenSpinnerOn={screenSpinnerOn} fetchedUser={fetchedUser} />
					<FightResults
						id={'fightResults'}
						secretId={secretId}
						finishData={finishData}
						updateUserBalances={updateUserBalances}
						beatenPlayersColors={beatenPlayers}
						fetchedUser={fetchedUser}
						goToMainView={goToMainViewHome}
						fightResultsSharing={fightResultsSharing}
						goToTemporaryBanned={goToTemporaryBanned}
						resetSecretId={() => secretId = ""}
						resetBeatenPlayers={() => beatenPlayers = ""}
					/>
				</View>
				<View activePanel={"offline"} id="offline" >
					<Offline id={'offline'} screenSpinnerOff={screenSpinnerOff} changePopou={(newPopout) => setPopout(newPopout)} isLoadingInitData={isLoadingInitData} popout={popout} goToMainView={goToMainView} goToEndFightView={goToEndFightView} activePanel={activePanel}/>
				</View>
				<View activePanel={"clearCache"} id="clearCache" >
					<ClearCache id='clearCache'/>
				</View>
				<View activePanel={"alreadyConnected"} id="alreadyConnected" popout={popout}>
					<AlreadyConnected id='alreadyConnected'/>
				</View>
				<View activePanel={"banned"} id="banned" popout={popout}>
					<Banned id='banned'/>
				</View>
				<View activePanel={"temporaryBanned"} id="temporaryBanned" popout={popout}>
					<TemporaryBanned id='temporaryBanned' oursForUnban={temporaryBannedOurs}/>
				</View>
				<View activePanel={"achievements"} id="achievements" popout={popout} modal={modal}>
					<Achievements id='achievements' fetchedUser={fetchedUser} openAchievementModal={openAchievementModal} goToMainView={goToMainView} />
				</View>
				<View activePanel={"history"} id="history" popout={popout} modal={modal}>
					<History id='history' fetchedUser={fetchedUser} goToMainView={goToMainView} />
				</View>
			</Root>
		</ConfigProvider>
	);
}

export default App;

