/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

import {ForintQuery} from "./types";
import {contentDeepEqual, deepEqual} from "./equalUtils";


const filterMap : Record<string,(v : any,e : any) => boolean> = {
    $ceq : contentDeepEqual,
    $nceq : (v,e) => !contentDeepEqual(v,e),
    $eq : deepEqual,
    $neq : (v,e) => !deepEqual(v,e),
    $gt : (v,e) => v > e,
    $gte : (v,e) => v >= e,
    $lt : (v,e) => v < e,
    $lte : (v,e) => v <= e,
    $in : (v,e) => e.indexOf(v) !== -1,
    $nin : (v,e) => e.indexOf(v) === -1,
    $len : (v,e) => v && typeof v === 'object' && v.length === e,
    $exists : (v,e) => e ? (v !== undefined && v !== null) : (v === undefined || v === null),
};

const preparedFilterMap : Record<string,(e : any) => (v : any) => boolean> = {
    $or : (e) => {
        const eLen = e.length;
        const queryOrFuncs : ((v : any) => boolean)[] = [];
        for(let i = 0; i < eLen; i++){
            queryOrFuncs.push(buildQueryFunc(e[i]));
        }
        return (v) => {
            for(let i = 0; i < eLen; i++) if(queryOrFuncs[i](v)) return true;
            return false;
        }
    },
    $type : (e) => {
        if (e === 'array') return Array.isArray;
        else if(e === 'null') return (v) => v === null;
        return (v) => typeof v === e;
    },
    $all : (e) => {
        const len = e.length;
        return (v) => {
            if (!Array.isArray(v)) return false;
            for (let i = 0; i < len; i++) if (v.indexOf(e[i]) === -1) return false;
            return true;
        }
    },
    $not : (e) => {
        if (Array.isArray(e)) {
            const orFunc = preparedFilterMap['$or'](e);
            return (v) => !orFunc(v);
        }
        const queryFunc = buildQueryFunc(e);
        return (v) => !queryFunc(v);
    },
    $and : (e) => {
        const eLen = e.length;
        const queryOrFuncs : ((v : any) => boolean)[] = [];
        for(let i = 0; i < eLen; i++){
            queryOrFuncs.push(buildQueryFunc(e[i]));
        }
        return (v) => {
            for(let i = 0; i < eLen; i++) if(!queryOrFuncs[i](v)) return false;
            return true;
        }
    },
    $regex : (e) => {
        const regex = RegExp(e);
        const test = regex.test.bind(regex);
        return (v) => test(v);
    }
};

export default buildQueryFunc;

function buildQueryFunc<T>(query : ForintQuery<T>) : (value : any) => boolean {
    query = typeof query !== 'object' ? {$eq : query} : query;
    const keys = Object.keys(query);
    const len = keys.length;
    let prop;
    const filter : ((v : any) => boolean)[] = [];
    for(let i = 0; i < len; i++){
        prop = keys[i];
        if(filterMap[prop]){
            const filterFunc = filterMap[prop];
            const expected = query[prop];
            filter.push((v) => filterFunc(v,expected));
        }
        else if(preparedFilterMap[prop]){
            filter.push(preparedFilterMap[prop](query[prop]));
        }
        else if(typeof query[prop] === 'object') {
            const innerQueryFunc = buildQueryFunc(query[prop]);
            const tmpProp = prop;
            filter.push((v) => {
                if(v && typeof v === 'object') return innerQueryFunc(v[tmpProp]);
                return false;
            });
        }
        else {
            const filterFunc = filterMap['$eq'];
            const tmpProp = prop;
            const expected = query[prop];
            filter.push((v) => (v && typeof v === 'object') ? filterFunc(v[tmpProp],expected) : false);
        }
    }
    const filterLen = filter.length;
    return (v) => {
        for(let i = 0; i < filterLen; i++) if(!filter[i](v)) return false;
        return true;
    }
}
