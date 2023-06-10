"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPgPromiseHelpers = void 0;
const utils_1 = require("../utils");
const dialect = "postgres";
function buildPgPromiseHelpers(getConnection) {
    const execute = async (sql, ...values) => {
        const db = getConnection();
        const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
        const result = await db.query(paramSql, values);
        const insertId = result.length > 0 ? result[0]["id"] : null;
        return { insertId: Number(insertId) };
    };
    const query = async (sql, ...values) => {
        const db = getConnection();
        const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
        return await db.query(paramSql, values);
    };
    return { execute, query, dialect };
}
exports.buildPgPromiseHelpers = buildPgPromiseHelpers;
exports.default = buildPgPromiseHelpers;
