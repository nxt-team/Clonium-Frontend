import React from 'react';
import {platform, IOS, PanelHeaderSimple, Card, Div, CardGrid, FixedLayout, Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Banner from '@vkontakte/vkui/dist/components/Banner/Banner';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import './home.css';
import './BannerIntro.css'
import Icon20TicketOutline from '@vkontakte/icons/dist/20/ticket_outline';
import Icon24CupOutline from '@vkontakte/icons/dist/24/cup_outline';
import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon28ChatsOutline from '@vkontakte/icons/dist/28/chats_outline';
import Icon20NotificationOutline from '@vkontakte/icons/dist/20/notification_outline';
import Icon28ChevronRightOutline from '@vkontakte/icons/dist/28/chevron_right_outline';
import Icon28BombOutline from '@vkontakte/icons/dist/28/bomb_outline';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';
const osName = platform();

function shuffle(array) {
	return array.sort(() => Math.random() - 0.5);
}

const gal = [
	<Banner
		style={{ margin: 0, width: 200}}
		before={<Icon28ChatsOutline width={34} height={34}/>}
		header={<span>Беседа</span>}
		subheader={<span>поболтай с другими <br/> игроками</span>}
	/>,
	<Banner
		style={{ margin: 0, width: 200}}
		before={<Icon28Users3Outline width={34} height={34}/>}
		header={<span>Сообщество</span>}
		subheader={<span>будь в курсе нововстей</span>}
	/>,
	<Banner
		style={{ margin: 0, width: 200}}
		before={<Icon28InfoOutline width={34} height={34}/>}
		header={<span>Спрвка</span>}
		subheader={<span>об игре, правилах и нюансах</span>}
	/>,
	<Banner
		style={{ margin: 0, width: 200, height: 80}}
		before={<Icon28BombOutline width={34} height={34}/>}
		header={<span>Подписка</span>}
		subheader={<span>специальные возможности</span>}
	/>
]

const Home = props => (
	<Panel id={props.id}  >
		<PanelHeader
			separator={false}
		>
			Главная
		</PanelHeader>
		<div>
			<div className={'box'}>
				<Banner
					onClick={props.go}
					data-to="profile"
					before={<Avatar size={72} src={props.fetchedUser.photo_200} />}
					header={<div style={{display: "flex"}}> <div> <Icon20TicketOutline width={16} height={16} style={{marginRight: 4}}/> <Icon24FavoriteOutline width={16} height={16} style={{marginTop: 4}} /> </div> <span>5 билетов <br/> 145 опыта </span> </div>}
					subheader={<span>5 побед 10 поражений <br/> 123 место в топе</span>}
					asideMode="expand"
				/>
			</div>
			<div className={'box2'}>
				<p> 10 online</p>
				<Button size="xl" onClick={props.go} data-to="startingGame" className={"button"} before={<Icon28ChevronRightOutline/>}>Играть</Button>
				<div style={{display: "flex",  justifyContent: 'center', marginTop: 6}}>
					<Button size="m" mode={'outline'} stretched ><Icon20NotificationOutline/></Button>
					<Button size="m" mode={'outline'} stretched onClick={props.go} data-to="top" style={{marginLeft: 6}} after={<Icon24CupOutline width={20} height={20} />}> Топ</Button>
				</div>
			</div>
		</div>


		<FixedLayout
			vertical="bottom"
		>
			<Group>
				<Gallery

					slideWidth="custom"
				>
					{shuffle(gal)}
				</Gallery>
			</Group>
		</FixedLayout>


	</Panel>
);

export default Home;
