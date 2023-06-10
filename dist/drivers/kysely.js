import { sql } from "kysely";
export function buildKyselyHelpers(db, dialect) {
    const execute = async (sqlStmt, ...values) => {
        const result = await sql(sqlStmt, ...values).execute(db);
        let insertId = Number(result.insertId);
        if (!insertId && result.rows && result.rows[0])
            insertId = result.rows[0]["id"];
        return { insertId };
    };
    const query = async (sqlStmt, ...values) => {
        const result = await sql(sqlStmt, ...values).execute(db);
        return result.rows;
    };
    return { execute, query, dialect };
}
export default buildKyselyHelpers;
