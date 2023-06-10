import { buildParameterizedSql } from "../utils";
const dialect = "postgres";
export function buildPgPromiseHelpers(getConnection) {
    const execute = async (sql, ...values) => {
        const db = getConnection();
        const paramSql = buildParameterizedSql(sql, dialect);
        const result = await db.query(paramSql, values);
        const insertId = result.length > 0 ? result[0]["id"] : null;
        return { insertId: Number(insertId) };
    };
    const query = async (sql, ...values) => {
        const db = getConnection();
        const paramSql = buildParameterizedSql(sql, dialect);
        return await db.query(paramSql, values);
    };
    return { execute, query, dialect };
}
export default buildPgPromiseHelpers;
