import { AdapterAccount } from "@auth/core/adapters";
import { ProviderType } from "@auth/core/providers";
import { Configuration, ExtendedSqlHelpers } from "../types";
export interface AccountRecord {
    id: number;
    user_id: number;
    type: Extract<ProviderType, "oauth" | "oidc" | "email">;
    provider: string;
    provider_account_id: string;
    access_token?: string;
    refresh_token?: string;
    expires_at?: number | string;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    oauth_token_secret?: string;
    oauth_token?: string;
    created_at: Date;
    updated_at: Date;
}
export declare function convertAccount(rec: AccountRecord): AdapterAccount;
export declare class AccountRepo {
    sql: ExtendedSqlHelpers;
    config: Configuration;
    constructor(sql: ExtendedSqlHelpers, config: Configuration);
    getById(id: number): Promise<AccountRecord | null>;
    getByProvider(provider: string, providerAccountId: string): Promise<AccountRecord | null>;
    deleteByProvider(provider: string, providerAccountId: string): Promise<import("../types").ExecuteResult>;
    deleteByUserId(userId: string): Promise<import("../types").ExecuteResult>;
    create(rec: Omit<AccountRecord, "id" | "oauth_token_secret" | "oauth_token" | "created_at" | "updated_at">): Promise<AccountRecord | null>;
}
//# sourceMappingURL=account.d.ts.map