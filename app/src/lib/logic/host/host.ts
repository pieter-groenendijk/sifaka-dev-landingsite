import { env } from "$env/dynamic/public";

const hostURL = new URL(env["PUBLIC_HOST"]);
const mailHostURL = new URL(env["PUBLIC_MAIL_HOST"]);
const toolHostURL = new URL(env["PUBLIC_TOOL_HOST"]);

export function getHostURL(): URL {
    return new URL(hostURL);
}

export function getMailURL(): URL {
    return new URL(mailHostURL);
}

export function getToolURL(): URL {
    return new URL(toolHostURL);
}