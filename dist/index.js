"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlAdapter = void 0;
const db_1 = require("./db");
const user_1 = require("./repo/user");
const verification_1 = require("./repo/verification");
const session_1 = require("./repo/session");
function SqlAdapter(sqlHelpers, config) {
    const db = (0, db_1.buildUnitOfWork)(sqlHelpers, config);
    return {
        async createUser(user) {
            const userRecord = await db.users.create(user);
            if (userRecord == null)
                throw new Error("creaing user failed!");
            return (0, user_1.convertUser)(userRecord);
        },
        async getUser(id) {
            const userRecord = await db.users.getByStringId(id);
            if (userRecord == null)
                return null;
            return (0, user_1.convertUser)(userRecord);
        },
        async getUserByEmail(email) {
            const userRecord = await db.users.getByEmail(email);
            if (userRecord == null)
                return null;
            return (0, user_1.convertUser)(userRecord);
        },
        async getUserByAccount({ provider, providerAccountId }) {
            const account = await db.accounts.getByProvider(provider, providerAccountId);
            if (account == null)
                return null;
            const user = await db.users.getById(account.user_id);
            if (user == null)
                return null;
            return (0, user_1.convertUser)(user);
        },
        async updateUser(user) {
            if (!user.id)
                throw new Error("empty user id");
            const userRecord = await db.users.updateUser(user);
            if (userRecord == null)
                throw new Error("user not found after update");
            return (0, user_1.convertUser)(userRecord);
        },
        async deleteUser(userId) {
            await db.sessions.deleteByUserId(userId);
            await db.accounts.deleteByUserId(userId);
            await db.users.deleteById(userId);
        },
        async linkAccount(account) {
            await db.accounts.create({
                user_id: Number(account.userId),
                type: account.type,
                provider: account.provider,
                provider_account_id: account.providerAccountId,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state?.toString(),
            });
        },
        async unlinkAccount({ provider, providerAccountId }) {
            await db.accounts.deleteByProvider(provider, providerAccountId);
        },
        async createSession(session) {
            const sessionRecord = await db.sessions.create(session.userId, session.sessionToken, session.expires);
            if (sessionRecord == null)
                return null;
            return (0, session_1.convertSession)(sessionRecord);
        },
        async getSessionAndUser(sessionToken) {
            const sessionRecord = await db.sessions.getByToken(sessionToken);
            if (sessionRecord == null)
                return null;
            const userRecord = await db.users.getById(sessionRecord.user_id);
            if (userRecord == null)
                return null;
            return {
                session: (0, session_1.convertSession)(sessionRecord),
                user: (0, user_1.convertUser)(userRecord),
            };
        },
        async updateSession({ sessionToken, expires }) {
            const sessionRecord = await db.sessions.updateExpires(sessionToken, expires);
            if (sessionRecord == null)
                return null;
            return (0, session_1.convertSession)(sessionRecord);
        },
        async deleteSession(sessionToken) {
            await db.sessions.deleteByToken(sessionToken);
        },
        async createVerificationToken(token) {
            return await db.verificationTokens.create(token.identifier, token.token, token.expires);
        },
        async useVerificationToken({ identifier, token }) {
            const tokenRecord = await db.verificationTokens.getByToken(identifier, token);
            if (tokenRecord == null)
                return null;
            await db.verificationTokens.deleteByToken(identifier, token);
            return (0, verification_1.convertVerificationToken)(tokenRecord);
        },
    };
}
exports.SqlAdapter = SqlAdapter;
exports.default = SqlAdapter;
