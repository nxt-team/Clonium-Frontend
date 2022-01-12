export const startupParams = new URLSearchParams(window.location.search.replace('?', ''))
export const isOK = startupParams.get('vk_client') === "ok"
export const config = {
    "domain": "kapitar.pw",
    "app_id": isOK ? 512000899239 : 7848428,
    "short_name": "clonium",
    "group_id": isOK ? 68757037252661 : 206549924
}
export const link = isOK ? "https://ok.ru/app/clonium" : "https://vk.com/" + config["short_name"]