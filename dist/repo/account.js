export function convertAccount(rec) {
    return {
        id: rec.id,
        userId: rec.user_id.toString(),
        type: rec.type,
        provider: rec.provider,
        providerAccountId: rec.provider_account_id,
        access_token: rec.access_token,
        refresh_token: rec.refresh_token,
        expires_at: Number(rec.expires_at),
        token_type: rec.token_type,
        scope: rec.scope,
        id_token: rec.id_token,
        session_state: rec.session_state,
    };
}
export class AccountRepo {
    constructor(sql, config) {
        this.sql = sql;
        this.config = config;
    }
    getById(id) {
        return this.sql.queryOne `select * from [TABLE_PREFIX]accounts where id = ${id}`;
    }
    getByProvider(provider, providerAccountId) {
        return this.sql.queryOne `
      select * from [TABLE_PREFIX]accounts 
      where provider = ${provider} and provider_account_id = ${providerAccountId}`;
    }
    deleteByProvider(provider, providerAccountId) {
        return this.sql.execute `delete from [TABLE_PREFIX]accounts 
        where provider = ${provider} and provider_account_id = ${providerAccountId}`;
    }
    deleteByUserId(userId) {
        return this.sql.execute `delete from [TABLE_PREFIX]accounts where user_id = ${userId}`;
    }
    async create(rec) {
        const result = await this.sql.insert `insert into [TABLE_PREFIX]accounts 
        (user_id, type, provider, provider_account_id, access_token, refresh_token, expires_at, token_type, scope, id_token, session_state, created_at, updated_at ) 
        VALUES (${rec.user_id},${rec.type},${rec.provider},${rec.provider_account_id},${rec.access_token},${rec.refresh_token},${rec.expires_at},${rec.token_type},${rec.scope},${rec.id_token},${rec.session_state},NOW(),NOW())`;
        return await this.getById(result.insertId);
    }
}
