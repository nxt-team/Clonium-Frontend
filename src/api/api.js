import imagenation from "imagenation";
import React from "react";

export async function init (fetchedUser) {

    let data = {
        "vk_id": fetchedUser.id,
        "username": fetchedUser.first_name + " " + fetchedUser.last_name,
        "avatar": fetchedUser.photo_max_orig
    }

    let response = await fetch('https://gamebot.site/api/user/init', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    if (result["status"] === "success") {
        return result
    }

    if (result[0]["avatar"] !== fetchedUser.photo_max_orig) {
        console.log('аватарка дургая')

        data = {
            "vk_id": fetchedUser.id,
            "avatar": fetchedUser.photo_max_orig
        }

        response = await fetch('https://gamebot.site/api/user/change/avatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
    }

    return {
        "tickets": result[0]["tickets"],
        "exp": result[0]["exp"],
        "fights": result[0]["stats"][0]["fights"],
        "losses": result[0]["stats"][0]["losses"],
        "wins": result[0]["stats"][0]["wins"],
        "vk_donut": result[0]["vk_donut"],
        "user_rank": result[0]["user_rank"],
        "status": result[0]["status"]
    }
}

export async function getUserBalances (fetchedUser) {
    const data = {
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site/api/user/get/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()
    return {
        "tickets": result[0]["tickets"],
        "exp": result[0]["exp"],
        "fights": result[0]["stats"][0]["fights"],
        "losses": result[0]["stats"][0]["losses"],
        "wins": result[0]["stats"][0]["wins"],
        "vk_donut": result[0]["vk_donut"],
        "user_rank": result[0]["user_rank"]
    }
}

export async function getUserHistory (fetchedUser) {
    const data = {
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site/api/user/get/history', {
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
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site/api/user/get/achievements', {
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
        "vk_id": fetchedUser.id,
        "achievement_id": +achievement_id
    }

    const response = await fetch('https://gamebot.site/api/user/change/rank', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return  await response.json()
}


export async function createFight (fetchedUser, map_id, max_user_number, is_private, turn_time, game_time) {

    const maps = ["SquareSize8", "DonutSize8", "GridSize8", "DonutSize6", "SquareSize6", "GridSize10", "PassageSize10"]

    const data = {
        "vk_id_creator": fetchedUser.id,
        "map_name": maps[map_id],
        "max_user_number": max_user_number,
        "is_private": is_private,
        "turn_time": turn_time, // boolean | true - ограничено
        "game_time": game_time // -1 если бесконечное

    }

    const response = await fetch('https://gamebot.site/api/fights/create', {
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
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site/api/user/get/top', {
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
        "vk_id": fetchedUser.id,
        "friends": friends
    }

    const response = await fetch('https://gamebot.site/api/user/get/friendsTop', {
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
        "referral_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site/api/user/add/referral', {
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
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site/api/user/get/user', {
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
        "vk_id": fetchedUser.id,
        "piece_avatar": piece_avatar
    }

    const response = await fetch('https://gamebot.site/api/user/update/pieceAvatar', {
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
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site/api/user/get/user', {
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
    const data = {}

    const response = await fetch('https://gamebot.site/api/fights/get/all', {
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
        "secret_id": secretId
    }

    const response = await fetch('https://gamebot.site/api/fights/fight', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}

// export async function leaveFight (fetchedUser) {
//     const data = {
//         "vk_id": fetchedUser.id
//     }
//
//     const response = await fetch('https://gamebot.site/api/fights/leave/player', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(data)
//     })
//
//     return await response.json()
// }
//

export const onChange_originalFile = async (e, setImgLink, changeActiveModal, fetchedUser) => {
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