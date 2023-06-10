"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUnitOfWork = void 0;
const account_1 = require("./repo/account");
const session_1 = require("./repo/session");
const user_1 = require("./repo/user");
const verification_1 = require("./repo/verification");
const utils_1 = require("./utils");
function buildExtendedSqlHelpers(sqlHelpers, config) {
    const execute = async (sql, ...values) => {
        const replacedValues = (0, utils_1.replaceUndefined)(values);
        const sqlWithPrefix = (0, utils_1.replacePrefix)(sql, config.prefix);
        return await sqlHelpers.execute(sqlWithPrefix, ...replacedValues);
    };
    //samen as execute, but return the id for postgres
    const insert = async (sql, ...values) => {
        let insertSql = sql.concat();
        if (sqlHelpers.dialect == "postgres") {
            insertSql[insertSql.length - 1] += " returning id";
        }
        return await execute(insertSql, ...values);
    };
    const queryOne = async (sql, ...values) => {
        const sqlWithPrefix = (0, utils_1.replacePrefix)(sql, config.prefix);
        const replacedValues = (0, utils_1.replaceUndefined)(values);
        const rows = await sqlHelpers.query(sqlWithPrefix, ...replacedValues);
        if (rows.length == 1)
            return rows[0];
        return null;
    };
    return { ...sqlHelpers, execute, queryOne, insert };
}
function buildUnitOfWork(sqlHelpers, config) {
    config || (config = {});
    config.prefix || (config.prefix = "");
    const esqlHelpers = buildExtendedSqlHelpers(sqlHelpers, config);
    return {
        users: new user_1.UserRepo(esqlHelpers, config),
        sessions: new session_1.SessionRepo(esqlHelpers, config),
        accounts: new account_1.AccountRepo(esqlHelpers, config),
        verificationTokens: new verification_1.VerificationTokenRepo(esqlHelpers, config),
        raw: esqlHelpers,
    };
}
exports.buildUnitOfWork = buildUnitOfWork;
