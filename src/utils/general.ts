import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {store} from "../app/store";
const {isEnglish} = store.getState().global
export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: isEnglish ? []:[prefixer, rtlPlugin],
});

export function isMobileFunction(): boolean {
    const toMatch: RegExp[] = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    if (
        toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        }) ||
        (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform))
    ) {
        return true;
    }

    return false;
}
