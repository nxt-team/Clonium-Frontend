import {io} from "socket.io-client";
export const socket = io("https://gamebot.site");


socket.on("connect", () => {
    console.log(
        "CONNECTED", socket.id
    ); // true
});

export function joinRoom (fetchedUser, secret_id ) {
    socket.emit("join room", {
        "secret_id": secret_id,
        "vk_id": fetchedUser.id,
        "avatar": fetchedUser.photo_max_orig
    })
}

export function leaveFight (fetchedUser) {
    socket.emit("leave room", {
        "vk_id": fetchedUser.id
    })
}

export function clickMap (secretId, fetchedUser, row, column) {
    console.log("MAP CLICKED ", secretId)
    // TODO: добавить таймаут
    socket.emit("click map", {
        "vk_id": fetchedUser.id,
        "secret_id": secretId,
        "row": row,
        "column": column
    })
}




