import { Client } from "@planetscale/database";
import { ExecuteResult, SqlHelpers } from "./db";

export default function buildPlanetScaleHelpers(client: Client): SqlHelpers {
  const execute = async (sql: string, values: any[]): Promise<ExecuteResult> => {
    const conn = client.connection();
    const result = await conn.execute(sql, values);
    return { insertId: Number(result.insertId) };
  };

  const query = async <T>(sql: string, values: any[]): Promise<T[]> => {
    const conn = client.connection();
    const { rows } = await conn.execute(sql, values);
    return rows as T[];
  };

  return { execute, query };
}
