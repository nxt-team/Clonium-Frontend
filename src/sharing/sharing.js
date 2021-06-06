import React from 'react'
import bridge from '@vkontakte/vk-bridge';

export const refLinkShare = (userId) => {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/app7848428#invite=" + userId})
}

export const fightInviteShare = (fightId) => {
    bridge.send("VKWebAppShare", {"link": "https://vk.com/app7848428#fight=" + fightId})
}

export const postShare = (userId) => {
    const message = "Сразимся? " + "\n" + "\n" + "vk.com/app7848428#invite=" + userId
    bridge.send("VKWebAppShowWallPostBox", {"message": message, "attachments": "photo-199025669_457239075"})
}

export const fightResultsPostShare = (userId, place,
                                      // players
) => {
    let message = ""
    const players = [
        {
            "user_name": "Петросян Савельевич",
            "vk_id": 262626
        },
        {
            "user_name": "Артём Ким",
            "vk_id": 268696090
        }
    ]

    if (players.length - place === 0) {
        message = "Сразимся в клоний? \n \n " + "vk.com/app7848428#invite=" + userId
    } else {
        message = "Я обыграл:"
        for (let item of players) {
            message += "\n"
            message += "- " + "@id" + item["vk_id"] + "(" + item["user_name"] + ")"
        }
        message += "\nи занял " + place + " место 😎"

        message += "\n \nСразимся в клоний? \n " + "vk.com/app7848428#invite=" + userId
    }

    bridge.send("VKWebAppShowWallPostBox", {"message": message, "attachments": "photo-199025669_457239076"})
}

export const fightResultsStoryShare = (place, numberOfPlayers) => {

}

export const fightResultsPictureShare = (place, numberOfPlayers) => {

}

export const showOffsStoryShare = () => {

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