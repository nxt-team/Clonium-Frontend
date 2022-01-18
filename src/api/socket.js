import {io} from "socket.io-client";
import config from "../constatnts/config.json"
export const socket = io("https://" + config["domain"], {
    transports: ["websocket"],
    autoConnect: false,
    reconnection: false,
    rejectUnauthorized: false,
    reconnectionAttempts: 0,
    reconnectionDelay: 0,
    reconnectionDelayMax: 0,
});


socket.on("connect", () => {
    console.log(
        "CONNECTED", socket.id
    );
    socket.emit("connectParams", {
        "vk_id": window.location.search.replace('?', ''),
        "socket_id": socket.id
    })
});

socket.on("connect_error", (error) => {
    console.log("SOCKET connect_error", error)

});

export const doReconnect = () => !socket.connected && socket.connect()
export const doDisconnect = () => socket.disconnect()

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
    socket.emit("click map", {
        "vk_id": fetchedUser.id,
        "secret_id": secretId,
        "row": row,
        "column": column,
        "params": window.location.search.replace('?', '')
    })
}




