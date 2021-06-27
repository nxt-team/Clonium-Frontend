import React from 'react'
import bridge from '@vkontakte/vk-bridge';

export const refLinkShare = (userId) => {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/app7848428#invite=" + userId})
}

export const fightInviteShare = (fightId) => {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/app7848428#fight=" + fightId})
}

export const copyFightInvite = (fightId) => {
    bridge.send("VKWebAppCopyText", {"text": "Присоединяйся в бой \nhttps://vk.com/app7848428#fight=" + fightId});
}

export const postShare = (userId) => {
    const message = "Сразимся? " + "\n" + "\n" + "vk.com/app7848428#invite=" + userId
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

    message += "\n \nСразимся в клоний? \n " + "vk.com/app7848428#invite=" + userId

    bridge.send("VKWebAppShowWallPostBox", {"message": message, "attachments": "photo-199025669_457239076"})
}

export const fightResultsStoryShare = (place, numberOfPlayers) => {

}

export const fightResultsPictureShare = (place, numberOfPlayers) => {

}

export const showOffsStoryShare = (userId, userName, avaUrl, userRank, fights, wins, losses, exp, screenSpinnerOff) => {

    const canvas = document.createElement('canvas');
    canvas.width = 1080 ;
    canvas.height = 1920 ;
    const ctx = canvas.getContext('2d');

    const ava = new Image();
    ava.src = avaUrl;
    ava.crossOrigin = 'anonymous';
    console.log(ava)
    ava.onload = function () {
        ctx.drawImage(ava, 92, 437, 160, 157);

        const img = new Image();
        img.src = "https://psv4.userapi.com/c532036/u476182155/docs/d2/20dbcb39cdda/ProfileStory.png?extra=jQmIhFxH3Lo9I67JGM1FXzn8EKgEAwsuZKGbbQWCe13WIL_Jirw8E11P7IwdI41_pmwW79ChNw_NvREqG5dVZWWgtI9dJdMIKJiUuXuvgXpV5bOFZ87_NpY0qZl9vOn_2osTOH6ZswVRFCcZQZKIUKg51HQ"
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
            ctx.fillText('7', 112, 1009)
            ctx.fillText('0', 608, 1009)
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

                        const inviteUrl = "https://vk.com/app7848428#invite=" + userId
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

async function showStoryBox(videoUrl, imageUrl, attachment, stickers = []) {
    if (true) {
        try {
            return await doShowStoryBox(imageUrl, 'image', attachment, stickers);
        } catch (e) {
            e.is_web_or_mvk = 1;
            return Promise.reject(e);
        }
    }

    try {
        return await doShowStoryBox(videoUrl, 'video', attachment, stickers);
    } catch (e) {
        if (e && e.error_data && +e.error_data.error_code !== 4) {
            try {
                return await doShowStoryBox(imageUrl, 'image', attachment, stickers);
            } catch (e) {
                e.after_fallback = 1;
                return Promise.reject(e);
            }
        } else {
            return Promise.reject(e);
        }
    }
}

function doShowStoryBox(url, type, attachment, stickers) {
    return bridge.send('VKWebAppShowStoryBox', {
        background_type: type,
        url,
        locked: true,
        attachment,
        stickers,
    });
}

export function showShareStory(userId, photo) {
    return new Promise((resolve, reject) => {

        const attachment = {
            text: 'open',
            type: 'url',
            url: `https://vk.com/app1#ask=1&story=1`,
        };
        // const videoUrl = `https://${window.location.host}${require('$assets/stories/question.mp4')}`;
        const imageUrl = `https://${window.location.host}${require('../img/fallback_question_orange.png')}`;

        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {

            const canvas = document.createElement('canvas');

            const scale = 4;
            const size = 150;
            canvas.width = size * scale;
            canvas.height = size * scale;

            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const borderWidth = 3;
            const innerSize = size - borderWidth * 2;

            ctx.scale(scale, scale);

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
            ctx.clip();

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, size, size);

            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, innerSize / 2, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.restore();
            ctx.clip();

            let imgWidth, imgHeight;
            if (img.height > img.width) {
                imgWidth = innerSize;
                imgHeight = img.height / img.width * imgWidth;
            } else {
                imgHeight = innerSize;
                imgWidth = img.width / img.height * imgHeight;
            }

            ctx.drawImage(
                img,
                borderWidth - (imgWidth - innerSize) / 2,
                borderWidth - (imgHeight - innerSize) / 2,
                imgWidth,
                imgHeight,
            );

            showStoryBox(
                "videoUrl",
                imageUrl,
                attachment,
                [
                    {
                        sticker_type: 'renderable',
                        sticker: {
                            content_type: 'image',
                            blob: canvas.toDataURL(),
                            can_delete: false,
                            original_width: size,
                            original_height: size,
                            transform: {
                                gravity: 'center',
                                relation_width: 0.45
                            }
                        }
                    },
                ],
            )
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                });

            try {
                document.body.removeChild(canvas);
            } catch (e) {}
        };
        img.onerror = () => {
            console.log('load_img_error');

            showStoryBox("videoUrl", imageUrl, attachment, [])
                .then(() => resolve())
                .catch((err) => {
                    reject(err);
                    console.log(err);
                });
        };
        img.src = photo;
    });
}