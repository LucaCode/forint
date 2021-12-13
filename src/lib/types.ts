/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

type SupportedType =
    | string
    | number
    | null
    | any;

interface Query<T extends SupportedType> {
    /**
     * @description
     * Checks if the value is deep equal.
     */
    $eq?: T;
    /**
     * @description
     * Checks if the value is not deep equal.
     */
    $ne?: T;
    /**
     * @description
     * Checks if the content of the value is deep equal (== instead of ===).
     */
    $ceq?: T,
    /**
     * @description
     * Checks if the content of the value is not deep equal (!= instead of !==).
     */
    $nceq?: T,
    /**
     * @description
     * Checks if one of the queries is matching.
     */
    $or?: ForintQuery<T>[];
    /**
     * @description
     * Checks if the value is greater than.
     */
    $gt?: number;
    /**
     * @description
     * Checks if the value is greater than or equals.
     */
    $gte?: number;
    /**
     * @description
     * Checks if the value is lesser than.
     */
    $lt?: number;
    /**
     * @description
     * Checks if the value is lesser than or equals.
     */
    $lte?: number;
    /**
     * @description
     * Check if the value is matching with one of these values.
     */
    $in?: T[];
    /**
     * @description
     * Check if the value is not matching with one of these values.
     */
    $nin?: T[];
    /**
     * @description
     * Checks the type of the value.
     */
    $type?: 'string' | 'number' | 'object' | 'array' | 'boolean' | 'null';
    /**
     * @description
     * Check if an array contains all of these values.
     */
    $all?: T[];
    /**
     * @description
     * Check the length of an array.
     */
    $len?: number;
    /**
     * @description
     * Checks if all specific queries are not matching.
     */
    $not?: ForintQuery<T> | ForintQuery<T>[];
    /**
     * @description
     * Checks if all queries are matching with the value.
     */
    $and?: ForintQuery<T>[];
    /**
     * @description
     * Checks a value with a regex.
     */
    $regex?: string;
    /**
     * @description
     * Checks if the value exists.
     */
    $exists?: boolean;
}

export type ElemMatch<T> = { [P in keyof T]?: ForintQuery<T[P]> };

export type ExternalQuery<T extends SupportedType> = ElemMatch<T>;
export interface InternalQuery<T extends SupportedType> extends Query<T> {}

export type ForintQuery<T extends SupportedType = any> =  T | ExternalQuery<T> | InternalQuery<T>;