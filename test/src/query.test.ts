/*
Author: Luca Scaringella
GitHub: LucaCode
Copyright(c) Luca Scaringella
 */

import forint from "../../src";

const assert            = require("chai").assert;

describe('QueryTests',() => {

    describe('Equals Filter', () => {

        it('With two matching objects', () => {
            assert(forint({
                person : {
                    $eq : {
                        name : 'luca',
                        age : 20
                    }
                }
            })({person : {name : 'luca',age : 20}}));
        });

        it('With two not matching objects', () => {
            assert(forint({
                person : {
                    $neq : {
                        name : 'luca',
                        age : 20
                    }
                }
            })({person : {name : 'lucaa',age : 22}}));
        });
    });

    describe('Content Equals Filter', () => {

        it('With two matching objects', () => {
            assert(forint({
                person : {
                    $ceq : {
                        name : 'luca',
                        age : '20'
                    }
                }
            })({person : {name : 'luca',age : 20}}));
        });

        it('With two not matching objects', () => {
            assert(forint({
                person : {
                    $nceq : {
                        name : 'luca',
                        age : '200'
                    }
                }
            })({person : {name : 'luca',age : 22}}));
        });
    });

    describe('Or query', () => {

        it('With one matching query', () => {
            assert(forint({
                person : {
                    $or : [{
                        name : 'luca'
                    },{
                        name : 'gag'
                    }]
                }
            })({person : {name : 'luca',age : 20}}));
        });

        it('With no matching query', () => {
            assert(!forint({
                person : {
                    $or : [{
                        name : 'luca'
                    },{
                        name : 'gag'
                    }]
                }
            })({person : {name : 'lucaa',age : 22}}));
        });
    });

    describe('Gt filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $gt : 10
                }
            })({v : 12}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $gt : 10
                }
            })({v : 2}));
        });
    });

    describe('Gte filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $gte : 10
                }
            })({v : 10}));
        });

        it('With matching value', () => {
            assert(forint({
                v : {
                    $gte : 10
                }
            })({v : 12}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $gte : 10
                }
            })({v : 2}));
        });
    });

    describe('Lt filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $lt : 10
                }
            })({v : 8}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $lt : 10
                }
            })({v : 12}));
        });
    });

    describe('Lte filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $lte : 10
                }
            })({v : 10}));
        });

        it('With matching value', () => {
            assert(forint({
                v : {
                    $lte : 10
                }
            })({v : 8}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $lte : 10
                }
            })({v : 12}));
        });
    });

    describe('In filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $in : ['hello',10,0]
                }
            })({v : 10}));
        });

        it('With matching value', () => {
            assert(forint({
                v : {
                    $in : ['hello',10,0]
                }
            })({v : 'hello'}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $in : ['hello',10,0]
                }
            })({v : 'foo'}));
        });
    });

    describe('Not in filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $nin : ['hello',10,0]
                }
            })({v : 18}));
        });

        it('With matching value', () => {
            assert(forint({
                v : {
                    $nin : ['hello',10,0]
                }
            })({v : 'hey'}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $nin : ['hello',10,0]
                }
            })({v : 'hello'}));
        });
    });

    describe('Type filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                   $type : 'array'
                }
            })({v : []}));
        });

        it('With matching value', () => {
            assert(forint({
                v : {
                    $type : 'number'
                }
            })({v : 20}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $type : 'string'
                }
            })({v : 30}));
        });
    });

    describe('All filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $all : ['hello','hey','hi']
                }
            })({v : ['hello','yolo','hey','foo','hi']}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $all : ['hello','hey','hi']
                }
            })({v : ['hello','yolo','hey','foo']}));
        });
    });

    describe('Len filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                    $len : 5
                }
            })({v : ['hello','yolo','hey','foo','hi']}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $len : 5
                }
            })({v : ['hello','yolo','hey','foo']}));
        });
    });

    describe('Not query', () => {

        it('With no matching queries', () => {
            assert(forint({
                person : {
                    $not : [{
                        name : 'lucaa'
                    },{
                        age : {
                            $gt : 28
                        }
                    }]
                }
            })({person : {name : 'luca',age : 20}}));
        });

        it('With no matching query', () => {
            assert(forint({
                person : {
                    $not : {
                        name : 'gag'
                    }
                }
            })({person : {name : 'luca',age : 22}}));
        });

        it('With matching query', () => {
            assert(!forint({
                person : {
                    $not : {
                        name : 'luca'
                    }
                }
            })({person : {name : 'luca',age : 22}}));
        });
    });

    describe('And query', () => {

        it('With matching queries', () => {
            assert(forint({
                person : {
                    $and : [{
                        name : 'luca'
                    },{
                       age : {
                           $gt : 18
                       }
                    }]
                }
            })({person : {name : 'luca',age : 20}}));
        });

        it('With one matching query', () => {
            assert(!forint({
                person : {
                    $and : [{
                        name : 'luca'
                    },{
                        age : {
                            $lt : 18
                        }
                    }]
                }
            })({person : {name : 'luca',age : 22}}));
        });
    });

    describe('Regex filter', () => {

        it('With matching value', () => {
            assert(forint({
                v : {
                   $regex : '^[0-9]*$'
                }
            })({v : '45353'}));
        });

        it('With not matching value', () => {
            assert(!forint({
                v : {
                    $regex: '^[0-9]*$'
                }
            })({v : '343a53'}));
        });
    });

    describe('Exist filter', () => {

        it('Should exist', () => {
            assert(forint({
                v : {
                    $exists : true
                }
            })({v : 'hey'}));
        });

        it('Should not exist', () => {
            assert(!forint({
                v : {
                    $exists : false
                }
            })({v : 'hey'}));
        });
    });

});