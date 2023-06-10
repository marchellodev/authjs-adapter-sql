"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = exports.replacePrefix = exports.buildParameterizedSql = exports.replaceUndefined = exports.createDate = exports.datetimeToString = exports.datetimeToUtcStr = exports.datetimeToLocalStr = void 0;
//compensate zone difference before creating string of date
function datetimeToLocalStr(d) {
    return datetimeToString(d, 1);
}
exports.datetimeToLocalStr = datetimeToLocalStr;
//compensate zone difference before creating string of date
function datetimeToUtcStr(d) {
    return datetimeToString(d, -1);
}
exports.datetimeToUtcStr = datetimeToUtcStr;
function datetimeToString(d, correction = 1) {
    if (!d)
        d = new Date();
    const tzoffset = d.getTimezoneOffset() * 60000 * correction; //offset in milliseconds
    const convertedTime = new Date(d.getTime() + tzoffset).toISOString().slice(0, -1);
    return convertedTime;
}
exports.datetimeToString = datetimeToString;
// convert string back to date
// depending on the driver it can be a string of Date object
const createDate = (d) => {
    if (typeof d === "string") {
        return new Date(Date.parse(d));
    }
    else
        return d;
};
exports.createDate = createDate;
// replace all undefined with null in array
function replaceUndefined(values) {
    return values.map((x) => {
        if (x === undefined)
            return null;
        if (Number.isNaN(x))
            return null;
        return x;
    });
}
exports.replaceUndefined = replaceUndefined;
// Convert template string array to sql with placeholders
function buildParameterizedSql(o, dialect) {
    let sql = "";
    if (Array.isArray(sql)) {
        sql = generatePlaceholders(o, dialect);
    }
    else if (o.hasOwnProperty("raw")) {
        sql = generatePlaceholders(o.raw, dialect);
    }
    else {
        sql = generatePlaceholders(Array.from(o), dialect);
    }
    return sql;
}
exports.buildParameterizedSql = buildParameterizedSql;
function generatePlaceholders(o, dialect) {
    if (dialect == "mysql")
        return o.join("?");
    let result = "";
    for (let i = 0; i < o.length - 1; i++) {
        const part = o[i];
        result += part + "$" + (i + 1).toString();
    }
    result += o[o.length - 1];
    return result;
}
function replacePrefix(sql, prefix) {
    return sql.map((s) => s.replace("[TABLE_PREFIX]", prefix || ""));
}
exports.replacePrefix = replacePrefix;
function isNumeric(value) {
    return /^\d+$/.test(value);
}
exports.isNumeric = isNumeric;
