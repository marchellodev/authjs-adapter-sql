import { Dialect, Primitive, PrimitiveDefined, Sql } from "./types";
export declare function datetimeToLocalStr(d?: Date): string;
export declare function datetimeToUtcStr(d?: Date): string;
export declare function datetimeToString(d?: Date, correction?: number): string;
export declare const createDate: (d: Date | string | null) => Date | null;
export declare function replaceUndefined(values: Primitive[]): PrimitiveDefined[];
export declare function buildParameterizedSql(o: Sql, dialect: Dialect): string;
export declare function replacePrefix(sql: Sql, prefix?: string): string[];
export declare function isNumeric(value: string): boolean;
//# sourceMappingURL=utils.d.ts.map