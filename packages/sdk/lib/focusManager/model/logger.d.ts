declare class Logger {
    private _coreManager;
    private static _loggerInstance?;
    constructor(CoreManagerInstance: any);
    static getInstance(CoreManagerInstance?: any): Logger;
    log(...args: Array<any>): void;
    error(...args: Array<any>): void;
    warn(...args: Array<any>): void;
    debug(...args: Array<any>): void;
}
export default Logger;
//# sourceMappingURL=logger.d.ts.map