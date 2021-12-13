/*
Author: Ing. Luca Gian Scaringella
GitHub: LucaCode
Copyright(c) Ing. Luca Gian Scaringella
 */

import forint from "../src";

const assert = require("chai").assert;

describe('QueryTests', () => {

    [
        {
            title: 'Equals Filter',
            tests: [
                {
                    query: {
                        person: {
                            $eq: {
                                name: 'luca',
                                age: 20
                            }
                        }
                    },
                    data: {person: {name: 'luca', age: 20}},
                    expect: true
                },
                {
                    query: {
                        person: {
                            $neq: {
                                name: 'luca',
                                age: 20
                            }
                        }
                    },
                    data: {person: {name: 'lucaa', age: 22}},
                    expect: true
                },
                {
                    query: {
                        name: 'Luca'
                    },
                    data: {
                        name: 'Luca'
                    },
                    expect: true
                },
                {
                    query: {
                        code: 10
                    },
                    data: {
                        code: '10'
                    },
                    expect: false
                },
                {
                    query: 10,
                    data: 10,
                    expect: true
                },
                {
                    query: '10',
                    data: 10,
                    expect: false
                }
            ]
        },
        {
            title: 'Content Equals Filter',
            tests: [
                {
                    query: {
                        person: {
                            $ceq: {
                                name: 'luca',
                                age: '20'
                            }
                        }
                    },
                    data: {person: {name: 'luca', age: 20}},
                    expect: true
                },
                {
                    query: {
                        person: {
                            $nceq: {
                                name: 'luca',
                                age: '200'
                            }
                        }
                    },
                    data: {person: {name: 'luca', age: 22}},
                    expect: true
                }
            ]
        },
        {
            title: 'Or query',
            tests: [
                {
                    query: {
                        person: {
                            $or: [{
                                name: 'luca'
                            }, {
                                name: 'gag'
                            }]
                        }
                    },
                    data: {person: {name: 'luca', age: 20}},
                    expect: true
                },
                {
                    query: {
                        person: {
                            $or: [{
                                name: 'luca'
                            }, {
                                name: 'gag'
                            }]
                        }
                    },
                    data: {person: {name: 'lucaa', age: 22}},
                    expect: false
                }
            ]
        },
        {
            title: 'Gt filter',
            tests: [
                {
                    query: {
                        v: {
                            $gt: 10
                        }
                    },
                    data: {v: 12},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $gt: 10
                        }
                    },
                    data: {v: 2},
                    expect: false
                }
            ]
        },
        {
            title: 'Gte filter',
            tests: [
                {
                    query: {
                        v: {
                            $gte: 10
                        }
                    },
                    data: {v: 10},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $gte: 10
                        }
                    },
                    data: {v: 12},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $gte: 10
                        }
                    },
                    data: {v: 2},
                    expect: false
                }
            ]
        },
        {
            title: 'Lt filter',
            tests: [
                {
                    query: {
                        v: {
                            $lt: 10
                        }
                    },
                    data: {v: 8},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $lt: 10
                        }
                    },
                    data: {v: 12},
                    expect: false
                }
            ]
        },
        {
            title: 'Lte filter',
            tests: [
                {
                    query: {
                        v: {
                            $lte: 10
                        }
                    },
                    data: {v: 10},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $lte: 10
                        }
                    },
                    data: {v: 8},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $lte: 10
                        }
                    },
                    data: {v: 12},
                    expect: false
                }
            ]
        },
        {
            title: 'In filter',
            tests: [
                {
                    query: {
                        v: {
                            $in: ['hello', 10, 0]
                        }
                    },
                    data: {v: 10},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $in: ['hello', 10, 0]
                        }
                    },
                    data: {v: 'hello'},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $in: ['hello', 10, 0]
                        }
                    },
                    data: {v: 'foo'},
                    expect: false
                }
            ]
        },
        {
            title: 'Not in filter',
            tests: [
                {
                    query: {
                        v: {
                            $nin: ['hello', 10, 0]
                        }
                    },
                    data: {v: 18},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $nin: ['hello', 10, 0]
                        }
                    },
                    data: {v: 'hey'},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $nin: ['hello', 10, 0]
                        }
                    },
                    data: {v: 'hello'},
                    expect: false
                }
            ]
        },
        {
            title: 'Type filter',
            tests: [
                {
                    query: {
                        v: {
                            $type: 'array'
                        }
                    },
                    data: {v: []},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $type: 'number'
                        }
                    },
                    data: {v: 20},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $type: 'null'
                        }
                    },
                    data: {v: null},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $type: 'null'
                        }
                    },
                    data: {v: ''},
                    expect: false
                },
                {
                    query: {
                        v: {
                            $type: 'string'
                        }
                    },
                    data: {v: 30},
                    expect: false
                }
            ]
        },
        {
            title: 'All filter',
            tests: [
                {
                    query: {
                        v: {
                            $all: ['hello', 'hey', 'hi']
                        }
                    },
                    data: {v: ['hello', 'yolo', 'hey', 'foo', 'hi']},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $all: ['hello', 'hey', 'hi']
                        }
                    },
                    data: {v: ['hello', 'yolo', 'hey', 'foo']},
                    expect: false
                },
                {
                    query: {
                        v: {
                            $all: ['hello', 'hey', 'hi']
                        }
                    },
                    data: {v: ''},
                    expect: false
                }
            ]
        },
        {
            title: 'ElemMatch filter',
            tests: [
                {
                    query: {
                        v: {
                            $elemMatch: {$gte : 10}
                        }
                    },
                    data: {v: [1,5,4,10]},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $elemMatch: {$gte : 10}
                        }
                    },
                    data: {v: [1,2,3,4,5,6]},
                    expect: false
                },
                {
                    query: {
                        v: {
                            $elemMatch: {$gte : 10}
                        }
                    },
                    data: {v: ''},
                    expect: false
                }
            ]
        },
        {
            title: 'Len filter',
            tests: [
                {
                    query: {
                        v: {
                            $len: 5
                        }
                    },
                    data: {v: ['hello', 'yolo', 'hey', 'foo', 'hi']},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $len: 5
                        }
                    },
                    data: {v: ['hello', 'yolo', 'hey', 'foo']},
                    expect: false
                }
            ]
        },
        {
            title: 'Not query',
            tests: [
                {
                    query: {
                        person: {
                            $not: [{
                                name: 'lucaa'
                            }, {
                                age: {
                                    $gt: 28
                                }
                            }]
                        }
                    },
                    data: {person: {name: 'luca', age: 20}},
                    expect: true
                },
                {
                    query: {
                        person: {
                            $not: {
                                name: 'gag'
                            }
                        }
                    },
                    data: {person: {name: 'luca', age: 22}},
                    expect: true
                },
                {
                    query: {
                        person: {
                            $not: {
                                name: 'luca'
                            }
                        }
                    },
                    data: {person: {name: 'luca', age: 22}},
                    expect: false
                },
                {
                    query: {
                        person: {
                            $not: [{
                                name: 'lucaa'
                            }, {
                                age: {
                                    $gt: 28
                                }
                            }]
                        }
                    },
                    data: {person: {name: 'luca', age: 30}},
                    expect: false
                },
            ]
        },
        {
            title: 'And query',
            tests: [
                {
                    query: {
                        person: {
                            $and: [{
                                name: 'luca'
                            }, {
                                age: {
                                    $gt: 18
                                }
                            }]
                        }
                    },
                    data: {person: {name: 'luca', age: 20}},
                    expect: true
                },
                {
                    query: {
                        person: {
                            $and: [{
                                name: 'luca'
                            }, {
                                age: {
                                    $lt: 18
                                }
                            }]
                        }
                    },
                    data: {person: {name: 'luca', age: 22}},
                    expect: false
                },
            ]
        },
        {
            title: 'Regex filter',
            tests: [
                {
                    query: {
                        v: {
                            $regex: '^[0-9]*$'
                        }
                    },
                    data: {v: '45353'},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $regex: '^[0-9]*$'
                        }
                    },
                    data: {v: '343a53'},
                    expect: false
                },
            ]
        },
        {
            title: 'Exist filter',
            tests: [
                {
                    query: {
                        v: {
                            $exists: true
                        }
                    },
                    data: {v: 'hey'},
                    expect: true
                },
                {
                    query: {
                        v: {
                            $exists: false
                        }
                    },
                    data: {v: 'hey'},
                    expect: false
                },
            ]
        },
        {
            title: 'Stability',
            tests: [
                {
                    title: 'Undefined should not match',
                    query: {
                        person: {
                            $eq: {
                                name: 'luca',
                                age: 20
                            }
                        }
                    },
                    data: undefined,
                    expect: false
                },
                {
                    title: 'Deep undefined should not match',
                    query: {
                        person: {
                            name: 'luca',
                            age: {
                                gt: 10,
                                $in: [20, 11, 45]
                            }
                        }
                    },
                    data: {person: {name: 'luca', age: undefined}},
                    expect: false
                },
                {
                    title: 'Null should not match',
                    query: {
                        person: {
                            name: 'luca'
                        }
                    },
                    data: null,
                    expect: false
                },
                {
                    title: 'Deep null should not match',
                    query: {
                        person: {
                            name: 'luca',
                            age: {
                                gt: 10,
                                $in: [20, 11, 45]
                            }
                        }
                    },
                    data: {person: {name: 'luca', age: null}},
                    expect: false
                },
            ]
        }
    ].forEach(testSet => {
        describe(testSet.title, () => {
            testSet.tests.forEach((test, index) => {
                it(test.title || `${index} should ${test.expect ? 'match' : 'not match'}`, () => {
                    assert(forint(test.query)(test.data) === test.expect);
                });
            });
        })
    })
});