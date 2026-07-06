import { env } from "$env/dynamic/public";

const hostURL = new URL(env["PUBLIC_HOST"]);

/**
 * @throws if PUBLIC_HOST environment variable is not set well
 */
export function getHostURL(): URL {
    return new URL(hostURL);
}