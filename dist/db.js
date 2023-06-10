import { AccountRepo } from "./repo/account";
import { SessionRepo } from "./repo/session";
import { UserRepo } from "./repo/user";
import { VerificationTokenRepo } from "./repo/verification";
import { replacePrefix, replaceUndefined } from "./utils";
function buildExtendedSqlHelpers(sqlHelpers, config) {
    const execute = async (sql, ...values) => {
        const replacedValues = replaceUndefined(values);
        const sqlWithPrefix = replacePrefix(sql, config.prefix);
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
        const sqlWithPrefix = replacePrefix(sql, config.prefix);
        const replacedValues = replaceUndefined(values);
        const rows = await sqlHelpers.query(sqlWithPrefix, ...replacedValues);
        if (rows.length == 1)
            return rows[0];
        return null;
    };
    return { ...sqlHelpers, execute, queryOne, insert };
}
export function buildUnitOfWork(sqlHelpers, config) {
    config || (config = {});
    config.prefix || (config.prefix = "");
    const esqlHelpers = buildExtendedSqlHelpers(sqlHelpers, config);
    return {
        users: new UserRepo(esqlHelpers, config),
        sessions: new SessionRepo(esqlHelpers, config),
        accounts: new AccountRepo(esqlHelpers, config),
        verificationTokens: new VerificationTokenRepo(esqlHelpers, config),
        raw: esqlHelpers,
    };
}
