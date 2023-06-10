import type { Connection } from "mysql2/promise";
import type { SqlHelpers } from "../types";
export declare function buildMysql2Helpers(getConnection: () => Promise<Connection>): SqlHelpers;
export default buildMysql2Helpers;
//# sourceMappingURL=mysql2.d.ts.map