import { AccountRepo } from "./repo/account";
import { SessionRepo } from "./repo/session";
import { UserRepo } from "./repo/user";
import { VerificationTokenRepo } from "./repo/verification";
import { Configuration, ExtendedSqlHelpers, SqlHelpers } from "./types";
export interface UnitOfWork {
    users: UserRepo;
    sessions: SessionRepo;
    accounts: AccountRepo;
    verificationTokens: VerificationTokenRepo;
    raw: ExtendedSqlHelpers;
}
export declare function buildUnitOfWork(sqlHelpers: SqlHelpers, config?: Configuration): UnitOfWork;
//# sourceMappingURL=db.d.ts.map