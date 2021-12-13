/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

import buildQueryExecutor from "./lib/core";
import {ForintQuery, QueryExecutor} from "./lib/types";
import {deepEqual,contentDeepEqual} from "./lib/equalUtils";

export {
    ForintQuery,
    QueryExecutor,
    deepEqual,
    contentDeepEqual
}
const forint = buildQueryExecutor;
export default forint;