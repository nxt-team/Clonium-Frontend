import imagenation from "imagenation";
import React from "react";
import config from "../constatnts/config.json"

export async function init (fetchedUser, hash) {

    let data = {
        "vk_id": window.location.search.replace('?', ''),
        "username": fetchedUser.first_name + " " + fetchedUser.last_name,
        "avatar": fetchedUser.photo_200,
        "version": "kim loh 3",
        "hash": hash,
    }

    let response = await fetch('https://' + config["domain"] + '/api/user/init', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        return {
            "status": "server_error",
            "error": "Произошла ошибка",
            "error_description": "Кажется сервер не отвечает. Обратитесь, пожалуйста, в тех-поддержку."
        }
    }

    const result = await response.json()

    if (result["status"] === "connected" || result["status"] === "banned" || result["status"] === "temporaryBanned" || result["status"] === "error") {
        return result
    }

    if (result["status"] === "success") {
        return {
            "tickets": 5,
            "exp": 0,
            "fights": 0,
            "losses": 0,
            "wins": 0,
            "vk_donut": 0,
            "user_rank": "Ноу-нейм",
            "status": "success",
            "are_notifications_enabled": false,
            "isUserInSuperFight": false,
            "referrals": 0,
            "warnings": 0,
            "achievements": [],
            "donut_end": "",
            "rate": 1500
        }
    }

    if (result[0]["avatar"] !== fetchedUser.photo_200) {
        console.log('аватарка дургая')

        data = {
            "vk_id": window.location.search.replace('?', ''),
            "avatar": fetchedUser.photo_200
        }

        response = await fetch('https://' + config["domain"] + '/api/user/change/avatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    }

    if (result[0]["username"] !== fetchedUser.first_name + " " + fetchedUser.last_name) {

        data = {
            "params": window.location.search.replace('?', ''),
            "username": fetchedUser.first_name + " " + fetchedUser.last_name
        }

        response = await fetch('https://' + config["domain"] + '/api/user/change/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    }

    return {
        "tickets": result[0]["vk_donut"] ? "∞" : result[0]["tickets"],
        "exp": result[0]["exp"],
        "fights": result[0]["stats"][0]["fights"],
        "losses": result[0]["stats"][0]["losses"],
        "wins": result[0]["stats"][0]["wins"],
        "vk_donut": result[0]["vk_donut"],
        "user_rank": result[0]["user_rank"],
        "status": result[0]["status"],
        "are_notifications_enabled": result[0]["are_notifications_enabled"],
        "isUserInSuperFight": result[0]["isUserInSuperFight"],
        "referrals": result[0]["referrals"].length,
        "warnings": result[0]["warnings"],
        "achievements": result[0]["achievements"],
        "donut_end": result[0]["donut_end"],
        "rate": Math.round(result[0]["rating"])
    }
}

export async function getUserBalances (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    return {
        "tickets": result[0]["vk_donut"] ? "∞" : result[0]["tickets"],
        "exp": result[0]["exp"],
        "fights": result[0]["stats"][0]["fights"],
        "losses": result[0]["stats"][0]["losses"],
        "wins": result[0]["stats"][0]["wins"],
        "vk_donut": result[0]["vk_donut"],
        "user_rank": result[0]["user_rank"],
        "status": result[0]["status"],
        "are_notifications_enabled": result[0]["are_notifications_enabled"],
        "isUserInSuperFight": result[0]["isUserInSuperFight"],
        "referrals": result[0]["referrals"].length,
        "warnings": result[0]["warnings"],
        "achievements": result[0]["achievements"],
        "donut_end": result[0]["donut_end"],
        "rate": Math.round(result[0]["rating"])
    }
}

export async function getAllUserInfo () {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    return result
}

export async function getSubAchievement () {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/set/subAchievement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getUserHistory (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return  await response.json()

}

export async function reconnectUser () {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/disconnect/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return  await response.json()
}

export async function getUserAchievements (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/achievements', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return  await response.json()
}

export async function changeUserRank (fetchedUser, achievement_id) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "achievement_id": +achievement_id
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/change/rank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return  await response.json()
}


export async function createFight (fetchedUser, map_id, max_user_number, is_private, turn_time, game_time, deadPieces) {

    const maps = ["SquareSize8", "DonutSize8", "GridSize8", "DonutSize6", "SquareSize6", "GridSize10", "PassageSize10", "CrossSize9", "WhirlSize10"]

    const data = {
        "vk_id_creator": window.location.search.replace('?', ''),
        "map_name": maps[map_id],
        "max_user_number": max_user_number,
        "is_private": is_private,
        "turn_time": turn_time, // boolean | true - ограничено
        "game_time": game_time, // -1 если бесконечное
        "dead_pieces": deadPieces

    }

    const response = await fetch('https://' + config["domain"] + '/api/fights/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return  await response.json()
}

export async function getGlobalTop (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/top', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getFriendsTop (fetchedUser, friends) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "friends": friends
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/friendsTop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function addReferral (fetchedUser, referrer_id) {
    const data = {
        "vk_id": referrer_id,
        "referral_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/add/referral', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function isDonut (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    return result[0]["vk_donut"] !== 0;
}

export async function updatePieceAvatar (fetchedUser, piece_avatar) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "piece_avatar": piece_avatar
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/update/pieceAvatar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function isPieceAvatar (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    return result[0]["piece_avatar"] !== "0";
}

export async function getFights (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/fights/get/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getFight (secretId) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "secret_id": secretId
    }

    const response = await fetch('https://' + config["domain"] + '/api/fights/fight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function rateFight (fetchedUser, grade, comment) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "grade": grade,
        "comment": comment
    }

    const response = await fetch('https://' + config["domain"] + '/api/fights/send/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function updateAreNotificationsEnabled  (fetchedUser, enable ) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "enable": enable
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/set/notificationsEnable', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function updateIsUserInSuperFight  () {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/set/isUserInSuperFight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function activatePromocode  (promocode, fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "promocode": promocode,
    }

    const response = await fetch('https://' + config["domain"] + '/api/promocode/activate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getTicket (fetchedUser) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/set/taskComplete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getThreeTickets () {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/storySharing', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getBeatenPlayers (secret_id, colors) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "secret_id": secret_id,
        "colors": colors
    }

    const response = await fetch('https://' + config["domain"] + '/api/fights/get/beatenPlayers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getAnyUser (vk_id) {
    const data = {
        "params": window.location.search.replace('?', ''),
        "vk_id": vk_id
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/anyUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function deleteUser () {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/delete/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function doChange () {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/exchange', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function getDonateLink () {
    const data = {
        "vk_id": window.location.search.replace('?', '')
    }

    const response = await fetch('https://' + config["domain"] + '/api/user/get/donateLink', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function maintainingStat (stat_name) {
    const data = {
        "stat_name": stat_name
    }

    const response = await fetch('https://' + config["domain"] + '/api/stats/add/count', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export async function sendLogs (logs) {
    const data = {
        "vk_id": window.location.search.replace('?', ''),
        "logs": logs
    }

    const response = await fetch('https://' + config["domain"] + '/api/fights/send/logs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}



export async function maintainingEvents (stat_name, info=null) {
    const data = {
        "stat_name": stat_name,
        "vk_id": window.location.search.replace('?', ''),
        "info": info
    }

    const response = await fetch('https://' + config["domain"] + '/api/events/add/count', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

export const onChange_originalFile = async (e, setImgLink, changeActiveModal, fetchedUser, errorSnackBar, closeModal) => {
    setImgLink('loading')
    let image = e.target.files;
    if (image && image.length > 0) {

        var reader = new FileReader();

        reader.readAsDataURL(image[0]);
        reader.onload = function (e) {

            //Initiate the JavaScript Image object.
            var newImage = new Image();

            //Set the Base64 string return from FileReader as source.
            newImage.src = e.target.result;

            //Validate the File Height and Width.

            newImage.onerror = function () {
                setImgLink(null)
                closeModal()
                errorSnackBar("Файл не удалось прочитать. Выберите файл формата: JPEG или PNG, имеющий ширину и высоту менее 1500px")
            }

            newImage.onload = async function () {
                const height = this.height;
                const width = this.width;
                console.log(height, width)
                if (!(height > 2500 || width > 2500)) {
                    console.log(image)
                    if ((image[0].type.indexOf("image/") + 1) !== 0) {
                        console.log(image[0])
                        try {
                            let img = await imagenation(image[0], 2500)
                            console.log(img)
                            if (img) {
                                console.log('everything is okay')
                                const fd = new FormData()
                                fd.append('file', image[0], 'image')
                                // fd.append('url', JSON.stringify(linkForUpload["response"]["upload_url"]))
                                var request = new XMLHttpRequest()

                            request.open('POST', "https://" + config["domain"] + "/api/uploadPhoto", false);
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

                                    const result = await updatePieceAvatar(fetchedUser, url)
                                    console.log(result)
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
                                setImgLink(null)
                                closeModal()
                                errorSnackBar("Файл не удалось прочитать. Выберите файл формата: JPEG или PNG!");
                            }
                        }
                        catch (error) {
                            setImgLink(null)
                            closeModal()
                            console.log(error)
                            errorSnackBar("Файл не удалось прочитать. Выберите файл формата: JPEG или PNG!");
                        }
                    }
                    else {
                        setImgLink(null)
                        closeModal()
                        errorSnackBar("Выберите файл формата: JPEG или PNG!");
                    }
                } else {
                    setImgLink(null)
                    closeModal()
                    errorSnackBar("Файл не удалось прочитать. Выберите файл формата: JPEG или PNG, имеющий ширину и высоту менее 2500px");
                }

            };
        };
    }
    else {
        setImgLink(null)
        closeModal()
        errorSnackBar("Файл не удалось прочитать. Выберите файл формата: JPEG или PNG, имеющий ширину и высоту менее 2500px");
    }
}