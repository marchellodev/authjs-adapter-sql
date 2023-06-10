import type { IDatabase } from "pg-promise";
import type { SqlHelpers } from "../types";
export declare function buildPgPromiseHelpers(getConnection: () => IDatabase<{}> & {}): SqlHelpers;
export default buildPgPromiseHelpers;
//# sourceMappingURL=pg-promise.d.ts.map