"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNeonHelpers = void 0;
const utils_1 = require("../utils");
const dialect = "postgres";
function buildNeonHelpers(pool) {
    const execute = async (sql, ...values) => {
        const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
        const { rows } = await pool.query(paramSql, values);
        const insertId = rows.length > 0 ? rows[0]["id"] : null;
        return { insertId: Number(insertId) };
    };
    const query = async (sql, ...values) => {
        const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
        const { rows } = await pool.query(paramSql, values);
        return rows;
    };
    return { execute, query, dialect };
}
exports.buildNeonHelpers = buildNeonHelpers;
exports.default = buildNeonHelpers;
