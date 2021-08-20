import React from 'react'
import bridge from '@vkontakte/vk-bridge';

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
        message += "- " + "@id" + item["vk_id"] + "(" + item["user_name"] + ")"
    }
    message += "\nи занял " + place + " место 😎"

    message += "\n \nСразимся в клоний? \n " + "vk.com/clonium#invite=" + userId

    bridge.send("VKWebAppShowWallPostBox", {"message": message, "attachments": "photo-199025669_457239076"})
}

export const fightResultsStoryShare = (place, players, screenSpinnerOff, userId) => {
    const playersNum = players.length
    let imgBlob
    if (playersNum === 2) {

    } else if (playersNum === 3) {
        if (place === 2) {

        } else if (place === 1) {

        }
    } else if (playersNum === 4) {
        if (place === 3) {

        } else if (place === 2) {

        } else if (place === 1) {

        }
    }

    const fd = new FormData()
    fd.append('file', imgBlob, 'image')
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

            const inviteUrl = "https://vk.com/clonium#invite=" + userId
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
}

export const fightResultsPictureShare = (place, numberOfPlayers) => {

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

                        const inviteUrl = "https://vk.com/clonium#invite=" + userId
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