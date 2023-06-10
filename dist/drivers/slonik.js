import { sql } from "slonik";
import { datetimeToString } from "../utils";
const dialect = "postgres";
export function buildSlonikHelpers(getConnection) {
    const execute = async (sqlStmt, ...values) => {
        const connection = await getConnection();
        const result = await connection.query(sql.unsafe(sqlStmt, ...values));
        const insertId = result.rows && result.rows.length > 0 ? result.rows[0]["id"] : null;
        return { insertId: Number(insertId) };
    };
    const query = async (sqlStmt, ...values) => {
        const connection = await getConnection();
        const result = await connection.query(sql.unsafe(sqlStmt, ...values));
        const rows = result.rows;
        // Convert timestamps to Date
        for (let r = 0; r < rows.length; r++) {
            for (let f = 0; f < result.fields.length; f++) {
                const field = result.fields[f];
                if (field.dataTypeId === 1114) {
                    const row = rows[r];
                    row[field.name] = datetimeToString(new Date(row[field.name]), 0);
                }
            }
        }
        return rows;
    };
    return { execute, query, dialect };
}
export default buildSlonikHelpers;
