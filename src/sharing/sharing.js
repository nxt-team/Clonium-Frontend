import React from 'react'
import bridge from '@vkontakte/vk-bridge';
import {getThreeTicket, getThreeTickets, maintainingStat} from "../api/api";

export const refLinkShare = (userId) => {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/clonium#invite=" + userId})
}

export const refLinkCopy = (userId) => {
    bridge.send("VKWebAppCopyText", {"text": "https://vk.com/clonium#invite=" + userId})
}

export const fightInviteShare = (fightId) => {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/clonium#fight=" + fightId})
}

export const copyFightInvite = (fightId) => {
    bridge.send("VKWebAppCopyText", {"text": "Присоединяйся в бой \nhttps://vk.com/clonium#fight=" + fightId});
}

export const postShare = (userId) => {
    const message = "Сразимся? " + "\n" + "\n" + "vk.com/clonium#invite=" + userId
    bridge.send("VKWebAppShowWallPostBox", {"message": message, "attachments": "photo-199025669_457239075"})
}

export const fightResultsPostShare = (userId, place, players) => {
    let message
    if (players.length === 1) {
        message = "Я обыграл 1 игрока"
    }  else {
        message = "Я обыграл " + players.length + " игроков"
    }
    for (let item of players) {
        message += "\n"
        message += "- " + "@id" + item["vk_id"] + "(" + item["username"] + ")"
    }
    message += "\nи занял " + place + " место 😎"

    message += "\n \nСразимся в клоний? \n " + "vk.com/clonium#invite=" + userId

    bridge.send("VKWebAppShowWallPostBox", {"message": message, "attachments": "photo-199025669_457239076"})
}

export const drawFightResultsStory = (theme, phrase, beatenPlayers, avaUrl) => {

    function convertName (name) {
        return name.split(" ")[0] + " " + name.split(" ")[1][0] + "."
    }

    if (document.getElementById("fight_results")) {
        console.log("draw")
        const canvas = document.getElementById("fight_results");
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');

        const ava = new Image();
        if (avaUrl === "https://vk.com/images/camera_200.png") {
            ava.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
        } else {
            ava.src = avaUrl;
        }

        ava.crossOrigin = 'anonymous';
        ava.onload = function () {
            ctx.drawImage(ava, 405, 413, 272, 272);
            if (beatenPlayers.length === 1) {
                const bpava1 = new Image()
                if (beatenPlayers[0]["avatar"] === "https://vk.com/images/camera_200.png") {
                    bpava1.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
                } else {
                    bpava1.src = beatenPlayers[0]["avatar"];
                }
                bpava1.crossOrigin = 'anonymous';
                bpava1.onload = function () {
                    ctx.drawImage(bpava1, 457, 944, 166, 166);
                }

                const mask = new Image()
                console.log(phrase)
                if (phrase == 0) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111390414819368/Subtract-12.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111469246767115/Subtract-15.png"
                    }
                } else if (phrase == 1) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111466818248734/Subtract-17.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111472593825872/Subtract-16.png"
                    }
                } else if (phrase == 2) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111403220037652/Subtract-13.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902120572606107679/Subtract-14.png"
                    }
                }

                mask.crossOrigin = 'anonymous';
                mask.onload = function () {
                    ctx.drawImage(mask, 0, 0, 1080, 1920);
                    ctx.textAlign = "center"
                    ctx.font = "48px Open Sans";
                    if (theme === "bright") {
                        ctx.fillStyle = "#232324"
                    } else {
                        ctx.fillStyle = "#D9D9DB"
                    }

                    ctx.fillText(convertName(beatenPlayers[0]["username"]), 540, 1174)
                    ctx.save()
                }

            } else if (beatenPlayers.length === 2) {

                const bpava1 = new Image()
                if (beatenPlayers[0]["avatar"] === "https://vk.com/images/camera_200.png") {
                    bpava1.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
                } else {
                    bpava1.src = beatenPlayers[0]["avatar"];
                }
                bpava1.crossOrigin = 'anonymous';
                bpava1.onload = function () {
                    ctx.drawImage(bpava1, 211, 944, 166, 166);
                }

                const bpava2 = new Image()
                if (beatenPlayers[1]["avatar"] === "https://vk.com/images/camera_200.png") {
                    bpava2.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
                } else {
                    bpava2.src = beatenPlayers[1]["avatar"];
                }
                bpava2.crossOrigin = 'anonymous';
                bpava2.onload = function () {
                    ctx.drawImage(bpava1, 705, 944, 166, 166);
                }

                const mask = new Image()
                console.log(phrase)
                if (phrase == 0) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261867861405766/Subtract-1.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261880326864946/Subtract-5.png"
                    }
                } else if (phrase == 1) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261870545743932/Subtract-2.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261876937871370/Subtract-4.png"
                    }
                } else if (phrase == 2) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261865504194580/Subtract.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261874094112838/Subtract-3.png"
                    }
                }

                mask.crossOrigin = 'anonymous';
                mask.onload = function () {
                    ctx.drawImage(mask, 0, 0, 1080, 1920);
                    ctx.textAlign = "center"
                    ctx.font = "48px Open Sans";
                    if (theme === "bright") {
                        ctx.fillStyle = "#232324"
                    } else {
                        ctx.fillStyle = "#D9D9DB"
                    }

                    ctx.fillText(convertName(beatenPlayers[0]["username"]), 294, 1174)
                    ctx.fillText(convertName(beatenPlayers[1]["username"]), 788, 1174)
                    ctx.save()
                }
            } else if (beatenPlayers.length === 3) {

                const bpava1 = new Image()
                if (beatenPlayers[0]["avatar"] === "https://vk.com/images/camera_200.png") {
                    bpava1.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
                } else {
                    bpava1.src = beatenPlayers[0]["avatar"];
                }
                bpava1.crossOrigin = 'anonymous';
                bpava1.onload = function () {
                    ctx.drawImage(bpava1, 119, 980, 134, 134);
                }

                const bpava2 = new Image()
                if (beatenPlayers[1]["avatar"] === "https://vk.com/images/camera_200.png") {
                    bpava2.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
                } else {
                    bpava2.src = beatenPlayers[1]["avatar"];
                }
                bpava2.crossOrigin = 'anonymous';
                bpava2.onload = function () {
                    ctx.drawImage(bpava1, 473, 980, 134, 134);
                }

                const bpava3 = new Image()
                if (beatenPlayers[2]["avatar"] === "https://vk.com/images/camera_200.png") {
                    bpava3.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
                } else {
                    bpava3.src = beatenPlayers[2]["avatar"];
                }
                bpava3.crossOrigin = 'anonymous';
                bpava3.onload = function () {
                    ctx.drawImage(bpava1, 827, 980, 134, 134);
                }

                const mask = new Image()
                console.log(phrase)
                if (phrase == 0) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298350416703538/Subtract-6.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298354984300625/Subtract-10.png"
                    }
                } else if (phrase == 1) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298351142318150/Subtract-8.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298355638599680/Subtract-11.png"
                    }
                } else if (phrase == 2) {
                    if (theme === "bright") {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298348218888263/Subtract-7.png"
                    } else {
                        mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298353457573958/Subtract-9.png"
                    }
                }

                mask.crossOrigin = 'anonymous';
                mask.onload = function () {
                    ctx.drawImage(mask, 0, 0, 1080, 1920);
                    ctx.textAlign = "center"
                    ctx.font = "36px Open Sans";
                    if (theme === "bright") {
                        ctx.fillStyle = "#232324"
                    } else {
                        ctx.fillStyle = "#D9D9DB"
                    }

                    ctx.fillText(convertName(beatenPlayers[0]["username"]), 186, 1174)
                    ctx.fillText(convertName(beatenPlayers[1]["username"]), 540, 1174)
                    ctx.fillText(convertName(beatenPlayers[2]["username"]), 894, 1174)
                    ctx.save()
                }
            }

        }
    }


}

export const fightResultsStoryShare = (screenSpinnerOff, completeSnackBar, closeModal, updateUserBalances) => {
    const canvas = document.getElementById("fight_results");

    canvas.toBlob((imgBlob) => {
        const fd = new FormData()
        fd.append('file', imgBlob, 'image')
        // fd.append('url', JSON.stringify(linkForUpload["response"]["upload_url"]))
        var request = new XMLHttpRequest()

        request.open('POST', "https://pipeweb.ru/api/uploadPhoto", false);
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

                const inviteUrl = "https://vk.com/clonium?ref=catalog_shopping" // #invite=" + userId
                const attachment = {
                    text: 'open',
                    type: 'url',
                    url: inviteUrl,
                };
                console.log(url)
                screenSpinnerOff()
                bridge.send("VKWebAppShowStoryBox",
                    { "background_type" : "image", "url" : url, "attachment": attachment, "locked": true})
                    .then(async data => {
                        if (data.result === true) {
                            closeModal()
                            await maintainingStat("even_sharing")
                            await getThreeTickets()
                            updateUserBalances()
                            setTimeout(() => completeSnackBar("3 билета зачислены"), 1000)
                            console.log("a")
                        }
                    })

            } else {
                console.log('err2')
            }
        }
        console.log(fd)
        request.send(fd)
    } , 'image/jpeg', 100)
}

export function fightResultsNativeStoryShare (
    screenSpinnerOff,
    completeSnackBar,
    updateUserBalances,
    beatenPlayers,
    avaUrl,
    theme,
    phrase
) {

    function convertName (name) {
        return name.split(" ")[0] + " " + name.split(" ")[1][0] + "."
    }

    function loadStory (imgBlob) {
        const fd = new FormData()
        fd.append('file', imgBlob, 'image')
        // fd.append('url', JSON.stringify(linkForUpload["response"]["upload_url"]))
        var request = new XMLHttpRequest()

        request.open('POST', "https://pipeweb.ru/api/uploadPhoto", false);
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

                const inviteUrl = "https://vk.com/clonium?ref=catalog_shopping" // #invite=" + userId
                const attachment = {
                    text: 'open',
                    type: 'url',
                    url: inviteUrl,
                };
                console.log(url)
                screenSpinnerOff()
                bridge.send("VKWebAppShowStoryBox",
                    { "background_type" : "image", "url" : url, "attachment": attachment, "locked": true})
                    .then(async data => {
                        if (data.result === true) {
                            await maintainingStat("odd_sharing")
                            await getThreeTickets()
                            updateUserBalances()
                            setTimeout(() => completeSnackBar("3 билета зачислены"), 1000)
                            console.log("a")
                        }
                    })

            } else {
                console.log('err2')
            }
        }
        console.log(fd)
        request.send(fd)
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1080 ;
    canvas.height = 1920 ;
    const ctx = canvas.getContext('2d');

    const ava = new Image();
    if (avaUrl === "https://vk.com/images/camera_200.png") {
        ava.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
    } else {
        ava.src = avaUrl;
    }

    ava.crossOrigin = 'anonymous';
    ava.onload = function () {
        ctx.drawImage(ava, 405, 413, 272, 272);
        if (beatenPlayers.length === 1) {
            const bpava1 = new Image()
            if (beatenPlayers[0]["avatar"] === "https://vk.com/images/camera_200.png") {
                bpava1.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
            } else {
                bpava1.src = beatenPlayers[0]["avatar"];
            }
            bpava1.crossOrigin = 'anonymous';
            bpava1.onload = function () {
                ctx.drawImage(bpava1, 457, 944, 166, 166);
            }

            const mask = new Image()
            console.log(phrase)
            if (phrase == 0) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111390414819368/Subtract-12.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111469246767115/Subtract-15.png"
                }
            } else if (phrase == 1) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111466818248734/Subtract-17.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111472593825872/Subtract-16.png"
                }
            } else if (phrase == 2) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902111403220037652/Subtract-13.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902120572606107679/Subtract-14.png"
                }
            }

            mask.crossOrigin = 'anonymous';
            mask.onload = function () {
                ctx.drawImage(mask, 0, 0, 1080, 1920);
                ctx.textAlign = "center"
                ctx.font = "48px Open Sans";
                if (theme === "bright") {
                    ctx.fillStyle = "#232324"
                } else {
                    ctx.fillStyle = "#D9D9DB"
                }

                ctx.fillText(convertName(beatenPlayers[0]["username"]), 540, 1174)
                ctx.save()

                canvas.toBlob((imgBlob) => loadStory(imgBlob) , 'image/jpeg', 100)
            }

        } else if (beatenPlayers.length === 2) {

            const bpava1 = new Image()
            if (beatenPlayers[0]["avatar"] === "https://vk.com/images/camera_200.png") {
                bpava1.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
            } else {
                bpava1.src = beatenPlayers[0]["avatar"];
            }
            bpava1.crossOrigin = 'anonymous';
            bpava1.onload = function () {
                ctx.drawImage(bpava1, 211, 944, 166, 166);
            }

            const bpava2 = new Image()
            if (beatenPlayers[1]["avatar"] === "https://vk.com/images/camera_200.png") {
                bpava2.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
            } else {
                bpava2.src = beatenPlayers[1]["avatar"];
            }
            bpava2.crossOrigin = 'anonymous';
            bpava2.onload = function () {
                ctx.drawImage(bpava1, 705, 944, 166, 166);
            }

            const mask = new Image()
            console.log(phrase)
            if (phrase == 0) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261867861405766/Subtract-1.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261880326864946/Subtract-5.png"
                }
            } else if (phrase == 1) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261870545743932/Subtract-2.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261876937871370/Subtract-4.png"
                }
            } else if (phrase == 2) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261865504194580/Subtract.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902261874094112838/Subtract-3.png"
                }
            }

            mask.crossOrigin = 'anonymous';
            mask.onload = function () {
                ctx.drawImage(mask, 0, 0, 1080, 1920);
                ctx.textAlign = "center"
                ctx.font = "48px Open Sans";
                if (theme === "bright") {
                    ctx.fillStyle = "#232324"
                } else {
                    ctx.fillStyle = "#D9D9DB"
                }

                ctx.fillText(convertName(beatenPlayers[0]["username"]), 294, 1174)
                ctx.fillText(convertName(beatenPlayers[1]["username"]), 788, 1174)
                ctx.save()
                canvas.toBlob((imgBlob) => loadStory(imgBlob) , 'image/jpeg', 100)


            }
        } else if (beatenPlayers.length === 3) {

            const bpava1 = new Image()
            if (beatenPlayers[0]["avatar"] === "https://vk.com/images/camera_200.png") {
                bpava1.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
            } else {
                bpava1.src = beatenPlayers[0]["avatar"];
            }
            bpava1.crossOrigin = 'anonymous';
            bpava1.onload = function () {
                ctx.drawImage(bpava1, 119, 980, 134, 134);
            }

            const bpava2 = new Image()
            if (beatenPlayers[1]["avatar"] === "https://vk.com/images/camera_200.png") {
                bpava2.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
            } else {
                bpava2.src = beatenPlayers[1]["avatar"];
            }
            bpava2.crossOrigin = 'anonymous';
            bpava2.onload = function () {
                ctx.drawImage(bpava1, 473, 980, 134, 134);
            }

            const bpava3 = new Image()
            if (beatenPlayers[2]["avatar"] === "https://vk.com/images/camera_200.png") {
                bpava3.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
            } else {
                bpava3.src = beatenPlayers[2]["avatar"];
            }
            bpava3.crossOrigin = 'anonymous';
            bpava3.onload = function () {
                ctx.drawImage(bpava1, 827, 980, 134, 134);
            }

            const mask = new Image()
            console.log(phrase)
            if (phrase == 0) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298350416703538/Subtract-6.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298354984300625/Subtract-10.png"
                }
            } else if (phrase == 1) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298351142318150/Subtract-8.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298355638599680/Subtract-11.png"
                }
            } else if (phrase == 2) {
                if (theme === "bright") {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298348218888263/Subtract-7.png"
                } else {
                    mask.src = "https://media.discordapp.net/attachments/655117045616082974/902298353457573958/Subtract-9.png"
                }
            }

            mask.crossOrigin = 'anonymous';
            mask.onload = function () {
                ctx.drawImage(mask, 0, 0, 1080, 1920);
                ctx.textAlign = "center"
                ctx.font = "36px Open Sans";
                if (theme === "bright") {
                    ctx.fillStyle = "#232324"
                } else {
                    ctx.fillStyle = "#D9D9DB"
                }

                ctx.fillText(convertName(beatenPlayers[0]["username"]), 186, 1174)
                ctx.fillText(convertName(beatenPlayers[1]["username"]), 540, 1174)
                ctx.fillText(convertName(beatenPlayers[2]["username"]), 894, 1174)
                ctx.save()
                canvas.toBlob((imgBlob) => loadStory(imgBlob) , 'image/jpeg', 100)
            }
        }

    }


}

export const showOffsStoryShare = (userId, userName, avaUrl, userRank, fights, wins, losses, exp, screenSpinnerOff) => {

    const canvas = document.createElement('canvas');
    canvas.width = 1080 ;
    canvas.height = 1920 ;
    const ctx = canvas.getContext('2d');

    const ava = new Image();
    if (avaUrl === "https://vk.com/images/camera_200.png") {
        ava.src = "https://media.discordapp.net/attachments/655117045616082974/877280912084172911/image0.png"
    } else {
        ava.src = avaUrl;
    }
    ava.crossOrigin = 'anonymous';
    console.log(ava)
    ava.onload = function () {
        ctx.drawImage(ava, 92, 437, 160, 157);

        const img = new Image();
        img.src = "https://media.discordapp.net/attachments/655117045616082974/858985152712671232/ProfileStory.png"
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 1080, 1920);
            // ctx.fillRect(0, 0, 200, 452);

            ctx.font = '48px Open Sans'
            ctx.fillText(userName, 288, 500)
            ctx.font = '36px Open Sans'
            ctx.fillStyle = "#5D5F61"
            ctx.fillText(userRank, 288, 565)
            ctx.font = '600 96px Open Sans'
            ctx.fillStyle = "#0A0A0A"
            ctx.fillText(fights, 112, 784)
            ctx.fillText(wins, 112, 1009)
            ctx.fillText(losses, 608, 1009)
            ctx.fillText(exp, 112, 1305)
            ctx.font = '42px Open Sans'
            ctx.fillStyle = "#5D5F61"
            ctx.fillText('игр сыграно', 112 + 55 * String(fights).length + 24, 784)
            ctx.fillText('опыта набрано', 112 + 55 * String(exp).length + 24, 1305)
            ctx.save();
            console.log(canvas.toDataURL().slice(0, 20, 400))
            canvas.toBlob((imgBlob) => {
                const fd = new FormData()
                fd.append('file', imgBlob, 'image')
                // fd.append('url', JSON.stringify(linkForUpload["response"]["upload_url"]))
                var request = new XMLHttpRequest()

                request.open('POST', "https://pipeweb.ru/api/uploadPhoto", false);
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

                        const inviteUrl = "https://vk.com/clonium?ref=catalog_shopping"
                        const attachment = {
                            text: 'open',
                            type: 'url',
                            url: inviteUrl,
                        };
                        console.log(url)
                        screenSpinnerOff()
                        bridge.send("VKWebAppShowStoryBox",
                            { "background_type" : "image", "url" : url, "attachment": attachment, "locked": true});

                    } else {
                        console.log('err2')
                    }
                }
                console.log(fd)
                request.send(fd)
            } , 'image/jpeg', 100)


        }
    }



}