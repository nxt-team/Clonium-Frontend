import React from 'react';


export function scheme () {
    const scheme = document.body.getAttribute("scheme")
    if (scheme === "client_light" || scheme === "bright_light" || scheme === "vkcom_light") {
        return "light"
    } else {
        return "dark"
    }
}