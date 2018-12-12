"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const constants_1 = require("./constants");
exports.QueryHandler = (query) => {
    return (target) => {
        Reflect.defineMetadata(constants_1.QUERY_HANDLER_METADATA, query, target);
    };
};
