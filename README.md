# Queric 🔎

[![Downloads](https://img.shields.io/npm/dm/queric)](https://www.npmjs.com/package/queric)
[![Minzipped size](https://img.shields.io/bundlephobia/minzip/queric)](https://www.npmjs.com/package/queric)
[![Test coverage](https://img.shields.io/badge/test%20coverage-100%20%25-brightgreen)](https://www.npmjs.com/package/queric)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

## What is Queric

***Queric*** is a high-performance MongoDB inspired TypeScript query library.
You can use it to check if a value matches with a given query or to filter an array.
Queric prepares queries to get high-performance when executing a query multiple times. 

## How to use Queric

### Basic usage

```typescript
import queric from "queric";

interface Person {
    name: string
    age: number
    hobbies: string[]
}

//Some random persons
const persons: Person[] = [...];

//Build a query typesafe
const adultQuery = queric<Person>({
    age: {$gte: 18}
});

//Use it to check if a value matches
const matches = adultQuery(persons[0]);

//Or to filter an array
const adults = persons.filter(adultQuery);
```

### Queries

Queric queries are nested objects with filters. 
A filter is a simple object property starting with a dollar symbol. 
These filter objects can be assigned to a query property.
When you assign a non-object type value to a query property or use it 
as a query, the $eq filter is automatically used. 

```typescript
import queric from "queric";

queric({
    age: {
        //Filter object
        $gte: 18,
        $lte: 30,
    },
    car: {
        color: {
            //Filter object
            $in: ["black","white"]
        },
        //Will automatically converted to {$eq: 50000}
        price: 50000
    }
})
```

### Supported filters

***$eq: any***  
Checks if the value is deep equal.

***$ne: any***  
Checks if the value is not deep equal.

***$ceq: any***  
Checks if the value is content deep equal (== instead of ===).

***$nce: any***  
Checks if the value is not content deep equal. (!= instead of !==).

***$gt: number***  
Checks if the value is greater.

***$gte: number***  
Checks if the value is greater or equals.

***$lt: number***  
Checks if the value is lesser.

***$lte: number***  
Checks if the value is lesser or equals.

***$in: Query[]***  
Checks if the value is matching with one of the given queries.

***$nin: Query[]***  
Checks if the value is not matching with one of the given queries.

***$type: 'string' | 'number' | 'object' | 'array' | 'boolean' | 'null'***  
Checks the data type of the value.

***$all: Query[]***  
Checks if any elements in the array match all given queries 
without regard to order or other elements in the array.

***$elemMatch: Query***  
Checks if at least one array element matches the query.

***$len: Query\<number>***  
Checks if the length of an array or string matches with the given query.

***$not: Query | Query[]***  
Checks if all specified queries are not matching.

***$or: Query[]***  
Checks if one of the queries is matching.

***$and: Query[]***  
Checks if all queries are matching with the value.

***$regex: string***  
Checks that the value matches with the regex.

***$exists: boolean***  
Checks the existence of a value (is not null or undefined).

## License

MIT License

Copyright (c) 2021 Ing. Luca Gian Scaringella

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
