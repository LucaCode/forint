/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

import buildQueryFunc from "./lib/core";
import {ForintQuery}  from "./lib/types";
import {deepEqual,contentDeepEqual} from "./lib/equalUtils";

export {
    ForintQuery,
    deepEqual,
    contentDeepEqual
}
const forint = buildQueryFunc;
export default forint;