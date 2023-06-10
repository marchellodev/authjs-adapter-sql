"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMysql2Helpers = void 0;
const utils_1 = require("../utils");
const dialect = "mysql";
function buildMysql2Helpers(getConnection) {
    const execute = async (sql, ...values) => {
        const conn = await getConnection();
        try {
            const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
            const result = (await conn.execute(paramSql, values));
            return { insertId: Number(result[0].insertId) };
        }
        finally {
            await conn.end();
        }
    };
    const query = async (sql, ...values) => {
        const conn = await getConnection();
        try {
            const paramSql = (0, utils_1.buildParameterizedSql)(sql, dialect);
            const [rows] = await conn.query(paramSql, values);
            return rows;
        }
        finally {
            await conn.end();
        }
    };
    return { execute, query, dialect };
}
exports.buildMysql2Helpers = buildMysql2Helpers;
exports.default = buildMysql2Helpers;
