"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRepo = exports.convertSession = void 0;
const utils_1 = require("../utils");
function convertSession(rec) {
    return {
        id: rec.id,
        userId: rec.user_id.toString(),
        expires: (0, utils_1.createDate)(rec.expires),
        sessionToken: rec.session_token,
    };
}
exports.convertSession = convertSession;
class SessionRepo {
    constructor(sql, config) {
        this.sql = sql;
        this.config = config;
    }
    getById(id) {
        return this.sql.queryOne `select * from [TABLE_PREFIX]sessions where id = ${id}`;
    }
    getByToken(token) {
        return this.sql.queryOne `select * from [TABLE_PREFIX]sessions where session_token = ${token}`;
    }
    async deleteByUserId(userId) {
        await this.sql.execute `delete from [TABLE_PREFIX]sessions where user_id = ${userId}`;
    }
    async deleteByToken(token) {
        await this.sql.execute `delete from [TABLE_PREFIX]sessions where session_token = ${token}`;
    }
    async create(userId, sessionToken, expires) {
        const result = await this.sql.insert `insert into [TABLE_PREFIX]sessions 
      (user_id, expires, session_token, created_at, updated_at) 
      VALUES (${userId},${(0, utils_1.datetimeToUtcStr)(expires)},${sessionToken},NOW(),NOW())`;
        return await this.getById(result.insertId);
    }
    async updateExpires(sessionToken, expires) {
        const result = await this.sql.execute `update [TABLE_PREFIX]sessions set expires = ${(0, utils_1.datetimeToUtcStr)(expires)} where session_token = ${sessionToken} `;
        return await this.getById(result.insertId);
    }
}
exports.SessionRepo = SessionRepo;
