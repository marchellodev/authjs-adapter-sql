"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = exports.convertUser = void 0;
const utils_1 = require("../utils");
function convertUser(userRecord) {
    return {
        id: userRecord.id.toString(),
        name: userRecord.name,
        email: userRecord.email,
        emailVerified: (0, utils_1.createDate)(userRecord.email_verified),
        image: userRecord.image,
    };
}
exports.convertUser = convertUser;
class UserRepo {
    constructor(sql, config) {
        this.sql = sql;
        this.config = config;
    }
    async getByStringId(id) {
        if (!(0, utils_1.isNumeric)(id))
            return null;
        return await this.getById(Number(id));
    }
    getById(id) {
        return this.sql.queryOne `select * from [TABLE_PREFIX]users where id = ${id}`;
    }
    getByEmail(email) {
        return this.sql.queryOne `select * from [TABLE_PREFIX]users where email = ${email}`;
    }
    async create(user) {
        let sqlFields = ["created_at", "updated_at"];
        let params = [];
        let values = [];
        for (const [field, value] of Object.entries(user)) {
            sqlFields.push(toSnakeCase(field));
            params.push(",");
            if (value instanceof Date) {
                values.push((0, utils_1.datetimeToUtcStr)(value));
            }
            else {
                values.push(value);
            }
        }
        params.pop();
        const sql = [];
        sql.push(`insert into [TABLE_PREFIX]users (${sqlFields.join(",")}) VALUES (NOW(), NOW(),`);
        sql.push(...params);
        sql.push(")");
        const result = await this.sql.insert(sql, ...values);
        return await this.getById(result.insertId);
    }
    deleteById(id) {
        return this.sql.execute `delete from [TABLE_PREFIX]users where id = ${id}`;
    }
    async updateUser(user) {
        const id = Number(user.id);
        let sqlFields = [];
        let values = [];
        for (const [field, value] of Object.entries(user)) {
            if (field === "id")
                continue;
            sqlFields.push(toSnakeCase(field));
            values.push(value);
        }
        values.push(id);
        let updateSql = sqlFields.map((f) => f + " = ?").join(",");
        updateSql = `update [TABLE_PREFIX]users set ${updateSql} where id = ? `;
        await this.sql.execute(updateSql.split("?"), ...values);
        return await this.getById(id);
    }
}
exports.UserRepo = UserRepo;
function toSnakeCase(value) {
    return value
        .split(/\.?(?=[A-Z])/)
        .join("_")
        .toLowerCase();
}
