import React from 'react';


export function scheme () {
    if (document.body.getAttribute("scheme") === "client_light"
        || document.body.getAttribute("scheme") === "bright_light") {
        return "light"
    } else {
        return "dark"
    }
}