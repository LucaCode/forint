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
     * Checks if the value is deep equal.
     */
    $eq?: T;
    /**
     * Checks if the value is not deep equal.
     */
    $ne?: T;
    /**
     * Checks if the content of the value is deep equal (== instead of ===).
     */
    $ceq?: T,
    /**
     * Checks if the content of the value is not deep equal (!= instead of !==).
     */
    $nceq?: T,
    /**
     * Checks if one of the queries is matching.
     */
    $or?: ForintQuery<T>[];
    /**
     * Checks if the value is greater than.
     */
    $gt?: number;
    /**
     * Checks if the value is greater than or equals.
     */
    $gte?: number;
    /**
     * Checks if the value is lesser than.
     */
    $lt?: number;
    /**
     * Checks if the value is lesser than or equals.
     */
    $lte?: number;
    /**
     * Check if the value is matching with one of these values.
     */
    $in?: T[];
    /**
     * Check if the value is not matching with one of these values.
     */
    $nin?: T[];
    /**
     * Checks the type of the value.
     */
    $type?: 'string' | 'number' | 'object' | 'array' | 'boolean' | 'null';
    /**
     * Check if an array contains all of these values.
     */
    $all?: T[];
    /**
     * Check the length of an array.
     */
    $len?: number;
    /**
     * Checks if all specific queries are not matching.
     */
    $not?: ForintQuery<T> | ForintQuery<T>[];
    /**
     * Checks if all queries are matching with the value.
     */
    $and?: ForintQuery<T>[];
    /**
     * Checks a value with a regex.
     */
    $regex?: string;
    /**
     * Checks if the value exists.
     */
    $exists?: boolean;
}

export type ElemMatch<T> = { [P in keyof T]?: ForintQuery<T[P]> };

export type ExternalQuery<T extends SupportedType> = ElemMatch<T>;
export interface InternalQuery<T extends SupportedType> extends Query<T> {}

export type ForintQuery<T extends SupportedType = any> =  T | ExternalQuery<T> | InternalQuery<T>;