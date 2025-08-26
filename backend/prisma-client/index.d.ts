
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model LeavePolicy
 * 
 */
export type LeavePolicy = $Result.DefaultSelection<Prisma.$LeavePolicyPayload>
/**
 * Model Leave
 * 
 */
export type Leave = $Result.DefaultSelection<Prisma.$LeavePayload>
/**
 * Model LeaveDayStatus
 * 
 */
export type LeaveDayStatus = $Result.DefaultSelection<Prisma.$LeaveDayStatusPayload>
/**
 * Model LeaveBalance
 * 
 */
export type LeaveBalance = $Result.DefaultSelection<Prisma.$LeaveBalancePayload>
/**
 * Model Holiday
 * 
 */
export type Holiday = $Result.DefaultSelection<Prisma.$HolidayPayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  EMPLOYEE: 'EMPLOYEE',
  MANAGER: 'MANAGER',
  HR: 'HR',
  ADMIN: 'ADMIN'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const LeaveType: {
  SICK: 'SICK',
  CASUAL: 'CASUAL',
  WFH: 'WFH',
  LOP: 'LOP'
};

export type LeaveType = (typeof LeaveType)[keyof typeof LeaveType]


export const LeaveStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  PARTIAL: 'PARTIAL'
};

export type LeaveStatus = (typeof LeaveStatus)[keyof typeof LeaveStatus]


export const AuditAction: {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  APPROVE: 'APPROVE',
  REJECT: 'REJECT',
  CANCEL: 'CANCEL'
};

export type AuditAction = (typeof AuditAction)[keyof typeof AuditAction]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type LeaveType = $Enums.LeaveType

export const LeaveType: typeof $Enums.LeaveType

export type LeaveStatus = $Enums.LeaveStatus

export const LeaveStatus: typeof $Enums.LeaveStatus

export type AuditAction = $Enums.AuditAction

export const AuditAction: typeof $Enums.AuditAction

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs>;

  /**
   * `prisma.leavePolicy`: Exposes CRUD operations for the **LeavePolicy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeavePolicies
    * const leavePolicies = await prisma.leavePolicy.findMany()
    * ```
    */
  get leavePolicy(): Prisma.LeavePolicyDelegate<ExtArgs>;

  /**
   * `prisma.leave`: Exposes CRUD operations for the **Leave** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leaves
    * const leaves = await prisma.leave.findMany()
    * ```
    */
  get leave(): Prisma.LeaveDelegate<ExtArgs>;

  /**
   * `prisma.leaveDayStatus`: Exposes CRUD operations for the **LeaveDayStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveDayStatuses
    * const leaveDayStatuses = await prisma.leaveDayStatus.findMany()
    * ```
    */
  get leaveDayStatus(): Prisma.LeaveDayStatusDelegate<ExtArgs>;

  /**
   * `prisma.leaveBalance`: Exposes CRUD operations for the **LeaveBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LeaveBalances
    * const leaveBalances = await prisma.leaveBalance.findMany()
    * ```
    */
  get leaveBalance(): Prisma.LeaveBalanceDelegate<ExtArgs>;

  /**
   * `prisma.holiday`: Exposes CRUD operations for the **Holiday** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Holidays
    * const holidays = await prisma.holiday.findMany()
    * ```
    */
  get holiday(): Prisma.HolidayDelegate<ExtArgs>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Department: 'Department',
    LeavePolicy: 'LeavePolicy',
    Leave: 'Leave',
    LeaveDayStatus: 'LeaveDayStatus',
    LeaveBalance: 'LeaveBalance',
    Holiday: 'Holiday',
    Setting: 'Setting',
    Notification: 'Notification',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "department" | "leavePolicy" | "leave" | "leaveDayStatus" | "leaveBalance" | "holiday" | "setting" | "notification" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      LeavePolicy: {
        payload: Prisma.$LeavePolicyPayload<ExtArgs>
        fields: Prisma.LeavePolicyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeavePolicyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeavePolicyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>
          }
          findFirst: {
            args: Prisma.LeavePolicyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeavePolicyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>
          }
          findMany: {
            args: Prisma.LeavePolicyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>[]
          }
          create: {
            args: Prisma.LeavePolicyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>
          }
          createMany: {
            args: Prisma.LeavePolicyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeavePolicyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>[]
          }
          delete: {
            args: Prisma.LeavePolicyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>
          }
          update: {
            args: Prisma.LeavePolicyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>
          }
          deleteMany: {
            args: Prisma.LeavePolicyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeavePolicyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeavePolicyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePolicyPayload>
          }
          aggregate: {
            args: Prisma.LeavePolicyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeavePolicy>
          }
          groupBy: {
            args: Prisma.LeavePolicyGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeavePolicyGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeavePolicyCountArgs<ExtArgs>
            result: $Utils.Optional<LeavePolicyCountAggregateOutputType> | number
          }
        }
      }
      Leave: {
        payload: Prisma.$LeavePayload<ExtArgs>
        fields: Prisma.LeaveFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>
          }
          findFirst: {
            args: Prisma.LeaveFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>
          }
          findMany: {
            args: Prisma.LeaveFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>[]
          }
          create: {
            args: Prisma.LeaveCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>
          }
          createMany: {
            args: Prisma.LeaveCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>[]
          }
          delete: {
            args: Prisma.LeaveDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>
          }
          update: {
            args: Prisma.LeaveUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>
          }
          deleteMany: {
            args: Prisma.LeaveDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeaveUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeavePayload>
          }
          aggregate: {
            args: Prisma.LeaveAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeave>
          }
          groupBy: {
            args: Prisma.LeaveGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveCountAggregateOutputType> | number
          }
        }
      }
      LeaveDayStatus: {
        payload: Prisma.$LeaveDayStatusPayload<ExtArgs>
        fields: Prisma.LeaveDayStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveDayStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveDayStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>
          }
          findFirst: {
            args: Prisma.LeaveDayStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveDayStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>
          }
          findMany: {
            args: Prisma.LeaveDayStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>[]
          }
          create: {
            args: Prisma.LeaveDayStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>
          }
          createMany: {
            args: Prisma.LeaveDayStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveDayStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>[]
          }
          delete: {
            args: Prisma.LeaveDayStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>
          }
          update: {
            args: Prisma.LeaveDayStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>
          }
          deleteMany: {
            args: Prisma.LeaveDayStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveDayStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeaveDayStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveDayStatusPayload>
          }
          aggregate: {
            args: Prisma.LeaveDayStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveDayStatus>
          }
          groupBy: {
            args: Prisma.LeaveDayStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveDayStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveDayStatusCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveDayStatusCountAggregateOutputType> | number
          }
        }
      }
      LeaveBalance: {
        payload: Prisma.$LeaveBalancePayload<ExtArgs>
        fields: Prisma.LeaveBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaveBalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaveBalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          findFirst: {
            args: Prisma.LeaveBalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaveBalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          findMany: {
            args: Prisma.LeaveBalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          create: {
            args: Prisma.LeaveBalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          createMany: {
            args: Prisma.LeaveBalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaveBalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>[]
          }
          delete: {
            args: Prisma.LeaveBalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          update: {
            args: Prisma.LeaveBalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          deleteMany: {
            args: Prisma.LeaveBalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaveBalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LeaveBalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeaveBalancePayload>
          }
          aggregate: {
            args: Prisma.LeaveBalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLeaveBalance>
          }
          groupBy: {
            args: Prisma.LeaveBalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaveBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaveBalanceCountArgs<ExtArgs>
            result: $Utils.Optional<LeaveBalanceCountAggregateOutputType> | number
          }
        }
      }
      Holiday: {
        payload: Prisma.$HolidayPayload<ExtArgs>
        fields: Prisma.HolidayFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HolidayFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HolidayFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>
          }
          findFirst: {
            args: Prisma.HolidayFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HolidayFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>
          }
          findMany: {
            args: Prisma.HolidayFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>[]
          }
          create: {
            args: Prisma.HolidayCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>
          }
          createMany: {
            args: Prisma.HolidayCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HolidayCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>[]
          }
          delete: {
            args: Prisma.HolidayDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>
          }
          update: {
            args: Prisma.HolidayUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>
          }
          deleteMany: {
            args: Prisma.HolidayDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HolidayUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HolidayUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HolidayPayload>
          }
          aggregate: {
            args: Prisma.HolidayAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHoliday>
          }
          groupBy: {
            args: Prisma.HolidayGroupByArgs<ExtArgs>
            result: $Utils.Optional<HolidayGroupByOutputType>[]
          }
          count: {
            args: Prisma.HolidayCountArgs<ExtArgs>
            result: $Utils.Optional<HolidayCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    employees: number
    hrEmployees: number
    leaveRequests: number
    approvedLeaves: number
    leaveBalances: number
    auditLogs: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    employees?: boolean | UserCountOutputTypeCountEmployeesArgs
    hrEmployees?: boolean | UserCountOutputTypeCountHrEmployeesArgs
    leaveRequests?: boolean | UserCountOutputTypeCountLeaveRequestsArgs
    approvedLeaves?: boolean | UserCountOutputTypeCountApprovedLeavesArgs
    leaveBalances?: boolean | UserCountOutputTypeCountLeaveBalancesArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHrEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLeaveRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApprovedLeavesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLeaveBalancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveBalanceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    users: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | DepartmentCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type LeavePolicyCountOutputType
   */

  export type LeavePolicyCountOutputType = {
    leaves: number
    leaveBalances: number
  }

  export type LeavePolicyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leaves?: boolean | LeavePolicyCountOutputTypeCountLeavesArgs
    leaveBalances?: boolean | LeavePolicyCountOutputTypeCountLeaveBalancesArgs
  }

  // Custom InputTypes
  /**
   * LeavePolicyCountOutputType without action
   */
  export type LeavePolicyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicyCountOutputType
     */
    select?: LeavePolicyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeavePolicyCountOutputType without action
   */
  export type LeavePolicyCountOutputTypeCountLeavesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveWhereInput
  }

  /**
   * LeavePolicyCountOutputType without action
   */
  export type LeavePolicyCountOutputTypeCountLeaveBalancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveBalanceWhereInput
  }


  /**
   * Count Type LeaveCountOutputType
   */

  export type LeaveCountOutputType = {
    dayStatuses: number
  }

  export type LeaveCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dayStatuses?: boolean | LeaveCountOutputTypeCountDayStatusesArgs
  }

  // Custom InputTypes
  /**
   * LeaveCountOutputType without action
   */
  export type LeaveCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveCountOutputType
     */
    select?: LeaveCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeaveCountOutputType without action
   */
  export type LeaveCountOutputTypeCountDayStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveDayStatusWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    auth0Id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    employeeId: string | null
    role: $Enums.UserRole | null
    managerId: string | null
    hrId: string | null
    departmentId: string | null
    isActive: boolean | null
    joinDate: Date | null
    profileImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    auth0Id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    employeeId: string | null
    role: $Enums.UserRole | null
    managerId: string | null
    hrId: string | null
    departmentId: string | null
    isActive: boolean | null
    joinDate: Date | null
    profileImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    auth0Id: number
    email: number
    password: number
    firstName: number
    lastName: number
    employeeId: number
    role: number
    managerId: number
    hrId: number
    departmentId: number
    isActive: number
    joinDate: number
    profileImage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    auth0Id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    employeeId?: true
    role?: true
    managerId?: true
    hrId?: true
    departmentId?: true
    isActive?: true
    joinDate?: true
    profileImage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    auth0Id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    employeeId?: true
    role?: true
    managerId?: true
    hrId?: true
    departmentId?: true
    isActive?: true
    joinDate?: true
    profileImage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    auth0Id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    employeeId?: true
    role?: true
    managerId?: true
    hrId?: true
    departmentId?: true
    isActive?: true
    joinDate?: true
    profileImage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    auth0Id: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role: $Enums.UserRole
    managerId: string | null
    hrId: string | null
    departmentId: string | null
    isActive: boolean
    joinDate: Date
    profileImage: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    auth0Id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    employeeId?: boolean
    role?: boolean
    managerId?: boolean
    hrId?: boolean
    departmentId?: boolean
    isActive?: boolean
    joinDate?: boolean
    profileImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager?: boolean | User$managerArgs<ExtArgs>
    employees?: boolean | User$employeesArgs<ExtArgs>
    hr?: boolean | User$hrArgs<ExtArgs>
    hrEmployees?: boolean | User$hrEmployeesArgs<ExtArgs>
    department?: boolean | User$departmentArgs<ExtArgs>
    leaveRequests?: boolean | User$leaveRequestsArgs<ExtArgs>
    approvedLeaves?: boolean | User$approvedLeavesArgs<ExtArgs>
    leaveBalances?: boolean | User$leaveBalancesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    auth0Id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    employeeId?: boolean
    role?: boolean
    managerId?: boolean
    hrId?: boolean
    departmentId?: boolean
    isActive?: boolean
    joinDate?: boolean
    profileImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    manager?: boolean | User$managerArgs<ExtArgs>
    hr?: boolean | User$hrArgs<ExtArgs>
    department?: boolean | User$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    auth0Id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    employeeId?: boolean
    role?: boolean
    managerId?: boolean
    hrId?: boolean
    departmentId?: boolean
    isActive?: boolean
    joinDate?: boolean
    profileImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | User$managerArgs<ExtArgs>
    employees?: boolean | User$employeesArgs<ExtArgs>
    hr?: boolean | User$hrArgs<ExtArgs>
    hrEmployees?: boolean | User$hrEmployeesArgs<ExtArgs>
    department?: boolean | User$departmentArgs<ExtArgs>
    leaveRequests?: boolean | User$leaveRequestsArgs<ExtArgs>
    approvedLeaves?: boolean | User$approvedLeavesArgs<ExtArgs>
    leaveBalances?: boolean | User$leaveBalancesArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    manager?: boolean | User$managerArgs<ExtArgs>
    hr?: boolean | User$hrArgs<ExtArgs>
    department?: boolean | User$departmentArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      manager: Prisma.$UserPayload<ExtArgs> | null
      employees: Prisma.$UserPayload<ExtArgs>[]
      hr: Prisma.$UserPayload<ExtArgs> | null
      hrEmployees: Prisma.$UserPayload<ExtArgs>[]
      department: Prisma.$DepartmentPayload<ExtArgs> | null
      leaveRequests: Prisma.$LeavePayload<ExtArgs>[]
      approvedLeaves: Prisma.$LeavePayload<ExtArgs>[]
      leaveBalances: Prisma.$LeaveBalancePayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      auth0Id: string | null
      email: string
      password: string
      firstName: string
      lastName: string
      employeeId: string
      role: $Enums.UserRole
      managerId: string | null
      hrId: string | null
      departmentId: string | null
      isActive: boolean
      joinDate: Date
      profileImage: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    manager<T extends User$managerArgs<ExtArgs> = {}>(args?: Subset<T, User$managerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    employees<T extends User$employeesArgs<ExtArgs> = {}>(args?: Subset<T, User$employeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    hr<T extends User$hrArgs<ExtArgs> = {}>(args?: Subset<T, User$hrArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    hrEmployees<T extends User$hrEmployeesArgs<ExtArgs> = {}>(args?: Subset<T, User$hrEmployeesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    department<T extends User$departmentArgs<ExtArgs> = {}>(args?: Subset<T, User$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    leaveRequests<T extends User$leaveRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$leaveRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findMany"> | Null>
    approvedLeaves<T extends User$approvedLeavesArgs<ExtArgs> = {}>(args?: Subset<T, User$approvedLeavesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findMany"> | Null>
    leaveBalances<T extends User$leaveBalancesArgs<ExtArgs> = {}>(args?: Subset<T, User$leaveBalancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findMany"> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly auth0Id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly employeeId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly managerId: FieldRef<"User", 'String'>
    readonly hrId: FieldRef<"User", 'String'>
    readonly departmentId: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly joinDate: FieldRef<"User", 'DateTime'>
    readonly profileImage: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.manager
   */
  export type User$managerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.employees
   */
  export type User$employeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.hr
   */
  export type User$hrArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.hrEmployees
   */
  export type User$hrEmployeesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User.department
   */
  export type User$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }

  /**
   * User.leaveRequests
   */
  export type User$leaveRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    where?: LeaveWhereInput
    orderBy?: LeaveOrderByWithRelationInput | LeaveOrderByWithRelationInput[]
    cursor?: LeaveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveScalarFieldEnum | LeaveScalarFieldEnum[]
  }

  /**
   * User.approvedLeaves
   */
  export type User$approvedLeavesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    where?: LeaveWhereInput
    orderBy?: LeaveOrderByWithRelationInput | LeaveOrderByWithRelationInput[]
    cursor?: LeaveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveScalarFieldEnum | LeaveScalarFieldEnum[]
  }

  /**
   * User.leaveBalances
   */
  export type User$leaveBalancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    where?: LeaveBalanceWhereInput
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    cursor?: LeaveBalanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    headId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    headId: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    headId: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DepartmentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    headId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    headId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    headId?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    name: string
    description: string | null
    headId: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: DepartmentCountAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    headId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Department$usersArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    headId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    headId?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Department$usersArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      headId: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Department$usersArgs<ExtArgs> = {}>(args?: Subset<T, Department$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Department model
   */ 
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
    readonly description: FieldRef<"Department", 'String'>
    readonly headId: FieldRef<"Department", 'String'>
    readonly isActive: FieldRef<"Department", 'Boolean'>
    readonly createdAt: FieldRef<"Department", 'DateTime'>
    readonly updatedAt: FieldRef<"Department", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
  }

  /**
   * Department.users
   */
  export type Department$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model LeavePolicy
   */

  export type AggregateLeavePolicy = {
    _count: LeavePolicyCountAggregateOutputType | null
    _avg: LeavePolicyAvgAggregateOutputType | null
    _sum: LeavePolicySumAggregateOutputType | null
    _min: LeavePolicyMinAggregateOutputType | null
    _max: LeavePolicyMaxAggregateOutputType | null
  }

  export type LeavePolicyAvgAggregateOutputType = {
    annualQuota: number | null
    maxConsecutiveDays: number | null
    minDaysNotice: number | null
    maxCarryForward: number | null
  }

  export type LeavePolicySumAggregateOutputType = {
    annualQuota: number | null
    maxConsecutiveDays: number | null
    minDaysNotice: number | null
    maxCarryForward: number | null
  }

  export type LeavePolicyMinAggregateOutputType = {
    id: string | null
    leaveType: $Enums.LeaveType | null
    annualQuota: number | null
    maxConsecutiveDays: number | null
    minDaysNotice: number | null
    requiresApproval: boolean | null
    requiresDocument: boolean | null
    carryForwardAllowed: boolean | null
    maxCarryForward: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeavePolicyMaxAggregateOutputType = {
    id: string | null
    leaveType: $Enums.LeaveType | null
    annualQuota: number | null
    maxConsecutiveDays: number | null
    minDaysNotice: number | null
    requiresApproval: boolean | null
    requiresDocument: boolean | null
    carryForwardAllowed: boolean | null
    maxCarryForward: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeavePolicyCountAggregateOutputType = {
    id: number
    leaveType: number
    annualQuota: number
    maxConsecutiveDays: number
    minDaysNotice: number
    requiresApproval: number
    requiresDocument: number
    carryForwardAllowed: number
    maxCarryForward: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeavePolicyAvgAggregateInputType = {
    annualQuota?: true
    maxConsecutiveDays?: true
    minDaysNotice?: true
    maxCarryForward?: true
  }

  export type LeavePolicySumAggregateInputType = {
    annualQuota?: true
    maxConsecutiveDays?: true
    minDaysNotice?: true
    maxCarryForward?: true
  }

  export type LeavePolicyMinAggregateInputType = {
    id?: true
    leaveType?: true
    annualQuota?: true
    maxConsecutiveDays?: true
    minDaysNotice?: true
    requiresApproval?: true
    requiresDocument?: true
    carryForwardAllowed?: true
    maxCarryForward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeavePolicyMaxAggregateInputType = {
    id?: true
    leaveType?: true
    annualQuota?: true
    maxConsecutiveDays?: true
    minDaysNotice?: true
    requiresApproval?: true
    requiresDocument?: true
    carryForwardAllowed?: true
    maxCarryForward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeavePolicyCountAggregateInputType = {
    id?: true
    leaveType?: true
    annualQuota?: true
    maxConsecutiveDays?: true
    minDaysNotice?: true
    requiresApproval?: true
    requiresDocument?: true
    carryForwardAllowed?: true
    maxCarryForward?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeavePolicyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeavePolicy to aggregate.
     */
    where?: LeavePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeavePolicies to fetch.
     */
    orderBy?: LeavePolicyOrderByWithRelationInput | LeavePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeavePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeavePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeavePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeavePolicies
    **/
    _count?: true | LeavePolicyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeavePolicyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeavePolicySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeavePolicyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeavePolicyMaxAggregateInputType
  }

  export type GetLeavePolicyAggregateType<T extends LeavePolicyAggregateArgs> = {
        [P in keyof T & keyof AggregateLeavePolicy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeavePolicy[P]>
      : GetScalarType<T[P], AggregateLeavePolicy[P]>
  }




  export type LeavePolicyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeavePolicyWhereInput
    orderBy?: LeavePolicyOrderByWithAggregationInput | LeavePolicyOrderByWithAggregationInput[]
    by: LeavePolicyScalarFieldEnum[] | LeavePolicyScalarFieldEnum
    having?: LeavePolicyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeavePolicyCountAggregateInputType | true
    _avg?: LeavePolicyAvgAggregateInputType
    _sum?: LeavePolicySumAggregateInputType
    _min?: LeavePolicyMinAggregateInputType
    _max?: LeavePolicyMaxAggregateInputType
  }

  export type LeavePolicyGroupByOutputType = {
    id: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays: number | null
    minDaysNotice: number
    requiresApproval: boolean
    requiresDocument: boolean
    carryForwardAllowed: boolean
    maxCarryForward: number | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: LeavePolicyCountAggregateOutputType | null
    _avg: LeavePolicyAvgAggregateOutputType | null
    _sum: LeavePolicySumAggregateOutputType | null
    _min: LeavePolicyMinAggregateOutputType | null
    _max: LeavePolicyMaxAggregateOutputType | null
  }

  type GetLeavePolicyGroupByPayload<T extends LeavePolicyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeavePolicyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeavePolicyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeavePolicyGroupByOutputType[P]>
            : GetScalarType<T[P], LeavePolicyGroupByOutputType[P]>
        }
      >
    >


  export type LeavePolicySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leaveType?: boolean
    annualQuota?: boolean
    maxConsecutiveDays?: boolean
    minDaysNotice?: boolean
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    leaves?: boolean | LeavePolicy$leavesArgs<ExtArgs>
    leaveBalances?: boolean | LeavePolicy$leaveBalancesArgs<ExtArgs>
    _count?: boolean | LeavePolicyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leavePolicy"]>

  export type LeavePolicySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leaveType?: boolean
    annualQuota?: boolean
    maxConsecutiveDays?: boolean
    minDaysNotice?: boolean
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["leavePolicy"]>

  export type LeavePolicySelectScalar = {
    id?: boolean
    leaveType?: boolean
    annualQuota?: boolean
    maxConsecutiveDays?: boolean
    minDaysNotice?: boolean
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeavePolicyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leaves?: boolean | LeavePolicy$leavesArgs<ExtArgs>
    leaveBalances?: boolean | LeavePolicy$leaveBalancesArgs<ExtArgs>
    _count?: boolean | LeavePolicyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeavePolicyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LeavePolicyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeavePolicy"
    objects: {
      leaves: Prisma.$LeavePayload<ExtArgs>[]
      leaveBalances: Prisma.$LeaveBalancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leaveType: $Enums.LeaveType
      annualQuota: number
      maxConsecutiveDays: number | null
      minDaysNotice: number
      requiresApproval: boolean
      requiresDocument: boolean
      carryForwardAllowed: boolean
      maxCarryForward: number | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leavePolicy"]>
    composites: {}
  }

  type LeavePolicyGetPayload<S extends boolean | null | undefined | LeavePolicyDefaultArgs> = $Result.GetResult<Prisma.$LeavePolicyPayload, S>

  type LeavePolicyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeavePolicyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeavePolicyCountAggregateInputType | true
    }

  export interface LeavePolicyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeavePolicy'], meta: { name: 'LeavePolicy' } }
    /**
     * Find zero or one LeavePolicy that matches the filter.
     * @param {LeavePolicyFindUniqueArgs} args - Arguments to find a LeavePolicy
     * @example
     * // Get one LeavePolicy
     * const leavePolicy = await prisma.leavePolicy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeavePolicyFindUniqueArgs>(args: SelectSubset<T, LeavePolicyFindUniqueArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LeavePolicy that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeavePolicyFindUniqueOrThrowArgs} args - Arguments to find a LeavePolicy
     * @example
     * // Get one LeavePolicy
     * const leavePolicy = await prisma.leavePolicy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeavePolicyFindUniqueOrThrowArgs>(args: SelectSubset<T, LeavePolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LeavePolicy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeavePolicyFindFirstArgs} args - Arguments to find a LeavePolicy
     * @example
     * // Get one LeavePolicy
     * const leavePolicy = await prisma.leavePolicy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeavePolicyFindFirstArgs>(args?: SelectSubset<T, LeavePolicyFindFirstArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LeavePolicy that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeavePolicyFindFirstOrThrowArgs} args - Arguments to find a LeavePolicy
     * @example
     * // Get one LeavePolicy
     * const leavePolicy = await prisma.leavePolicy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeavePolicyFindFirstOrThrowArgs>(args?: SelectSubset<T, LeavePolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LeavePolicies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeavePolicyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeavePolicies
     * const leavePolicies = await prisma.leavePolicy.findMany()
     * 
     * // Get first 10 LeavePolicies
     * const leavePolicies = await prisma.leavePolicy.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leavePolicyWithIdOnly = await prisma.leavePolicy.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeavePolicyFindManyArgs>(args?: SelectSubset<T, LeavePolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LeavePolicy.
     * @param {LeavePolicyCreateArgs} args - Arguments to create a LeavePolicy.
     * @example
     * // Create one LeavePolicy
     * const LeavePolicy = await prisma.leavePolicy.create({
     *   data: {
     *     // ... data to create a LeavePolicy
     *   }
     * })
     * 
     */
    create<T extends LeavePolicyCreateArgs>(args: SelectSubset<T, LeavePolicyCreateArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LeavePolicies.
     * @param {LeavePolicyCreateManyArgs} args - Arguments to create many LeavePolicies.
     * @example
     * // Create many LeavePolicies
     * const leavePolicy = await prisma.leavePolicy.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeavePolicyCreateManyArgs>(args?: SelectSubset<T, LeavePolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeavePolicies and returns the data saved in the database.
     * @param {LeavePolicyCreateManyAndReturnArgs} args - Arguments to create many LeavePolicies.
     * @example
     * // Create many LeavePolicies
     * const leavePolicy = await prisma.leavePolicy.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeavePolicies and only return the `id`
     * const leavePolicyWithIdOnly = await prisma.leavePolicy.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeavePolicyCreateManyAndReturnArgs>(args?: SelectSubset<T, LeavePolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LeavePolicy.
     * @param {LeavePolicyDeleteArgs} args - Arguments to delete one LeavePolicy.
     * @example
     * // Delete one LeavePolicy
     * const LeavePolicy = await prisma.leavePolicy.delete({
     *   where: {
     *     // ... filter to delete one LeavePolicy
     *   }
     * })
     * 
     */
    delete<T extends LeavePolicyDeleteArgs>(args: SelectSubset<T, LeavePolicyDeleteArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LeavePolicy.
     * @param {LeavePolicyUpdateArgs} args - Arguments to update one LeavePolicy.
     * @example
     * // Update one LeavePolicy
     * const leavePolicy = await prisma.leavePolicy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeavePolicyUpdateArgs>(args: SelectSubset<T, LeavePolicyUpdateArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LeavePolicies.
     * @param {LeavePolicyDeleteManyArgs} args - Arguments to filter LeavePolicies to delete.
     * @example
     * // Delete a few LeavePolicies
     * const { count } = await prisma.leavePolicy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeavePolicyDeleteManyArgs>(args?: SelectSubset<T, LeavePolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeavePolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeavePolicyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeavePolicies
     * const leavePolicy = await prisma.leavePolicy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeavePolicyUpdateManyArgs>(args: SelectSubset<T, LeavePolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LeavePolicy.
     * @param {LeavePolicyUpsertArgs} args - Arguments to update or create a LeavePolicy.
     * @example
     * // Update or create a LeavePolicy
     * const leavePolicy = await prisma.leavePolicy.upsert({
     *   create: {
     *     // ... data to create a LeavePolicy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeavePolicy we want to update
     *   }
     * })
     */
    upsert<T extends LeavePolicyUpsertArgs>(args: SelectSubset<T, LeavePolicyUpsertArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LeavePolicies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeavePolicyCountArgs} args - Arguments to filter LeavePolicies to count.
     * @example
     * // Count the number of LeavePolicies
     * const count = await prisma.leavePolicy.count({
     *   where: {
     *     // ... the filter for the LeavePolicies we want to count
     *   }
     * })
    **/
    count<T extends LeavePolicyCountArgs>(
      args?: Subset<T, LeavePolicyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeavePolicyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeavePolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeavePolicyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeavePolicyAggregateArgs>(args: Subset<T, LeavePolicyAggregateArgs>): Prisma.PrismaPromise<GetLeavePolicyAggregateType<T>>

    /**
     * Group by LeavePolicy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeavePolicyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeavePolicyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeavePolicyGroupByArgs['orderBy'] }
        : { orderBy?: LeavePolicyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeavePolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeavePolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeavePolicy model
   */
  readonly fields: LeavePolicyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeavePolicy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeavePolicyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leaves<T extends LeavePolicy$leavesArgs<ExtArgs> = {}>(args?: Subset<T, LeavePolicy$leavesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findMany"> | Null>
    leaveBalances<T extends LeavePolicy$leaveBalancesArgs<ExtArgs> = {}>(args?: Subset<T, LeavePolicy$leaveBalancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeavePolicy model
   */ 
  interface LeavePolicyFieldRefs {
    readonly id: FieldRef<"LeavePolicy", 'String'>
    readonly leaveType: FieldRef<"LeavePolicy", 'LeaveType'>
    readonly annualQuota: FieldRef<"LeavePolicy", 'Int'>
    readonly maxConsecutiveDays: FieldRef<"LeavePolicy", 'Int'>
    readonly minDaysNotice: FieldRef<"LeavePolicy", 'Int'>
    readonly requiresApproval: FieldRef<"LeavePolicy", 'Boolean'>
    readonly requiresDocument: FieldRef<"LeavePolicy", 'Boolean'>
    readonly carryForwardAllowed: FieldRef<"LeavePolicy", 'Boolean'>
    readonly maxCarryForward: FieldRef<"LeavePolicy", 'Int'>
    readonly isActive: FieldRef<"LeavePolicy", 'Boolean'>
    readonly createdAt: FieldRef<"LeavePolicy", 'DateTime'>
    readonly updatedAt: FieldRef<"LeavePolicy", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeavePolicy findUnique
   */
  export type LeavePolicyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * Filter, which LeavePolicy to fetch.
     */
    where: LeavePolicyWhereUniqueInput
  }

  /**
   * LeavePolicy findUniqueOrThrow
   */
  export type LeavePolicyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * Filter, which LeavePolicy to fetch.
     */
    where: LeavePolicyWhereUniqueInput
  }

  /**
   * LeavePolicy findFirst
   */
  export type LeavePolicyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * Filter, which LeavePolicy to fetch.
     */
    where?: LeavePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeavePolicies to fetch.
     */
    orderBy?: LeavePolicyOrderByWithRelationInput | LeavePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeavePolicies.
     */
    cursor?: LeavePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeavePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeavePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeavePolicies.
     */
    distinct?: LeavePolicyScalarFieldEnum | LeavePolicyScalarFieldEnum[]
  }

  /**
   * LeavePolicy findFirstOrThrow
   */
  export type LeavePolicyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * Filter, which LeavePolicy to fetch.
     */
    where?: LeavePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeavePolicies to fetch.
     */
    orderBy?: LeavePolicyOrderByWithRelationInput | LeavePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeavePolicies.
     */
    cursor?: LeavePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeavePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeavePolicies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeavePolicies.
     */
    distinct?: LeavePolicyScalarFieldEnum | LeavePolicyScalarFieldEnum[]
  }

  /**
   * LeavePolicy findMany
   */
  export type LeavePolicyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * Filter, which LeavePolicies to fetch.
     */
    where?: LeavePolicyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeavePolicies to fetch.
     */
    orderBy?: LeavePolicyOrderByWithRelationInput | LeavePolicyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeavePolicies.
     */
    cursor?: LeavePolicyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeavePolicies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeavePolicies.
     */
    skip?: number
    distinct?: LeavePolicyScalarFieldEnum | LeavePolicyScalarFieldEnum[]
  }

  /**
   * LeavePolicy create
   */
  export type LeavePolicyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * The data needed to create a LeavePolicy.
     */
    data: XOR<LeavePolicyCreateInput, LeavePolicyUncheckedCreateInput>
  }

  /**
   * LeavePolicy createMany
   */
  export type LeavePolicyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeavePolicies.
     */
    data: LeavePolicyCreateManyInput | LeavePolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeavePolicy createManyAndReturn
   */
  export type LeavePolicyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LeavePolicies.
     */
    data: LeavePolicyCreateManyInput | LeavePolicyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeavePolicy update
   */
  export type LeavePolicyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * The data needed to update a LeavePolicy.
     */
    data: XOR<LeavePolicyUpdateInput, LeavePolicyUncheckedUpdateInput>
    /**
     * Choose, which LeavePolicy to update.
     */
    where: LeavePolicyWhereUniqueInput
  }

  /**
   * LeavePolicy updateMany
   */
  export type LeavePolicyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeavePolicies.
     */
    data: XOR<LeavePolicyUpdateManyMutationInput, LeavePolicyUncheckedUpdateManyInput>
    /**
     * Filter which LeavePolicies to update
     */
    where?: LeavePolicyWhereInput
  }

  /**
   * LeavePolicy upsert
   */
  export type LeavePolicyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * The filter to search for the LeavePolicy to update in case it exists.
     */
    where: LeavePolicyWhereUniqueInput
    /**
     * In case the LeavePolicy found by the `where` argument doesn't exist, create a new LeavePolicy with this data.
     */
    create: XOR<LeavePolicyCreateInput, LeavePolicyUncheckedCreateInput>
    /**
     * In case the LeavePolicy was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeavePolicyUpdateInput, LeavePolicyUncheckedUpdateInput>
  }

  /**
   * LeavePolicy delete
   */
  export type LeavePolicyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    /**
     * Filter which LeavePolicy to delete.
     */
    where: LeavePolicyWhereUniqueInput
  }

  /**
   * LeavePolicy deleteMany
   */
  export type LeavePolicyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeavePolicies to delete
     */
    where?: LeavePolicyWhereInput
  }

  /**
   * LeavePolicy.leaves
   */
  export type LeavePolicy$leavesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    where?: LeaveWhereInput
    orderBy?: LeaveOrderByWithRelationInput | LeaveOrderByWithRelationInput[]
    cursor?: LeaveWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveScalarFieldEnum | LeaveScalarFieldEnum[]
  }

  /**
   * LeavePolicy.leaveBalances
   */
  export type LeavePolicy$leaveBalancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    where?: LeaveBalanceWhereInput
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    cursor?: LeaveBalanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeavePolicy without action
   */
  export type LeavePolicyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
  }


  /**
   * Model Leave
   */

  export type AggregateLeave = {
    _count: LeaveCountAggregateOutputType | null
    _avg: LeaveAvgAggregateOutputType | null
    _sum: LeaveSumAggregateOutputType | null
    _min: LeaveMinAggregateOutputType | null
    _max: LeaveMaxAggregateOutputType | null
  }

  export type LeaveAvgAggregateOutputType = {
    totalDays: number | null
  }

  export type LeaveSumAggregateOutputType = {
    totalDays: number | null
  }

  export type LeaveMinAggregateOutputType = {
    id: string | null
    requesterId: string | null
    approverId: string | null
    leavePolicyId: string | null
    leaveType: $Enums.LeaveType | null
    startDate: Date | null
    endDate: Date | null
    totalDays: number | null
    reason: string | null
    status: $Enums.LeaveStatus | null
    appliedDate: Date | null
    approvedDate: Date | null
    rejectionReason: string | null
    isHalfDay: boolean | null
    emergencyLeave: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastReminderSent: Date | null
    isLOP: boolean | null
  }

  export type LeaveMaxAggregateOutputType = {
    id: string | null
    requesterId: string | null
    approverId: string | null
    leavePolicyId: string | null
    leaveType: $Enums.LeaveType | null
    startDate: Date | null
    endDate: Date | null
    totalDays: number | null
    reason: string | null
    status: $Enums.LeaveStatus | null
    appliedDate: Date | null
    approvedDate: Date | null
    rejectionReason: string | null
    isHalfDay: boolean | null
    emergencyLeave: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastReminderSent: Date | null
    isLOP: boolean | null
  }

  export type LeaveCountAggregateOutputType = {
    id: number
    requesterId: number
    approverId: number
    leavePolicyId: number
    leaveType: number
    startDate: number
    endDate: number
    totalDays: number
    reason: number
    status: number
    appliedDate: number
    approvedDate: number
    rejectionReason: number
    attachments: number
    isHalfDay: number
    emergencyLeave: number
    createdAt: number
    updatedAt: number
    lastReminderSent: number
    isLOP: number
    _all: number
  }


  export type LeaveAvgAggregateInputType = {
    totalDays?: true
  }

  export type LeaveSumAggregateInputType = {
    totalDays?: true
  }

  export type LeaveMinAggregateInputType = {
    id?: true
    requesterId?: true
    approverId?: true
    leavePolicyId?: true
    leaveType?: true
    startDate?: true
    endDate?: true
    totalDays?: true
    reason?: true
    status?: true
    appliedDate?: true
    approvedDate?: true
    rejectionReason?: true
    isHalfDay?: true
    emergencyLeave?: true
    createdAt?: true
    updatedAt?: true
    lastReminderSent?: true
    isLOP?: true
  }

  export type LeaveMaxAggregateInputType = {
    id?: true
    requesterId?: true
    approverId?: true
    leavePolicyId?: true
    leaveType?: true
    startDate?: true
    endDate?: true
    totalDays?: true
    reason?: true
    status?: true
    appliedDate?: true
    approvedDate?: true
    rejectionReason?: true
    isHalfDay?: true
    emergencyLeave?: true
    createdAt?: true
    updatedAt?: true
    lastReminderSent?: true
    isLOP?: true
  }

  export type LeaveCountAggregateInputType = {
    id?: true
    requesterId?: true
    approverId?: true
    leavePolicyId?: true
    leaveType?: true
    startDate?: true
    endDate?: true
    totalDays?: true
    reason?: true
    status?: true
    appliedDate?: true
    approvedDate?: true
    rejectionReason?: true
    attachments?: true
    isHalfDay?: true
    emergencyLeave?: true
    createdAt?: true
    updatedAt?: true
    lastReminderSent?: true
    isLOP?: true
    _all?: true
  }

  export type LeaveAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leave to aggregate.
     */
    where?: LeaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaves to fetch.
     */
    orderBy?: LeaveOrderByWithRelationInput | LeaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leaves
    **/
    _count?: true | LeaveCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaveAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaveSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveMaxAggregateInputType
  }

  export type GetLeaveAggregateType<T extends LeaveAggregateArgs> = {
        [P in keyof T & keyof AggregateLeave]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeave[P]>
      : GetScalarType<T[P], AggregateLeave[P]>
  }




  export type LeaveGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveWhereInput
    orderBy?: LeaveOrderByWithAggregationInput | LeaveOrderByWithAggregationInput[]
    by: LeaveScalarFieldEnum[] | LeaveScalarFieldEnum
    having?: LeaveScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveCountAggregateInputType | true
    _avg?: LeaveAvgAggregateInputType
    _sum?: LeaveSumAggregateInputType
    _min?: LeaveMinAggregateInputType
    _max?: LeaveMaxAggregateInputType
  }

  export type LeaveGroupByOutputType = {
    id: string
    requesterId: string
    approverId: string | null
    leavePolicyId: string | null
    leaveType: $Enums.LeaveType
    startDate: Date
    endDate: Date
    totalDays: number
    reason: string
    status: $Enums.LeaveStatus
    appliedDate: Date
    approvedDate: Date | null
    rejectionReason: string | null
    attachments: string[]
    isHalfDay: boolean
    emergencyLeave: boolean
    createdAt: Date
    updatedAt: Date
    lastReminderSent: Date | null
    isLOP: boolean
    _count: LeaveCountAggregateOutputType | null
    _avg: LeaveAvgAggregateOutputType | null
    _sum: LeaveSumAggregateOutputType | null
    _min: LeaveMinAggregateOutputType | null
    _max: LeaveMaxAggregateOutputType | null
  }

  type GetLeaveGroupByPayload<T extends LeaveGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveGroupByOutputType[P]>
        }
      >
    >


  export type LeaveSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterId?: boolean
    approverId?: boolean
    leavePolicyId?: boolean
    leaveType?: boolean
    startDate?: boolean
    endDate?: boolean
    totalDays?: boolean
    reason?: boolean
    status?: boolean
    appliedDate?: boolean
    approvedDate?: boolean
    rejectionReason?: boolean
    attachments?: boolean
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastReminderSent?: boolean
    isLOP?: boolean
    leavePolicy?: boolean | Leave$leavePolicyArgs<ExtArgs>
    dayStatuses?: boolean | Leave$dayStatusesArgs<ExtArgs>
    requester?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Leave$approverArgs<ExtArgs>
    _count?: boolean | LeaveCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leave"]>

  export type LeaveSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requesterId?: boolean
    approverId?: boolean
    leavePolicyId?: boolean
    leaveType?: boolean
    startDate?: boolean
    endDate?: boolean
    totalDays?: boolean
    reason?: boolean
    status?: boolean
    appliedDate?: boolean
    approvedDate?: boolean
    rejectionReason?: boolean
    attachments?: boolean
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastReminderSent?: boolean
    isLOP?: boolean
    leavePolicy?: boolean | Leave$leavePolicyArgs<ExtArgs>
    requester?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Leave$approverArgs<ExtArgs>
  }, ExtArgs["result"]["leave"]>

  export type LeaveSelectScalar = {
    id?: boolean
    requesterId?: boolean
    approverId?: boolean
    leavePolicyId?: boolean
    leaveType?: boolean
    startDate?: boolean
    endDate?: boolean
    totalDays?: boolean
    reason?: boolean
    status?: boolean
    appliedDate?: boolean
    approvedDate?: boolean
    rejectionReason?: boolean
    attachments?: boolean
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastReminderSent?: boolean
    isLOP?: boolean
  }

  export type LeaveInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leavePolicy?: boolean | Leave$leavePolicyArgs<ExtArgs>
    dayStatuses?: boolean | Leave$dayStatusesArgs<ExtArgs>
    requester?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Leave$approverArgs<ExtArgs>
    _count?: boolean | LeaveCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeaveIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leavePolicy?: boolean | Leave$leavePolicyArgs<ExtArgs>
    requester?: boolean | UserDefaultArgs<ExtArgs>
    approver?: boolean | Leave$approverArgs<ExtArgs>
  }

  export type $LeavePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Leave"
    objects: {
      leavePolicy: Prisma.$LeavePolicyPayload<ExtArgs> | null
      dayStatuses: Prisma.$LeaveDayStatusPayload<ExtArgs>[]
      requester: Prisma.$UserPayload<ExtArgs>
      approver: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requesterId: string
      approverId: string | null
      leavePolicyId: string | null
      leaveType: $Enums.LeaveType
      startDate: Date
      endDate: Date
      totalDays: number
      reason: string
      status: $Enums.LeaveStatus
      appliedDate: Date
      approvedDate: Date | null
      rejectionReason: string | null
      attachments: string[]
      isHalfDay: boolean
      emergencyLeave: boolean
      createdAt: Date
      updatedAt: Date
      lastReminderSent: Date | null
      isLOP: boolean
    }, ExtArgs["result"]["leave"]>
    composites: {}
  }

  type LeaveGetPayload<S extends boolean | null | undefined | LeaveDefaultArgs> = $Result.GetResult<Prisma.$LeavePayload, S>

  type LeaveCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeaveFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeaveCountAggregateInputType | true
    }

  export interface LeaveDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Leave'], meta: { name: 'Leave' } }
    /**
     * Find zero or one Leave that matches the filter.
     * @param {LeaveFindUniqueArgs} args - Arguments to find a Leave
     * @example
     * // Get one Leave
     * const leave = await prisma.leave.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveFindUniqueArgs>(args: SelectSubset<T, LeaveFindUniqueArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Leave that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeaveFindUniqueOrThrowArgs} args - Arguments to find a Leave
     * @example
     * // Get one Leave
     * const leave = await prisma.leave.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Leave that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveFindFirstArgs} args - Arguments to find a Leave
     * @example
     * // Get one Leave
     * const leave = await prisma.leave.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveFindFirstArgs>(args?: SelectSubset<T, LeaveFindFirstArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Leave that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveFindFirstOrThrowArgs} args - Arguments to find a Leave
     * @example
     * // Get one Leave
     * const leave = await prisma.leave.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Leaves that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leaves
     * const leaves = await prisma.leave.findMany()
     * 
     * // Get first 10 Leaves
     * const leaves = await prisma.leave.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveWithIdOnly = await prisma.leave.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveFindManyArgs>(args?: SelectSubset<T, LeaveFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Leave.
     * @param {LeaveCreateArgs} args - Arguments to create a Leave.
     * @example
     * // Create one Leave
     * const Leave = await prisma.leave.create({
     *   data: {
     *     // ... data to create a Leave
     *   }
     * })
     * 
     */
    create<T extends LeaveCreateArgs>(args: SelectSubset<T, LeaveCreateArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Leaves.
     * @param {LeaveCreateManyArgs} args - Arguments to create many Leaves.
     * @example
     * // Create many Leaves
     * const leave = await prisma.leave.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveCreateManyArgs>(args?: SelectSubset<T, LeaveCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leaves and returns the data saved in the database.
     * @param {LeaveCreateManyAndReturnArgs} args - Arguments to create many Leaves.
     * @example
     * // Create many Leaves
     * const leave = await prisma.leave.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leaves and only return the `id`
     * const leaveWithIdOnly = await prisma.leave.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Leave.
     * @param {LeaveDeleteArgs} args - Arguments to delete one Leave.
     * @example
     * // Delete one Leave
     * const Leave = await prisma.leave.delete({
     *   where: {
     *     // ... filter to delete one Leave
     *   }
     * })
     * 
     */
    delete<T extends LeaveDeleteArgs>(args: SelectSubset<T, LeaveDeleteArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Leave.
     * @param {LeaveUpdateArgs} args - Arguments to update one Leave.
     * @example
     * // Update one Leave
     * const leave = await prisma.leave.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveUpdateArgs>(args: SelectSubset<T, LeaveUpdateArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Leaves.
     * @param {LeaveDeleteManyArgs} args - Arguments to filter Leaves to delete.
     * @example
     * // Delete a few Leaves
     * const { count } = await prisma.leave.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveDeleteManyArgs>(args?: SelectSubset<T, LeaveDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leaves
     * const leave = await prisma.leave.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveUpdateManyArgs>(args: SelectSubset<T, LeaveUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Leave.
     * @param {LeaveUpsertArgs} args - Arguments to update or create a Leave.
     * @example
     * // Update or create a Leave
     * const leave = await prisma.leave.upsert({
     *   create: {
     *     // ... data to create a Leave
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Leave we want to update
     *   }
     * })
     */
    upsert<T extends LeaveUpsertArgs>(args: SelectSubset<T, LeaveUpsertArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Leaves.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveCountArgs} args - Arguments to filter Leaves to count.
     * @example
     * // Count the number of Leaves
     * const count = await prisma.leave.count({
     *   where: {
     *     // ... the filter for the Leaves we want to count
     *   }
     * })
    **/
    count<T extends LeaveCountArgs>(
      args?: Subset<T, LeaveCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaveAggregateArgs>(args: Subset<T, LeaveAggregateArgs>): Prisma.PrismaPromise<GetLeaveAggregateType<T>>

    /**
     * Group by Leave.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaveGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveGroupByArgs['orderBy'] }
        : { orderBy?: LeaveGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaveGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Leave model
   */
  readonly fields: LeaveFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Leave.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leavePolicy<T extends Leave$leavePolicyArgs<ExtArgs> = {}>(args?: Subset<T, Leave$leavePolicyArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    dayStatuses<T extends Leave$dayStatusesArgs<ExtArgs> = {}>(args?: Subset<T, Leave$dayStatusesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "findMany"> | Null>
    requester<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    approver<T extends Leave$approverArgs<ExtArgs> = {}>(args?: Subset<T, Leave$approverArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Leave model
   */ 
  interface LeaveFieldRefs {
    readonly id: FieldRef<"Leave", 'String'>
    readonly requesterId: FieldRef<"Leave", 'String'>
    readonly approverId: FieldRef<"Leave", 'String'>
    readonly leavePolicyId: FieldRef<"Leave", 'String'>
    readonly leaveType: FieldRef<"Leave", 'LeaveType'>
    readonly startDate: FieldRef<"Leave", 'DateTime'>
    readonly endDate: FieldRef<"Leave", 'DateTime'>
    readonly totalDays: FieldRef<"Leave", 'Float'>
    readonly reason: FieldRef<"Leave", 'String'>
    readonly status: FieldRef<"Leave", 'LeaveStatus'>
    readonly appliedDate: FieldRef<"Leave", 'DateTime'>
    readonly approvedDate: FieldRef<"Leave", 'DateTime'>
    readonly rejectionReason: FieldRef<"Leave", 'String'>
    readonly attachments: FieldRef<"Leave", 'String[]'>
    readonly isHalfDay: FieldRef<"Leave", 'Boolean'>
    readonly emergencyLeave: FieldRef<"Leave", 'Boolean'>
    readonly createdAt: FieldRef<"Leave", 'DateTime'>
    readonly updatedAt: FieldRef<"Leave", 'DateTime'>
    readonly lastReminderSent: FieldRef<"Leave", 'DateTime'>
    readonly isLOP: FieldRef<"Leave", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Leave findUnique
   */
  export type LeaveFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * Filter, which Leave to fetch.
     */
    where: LeaveWhereUniqueInput
  }

  /**
   * Leave findUniqueOrThrow
   */
  export type LeaveFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * Filter, which Leave to fetch.
     */
    where: LeaveWhereUniqueInput
  }

  /**
   * Leave findFirst
   */
  export type LeaveFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * Filter, which Leave to fetch.
     */
    where?: LeaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaves to fetch.
     */
    orderBy?: LeaveOrderByWithRelationInput | LeaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leaves.
     */
    cursor?: LeaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leaves.
     */
    distinct?: LeaveScalarFieldEnum | LeaveScalarFieldEnum[]
  }

  /**
   * Leave findFirstOrThrow
   */
  export type LeaveFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * Filter, which Leave to fetch.
     */
    where?: LeaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaves to fetch.
     */
    orderBy?: LeaveOrderByWithRelationInput | LeaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leaves.
     */
    cursor?: LeaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaves.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leaves.
     */
    distinct?: LeaveScalarFieldEnum | LeaveScalarFieldEnum[]
  }

  /**
   * Leave findMany
   */
  export type LeaveFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * Filter, which Leaves to fetch.
     */
    where?: LeaveWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leaves to fetch.
     */
    orderBy?: LeaveOrderByWithRelationInput | LeaveOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leaves.
     */
    cursor?: LeaveWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leaves from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leaves.
     */
    skip?: number
    distinct?: LeaveScalarFieldEnum | LeaveScalarFieldEnum[]
  }

  /**
   * Leave create
   */
  export type LeaveCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * The data needed to create a Leave.
     */
    data: XOR<LeaveCreateInput, LeaveUncheckedCreateInput>
  }

  /**
   * Leave createMany
   */
  export type LeaveCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leaves.
     */
    data: LeaveCreateManyInput | LeaveCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Leave createManyAndReturn
   */
  export type LeaveCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Leaves.
     */
    data: LeaveCreateManyInput | LeaveCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Leave update
   */
  export type LeaveUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * The data needed to update a Leave.
     */
    data: XOR<LeaveUpdateInput, LeaveUncheckedUpdateInput>
    /**
     * Choose, which Leave to update.
     */
    where: LeaveWhereUniqueInput
  }

  /**
   * Leave updateMany
   */
  export type LeaveUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leaves.
     */
    data: XOR<LeaveUpdateManyMutationInput, LeaveUncheckedUpdateManyInput>
    /**
     * Filter which Leaves to update
     */
    where?: LeaveWhereInput
  }

  /**
   * Leave upsert
   */
  export type LeaveUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * The filter to search for the Leave to update in case it exists.
     */
    where: LeaveWhereUniqueInput
    /**
     * In case the Leave found by the `where` argument doesn't exist, create a new Leave with this data.
     */
    create: XOR<LeaveCreateInput, LeaveUncheckedCreateInput>
    /**
     * In case the Leave was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveUpdateInput, LeaveUncheckedUpdateInput>
  }

  /**
   * Leave delete
   */
  export type LeaveDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
    /**
     * Filter which Leave to delete.
     */
    where: LeaveWhereUniqueInput
  }

  /**
   * Leave deleteMany
   */
  export type LeaveDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leaves to delete
     */
    where?: LeaveWhereInput
  }

  /**
   * Leave.leavePolicy
   */
  export type Leave$leavePolicyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeavePolicy
     */
    select?: LeavePolicySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeavePolicyInclude<ExtArgs> | null
    where?: LeavePolicyWhereInput
  }

  /**
   * Leave.dayStatuses
   */
  export type Leave$dayStatusesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    where?: LeaveDayStatusWhereInput
    orderBy?: LeaveDayStatusOrderByWithRelationInput | LeaveDayStatusOrderByWithRelationInput[]
    cursor?: LeaveDayStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaveDayStatusScalarFieldEnum | LeaveDayStatusScalarFieldEnum[]
  }

  /**
   * Leave.approver
   */
  export type Leave$approverArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Leave without action
   */
  export type LeaveDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Leave
     */
    select?: LeaveSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveInclude<ExtArgs> | null
  }


  /**
   * Model LeaveDayStatus
   */

  export type AggregateLeaveDayStatus = {
    _count: LeaveDayStatusCountAggregateOutputType | null
    _min: LeaveDayStatusMinAggregateOutputType | null
    _max: LeaveDayStatusMaxAggregateOutputType | null
  }

  export type LeaveDayStatusMinAggregateOutputType = {
    id: string | null
    leaveId: string | null
    date: Date | null
    status: $Enums.LeaveStatus | null
    reason: string | null
  }

  export type LeaveDayStatusMaxAggregateOutputType = {
    id: string | null
    leaveId: string | null
    date: Date | null
    status: $Enums.LeaveStatus | null
    reason: string | null
  }

  export type LeaveDayStatusCountAggregateOutputType = {
    id: number
    leaveId: number
    date: number
    status: number
    reason: number
    _all: number
  }


  export type LeaveDayStatusMinAggregateInputType = {
    id?: true
    leaveId?: true
    date?: true
    status?: true
    reason?: true
  }

  export type LeaveDayStatusMaxAggregateInputType = {
    id?: true
    leaveId?: true
    date?: true
    status?: true
    reason?: true
  }

  export type LeaveDayStatusCountAggregateInputType = {
    id?: true
    leaveId?: true
    date?: true
    status?: true
    reason?: true
    _all?: true
  }

  export type LeaveDayStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveDayStatus to aggregate.
     */
    where?: LeaveDayStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveDayStatuses to fetch.
     */
    orderBy?: LeaveDayStatusOrderByWithRelationInput | LeaveDayStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveDayStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveDayStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveDayStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveDayStatuses
    **/
    _count?: true | LeaveDayStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveDayStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveDayStatusMaxAggregateInputType
  }

  export type GetLeaveDayStatusAggregateType<T extends LeaveDayStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveDayStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveDayStatus[P]>
      : GetScalarType<T[P], AggregateLeaveDayStatus[P]>
  }




  export type LeaveDayStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveDayStatusWhereInput
    orderBy?: LeaveDayStatusOrderByWithAggregationInput | LeaveDayStatusOrderByWithAggregationInput[]
    by: LeaveDayStatusScalarFieldEnum[] | LeaveDayStatusScalarFieldEnum
    having?: LeaveDayStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveDayStatusCountAggregateInputType | true
    _min?: LeaveDayStatusMinAggregateInputType
    _max?: LeaveDayStatusMaxAggregateInputType
  }

  export type LeaveDayStatusGroupByOutputType = {
    id: string
    leaveId: string
    date: Date
    status: $Enums.LeaveStatus
    reason: string | null
    _count: LeaveDayStatusCountAggregateOutputType | null
    _min: LeaveDayStatusMinAggregateOutputType | null
    _max: LeaveDayStatusMaxAggregateOutputType | null
  }

  type GetLeaveDayStatusGroupByPayload<T extends LeaveDayStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveDayStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveDayStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveDayStatusGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveDayStatusGroupByOutputType[P]>
        }
      >
    >


  export type LeaveDayStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leaveId?: boolean
    date?: boolean
    status?: boolean
    reason?: boolean
    leave?: boolean | LeaveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveDayStatus"]>

  export type LeaveDayStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    leaveId?: boolean
    date?: boolean
    status?: boolean
    reason?: boolean
    leave?: boolean | LeaveDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveDayStatus"]>

  export type LeaveDayStatusSelectScalar = {
    id?: boolean
    leaveId?: boolean
    date?: boolean
    status?: boolean
    reason?: boolean
  }

  export type LeaveDayStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave?: boolean | LeaveDefaultArgs<ExtArgs>
  }
  export type LeaveDayStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leave?: boolean | LeaveDefaultArgs<ExtArgs>
  }

  export type $LeaveDayStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveDayStatus"
    objects: {
      leave: Prisma.$LeavePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      leaveId: string
      date: Date
      status: $Enums.LeaveStatus
      reason: string | null
    }, ExtArgs["result"]["leaveDayStatus"]>
    composites: {}
  }

  type LeaveDayStatusGetPayload<S extends boolean | null | undefined | LeaveDayStatusDefaultArgs> = $Result.GetResult<Prisma.$LeaveDayStatusPayload, S>

  type LeaveDayStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeaveDayStatusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeaveDayStatusCountAggregateInputType | true
    }

  export interface LeaveDayStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveDayStatus'], meta: { name: 'LeaveDayStatus' } }
    /**
     * Find zero or one LeaveDayStatus that matches the filter.
     * @param {LeaveDayStatusFindUniqueArgs} args - Arguments to find a LeaveDayStatus
     * @example
     * // Get one LeaveDayStatus
     * const leaveDayStatus = await prisma.leaveDayStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveDayStatusFindUniqueArgs>(args: SelectSubset<T, LeaveDayStatusFindUniqueArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LeaveDayStatus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeaveDayStatusFindUniqueOrThrowArgs} args - Arguments to find a LeaveDayStatus
     * @example
     * // Get one LeaveDayStatus
     * const leaveDayStatus = await prisma.leaveDayStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveDayStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveDayStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LeaveDayStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveDayStatusFindFirstArgs} args - Arguments to find a LeaveDayStatus
     * @example
     * // Get one LeaveDayStatus
     * const leaveDayStatus = await prisma.leaveDayStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveDayStatusFindFirstArgs>(args?: SelectSubset<T, LeaveDayStatusFindFirstArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LeaveDayStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveDayStatusFindFirstOrThrowArgs} args - Arguments to find a LeaveDayStatus
     * @example
     * // Get one LeaveDayStatus
     * const leaveDayStatus = await prisma.leaveDayStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveDayStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveDayStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LeaveDayStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveDayStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveDayStatuses
     * const leaveDayStatuses = await prisma.leaveDayStatus.findMany()
     * 
     * // Get first 10 LeaveDayStatuses
     * const leaveDayStatuses = await prisma.leaveDayStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveDayStatusWithIdOnly = await prisma.leaveDayStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveDayStatusFindManyArgs>(args?: SelectSubset<T, LeaveDayStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LeaveDayStatus.
     * @param {LeaveDayStatusCreateArgs} args - Arguments to create a LeaveDayStatus.
     * @example
     * // Create one LeaveDayStatus
     * const LeaveDayStatus = await prisma.leaveDayStatus.create({
     *   data: {
     *     // ... data to create a LeaveDayStatus
     *   }
     * })
     * 
     */
    create<T extends LeaveDayStatusCreateArgs>(args: SelectSubset<T, LeaveDayStatusCreateArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LeaveDayStatuses.
     * @param {LeaveDayStatusCreateManyArgs} args - Arguments to create many LeaveDayStatuses.
     * @example
     * // Create many LeaveDayStatuses
     * const leaveDayStatus = await prisma.leaveDayStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveDayStatusCreateManyArgs>(args?: SelectSubset<T, LeaveDayStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveDayStatuses and returns the data saved in the database.
     * @param {LeaveDayStatusCreateManyAndReturnArgs} args - Arguments to create many LeaveDayStatuses.
     * @example
     * // Create many LeaveDayStatuses
     * const leaveDayStatus = await prisma.leaveDayStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveDayStatuses and only return the `id`
     * const leaveDayStatusWithIdOnly = await prisma.leaveDayStatus.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveDayStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveDayStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LeaveDayStatus.
     * @param {LeaveDayStatusDeleteArgs} args - Arguments to delete one LeaveDayStatus.
     * @example
     * // Delete one LeaveDayStatus
     * const LeaveDayStatus = await prisma.leaveDayStatus.delete({
     *   where: {
     *     // ... filter to delete one LeaveDayStatus
     *   }
     * })
     * 
     */
    delete<T extends LeaveDayStatusDeleteArgs>(args: SelectSubset<T, LeaveDayStatusDeleteArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LeaveDayStatus.
     * @param {LeaveDayStatusUpdateArgs} args - Arguments to update one LeaveDayStatus.
     * @example
     * // Update one LeaveDayStatus
     * const leaveDayStatus = await prisma.leaveDayStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveDayStatusUpdateArgs>(args: SelectSubset<T, LeaveDayStatusUpdateArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LeaveDayStatuses.
     * @param {LeaveDayStatusDeleteManyArgs} args - Arguments to filter LeaveDayStatuses to delete.
     * @example
     * // Delete a few LeaveDayStatuses
     * const { count } = await prisma.leaveDayStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveDayStatusDeleteManyArgs>(args?: SelectSubset<T, LeaveDayStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveDayStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveDayStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveDayStatuses
     * const leaveDayStatus = await prisma.leaveDayStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveDayStatusUpdateManyArgs>(args: SelectSubset<T, LeaveDayStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LeaveDayStatus.
     * @param {LeaveDayStatusUpsertArgs} args - Arguments to update or create a LeaveDayStatus.
     * @example
     * // Update or create a LeaveDayStatus
     * const leaveDayStatus = await prisma.leaveDayStatus.upsert({
     *   create: {
     *     // ... data to create a LeaveDayStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveDayStatus we want to update
     *   }
     * })
     */
    upsert<T extends LeaveDayStatusUpsertArgs>(args: SelectSubset<T, LeaveDayStatusUpsertArgs<ExtArgs>>): Prisma__LeaveDayStatusClient<$Result.GetResult<Prisma.$LeaveDayStatusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LeaveDayStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveDayStatusCountArgs} args - Arguments to filter LeaveDayStatuses to count.
     * @example
     * // Count the number of LeaveDayStatuses
     * const count = await prisma.leaveDayStatus.count({
     *   where: {
     *     // ... the filter for the LeaveDayStatuses we want to count
     *   }
     * })
    **/
    count<T extends LeaveDayStatusCountArgs>(
      args?: Subset<T, LeaveDayStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveDayStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveDayStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveDayStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaveDayStatusAggregateArgs>(args: Subset<T, LeaveDayStatusAggregateArgs>): Prisma.PrismaPromise<GetLeaveDayStatusAggregateType<T>>

    /**
     * Group by LeaveDayStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveDayStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaveDayStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveDayStatusGroupByArgs['orderBy'] }
        : { orderBy?: LeaveDayStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaveDayStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveDayStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveDayStatus model
   */
  readonly fields: LeaveDayStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveDayStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveDayStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    leave<T extends LeaveDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeaveDefaultArgs<ExtArgs>>): Prisma__LeaveClient<$Result.GetResult<Prisma.$LeavePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeaveDayStatus model
   */ 
  interface LeaveDayStatusFieldRefs {
    readonly id: FieldRef<"LeaveDayStatus", 'String'>
    readonly leaveId: FieldRef<"LeaveDayStatus", 'String'>
    readonly date: FieldRef<"LeaveDayStatus", 'DateTime'>
    readonly status: FieldRef<"LeaveDayStatus", 'LeaveStatus'>
    readonly reason: FieldRef<"LeaveDayStatus", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LeaveDayStatus findUnique
   */
  export type LeaveDayStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * Filter, which LeaveDayStatus to fetch.
     */
    where: LeaveDayStatusWhereUniqueInput
  }

  /**
   * LeaveDayStatus findUniqueOrThrow
   */
  export type LeaveDayStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * Filter, which LeaveDayStatus to fetch.
     */
    where: LeaveDayStatusWhereUniqueInput
  }

  /**
   * LeaveDayStatus findFirst
   */
  export type LeaveDayStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * Filter, which LeaveDayStatus to fetch.
     */
    where?: LeaveDayStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveDayStatuses to fetch.
     */
    orderBy?: LeaveDayStatusOrderByWithRelationInput | LeaveDayStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveDayStatuses.
     */
    cursor?: LeaveDayStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveDayStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveDayStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveDayStatuses.
     */
    distinct?: LeaveDayStatusScalarFieldEnum | LeaveDayStatusScalarFieldEnum[]
  }

  /**
   * LeaveDayStatus findFirstOrThrow
   */
  export type LeaveDayStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * Filter, which LeaveDayStatus to fetch.
     */
    where?: LeaveDayStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveDayStatuses to fetch.
     */
    orderBy?: LeaveDayStatusOrderByWithRelationInput | LeaveDayStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveDayStatuses.
     */
    cursor?: LeaveDayStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveDayStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveDayStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveDayStatuses.
     */
    distinct?: LeaveDayStatusScalarFieldEnum | LeaveDayStatusScalarFieldEnum[]
  }

  /**
   * LeaveDayStatus findMany
   */
  export type LeaveDayStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * Filter, which LeaveDayStatuses to fetch.
     */
    where?: LeaveDayStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveDayStatuses to fetch.
     */
    orderBy?: LeaveDayStatusOrderByWithRelationInput | LeaveDayStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveDayStatuses.
     */
    cursor?: LeaveDayStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveDayStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveDayStatuses.
     */
    skip?: number
    distinct?: LeaveDayStatusScalarFieldEnum | LeaveDayStatusScalarFieldEnum[]
  }

  /**
   * LeaveDayStatus create
   */
  export type LeaveDayStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveDayStatus.
     */
    data: XOR<LeaveDayStatusCreateInput, LeaveDayStatusUncheckedCreateInput>
  }

  /**
   * LeaveDayStatus createMany
   */
  export type LeaveDayStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveDayStatuses.
     */
    data: LeaveDayStatusCreateManyInput | LeaveDayStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveDayStatus createManyAndReturn
   */
  export type LeaveDayStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LeaveDayStatuses.
     */
    data: LeaveDayStatusCreateManyInput | LeaveDayStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveDayStatus update
   */
  export type LeaveDayStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveDayStatus.
     */
    data: XOR<LeaveDayStatusUpdateInput, LeaveDayStatusUncheckedUpdateInput>
    /**
     * Choose, which LeaveDayStatus to update.
     */
    where: LeaveDayStatusWhereUniqueInput
  }

  /**
   * LeaveDayStatus updateMany
   */
  export type LeaveDayStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveDayStatuses.
     */
    data: XOR<LeaveDayStatusUpdateManyMutationInput, LeaveDayStatusUncheckedUpdateManyInput>
    /**
     * Filter which LeaveDayStatuses to update
     */
    where?: LeaveDayStatusWhereInput
  }

  /**
   * LeaveDayStatus upsert
   */
  export type LeaveDayStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveDayStatus to update in case it exists.
     */
    where: LeaveDayStatusWhereUniqueInput
    /**
     * In case the LeaveDayStatus found by the `where` argument doesn't exist, create a new LeaveDayStatus with this data.
     */
    create: XOR<LeaveDayStatusCreateInput, LeaveDayStatusUncheckedCreateInput>
    /**
     * In case the LeaveDayStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveDayStatusUpdateInput, LeaveDayStatusUncheckedUpdateInput>
  }

  /**
   * LeaveDayStatus delete
   */
  export type LeaveDayStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
    /**
     * Filter which LeaveDayStatus to delete.
     */
    where: LeaveDayStatusWhereUniqueInput
  }

  /**
   * LeaveDayStatus deleteMany
   */
  export type LeaveDayStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveDayStatuses to delete
     */
    where?: LeaveDayStatusWhereInput
  }

  /**
   * LeaveDayStatus without action
   */
  export type LeaveDayStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveDayStatus
     */
    select?: LeaveDayStatusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveDayStatusInclude<ExtArgs> | null
  }


  /**
   * Model LeaveBalance
   */

  export type AggregateLeaveBalance = {
    _count: LeaveBalanceCountAggregateOutputType | null
    _avg: LeaveBalanceAvgAggregateOutputType | null
    _sum: LeaveBalanceSumAggregateOutputType | null
    _min: LeaveBalanceMinAggregateOutputType | null
    _max: LeaveBalanceMaxAggregateOutputType | null
  }

  export type LeaveBalanceAvgAggregateOutputType = {
    year: number | null
    totalQuota: number | null
    usedDays: number | null
    pendingDays: number | null
    availableDays: number | null
    carryForward: number | null
  }

  export type LeaveBalanceSumAggregateOutputType = {
    year: number | null
    totalQuota: number | null
    usedDays: number | null
    pendingDays: number | null
    availableDays: number | null
    carryForward: number | null
  }

  export type LeaveBalanceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    leavePolicyId: string | null
    year: number | null
    totalQuota: number | null
    usedDays: number | null
    pendingDays: number | null
    availableDays: number | null
    carryForward: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaveBalanceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    leavePolicyId: string | null
    year: number | null
    totalQuota: number | null
    usedDays: number | null
    pendingDays: number | null
    availableDays: number | null
    carryForward: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LeaveBalanceCountAggregateOutputType = {
    id: number
    userId: number
    leavePolicyId: number
    year: number
    totalQuota: number
    usedDays: number
    pendingDays: number
    availableDays: number
    carryForward: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LeaveBalanceAvgAggregateInputType = {
    year?: true
    totalQuota?: true
    usedDays?: true
    pendingDays?: true
    availableDays?: true
    carryForward?: true
  }

  export type LeaveBalanceSumAggregateInputType = {
    year?: true
    totalQuota?: true
    usedDays?: true
    pendingDays?: true
    availableDays?: true
    carryForward?: true
  }

  export type LeaveBalanceMinAggregateInputType = {
    id?: true
    userId?: true
    leavePolicyId?: true
    year?: true
    totalQuota?: true
    usedDays?: true
    pendingDays?: true
    availableDays?: true
    carryForward?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaveBalanceMaxAggregateInputType = {
    id?: true
    userId?: true
    leavePolicyId?: true
    year?: true
    totalQuota?: true
    usedDays?: true
    pendingDays?: true
    availableDays?: true
    carryForward?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LeaveBalanceCountAggregateInputType = {
    id?: true
    userId?: true
    leavePolicyId?: true
    year?: true
    totalQuota?: true
    usedDays?: true
    pendingDays?: true
    availableDays?: true
    carryForward?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LeaveBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveBalance to aggregate.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LeaveBalances
    **/
    _count?: true | LeaveBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaveBalanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaveBalanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaveBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaveBalanceMaxAggregateInputType
  }

  export type GetLeaveBalanceAggregateType<T extends LeaveBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateLeaveBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLeaveBalance[P]>
      : GetScalarType<T[P], AggregateLeaveBalance[P]>
  }




  export type LeaveBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaveBalanceWhereInput
    orderBy?: LeaveBalanceOrderByWithAggregationInput | LeaveBalanceOrderByWithAggregationInput[]
    by: LeaveBalanceScalarFieldEnum[] | LeaveBalanceScalarFieldEnum
    having?: LeaveBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaveBalanceCountAggregateInputType | true
    _avg?: LeaveBalanceAvgAggregateInputType
    _sum?: LeaveBalanceSumAggregateInputType
    _min?: LeaveBalanceMinAggregateInputType
    _max?: LeaveBalanceMaxAggregateInputType
  }

  export type LeaveBalanceGroupByOutputType = {
    id: string
    userId: string
    leavePolicyId: string
    year: number
    totalQuota: number
    usedDays: number
    pendingDays: number
    availableDays: number
    carryForward: number
    createdAt: Date
    updatedAt: Date
    _count: LeaveBalanceCountAggregateOutputType | null
    _avg: LeaveBalanceAvgAggregateOutputType | null
    _sum: LeaveBalanceSumAggregateOutputType | null
    _min: LeaveBalanceMinAggregateOutputType | null
    _max: LeaveBalanceMaxAggregateOutputType | null
  }

  type GetLeaveBalanceGroupByPayload<T extends LeaveBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaveBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaveBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaveBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], LeaveBalanceGroupByOutputType[P]>
        }
      >
    >


  export type LeaveBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leavePolicyId?: boolean
    year?: boolean
    totalQuota?: boolean
    usedDays?: boolean
    pendingDays?: boolean
    availableDays?: boolean
    carryForward?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    leavePolicy?: boolean | LeavePolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    leavePolicyId?: boolean
    year?: boolean
    totalQuota?: boolean
    usedDays?: boolean
    pendingDays?: boolean
    availableDays?: boolean
    carryForward?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    leavePolicy?: boolean | LeavePolicyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["leaveBalance"]>

  export type LeaveBalanceSelectScalar = {
    id?: boolean
    userId?: boolean
    leavePolicyId?: boolean
    year?: boolean
    totalQuota?: boolean
    usedDays?: boolean
    pendingDays?: boolean
    availableDays?: boolean
    carryForward?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LeaveBalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    leavePolicy?: boolean | LeavePolicyDefaultArgs<ExtArgs>
  }
  export type LeaveBalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    leavePolicy?: boolean | LeavePolicyDefaultArgs<ExtArgs>
  }

  export type $LeaveBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LeaveBalance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      leavePolicy: Prisma.$LeavePolicyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      leavePolicyId: string
      year: number
      totalQuota: number
      usedDays: number
      pendingDays: number
      availableDays: number
      carryForward: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["leaveBalance"]>
    composites: {}
  }

  type LeaveBalanceGetPayload<S extends boolean | null | undefined | LeaveBalanceDefaultArgs> = $Result.GetResult<Prisma.$LeaveBalancePayload, S>

  type LeaveBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LeaveBalanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LeaveBalanceCountAggregateInputType | true
    }

  export interface LeaveBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LeaveBalance'], meta: { name: 'LeaveBalance' } }
    /**
     * Find zero or one LeaveBalance that matches the filter.
     * @param {LeaveBalanceFindUniqueArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaveBalanceFindUniqueArgs>(args: SelectSubset<T, LeaveBalanceFindUniqueArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LeaveBalance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LeaveBalanceFindUniqueOrThrowArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaveBalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaveBalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LeaveBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindFirstArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaveBalanceFindFirstArgs>(args?: SelectSubset<T, LeaveBalanceFindFirstArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LeaveBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindFirstOrThrowArgs} args - Arguments to find a LeaveBalance
     * @example
     * // Get one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaveBalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaveBalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LeaveBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LeaveBalances
     * const leaveBalances = await prisma.leaveBalance.findMany()
     * 
     * // Get first 10 LeaveBalances
     * const leaveBalances = await prisma.leaveBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaveBalanceFindManyArgs>(args?: SelectSubset<T, LeaveBalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LeaveBalance.
     * @param {LeaveBalanceCreateArgs} args - Arguments to create a LeaveBalance.
     * @example
     * // Create one LeaveBalance
     * const LeaveBalance = await prisma.leaveBalance.create({
     *   data: {
     *     // ... data to create a LeaveBalance
     *   }
     * })
     * 
     */
    create<T extends LeaveBalanceCreateArgs>(args: SelectSubset<T, LeaveBalanceCreateArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LeaveBalances.
     * @param {LeaveBalanceCreateManyArgs} args - Arguments to create many LeaveBalances.
     * @example
     * // Create many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaveBalanceCreateManyArgs>(args?: SelectSubset<T, LeaveBalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LeaveBalances and returns the data saved in the database.
     * @param {LeaveBalanceCreateManyAndReturnArgs} args - Arguments to create many LeaveBalances.
     * @example
     * // Create many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LeaveBalances and only return the `id`
     * const leaveBalanceWithIdOnly = await prisma.leaveBalance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaveBalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaveBalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LeaveBalance.
     * @param {LeaveBalanceDeleteArgs} args - Arguments to delete one LeaveBalance.
     * @example
     * // Delete one LeaveBalance
     * const LeaveBalance = await prisma.leaveBalance.delete({
     *   where: {
     *     // ... filter to delete one LeaveBalance
     *   }
     * })
     * 
     */
    delete<T extends LeaveBalanceDeleteArgs>(args: SelectSubset<T, LeaveBalanceDeleteArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LeaveBalance.
     * @param {LeaveBalanceUpdateArgs} args - Arguments to update one LeaveBalance.
     * @example
     * // Update one LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaveBalanceUpdateArgs>(args: SelectSubset<T, LeaveBalanceUpdateArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LeaveBalances.
     * @param {LeaveBalanceDeleteManyArgs} args - Arguments to filter LeaveBalances to delete.
     * @example
     * // Delete a few LeaveBalances
     * const { count } = await prisma.leaveBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaveBalanceDeleteManyArgs>(args?: SelectSubset<T, LeaveBalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LeaveBalances
     * const leaveBalance = await prisma.leaveBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaveBalanceUpdateManyArgs>(args: SelectSubset<T, LeaveBalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LeaveBalance.
     * @param {LeaveBalanceUpsertArgs} args - Arguments to update or create a LeaveBalance.
     * @example
     * // Update or create a LeaveBalance
     * const leaveBalance = await prisma.leaveBalance.upsert({
     *   create: {
     *     // ... data to create a LeaveBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LeaveBalance we want to update
     *   }
     * })
     */
    upsert<T extends LeaveBalanceUpsertArgs>(args: SelectSubset<T, LeaveBalanceUpsertArgs<ExtArgs>>): Prisma__LeaveBalanceClient<$Result.GetResult<Prisma.$LeaveBalancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LeaveBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceCountArgs} args - Arguments to filter LeaveBalances to count.
     * @example
     * // Count the number of LeaveBalances
     * const count = await prisma.leaveBalance.count({
     *   where: {
     *     // ... the filter for the LeaveBalances we want to count
     *   }
     * })
    **/
    count<T extends LeaveBalanceCountArgs>(
      args?: Subset<T, LeaveBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaveBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaveBalanceAggregateArgs>(args: Subset<T, LeaveBalanceAggregateArgs>): Prisma.PrismaPromise<GetLeaveBalanceAggregateType<T>>

    /**
     * Group by LeaveBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaveBalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaveBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaveBalanceGroupByArgs['orderBy'] }
        : { orderBy?: LeaveBalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaveBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaveBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LeaveBalance model
   */
  readonly fields: LeaveBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LeaveBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaveBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    leavePolicy<T extends LeavePolicyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeavePolicyDefaultArgs<ExtArgs>>): Prisma__LeavePolicyClient<$Result.GetResult<Prisma.$LeavePolicyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LeaveBalance model
   */ 
  interface LeaveBalanceFieldRefs {
    readonly id: FieldRef<"LeaveBalance", 'String'>
    readonly userId: FieldRef<"LeaveBalance", 'String'>
    readonly leavePolicyId: FieldRef<"LeaveBalance", 'String'>
    readonly year: FieldRef<"LeaveBalance", 'Int'>
    readonly totalQuota: FieldRef<"LeaveBalance", 'Int'>
    readonly usedDays: FieldRef<"LeaveBalance", 'Float'>
    readonly pendingDays: FieldRef<"LeaveBalance", 'Float'>
    readonly availableDays: FieldRef<"LeaveBalance", 'Float'>
    readonly carryForward: FieldRef<"LeaveBalance", 'Float'>
    readonly createdAt: FieldRef<"LeaveBalance", 'DateTime'>
    readonly updatedAt: FieldRef<"LeaveBalance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LeaveBalance findUnique
   */
  export type LeaveBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance findUniqueOrThrow
   */
  export type LeaveBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance findFirst
   */
  export type LeaveBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveBalances.
     */
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance findFirstOrThrow
   */
  export type LeaveBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalance to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LeaveBalances.
     */
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance findMany
   */
  export type LeaveBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter, which LeaveBalances to fetch.
     */
    where?: LeaveBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LeaveBalances to fetch.
     */
    orderBy?: LeaveBalanceOrderByWithRelationInput | LeaveBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LeaveBalances.
     */
    cursor?: LeaveBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LeaveBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LeaveBalances.
     */
    skip?: number
    distinct?: LeaveBalanceScalarFieldEnum | LeaveBalanceScalarFieldEnum[]
  }

  /**
   * LeaveBalance create
   */
  export type LeaveBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a LeaveBalance.
     */
    data: XOR<LeaveBalanceCreateInput, LeaveBalanceUncheckedCreateInput>
  }

  /**
   * LeaveBalance createMany
   */
  export type LeaveBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LeaveBalances.
     */
    data: LeaveBalanceCreateManyInput | LeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LeaveBalance createManyAndReturn
   */
  export type LeaveBalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LeaveBalances.
     */
    data: LeaveBalanceCreateManyInput | LeaveBalanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LeaveBalance update
   */
  export type LeaveBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a LeaveBalance.
     */
    data: XOR<LeaveBalanceUpdateInput, LeaveBalanceUncheckedUpdateInput>
    /**
     * Choose, which LeaveBalance to update.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance updateMany
   */
  export type LeaveBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LeaveBalances.
     */
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyInput>
    /**
     * Filter which LeaveBalances to update
     */
    where?: LeaveBalanceWhereInput
  }

  /**
   * LeaveBalance upsert
   */
  export type LeaveBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the LeaveBalance to update in case it exists.
     */
    where: LeaveBalanceWhereUniqueInput
    /**
     * In case the LeaveBalance found by the `where` argument doesn't exist, create a new LeaveBalance with this data.
     */
    create: XOR<LeaveBalanceCreateInput, LeaveBalanceUncheckedCreateInput>
    /**
     * In case the LeaveBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaveBalanceUpdateInput, LeaveBalanceUncheckedUpdateInput>
  }

  /**
   * LeaveBalance delete
   */
  export type LeaveBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
    /**
     * Filter which LeaveBalance to delete.
     */
    where: LeaveBalanceWhereUniqueInput
  }

  /**
   * LeaveBalance deleteMany
   */
  export type LeaveBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LeaveBalances to delete
     */
    where?: LeaveBalanceWhereInput
  }

  /**
   * LeaveBalance without action
   */
  export type LeaveBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaveBalance
     */
    select?: LeaveBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaveBalanceInclude<ExtArgs> | null
  }


  /**
   * Model Holiday
   */

  export type AggregateHoliday = {
    _count: HolidayCountAggregateOutputType | null
    _min: HolidayMinAggregateOutputType | null
    _max: HolidayMaxAggregateOutputType | null
  }

  export type HolidayMinAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    description: string | null
    isRecurring: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HolidayMaxAggregateOutputType = {
    id: string | null
    name: string | null
    date: Date | null
    description: string | null
    isRecurring: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HolidayCountAggregateOutputType = {
    id: number
    name: number
    date: number
    description: number
    isRecurring: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HolidayMinAggregateInputType = {
    id?: true
    name?: true
    date?: true
    description?: true
    isRecurring?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HolidayMaxAggregateInputType = {
    id?: true
    name?: true
    date?: true
    description?: true
    isRecurring?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HolidayCountAggregateInputType = {
    id?: true
    name?: true
    date?: true
    description?: true
    isRecurring?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HolidayAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holiday to aggregate.
     */
    where?: HolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holidays to fetch.
     */
    orderBy?: HolidayOrderByWithRelationInput | HolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Holidays
    **/
    _count?: true | HolidayCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HolidayMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HolidayMaxAggregateInputType
  }

  export type GetHolidayAggregateType<T extends HolidayAggregateArgs> = {
        [P in keyof T & keyof AggregateHoliday]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHoliday[P]>
      : GetScalarType<T[P], AggregateHoliday[P]>
  }




  export type HolidayGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HolidayWhereInput
    orderBy?: HolidayOrderByWithAggregationInput | HolidayOrderByWithAggregationInput[]
    by: HolidayScalarFieldEnum[] | HolidayScalarFieldEnum
    having?: HolidayScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HolidayCountAggregateInputType | true
    _min?: HolidayMinAggregateInputType
    _max?: HolidayMaxAggregateInputType
  }

  export type HolidayGroupByOutputType = {
    id: string
    name: string
    date: Date
    description: string | null
    isRecurring: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: HolidayCountAggregateOutputType | null
    _min: HolidayMinAggregateOutputType | null
    _max: HolidayMaxAggregateOutputType | null
  }

  type GetHolidayGroupByPayload<T extends HolidayGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HolidayGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HolidayGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HolidayGroupByOutputType[P]>
            : GetScalarType<T[P], HolidayGroupByOutputType[P]>
        }
      >
    >


  export type HolidaySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    description?: boolean
    isRecurring?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["holiday"]>

  export type HolidaySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    date?: boolean
    description?: boolean
    isRecurring?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["holiday"]>

  export type HolidaySelectScalar = {
    id?: boolean
    name?: boolean
    date?: boolean
    description?: boolean
    isRecurring?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $HolidayPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Holiday"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      date: Date
      description: string | null
      isRecurring: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["holiday"]>
    composites: {}
  }

  type HolidayGetPayload<S extends boolean | null | undefined | HolidayDefaultArgs> = $Result.GetResult<Prisma.$HolidayPayload, S>

  type HolidayCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HolidayFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HolidayCountAggregateInputType | true
    }

  export interface HolidayDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Holiday'], meta: { name: 'Holiday' } }
    /**
     * Find zero or one Holiday that matches the filter.
     * @param {HolidayFindUniqueArgs} args - Arguments to find a Holiday
     * @example
     * // Get one Holiday
     * const holiday = await prisma.holiday.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HolidayFindUniqueArgs>(args: SelectSubset<T, HolidayFindUniqueArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Holiday that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HolidayFindUniqueOrThrowArgs} args - Arguments to find a Holiday
     * @example
     * // Get one Holiday
     * const holiday = await prisma.holiday.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HolidayFindUniqueOrThrowArgs>(args: SelectSubset<T, HolidayFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Holiday that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidayFindFirstArgs} args - Arguments to find a Holiday
     * @example
     * // Get one Holiday
     * const holiday = await prisma.holiday.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HolidayFindFirstArgs>(args?: SelectSubset<T, HolidayFindFirstArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Holiday that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidayFindFirstOrThrowArgs} args - Arguments to find a Holiday
     * @example
     * // Get one Holiday
     * const holiday = await prisma.holiday.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HolidayFindFirstOrThrowArgs>(args?: SelectSubset<T, HolidayFindFirstOrThrowArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Holidays that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidayFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holidays
     * const holidays = await prisma.holiday.findMany()
     * 
     * // Get first 10 Holidays
     * const holidays = await prisma.holiday.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const holidayWithIdOnly = await prisma.holiday.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HolidayFindManyArgs>(args?: SelectSubset<T, HolidayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Holiday.
     * @param {HolidayCreateArgs} args - Arguments to create a Holiday.
     * @example
     * // Create one Holiday
     * const Holiday = await prisma.holiday.create({
     *   data: {
     *     // ... data to create a Holiday
     *   }
     * })
     * 
     */
    create<T extends HolidayCreateArgs>(args: SelectSubset<T, HolidayCreateArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Holidays.
     * @param {HolidayCreateManyArgs} args - Arguments to create many Holidays.
     * @example
     * // Create many Holidays
     * const holiday = await prisma.holiday.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HolidayCreateManyArgs>(args?: SelectSubset<T, HolidayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Holidays and returns the data saved in the database.
     * @param {HolidayCreateManyAndReturnArgs} args - Arguments to create many Holidays.
     * @example
     * // Create many Holidays
     * const holiday = await prisma.holiday.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Holidays and only return the `id`
     * const holidayWithIdOnly = await prisma.holiday.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HolidayCreateManyAndReturnArgs>(args?: SelectSubset<T, HolidayCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Holiday.
     * @param {HolidayDeleteArgs} args - Arguments to delete one Holiday.
     * @example
     * // Delete one Holiday
     * const Holiday = await prisma.holiday.delete({
     *   where: {
     *     // ... filter to delete one Holiday
     *   }
     * })
     * 
     */
    delete<T extends HolidayDeleteArgs>(args: SelectSubset<T, HolidayDeleteArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Holiday.
     * @param {HolidayUpdateArgs} args - Arguments to update one Holiday.
     * @example
     * // Update one Holiday
     * const holiday = await prisma.holiday.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HolidayUpdateArgs>(args: SelectSubset<T, HolidayUpdateArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Holidays.
     * @param {HolidayDeleteManyArgs} args - Arguments to filter Holidays to delete.
     * @example
     * // Delete a few Holidays
     * const { count } = await prisma.holiday.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HolidayDeleteManyArgs>(args?: SelectSubset<T, HolidayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidayUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holidays
     * const holiday = await prisma.holiday.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HolidayUpdateManyArgs>(args: SelectSubset<T, HolidayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Holiday.
     * @param {HolidayUpsertArgs} args - Arguments to update or create a Holiday.
     * @example
     * // Update or create a Holiday
     * const holiday = await prisma.holiday.upsert({
     *   create: {
     *     // ... data to create a Holiday
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holiday we want to update
     *   }
     * })
     */
    upsert<T extends HolidayUpsertArgs>(args: SelectSubset<T, HolidayUpsertArgs<ExtArgs>>): Prisma__HolidayClient<$Result.GetResult<Prisma.$HolidayPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Holidays.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidayCountArgs} args - Arguments to filter Holidays to count.
     * @example
     * // Count the number of Holidays
     * const count = await prisma.holiday.count({
     *   where: {
     *     // ... the filter for the Holidays we want to count
     *   }
     * })
    **/
    count<T extends HolidayCountArgs>(
      args?: Subset<T, HolidayCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HolidayCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Holiday.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidayAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HolidayAggregateArgs>(args: Subset<T, HolidayAggregateArgs>): Prisma.PrismaPromise<GetHolidayAggregateType<T>>

    /**
     * Group by Holiday.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HolidayGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HolidayGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HolidayGroupByArgs['orderBy'] }
        : { orderBy?: HolidayGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HolidayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHolidayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Holiday model
   */
  readonly fields: HolidayFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Holiday.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HolidayClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Holiday model
   */ 
  interface HolidayFieldRefs {
    readonly id: FieldRef<"Holiday", 'String'>
    readonly name: FieldRef<"Holiday", 'String'>
    readonly date: FieldRef<"Holiday", 'DateTime'>
    readonly description: FieldRef<"Holiday", 'String'>
    readonly isRecurring: FieldRef<"Holiday", 'Boolean'>
    readonly isActive: FieldRef<"Holiday", 'Boolean'>
    readonly createdAt: FieldRef<"Holiday", 'DateTime'>
    readonly updatedAt: FieldRef<"Holiday", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Holiday findUnique
   */
  export type HolidayFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * Filter, which Holiday to fetch.
     */
    where: HolidayWhereUniqueInput
  }

  /**
   * Holiday findUniqueOrThrow
   */
  export type HolidayFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * Filter, which Holiday to fetch.
     */
    where: HolidayWhereUniqueInput
  }

  /**
   * Holiday findFirst
   */
  export type HolidayFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * Filter, which Holiday to fetch.
     */
    where?: HolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holidays to fetch.
     */
    orderBy?: HolidayOrderByWithRelationInput | HolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holidays.
     */
    cursor?: HolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holidays.
     */
    distinct?: HolidayScalarFieldEnum | HolidayScalarFieldEnum[]
  }

  /**
   * Holiday findFirstOrThrow
   */
  export type HolidayFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * Filter, which Holiday to fetch.
     */
    where?: HolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holidays to fetch.
     */
    orderBy?: HolidayOrderByWithRelationInput | HolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holidays.
     */
    cursor?: HolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holidays.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holidays.
     */
    distinct?: HolidayScalarFieldEnum | HolidayScalarFieldEnum[]
  }

  /**
   * Holiday findMany
   */
  export type HolidayFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * Filter, which Holidays to fetch.
     */
    where?: HolidayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holidays to fetch.
     */
    orderBy?: HolidayOrderByWithRelationInput | HolidayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Holidays.
     */
    cursor?: HolidayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holidays from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holidays.
     */
    skip?: number
    distinct?: HolidayScalarFieldEnum | HolidayScalarFieldEnum[]
  }

  /**
   * Holiday create
   */
  export type HolidayCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * The data needed to create a Holiday.
     */
    data: XOR<HolidayCreateInput, HolidayUncheckedCreateInput>
  }

  /**
   * Holiday createMany
   */
  export type HolidayCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Holidays.
     */
    data: HolidayCreateManyInput | HolidayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Holiday createManyAndReturn
   */
  export type HolidayCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Holidays.
     */
    data: HolidayCreateManyInput | HolidayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Holiday update
   */
  export type HolidayUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * The data needed to update a Holiday.
     */
    data: XOR<HolidayUpdateInput, HolidayUncheckedUpdateInput>
    /**
     * Choose, which Holiday to update.
     */
    where: HolidayWhereUniqueInput
  }

  /**
   * Holiday updateMany
   */
  export type HolidayUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Holidays.
     */
    data: XOR<HolidayUpdateManyMutationInput, HolidayUncheckedUpdateManyInput>
    /**
     * Filter which Holidays to update
     */
    where?: HolidayWhereInput
  }

  /**
   * Holiday upsert
   */
  export type HolidayUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * The filter to search for the Holiday to update in case it exists.
     */
    where: HolidayWhereUniqueInput
    /**
     * In case the Holiday found by the `where` argument doesn't exist, create a new Holiday with this data.
     */
    create: XOR<HolidayCreateInput, HolidayUncheckedCreateInput>
    /**
     * In case the Holiday was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HolidayUpdateInput, HolidayUncheckedUpdateInput>
  }

  /**
   * Holiday delete
   */
  export type HolidayDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
    /**
     * Filter which Holiday to delete.
     */
    where: HolidayWhereUniqueInput
  }

  /**
   * Holiday deleteMany
   */
  export type HolidayDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holidays to delete
     */
    where?: HolidayWhereInput
  }

  /**
   * Holiday without action
   */
  export type HolidayDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holiday
     */
    select?: HolidaySelect<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    id: string | null
    companyName: string | null
    logoUrl: string | null
    address: string | null
    contactEmail: string | null
    contactPhone: string | null
    timezone: string | null
    currency: string | null
    dateFormat: string | null
    timeFormat: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingMaxAggregateOutputType = {
    id: string | null
    companyName: string | null
    logoUrl: string | null
    address: string | null
    contactEmail: string | null
    contactPhone: string | null
    timezone: string | null
    currency: string | null
    dateFormat: string | null
    timeFormat: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingCountAggregateOutputType = {
    id: number
    companyName: number
    logoUrl: number
    address: number
    contactEmail: number
    contactPhone: number
    timezone: number
    currency: number
    dateFormat: number
    timeFormat: number
    language: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    id?: true
    companyName?: true
    logoUrl?: true
    address?: true
    contactEmail?: true
    contactPhone?: true
    timezone?: true
    currency?: true
    dateFormat?: true
    timeFormat?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingMaxAggregateInputType = {
    id?: true
    companyName?: true
    logoUrl?: true
    address?: true
    contactEmail?: true
    contactPhone?: true
    timezone?: true
    currency?: true
    dateFormat?: true
    timeFormat?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingCountAggregateInputType = {
    id?: true
    companyName?: true
    logoUrl?: true
    address?: true
    contactEmail?: true
    contactPhone?: true
    timezone?: true
    currency?: true
    dateFormat?: true
    timeFormat?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    id: string
    companyName: string
    logoUrl: string | null
    address: string | null
    contactEmail: string | null
    contactPhone: string | null
    timezone: string
    currency: string
    dateFormat: string
    timeFormat: string
    language: string
    createdAt: Date
    updatedAt: Date
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    logoUrl?: boolean
    address?: boolean
    contactEmail?: boolean
    contactPhone?: boolean
    timezone?: boolean
    currency?: boolean
    dateFormat?: boolean
    timeFormat?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyName?: boolean
    logoUrl?: boolean
    address?: boolean
    contactEmail?: boolean
    contactPhone?: boolean
    timezone?: boolean
    currency?: boolean
    dateFormat?: boolean
    timeFormat?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    id?: boolean
    companyName?: boolean
    logoUrl?: boolean
    address?: boolean
    contactEmail?: boolean
    contactPhone?: boolean
    timezone?: boolean
    currency?: boolean
    dateFormat?: boolean
    timeFormat?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyName: string
      logoUrl: string | null
      address: string | null
      contactEmail: string | null
      contactPhone: string | null
      timezone: string
      currency: string
      dateFormat: string
      timeFormat: string
      language: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingWithIdOnly = await prisma.setting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingWithIdOnly = await prisma.setting.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Setting model
   */ 
  interface SettingFieldRefs {
    readonly id: FieldRef<"Setting", 'String'>
    readonly companyName: FieldRef<"Setting", 'String'>
    readonly logoUrl: FieldRef<"Setting", 'String'>
    readonly address: FieldRef<"Setting", 'String'>
    readonly contactEmail: FieldRef<"Setting", 'String'>
    readonly contactPhone: FieldRef<"Setting", 'String'>
    readonly timezone: FieldRef<"Setting", 'String'>
    readonly currency: FieldRef<"Setting", 'String'>
    readonly dateFormat: FieldRef<"Setting", 'String'>
    readonly timeFormat: FieldRef<"Setting", 'String'>
    readonly language: FieldRef<"Setting", 'String'>
    readonly createdAt: FieldRef<"Setting", 'DateTime'>
    readonly updatedAt: FieldRef<"Setting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    leaveId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    isRead: boolean | null
    leaveId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    type: number
    isRead: number
    leaveId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    leaveId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    leaveId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    isRead?: true
    leaveId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    type: string
    isRead: boolean
    leaveId: string | null
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    leaveId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    leaveId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    isRead?: boolean
    leaveId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      type: string
      isRead: boolean
      leaveId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly leaveId: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: $Enums.AuditAction | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: $Enums.AuditAction | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    entityType: number
    entityId: number
    oldValues: number
    newValues: number
    ipAddress: number
    userAgent: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    entityType?: true
    entityId?: true
    oldValues?: true
    newValues?: true
    ipAddress?: true
    userAgent?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    oldValues: JsonValue | null
    newValues: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValues?: boolean
    newValues?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    timestamp?: boolean
  }

  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: $Enums.AuditAction
      entityType: string
      entityId: string
      oldValues: Prisma.JsonValue | null
      newValues: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'AuditAction'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly oldValues: FieldRef<"AuditLog", 'Json'>
    readonly newValues: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    auth0Id: 'auth0Id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    employeeId: 'employeeId',
    role: 'role',
    managerId: 'managerId',
    hrId: 'hrId',
    departmentId: 'departmentId',
    isActive: 'isActive',
    joinDate: 'joinDate',
    profileImage: 'profileImage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    headId: 'headId',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const LeavePolicyScalarFieldEnum: {
    id: 'id',
    leaveType: 'leaveType',
    annualQuota: 'annualQuota',
    maxConsecutiveDays: 'maxConsecutiveDays',
    minDaysNotice: 'minDaysNotice',
    requiresApproval: 'requiresApproval',
    requiresDocument: 'requiresDocument',
    carryForwardAllowed: 'carryForwardAllowed',
    maxCarryForward: 'maxCarryForward',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeavePolicyScalarFieldEnum = (typeof LeavePolicyScalarFieldEnum)[keyof typeof LeavePolicyScalarFieldEnum]


  export const LeaveScalarFieldEnum: {
    id: 'id',
    requesterId: 'requesterId',
    approverId: 'approverId',
    leavePolicyId: 'leavePolicyId',
    leaveType: 'leaveType',
    startDate: 'startDate',
    endDate: 'endDate',
    totalDays: 'totalDays',
    reason: 'reason',
    status: 'status',
    appliedDate: 'appliedDate',
    approvedDate: 'approvedDate',
    rejectionReason: 'rejectionReason',
    attachments: 'attachments',
    isHalfDay: 'isHalfDay',
    emergencyLeave: 'emergencyLeave',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastReminderSent: 'lastReminderSent',
    isLOP: 'isLOP'
  };

  export type LeaveScalarFieldEnum = (typeof LeaveScalarFieldEnum)[keyof typeof LeaveScalarFieldEnum]


  export const LeaveDayStatusScalarFieldEnum: {
    id: 'id',
    leaveId: 'leaveId',
    date: 'date',
    status: 'status',
    reason: 'reason'
  };

  export type LeaveDayStatusScalarFieldEnum = (typeof LeaveDayStatusScalarFieldEnum)[keyof typeof LeaveDayStatusScalarFieldEnum]


  export const LeaveBalanceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    leavePolicyId: 'leavePolicyId',
    year: 'year',
    totalQuota: 'totalQuota',
    usedDays: 'usedDays',
    pendingDays: 'pendingDays',
    availableDays: 'availableDays',
    carryForward: 'carryForward',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LeaveBalanceScalarFieldEnum = (typeof LeaveBalanceScalarFieldEnum)[keyof typeof LeaveBalanceScalarFieldEnum]


  export const HolidayScalarFieldEnum: {
    id: 'id',
    name: 'name',
    date: 'date',
    description: 'description',
    isRecurring: 'isRecurring',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HolidayScalarFieldEnum = (typeof HolidayScalarFieldEnum)[keyof typeof HolidayScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    id: 'id',
    companyName: 'companyName',
    logoUrl: 'logoUrl',
    address: 'address',
    contactEmail: 'contactEmail',
    contactPhone: 'contactPhone',
    timezone: 'timezone',
    currency: 'currency',
    dateFormat: 'dateFormat',
    timeFormat: 'timeFormat',
    language: 'language',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    leaveId: 'leaveId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    oldValues: 'oldValues',
    newValues: 'newValues',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'LeaveType'
   */
  export type EnumLeaveTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveType'>
    


  /**
   * Reference to a field of type 'LeaveType[]'
   */
  export type ListEnumLeaveTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'LeaveStatus'
   */
  export type EnumLeaveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveStatus'>
    


  /**
   * Reference to a field of type 'LeaveStatus[]'
   */
  export type ListEnumLeaveStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeaveStatus[]'>
    


  /**
   * Reference to a field of type 'AuditAction'
   */
  export type EnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction'>
    


  /**
   * Reference to a field of type 'AuditAction[]'
   */
  export type ListEnumAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuditAction[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    auth0Id?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    employeeId?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    managerId?: StringNullableFilter<"User"> | string | null
    hrId?: StringNullableFilter<"User"> | string | null
    departmentId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    joinDate?: DateTimeFilter<"User"> | Date | string
    profileImage?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    manager?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    employees?: UserListRelationFilter
    hr?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    hrEmployees?: UserListRelationFilter
    department?: XOR<DepartmentNullableRelationFilter, DepartmentWhereInput> | null
    leaveRequests?: LeaveListRelationFilter
    approvedLeaves?: LeaveListRelationFilter
    leaveBalances?: LeaveBalanceListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    auth0Id?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    managerId?: SortOrderInput | SortOrder
    hrId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    joinDate?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    manager?: UserOrderByWithRelationInput
    employees?: UserOrderByRelationAggregateInput
    hr?: UserOrderByWithRelationInput
    hrEmployees?: UserOrderByRelationAggregateInput
    department?: DepartmentOrderByWithRelationInput
    leaveRequests?: LeaveOrderByRelationAggregateInput
    approvedLeaves?: LeaveOrderByRelationAggregateInput
    leaveBalances?: LeaveBalanceOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    auth0Id?: string
    email?: string
    employeeId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    managerId?: StringNullableFilter<"User"> | string | null
    hrId?: StringNullableFilter<"User"> | string | null
    departmentId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    joinDate?: DateTimeFilter<"User"> | Date | string
    profileImage?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    manager?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    employees?: UserListRelationFilter
    hr?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    hrEmployees?: UserListRelationFilter
    department?: XOR<DepartmentNullableRelationFilter, DepartmentWhereInput> | null
    leaveRequests?: LeaveListRelationFilter
    approvedLeaves?: LeaveListRelationFilter
    leaveBalances?: LeaveBalanceListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "username" | "auth0Id" | "email" | "employeeId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    auth0Id?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    managerId?: SortOrderInput | SortOrder
    hrId?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    joinDate?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    auth0Id?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    employeeId?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    managerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    hrId?: StringNullableWithAggregatesFilter<"User"> | string | null
    departmentId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    joinDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    profileImage?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    description?: StringNullableFilter<"Department"> | string | null
    headId?: StringNullableFilter<"Department"> | string | null
    isActive?: BoolFilter<"Department"> | boolean
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    users?: UserListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    headId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    description?: StringNullableFilter<"Department"> | string | null
    headId?: StringNullableFilter<"Department"> | string | null
    isActive?: BoolFilter<"Department"> | boolean
    createdAt?: DateTimeFilter<"Department"> | Date | string
    updatedAt?: DateTimeFilter<"Department"> | Date | string
    users?: UserListRelationFilter
  }, "id" | "name">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    headId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
    description?: StringNullableWithAggregatesFilter<"Department"> | string | null
    headId?: StringNullableWithAggregatesFilter<"Department"> | string | null
    isActive?: BoolWithAggregatesFilter<"Department"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Department"> | Date | string
  }

  export type LeavePolicyWhereInput = {
    AND?: LeavePolicyWhereInput | LeavePolicyWhereInput[]
    OR?: LeavePolicyWhereInput[]
    NOT?: LeavePolicyWhereInput | LeavePolicyWhereInput[]
    id?: StringFilter<"LeavePolicy"> | string
    leaveType?: EnumLeaveTypeFilter<"LeavePolicy"> | $Enums.LeaveType
    annualQuota?: IntFilter<"LeavePolicy"> | number
    maxConsecutiveDays?: IntNullableFilter<"LeavePolicy"> | number | null
    minDaysNotice?: IntFilter<"LeavePolicy"> | number
    requiresApproval?: BoolFilter<"LeavePolicy"> | boolean
    requiresDocument?: BoolFilter<"LeavePolicy"> | boolean
    carryForwardAllowed?: BoolFilter<"LeavePolicy"> | boolean
    maxCarryForward?: IntNullableFilter<"LeavePolicy"> | number | null
    isActive?: BoolFilter<"LeavePolicy"> | boolean
    createdAt?: DateTimeFilter<"LeavePolicy"> | Date | string
    updatedAt?: DateTimeFilter<"LeavePolicy"> | Date | string
    leaves?: LeaveListRelationFilter
    leaveBalances?: LeaveBalanceListRelationFilter
  }

  export type LeavePolicyOrderByWithRelationInput = {
    id?: SortOrder
    leaveType?: SortOrder
    annualQuota?: SortOrder
    maxConsecutiveDays?: SortOrderInput | SortOrder
    minDaysNotice?: SortOrder
    requiresApproval?: SortOrder
    requiresDocument?: SortOrder
    carryForwardAllowed?: SortOrder
    maxCarryForward?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    leaves?: LeaveOrderByRelationAggregateInput
    leaveBalances?: LeaveBalanceOrderByRelationAggregateInput
  }

  export type LeavePolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    leaveType?: $Enums.LeaveType
    AND?: LeavePolicyWhereInput | LeavePolicyWhereInput[]
    OR?: LeavePolicyWhereInput[]
    NOT?: LeavePolicyWhereInput | LeavePolicyWhereInput[]
    annualQuota?: IntFilter<"LeavePolicy"> | number
    maxConsecutiveDays?: IntNullableFilter<"LeavePolicy"> | number | null
    minDaysNotice?: IntFilter<"LeavePolicy"> | number
    requiresApproval?: BoolFilter<"LeavePolicy"> | boolean
    requiresDocument?: BoolFilter<"LeavePolicy"> | boolean
    carryForwardAllowed?: BoolFilter<"LeavePolicy"> | boolean
    maxCarryForward?: IntNullableFilter<"LeavePolicy"> | number | null
    isActive?: BoolFilter<"LeavePolicy"> | boolean
    createdAt?: DateTimeFilter<"LeavePolicy"> | Date | string
    updatedAt?: DateTimeFilter<"LeavePolicy"> | Date | string
    leaves?: LeaveListRelationFilter
    leaveBalances?: LeaveBalanceListRelationFilter
  }, "id" | "leaveType">

  export type LeavePolicyOrderByWithAggregationInput = {
    id?: SortOrder
    leaveType?: SortOrder
    annualQuota?: SortOrder
    maxConsecutiveDays?: SortOrderInput | SortOrder
    minDaysNotice?: SortOrder
    requiresApproval?: SortOrder
    requiresDocument?: SortOrder
    carryForwardAllowed?: SortOrder
    maxCarryForward?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeavePolicyCountOrderByAggregateInput
    _avg?: LeavePolicyAvgOrderByAggregateInput
    _max?: LeavePolicyMaxOrderByAggregateInput
    _min?: LeavePolicyMinOrderByAggregateInput
    _sum?: LeavePolicySumOrderByAggregateInput
  }

  export type LeavePolicyScalarWhereWithAggregatesInput = {
    AND?: LeavePolicyScalarWhereWithAggregatesInput | LeavePolicyScalarWhereWithAggregatesInput[]
    OR?: LeavePolicyScalarWhereWithAggregatesInput[]
    NOT?: LeavePolicyScalarWhereWithAggregatesInput | LeavePolicyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeavePolicy"> | string
    leaveType?: EnumLeaveTypeWithAggregatesFilter<"LeavePolicy"> | $Enums.LeaveType
    annualQuota?: IntWithAggregatesFilter<"LeavePolicy"> | number
    maxConsecutiveDays?: IntNullableWithAggregatesFilter<"LeavePolicy"> | number | null
    minDaysNotice?: IntWithAggregatesFilter<"LeavePolicy"> | number
    requiresApproval?: BoolWithAggregatesFilter<"LeavePolicy"> | boolean
    requiresDocument?: BoolWithAggregatesFilter<"LeavePolicy"> | boolean
    carryForwardAllowed?: BoolWithAggregatesFilter<"LeavePolicy"> | boolean
    maxCarryForward?: IntNullableWithAggregatesFilter<"LeavePolicy"> | number | null
    isActive?: BoolWithAggregatesFilter<"LeavePolicy"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"LeavePolicy"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LeavePolicy"> | Date | string
  }

  export type LeaveWhereInput = {
    AND?: LeaveWhereInput | LeaveWhereInput[]
    OR?: LeaveWhereInput[]
    NOT?: LeaveWhereInput | LeaveWhereInput[]
    id?: StringFilter<"Leave"> | string
    requesterId?: StringFilter<"Leave"> | string
    approverId?: StringNullableFilter<"Leave"> | string | null
    leavePolicyId?: StringNullableFilter<"Leave"> | string | null
    leaveType?: EnumLeaveTypeFilter<"Leave"> | $Enums.LeaveType
    startDate?: DateTimeFilter<"Leave"> | Date | string
    endDate?: DateTimeFilter<"Leave"> | Date | string
    totalDays?: FloatFilter<"Leave"> | number
    reason?: StringFilter<"Leave"> | string
    status?: EnumLeaveStatusFilter<"Leave"> | $Enums.LeaveStatus
    appliedDate?: DateTimeFilter<"Leave"> | Date | string
    approvedDate?: DateTimeNullableFilter<"Leave"> | Date | string | null
    rejectionReason?: StringNullableFilter<"Leave"> | string | null
    attachments?: StringNullableListFilter<"Leave">
    isHalfDay?: BoolFilter<"Leave"> | boolean
    emergencyLeave?: BoolFilter<"Leave"> | boolean
    createdAt?: DateTimeFilter<"Leave"> | Date | string
    updatedAt?: DateTimeFilter<"Leave"> | Date | string
    lastReminderSent?: DateTimeNullableFilter<"Leave"> | Date | string | null
    isLOP?: BoolFilter<"Leave"> | boolean
    leavePolicy?: XOR<LeavePolicyNullableRelationFilter, LeavePolicyWhereInput> | null
    dayStatuses?: LeaveDayStatusListRelationFilter
    requester?: XOR<UserRelationFilter, UserWhereInput>
    approver?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type LeaveOrderByWithRelationInput = {
    id?: SortOrder
    requesterId?: SortOrder
    approverId?: SortOrderInput | SortOrder
    leavePolicyId?: SortOrderInput | SortOrder
    leaveType?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    approvedDate?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    attachments?: SortOrder
    isHalfDay?: SortOrder
    emergencyLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReminderSent?: SortOrderInput | SortOrder
    isLOP?: SortOrder
    leavePolicy?: LeavePolicyOrderByWithRelationInput
    dayStatuses?: LeaveDayStatusOrderByRelationAggregateInput
    requester?: UserOrderByWithRelationInput
    approver?: UserOrderByWithRelationInput
  }

  export type LeaveWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LeaveWhereInput | LeaveWhereInput[]
    OR?: LeaveWhereInput[]
    NOT?: LeaveWhereInput | LeaveWhereInput[]
    requesterId?: StringFilter<"Leave"> | string
    approverId?: StringNullableFilter<"Leave"> | string | null
    leavePolicyId?: StringNullableFilter<"Leave"> | string | null
    leaveType?: EnumLeaveTypeFilter<"Leave"> | $Enums.LeaveType
    startDate?: DateTimeFilter<"Leave"> | Date | string
    endDate?: DateTimeFilter<"Leave"> | Date | string
    totalDays?: FloatFilter<"Leave"> | number
    reason?: StringFilter<"Leave"> | string
    status?: EnumLeaveStatusFilter<"Leave"> | $Enums.LeaveStatus
    appliedDate?: DateTimeFilter<"Leave"> | Date | string
    approvedDate?: DateTimeNullableFilter<"Leave"> | Date | string | null
    rejectionReason?: StringNullableFilter<"Leave"> | string | null
    attachments?: StringNullableListFilter<"Leave">
    isHalfDay?: BoolFilter<"Leave"> | boolean
    emergencyLeave?: BoolFilter<"Leave"> | boolean
    createdAt?: DateTimeFilter<"Leave"> | Date | string
    updatedAt?: DateTimeFilter<"Leave"> | Date | string
    lastReminderSent?: DateTimeNullableFilter<"Leave"> | Date | string | null
    isLOP?: BoolFilter<"Leave"> | boolean
    leavePolicy?: XOR<LeavePolicyNullableRelationFilter, LeavePolicyWhereInput> | null
    dayStatuses?: LeaveDayStatusListRelationFilter
    requester?: XOR<UserRelationFilter, UserWhereInput>
    approver?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type LeaveOrderByWithAggregationInput = {
    id?: SortOrder
    requesterId?: SortOrder
    approverId?: SortOrderInput | SortOrder
    leavePolicyId?: SortOrderInput | SortOrder
    leaveType?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    approvedDate?: SortOrderInput | SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    attachments?: SortOrder
    isHalfDay?: SortOrder
    emergencyLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReminderSent?: SortOrderInput | SortOrder
    isLOP?: SortOrder
    _count?: LeaveCountOrderByAggregateInput
    _avg?: LeaveAvgOrderByAggregateInput
    _max?: LeaveMaxOrderByAggregateInput
    _min?: LeaveMinOrderByAggregateInput
    _sum?: LeaveSumOrderByAggregateInput
  }

  export type LeaveScalarWhereWithAggregatesInput = {
    AND?: LeaveScalarWhereWithAggregatesInput | LeaveScalarWhereWithAggregatesInput[]
    OR?: LeaveScalarWhereWithAggregatesInput[]
    NOT?: LeaveScalarWhereWithAggregatesInput | LeaveScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Leave"> | string
    requesterId?: StringWithAggregatesFilter<"Leave"> | string
    approverId?: StringNullableWithAggregatesFilter<"Leave"> | string | null
    leavePolicyId?: StringNullableWithAggregatesFilter<"Leave"> | string | null
    leaveType?: EnumLeaveTypeWithAggregatesFilter<"Leave"> | $Enums.LeaveType
    startDate?: DateTimeWithAggregatesFilter<"Leave"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Leave"> | Date | string
    totalDays?: FloatWithAggregatesFilter<"Leave"> | number
    reason?: StringWithAggregatesFilter<"Leave"> | string
    status?: EnumLeaveStatusWithAggregatesFilter<"Leave"> | $Enums.LeaveStatus
    appliedDate?: DateTimeWithAggregatesFilter<"Leave"> | Date | string
    approvedDate?: DateTimeNullableWithAggregatesFilter<"Leave"> | Date | string | null
    rejectionReason?: StringNullableWithAggregatesFilter<"Leave"> | string | null
    attachments?: StringNullableListFilter<"Leave">
    isHalfDay?: BoolWithAggregatesFilter<"Leave"> | boolean
    emergencyLeave?: BoolWithAggregatesFilter<"Leave"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Leave"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Leave"> | Date | string
    lastReminderSent?: DateTimeNullableWithAggregatesFilter<"Leave"> | Date | string | null
    isLOP?: BoolWithAggregatesFilter<"Leave"> | boolean
  }

  export type LeaveDayStatusWhereInput = {
    AND?: LeaveDayStatusWhereInput | LeaveDayStatusWhereInput[]
    OR?: LeaveDayStatusWhereInput[]
    NOT?: LeaveDayStatusWhereInput | LeaveDayStatusWhereInput[]
    id?: StringFilter<"LeaveDayStatus"> | string
    leaveId?: StringFilter<"LeaveDayStatus"> | string
    date?: DateTimeFilter<"LeaveDayStatus"> | Date | string
    status?: EnumLeaveStatusFilter<"LeaveDayStatus"> | $Enums.LeaveStatus
    reason?: StringNullableFilter<"LeaveDayStatus"> | string | null
    leave?: XOR<LeaveRelationFilter, LeaveWhereInput>
  }

  export type LeaveDayStatusOrderByWithRelationInput = {
    id?: SortOrder
    leaveId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    leave?: LeaveOrderByWithRelationInput
  }

  export type LeaveDayStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    leaveId_date?: LeaveDayStatusLeaveIdDateCompoundUniqueInput
    AND?: LeaveDayStatusWhereInput | LeaveDayStatusWhereInput[]
    OR?: LeaveDayStatusWhereInput[]
    NOT?: LeaveDayStatusWhereInput | LeaveDayStatusWhereInput[]
    leaveId?: StringFilter<"LeaveDayStatus"> | string
    date?: DateTimeFilter<"LeaveDayStatus"> | Date | string
    status?: EnumLeaveStatusFilter<"LeaveDayStatus"> | $Enums.LeaveStatus
    reason?: StringNullableFilter<"LeaveDayStatus"> | string | null
    leave?: XOR<LeaveRelationFilter, LeaveWhereInput>
  }, "id" | "leaveId_date">

  export type LeaveDayStatusOrderByWithAggregationInput = {
    id?: SortOrder
    leaveId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    _count?: LeaveDayStatusCountOrderByAggregateInput
    _max?: LeaveDayStatusMaxOrderByAggregateInput
    _min?: LeaveDayStatusMinOrderByAggregateInput
  }

  export type LeaveDayStatusScalarWhereWithAggregatesInput = {
    AND?: LeaveDayStatusScalarWhereWithAggregatesInput | LeaveDayStatusScalarWhereWithAggregatesInput[]
    OR?: LeaveDayStatusScalarWhereWithAggregatesInput[]
    NOT?: LeaveDayStatusScalarWhereWithAggregatesInput | LeaveDayStatusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveDayStatus"> | string
    leaveId?: StringWithAggregatesFilter<"LeaveDayStatus"> | string
    date?: DateTimeWithAggregatesFilter<"LeaveDayStatus"> | Date | string
    status?: EnumLeaveStatusWithAggregatesFilter<"LeaveDayStatus"> | $Enums.LeaveStatus
    reason?: StringNullableWithAggregatesFilter<"LeaveDayStatus"> | string | null
  }

  export type LeaveBalanceWhereInput = {
    AND?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    OR?: LeaveBalanceWhereInput[]
    NOT?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    id?: StringFilter<"LeaveBalance"> | string
    userId?: StringFilter<"LeaveBalance"> | string
    leavePolicyId?: StringFilter<"LeaveBalance"> | string
    year?: IntFilter<"LeaveBalance"> | number
    totalQuota?: IntFilter<"LeaveBalance"> | number
    usedDays?: FloatFilter<"LeaveBalance"> | number
    pendingDays?: FloatFilter<"LeaveBalance"> | number
    availableDays?: FloatFilter<"LeaveBalance"> | number
    carryForward?: FloatFilter<"LeaveBalance"> | number
    createdAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    leavePolicy?: XOR<LeavePolicyRelationFilter, LeavePolicyWhereInput>
  }

  export type LeaveBalanceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    leavePolicyId?: SortOrder
    year?: SortOrder
    totalQuota?: SortOrder
    usedDays?: SortOrder
    pendingDays?: SortOrder
    availableDays?: SortOrder
    carryForward?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    leavePolicy?: LeavePolicyOrderByWithRelationInput
  }

  export type LeaveBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_leavePolicyId_year?: LeaveBalanceUserIdLeavePolicyIdYearCompoundUniqueInput
    AND?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    OR?: LeaveBalanceWhereInput[]
    NOT?: LeaveBalanceWhereInput | LeaveBalanceWhereInput[]
    userId?: StringFilter<"LeaveBalance"> | string
    leavePolicyId?: StringFilter<"LeaveBalance"> | string
    year?: IntFilter<"LeaveBalance"> | number
    totalQuota?: IntFilter<"LeaveBalance"> | number
    usedDays?: FloatFilter<"LeaveBalance"> | number
    pendingDays?: FloatFilter<"LeaveBalance"> | number
    availableDays?: FloatFilter<"LeaveBalance"> | number
    carryForward?: FloatFilter<"LeaveBalance"> | number
    createdAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    leavePolicy?: XOR<LeavePolicyRelationFilter, LeavePolicyWhereInput>
  }, "id" | "userId_leavePolicyId_year">

  export type LeaveBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    leavePolicyId?: SortOrder
    year?: SortOrder
    totalQuota?: SortOrder
    usedDays?: SortOrder
    pendingDays?: SortOrder
    availableDays?: SortOrder
    carryForward?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LeaveBalanceCountOrderByAggregateInput
    _avg?: LeaveBalanceAvgOrderByAggregateInput
    _max?: LeaveBalanceMaxOrderByAggregateInput
    _min?: LeaveBalanceMinOrderByAggregateInput
    _sum?: LeaveBalanceSumOrderByAggregateInput
  }

  export type LeaveBalanceScalarWhereWithAggregatesInput = {
    AND?: LeaveBalanceScalarWhereWithAggregatesInput | LeaveBalanceScalarWhereWithAggregatesInput[]
    OR?: LeaveBalanceScalarWhereWithAggregatesInput[]
    NOT?: LeaveBalanceScalarWhereWithAggregatesInput | LeaveBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LeaveBalance"> | string
    userId?: StringWithAggregatesFilter<"LeaveBalance"> | string
    leavePolicyId?: StringWithAggregatesFilter<"LeaveBalance"> | string
    year?: IntWithAggregatesFilter<"LeaveBalance"> | number
    totalQuota?: IntWithAggregatesFilter<"LeaveBalance"> | number
    usedDays?: FloatWithAggregatesFilter<"LeaveBalance"> | number
    pendingDays?: FloatWithAggregatesFilter<"LeaveBalance"> | number
    availableDays?: FloatWithAggregatesFilter<"LeaveBalance"> | number
    carryForward?: FloatWithAggregatesFilter<"LeaveBalance"> | number
    createdAt?: DateTimeWithAggregatesFilter<"LeaveBalance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LeaveBalance"> | Date | string
  }

  export type HolidayWhereInput = {
    AND?: HolidayWhereInput | HolidayWhereInput[]
    OR?: HolidayWhereInput[]
    NOT?: HolidayWhereInput | HolidayWhereInput[]
    id?: StringFilter<"Holiday"> | string
    name?: StringFilter<"Holiday"> | string
    date?: DateTimeFilter<"Holiday"> | Date | string
    description?: StringNullableFilter<"Holiday"> | string | null
    isRecurring?: BoolFilter<"Holiday"> | boolean
    isActive?: BoolFilter<"Holiday"> | boolean
    createdAt?: DateTimeFilter<"Holiday"> | Date | string
    updatedAt?: DateTimeFilter<"Holiday"> | Date | string
  }

  export type HolidayOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    isRecurring?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HolidayWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: HolidayWhereInput | HolidayWhereInput[]
    OR?: HolidayWhereInput[]
    NOT?: HolidayWhereInput | HolidayWhereInput[]
    date?: DateTimeFilter<"Holiday"> | Date | string
    description?: StringNullableFilter<"Holiday"> | string | null
    isRecurring?: BoolFilter<"Holiday"> | boolean
    isActive?: BoolFilter<"Holiday"> | boolean
    createdAt?: DateTimeFilter<"Holiday"> | Date | string
    updatedAt?: DateTimeFilter<"Holiday"> | Date | string
  }, "id" | "name">

  export type HolidayOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrderInput | SortOrder
    isRecurring?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HolidayCountOrderByAggregateInput
    _max?: HolidayMaxOrderByAggregateInput
    _min?: HolidayMinOrderByAggregateInput
  }

  export type HolidayScalarWhereWithAggregatesInput = {
    AND?: HolidayScalarWhereWithAggregatesInput | HolidayScalarWhereWithAggregatesInput[]
    OR?: HolidayScalarWhereWithAggregatesInput[]
    NOT?: HolidayScalarWhereWithAggregatesInput | HolidayScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Holiday"> | string
    name?: StringWithAggregatesFilter<"Holiday"> | string
    date?: DateTimeWithAggregatesFilter<"Holiday"> | Date | string
    description?: StringNullableWithAggregatesFilter<"Holiday"> | string | null
    isRecurring?: BoolWithAggregatesFilter<"Holiday"> | boolean
    isActive?: BoolWithAggregatesFilter<"Holiday"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Holiday"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Holiday"> | Date | string
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    id?: StringFilter<"Setting"> | string
    companyName?: StringFilter<"Setting"> | string
    logoUrl?: StringNullableFilter<"Setting"> | string | null
    address?: StringNullableFilter<"Setting"> | string | null
    contactEmail?: StringNullableFilter<"Setting"> | string | null
    contactPhone?: StringNullableFilter<"Setting"> | string | null
    timezone?: StringFilter<"Setting"> | string
    currency?: StringFilter<"Setting"> | string
    dateFormat?: StringFilter<"Setting"> | string
    timeFormat?: StringFilter<"Setting"> | string
    language?: StringFilter<"Setting"> | string
    createdAt?: DateTimeFilter<"Setting"> | Date | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }

  export type SettingOrderByWithRelationInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    dateFormat?: SortOrder
    timeFormat?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    companyName?: StringFilter<"Setting"> | string
    logoUrl?: StringNullableFilter<"Setting"> | string | null
    address?: StringNullableFilter<"Setting"> | string | null
    contactEmail?: StringNullableFilter<"Setting"> | string | null
    contactPhone?: StringNullableFilter<"Setting"> | string | null
    timezone?: StringFilter<"Setting"> | string
    currency?: StringFilter<"Setting"> | string
    dateFormat?: StringFilter<"Setting"> | string
    timeFormat?: StringFilter<"Setting"> | string
    language?: StringFilter<"Setting"> | string
    createdAt?: DateTimeFilter<"Setting"> | Date | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }, "id">

  export type SettingOrderByWithAggregationInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    contactPhone?: SortOrderInput | SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    dateFormat?: SortOrder
    timeFormat?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Setting"> | string
    companyName?: StringWithAggregatesFilter<"Setting"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Setting"> | string | null
    address?: StringNullableWithAggregatesFilter<"Setting"> | string | null
    contactEmail?: StringNullableWithAggregatesFilter<"Setting"> | string | null
    contactPhone?: StringNullableWithAggregatesFilter<"Setting"> | string | null
    timezone?: StringWithAggregatesFilter<"Setting"> | string
    currency?: StringWithAggregatesFilter<"Setting"> | string
    dateFormat?: StringWithAggregatesFilter<"Setting"> | string
    timeFormat?: StringWithAggregatesFilter<"Setting"> | string
    language?: StringWithAggregatesFilter<"Setting"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    leaveId?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    leaveId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    leaveId?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    leaveId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    leaveId?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrderInput | SortOrder
    newValues?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: EnumAuditActionWithAggregatesFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    oldValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValues?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentCreateInput = {
    id?: string
    name: string
    description?: string | null
    headId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    headId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    headId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    headId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    headId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    headId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    headId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeavePolicyCreateInput = {
    id?: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays?: number | null
    minDaysNotice?: number
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leaves?: LeaveCreateNestedManyWithoutLeavePolicyInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutLeavePolicyInput
  }

  export type LeavePolicyUncheckedCreateInput = {
    id?: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays?: number | null
    minDaysNotice?: number
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leaves?: LeaveUncheckedCreateNestedManyWithoutLeavePolicyInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutLeavePolicyInput
  }

  export type LeavePolicyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaves?: LeaveUpdateManyWithoutLeavePolicyNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutLeavePolicyNestedInput
  }

  export type LeavePolicyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaves?: LeaveUncheckedUpdateManyWithoutLeavePolicyNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutLeavePolicyNestedInput
  }

  export type LeavePolicyCreateManyInput = {
    id?: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays?: number | null
    minDaysNotice?: number
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeavePolicyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeavePolicyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveCreateInput = {
    id?: string
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    leavePolicy?: LeavePolicyCreateNestedOneWithoutLeavesInput
    dayStatuses?: LeaveDayStatusCreateNestedManyWithoutLeaveInput
    requester: UserCreateNestedOneWithoutLeaveRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedLeavesInput
  }

  export type LeaveUncheckedCreateInput = {
    id?: string
    requesterId: string
    approverId?: string | null
    leavePolicyId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    dayStatuses?: LeaveDayStatusUncheckedCreateNestedManyWithoutLeaveInput
  }

  export type LeaveUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    leavePolicy?: LeavePolicyUpdateOneWithoutLeavesNestedInput
    dayStatuses?: LeaveDayStatusUpdateManyWithoutLeaveNestedInput
    requester?: UserUpdateOneRequiredWithoutLeaveRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedLeavesNestedInput
  }

  export type LeaveUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    leavePolicyId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    dayStatuses?: LeaveDayStatusUncheckedUpdateManyWithoutLeaveNestedInput
  }

  export type LeaveCreateManyInput = {
    id?: string
    requesterId: string
    approverId?: string | null
    leavePolicyId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
  }

  export type LeaveUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaveUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    leavePolicyId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaveDayStatusCreateInput = {
    id?: string
    date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
    leave: LeaveCreateNestedOneWithoutDayStatusesInput
  }

  export type LeaveDayStatusUncheckedCreateInput = {
    id?: string
    leaveId: string
    date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
  }

  export type LeaveDayStatusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    leave?: LeaveUpdateOneRequiredWithoutDayStatusesNestedInput
  }

  export type LeaveDayStatusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeaveDayStatusCreateManyInput = {
    id?: string
    leaveId: string
    date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
  }

  export type LeaveDayStatusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeaveDayStatusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeaveBalanceCreateInput = {
    id?: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLeaveBalancesInput
    leavePolicy: LeavePolicyCreateNestedOneWithoutLeaveBalancesInput
  }

  export type LeaveBalanceUncheckedCreateInput = {
    id?: string
    userId: string
    leavePolicyId: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLeaveBalancesNestedInput
    leavePolicy?: LeavePolicyUpdateOneRequiredWithoutLeaveBalancesNestedInput
  }

  export type LeaveBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leavePolicyId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceCreateManyInput = {
    id?: string
    userId: string
    leavePolicyId: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    leavePolicyId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HolidayCreateInput = {
    id?: string
    name: string
    date: Date | string
    description?: string | null
    isRecurring?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HolidayUncheckedCreateInput = {
    id?: string
    name: string
    date: Date | string
    description?: string | null
    isRecurring?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HolidayUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HolidayUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HolidayCreateManyInput = {
    id?: string
    name: string
    date: Date | string
    description?: string | null
    isRecurring?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HolidayUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HolidayUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isRecurring?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateInput = {
    id?: string
    companyName: string
    logoUrl?: string | null
    address?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    timezone: string
    currency: string
    dateFormat: string
    timeFormat: string
    language: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingUncheckedCreateInput = {
    id?: string
    companyName: string
    logoUrl?: string | null
    address?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    timezone: string
    currency: string
    dateFormat: string
    timeFormat: string
    language: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    timeFormat?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    timeFormat?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateManyInput = {
    id?: string
    companyName: string
    logoUrl?: string | null
    address?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    timezone: string
    currency: string
    dateFormat: string
    timeFormat: string
    language: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    timeFormat?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    contactPhone?: NullableStringFieldUpdateOperationsInput | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    currency?: StringFieldUpdateOperationsInput | string
    dateFormat?: StringFieldUpdateOperationsInput | string
    timeFormat?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    leaveId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    leaveId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    leaveId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    leaveId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    leaveId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    leaveId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    leaveId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type DepartmentNullableRelationFilter = {
    is?: DepartmentWhereInput | null
    isNot?: DepartmentWhereInput | null
  }

  export type LeaveListRelationFilter = {
    every?: LeaveWhereInput
    some?: LeaveWhereInput
    none?: LeaveWhereInput
  }

  export type LeaveBalanceListRelationFilter = {
    every?: LeaveBalanceWhereInput
    some?: LeaveBalanceWhereInput
    none?: LeaveBalanceWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaveOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaveBalanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    auth0Id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    managerId?: SortOrder
    hrId?: SortOrder
    departmentId?: SortOrder
    isActive?: SortOrder
    joinDate?: SortOrder
    profileImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    auth0Id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    managerId?: SortOrder
    hrId?: SortOrder
    departmentId?: SortOrder
    isActive?: SortOrder
    joinDate?: SortOrder
    profileImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    auth0Id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    managerId?: SortOrder
    hrId?: SortOrder
    departmentId?: SortOrder
    isActive?: SortOrder
    joinDate?: SortOrder
    profileImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    headId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    headId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    headId?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumLeaveTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeFilter<$PrismaModel> | $Enums.LeaveType
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LeavePolicyCountOrderByAggregateInput = {
    id?: SortOrder
    leaveType?: SortOrder
    annualQuota?: SortOrder
    maxConsecutiveDays?: SortOrder
    minDaysNotice?: SortOrder
    requiresApproval?: SortOrder
    requiresDocument?: SortOrder
    carryForwardAllowed?: SortOrder
    maxCarryForward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeavePolicyAvgOrderByAggregateInput = {
    annualQuota?: SortOrder
    maxConsecutiveDays?: SortOrder
    minDaysNotice?: SortOrder
    maxCarryForward?: SortOrder
  }

  export type LeavePolicyMaxOrderByAggregateInput = {
    id?: SortOrder
    leaveType?: SortOrder
    annualQuota?: SortOrder
    maxConsecutiveDays?: SortOrder
    minDaysNotice?: SortOrder
    requiresApproval?: SortOrder
    requiresDocument?: SortOrder
    carryForwardAllowed?: SortOrder
    maxCarryForward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeavePolicyMinOrderByAggregateInput = {
    id?: SortOrder
    leaveType?: SortOrder
    annualQuota?: SortOrder
    maxConsecutiveDays?: SortOrder
    minDaysNotice?: SortOrder
    requiresApproval?: SortOrder
    requiresDocument?: SortOrder
    carryForwardAllowed?: SortOrder
    maxCarryForward?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeavePolicySumOrderByAggregateInput = {
    annualQuota?: SortOrder
    maxConsecutiveDays?: SortOrder
    minDaysNotice?: SortOrder
    maxCarryForward?: SortOrder
  }

  export type EnumLeaveTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeWithAggregatesFilter<$PrismaModel> | $Enums.LeaveType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveTypeFilter<$PrismaModel>
    _max?: NestedEnumLeaveTypeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumLeaveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusFilter<$PrismaModel> | $Enums.LeaveStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type LeavePolicyNullableRelationFilter = {
    is?: LeavePolicyWhereInput | null
    isNot?: LeavePolicyWhereInput | null
  }

  export type LeaveDayStatusListRelationFilter = {
    every?: LeaveDayStatusWhereInput
    some?: LeaveDayStatusWhereInput
    none?: LeaveDayStatusWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LeaveDayStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaveCountOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    approverId?: SortOrder
    leavePolicyId?: SortOrder
    leaveType?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    approvedDate?: SortOrder
    rejectionReason?: SortOrder
    attachments?: SortOrder
    isHalfDay?: SortOrder
    emergencyLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReminderSent?: SortOrder
    isLOP?: SortOrder
  }

  export type LeaveAvgOrderByAggregateInput = {
    totalDays?: SortOrder
  }

  export type LeaveMaxOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    approverId?: SortOrder
    leavePolicyId?: SortOrder
    leaveType?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    approvedDate?: SortOrder
    rejectionReason?: SortOrder
    isHalfDay?: SortOrder
    emergencyLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReminderSent?: SortOrder
    isLOP?: SortOrder
  }

  export type LeaveMinOrderByAggregateInput = {
    id?: SortOrder
    requesterId?: SortOrder
    approverId?: SortOrder
    leavePolicyId?: SortOrder
    leaveType?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    totalDays?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    appliedDate?: SortOrder
    approvedDate?: SortOrder
    rejectionReason?: SortOrder
    isHalfDay?: SortOrder
    emergencyLeave?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastReminderSent?: SortOrder
    isLOP?: SortOrder
  }

  export type LeaveSumOrderByAggregateInput = {
    totalDays?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumLeaveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type LeaveRelationFilter = {
    is?: LeaveWhereInput
    isNot?: LeaveWhereInput
  }

  export type LeaveDayStatusLeaveIdDateCompoundUniqueInput = {
    leaveId: string
    date: Date | string
  }

  export type LeaveDayStatusCountOrderByAggregateInput = {
    id?: SortOrder
    leaveId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
  }

  export type LeaveDayStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    leaveId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
  }

  export type LeaveDayStatusMinOrderByAggregateInput = {
    id?: SortOrder
    leaveId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
  }

  export type LeavePolicyRelationFilter = {
    is?: LeavePolicyWhereInput
    isNot?: LeavePolicyWhereInput
  }

  export type LeaveBalanceUserIdLeavePolicyIdYearCompoundUniqueInput = {
    userId: string
    leavePolicyId: string
    year: number
  }

  export type LeaveBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leavePolicyId?: SortOrder
    year?: SortOrder
    totalQuota?: SortOrder
    usedDays?: SortOrder
    pendingDays?: SortOrder
    availableDays?: SortOrder
    carryForward?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveBalanceAvgOrderByAggregateInput = {
    year?: SortOrder
    totalQuota?: SortOrder
    usedDays?: SortOrder
    pendingDays?: SortOrder
    availableDays?: SortOrder
    carryForward?: SortOrder
  }

  export type LeaveBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leavePolicyId?: SortOrder
    year?: SortOrder
    totalQuota?: SortOrder
    usedDays?: SortOrder
    pendingDays?: SortOrder
    availableDays?: SortOrder
    carryForward?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    leavePolicyId?: SortOrder
    year?: SortOrder
    totalQuota?: SortOrder
    usedDays?: SortOrder
    pendingDays?: SortOrder
    availableDays?: SortOrder
    carryForward?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LeaveBalanceSumOrderByAggregateInput = {
    year?: SortOrder
    totalQuota?: SortOrder
    usedDays?: SortOrder
    pendingDays?: SortOrder
    availableDays?: SortOrder
    carryForward?: SortOrder
  }

  export type HolidayCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrder
    isRecurring?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HolidayMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrder
    isRecurring?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HolidayMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    date?: SortOrder
    description?: SortOrder
    isRecurring?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingCountOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    dateFormat?: SortOrder
    timeFormat?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    dateFormat?: SortOrder
    timeFormat?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    id?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    contactEmail?: SortOrder
    contactPhone?: SortOrder
    timezone?: SortOrder
    currency?: SortOrder
    dateFormat?: SortOrder
    timeFormat?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    leaveId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    leaveId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    isRead?: SortOrder
    leaveId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    oldValues?: SortOrder
    newValues?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutEmployeesInput = {
    create?: XOR<UserCreateWithoutEmployeesInput, UserUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutManagerInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutHrEmployeesInput = {
    create?: XOR<UserCreateWithoutHrEmployeesInput, UserUncheckedCreateWithoutHrEmployeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHrEmployeesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutHrInput = {
    create?: XOR<UserCreateWithoutHrInput, UserUncheckedCreateWithoutHrInput> | UserCreateWithoutHrInput[] | UserUncheckedCreateWithoutHrInput[]
    connectOrCreate?: UserCreateOrConnectWithoutHrInput | UserCreateOrConnectWithoutHrInput[]
    createMany?: UserCreateManyHrInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DepartmentCreateNestedOneWithoutUsersInput = {
    create?: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutUsersInput
    connect?: DepartmentWhereUniqueInput
  }

  export type LeaveCreateNestedManyWithoutRequesterInput = {
    create?: XOR<LeaveCreateWithoutRequesterInput, LeaveUncheckedCreateWithoutRequesterInput> | LeaveCreateWithoutRequesterInput[] | LeaveUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutRequesterInput | LeaveCreateOrConnectWithoutRequesterInput[]
    createMany?: LeaveCreateManyRequesterInputEnvelope
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
  }

  export type LeaveCreateNestedManyWithoutApproverInput = {
    create?: XOR<LeaveCreateWithoutApproverInput, LeaveUncheckedCreateWithoutApproverInput> | LeaveCreateWithoutApproverInput[] | LeaveUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutApproverInput | LeaveCreateOrConnectWithoutApproverInput[]
    createMany?: LeaveCreateManyApproverInputEnvelope
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
  }

  export type LeaveBalanceCreateNestedManyWithoutUserInput = {
    create?: XOR<LeaveBalanceCreateWithoutUserInput, LeaveBalanceUncheckedCreateWithoutUserInput> | LeaveBalanceCreateWithoutUserInput[] | LeaveBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutUserInput | LeaveBalanceCreateOrConnectWithoutUserInput[]
    createMany?: LeaveBalanceCreateManyUserInputEnvelope
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutManagerInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutHrInput = {
    create?: XOR<UserCreateWithoutHrInput, UserUncheckedCreateWithoutHrInput> | UserCreateWithoutHrInput[] | UserUncheckedCreateWithoutHrInput[]
    connectOrCreate?: UserCreateOrConnectWithoutHrInput | UserCreateOrConnectWithoutHrInput[]
    createMany?: UserCreateManyHrInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type LeaveUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<LeaveCreateWithoutRequesterInput, LeaveUncheckedCreateWithoutRequesterInput> | LeaveCreateWithoutRequesterInput[] | LeaveUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutRequesterInput | LeaveCreateOrConnectWithoutRequesterInput[]
    createMany?: LeaveCreateManyRequesterInputEnvelope
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
  }

  export type LeaveUncheckedCreateNestedManyWithoutApproverInput = {
    create?: XOR<LeaveCreateWithoutApproverInput, LeaveUncheckedCreateWithoutApproverInput> | LeaveCreateWithoutApproverInput[] | LeaveUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutApproverInput | LeaveCreateOrConnectWithoutApproverInput[]
    createMany?: LeaveCreateManyApproverInputEnvelope
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
  }

  export type LeaveBalanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LeaveBalanceCreateWithoutUserInput, LeaveBalanceUncheckedCreateWithoutUserInput> | LeaveBalanceCreateWithoutUserInput[] | LeaveBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutUserInput | LeaveBalanceCreateOrConnectWithoutUserInput[]
    createMany?: LeaveBalanceCreateManyUserInputEnvelope
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutEmployeesNestedInput = {
    create?: XOR<UserCreateWithoutEmployeesInput, UserUncheckedCreateWithoutEmployeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEmployeesInput
    upsert?: UserUpsertWithoutEmployeesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEmployeesInput, UserUpdateWithoutEmployeesInput>, UserUncheckedUpdateWithoutEmployeesInput>
  }

  export type UserUpdateManyWithoutManagerNestedInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutManagerInput | UserUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutManagerInput | UserUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutManagerInput | UserUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUpdateOneWithoutHrEmployeesNestedInput = {
    create?: XOR<UserCreateWithoutHrEmployeesInput, UserUncheckedCreateWithoutHrEmployeesInput>
    connectOrCreate?: UserCreateOrConnectWithoutHrEmployeesInput
    upsert?: UserUpsertWithoutHrEmployeesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHrEmployeesInput, UserUpdateWithoutHrEmployeesInput>, UserUncheckedUpdateWithoutHrEmployeesInput>
  }

  export type UserUpdateManyWithoutHrNestedInput = {
    create?: XOR<UserCreateWithoutHrInput, UserUncheckedCreateWithoutHrInput> | UserCreateWithoutHrInput[] | UserUncheckedCreateWithoutHrInput[]
    connectOrCreate?: UserCreateOrConnectWithoutHrInput | UserCreateOrConnectWithoutHrInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutHrInput | UserUpsertWithWhereUniqueWithoutHrInput[]
    createMany?: UserCreateManyHrInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutHrInput | UserUpdateWithWhereUniqueWithoutHrInput[]
    updateMany?: UserUpdateManyWithWhereWithoutHrInput | UserUpdateManyWithWhereWithoutHrInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DepartmentUpdateOneWithoutUsersNestedInput = {
    create?: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutUsersInput
    upsert?: DepartmentUpsertWithoutUsersInput
    disconnect?: DepartmentWhereInput | boolean
    delete?: DepartmentWhereInput | boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutUsersInput, DepartmentUpdateWithoutUsersInput>, DepartmentUncheckedUpdateWithoutUsersInput>
  }

  export type LeaveUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<LeaveCreateWithoutRequesterInput, LeaveUncheckedCreateWithoutRequesterInput> | LeaveCreateWithoutRequesterInput[] | LeaveUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutRequesterInput | LeaveCreateOrConnectWithoutRequesterInput[]
    upsert?: LeaveUpsertWithWhereUniqueWithoutRequesterInput | LeaveUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: LeaveCreateManyRequesterInputEnvelope
    set?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    disconnect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    delete?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    update?: LeaveUpdateWithWhereUniqueWithoutRequesterInput | LeaveUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: LeaveUpdateManyWithWhereWithoutRequesterInput | LeaveUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
  }

  export type LeaveUpdateManyWithoutApproverNestedInput = {
    create?: XOR<LeaveCreateWithoutApproverInput, LeaveUncheckedCreateWithoutApproverInput> | LeaveCreateWithoutApproverInput[] | LeaveUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutApproverInput | LeaveCreateOrConnectWithoutApproverInput[]
    upsert?: LeaveUpsertWithWhereUniqueWithoutApproverInput | LeaveUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: LeaveCreateManyApproverInputEnvelope
    set?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    disconnect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    delete?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    update?: LeaveUpdateWithWhereUniqueWithoutApproverInput | LeaveUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: LeaveUpdateManyWithWhereWithoutApproverInput | LeaveUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
  }

  export type LeaveBalanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutUserInput, LeaveBalanceUncheckedCreateWithoutUserInput> | LeaveBalanceCreateWithoutUserInput[] | LeaveBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutUserInput | LeaveBalanceCreateOrConnectWithoutUserInput[]
    upsert?: LeaveBalanceUpsertWithWhereUniqueWithoutUserInput | LeaveBalanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeaveBalanceCreateManyUserInputEnvelope
    set?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    disconnect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    delete?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    update?: LeaveBalanceUpdateWithWhereUniqueWithoutUserInput | LeaveBalanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeaveBalanceUpdateManyWithWhereWithoutUserInput | LeaveBalanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutManagerNestedInput = {
    create?: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput> | UserCreateWithoutManagerInput[] | UserUncheckedCreateWithoutManagerInput[]
    connectOrCreate?: UserCreateOrConnectWithoutManagerInput | UserCreateOrConnectWithoutManagerInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutManagerInput | UserUpsertWithWhereUniqueWithoutManagerInput[]
    createMany?: UserCreateManyManagerInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutManagerInput | UserUpdateWithWhereUniqueWithoutManagerInput[]
    updateMany?: UserUpdateManyWithWhereWithoutManagerInput | UserUpdateManyWithWhereWithoutManagerInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutHrNestedInput = {
    create?: XOR<UserCreateWithoutHrInput, UserUncheckedCreateWithoutHrInput> | UserCreateWithoutHrInput[] | UserUncheckedCreateWithoutHrInput[]
    connectOrCreate?: UserCreateOrConnectWithoutHrInput | UserCreateOrConnectWithoutHrInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutHrInput | UserUpsertWithWhereUniqueWithoutHrInput[]
    createMany?: UserCreateManyHrInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutHrInput | UserUpdateWithWhereUniqueWithoutHrInput[]
    updateMany?: UserUpdateManyWithWhereWithoutHrInput | UserUpdateManyWithWhereWithoutHrInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type LeaveUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<LeaveCreateWithoutRequesterInput, LeaveUncheckedCreateWithoutRequesterInput> | LeaveCreateWithoutRequesterInput[] | LeaveUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutRequesterInput | LeaveCreateOrConnectWithoutRequesterInput[]
    upsert?: LeaveUpsertWithWhereUniqueWithoutRequesterInput | LeaveUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: LeaveCreateManyRequesterInputEnvelope
    set?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    disconnect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    delete?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    update?: LeaveUpdateWithWhereUniqueWithoutRequesterInput | LeaveUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: LeaveUpdateManyWithWhereWithoutRequesterInput | LeaveUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
  }

  export type LeaveUncheckedUpdateManyWithoutApproverNestedInput = {
    create?: XOR<LeaveCreateWithoutApproverInput, LeaveUncheckedCreateWithoutApproverInput> | LeaveCreateWithoutApproverInput[] | LeaveUncheckedCreateWithoutApproverInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutApproverInput | LeaveCreateOrConnectWithoutApproverInput[]
    upsert?: LeaveUpsertWithWhereUniqueWithoutApproverInput | LeaveUpsertWithWhereUniqueWithoutApproverInput[]
    createMany?: LeaveCreateManyApproverInputEnvelope
    set?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    disconnect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    delete?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    update?: LeaveUpdateWithWhereUniqueWithoutApproverInput | LeaveUpdateWithWhereUniqueWithoutApproverInput[]
    updateMany?: LeaveUpdateManyWithWhereWithoutApproverInput | LeaveUpdateManyWithWhereWithoutApproverInput[]
    deleteMany?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
  }

  export type LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutUserInput, LeaveBalanceUncheckedCreateWithoutUserInput> | LeaveBalanceCreateWithoutUserInput[] | LeaveBalanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutUserInput | LeaveBalanceCreateOrConnectWithoutUserInput[]
    upsert?: LeaveBalanceUpsertWithWhereUniqueWithoutUserInput | LeaveBalanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LeaveBalanceCreateManyUserInputEnvelope
    set?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    disconnect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    delete?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    update?: LeaveBalanceUpdateWithWhereUniqueWithoutUserInput | LeaveBalanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LeaveBalanceUpdateManyWithWhereWithoutUserInput | LeaveBalanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDepartmentInput | UserUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDepartmentInput | UserUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDepartmentInput | UserUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDepartmentInput | UserUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDepartmentInput | UserUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDepartmentInput | UserUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type LeaveCreateNestedManyWithoutLeavePolicyInput = {
    create?: XOR<LeaveCreateWithoutLeavePolicyInput, LeaveUncheckedCreateWithoutLeavePolicyInput> | LeaveCreateWithoutLeavePolicyInput[] | LeaveUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutLeavePolicyInput | LeaveCreateOrConnectWithoutLeavePolicyInput[]
    createMany?: LeaveCreateManyLeavePolicyInputEnvelope
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
  }

  export type LeaveBalanceCreateNestedManyWithoutLeavePolicyInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeavePolicyInput, LeaveBalanceUncheckedCreateWithoutLeavePolicyInput> | LeaveBalanceCreateWithoutLeavePolicyInput[] | LeaveBalanceUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeavePolicyInput | LeaveBalanceCreateOrConnectWithoutLeavePolicyInput[]
    createMany?: LeaveBalanceCreateManyLeavePolicyInputEnvelope
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
  }

  export type LeaveUncheckedCreateNestedManyWithoutLeavePolicyInput = {
    create?: XOR<LeaveCreateWithoutLeavePolicyInput, LeaveUncheckedCreateWithoutLeavePolicyInput> | LeaveCreateWithoutLeavePolicyInput[] | LeaveUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutLeavePolicyInput | LeaveCreateOrConnectWithoutLeavePolicyInput[]
    createMany?: LeaveCreateManyLeavePolicyInputEnvelope
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
  }

  export type LeaveBalanceUncheckedCreateNestedManyWithoutLeavePolicyInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeavePolicyInput, LeaveBalanceUncheckedCreateWithoutLeavePolicyInput> | LeaveBalanceCreateWithoutLeavePolicyInput[] | LeaveBalanceUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeavePolicyInput | LeaveBalanceCreateOrConnectWithoutLeavePolicyInput[]
    createMany?: LeaveBalanceCreateManyLeavePolicyInputEnvelope
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
  }

  export type EnumLeaveTypeFieldUpdateOperationsInput = {
    set?: $Enums.LeaveType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LeaveUpdateManyWithoutLeavePolicyNestedInput = {
    create?: XOR<LeaveCreateWithoutLeavePolicyInput, LeaveUncheckedCreateWithoutLeavePolicyInput> | LeaveCreateWithoutLeavePolicyInput[] | LeaveUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutLeavePolicyInput | LeaveCreateOrConnectWithoutLeavePolicyInput[]
    upsert?: LeaveUpsertWithWhereUniqueWithoutLeavePolicyInput | LeaveUpsertWithWhereUniqueWithoutLeavePolicyInput[]
    createMany?: LeaveCreateManyLeavePolicyInputEnvelope
    set?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    disconnect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    delete?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    update?: LeaveUpdateWithWhereUniqueWithoutLeavePolicyInput | LeaveUpdateWithWhereUniqueWithoutLeavePolicyInput[]
    updateMany?: LeaveUpdateManyWithWhereWithoutLeavePolicyInput | LeaveUpdateManyWithWhereWithoutLeavePolicyInput[]
    deleteMany?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
  }

  export type LeaveBalanceUpdateManyWithoutLeavePolicyNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeavePolicyInput, LeaveBalanceUncheckedCreateWithoutLeavePolicyInput> | LeaveBalanceCreateWithoutLeavePolicyInput[] | LeaveBalanceUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeavePolicyInput | LeaveBalanceCreateOrConnectWithoutLeavePolicyInput[]
    upsert?: LeaveBalanceUpsertWithWhereUniqueWithoutLeavePolicyInput | LeaveBalanceUpsertWithWhereUniqueWithoutLeavePolicyInput[]
    createMany?: LeaveBalanceCreateManyLeavePolicyInputEnvelope
    set?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    disconnect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    delete?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    update?: LeaveBalanceUpdateWithWhereUniqueWithoutLeavePolicyInput | LeaveBalanceUpdateWithWhereUniqueWithoutLeavePolicyInput[]
    updateMany?: LeaveBalanceUpdateManyWithWhereWithoutLeavePolicyInput | LeaveBalanceUpdateManyWithWhereWithoutLeavePolicyInput[]
    deleteMany?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
  }

  export type LeaveUncheckedUpdateManyWithoutLeavePolicyNestedInput = {
    create?: XOR<LeaveCreateWithoutLeavePolicyInput, LeaveUncheckedCreateWithoutLeavePolicyInput> | LeaveCreateWithoutLeavePolicyInput[] | LeaveUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveCreateOrConnectWithoutLeavePolicyInput | LeaveCreateOrConnectWithoutLeavePolicyInput[]
    upsert?: LeaveUpsertWithWhereUniqueWithoutLeavePolicyInput | LeaveUpsertWithWhereUniqueWithoutLeavePolicyInput[]
    createMany?: LeaveCreateManyLeavePolicyInputEnvelope
    set?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    disconnect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    delete?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    connect?: LeaveWhereUniqueInput | LeaveWhereUniqueInput[]
    update?: LeaveUpdateWithWhereUniqueWithoutLeavePolicyInput | LeaveUpdateWithWhereUniqueWithoutLeavePolicyInput[]
    updateMany?: LeaveUpdateManyWithWhereWithoutLeavePolicyInput | LeaveUpdateManyWithWhereWithoutLeavePolicyInput[]
    deleteMany?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
  }

  export type LeaveBalanceUncheckedUpdateManyWithoutLeavePolicyNestedInput = {
    create?: XOR<LeaveBalanceCreateWithoutLeavePolicyInput, LeaveBalanceUncheckedCreateWithoutLeavePolicyInput> | LeaveBalanceCreateWithoutLeavePolicyInput[] | LeaveBalanceUncheckedCreateWithoutLeavePolicyInput[]
    connectOrCreate?: LeaveBalanceCreateOrConnectWithoutLeavePolicyInput | LeaveBalanceCreateOrConnectWithoutLeavePolicyInput[]
    upsert?: LeaveBalanceUpsertWithWhereUniqueWithoutLeavePolicyInput | LeaveBalanceUpsertWithWhereUniqueWithoutLeavePolicyInput[]
    createMany?: LeaveBalanceCreateManyLeavePolicyInputEnvelope
    set?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    disconnect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    delete?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    connect?: LeaveBalanceWhereUniqueInput | LeaveBalanceWhereUniqueInput[]
    update?: LeaveBalanceUpdateWithWhereUniqueWithoutLeavePolicyInput | LeaveBalanceUpdateWithWhereUniqueWithoutLeavePolicyInput[]
    updateMany?: LeaveBalanceUpdateManyWithWhereWithoutLeavePolicyInput | LeaveBalanceUpdateManyWithWhereWithoutLeavePolicyInput[]
    deleteMany?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
  }

  export type LeaveCreateattachmentsInput = {
    set: string[]
  }

  export type LeavePolicyCreateNestedOneWithoutLeavesInput = {
    create?: XOR<LeavePolicyCreateWithoutLeavesInput, LeavePolicyUncheckedCreateWithoutLeavesInput>
    connectOrCreate?: LeavePolicyCreateOrConnectWithoutLeavesInput
    connect?: LeavePolicyWhereUniqueInput
  }

  export type LeaveDayStatusCreateNestedManyWithoutLeaveInput = {
    create?: XOR<LeaveDayStatusCreateWithoutLeaveInput, LeaveDayStatusUncheckedCreateWithoutLeaveInput> | LeaveDayStatusCreateWithoutLeaveInput[] | LeaveDayStatusUncheckedCreateWithoutLeaveInput[]
    connectOrCreate?: LeaveDayStatusCreateOrConnectWithoutLeaveInput | LeaveDayStatusCreateOrConnectWithoutLeaveInput[]
    createMany?: LeaveDayStatusCreateManyLeaveInputEnvelope
    connect?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutLeaveRequestsInput = {
    create?: XOR<UserCreateWithoutLeaveRequestsInput, UserUncheckedCreateWithoutLeaveRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeaveRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutApprovedLeavesInput = {
    create?: XOR<UserCreateWithoutApprovedLeavesInput, UserUncheckedCreateWithoutApprovedLeavesInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedLeavesInput
    connect?: UserWhereUniqueInput
  }

  export type LeaveDayStatusUncheckedCreateNestedManyWithoutLeaveInput = {
    create?: XOR<LeaveDayStatusCreateWithoutLeaveInput, LeaveDayStatusUncheckedCreateWithoutLeaveInput> | LeaveDayStatusCreateWithoutLeaveInput[] | LeaveDayStatusUncheckedCreateWithoutLeaveInput[]
    connectOrCreate?: LeaveDayStatusCreateOrConnectWithoutLeaveInput | LeaveDayStatusCreateOrConnectWithoutLeaveInput[]
    createMany?: LeaveDayStatusCreateManyLeaveInputEnvelope
    connect?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumLeaveStatusFieldUpdateOperationsInput = {
    set?: $Enums.LeaveStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type LeaveUpdateattachmentsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type LeavePolicyUpdateOneWithoutLeavesNestedInput = {
    create?: XOR<LeavePolicyCreateWithoutLeavesInput, LeavePolicyUncheckedCreateWithoutLeavesInput>
    connectOrCreate?: LeavePolicyCreateOrConnectWithoutLeavesInput
    upsert?: LeavePolicyUpsertWithoutLeavesInput
    disconnect?: LeavePolicyWhereInput | boolean
    delete?: LeavePolicyWhereInput | boolean
    connect?: LeavePolicyWhereUniqueInput
    update?: XOR<XOR<LeavePolicyUpdateToOneWithWhereWithoutLeavesInput, LeavePolicyUpdateWithoutLeavesInput>, LeavePolicyUncheckedUpdateWithoutLeavesInput>
  }

  export type LeaveDayStatusUpdateManyWithoutLeaveNestedInput = {
    create?: XOR<LeaveDayStatusCreateWithoutLeaveInput, LeaveDayStatusUncheckedCreateWithoutLeaveInput> | LeaveDayStatusCreateWithoutLeaveInput[] | LeaveDayStatusUncheckedCreateWithoutLeaveInput[]
    connectOrCreate?: LeaveDayStatusCreateOrConnectWithoutLeaveInput | LeaveDayStatusCreateOrConnectWithoutLeaveInput[]
    upsert?: LeaveDayStatusUpsertWithWhereUniqueWithoutLeaveInput | LeaveDayStatusUpsertWithWhereUniqueWithoutLeaveInput[]
    createMany?: LeaveDayStatusCreateManyLeaveInputEnvelope
    set?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    disconnect?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    delete?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    connect?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    update?: LeaveDayStatusUpdateWithWhereUniqueWithoutLeaveInput | LeaveDayStatusUpdateWithWhereUniqueWithoutLeaveInput[]
    updateMany?: LeaveDayStatusUpdateManyWithWhereWithoutLeaveInput | LeaveDayStatusUpdateManyWithWhereWithoutLeaveInput[]
    deleteMany?: LeaveDayStatusScalarWhereInput | LeaveDayStatusScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutLeaveRequestsNestedInput = {
    create?: XOR<UserCreateWithoutLeaveRequestsInput, UserUncheckedCreateWithoutLeaveRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeaveRequestsInput
    upsert?: UserUpsertWithoutLeaveRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLeaveRequestsInput, UserUpdateWithoutLeaveRequestsInput>, UserUncheckedUpdateWithoutLeaveRequestsInput>
  }

  export type UserUpdateOneWithoutApprovedLeavesNestedInput = {
    create?: XOR<UserCreateWithoutApprovedLeavesInput, UserUncheckedCreateWithoutApprovedLeavesInput>
    connectOrCreate?: UserCreateOrConnectWithoutApprovedLeavesInput
    upsert?: UserUpsertWithoutApprovedLeavesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApprovedLeavesInput, UserUpdateWithoutApprovedLeavesInput>, UserUncheckedUpdateWithoutApprovedLeavesInput>
  }

  export type LeaveDayStatusUncheckedUpdateManyWithoutLeaveNestedInput = {
    create?: XOR<LeaveDayStatusCreateWithoutLeaveInput, LeaveDayStatusUncheckedCreateWithoutLeaveInput> | LeaveDayStatusCreateWithoutLeaveInput[] | LeaveDayStatusUncheckedCreateWithoutLeaveInput[]
    connectOrCreate?: LeaveDayStatusCreateOrConnectWithoutLeaveInput | LeaveDayStatusCreateOrConnectWithoutLeaveInput[]
    upsert?: LeaveDayStatusUpsertWithWhereUniqueWithoutLeaveInput | LeaveDayStatusUpsertWithWhereUniqueWithoutLeaveInput[]
    createMany?: LeaveDayStatusCreateManyLeaveInputEnvelope
    set?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    disconnect?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    delete?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    connect?: LeaveDayStatusWhereUniqueInput | LeaveDayStatusWhereUniqueInput[]
    update?: LeaveDayStatusUpdateWithWhereUniqueWithoutLeaveInput | LeaveDayStatusUpdateWithWhereUniqueWithoutLeaveInput[]
    updateMany?: LeaveDayStatusUpdateManyWithWhereWithoutLeaveInput | LeaveDayStatusUpdateManyWithWhereWithoutLeaveInput[]
    deleteMany?: LeaveDayStatusScalarWhereInput | LeaveDayStatusScalarWhereInput[]
  }

  export type LeaveCreateNestedOneWithoutDayStatusesInput = {
    create?: XOR<LeaveCreateWithoutDayStatusesInput, LeaveUncheckedCreateWithoutDayStatusesInput>
    connectOrCreate?: LeaveCreateOrConnectWithoutDayStatusesInput
    connect?: LeaveWhereUniqueInput
  }

  export type LeaveUpdateOneRequiredWithoutDayStatusesNestedInput = {
    create?: XOR<LeaveCreateWithoutDayStatusesInput, LeaveUncheckedCreateWithoutDayStatusesInput>
    connectOrCreate?: LeaveCreateOrConnectWithoutDayStatusesInput
    upsert?: LeaveUpsertWithoutDayStatusesInput
    connect?: LeaveWhereUniqueInput
    update?: XOR<XOR<LeaveUpdateToOneWithWhereWithoutDayStatusesInput, LeaveUpdateWithoutDayStatusesInput>, LeaveUncheckedUpdateWithoutDayStatusesInput>
  }

  export type UserCreateNestedOneWithoutLeaveBalancesInput = {
    create?: XOR<UserCreateWithoutLeaveBalancesInput, UserUncheckedCreateWithoutLeaveBalancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeaveBalancesInput
    connect?: UserWhereUniqueInput
  }

  export type LeavePolicyCreateNestedOneWithoutLeaveBalancesInput = {
    create?: XOR<LeavePolicyCreateWithoutLeaveBalancesInput, LeavePolicyUncheckedCreateWithoutLeaveBalancesInput>
    connectOrCreate?: LeavePolicyCreateOrConnectWithoutLeaveBalancesInput
    connect?: LeavePolicyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLeaveBalancesNestedInput = {
    create?: XOR<UserCreateWithoutLeaveBalancesInput, UserUncheckedCreateWithoutLeaveBalancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutLeaveBalancesInput
    upsert?: UserUpsertWithoutLeaveBalancesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLeaveBalancesInput, UserUpdateWithoutLeaveBalancesInput>, UserUncheckedUpdateWithoutLeaveBalancesInput>
  }

  export type LeavePolicyUpdateOneRequiredWithoutLeaveBalancesNestedInput = {
    create?: XOR<LeavePolicyCreateWithoutLeaveBalancesInput, LeavePolicyUncheckedCreateWithoutLeaveBalancesInput>
    connectOrCreate?: LeavePolicyCreateOrConnectWithoutLeaveBalancesInput
    upsert?: LeavePolicyUpsertWithoutLeaveBalancesInput
    connect?: LeavePolicyWhereUniqueInput
    update?: XOR<XOR<LeavePolicyUpdateToOneWithWhereWithoutLeaveBalancesInput, LeavePolicyUpdateWithoutLeaveBalancesInput>, LeavePolicyUncheckedUpdateWithoutLeaveBalancesInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.AuditAction
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumLeaveTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeFilter<$PrismaModel> | $Enums.LeaveType
  }

  export type NestedEnumLeaveTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveType | EnumLeaveTypeFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveType[] | ListEnumLeaveTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveTypeWithAggregatesFilter<$PrismaModel> | $Enums.LeaveType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveTypeFilter<$PrismaModel>
    _max?: NestedEnumLeaveTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLeaveStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusFilter<$PrismaModel> | $Enums.LeaveStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeaveStatus | EnumLeaveStatusFieldRefInput<$PrismaModel>
    in?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.LeaveStatus[] | ListEnumLeaveStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumLeaveStatusWithAggregatesFilter<$PrismaModel> | $Enums.LeaveStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLeaveStatusFilter<$PrismaModel>
    _max?: NestedEnumLeaveStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionFilter<$PrismaModel> | $Enums.AuditAction
  }

  export type NestedEnumAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuditAction | EnumAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuditAction[] | ListEnumAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.AuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuditActionFilter<$PrismaModel>
    _max?: NestedEnumAuditActionFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutEmployeesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEmployeesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEmployeesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEmployeesInput, UserUncheckedCreateWithoutEmployeesInput>
  }

  export type UserCreateWithoutManagerInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutManagerInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutManagerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
  }

  export type UserCreateManyManagerInputEnvelope = {
    data: UserCreateManyManagerInput | UserCreateManyManagerInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutHrEmployeesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHrEmployeesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHrEmployeesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHrEmployeesInput, UserUncheckedCreateWithoutHrEmployeesInput>
  }

  export type UserCreateWithoutHrInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHrInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHrInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHrInput, UserUncheckedCreateWithoutHrInput>
  }

  export type UserCreateManyHrInputEnvelope = {
    data: UserCreateManyHrInput | UserCreateManyHrInput[]
    skipDuplicates?: boolean
  }

  export type DepartmentCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    headId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    headId?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DepartmentCreateOrConnectWithoutUsersInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
  }

  export type LeaveCreateWithoutRequesterInput = {
    id?: string
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    leavePolicy?: LeavePolicyCreateNestedOneWithoutLeavesInput
    dayStatuses?: LeaveDayStatusCreateNestedManyWithoutLeaveInput
    approver?: UserCreateNestedOneWithoutApprovedLeavesInput
  }

  export type LeaveUncheckedCreateWithoutRequesterInput = {
    id?: string
    approverId?: string | null
    leavePolicyId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    dayStatuses?: LeaveDayStatusUncheckedCreateNestedManyWithoutLeaveInput
  }

  export type LeaveCreateOrConnectWithoutRequesterInput = {
    where: LeaveWhereUniqueInput
    create: XOR<LeaveCreateWithoutRequesterInput, LeaveUncheckedCreateWithoutRequesterInput>
  }

  export type LeaveCreateManyRequesterInputEnvelope = {
    data: LeaveCreateManyRequesterInput | LeaveCreateManyRequesterInput[]
    skipDuplicates?: boolean
  }

  export type LeaveCreateWithoutApproverInput = {
    id?: string
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    leavePolicy?: LeavePolicyCreateNestedOneWithoutLeavesInput
    dayStatuses?: LeaveDayStatusCreateNestedManyWithoutLeaveInput
    requester: UserCreateNestedOneWithoutLeaveRequestsInput
  }

  export type LeaveUncheckedCreateWithoutApproverInput = {
    id?: string
    requesterId: string
    leavePolicyId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    dayStatuses?: LeaveDayStatusUncheckedCreateNestedManyWithoutLeaveInput
  }

  export type LeaveCreateOrConnectWithoutApproverInput = {
    where: LeaveWhereUniqueInput
    create: XOR<LeaveCreateWithoutApproverInput, LeaveUncheckedCreateWithoutApproverInput>
  }

  export type LeaveCreateManyApproverInputEnvelope = {
    data: LeaveCreateManyApproverInput | LeaveCreateManyApproverInput[]
    skipDuplicates?: boolean
  }

  export type LeaveBalanceCreateWithoutUserInput = {
    id?: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    leavePolicy: LeavePolicyCreateNestedOneWithoutLeaveBalancesInput
  }

  export type LeaveBalanceUncheckedCreateWithoutUserInput = {
    id?: string
    leavePolicyId: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceCreateOrConnectWithoutUserInput = {
    where: LeaveBalanceWhereUniqueInput
    create: XOR<LeaveBalanceCreateWithoutUserInput, LeaveBalanceUncheckedCreateWithoutUserInput>
  }

  export type LeaveBalanceCreateManyUserInputEnvelope = {
    data: LeaveBalanceCreateManyUserInput | LeaveBalanceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    leaveId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    leaveId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEmployeesInput = {
    update: XOR<UserUpdateWithoutEmployeesInput, UserUncheckedUpdateWithoutEmployeesInput>
    create: XOR<UserCreateWithoutEmployeesInput, UserUncheckedCreateWithoutEmployeesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEmployeesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEmployeesInput, UserUncheckedUpdateWithoutEmployeesInput>
  }

  export type UserUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutManagerInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutManagerInput, UserUncheckedUpdateWithoutManagerInput>
    create: XOR<UserCreateWithoutManagerInput, UserUncheckedCreateWithoutManagerInput>
  }

  export type UserUpdateWithWhereUniqueWithoutManagerInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutManagerInput, UserUncheckedUpdateWithoutManagerInput>
  }

  export type UserUpdateManyWithWhereWithoutManagerInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutManagerInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    auth0Id?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    employeeId?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    managerId?: StringNullableFilter<"User"> | string | null
    hrId?: StringNullableFilter<"User"> | string | null
    departmentId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    joinDate?: DateTimeFilter<"User"> | Date | string
    profileImage?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserUpsertWithoutHrEmployeesInput = {
    update: XOR<UserUpdateWithoutHrEmployeesInput, UserUncheckedUpdateWithoutHrEmployeesInput>
    create: XOR<UserCreateWithoutHrEmployeesInput, UserUncheckedCreateWithoutHrEmployeesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHrEmployeesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHrEmployeesInput, UserUncheckedUpdateWithoutHrEmployeesInput>
  }

  export type UserUpdateWithoutHrEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHrEmployeesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutHrInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutHrInput, UserUncheckedUpdateWithoutHrInput>
    create: XOR<UserCreateWithoutHrInput, UserUncheckedCreateWithoutHrInput>
  }

  export type UserUpdateWithWhereUniqueWithoutHrInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutHrInput, UserUncheckedUpdateWithoutHrInput>
  }

  export type UserUpdateManyWithWhereWithoutHrInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutHrInput>
  }

  export type DepartmentUpsertWithoutUsersInput = {
    update: XOR<DepartmentUpdateWithoutUsersInput, DepartmentUncheckedUpdateWithoutUsersInput>
    create: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutUsersInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutUsersInput, DepartmentUncheckedUpdateWithoutUsersInput>
  }

  export type DepartmentUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    headId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DepartmentUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    headId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveUpsertWithWhereUniqueWithoutRequesterInput = {
    where: LeaveWhereUniqueInput
    update: XOR<LeaveUpdateWithoutRequesterInput, LeaveUncheckedUpdateWithoutRequesterInput>
    create: XOR<LeaveCreateWithoutRequesterInput, LeaveUncheckedCreateWithoutRequesterInput>
  }

  export type LeaveUpdateWithWhereUniqueWithoutRequesterInput = {
    where: LeaveWhereUniqueInput
    data: XOR<LeaveUpdateWithoutRequesterInput, LeaveUncheckedUpdateWithoutRequesterInput>
  }

  export type LeaveUpdateManyWithWhereWithoutRequesterInput = {
    where: LeaveScalarWhereInput
    data: XOR<LeaveUpdateManyMutationInput, LeaveUncheckedUpdateManyWithoutRequesterInput>
  }

  export type LeaveScalarWhereInput = {
    AND?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
    OR?: LeaveScalarWhereInput[]
    NOT?: LeaveScalarWhereInput | LeaveScalarWhereInput[]
    id?: StringFilter<"Leave"> | string
    requesterId?: StringFilter<"Leave"> | string
    approverId?: StringNullableFilter<"Leave"> | string | null
    leavePolicyId?: StringNullableFilter<"Leave"> | string | null
    leaveType?: EnumLeaveTypeFilter<"Leave"> | $Enums.LeaveType
    startDate?: DateTimeFilter<"Leave"> | Date | string
    endDate?: DateTimeFilter<"Leave"> | Date | string
    totalDays?: FloatFilter<"Leave"> | number
    reason?: StringFilter<"Leave"> | string
    status?: EnumLeaveStatusFilter<"Leave"> | $Enums.LeaveStatus
    appliedDate?: DateTimeFilter<"Leave"> | Date | string
    approvedDate?: DateTimeNullableFilter<"Leave"> | Date | string | null
    rejectionReason?: StringNullableFilter<"Leave"> | string | null
    attachments?: StringNullableListFilter<"Leave">
    isHalfDay?: BoolFilter<"Leave"> | boolean
    emergencyLeave?: BoolFilter<"Leave"> | boolean
    createdAt?: DateTimeFilter<"Leave"> | Date | string
    updatedAt?: DateTimeFilter<"Leave"> | Date | string
    lastReminderSent?: DateTimeNullableFilter<"Leave"> | Date | string | null
    isLOP?: BoolFilter<"Leave"> | boolean
  }

  export type LeaveUpsertWithWhereUniqueWithoutApproverInput = {
    where: LeaveWhereUniqueInput
    update: XOR<LeaveUpdateWithoutApproverInput, LeaveUncheckedUpdateWithoutApproverInput>
    create: XOR<LeaveCreateWithoutApproverInput, LeaveUncheckedCreateWithoutApproverInput>
  }

  export type LeaveUpdateWithWhereUniqueWithoutApproverInput = {
    where: LeaveWhereUniqueInput
    data: XOR<LeaveUpdateWithoutApproverInput, LeaveUncheckedUpdateWithoutApproverInput>
  }

  export type LeaveUpdateManyWithWhereWithoutApproverInput = {
    where: LeaveScalarWhereInput
    data: XOR<LeaveUpdateManyMutationInput, LeaveUncheckedUpdateManyWithoutApproverInput>
  }

  export type LeaveBalanceUpsertWithWhereUniqueWithoutUserInput = {
    where: LeaveBalanceWhereUniqueInput
    update: XOR<LeaveBalanceUpdateWithoutUserInput, LeaveBalanceUncheckedUpdateWithoutUserInput>
    create: XOR<LeaveBalanceCreateWithoutUserInput, LeaveBalanceUncheckedCreateWithoutUserInput>
  }

  export type LeaveBalanceUpdateWithWhereUniqueWithoutUserInput = {
    where: LeaveBalanceWhereUniqueInput
    data: XOR<LeaveBalanceUpdateWithoutUserInput, LeaveBalanceUncheckedUpdateWithoutUserInput>
  }

  export type LeaveBalanceUpdateManyWithWhereWithoutUserInput = {
    where: LeaveBalanceScalarWhereInput
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyWithoutUserInput>
  }

  export type LeaveBalanceScalarWhereInput = {
    AND?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
    OR?: LeaveBalanceScalarWhereInput[]
    NOT?: LeaveBalanceScalarWhereInput | LeaveBalanceScalarWhereInput[]
    id?: StringFilter<"LeaveBalance"> | string
    userId?: StringFilter<"LeaveBalance"> | string
    leavePolicyId?: StringFilter<"LeaveBalance"> | string
    year?: IntFilter<"LeaveBalance"> | number
    totalQuota?: IntFilter<"LeaveBalance"> | number
    usedDays?: FloatFilter<"LeaveBalance"> | number
    pendingDays?: FloatFilter<"LeaveBalance"> | number
    availableDays?: FloatFilter<"LeaveBalance"> | number
    carryForward?: FloatFilter<"LeaveBalance"> | number
    createdAt?: DateTimeFilter<"LeaveBalance"> | Date | string
    updatedAt?: DateTimeFilter<"LeaveBalance"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: EnumAuditActionFilter<"AuditLog"> | $Enums.AuditAction
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    oldValues?: JsonNullableFilter<"AuditLog">
    newValues?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    isRead?: BoolFilter<"Notification"> | boolean
    leaveId?: StringNullableFilter<"Notification"> | string | null
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutDepartmentInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDepartmentInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDepartmentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput>
  }

  export type UserCreateManyDepartmentInputEnvelope = {
    data: UserCreateManyDepartmentInput | UserCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutDepartmentInput, UserUncheckedUpdateWithoutDepartmentInput>
    create: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput>
  }

  export type UserUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutDepartmentInput, UserUncheckedUpdateWithoutDepartmentInput>
  }

  export type UserUpdateManyWithWhereWithoutDepartmentInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type LeaveCreateWithoutLeavePolicyInput = {
    id?: string
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    dayStatuses?: LeaveDayStatusCreateNestedManyWithoutLeaveInput
    requester: UserCreateNestedOneWithoutLeaveRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedLeavesInput
  }

  export type LeaveUncheckedCreateWithoutLeavePolicyInput = {
    id?: string
    requesterId: string
    approverId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    dayStatuses?: LeaveDayStatusUncheckedCreateNestedManyWithoutLeaveInput
  }

  export type LeaveCreateOrConnectWithoutLeavePolicyInput = {
    where: LeaveWhereUniqueInput
    create: XOR<LeaveCreateWithoutLeavePolicyInput, LeaveUncheckedCreateWithoutLeavePolicyInput>
  }

  export type LeaveCreateManyLeavePolicyInputEnvelope = {
    data: LeaveCreateManyLeavePolicyInput | LeaveCreateManyLeavePolicyInput[]
    skipDuplicates?: boolean
  }

  export type LeaveBalanceCreateWithoutLeavePolicyInput = {
    id?: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutLeaveBalancesInput
  }

  export type LeaveBalanceUncheckedCreateWithoutLeavePolicyInput = {
    id?: string
    userId: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveBalanceCreateOrConnectWithoutLeavePolicyInput = {
    where: LeaveBalanceWhereUniqueInput
    create: XOR<LeaveBalanceCreateWithoutLeavePolicyInput, LeaveBalanceUncheckedCreateWithoutLeavePolicyInput>
  }

  export type LeaveBalanceCreateManyLeavePolicyInputEnvelope = {
    data: LeaveBalanceCreateManyLeavePolicyInput | LeaveBalanceCreateManyLeavePolicyInput[]
    skipDuplicates?: boolean
  }

  export type LeaveUpsertWithWhereUniqueWithoutLeavePolicyInput = {
    where: LeaveWhereUniqueInput
    update: XOR<LeaveUpdateWithoutLeavePolicyInput, LeaveUncheckedUpdateWithoutLeavePolicyInput>
    create: XOR<LeaveCreateWithoutLeavePolicyInput, LeaveUncheckedCreateWithoutLeavePolicyInput>
  }

  export type LeaveUpdateWithWhereUniqueWithoutLeavePolicyInput = {
    where: LeaveWhereUniqueInput
    data: XOR<LeaveUpdateWithoutLeavePolicyInput, LeaveUncheckedUpdateWithoutLeavePolicyInput>
  }

  export type LeaveUpdateManyWithWhereWithoutLeavePolicyInput = {
    where: LeaveScalarWhereInput
    data: XOR<LeaveUpdateManyMutationInput, LeaveUncheckedUpdateManyWithoutLeavePolicyInput>
  }

  export type LeaveBalanceUpsertWithWhereUniqueWithoutLeavePolicyInput = {
    where: LeaveBalanceWhereUniqueInput
    update: XOR<LeaveBalanceUpdateWithoutLeavePolicyInput, LeaveBalanceUncheckedUpdateWithoutLeavePolicyInput>
    create: XOR<LeaveBalanceCreateWithoutLeavePolicyInput, LeaveBalanceUncheckedCreateWithoutLeavePolicyInput>
  }

  export type LeaveBalanceUpdateWithWhereUniqueWithoutLeavePolicyInput = {
    where: LeaveBalanceWhereUniqueInput
    data: XOR<LeaveBalanceUpdateWithoutLeavePolicyInput, LeaveBalanceUncheckedUpdateWithoutLeavePolicyInput>
  }

  export type LeaveBalanceUpdateManyWithWhereWithoutLeavePolicyInput = {
    where: LeaveBalanceScalarWhereInput
    data: XOR<LeaveBalanceUpdateManyMutationInput, LeaveBalanceUncheckedUpdateManyWithoutLeavePolicyInput>
  }

  export type LeavePolicyCreateWithoutLeavesInput = {
    id?: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays?: number | null
    minDaysNotice?: number
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutLeavePolicyInput
  }

  export type LeavePolicyUncheckedCreateWithoutLeavesInput = {
    id?: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays?: number | null
    minDaysNotice?: number
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutLeavePolicyInput
  }

  export type LeavePolicyCreateOrConnectWithoutLeavesInput = {
    where: LeavePolicyWhereUniqueInput
    create: XOR<LeavePolicyCreateWithoutLeavesInput, LeavePolicyUncheckedCreateWithoutLeavesInput>
  }

  export type LeaveDayStatusCreateWithoutLeaveInput = {
    id?: string
    date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
  }

  export type LeaveDayStatusUncheckedCreateWithoutLeaveInput = {
    id?: string
    date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
  }

  export type LeaveDayStatusCreateOrConnectWithoutLeaveInput = {
    where: LeaveDayStatusWhereUniqueInput
    create: XOR<LeaveDayStatusCreateWithoutLeaveInput, LeaveDayStatusUncheckedCreateWithoutLeaveInput>
  }

  export type LeaveDayStatusCreateManyLeaveInputEnvelope = {
    data: LeaveDayStatusCreateManyLeaveInput | LeaveDayStatusCreateManyLeaveInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutLeaveRequestsInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLeaveRequestsInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLeaveRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLeaveRequestsInput, UserUncheckedCreateWithoutLeaveRequestsInput>
  }

  export type UserCreateWithoutApprovedLeavesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApprovedLeavesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApprovedLeavesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApprovedLeavesInput, UserUncheckedCreateWithoutApprovedLeavesInput>
  }

  export type LeavePolicyUpsertWithoutLeavesInput = {
    update: XOR<LeavePolicyUpdateWithoutLeavesInput, LeavePolicyUncheckedUpdateWithoutLeavesInput>
    create: XOR<LeavePolicyCreateWithoutLeavesInput, LeavePolicyUncheckedCreateWithoutLeavesInput>
    where?: LeavePolicyWhereInput
  }

  export type LeavePolicyUpdateToOneWithWhereWithoutLeavesInput = {
    where?: LeavePolicyWhereInput
    data: XOR<LeavePolicyUpdateWithoutLeavesInput, LeavePolicyUncheckedUpdateWithoutLeavesInput>
  }

  export type LeavePolicyUpdateWithoutLeavesInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveBalances?: LeaveBalanceUpdateManyWithoutLeavePolicyNestedInput
  }

  export type LeavePolicyUncheckedUpdateWithoutLeavesInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutLeavePolicyNestedInput
  }

  export type LeaveDayStatusUpsertWithWhereUniqueWithoutLeaveInput = {
    where: LeaveDayStatusWhereUniqueInput
    update: XOR<LeaveDayStatusUpdateWithoutLeaveInput, LeaveDayStatusUncheckedUpdateWithoutLeaveInput>
    create: XOR<LeaveDayStatusCreateWithoutLeaveInput, LeaveDayStatusUncheckedCreateWithoutLeaveInput>
  }

  export type LeaveDayStatusUpdateWithWhereUniqueWithoutLeaveInput = {
    where: LeaveDayStatusWhereUniqueInput
    data: XOR<LeaveDayStatusUpdateWithoutLeaveInput, LeaveDayStatusUncheckedUpdateWithoutLeaveInput>
  }

  export type LeaveDayStatusUpdateManyWithWhereWithoutLeaveInput = {
    where: LeaveDayStatusScalarWhereInput
    data: XOR<LeaveDayStatusUpdateManyMutationInput, LeaveDayStatusUncheckedUpdateManyWithoutLeaveInput>
  }

  export type LeaveDayStatusScalarWhereInput = {
    AND?: LeaveDayStatusScalarWhereInput | LeaveDayStatusScalarWhereInput[]
    OR?: LeaveDayStatusScalarWhereInput[]
    NOT?: LeaveDayStatusScalarWhereInput | LeaveDayStatusScalarWhereInput[]
    id?: StringFilter<"LeaveDayStatus"> | string
    leaveId?: StringFilter<"LeaveDayStatus"> | string
    date?: DateTimeFilter<"LeaveDayStatus"> | Date | string
    status?: EnumLeaveStatusFilter<"LeaveDayStatus"> | $Enums.LeaveStatus
    reason?: StringNullableFilter<"LeaveDayStatus"> | string | null
  }

  export type UserUpsertWithoutLeaveRequestsInput = {
    update: XOR<UserUpdateWithoutLeaveRequestsInput, UserUncheckedUpdateWithoutLeaveRequestsInput>
    create: XOR<UserCreateWithoutLeaveRequestsInput, UserUncheckedCreateWithoutLeaveRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLeaveRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLeaveRequestsInput, UserUncheckedUpdateWithoutLeaveRequestsInput>
  }

  export type UserUpdateWithoutLeaveRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLeaveRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutApprovedLeavesInput = {
    update: XOR<UserUpdateWithoutApprovedLeavesInput, UserUncheckedUpdateWithoutApprovedLeavesInput>
    create: XOR<UserCreateWithoutApprovedLeavesInput, UserUncheckedCreateWithoutApprovedLeavesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApprovedLeavesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApprovedLeavesInput, UserUncheckedUpdateWithoutApprovedLeavesInput>
  }

  export type UserUpdateWithoutApprovedLeavesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApprovedLeavesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LeaveCreateWithoutDayStatusesInput = {
    id?: string
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
    leavePolicy?: LeavePolicyCreateNestedOneWithoutLeavesInput
    requester: UserCreateNestedOneWithoutLeaveRequestsInput
    approver?: UserCreateNestedOneWithoutApprovedLeavesInput
  }

  export type LeaveUncheckedCreateWithoutDayStatusesInput = {
    id?: string
    requesterId: string
    approverId?: string | null
    leavePolicyId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
  }

  export type LeaveCreateOrConnectWithoutDayStatusesInput = {
    where: LeaveWhereUniqueInput
    create: XOR<LeaveCreateWithoutDayStatusesInput, LeaveUncheckedCreateWithoutDayStatusesInput>
  }

  export type LeaveUpsertWithoutDayStatusesInput = {
    update: XOR<LeaveUpdateWithoutDayStatusesInput, LeaveUncheckedUpdateWithoutDayStatusesInput>
    create: XOR<LeaveCreateWithoutDayStatusesInput, LeaveUncheckedCreateWithoutDayStatusesInput>
    where?: LeaveWhereInput
  }

  export type LeaveUpdateToOneWithWhereWithoutDayStatusesInput = {
    where?: LeaveWhereInput
    data: XOR<LeaveUpdateWithoutDayStatusesInput, LeaveUncheckedUpdateWithoutDayStatusesInput>
  }

  export type LeaveUpdateWithoutDayStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    leavePolicy?: LeavePolicyUpdateOneWithoutLeavesNestedInput
    requester?: UserUpdateOneRequiredWithoutLeaveRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedLeavesNestedInput
  }

  export type LeaveUncheckedUpdateWithoutDayStatusesInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    leavePolicyId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutLeaveBalancesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLeaveBalancesInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLeaveBalancesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLeaveBalancesInput, UserUncheckedCreateWithoutLeaveBalancesInput>
  }

  export type LeavePolicyCreateWithoutLeaveBalancesInput = {
    id?: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays?: number | null
    minDaysNotice?: number
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leaves?: LeaveCreateNestedManyWithoutLeavePolicyInput
  }

  export type LeavePolicyUncheckedCreateWithoutLeaveBalancesInput = {
    id?: string
    leaveType: $Enums.LeaveType
    annualQuota: number
    maxConsecutiveDays?: number | null
    minDaysNotice?: number
    requiresApproval?: boolean
    requiresDocument?: boolean
    carryForwardAllowed?: boolean
    maxCarryForward?: number | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    leaves?: LeaveUncheckedCreateNestedManyWithoutLeavePolicyInput
  }

  export type LeavePolicyCreateOrConnectWithoutLeaveBalancesInput = {
    where: LeavePolicyWhereUniqueInput
    create: XOR<LeavePolicyCreateWithoutLeaveBalancesInput, LeavePolicyUncheckedCreateWithoutLeaveBalancesInput>
  }

  export type UserUpsertWithoutLeaveBalancesInput = {
    update: XOR<UserUpdateWithoutLeaveBalancesInput, UserUncheckedUpdateWithoutLeaveBalancesInput>
    create: XOR<UserCreateWithoutLeaveBalancesInput, UserUncheckedCreateWithoutLeaveBalancesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLeaveBalancesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLeaveBalancesInput, UserUncheckedUpdateWithoutLeaveBalancesInput>
  }

  export type UserUpdateWithoutLeaveBalancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLeaveBalancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LeavePolicyUpsertWithoutLeaveBalancesInput = {
    update: XOR<LeavePolicyUpdateWithoutLeaveBalancesInput, LeavePolicyUncheckedUpdateWithoutLeaveBalancesInput>
    create: XOR<LeavePolicyCreateWithoutLeaveBalancesInput, LeavePolicyUncheckedCreateWithoutLeaveBalancesInput>
    where?: LeavePolicyWhereInput
  }

  export type LeavePolicyUpdateToOneWithWhereWithoutLeaveBalancesInput = {
    where?: LeavePolicyWhereInput
    data: XOR<LeavePolicyUpdateWithoutLeaveBalancesInput, LeavePolicyUncheckedUpdateWithoutLeaveBalancesInput>
  }

  export type LeavePolicyUpdateWithoutLeaveBalancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaves?: LeaveUpdateManyWithoutLeavePolicyNestedInput
  }

  export type LeavePolicyUncheckedUpdateWithoutLeaveBalancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    annualQuota?: IntFieldUpdateOperationsInput | number
    maxConsecutiveDays?: NullableIntFieldUpdateOperationsInput | number | null
    minDaysNotice?: IntFieldUpdateOperationsInput | number
    requiresApproval?: BoolFieldUpdateOperationsInput | boolean
    requiresDocument?: BoolFieldUpdateOperationsInput | boolean
    carryForwardAllowed?: BoolFieldUpdateOperationsInput | boolean
    maxCarryForward?: NullableIntFieldUpdateOperationsInput | number | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leaves?: LeaveUncheckedUpdateManyWithoutLeavePolicyNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    manager?: UserCreateNestedOneWithoutEmployeesInput
    employees?: UserCreateNestedManyWithoutManagerInput
    hr?: UserCreateNestedOneWithoutHrEmployeesInput
    hrEmployees?: UserCreateNestedManyWithoutHrInput
    department?: DepartmentCreateNestedOneWithoutUsersInput
    leaveRequests?: LeaveCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    employees?: UserUncheckedCreateNestedManyWithoutManagerInput
    hrEmployees?: UserUncheckedCreateNestedManyWithoutHrInput
    leaveRequests?: LeaveUncheckedCreateNestedManyWithoutRequesterInput
    approvedLeaves?: LeaveUncheckedCreateNestedManyWithoutApproverInput
    leaveBalances?: LeaveBalanceUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyManagerInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    hrId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateManyHrInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    departmentId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveCreateManyRequesterInput = {
    id?: string
    approverId?: string | null
    leavePolicyId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
  }

  export type LeaveCreateManyApproverInput = {
    id?: string
    requesterId: string
    leavePolicyId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
  }

  export type LeaveBalanceCreateManyUserInput = {
    id?: string
    leavePolicyId: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: $Enums.AuditAction
    entityType: string
    entityId: string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    timestamp?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    type?: string
    isRead?: boolean
    leaveId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutManagerInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutHrInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHrInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutHrInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    leavePolicy?: LeavePolicyUpdateOneWithoutLeavesNestedInput
    dayStatuses?: LeaveDayStatusUpdateManyWithoutLeaveNestedInput
    approver?: UserUpdateOneWithoutApprovedLeavesNestedInput
  }

  export type LeaveUncheckedUpdateWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    leavePolicyId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    dayStatuses?: LeaveDayStatusUncheckedUpdateManyWithoutLeaveNestedInput
  }

  export type LeaveUncheckedUpdateManyWithoutRequesterInput = {
    id?: StringFieldUpdateOperationsInput | string
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    leavePolicyId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaveUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    leavePolicy?: LeavePolicyUpdateOneWithoutLeavesNestedInput
    dayStatuses?: LeaveDayStatusUpdateManyWithoutLeaveNestedInput
    requester?: UserUpdateOneRequiredWithoutLeaveRequestsNestedInput
  }

  export type LeaveUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    leavePolicyId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    dayStatuses?: LeaveDayStatusUncheckedUpdateManyWithoutLeaveNestedInput
  }

  export type LeaveUncheckedUpdateManyWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    leavePolicyId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaveBalanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    leavePolicy?: LeavePolicyUpdateOneRequiredWithoutLeaveBalancesNestedInput
  }

  export type LeaveBalanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    leavePolicyId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    leavePolicyId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumAuditActionFieldUpdateOperationsInput | $Enums.AuditAction
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    oldValues?: NullableJsonNullValueInput | InputJsonValue
    newValues?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    leaveId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    leaveId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    leaveId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyDepartmentInput = {
    id?: string
    username: string
    auth0Id?: string | null
    email: string
    password: string
    firstName: string
    lastName: string
    employeeId: string
    role?: $Enums.UserRole
    managerId?: string | null
    hrId?: string | null
    isActive?: boolean
    joinDate?: Date | string
    profileImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    manager?: UserUpdateOneWithoutEmployeesNestedInput
    employees?: UserUpdateManyWithoutManagerNestedInput
    hr?: UserUpdateOneWithoutHrEmployeesNestedInput
    hrEmployees?: UserUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    employees?: UserUncheckedUpdateManyWithoutManagerNestedInput
    hrEmployees?: UserUncheckedUpdateManyWithoutHrNestedInput
    leaveRequests?: LeaveUncheckedUpdateManyWithoutRequesterNestedInput
    approvedLeaves?: LeaveUncheckedUpdateManyWithoutApproverNestedInput
    leaveBalances?: LeaveBalanceUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    auth0Id?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    employeeId?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    managerId?: NullableStringFieldUpdateOperationsInput | string | null
    hrId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveCreateManyLeavePolicyInput = {
    id?: string
    requesterId: string
    approverId?: string | null
    leaveType: $Enums.LeaveType
    startDate: Date | string
    endDate: Date | string
    totalDays: number
    reason: string
    status?: $Enums.LeaveStatus
    appliedDate?: Date | string
    approvedDate?: Date | string | null
    rejectionReason?: string | null
    attachments?: LeaveCreateattachmentsInput | string[]
    isHalfDay?: boolean
    emergencyLeave?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastReminderSent?: Date | string | null
    isLOP?: boolean
  }

  export type LeaveBalanceCreateManyLeavePolicyInput = {
    id?: string
    userId: string
    year: number
    totalQuota: number
    usedDays?: number
    pendingDays?: number
    availableDays: number
    carryForward?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LeaveUpdateWithoutLeavePolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    dayStatuses?: LeaveDayStatusUpdateManyWithoutLeaveNestedInput
    requester?: UserUpdateOneRequiredWithoutLeaveRequestsNestedInput
    approver?: UserUpdateOneWithoutApprovedLeavesNestedInput
  }

  export type LeaveUncheckedUpdateWithoutLeavePolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
    dayStatuses?: LeaveDayStatusUncheckedUpdateManyWithoutLeaveNestedInput
  }

  export type LeaveUncheckedUpdateManyWithoutLeavePolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requesterId?: StringFieldUpdateOperationsInput | string
    approverId?: NullableStringFieldUpdateOperationsInput | string | null
    leaveType?: EnumLeaveTypeFieldUpdateOperationsInput | $Enums.LeaveType
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    totalDays?: FloatFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    appliedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    approvedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: LeaveUpdateattachmentsInput | string[]
    isHalfDay?: BoolFieldUpdateOperationsInput | boolean
    emergencyLeave?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastReminderSent?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isLOP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LeaveBalanceUpdateWithoutLeavePolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLeaveBalancesNestedInput
  }

  export type LeaveBalanceUncheckedUpdateWithoutLeavePolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveBalanceUncheckedUpdateManyWithoutLeavePolicyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    totalQuota?: IntFieldUpdateOperationsInput | number
    usedDays?: FloatFieldUpdateOperationsInput | number
    pendingDays?: FloatFieldUpdateOperationsInput | number
    availableDays?: FloatFieldUpdateOperationsInput | number
    carryForward?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LeaveDayStatusCreateManyLeaveInput = {
    id?: string
    date: Date | string
    status?: $Enums.LeaveStatus
    reason?: string | null
  }

  export type LeaveDayStatusUpdateWithoutLeaveInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeaveDayStatusUncheckedUpdateWithoutLeaveInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LeaveDayStatusUncheckedUpdateManyWithoutLeaveInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumLeaveStatusFieldUpdateOperationsInput | $Enums.LeaveStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DepartmentCountOutputTypeDefaultArgs instead
     */
    export type DepartmentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeavePolicyCountOutputTypeDefaultArgs instead
     */
    export type LeavePolicyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeavePolicyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeaveCountOutputTypeDefaultArgs instead
     */
    export type LeaveCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeaveCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DepartmentDefaultArgs instead
     */
    export type DepartmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeavePolicyDefaultArgs instead
     */
    export type LeavePolicyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeavePolicyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeaveDefaultArgs instead
     */
    export type LeaveArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeaveDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeaveDayStatusDefaultArgs instead
     */
    export type LeaveDayStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeaveDayStatusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LeaveBalanceDefaultArgs instead
     */
    export type LeaveBalanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LeaveBalanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HolidayDefaultArgs instead
     */
    export type HolidayArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HolidayDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SettingDefaultArgs instead
     */
    export type SettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}