import { buildParameterizedSql } from "../utils";
const dialect = "mysql";
export function buildPlanetScaleHelpers(client) {
    const execute = async (sql, ...values) => {
        const conn = client.connection();
        const paramSql = buildParameterizedSql(sql, dialect);
        const result = await conn.execute(paramSql, values);
        return { insertId: Number(result.insertId) };
    };
    const query = async (sql, ...values) => {
        const conn = client.connection();
        const paramSql = buildParameterizedSql(sql, dialect);
        const { rows } = await conn.execute(paramSql, values);
        return rows;
    };
    return { execute, query, dialect };
}
export default buildPlanetScaleHelpers;
