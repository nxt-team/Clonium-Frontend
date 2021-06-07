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
import {init} from "./api/api";
const osName = platform();
const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

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

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			// if (type === 'VKWebAppUpdateConfig') {
			// 	const schemeAttribute = document.createAttribute('scheme');
			// 	schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
			// 	document.body.attributes.setNamedItem(schemeAttribute);
			// 	// setScheme(data.scheme)
			// }
		});
		async function fetchData() {
			let user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user)
			user = await init(user)
			console.log(user)
			if (user["status"] === "success") {
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


	const onChange_originalFile = async (e) => {
		setImgLink('loading')
		let image = e.target.files;
		if (image && image.length > 0) {
			if ((image[0].type.indexOf("image/") + 1) !== 0) {
				try {
					let img = await imagenation(image[0], 1500);
					if (img) {
						console.log('everything is okay')
						// if (token === null) {
						//     token = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7622545, "scope": "photos"});
						//     console.log('result', token["access_token"])
						// }

						// const linkForUpload = await bridge.send("VKWebAppCallAPIMethod", {"method": "photos.getUploadServer", "request_id": "32test", "params": {"album_id": 278829270, "group_id": 201110393, "v":"5.126", "access_token": token["access_token"]}});
						// console.log(linkForUpload)


						const fd = new FormData()
						fd.append('file', image[0], 'image')
						// fd.append('url', JSON.stringify(linkForUpload["response"]["upload_url"]))
						var request = new XMLHttpRequest()

						request.open('POST', "https://gamebot.site:3000/uploadPhoto", false);
						request.onload = async function () {
							if (request.status >= 200 && request.status < 400) {
								var data = JSON.parse(request.responseText)
								console.log(data["result"])
								let sizeLetter = 'w'
								let url = null

								while (url === null) {
									for (let size of data["result"]) {
										if (size["type"] === sizeLetter) {
											url = size["url"]
										}
									}

									if (sizeLetter === 'w') {
										sizeLetter = 'z'
									} else if (sizeLetter === 'z') {
										sizeLetter = 'y'
									} else if (sizeLetter === 'y') {
										sizeLetter = 'x'
									} else if (sizeLetter === 'x') {
										sizeLetter = 'm'
									} else {
										sizeLetter = 's'
									}
								}

								setImgLink(url)
								changeActiveModal("showImgPlayIcon")

							} else {
								console.log('err2')
							}
						}
						console.log(fd)
						request.send(fd)


					}
					else {
						alert(<><h2>Упс, файл не удалось прочитать</h2><p>Для продолжения вы должны выбрать корректный файл формата JPEG, PNG, или GIF!</p></>);
					}
				}
				catch (error) {
					console.log(error)
					alert(<><h2>Упс, файл не удалось прочитать</h2><p>Для продолжения вы должны выбрать корректный файл формата JPEG, PNG, или GIF!</p></>);
				}
			}
			else {
				alert(<><h2>Ошибка в выборе файла</h2><p>Для продолжения вы должны выбрать файл формата JPEG, PNG, или GIF!</p></>);
			}
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
			<ModalCard
				id={"uploadingPhoto"}
				onClose={() => setActiveModal(null)}
				icon={<Icon56GalleryOutline />}
				header="Загрузи фотографию"
				caption="Смени аватарку фишки на любую картинку"
			>
				<File
					accept="image/*"
					mode="primary"
					controlSize="xl"
					disabled={imgLink === "loading"}
					style={{marginTop: 16}}
					onChange={(e) => onChange_originalFile(e)}
				>
					{imgLink === "loading" ? <Spinner size="regular" /> : "Загрузить"}
				</File>
			</ModalCard>
			<ModalCard
				id={"showImgPlayIcon"}
				onClose={() => setActiveModal(null)}
				icon={
					<svg
						style={{color: "var(--text_primary)"}}
						className="cont"
						viewBox="0 0 38 38"
						fill="none"
						width="76"
						height="76"
						xmlns="http://www.w3.org/2000/svg"
					>
						<defs>
							<pattern id="img1" patternUnits="userSpaceOnUse" width="100%" height="100%">
								<image className='twombly' xlinkHref={imgLink}
									   x="0" y="0"/>
							</pattern>

						</defs>
						<circle cx="19" cy="19" r="18" fill="url(#img1)" stroke="currentColor" stroke-width="2"/>
						<circle cx="19" cy="19" r="3" fill="#F5F5F5" stroke="#232324"/>
					</svg>
				}
				header="Твоя фишка"
				caption="Теперь так будут выглядить твои фишки во время игры"
				actions={[{
					title: 'Хорошо',
					mode: 'primary',
					action: () => {
						setActiveModal(null);
					}
				}]}
			>
			</ModalCard>
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
					<Home id={'home'} go={go} changeActiveModal={changeActiveModal} goToCreatingRoom={goToCreatingRoom} fetchedUser={fetchedUser} userBalances={userBalances} />
					<Game id={'game'}  changeActiveModal={changeActiveModal}  startupParameters={startupParameters} goToEndFight={goToEndFight} mapName={'GridSize8'} />
					<Profile id={'profile'} changeActiveModal={changeActiveModal} go={go} fetchedUser={fetchedUser} userBalances={userBalances}/>
					<Top go={go} id='top' changeActiveModal={changeActiveModal} fetchedUser={fetchedUser}/>
					<WaitingForStart id='waitingForStart' go={go} />
					<NoTickets id='noTickets' go={go} changeActiveModal={changeActiveModal} />
					<Customization id='customization' go={go} changeActiveModal={changeActiveModal}/>
					<Intro id='intro_1' panel_go={panel_go} changeActiveModal={changeActiveModal}/>
					<UserProfile id="userProfile" />
				</View>
				<View activePanel={"creatingRoom"} id="creatingRoom">
					<CreatingRoom id={'creatingRoom'} goToMainView={goToMainView} fetchedUser={fetchedUser} />
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

