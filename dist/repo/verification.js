"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationTokenRepo = exports.convertVerificationToken = void 0;
const utils_1 = require("../utils");
function convertVerificationToken(tokenRecord) {
    return {
        identifier: tokenRecord.identifier,
        token: tokenRecord.token,
        expires: (0, utils_1.createDate)(tokenRecord.expires) ?? new Date(),
    };
}
exports.convertVerificationToken = convertVerificationToken;
class VerificationTokenRepo {
    constructor(sql, config) {
        this.sql = sql;
        this.config = config;
    }
    getByToken(identifier, token) {
        return this.sql.queryOne `select * from [TABLE_PREFIX]verification_tokens 
          where identifier =${identifier} and token = ${token}`;
    }
    async create(identifier, token, expires) {
        await this.sql
            .execute `insert into [TABLE_PREFIX]verification_tokens (identifier, token, expires, created_at, updated_at) 
      VALUES (${identifier},${token},${(0, utils_1.datetimeToUtcStr)(expires)},NOW(),NOW())`;
        return await this.getByToken(token, identifier);
    }
    deleteByToken(identifier, token) {
        return this.sql.execute `delete from [TABLE_PREFIX]verification_tokens 
      where identifier = ${identifier} and token = ${token}`;
    }
}
exports.VerificationTokenRepo = VerificationTokenRepo;
