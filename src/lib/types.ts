/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

export type Filter = (value: any) => boolean;
export type QueryExecutor = (value: any) => boolean;

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
     * Checks if the value is content deep equal (== instead of ===).
     */
    $ceq?: T,
    /**
     * @description
     * Checks if the value is not content deep equal. (!= instead of !==).
     */
    $nce?: T,
    /**
     * @description
     * Checks if one of the queries is matching.
     */
    $or?: ForintQuery<T>[];
    /**
     * @description
     * Checks if the value is greater.
     */
    $gt?: number;
    /**
     * @description
     * Checks if the value is greater or equals.
     */
    $gte?: number;
    /**
     * @description
     * Checks if the value is lesser.
     */
    $lt?: number;
    /**
     * @description
     * Checks if the value is lesser or equals.
     */
    $lte?: number;
    /**
     * @description
     * Checks if the value is matching with one of these queries.
     */
    $in?: ForintQuery<T>[];
    /**
     * @description
     * Checks if the value is not matching with one of these queries.
     */
    $nin?: ForintQuery<T>[];
    /**
     * @description
     * Checks the data type of the value.
     */
    $type?: 'string' | 'number' | 'object' | 'array' | 'boolean' | 'null';
    /**
     * @description
     * Checks if elements in the array match with all given queries.
     * Without regard to order or other elements in the array.
     */
    $all?: ForintQuery<T>[];
    /**
     * @description
     * Checks if at least one array element matches the query.
     */
    $elemMatch?: ForintQuery<T>;
    /**
     * @description
     * Checks the length of an array.
     */
    $len?: number;
    /**
     * @description
     * Checks if all specified queries are not matching.
     */
    $not?: ForintQuery<T> | ForintQuery<T>[];
    /**
     * @description
     * Checks if all queries are matching with the value.
     */
    $and?: ForintQuery<T>[];
    /**
     * @description
     * Checks that the value matches with the regex.
     */
    $regex?: string;
    /**
     * @description
     * Checks if the value exists (is not null or undefined).
     */
    $exists?: boolean;
}

export type ElemMatch<T> = { [P in keyof T]?: ForintQuery<T[P]> };

export type ExternalQuery<T extends SupportedType> = ElemMatch<T>;
export interface InternalQuery<T extends SupportedType> extends Query<T> {}

export type ForintQuery<T extends SupportedType = any> =  T | ExternalQuery<T> | InternalQuery<T>;