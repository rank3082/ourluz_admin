import createCache from "@emotion/cache";
import {prefixer} from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import {store} from "../app/store";
const {isEnglish} = store.getState().global
export const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: isEnglish ? []:[prefixer, rtlPlugin],
});