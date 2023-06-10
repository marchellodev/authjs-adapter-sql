import { datetimeToUtcStr, createDate } from "../utils";
export function convertVerificationToken(tokenRecord) {
    return {
        identifier: tokenRecord.identifier,
        token: tokenRecord.token,
        expires: createDate(tokenRecord.expires) ?? new Date(),
    };
}
export class VerificationTokenRepo {
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
      VALUES (${identifier},${token},${datetimeToUtcStr(expires)},NOW(),NOW())`;
        return await this.getByToken(token, identifier);
    }
    deleteByToken(identifier, token) {
        return this.sql.execute `delete from [TABLE_PREFIX]verification_tokens 
      where identifier = ${identifier} and token = ${token}`;
    }
}
