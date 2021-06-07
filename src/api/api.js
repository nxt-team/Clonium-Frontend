export async function init (fetchedUser) {

    let data = {
        "vk_id": fetchedUser.id,
        "username": fetchedUser.first_name + " " + fetchedUser.last_name,
        "avatar": fetchedUser.photo_max_orig
    }

    let response = await fetch('https://gamebot.site:8000/api/user/init', {
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

        response = await fetch('https://gamebot.site:8000/api/user/change/avatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        console.log(await response.json())
    }

    return {
        "tickets": result[0]["tickets"],
        "exp": result[0]["exp"],
        "fights": result[0]["stats"][0]["fights"],
        "losses": result[0]["stats"][0]["losses"],
        "wins": result[0]["stats"][0]["wins"]
    }
}

export async function getUserBalances (fetchedUser) {
    const data = {
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site:8000/api/user/get/user', {
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
        "wins": result[0]["stats"][0]["wins"]
    }
}

export async function getUserHistory (fetchedUser) {
    const data = {
        "vk_id": fetchedUser.id
    }

    const response = await fetch('https://gamebot.site:8000/api/user/get/history', {
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

    const response = await fetch('https://gamebot.site:8000/api/user/get/achievements', {
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

    const response = await fetch('https://gamebot.site:8000/api/user/change/rank', {
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

    const response = await fetch('https://gamebot.site:8000/api/fights/create', {
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

    const response = await fetch('https://gamebot.site:8000/api/user/get/top', {
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

    const response = await fetch('https://gamebot.site:8000/api/user/get/friendsTop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })

    return await response.json()
}