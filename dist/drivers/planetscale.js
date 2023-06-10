"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPlanetScaleHelpers = void 0;
const utils_1 = require("../utils");
const dialect = "mysql";
function buildPlanetScaleHelpers(client) {
    const execute = async (sql, ...values) => {
        const conn = client.connection();
        const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
        const result = await conn.execute(paramSql, values);
        return { insertId: Number(result.insertId) };
    };
    const query = async (sql, ...values) => {
        const conn = client.connection();
        const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
        const { rows } = await conn.execute(paramSql, values);
        return rows;
    };
    return { execute, query, dialect };
}
exports.buildPlanetScaleHelpers = buildPlanetScaleHelpers;
exports.default = buildPlanetScaleHelpers;
