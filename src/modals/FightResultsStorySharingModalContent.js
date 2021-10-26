import React, {useState, useEffect} from 'react';
import {
    Card,
    CardGrid,
    Button,
    FixedLayout,
    FormLayout,
    FormLayoutGroup,
    Radio,
    Caption, Spinner
} from "@vkontakte/vkui";
import { Icon28SunOutline, Icon28MoonOutline } from '@vkontakte/icons';
import {fightResultsStoryShare, drawFightResultsStory} from "../sharing/sharing";
import "../views/endFight/FightResults.css"


export default function FightResultsStoryModal({closeModal, beatenPlayers, avaUrl, screenSpinnerOff, screenSpinnerOn, completeSnackBar, updateUserBalances}) {
    const [theme, setTheme] = useState("bright")
    const [phrase, setPhrase] = useState(0)
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {

        setSpinner(true)
        setTimeout(() => {
            setSpinner(false);
            drawFightResultsStory(theme, phrase, beatenPlayers, avaUrl);
        }, 1500)

    }, [theme, phrase])

    return (
        <FormLayout id={"story_settings"}>
            <FormLayoutGroup top="Цвет фона">
                <CardGrid>
                    <Card size="m" onClick={() => setTheme("bright")} style={theme === "bright" ? {} : {backgroundColor: "var(--background_content)"}} >
                        <div className={"userChose"} >
                            <Icon28SunOutline style={theme === "bright" ? {color: "var(--accent)"} : {color: "var(--icon_secondary)"}} />
                            <Caption style={{color: "var(--text_secondary)", marginTop: 8}} level="1"
                                     weight="regular">Светлый</Caption>
                        </div>
                    </Card>
                    <Card size="m" onClick={() => setTheme("dark")} style={theme === "dark" ? {} : {backgroundColor: "var(--background_content)"}}>
                        <div className={"userChose"} >
                            <Icon28MoonOutline style={theme === "dark" ? {color: "var(--accent)"} : {color: "var(--icon_secondary)"}} />
                            <Caption style={{color: "var(--text_secondary)", marginTop: 8}} level="1"
                                     weight="regular">Темный</Caption>
                        </div>
                    </Card>
                </CardGrid>
            </FormLayoutGroup>
            <FormLayoutGroup top="Фраза">
                <Radio name="time" onChange={(e) => setPhrase(e.target.value)} value={0} defaultChecked >
                    Нубики были слиты
                </Radio>
                <Radio name="time" onChange={(e) => setPhrase(e.target.value)} value={1} >
                    Мои любимые соперники ❤
                </Radio>
                <Radio name="time" onChange={(e) => setPhrase(e.target.value)} value={2}>
                    Король фишек на месте
                </Radio>
            </FormLayoutGroup>
            <FormLayoutGroup top="Предпросмотр" >
                <div style={{height: window.innerWidth * 1.28, overflow: "hidden", padding: "0 6px"}} >
                    {spinner
                        ?
                        <div className={"story_spinner"}>
                            <Spinner size="medium" />
                        </div>
                        :
                        <canvas id="fight_results" style={{width: "100%", borderRadius: 24}}/>
                    }

                </div>
            </FormLayoutGroup>
            <FixedLayout vertical="bottom" className={"fight_results_button_container"} >
                <Button disabled={spinner} size="xl" onClick={() => {
                    screenSpinnerOn();
                    fightResultsStoryShare(screenSpinnerOff, completeSnackBar, closeModal, updateUserBalances)
                }}
                >Продолжить</Button>
            </FixedLayout>

        </FormLayout>
    )
}