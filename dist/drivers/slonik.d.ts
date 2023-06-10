import type { SqlHelpers } from "../types";
import { DatabasePool } from "slonik";
export declare function buildSlonikHelpers(getConnection: () => Promise<DatabasePool>): SqlHelpers;
export default buildSlonikHelpers;
//# sourceMappingURL=slonik.d.ts.map