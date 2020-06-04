/*
Author: Luca Scaringella
GitHub: LucaCode
Copyright(c) Luca Scaringella
 */

import {contentEqual, deepEqual} from "../../src/lib/equalUtils";
const assert      = require("chai").assert;

describe('EqualUtilsTests',() => {

    describe('DeepEqual', () => {
        ([
            {value1: null, value2: null, expected: true},
            {value1: null, value2: undefined, expected: false},
            {value1: undefined, value2: null, expected: false},
            {value1: null, value2: {}, expected: false},
            {value1: {}, value2: null, expected: false},
            {value1: 2, value2: 3, expected: false},
            {value1: 3, value2: 3, expected: true},
            {value1: 'a', value2: 'b', expected: false},
            {value1: 'a', value2: 'a', expected: true},
            {value1: {a: ''}, value2: {a: '',b: ''}, expected: false},
            {value1: {a: ''}, value2: {b: ''}, expected: false},
            {value1: {a: [], f: {c: '12',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: true},
            {value1: {a: [], f: {c: '12',d: 13}}, value2: {a: [], f: {c: '12',d: 12}}, expected: false},
            {value1: {a: [], f: {c: '14',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: false},
            {value1: {a: ['jk'], f: {c: '12',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: false},
            {value1: {a: '', f: {c: '12',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: false},
            {value1: {a: [23,1231,{fo: 'a'}]}, value2: {a: [23,1231,{fo: 'a'}]}, expected: true},
            {value1: {a: [23,1231,{fo: 'b'}]}, value2: {a: [23,1231,{fo: 'a'}]}, expected: false},
        ] as {value1: any, value2: any, expected: boolean}[]).forEach(({value1,value2,expected}) => {
            it(`Should be ${!expected ? 'not ' : ''}deep equal`, () => {
                assert(expected === deepEqual(value1,value2));
            });
        });
    });


    describe('ContentDeepEqual', () => {
        ([
            {value1: null, value2: null, expected: true},
            {value1: null, value2: undefined, expected: true},
            {value1: undefined, value2: null, expected: true},
            {value1: null, value2: {}, expected: false},
            {value1: {}, value2: null, expected: false},
            {value1: 2, value2: 3, expected: false},
            {value1: 3, value2: 3, expected: true},
            {value1: 3, value2: '3', expected: true},
            {value1: 'a', value2: 'b', expected: false},
            {value1: 'a', value2: 'a', expected: true},
            {value1: {a: ''}, value2: {a: '',b: ''}, expected: false},
            {value1: {a: ''}, value2: {b: ''}, expected: false},
            {value1: {a: [], f: {c: '12',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: true},
            {value1: {a: [], f: {c: '12',d: 13}}, value2: {a: [], f: {c: '12',d: 12}}, expected: false},
            {value1: {a: [], f: {c: '14',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: false},
            {value1: {a: ['jk'], f: {c: '12',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: false},
            {value1: {a: '', f: {c: '12',d: 12}}, value2: {a: [], f: {c: '12',d: 12}}, expected: true},
            {value1: {a: '', f: {c: '12',d: '12'}}, value2: {a: [], f: {c: '12',d: 12}}, expected: true},
            {value1: {a: [23,1231,{fo: 'a'}]}, value2: {a: [23,1231,{fo: 'a'}]}, expected: true},
            {value1: {a: [23,1231,{fo: 'b'}]}, value2: {a: [23,1231,{fo: 'a'}]}, expected: false},
        ] as {value1: any, value2: any, expected: boolean}[]).forEach(({value1,value2,expected}) => {
            it(`Should be ${!expected ? 'not ' : ''}deep equal`, () => {
                assert(expected === contentEqual(value1,value2));
            });
        });
    });

});