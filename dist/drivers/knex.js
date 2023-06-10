import { buildParameterizedSql } from "../utils";
export function buildKnexHelpers(knex, dialect) {
    const execute = async (sql, ...values) => {
        const paramSql = buildParameterizedSql(sql, "mysql");
        const result = await knex.raw(paramSql, values);
        if (dialect == "mysql")
            return { insertId: Number(result[0].insertId) };
        let insertId = 0;
        if (result.rows && result.rows[0])
            insertId = result.rows[0]["id"];
        return { insertId };
    };
    const query = async (sql, ...values) => {
        const paramSql = buildParameterizedSql(sql, "mysql");
        const result = await knex.raw(paramSql, values);
        if (dialect == "mysql")
            return result[0];
        return result.rows;
    };
    return { execute, query, dialect };
}
export default buildKnexHelpers;
