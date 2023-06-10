import { User } from "@auth/core/types";
import { Configuration, ExtendedSqlHelpers } from "../types";
import { AdapterUser } from "@auth/core/adapters";
export interface UserRecord {
    id: number;
    name: string | null | undefined;
    email: string;
    email_verified: string | null;
    image: string | null | undefined;
    created_at: Date;
    updated_at: Date;
}
export declare function convertUser(userRecord: UserRecord): AdapterUser;
export declare class UserRepo {
    sql: ExtendedSqlHelpers;
    config: Configuration;
    constructor(sql: ExtendedSqlHelpers, config: Configuration);
    getByStringId(id: string): Promise<UserRecord | null>;
    getById(id: number): Promise<UserRecord | null>;
    getByEmail(email: string): Promise<UserRecord | null>;
    create(user: Omit<User, "id">): Promise<UserRecord | null>;
    deleteById(id: string): Promise<import("../types").ExecuteResult>;
    updateUser(user: User): Promise<UserRecord | null>;
}
//# sourceMappingURL=user.d.ts.map