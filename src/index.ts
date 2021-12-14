/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

import buildQuery from "./lib/core";
import {Query, QueryExecutor} from "./lib/types";
import {deepEqual,contentDeepEqual} from "./lib/equalUtils";

export {
    buildQuery,
    Query,
    QueryExecutor,
    deepEqual,
    contentDeepEqual
}
const queric = buildQuery;
export default queric;