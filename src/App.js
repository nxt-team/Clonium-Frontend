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
import TicketAnimation from './components/TicketAnimation'
import { Icon56Users3Outline } from '@vkontakte/icons';
import NoTickets from './views/main/NoTickets'
import WaitingForStart from './views/main/WaitingForStart'
import Customization from './views/main/Customization'
import CreatingRoom from './views/creatingRoom/CreatingRoom'
import imagenation from "imagenation";
import RateFight from './views/rateFight/RateFight'

import {
	Div,
	ModalPage,
	ModalRoot,
	Root,
	Spinner,
	HorizontalScroll, ModalCard, File, Input
} from "@vkontakte/vkui"
import Intro from "./views/main/Intro";

const startupParameters = new URLSearchParams(window.location.search.replace('?', ''))

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState({id: 1, first_name: "Загрузка", last_name: ""});
	const [popout, setPopout] = useState(null);
	const [activeModal, setActiveModal] = useState(null)
	const [activeView, setActiveView] = useState('main')
	const [imgLink, setImgLink] = useState(null)

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			} else if (type === 'VKWebAppGetUserInfoResult') {
				setUser(data);
				console.log('up')
			} else {
				console.log(type, data)
			}
		});
		async function fetchData() {
			// setActivePanel('intro_1')
			console.log(window.location.host)
			// TODO: добавить метод инициализации

		}
		fetchData();
	}, []);

	const go = e => {
		if (e.currentTarget.dataset.to === 'game') {
			setPopout(<TicketAnimation/>)
			setTimeout(() => setPopout(null), 2700)
		}
		setActivePanel(e.currentTarget.dataset.to);
	};

	const panel_go = panel => {
		setActivePanel(panel)
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
			<ModalPage
				id="aboutVkDonut"
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
						VK Donut
					</ModalPageHeader>
				}
			>
				<Div>
					<Text weight="regular" style={{ marginBottom: 16 }}>
						Оформи подписку Vk Donut и получи следующее преимущества: <br/>
						<br/>
						• Возможность выбора аватарки для фишки <br/>
						• Подсветка ходов соперников (видно кто куда тыкает) <br/>
						• 5 билетов в день <br/>
						• Звездочка рядом с именем в топе <br/>
						• Никакой рекламы <br/>
					</Text>
					<Button size="xl">Оформить</Button>
				</Div>
			</ModalPage>
			<ModalCard
				id={"ticketFromAddToFavorites"}
				onClose={() => setActiveModal(null)}
				icon={<Icon56FavoriteOutline />}
				header="Получи билет, добавив мини приложения в избранные"
				caption="Билеты нужны для игры. Но они у тебя закончались :("
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
				header="Получи билет, подписавшись на наш паблик"
				caption="Билеты нужны для игры. Но они у тебя закончались :("
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
				header="Получи билет за просмотр рекламы"
				caption="Билеты нужны для игры. Но они у тебя закончались :("
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
				actions={[{
					title: 'Активировать',
					mode: 'primary',
					action: () => {
						setActiveModal(null);
					}
				}]}>
					<Input />
			</ModalCard>
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


	return (
		<Root activeView={activeView} >
			<View id='main' activePanel={activePanel} popout={popout} modal={modal}>
				<Achievements id='achievements' go={go} />
				<History id='history' go={go} />
				<Home id={'home'} go={go} goToCreatingRoom={goToCreatingRoom} fetchedUser={fetchedUser} />
				<Game id={'game'} go={go} fetchedUser={fetchedUser} startupParameters={startupParameters} />
				<Profile id={'profile'} changeActiveModal={changeActiveModal} go={go} fetchedUser={fetchedUser}/>
				<Top go={go} id='top' changeActiveModal={changeActiveModal} fetchedUser={fetchedUser}/>
				<WaitingForStart id='waitingForStart' go={go} />
				<NoTickets id='noTickets' go={go} changeActiveModal={changeActiveModal} />
				<Customization id='customization' go={go} changeActiveModal={changeActiveModal}/>
				<Intro id='intro_1' panel_go={panel_go}/>
			</View>
			<View activePanel={"creatingRoom"} id="creatingRoom">
				<CreatingRoom id={'creatingRoom'} goToMainView={goToMainView} />
			</View>
			<View activePanel={"rateFight"} id="rateFight">
				<RateFight id={'rateFight'} goToMainView={goToMainView} />
			</View>
		</Root>
	);
}

export default App;

