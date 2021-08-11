import {io} from "socket.io-client";
export const socket = io("https://pipeweb.ru", {autoConnect: false});


socket.on("connect", () => {
    console.log(
        "CONNECTED", socket.id
    ); // true
    socket.emit("connectParams", {
        "vk_id": window.location.search.replace('?', ''),
        "socket_id": socket.id
    })
});

socket.on("disconnect", () => {
    console.log("disconnected")
})

export function joinRoom (fetchedUser, secret_id ) {
    socket.emit("join room", {
        "secret_id": secret_id,
        "vk_id": fetchedUser.id,
        "avatar": fetchedUser.photo_200,
        "params": window.location.search.replace('?', '')
    })
}

export function leaveFight (fetchedUser) {
    socket.emit("leave room", {
        "vk_id": fetchedUser.id,
        "params": window.location.search.replace('?', '')
    })
}

export function kickUserSend (color, secretId) {
    socket.emit("kick user", {
        "color": color,
        "secret_id": secretId
    })
}

export function clickMap (secretId, fetchedUser, row, column) {
    console.log("MAP CLICKED ", secretId)
    // TODO: добавить таймаут
    socket.emit("click map", {
        "vk_id": fetchedUser.id,
        "secret_id": secretId,
        "row": row,
        "column": column,
        "params": window.location.search.replace('?', '')
    })
}




