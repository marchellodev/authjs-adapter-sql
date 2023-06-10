import { Configuration, ExtendedSqlHelpers } from "../types";
export interface SessionRecord {
    id: number;
    user_id: number;
    expires: string;
    session_token: string;
    created_at: Date;
    updated_at: Date;
}
export declare function convertSession(rec: SessionRecord): any;
export declare class SessionRepo {
    sql: ExtendedSqlHelpers;
    config: Configuration;
    constructor(sql: ExtendedSqlHelpers, config: Configuration);
    getById(id: number): Promise<SessionRecord | null>;
    getByToken(token: string): Promise<SessionRecord | null>;
    deleteByUserId(userId: string): Promise<void>;
    deleteByToken(token: string): Promise<void>;
    create(userId: string, sessionToken: string, expires: Date): Promise<SessionRecord | null>;
    updateExpires(sessionToken: string, expires?: Date): Promise<SessionRecord | null>;
}
//# sourceMappingURL=session.d.ts.map