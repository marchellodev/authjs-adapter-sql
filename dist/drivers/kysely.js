"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildKyselyHelpers = void 0;
const kysely_1 = require("kysely");
function buildKyselyHelpers(db, dialect) {
    const execute = async (sqlStmt, ...values) => {
        const result = await (0, kysely_1.sql)(sqlStmt, ...values).execute(db);
        let insertId = Number(result.insertId);
        if (!insertId && result.rows && result.rows[0])
            insertId = result.rows[0]["id"];
        return { insertId };
    };
    const query = async (sqlStmt, ...values) => {
        const result = await (0, kysely_1.sql)(sqlStmt, ...values).execute(db);
        return result.rows;
    };
    return { execute, query, dialect };
}
exports.buildKyselyHelpers = buildKyselyHelpers;
exports.default = buildKyselyHelpers;
