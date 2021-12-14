/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

export type Filter = (value: any) => boolean;
export type QueryExecutor = (value: any) => boolean;

type ArrayElements<T> = T extends (infer E)[] ? E : never;

type SupportedType =
    | string
    | number
    | null
    | any;

interface FilterObject<T extends SupportedType> {
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
     * Checks if the value is matching with one of the given queries.
     */
    $in?: Query<T>[];
    /**
     * @description
     * Checks if the value is not matching with one of the given queries.
     */
    $nin?: Query<T>[];
    /**
     * @description
     * Checks the data type of the value.
     */
    $type?: 'string' | 'number' | 'object' | 'array' | 'boolean' | 'null';
    /**
     * @description
     * Checks if any elements in the array match all given queries
     * without regard to order or other elements in the array.
     */
    $all?: Query<ArrayElements<T>>[];
    /**
     * @description
     * Checks if at least one array element matches the query.
     */
    $elemMatch?: Query<ArrayElements<T>>;
    /**
     * @description
     * Checks if the length of an array or string matches with the given query.
     */
    $len?: Query<number>;
    /**
     * @description
     * Checks if all specified queries are not matching.
     */
    $not?: Query<T> | Query<T>[];
    /**
     * @description
     * Checks if one of the queries is matching.
     */
    $or?: Query<T>[];
    /**
     * @description
     * Checks if all queries are matching with the value.
     */
    $and?: Query<T>[];
    /**
     * @description
     * Checks that the value matches with the regex.
     */
    $regex?: string;
    /**
     * @description
     * Checks the existence of a value (is not null or undefined).
     */
    $exists?: boolean;
}

export type ElemMatch<T> = { [P in keyof T]?: Query<T[P]> };

export type ExternalQuery<T extends SupportedType> = ElemMatch<T>;
export interface InternalQuery<T extends SupportedType> extends FilterObject<T> {}

export type Query<T extends SupportedType = any> =  T | ExternalQuery<T> | InternalQuery<T>;