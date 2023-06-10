import { buildParameterizedSql } from "../utils";
const dialect = "postgres";
export function buildNeonHelpers(pool) {
    const execute = async (sql, ...values) => {
        const paramSql = buildParameterizedSql(sql, dialect);
        const { rows } = await pool.query(paramSql, values);
        const insertId = rows.length > 0 ? rows[0]["id"] : null;
        return { insertId: Number(insertId) };
    };
    const query = async (sql, ...values) => {
        const paramSql = buildParameterizedSql(sql, dialect);
        const { rows } = await pool.query(paramSql, values);
        return rows;
    };
    return { execute, query, dialect };
}
export default buildNeonHelpers;
