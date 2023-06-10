//compensate zone difference before creating string of date
export function datetimeToLocalStr(d) {
    return datetimeToString(d, 1);
}
//compensate zone difference before creating string of date
export function datetimeToUtcStr(d) {
    return datetimeToString(d, -1);
}
export function datetimeToString(d, correction = 1) {
    if (!d)
        d = new Date();
    const tzoffset = d.getTimezoneOffset() * 60000 * correction; //offset in milliseconds
    const convertedTime = new Date(d.getTime() + tzoffset).toISOString().slice(0, -1);
    return convertedTime;
}
// convert string back to date
// depending on the driver it can be a string of Date object
export const createDate = (d) => {
    if (typeof d === "string") {
        return new Date(Date.parse(d));
    }
    else
        return d;
};
// replace all undefined with null in array
export function replaceUndefined(values) {
    return values.map((x) => {
        if (x === undefined)
            return null;
        if (Number.isNaN(x))
            return null;
        return x;
    });
}
// Convert template string array to sql with placeholders
export function buildParameterizedSql(o, dialect) {
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
export function replacePrefix(sql, prefix) {
    return sql.map((s) => s.replace("[TABLE_PREFIX]", prefix || ""));
}
export function isNumeric(value) {
    return /^\d+$/.test(value);
}
