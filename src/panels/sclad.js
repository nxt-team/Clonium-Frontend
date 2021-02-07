import Banner from "@vkontakte/vkui/dist/components/Banner/Banner";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Title from "@vkontakte/vkui/dist/components/Typography/Title/Title";
import {Card, CardScroll, Div, Separator, SimpleCell} from "@vkontakte/vkui";
import Icon24FavoriteOutline from "@vkontakte/icons/dist/24/favorite_outline";
import Caption from "@vkontakte/vkui/dist/components/Typography/Caption/Caption";
import Icon28TicketOutline from "@vkontakte/icons/dist/28/ticket_outline";
import Icon36GameOutline from "@vkontakte/icons/dist/36/game_outline";
import Icon28ArrowUpOutline from "@vkontakte/icons/dist/28/arrow_up_outline";
import Icon28ArrowDownOutline from "@vkontakte/icons/dist/28/arrow_down_outline";
import {Icon24ChevronCompactRight} from "@vkontakte/icons";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";

<Banner
    onClick={props.go}
    data-to="profile"
    header={
        <div style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
            <Avatar size={64} src={props.fetchedUser.photo_200} />
            <Title style={{marginTop: 8}} level="1" weight="semibold">{props.fetchedUser.first_name + ' ' + props.fetchedUser.last_name}</Title>
        </div>}
    subheader={
        <CardScroll style={{marginTop: 12}}>
            <Card  style={{backgroundColor: "var(--background_content)"}} >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div style={{  justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 156,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"}} >
                        <Icon24FavoriteOutline width={32} height={32}/>
                        <div
                            style={{ justifyContent: 'center',
                                display: "flex",
                                marginLeft: 6,
                                flexDirection: "column"}}
                        >
                            <Caption  level="1" weight="regular" >267</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >опыта набрано</Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card  style={{backgroundColor: "var(--background_content)"}} >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div style={{  justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 128,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"}} >
                        <Icon28TicketOutline width={32} height={32}/>
                        <div
                            style={{ justifyContent: 'center',
                                display: "flex",
                                marginLeft: 6,
                                flexDirection: "column"}}
                        >
                            <Caption  level="1" weight="regular" >13</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >билетов</Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card  style={{backgroundColor: "var(--background_content)"}}  >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div style={{ justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 144,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"}} >
                        <Icon36GameOutline/>
                        <div
                            style={{ justifyContent: 'center',
                                display: "flex",
                                marginLeft: 6,
                                flexDirection: "column"}}
                        >
                            <Caption  level="1" weight="regular" >180</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >игр сыграно</Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card style={{backgroundColor: "var(--background_content)"}} >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div style={{  justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 128,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"}} >
                        <Icon28ArrowUpOutline width={36} height={36}/>
                        <div
                            style={{ justifyContent: 'center',
                                display: "flex",
                                marginLeft: 6,
                                flexDirection: "column"}}
                        >
                            <Caption  level="1" weight="regular" >4</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >победы</Caption>
                        </div>


                    </div>
                </motion.div>
            </Card>
            <Card  style={{backgroundColor: "var(--background_content)"}} >
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <div style={{ justifyContent: 'center',
                        alignItems: "center",
                        display: "flex",
                        width: 144,
                        height: 44,
                        padding: 4,
                        flexDirection: "row"}} >
                        <Icon28ArrowDownOutline width={36} height={36}/>
                        <div
                            style={{ justifyContent: 'center',
                                display: "flex",
                                marginLeft: 6,
                                flexDirection: "column"}}
                        >
                            <Caption  level="1" weight="regular" >6</Caption>
                            <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >поражений</Caption>
                        </div>

                    </div>
                </motion.div>
            </Card>
        </CardScroll>
    }
    asideMode="expand"
/>
<Div>
    <div className={'profile_preview'}>
        <div style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
            <Avatar size={64} src={props.fetchedUser.photo_200} />
            <Title style={{marginTop: 8}} level="1" weight="semibold">{props.fetchedUser.first_name + ' ' + props.fetchedUser.last_name}</Title>
        </div>
        <div style={{marginTop: 12, marginBottom: 10}} >
            <CardScroll >
                <Card  style={{backgroundColor: "var(--background_content)"}} >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div style={{  justifyContent: 'center',
                            alignItems: "center",
                            display: "flex",
                            width: 156,
                            height: 44,
                            padding: 4,
                            flexDirection: "row"}} >
                            <Icon24FavoriteOutline width={32} height={32}/>
                            <div
                                style={{ justifyContent: 'center',
                                    display: "flex",
                                    marginLeft: 6,
                                    flexDirection: "column"}}
                            >
                                <Caption  level="1" weight="regular" >267</Caption>
                                <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >опыта набрано</Caption>
                            </div>


                        </div>
                    </motion.div>
                </Card>
                <Card  style={{backgroundColor: "var(--background_content)"}} >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div style={{  justifyContent: 'center',
                            alignItems: "center",
                            display: "flex",
                            width: 128,
                            height: 44,
                            padding: 4,
                            flexDirection: "row"}} >
                            <Icon28TicketOutline width={32} height={32}/>
                            <div
                                style={{ justifyContent: 'center',
                                    display: "flex",
                                    marginLeft: 6,
                                    flexDirection: "column"}}
                            >
                                <Caption  level="1" weight="regular" >13</Caption>
                                <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >билетов</Caption>
                            </div>


                        </div>
                    </motion.div>
                </Card>
                <Card  style={{backgroundColor: "var(--background_content)"}}  >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div style={{ justifyContent: 'center',
                            alignItems: "center",
                            display: "flex",
                            width: 144,
                            height: 44,
                            padding: 4,
                            flexDirection: "row"}} >
                            <Icon36GameOutline/>
                            <div
                                style={{ justifyContent: 'center',
                                    display: "flex",
                                    marginLeft: 6,
                                    flexDirection: "column"}}
                            >
                                <Caption  level="1" weight="regular" >180</Caption>
                                <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >игр сыграно</Caption>
                            </div>


                        </div>
                    </motion.div>
                </Card>
                <Card style={{backgroundColor: "var(--background_content)"}} >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div style={{  justifyContent: 'center',
                            alignItems: "center",
                            display: "flex",
                            width: 128,
                            height: 44,
                            padding: 4,
                            flexDirection: "row"}} >
                            <Icon28ArrowUpOutline width={36} height={36}/>
                            <div
                                style={{ justifyContent: 'center',
                                    display: "flex",
                                    marginLeft: 6,
                                    flexDirection: "column"}}
                            >
                                <Caption  level="1" weight="regular" >4</Caption>
                                <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >победы</Caption>
                            </div>


                        </div>
                    </motion.div>
                </Card>
                <Card  style={{backgroundColor: "var(--background_content)"}} >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div style={{ justifyContent: 'center',
                            alignItems: "center",
                            display: "flex",
                            width: 144,
                            height: 44,
                            padding: 4,
                            flexDirection: "row"}} >
                            <Icon28ArrowDownOutline width={36} height={36}/>
                            <div
                                style={{ justifyContent: 'center',
                                    display: "flex",
                                    marginLeft: 6,
                                    flexDirection: "column"}}
                            >
                                <Caption  level="1" weight="regular" >6</Caption>
                                <Caption style={{color: "var(--text_secondary)"}} level="3" weight="regular" >поражений</Caption>
                            </div>

                        </div>
                    </motion.div>
                </Card>
            </CardScroll>
        </div>
        <Separator wide={false}/>
        <SimpleCell >
            <div style={{display: "flex", justifyContent: "center"}} >
                <Title level="3" weight="regular">Профиль</Title>
                <Icon24ChevronCompactRight style={{color: "var(--text_primary)", marginLeft: 6, marginTop: 0}} />
            </div>
        </SimpleCell>
    </div>
</Div>