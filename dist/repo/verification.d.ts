import { VerificationToken } from "@auth/core/adapters";
import { Configuration, ExecuteResult, ExtendedSqlHelpers } from "../types";
export interface VerificationTokenRecord {
    identifier: string;
    token: string;
    expires: Date;
    created_at: Date;
    updated_at: Date;
}
export declare function convertVerificationToken(tokenRecord: VerificationTokenRecord): VerificationToken;
export declare class VerificationTokenRepo {
    sql: ExtendedSqlHelpers;
    config: Configuration;
    constructor(sql: ExtendedSqlHelpers, config: Configuration);
    getByToken(identifier: string, token: string): Promise<VerificationTokenRecord | null>;
    create(identifier: string, token: string, expires: Date): Promise<VerificationTokenRecord | null>;
    deleteByToken(identifier: string, token: string): Promise<ExecuteResult>;
}
//# sourceMappingURL=verification.d.ts.map