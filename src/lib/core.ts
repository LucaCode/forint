/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

import {Filter, ForintQuery, QueryExecutor} from "./types";
import {contentDeepEqual, deepEqual} from "./equalUtils";

const filterMap: Record<string,(v: any,e: any) => boolean> = {
    $eq: deepEqual,
    $ne: (v,e) => !deepEqual(v,e),
    $ceq: contentDeepEqual,
    $nce: (v,e) => !contentDeepEqual(v,e),
    $gt: (v,e) => v > e,
    $gte: (v,e) => v >= e,
    $lt: (v,e) => v < e,
    $lte: (v,e) => v <= e
};

const preparedFilterMap: Record<string,(e: any) => Filter> = {
    $in: e => preparedFilterMap['$or'](e),
    $nin: e => {
        const orFilter = preparedFilterMap['$or'](e);
        return v => !orFilter(v);
    },
    $type: e => {
        if(e === 'array') return Array.isArray;
        else if(e === 'null') return v => v === null;
        return v => typeof v === e;
    },
    $all: e => {
        const eLen = e.length, queryExecutors: QueryExecutor[] = [];
        for(let i = 0; i < eLen; i++) queryExecutors.push(buildQueryExecutor(e[i]));
        return v => {
            if(!Array.isArray(v)) return false;
            for(let i = 0; i < eLen; i++) if(v.findIndex(queryExecutors[i]) === -1) return false;
            return true;
        }
    },
    $elemMatch: e => {
        const queryExecutor = buildQueryExecutor(e);
        return v => {
            if(!Array.isArray(v)) return false;
            const len = v.length;
            for(let i = 0; i < len; i++) if(queryExecutor(v[i])) return true;
            return false;
        }
    },
    $len: e => {
        const queryExecutor = buildQueryExecutor(e);
        return v => Array.isArray(v) || typeof v === 'string' ? queryExecutor(v.length) : false;
    },
    $not: e => {
        if(Array.isArray(e)) {
            const orFilter = preparedFilterMap['$or'](e);
            return v => !orFilter(v);
        }
        const queryExecutor = buildQueryExecutor(e);
        return v => !queryExecutor(v);
    },
    $or: e => {
        const eLen = e.length, queryExecutors: QueryExecutor[] = [];
        for(let i = 0; i < eLen; i++) queryExecutors.push(buildQueryExecutor(e[i]));
        return v => {
            for(let i = 0; i < eLen; i++) if(queryExecutors[i](v)) return true;
            return false;
        }
    },
    $and: e => {
        const eLen = e.length, queryExecutors: QueryExecutor[] = [];
        for(let i = 0; i < eLen; i++) queryExecutors.push(buildQueryExecutor(e[i]));
        return v => {
            for(let i = 0; i < eLen; i++) if(!queryExecutors[i](v)) return false;
            return true;
        }
    },
    $regex: e => {
        const regex = RegExp(e);
        const test = regex.test.bind(regex);
        return v => test(v);
    },
    $exists: e => e ? v => v != null : v => v == null,
};

export default buildQueryExecutor;

/**
 * @description
 * Builds a query executor from the given query.
 * @param query
 */
function buildQueryExecutor<T>(query: ForintQuery<T>): QueryExecutor {
    query = typeof query !== 'object' ? {$eq: query} : query;
    const keys = Object.keys(query), len = keys.length, filters: Filter[] = [];
    let prop, i;
    for(i = 0; i < len; i++){
        prop = keys[i];
        if(filterMap[prop]){
            const filter = filterMap[prop], expected = query[prop];
            filters.push(v => filter(v,expected));
        }
        else if(preparedFilterMap[prop])
            filters.push(preparedFilterMap[prop](query[prop]));
        else if(typeof query[prop] === 'object') {
            const innerQueryExecutor = buildQueryExecutor(query[prop]), tmpProp = prop;
            filters.push(v => {
                if(v && typeof v === 'object') return innerQueryExecutor(v[tmpProp]);
                return false;
            });
        }
        else {
            const filter = filterMap['$eq'], tmpProp = prop, expected = query[prop];
            filters.push(v => (v && typeof v === 'object') ? filter(v[tmpProp],expected) : false);
        }
    }
    const filterLen = filters.length;
    return v => {
        for(let i = 0; i < filterLen; i++) if(!filters[i](v)) return false;
        return true;
    }
}
