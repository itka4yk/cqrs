"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("./exceptions");
const observable_bus_1 = require("./utils/observable-bus");
const constants_1 = require("./utils/constants");
const _1 = require(".");
let QueryBus = class QueryBus extends observable_bus_1.ObservableBus {
    constructor() {
        super(...arguments);
        this.handlers = new Map();
        this.moduleRef = null;
    }
    setModuleRef(moduleRef) {
        this.moduleRef = moduleRef;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const handler = this.handlers.get(this.getQueryName(query));
            if (!handler)
                throw new exceptions_1.QueryHandlerNotFoundException();
            this.subject$.next(query);
            const result = yield handler.execute(query);
            return result;
        });
    }
    bind(handler, name) {
        this.handlers.set(name, handler);
    }
    register(handlers) {
        handlers.forEach(handler => this.registerHandler(handler));
    }
    registerHandler(handler) {
        if (!this.moduleRef) {
            throw new _1.InvalidModuleRefException();
        }
        const instance = this.moduleRef.get(handler);
        if (!instance)
            return;
        const target = this.reflectQueryName(handler);
        if (!target) {
            throw new _1.InvalidQueryHandlerException();
        }
        this.bind(instance, target.name);
    }
    getQueryName(query) {
        const { constructor } = Object.getPrototypeOf(query);
        return constructor.name;
    }
    reflectQueryName(handler) {
        return Reflect.getMetadata(constants_1.QUERY_HANDLER_METADATA, handler);
    }
};
QueryBus = __decorate([
    common_1.Injectable()
], QueryBus);
exports.QueryBus = QueryBus;
