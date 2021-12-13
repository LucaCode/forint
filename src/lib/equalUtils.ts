/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

/**
 * @description
 * Checks if a value is deep equal to another value.
 * @param v1
 * @param v2
 */
export function deepEqual(v1 : any, v2 : any) : boolean {
    if(v1 === v2) return true;
    if(typeof v1 === "object" && v1){
        if(typeof v2 === "object" && v2){
            if(Array.isArray(v1) && Array.isArray(v2)){
                if(v1.length !== v2.length) return false;
                for(let i = 0; i < v1.length; i++) if(!deepEqual(v1[i],v2[i])) return false;
                return true;
            }
            else {
                for(let k in v1) if(v1.hasOwnProperty(k) && !deepEqual(v1[k],v2[k])) return false;
                for(let k in v2) if(v2.hasOwnProperty(k) && !v1.hasOwnProperty(k)) return false;
                return true;
            }
        }
        else return false;
    }
    return false;
}

/**
 * @description
 * Checks if a value is deep equal to another value.
 * @param v1
 * @param v2
 */
export function contentDeepEqual(v1 : any, v2 : any) : boolean {
    if(v1 == v2) return true;
    if(typeof v1 === "object" && v1){
        if(typeof v2 === "object" && v2){
            if(Array.isArray(v1) && Array.isArray(v2)){
                if(v1.length !== v2.length) return false;
                for(let i = 0; i < v1.length; i++) if(!contentDeepEqual(v1[i],v2[i])) return false;
                return true;
            }
            else {
                for(let k in v1) if(v1.hasOwnProperty(k) && !contentDeepEqual(v1[k],v2[k])) return false;
                for(let k in v2) if(v2.hasOwnProperty(k) && !v1.hasOwnProperty(k)) return false;
                return true;
            }
        }
        else return false;
    }
    return false;
}