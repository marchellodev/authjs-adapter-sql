import { buildParameterizedSql } from "../utils";
const dialect = "mysql";
export function buildMysql2Helpers(getConnection) {
    const execute = async (sql, ...values) => {
        const conn = await getConnection();
        try {
            const paramSql = buildParameterizedSql(sql, dialect);
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
            const paramSql = buildParameterizedSql(sql, dialect);
            const [rows] = await conn.query(paramSql, values);
            return rows;
        }
        finally {
            await conn.end();
        }
    };
    return { execute, query, dialect };
}
export default buildMysql2Helpers;
