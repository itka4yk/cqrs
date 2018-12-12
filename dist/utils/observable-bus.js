"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const isEmpty = array => !(array && array.length > 0);
class ObservableBus extends rxjs_1.Observable {
    constructor() {
        super();
        this.subject$ = new rxjs_1.Subject();
        this.source = this.subject$;
    }
    ofType(...types) {
        return this.pipe(operators_1.filter(event => !isEmpty(types.filter(type => event instanceof type))));
    }
}
exports.ObservableBus = ObservableBus;
